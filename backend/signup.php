<?php
include("connection.php");


$full_name = $_POST['full_name'];
$email = $_POST['email'];
$phone_nbr = $_POST['phone_nbr'];
$password = $_POST['password'];
$date_of_birth = $_POST['date_of_birth'];
$username = $_POST['username'];
$joined_in_date = $_POST['joined_in_date'];
$avatar_url = $_POST['avatar_url'];
// intializing default values instead of null
$bio = '';
$banner = '';

// validate avatar-url:
if($avatar_url){
    // return url from base-64 to original-url
    $avatar_url = '';
}else{
    // there is no avatar_url
    $avatar_url = '';
}

$query = $mysqli-> prepare("INSERT INTO users(full_name, email, phone_nbr, password, date_of_birth, joined_in_date, username, bio, banner, avatar_url) VALUE (?,?,?,?,?,?,?,?,?,?)");
$query->bind_param('ssssssssss',$full_name, $email, $phone_nbr, $password, $date_of_birth, $joined_in_date, $username, $bio, $banner, $avatar_url); //change to ?,? to strings vars
$query-> execute();

$response = [];
$response['success'] = true;

echo json_encode($response);
