<?php
include("connection.php");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');

$username = $_GET['username'];
$password = $_GET['password'];

$hashedpass = hash('sha256', $password.'sayhitwitter');
$query = $mysqli->prepare("SELECT id,full_name,email,phone_nbr,date_of_birth,username,bio,banner,joined_in_date,avatar_url FROM users WHERE username=? and password=?");
$query->bind_param('ss',$username,$hashedpass);
$query->execute();
$array = $query->get_result();

$response = [];
while($a = $array->fetch_assoc()){
    $response[]  = $a;
}

echo json_encode($response);
?>