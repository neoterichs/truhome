<?php
include("conn.php");
$list = array();

$user_typ = $_POST['usertype'];
$serviceid = $_POST['serviceid'];

$query = pg_query("select org_nm as name, c.org_id,image_id,website_url,contact_no,loc_city_nm,loc_state_nm,loc_zip,'' as avg_rate from ".'users.usr$company_profile'." c, 
					".'users.usr$company_service_map'." s where c.org_id=s.org_id and c.sloc_id=s.sloc_id and c.sloc_id= SETUP.FN_GET_SRV_LOC() and 
					c.sloc_id= SETUP.FN_GET_SRV_LOC() and s.service_id=".$serviceid." and c.admin_approve_yn='Y'");

$item = pg_fetch_object($query);
$count = pg_num_rows($query);

if($count > 0){
$myservices_q = pg_query("select a.org_id,a.service_id,b.service_nm as name from ".'users.usr$company_service_map'." as a, ".'users.usr$service'." as b
				where a.service_id=b.service_id and a.org_id=".$item->org_id);

$ser_name = array();
while($sti  = pg_fetch_object($myservices_q))
{
	$ser_name[] = $sti->name; 
}
$dis = implode(',',$ser_name);


if($item->image_id=='')$imagesrc = $ip."images/b_no_image_icon.gif";
else $imagesrc = $item->image_id;

$list[] = array("status" => "Y","image" => $imagesrc,"name" => ucfirst($item->name),"state" => $item->loc_state_nm,"city" => $item->loc_city_nm,"website_url" => $item->website_url,"zipcode" => $item->loc_zip,"detail"=>$dis,"contact"=>$item->contact_no,"orgid"=>$item->org_id,"serviceid"=>$serviceid);
}
else{
	$list[] = array("status" => "N");
}
echo json_encode($list);
?>