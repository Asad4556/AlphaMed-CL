const form = document.getElementById("reportForm");
const testsContainer = document.getElementById("testsContainer");
const departmentSelect = document.getElementById("department");

departmentSelect.addEventListener("change", () => {
  const dept = departmentSelect.value;
  testsContainer.innerHTML = "";

  if (testData[dept]) {
    testData[dept].forEach(test => {
      const row = document.createElement("div");
      row.classList.add("test-row");

      row.innerHTML = `
        <label>${test.name}</label>
        <input type="hidden" class="test-name" value="${test.name}">
        <input type="text" class="test-result" placeholder="Enter result (optional)">
        <input type="text" class="test-range" value="${test.normalRange}" readonly>
        <input type="text" class="test-unit" value="${test.unit}" readonly>
      `;

      testsContainer.appendChild(row);
    });
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const cnic = document.getElementById("cnic").value;
  const phone = document.getElementById("phone").value;
  const department = document.getElementById("department").value;
  const age = document.getElementById("age").value;
  const mrn = document.getElementById("mrn").value;
  const date = document.getElementById("date").value;

  const rows = document.querySelectorAll(".test-row");
  const results = [];

  rows.forEach(row => {
    const testName = row.querySelector(".test-name").value;
    const result = row.querySelector(".test-result").value.trim();
    const normalRange = row.querySelector(".test-range").value;
    const unit = row.querySelector(".test-unit").value;

    if (result !== "") {
      results.push({ testName, result, normalRange, unit });
    }
  });

  const report = {
    name,
    cnic,
    phone,
    department,
    age,
    mrn,
    date,
    results,
    barcode: `<img src="https://api.qrserver.com/v1/create-qr-code/?data=${cnic}-${mrn}" width="60">`
  };

  const reports = JSON.parse(localStorage.getItem("patientReports")) || [];
  reports.push(report);
  localStorage.setItem("patientReports", JSON.stringify(reports));

  alert("Report saved successfully!");
  form.reset();
  testsContainer.innerHTML = "";
});
