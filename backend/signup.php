<?php
include("connection.php");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');

function base64_to_jpeg($base64_string, $output_file)
{
    // open the output file for writing
    $ifp = fopen($output_file, 'wb');

    // split the string on commas
    // $data[ 0 ] == "data:image/png;base64"
    // $data[ 1 ] == <actual base64 string>
    $data = explode(',', $base64_string);

    // we could add validation here with ensuring count( $data ) > 1
    fwrite($ifp, base64_decode($data[0]));

    // clean up the file resource
    fclose($ifp);

    return $output_file;
}

$full_name = $_POST['full_name'];
$email = $_POST['email'];
$phone_nbr = $_POST['phone_nbr'];
$password = $_POST['password'];
$date_of_birth = $_POST['date_of_birth'];
$username = $_POST['username'];
$joined_in_date = $_POST['joined_in_date'];

$avatar_url_base64 = $_POST['avatar_url'];
$image = base64_to_jpeg($avatar_url_base64, 'user_images/'.$username.'.jpeg');
$target_Path = "/user_images";
move_uploaded_file($image, $target_Path);
$avatar_url = "../../backend/user_images/".$username.".jpeg";

// intializing default values instead of null
$bio = '';
$banner = '';
$hashedpass = hash('sha256', $password . 'sayhitwitter');

$query = $mysqli->prepare("INSERT INTO users(full_name, email, phone_nbr, password, date_of_birth, joined_in_date, username, bio, banner, avatar_url) VALUE (?,?,?,?,?,?,?,?,?,?)");
$query->bind_param('ssssssssss', $full_name, $email, $phone_nbr, $hashedpass, $date_of_birth, $joined_in_date, $username, $bio, $banner, $avatar_url); //change to ?,? to strings vars
$query->execute();

$response = [];
$response['success'] = true;

echo json_encode($response);
