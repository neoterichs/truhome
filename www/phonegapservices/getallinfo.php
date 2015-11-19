<?php 
class Truhome
{
	//fetch all services
	function getService()
	{
		$details = array();
		$serve_query = pg_query("select * from ".'users.usr$service'."");
		while($items = pg_fetch_object($serve_query))
		{
			$details['id'][] = $items->service_id;
			$details['name'][] = $items->service_nm; 
		}
		return $details;
   }

    //get all Companies services      	
	function getMyservices()
	{
		$details = array();  
		$userid = $_SESSION['user_id'];    	  
		$query = pg_query("select * from  ".'users.usr$company_service_map'." where org_id=".$userid." and service_active_yn='Y'");
		while($item = pg_fetch_object($query))
		{
			$details[] =  $item->service_id;
		}
	  	return  $details;
	}
	
	//get user information 
	function getmyinfo($usertype,$userid)
	{
		$list = array();
		//condition for technician info  	    
		if($usertype=='T')
		{
			//technician replaced by company so 
			$query = pg_query("select * from  ".'users.usr$company_profile'." where org_id=".$userid);
			$items = pg_fetch_object($query); 
			//$details['image_url'] = $items->image_id;
			$list[] = array("status" => "Y","org_name" => $items->org_nm,"email_id" => $items->email_id,"org_desc" => $items->org_desc,"org_rmrks" => $items->org_rmrks,"org_active_yn" => $items->org_active_yn,"wrk_desc" => $items->wrk_desc,"contact_no" => $items->contact_no,"loc_city_nm" => $items->loc_city_nm,"loc_state_nm" => $items->loc_state_nm,"loc_zip" => $items->loc_zip,"bill_addr_ln1" => $items->bill_addr_ln1,"bill_addr_ln2" => $items->bill_addr_ln2,"bill_city" => $items->bill_city,"bill_region" => $items->bill_region,"bill_zip" => $items->bill_zip,"bill_country" => $items->bill_country,"website_url" => $items->website_url);
		}

		if($usertype=='C')
		{
			$query = pg_query("select * from  ".'users.usr$customer_profile'." where customer_id=".$userid);
			$items = pg_fetch_object($query); 
			//$details['image_typ'] = $items->image_typ;
			$list[] = array("status" => "Y","first_nm" => $items->first_nm,"last_nm" => $items->last_nm,"email_id" => $items->email_id,"date_of_birth" => $items->date_of_birth,"contact_no" => $items->contact_no,"loc_city_nm" => $items->loc_city_nm,"loc_state_nm" => $items->loc_state_nm,"loc_zip" => $items->loc_zip,"loc_addr_ln1" => $items->loc_addr_ln1,"loc_addr_ln2" => $items->loc_addr_ln2,"loc_country" => $items->loc_country);
		} 
		return $list;
	}
}//end of class
$helper = new Truhome;
?>