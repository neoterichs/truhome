<?php 
include('conn.php');
$user_id = $_POST['user_id'];
$sloc_id = $_POST['sloc_id'];

if($_POST['profile'] == "basic"){
	
	$query = pg_query("UPDATE ".'users.usr$company_profile'." SET  org_nm='".$_POST['org_name']."',
	 org_desc='".$_POST['org_desc']."',org_rmrks='".$_POST['org_rmrks']."', contact_no=".$_POST['org_contact_no']." WHERE sloc_id=".$sloc_id." and org_id=".$user_id."");

	if($query)$list[] = array("status" => "Y");
	else $list[] = array("status" => "N");
	echo json_encode($list);
}

if($_POST['profile'] == "address"){
	
	$query = pg_query("UPDATE ".'users.usr$company_profile'." SET  bill_country='".$_POST['org_bill_country']."', loc_state_nm='".$_POST['org_loc_state_nm']."', 
loc_city_nm='".$_POST['org_loc_city_nm']."', loc_zip=".$_POST['org_loc_zip']."  WHERE sloc_id=".$sloc_id." and org_id=".$user_id." ");
	
	if($query)$list[] = array("status" => "Y");
	else $list[] = array("status" => "N");
	echo json_encode($list);
}


if($_POST['profile'] == "billing"){
	
	$query = pg_query("UPDATE ".'users.usr$company_profile'." SET bill_addr_ln1='".$_POST['org_bill_addr_ln1']."', 
	bill_addr_ln2='".$_POST['org_bill_addr_ln2']."', bill_region='".$_POST['org_bill_region']."' ,bill_city='".$_POST['org_bill_city']."',bill_zip=".$_POST['org_bill_zip']."   WHERE sloc_id=".$sloc_id." and org_id=".$user_id." ");
	
	if($query)$list[] = array("status" => "Y");
	else $list[] = array("status" => "N");
	echo json_encode($list);
}

if($_POST['profile'] == "work"){
	
	$query = pg_query("UPDATE ".'users.usr$company_profile'." SET  wrk_desc='".$_POST['org_wrk_desc']."',website_url='".$_POST['org_website_url']."' WHERE sloc_id=".$sloc_id." and org_id=".$user_id."");
	
	if($query)$list[] = array("status" => "Y");
	else $list[] = array("status" => "N");
	echo json_encode($list);
}



?> 