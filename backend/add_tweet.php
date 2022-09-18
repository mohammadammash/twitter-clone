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

$text = $_POST['text'];
$created_datetime = $_POST['created_datetime'];
$user_id = $_POST['user_id']; 
$nb_of_likes = $_POST['nb_of_likes'];

$image_url_base64 = $_POST['image_url'];
if($image_url_base64){
$image = base64_to_jpeg($image_url_base64, 'tweets_images/' . $user_id.$created_datetime.'.jpeg');
$target_Path = "/tweets_images";
move_uploaded_file($image, $target_Path);
$image_url = "../../backend/tweets_images/" . $user_id . $created_datetime . ".jpeg";
}else{
    $image_url = '';
}
$query = $mysqli->prepare("INSERT INTO tweets(text, image_url, created_datetime, user_id, nb_of_likes) VALUE (?,?,?,?,?)");
$query->bind_param('sssss', $text, $image_url, $created_datetime, $user_id, $nb_of_likes); //change to ?,? to strings vars
$query->execute();

$response = [];
$response['success'] = true;

echo json_encode($response);
