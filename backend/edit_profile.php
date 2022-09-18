
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

$user_id = $_POST["user_id"];
$username = $_POST["username"];
$edited_name = $_POST["edited_name"];
$edited_bio = $_POST["edited_bio"];


$edited_pp_base64 = $_POST["edited_pp"];
if ($edited_pp_base64) {
    $image= base64_to_jpeg($edited_pp_base64, 'user_images/' . $username . '.jpeg');
    $target_Path = "/user_images";
    // it will overwrite old message having same name
    move_uploaded_file($image, $target_Path);
    $edited_pp = "../../backend/user_images/" . $username . ".jpeg";
} else {
    $edited_pp = '';
}

$edited_banner_base64 = $_POST["edited_banner"];
if ($edited_banner_base64) {
    $image = base64_to_jpeg($edited_banner_base64, 'user_images/banner_' . $username . '.jpeg');
    $target_Path = "/user_images";
    move_uploaded_file($image, $target_Path);
    $edited_banner = "../../backend/user_images/banner_" . $username . ".jpeg";
} else {
    $edited_banner = '';
}

$sql_query = "
UPDATE users 
SET 
full_name ='$edited_name' , bio = '$edited_bio', banner='$edited_banner' , avatar_url='$edited_pp'  
WHERE
    id = $user_id";


if (mysqli_query($mysqli, $sql_query)) {
    echo "Records were updated successfully.";
} else {
    echo "ERROR: Could not able to execute $sql_query. " . mysqli_error($mysqli);
}


$response = [];
$response['success'] = true;

echo json_encode($response);

?>