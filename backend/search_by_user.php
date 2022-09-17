<?php
include("connection.php");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');

$search_text = $_GET['search_text'];
$query = $mysqli->prepare("SELECT * FROM users WHERE username LIKE CONCAT('%',?,'%') OR full_name LIKE CONCAT('%',?,'%')");

$query->bind_param('ss', $search_text, $search_text);
$query->execute();
$array = $query->get_result();


$response = [];
while ($a = $array->fetch_assoc()) {
    $response[] = $a;
}

$json = json_encode($response);
echo $json;
