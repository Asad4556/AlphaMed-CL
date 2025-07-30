
function login() {
  const cnic = document.getElementById('cnic').value.trim();
  const password = document.getElementById('password').value;
  const role = new URLSearchParams(window.location.search).get('role');

  const users = {
    admin: { cnic: '34501-8971113-6', password: 'Asad@2723' },
    receptionist: { cnic: '34501-8971113-7', password: 'Asad@2723' },
    technician: { cnic: '34501-8971113-8', password: 'Asad@2723' }
  };

  if (users[role] && users[role].cnic === cnic && users[role].password === password) {
    if (role === 'admin') window.location.href = 'dashboard.html';
    if (role === 'receptionist') window.location.href = 'receptionist.html';
    if (role === 'technician') window.location.href = 'technician.html';
  } else {
    document.getElementById('error-msg').innerText = 'Invalid CNIC or Password';
  }
}
