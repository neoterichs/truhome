<?php 
include('conn.php');
$cust_id = $_POST['user_id'];
$sloc_id = $_POST['sloc_id'];

if($_POST['profile'] == "basic"){
	$query  = 	pg_query("UPDATE ".'users.usr$customer_profile'." SET  first_nm='".$_POST['first_name']."', last_nm='".$_POST['last_name']."', 
				contact_no=".$_POST['contact_no']."  WHERE sloc_id=".$sloc_id." and org_id=1 and customer_id=".$cust_id." ");
	
	if($query)$list[] = array("status" => "Y");
	else $list[] = array("status" => "N");
	echo json_encode($list);
}

if($_POST['profile'] == "address"){
	
	$query = pg_query("UPDATE ".'users.usr$customer_profile'." SET  loc_addr_ln1='".$_POST['address1']."', loc_addr_ln2='".$_POST['address2']."', 
						loc_city_nm='".$_POST['loccity']."', loc_state_nm='".$_POST['locstate']."',loc_zip=".$_POST['loczip']."
						,loc_country='".$_POST['country']."'  WHERE sloc_id=".$sloc_id." and org_id=1 and customer_id=".$cust_id." ");
	
	if($query)$list[] = array("status" => "Y");
	else $list[] = array("status" => "N");
	echo json_encode($list);
}
?> 