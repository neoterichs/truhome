<?php 
session_start();
error_reporting(E_ALL ^ E_NOTICE);
$db = pg_connect("host=45.79.212.193 port=5432 dbname=truhome user=postgres password=admin123")
or die("unable");
$ip = "http://www.truhome.co/phonegapservices/";
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
?>