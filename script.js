// Utility for generating unique MRN number
function generateMRN() {
  return 'MRN-' + Math.floor(100000 + Math.random() * 900000);
}

// Utility for generating barcode data (simple barcode text)
function generateBarcode(mrn) {
  // For simplicity, barcode = MRN with some decoration
  return `|| ${mrn} ||`;
}

// Populate department dropdown dynamically
const departmentSelect = document.getElementById('departmentSelect');
for (const dept in testData) {
  const option = document.createElement('option');
  option.value = dept;
  option.textContent = dept;
  departmentSelect.appendChild(option);
}

const patientForm = document.getElementById('patientForm');
const testSelectionSection = document.querySelector('.test-selection');
const testsContainer = document.getElementById('testsContainer');
const testForm = document.getElementById('testForm');
const reportSection = document.querySelector('.report-section');
const reportsList = document.getElementById('reportsList');

let currentTests = [];
let currentPatientInfo = null;

departmentSelect.addEventListener('change', () => {
  const selectedDept = departmentSelect.value;
  testsContainer.innerHTML = '';
  if (!selectedDept) {
    testSelectionSection.style.display = 'none';
    return;
  }
  currentTests = testData[selectedDept] || [];
  if (currentTests.length === 0) {
    testsContainer.innerHTML = '<p>No tests available for this department.</p>';
    testSelectionSection.style.display = 'block';
    return;
  }

  // Create test input fields with normal ranges and input for result
  currentTests.forEach((test, index) => {
    const testDiv = document.createElement('div');
    testDiv.className = 'test-input';

    const label = document.createElement('label');
    label.htmlFor = `testResult_${index}`;
    label.textContent = `${test.name} (Normal: ${test.normalRange} ${test.unit || ''})`;

    const input = document.createElement('input');
    input.type = 'text';
    input.id = `testResult_${index}`;
    input.name = `testResult_${index}`;
    input.placeholder = 'Enter Result';
    input.required = true;

    testDiv.appendChild(label);
    testDiv.appendChild(input);
    testsContainer.appendChild(testDiv);
  });

  testSelectionSection.style.display = 'block';
});

testForm.addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(patientForm);
  const testResults = [];

  for (let i = 0; i < currentTests.length; i++) {
    const result = testForm[`testResult_${i}`].value.trim();
    if (!result) {
      alert(`Please enter result for test: ${currentTests[i].name}`);
      return;
    }
    testResults.push({
      testName: currentTests[i].name,
      normalRange: currentTests[i].normalRange,
      unit: currentTests[i].unit,
      result: result
    });
  }

  // Collect patient info
  currentPatientInfo = {
    name: formData.get('patientName'),
    cnic: formData.get('patientCNIC'),
    phone: formData.get('patientPhone'),
    age: formData.get('patientAge'),
    department: departmentSelect.value,
    mrn: generateMRN(),
    barcode: null,
    results: testResults,
    date: new Date().toLocaleDateString()
  };

  currentPatientInfo.barcode = generateBarcode(currentPatientInfo.mrn);

  saveReport(currentPatientInfo);
  displayReports();
  testSelectionSection.style.display = 'none';
  patientForm.reset();
  departmentSelect.value = '';
  alert('Report saved successfully!');
});

// Save reports in localStorage
function saveReport(report) {
  let reports = JSON.parse(localStorage.getItem('patientReports')) || [];
  reports.push(report);
  localStorage.setItem('patientReports', JSON.stringify(reports));
}

// Display all saved reports
function displayReports() {
  let reports = JSON.parse(localStorage.getItem('patientReports')) || [];
  reportsList.innerHTML = '';
  if (reports.length === 0) {
    reportsList.innerHTML = '<p>No reports generated yet.</p>';
    reportSection.style.display = 'none';
    return;
  }

  reportSection.style.display = 'block';

  reports.forEach((report, idx) => {
    const reportDiv = document.createElement('div');
    reportDiv.className = 'report-card';

    const headerDiv = document.createElement('div');
    headerDiv.className = 'report-header';

    const logoImg = document.createElement('img');
    logoImg.src = 'logo.png';
    logoImg.alt = 'Lab Logo';
    logoImg.className = 'report-logo';

    const titleDiv = document.createElement('div');
    titleDiv.className = 'report-title';
    titleDiv.innerHTML = `
      <h3>Alpha-Med Clinical Laboratory</h3>
      <p>Patient Report</p>
    `;

    const qrDiv = document.createElement('div');
    qrDiv.className = 'report-qr';
    qrDiv.textContent = report.barcode; // For now text barcode, you can enhance with real barcode generator

    headerDiv.appendChild(logoImg);
    headerDiv.appendChild(titleDiv);
    headerDiv.appendChild(qrDiv);

    // Patient Info
    const patientInfoDiv = document.createElement('div');
    patientInfoDiv.className = 'patient-info-report';
    patientInfoDiv.innerHTML = `
      <p><strong>Name:</strong> ${report.name}</p>
      <p><strong>CNIC:</strong> ${report.cnic}</p>
      <p><strong>Phone:</strong> ${report.phone}</p>
      <p><strong>Age:</strong> ${report.age}</p>
      <p><strong>Department:</strong> ${report.department}</p>
      <p><strong>MRN:</strong> ${report.mrn}</p>
      <p><strong>Date:</strong> ${report.date}</p>
    `;

    // Test Results Table
    const resultsTable = document.createElement('table');
    resultsTable.className = 'results-table';

    const thead = document.createElement('thead');
    thead.innerHTML = `
      <tr>
        <th>Test Name</th>
        <th>Result</th>
        <th>Normal Range</th>
        <th>Unit</th>
      </tr>
    `;
    resultsTable.appendChild(thead);

    const tbody = document.createElement('tbody');
    report.results.forEach(r => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${r.testName}</td>
        <td>${r.result}</td>
        <td>${r.normalRange}</td>
        <td>${r.unit}</td>
      `;
      tbody.appendChild(tr);
    });
    resultsTable.appendChild(tbody);

    reportDiv.appendChild(headerDiv);
    reportDiv.appendChild(patientInfoDiv);
    reportDiv.appendChild(resultsTable);

    reportsList.appendChild(reportDiv);
  });
}

// On page load, display existing reports
window.onload = displayReports;
