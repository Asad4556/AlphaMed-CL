
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

function generateMRN() {
    return "ALPHA-" + Math.floor(1000 + Math.random() * 9000);
}

function populateTests(department) {
    const testSelect = document.getElementById("test");
    testSelect.innerHTML = "";
    if (departments[department]) {
        departments[department].forEach(test => {
            let option = document.createElement("option");
            option.value = test;
            option.innerText = test;
            testSelect.appendChild(option);
        });
    }
}

document.getElementById("department").addEventListener("change", function() {
    populateTests(this.value);
});

document.getElementById("patientForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const patient = {
        name: document.getElementById("name").value,
        cnic: document.getElementById("cnic").value,
        phone: document.getElementById("phone").value,
        age: document.getElementById("age").value,
        department: document.getElementById("department").value,
        test: document.getElementById("test").value,
        mrn: generateMRN()
    };

    localStorage.setItem("lastPatient", JSON.stringify(patient));
    window.location.href = "report.html";
});
