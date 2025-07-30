<?php
// Simulated user database (You can replace this with real database logic)
$users = [
    ["cnic" => "12345-6789012-3", "password" => "admin123", "role" => "admin"],
    ["cnic" => "45678-9012345-6", "password" => "reception123", "role" => "receptionist"],
    ["cnic" => "78901-2345678-9", "password" => "tech123", "role" => "technician"]
];

// Get POST data
$cnic = $_POST['cnic'] ?? '';
$password = $_POST['password'] ?? '';

// Validate credentials
foreach ($users as $user) {
    if ($user['cnic'] === $cnic && $user['password'] === $password) {
        echo $user['role'];
        exit;
    }
}

// If no match
echo "invalid";
?>
