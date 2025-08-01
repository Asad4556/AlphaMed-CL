// Load department and test data from testData.js (you must include this file before script.js in index.html)
let departments = Object.keys(testData);
const deptSelect = document.getElementById("department");
const testSelect = document.getElementById("test");
const selectedTestsContainer = document.getElementById("selected-tests");
const reportListContainer = document.getElementById("report-list");

let selectedTests = [];
let currentMRN = Date.now();

document.getElementById("mrn").value = currentMRN;

// Populate departments
departments.forEach(dep => {
  const option = document.createElement("option");
  option.value = dep;
  option.textContent = dep;
  deptSelect.appendChild(option);
});

// When department changes
deptSelect.addEventListener("change", () => {
  testSelect.innerHTML = "<option value=''>Select Test</option>";
  const selectedDept = deptSelect.value;
  if (!selectedDept) return;

  testData[selectedDept].forEach(test => {
    const option = document.createElement("option");
    option.value = test.name;
    option.textContent = test.name;
    option.dataset.range = test.range;
    option.dataset.unit = test.unit;
    testSelect.appendChild(option);
  });
});

// When test selected
testSelect.addEventListener("change", () => {
  const testName = testSelect.value;
  if (!testName) return;

  const selectedOption = testSelect.selectedOptions[0];
  const range = selectedOption.dataset.range;
  const unit = selectedOption.dataset.unit;

  if (selectedTests.some(t => t.name === testName)) return;

  selectedTests.push({
    name: testName,
    normalRange: range,
    unit: unit,
    result: ""
  });

  renderSelectedTests();
});

// Render selected test result inputs
function renderSelectedTests() {
  selectedTestsContainer.innerHTML = "";
  selectedTests.forEach((test, index) => {
    const div = document.createElement("div");
    div.classList.add("test-entry");
    div.innerHTML = `
      <strong>${test.name}</strong> (Normal: ${test.normalRange}, Unit: ${test.unit})<br>
      Result: <input type="text" oninput="updateResult(${index}, this.value)" placeholder="Enter result" />
    `;
    selectedTestsContainer.appendChild(div);
  });
}

function updateResult(index, value) {
  selectedTests[index].result = value;
}

// Save full report
document.getElementById("save-btn").addEventListener("click", () => {
  const name = document.getElementById("name").value.trim();
  const cnic = document.getElementById("cnic").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const age = document.getElementById("age").value.trim();
  const mrn = document.getElementById("mrn").value.trim();

  if (!name || !cnic || !phone || !age || selectedTests.length === 0) {
    alert("Please fill all patient info and select at least one test.");
    return;
  }

  const report = {
    name, cnic, phone, age, mrn,
    tests: selectedTests
  };

  // Save to localStorage
  let reports = JSON.parse(localStorage.getItem("reports") || "[]");
  reports.push(report);
  localStorage.setItem("reports", JSON.stringify(reports));
  localStorage.setItem("lastReport", JSON.stringify(report)); // for report.html

  alert("Report saved successfully!");

  selectedTests = [];
  renderSelectedTests();
  loadReports();
});

// Load report list
function loadReports() {
  reportListContainer.innerHTML = "";
  const reports = JSON.parse(localStorage.getItem("reports") || "[]");

  if (reports.length === 0) {
    reportListContainer.innerHTML = "<p>No reports found.</p>";
    return;
  }

  reports.forEach((report, index) => {
    const div = document.createElement("div");
    div.classList.add("report-card");
    div.innerHTML = `
      <p><strong>${report.name}</strong> | MRN: ${report.mrn}</p>
      <button onclick="viewReport(${index})">View Report</button>
    `;
    reportListContainer.appendChild(div);
  });
}

function viewReport(index) {
  const reports = JSON.parse(localStorage.getItem("reports") || "[]");
  const report = reports[index];
  if (report) {
    localStorage.setItem("lastReport", JSON.stringify(report));
    window.open("report.html", "_blank");
  }
}

// Initial call
loadReports();
