document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("loginForm");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const cnic = document.getElementById("cnic").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!cnic || !password) {
            alert("Please enter both CNIC and Password.");
            return;
        }

        fetch("login.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `cnic=${encodeURIComponent(cnic)}&password=${encodeURIComponent(password)}`
        })
        .then(res => res.text())
        .then(role => {
            if (role === "admin") {
                window.location.href = "dashboard.html";
            } else if (role === "receptionist") {
                window.location.href = "receptionist.html";
            } else if (role === "technician") {
                window.location.href = "technician.html";
            } else {
                alert("Invalid CNIC or Password. Please try again.");
            }
        })
        .catch(err => {
            console.error("Login error:", err);
            alert("Error occurred during login. Please try again.");
        });
    });
});
