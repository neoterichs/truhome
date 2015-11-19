<?php
include("conn.php");
include("getallinfo.php");

$user_typ = $_POST['usertype'];
$userid = $_POST['userid'];

$info = $helper->getmyinfo(''.$user_typ.'',''.$userid.'');
echo json_encode($info);
?>


