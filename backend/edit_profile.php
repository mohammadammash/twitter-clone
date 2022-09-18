
<?php
include("connection.php");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');


if (isset($_POST["user_id"], $_POST["edited_name"])) {
    $user_id = $_POST["user_id"];
    $edited_name = $_POST["edited_name"];
    $edited_bio = $_POST["edited_bio"];
    $edited_pp = $_POST["edited_pp"];
    $edited_banner = $_POST["edited_banner"];


    $sql_query = "
UPDATE users 
SET 
full_name ='$edited_name' , bio = '$edited_bio', avatar_url='$edited_pp' , banner='$edited_banner'  
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
}

?>