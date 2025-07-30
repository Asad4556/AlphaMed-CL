document.addEventListener("DOMContentLoaded", function () {
  const departmentSelect = document.getElementById("department");
  const testSelect = document.getElementById("tests");
  const addButton = document.getElementById("addTestBtn");
  const selectedTestsContainer = document.getElementById("selectedTests");
  const submitBtn = document.getElementById("submitTests");

  // Sample department-wise test data
  const departmentTests = {
    Hematology: ["CBC", "ESR", "Platelet Count"],
    Biochemistry: ["Liver Function Test", "Kidney Function Test", "Glucose"],
    Microbiology: ["Urine Culture", "Blood Culture", "Sputum AFB"],
    Serology: ["Widal Test", "Dengue NS1", "HIV"],
    Immunology: ["CRP", "RF", "ANA"]
  };

  // Update test options when department changes
  departmentSelect.addEventListener("change", function () {
    const selectedDept = departmentSelect.value;
    testSelect.innerHTML = "";

    if (departmentTests[selectedDept]) {
      departmentTests[selectedDept].forEach(test => {
        const option = document.createElement("option");
        option.value = test;
        option.textContent = test;
        testSelect.appendChild(option);
      });
    }
  });

  // Add selected test to the list
  addButton.addEventListener("click", function () {
    const test = testSelect.value;
    if (test) {
      const item = document.createElement("li");
      item.textContent = test;
      selectedTestsContainer.appendChild(item);
    }
  });

  // Handle submit (can be replaced with actual POST request)
  submitBtn.addEventListener("click", function () {
    const tests = [];
    selectedTestsContainer.querySelectorAll("li").forEach(li => {
      tests.push(li.textContent);
    });

    if (tests.length === 0) {
      alert("Please add at least one test.");
      return;
    }

    // For demo: just show alert
    alert("Selected tests:\n" + tests.join("\n"));

    // In real use: send via AJAX or save in backend
  });
});
