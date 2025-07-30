<?php
session_start();

$cnic = $_POST['cnic'];
$password = $_POST['password'];

$valid_cnic = '34501-8971113-7';
$valid_password = 'Asad@2723';

if ($cnic === $valid_cnic && $password === $valid_password) {
    $_SESSION['logged_in'] = true;
    header('Location: dashboard.php');
    exit();
} else {
    echo "<script>alert('Invalid CNIC or Password'); window.location.href='login.html';</script>";
}
?>
