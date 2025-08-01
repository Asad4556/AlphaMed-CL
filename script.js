// Elements
const patientForm = document.getElementById('patientForm');
const departmentSelect = document.getElementById('department');
const testContainer = document.getElementById('testContainer');
const reportContainer = document.getElementById('reportContainer');
const mrnInput = document.getElementById('mrn');
const barcodeCanvas = document.getElementById('barcode');

function generateMRN() {
  return 'MRN-' + Math.floor(100000 + Math.random() * 900000);
}

function generateBarcode(value) {
  JsBarcode(barcodeCanvas, value, {
    format: 'CODE128',
    width: 2,
    height: 40,
    displayValue: true
  });
}

function populateTests(department) {
  testContainer.innerHTML = '';
  const tests = testData[department] || [];
  tests.forEach(test => {
    const div = document.createElement('div');
    div.classList.add('test-row');
    div.innerHTML = `
      <label>${test.name} (${test.normalRange})</label>
      <input type="text" placeholder="Enter Result" data-test="${test.name}" data-range="${test.normalRange}" />
    `;
    testContainer.appendChild(div);
  });
}

departmentSelect.addEventListener('change', () => {
  const dept = departmentSelect.value;
  populateTests(dept);
});

patientForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const cnic = document.getElementById('cnic').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const age = document.getElementById('age').value.trim();
  const department = departmentSelect.value;
  const mrn = mrnInput.value;
  const barcode = barcodeCanvas.toDataURL();

  const results = [];
  testContainer.querySelectorAll('input').forEach(input => {
    results.push({
      name: input.dataset.test,
      normalRange: input.dataset.range,
      result: input.value.trim()
    });
  });

  const reportData = {
    name, cnic, phone, age, department, mrn, barcode, results
  };

  localStorage.setItem('latestReport', JSON.stringify(reportData));
  displayReport(reportData);
});

function displayReport(data) {
  const logoURL = 'logo.png';
  const qrURL = data.barcode;
  const date = new Date().toLocaleString();

  const testsHTML = data.results.map(r => `
    <tr>
      <td>${r.name}</td>
      <td>${r.result}</td>
      <td>${r.normalRange}</td>
    </tr>
  `).join('');

  reportContainer.innerHTML = `
    <div class="report-header">
      <img src="${logoURL}" alt="Lab Logo" class="logo-left"/>
      <div class="lab-name">Alpha-Med Clinical Laboratory</div>
      <img src="${qrURL}" alt="QR Code" class="qr-right"/>
    </div>
    <div class="patient-info">
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>CNIC:</strong> ${data.cnic}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Age:</strong> ${data.age}</p>
      <p><strong>Department:</strong> ${data.department}</p>
      <p><strong>MRN:</strong> ${data.mrn}</p>
      <p><strong>Date:</strong> ${date}</p>
    </div>
    <table class="test-report">
      <thead>
        <tr><th>Test</th><th>Result</th><th>Normal Range</th></tr>
      </thead>
      <tbody>
        ${testsHTML}
      </tbody>
    </table>
    <button onclick="window.print()">🖨️ Print Report</button>
  `;
}

window.onload = () => {
  mrnInput.value = generateMRN();
  generateBarcode(mrnInput.value);

  const latest = localStorage.getItem('latestReport');
  if (latest) {
    displayReport(JSON.parse(latest));
  }
};
