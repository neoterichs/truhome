<?php
include("conn.php");
$list = array();
$username = $_POST['username'];
$password = $_POST['password'];
$user_typ = $_POST['usertype'];
$count = 0;

if($user_typ == 'C'){
	$Query_t = pg_query("select * from ".'users.usr$customer_profile'." where email_id='".$username."' and passwd='".$password."'");
	$count = pg_num_rows($Query_t);
	$row = pg_fetch_array($Query_t);
	if($count > 0){
		$list[] = array("status" => "Y","userid" => $row['customer_id'],"slocid" => $row['sloc_id'],"orgid" => $row['org_id']);
	}
	else $list[] = array("status" => "N");
}


if($user_typ == 'T'){
	$Query_t = pg_query("select * from ".'users.usr$company_profile'." where email_id='".$username."' and passwd='".$password."'");
	$count = pg_num_rows($Query_t);
	$row = pg_fetch_array($Query_t);
	if($count > 0){
		$list[] = array("status" => "Y","userid" => $row['org_id'],"slocid" => $row['sloc_id'],"orgid" => $row['org_id']);
	}
	else $list[] = array("status" => "N");
}

echo json_encode($list);
?>


