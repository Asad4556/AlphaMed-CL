<?php
session_start();
if (!isset($_SESSION['logged_in'])) {
    header('Location: login.html');
    exit();
}
?>
<!DOCTYPE html>
<html>
<head>
  <title>Dashboard | AlphaMed</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="login-container">
    <h1>Welcome to AlphaMed Lab</h1>
    <p>You are now logged in as: <b><?php echo $_SESSION['user'] ?? 'Lab Technician'; ?></b></p>
    <a href="logout.php"><button>Logout</button></a>
  </div>
</body>
</html>
