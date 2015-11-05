<?php
include("conn.php");

$list = array();
$sublist = array();

$user_typ = $_POST['usertype'];
$userid = $_POST['userid'];
$slocid = $_POST['slocid'];
if($user_typ == 'T'){
	$getinfo = pg_query("SELECT SUM(mc_gross) AS Total_paid FROM ".'trans.tns$gateway_transactions'." WHERE sloc_id=".$slocid." and org_id=".$userid." and payment_status='Completed'");
	$dt_q = pg_fetch_object($getinfo);
	
	/* get all transaction history info */
	$trans_q = pg_query("SELECT sloc_id, org_id, id, mc_gross, protection_eligibility, payer_id,tax, payment_date, payment_status, first_name, mc_fee, notify_version, 
       					custom, payer_status, business, quantity, payer_email, verify_sign,txn_id, payment_type, last_name, receiver_email, payment_fee,receiver_id, txn_type
						,item_name, mc_currency, item_number, residence_country,test_ipn, handling_amount, transaction_subject, payment_gross,shipping, auth, create_id, create_dt
 	 					FROM ".'trans.tns$gateway_transactions'." where  sloc_id=".$slocid." and org_id=".$userid."");
	
	$count = pg_num_rows($trans_q);
	if($count > 0){
		while($item = pg_fetch_object($trans_q)){
			$sublist[] = array("status" => "Y","order_id" => $item->id,"transaction_id" => $item->txn_id,"t_date" => $item->create_dt,"amt" => $item->mc_gross);
		}
	}
	else $sublist[] = array("status" => "N");
	/* get all transaction history info end */
	
	$list[] = array("total_paid" => $dt_q->total_paid,'product_name'=>'Click Count','amount'=>13.00,'billinginfo'=>$sublist);
}
echo json_encode($list);
?>