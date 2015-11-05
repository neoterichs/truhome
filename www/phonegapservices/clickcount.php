<?php 
include('conn.php');
$techclick = $_POST['techclick'];
$service_id = $_POST['service_id'];
$userid = $_POST['userid'];
$usertype = $_POST['usertype'];

$ip_add = "ionicapp";
$sess_id = 123 + time();
	$query = pg_query("INSERT INTO ".'users.usr$click_activity_log'."(usr_id, usr_typ, usr_login_typ, clk_date, clk_time, clk_page,clk_component, session_id, usr_ip_loc,clkd_entity_id,clkd_entity_typ,service_id)VALUES (".$userid.",'".$usertype."','M',current_date,current_time,2,".$techclick.",".$sess_id.",'".$ip_add."',".$techclick.",'T',".$service_id.")");
			
	if($query)$list[] = array("status" => "Y");
	else $list[] = array("status" => "N");
	
echo json_encode($list);
?>