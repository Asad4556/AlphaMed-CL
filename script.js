// All departments and their sample tests (you can expand to 30 later)
const departments = {
  "Hematology": ["CBC", "RBC Count", "WBC Count"],
  "Serology": ["HIV", "Hepatitis B", "Hepatitis C"],
  "Histopathology": ["Biopsy", "Tissue Study", "Frozen Section"],
  "Microbiology": ["Culture", "Sensitivity", "Gram Stain"],
  "Biochemistry": ["Glucose", "Cholesterol", "Urea"],
  "Culture Tests": ["Urine Culture", "Blood Culture", "Sputum Culture"],
  "Special Chemistry Tests": ["CRP", "D-Dimer", "Electrolytes"],
  "Molecular Biology": ["PCR", "RT-PCR", "Gene Sequencing"],
  "Blood Banking": ["Blood Group", "Cross Match", "Antibody Screening"]
};

// Fill test dropdown when department selected
document.getElementById("department").addEventListener("change", function () {
  const testSelect = document.getElementById("test");
  const dept = this.value;
  testSelect.innerHTML = "<option value=''>Select Test</option>";
  if (departments[dept]) {
    departments[dept].forEach(test => {
      const option = document.createElement("option");
      option.value = test;
      option.innerText = test;
      testSelect.appendChild(option);
    });
  }
});

// Generate a unique MRN number
function generateMRN() {
  return "ALPHA-" + Date.now().toString().slice(-6); // e.g. ALPHA-723456
}

// Handle form submission
document.getElementById("patientForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const patient = {
    name: document.getElementById("name").value.trim(),
    cnic: document.getElementById("cnic").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    age: document.getElementById("age").value.trim(),
    department: document.getElementById("department").value,
    test: document.getElementById("test").value,
    mrn: generateMRN()
  };

  localStorage.setItem("lastPatient", JSON.stringify(patient));
  window.location.href = "report.html";
});
