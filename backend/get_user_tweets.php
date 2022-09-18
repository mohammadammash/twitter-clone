<?php
include("connection.php");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');

if (isset($_GET["user_id"])) {

    $userid = $_GET['user_id'];

    $sql_query = "
    SELECT tweets.id as tweet_id
    FROM users,tweets
    WHERE tweets.user_id=users.id AND users.id=$userid";

    $query = $mysqli->prepare($sql_query);
    $query->execute();
    $array = $query->get_result();

    $response = [];

    while ($a = $array->fetch_assoc()) {
        $response[] = $a;
    }

    $json = json_encode($response);
    echo $json;

}
