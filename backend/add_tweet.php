<?php
include("connection.php");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');

$text = $_POST['text'];
$image_url = base64_decode($_POST['image_url']);
$created_datetime = $_POST['created_datetime'];
$user_id = $_POST['user_id']; 
$nb_of_likes = $_POST['nb_of_likes'];

$query = $mysqli->prepare("INSERT INTO tweets(text, image_url, created_datetime, user_id, nb_of_likes) VALUE (?,?,?,?,?)");
$query->bind_param('sssss', $text, $image_url, $created_datetime, $user_id, $nb_of_likes); //change to ?,? to strings vars
$query->execute();

$response = [];
$response['success'] = true;

echo json_encode($response);
?>