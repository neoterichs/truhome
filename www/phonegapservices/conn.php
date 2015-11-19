<?php 
session_start();
error_reporting(E_ALL ^ E_NOTICE);
$db = pg_connect("host=45.79.145.23 port=5432 dbname=truhome user=postgres password=Nislinode$1")
or die("unable");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
?>