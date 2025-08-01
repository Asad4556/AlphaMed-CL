// technician.js

document.addEventListener("DOMContentLoaded", () => {
  const departmentSelect = document.getElementById("department");
  const testFieldsContainer = document.getElementById("testFields");
  const reportForm = document.getElementById("reportForm");

  // Populate department dropdown
  const departments = Object.keys(testData);
  departments.forEach((dept) => {
    const option = document.createElement("option");
    option.value = dept;
    option.textContent = dept;
    departmentSelect.appendChild(option);
  });

  departmentSelect.addEventListener("change", () => {
    const selectedDept = departmentSelect.value;
    testFieldsContainer.innerHTML = "";
    if (selectedDept && testData[selectedDept]) {
      testData[selectedDept].forEach((test) => {
        const div = document.createElement("div");
        div.classList.add("test-input");
        div.innerHTML = `
          <label>${test.name} (${test.normalRange}) [${test.unit}]</label>
          <input type="text" id="result-${test.id}" placeholder="Enter result">
        `;
        testFieldsContainer.appendChild(div);
      });
    }
  });

  reportForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const cnic = document.getElementById("cnic").value;
    const phone = document.getElementById("phone").value;
    const age = document.getElementById("age").value;
    const department = departmentSelect.value;
    const mrn = document.getElementById("mrn").value;
    const date = document.getElementById("date").value;
    const results = [];

    if (!department || !testData[department]) {
      alert("Please select a valid department.");
      return;
    }

    testData[department].forEach((test) => {
      const resultValue = document.getElementById(`result-${test.id}`).value;
      if (resultValue.trim() !== "") {
        results.push({
          testName: test.name,
          result: resultValue,
          normalRange: test.normalRange,
          unit: test.unit
        });
      }
    });

    if (results.length === 0) {
      alert("Please enter at least one test result.");
      return;
    }

    const barcode = `<img src='https://api.qrserver.com/v1/create-qr-code/?size=70x70&data=${cnic}-${mrn}' alt='QR Code' />`;

    const report = {
      name,
      cnic,
      phone,
      age,
      department,
      mrn,
      date,
      results,
      barcode
    };

    const savedReports = JSON.parse(localStorage.getItem("patientReports")) || [];
    savedReports.push(report);
    localStorage.setItem("patientReports", JSON.stringify(savedReports));

    alert("Report saved successfully!");
    reportForm.reset();
    testFieldsContainer.innerHTML = "";
  });
});
