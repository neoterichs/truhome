<?php 
include('conn.php');

$list = array();
$user_typ = $_POST['usertype'];
$userid = $_POST['userid'];
$sloc_id = $_POST['slocid'];
//for customer 
if($user_typ=='C'){
	$result = pg_query("select * from ".'users.usr$customer_profile'."  WHERE sloc_id=".$sloc_id." and org_id=1 and customer_id=".$userid." and passwd='".$_POST['o_password']."'");
	$count = pg_num_rows($result);
	if($count > 0){
		$update = pg_query("UPDATE ".'users.usr$customer_profile'." SET  passwd='".$_POST['ch_password']."' WHERE sloc_id=".$sloc_id." and org_id=1 and customer_id=".$userid." ");
		$list[] = array("status" => "Y");
	}
	else $list[] = array("status" => "N");
}

//for technician
if($user_typ=='T'){
	$result = pg_query("select * from ".'users.usr$company_profile'."  WHERE sloc_id=".$sloc_id." and org_id=".$userid." and passwd='".$_POST['o_password']."'");
	$count = pg_num_rows($result);
	if($count > 0){
		$update = pg_query("UPDATE ".'users.usr$company_profile'." SET  passwd='".$_POST['ch_password']."' WHERE sloc_id=".$sloc_id." and org_id=".$userid."");
		$list[] = array("status" => "Y");
	}
	else $list[] = array("status" => "N");
}

echo json_encode($list);
?>
