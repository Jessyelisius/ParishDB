<?php

$host="localhost";
$username = "root";
$password = "";
$database = "sjmcc";


if(!$con = mysqli_connect($host,$username,$password,$database))
{
    die("failed to connect");
}
//$con = mysqli_select_db($con,$database);



$con= mysqli_select_db($con,$database);



?>
