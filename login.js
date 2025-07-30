// js/login.js
function login() {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();
  const role = document.getElementById("role").value;

  // Default usernames/passwords (can be changed)
  const users = {
    receptionist: { username: "reception", password: "123" },
    technologist: { username: "tech", password: "123" }
  };

  if (users[role] && users[role].username === user && users[role].password === pass) {
    localStorage.setItem("userRole", role);
    window.location.href = role === "receptionist" ? "receptionist.html" : "technician.html";
  } else {
    alert("Invalid credentials!");
  }

  return false;
}
