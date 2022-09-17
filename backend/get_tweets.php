<?php
include("connection.php");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');


if (isset($_GET["user_id"])) {

    $userid = $_GET['user_id'];
    $sql_query = "
    SELECT users.avatar_url,user_id tweet_user_id, users.full_name tweet_user_name, users.username tweet_username, tweets.id tweet_id, tweets.text tweet_text, tweets.image_url tweet_img , tweets.created_datetime , tweets.nb_of_likes 
    FROM users, tweets, followers
    WHERE tweets.user_id=users.id 
          AND followers.followed_user_id=user_id
          AND followers.following_user_id=$userid";

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
