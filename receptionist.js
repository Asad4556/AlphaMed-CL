// js/receptionist.js

const testPrices = {
  "Hematology": ["CBC", "ESR", "Platelet Count"],
  "Serology": ["Widal", "Typhidot", "CRP"],
  "Histopathology": ["Biopsy", "Pap Smear"],
  "Microbiology": ["Urine Culture", "Throat Swab"],
  "Biochemistry": ["LFT", "RFT", "Blood Sugar"],
  "Culture Tests": ["Blood Culture", "Urine Culture"],
  "Special Chemistry": ["HbA1c", "Electrolytes"],
  "Molecular Biology": ["HCV PCR", "HBV PCR"],
  "Blood Banking": ["Blood Group", "Cross Match"]
};

const pricePerTest = 500;

function loadTests() {
  const dept = document.getElementById("department").value;
  const testList = document.getElementById("testList");
  testList.innerHTML = "";

  if (testPrices[dept]) {
    testPrices[dept].forEach((test, i) => {
      const id = `test_${i}`;
      testList.innerHTML += `
        <label><input type="checkbox" value="${test}" onchange="calculateTotal()"> ${test}</label><br>
      `;
    });
  }

  calculateTotal();
}

function calculateTotal() {
  const checked = document.querySelectorAll('#testList input[type="checkbox"]:checked');
  const discount = parseFloat(document.getElementById("discount").value) || 0;
  const total = checked.length * pricePerTest;
  const final = total - (total * discount / 100);

  document.getElementById("total").innerText = total;
  document.getElementById("final").innerText = final;
}

function registerPatient() {
  const name = document.getElementById("name").value;
  const father = document.getElementById("father").value;
  const cnic = document.getElementById("cnic").value;
  const phone = document.getElementById("phone").value;
  const dob = document.getElementById("dob").value;
  const discount = parseFloat(document.getElementById("discount").value) || 0;

  const selectedTests = [...document.querySelectorAll('#testList input[type="checkbox"]:checked')]
    .map(cb => cb.value);

  const mrn = "MRN-" + Math.floor(100000 + Math.random() * 900000);
  const sample = "SMP-" + Math.floor(1000 + Math.random() * 9000);

  const total = selectedTests.length * pricePerTest;
  const final = total - (total * discount / 100);

  // Fill slip
  document.getElementById("s_name").innerText = name;
  document.getElementById("s_father").innerText = father;
  document.getElementById("s_cnic").innerText = cnic;
  document.getElementById("s_phone").innerText = phone;
  document.getElementById("s_dob").innerText = dob;
  document.getElementById("s_tests").innerText = selectedTests.join(", ");
  document.getElementById("s_mrn").innerText = mrn;
  document.getElementById("s_sample").innerText = sample;
  document.getElementById("s_total").innerText = total;
  document.getElementById("s_discount").innerText = discount;
  document.getElementById("s_final").innerText = final;

  // QR Code
  const qrData = `${name}, CNIC: ${cnic}, MRN: ${mrn}, Tests: ${selectedTests.join(', ')}`;
  document.getElementById("qrcode").innerHTML = "";
  new QRCode(document.getElementById("qrcode"), qrData);

  // Show slip
  document.getElementById("slip").style.display = "block";
  return false;
}
