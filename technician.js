document.addEventListener("DOMContentLoaded", () => {
  const departmentSelect = document.getElementById("departmentSelect");
  const testFieldsBody = document.querySelector("#testFields tbody");

  const departmentTests = {
    "Hematology": [
      { name: "Hemoglobin", range: "13-17", unit: "g/dL" },
      { name: "WBC Count", range: "4,000-11,000", unit: "cells/µL" },
    ],
    "Biochemistry": [
      { name: "Glucose (Fasting)", range: "70-110", unit: "mg/dL" },
      { name: "Cholesterol", range: "<200", unit: "mg/dL" },
    ],
    "Serology": [
      { name: "CRP", range: "<5", unit: "mg/L" },
      { name: "ASO", range: "<200", unit: "IU/mL" },
    ]
  };

  function populateTestFields(dept) {
    testFieldsBody.innerHTML = "";
    if (!departmentTests[dept]) return;

    departmentTests[dept].forEach(test => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${test.name}</td>
        <td><input type="text" class="resultField" placeholder="Result" /></td>
        <td>${test.range}</td>
        <td>${test.unit}</td>
      `;

      testFieldsBody.appendChild(row);
    });
  }

  departmentSelect.addEventListener("change", (e) => {
    const selectedDept = e.target.value;
    populateTestFields(selectedDept);
  });

  document.getElementById("saveReportBtn").addEventListener("click", () => {
    const name = document.getElementById("patientName").value.trim();
    const cnic = document.getElementById("patientCnic").value.trim();
    const phone = document.getElementById("patientPhone").value.trim();
    const age = document.getElementById("patientAge").value.trim();
    const department = document.getElementById("departmentSelect").value;
    const mrn = document.getElementById("patientMrn").value.trim();
    const date = document.getElementById("patientDate").value;

    if (!name || !cnic || !phone || !age || !mrn || !date) {
      alert("Please fill out patient information completely.");
      return;
    }

    const rows = document.querySelectorAll("#testFields tbody tr");
    const results = [];

    rows.forEach(row => {
      const testName = row.children[0].textContent;
      const result = row.querySelector(".resultField").value.trim();
      const normalRange = row.children[2].textContent;
      const unit = row.children[3].textContent;

      if (result !== "") {
        results.push({ testName, result, normalRange, unit });
      }
    });

    if (results.length === 0) {
      alert("Please enter at least one test result.");
      return;
    }

    const qr = new QRious({
      value: `MRN:${mrn} - ${name}`,
      size: 100
    });

    const report = {
      name,
      cnic,
      phone,
      age,
      department,
      mrn,
      date,
      results,
      barcode: `<img src="${qr.toDataURL()}" width="80"/>`
    };

    const reports = JSON.parse(localStorage.getItem("patientReports")) || [];
    reports.push(report);
    localStorage.setItem("patientReports", JSON.stringify(reports));

    alert("Report saved successfully!");
    location.reload();
  });
});
