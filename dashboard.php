<?php
session_start();

// Redirect to login page if not logged in
if (!isset($_SESSION['username'])) {
    header("Location: login.php");
    exit();
}

// Optional: Get role for conditional content
$role = $_SESSION['role'] ?? 'Receptionist'; // Default role
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Dashboard | AlphaMed Clinical Lab</title>
  <link rel="stylesheet" href="style.css" />
  <style>
    body {
      font-family: 'Segoe UI', sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f5f7fa;
    }
    .navbar {
      background-color: #2c3e50;
      padding: 15px;
      color: #fff;
      text-align: center;
      font-size: 20px;
      font-weight: bold;
    }
    .dashboard-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      padding: 30px;
    }
    .card {
      background-color: #ffffff;
      padding: 25px;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      text-align: center;
      transition: transform 0.2s;
      cursor: pointer;
    }
    .card:hover {
      transform: scale(1.05);
    }
    .card h3 {
      margin-bottom: 10px;
    }
    .logout {
      margin-top: 20px;
      text-align: center;
    }
    .logout a {
      color: #e74c3c;
      text-decoration: none;
      font-weight: bold;
    }
  </style>
</head>
<body>

  <div class="navbar">
    AlphaMed Clinical Lab - Dashboard<br>
    Welcome, <strong><?= htmlspecialchars($_SESSION['username']) ?></strong> (<?= htmlspecialchars($role) ?>)
  </div>

  <div class="dashboard-container">
    <?php if ($role === 'Receptionist' || $role === 'Admin'): ?>
      <div class="card" onclick="location.href='receptionist.php'">
        <h3>Receptionist Panel</h3>
        <p>Register patients & assign tests</p>
      </div>
    <?php endif; ?>

    <?php if ($role === 'Technician' || $role === 'Admin'): ?>
      <div class="card" onclick="location.href='technician.php'">
        <h3>Technician Panel</h3>
        <p>Enter & update test results</p>
      </div>
    <?php endif; ?>

    <?php if ($role === 'Admin'): ?>
      <div class="card" onclick="location.href='admin.php'">
        <h3>Admin Panel</h3>
        <p>Manage users, tests, and departments</p>
      </div>
    <?php endif; ?>
  </div>

  <div class="logout">
    <a href="logout.php">🔒 Logout</a>
  </div>

</body>
</html>
