<?php
$host = 'localhost'; //where my db is hosted
$db_user = "root";
$db_pass = null;
$db_name = 'twitter_db';

// called mysqli constructor - create conx between php file and db
$mysqli = new mysqli($host, $db_user, $db_pass, $db_name);
?>
