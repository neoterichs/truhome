<?php
include('conn.php');
$msg = '';
$msg .= '<table border="1" style="width:100%">';
$msg .= '<tr>';
$msg .= '<td>Name:</td><td>'.$_POST['cont_name'].'</td>';
$msg .= '</tr>';
$msg .= '<tr>';
$msg .= '<td>Mail:</td><td>'.$_POST['cont_mail'].'</td>';
$msg .= '</tr>';
$msg .= '<tr>';
$msg .= '<td>Url:</td><td>'.$_POST['cont_url'].'</td>';
$msg .= '</tr>';
$msg .= '<tr>';
$msg .= '<td>Message:</td><td>'.$_POST['cont_message'].'</td>';
$msg .= '</tr>';
$msg .= '</table>';
$to = 'neoteric.kkarma@gmail.com';
$subject = 'Contact us mail';
$message = $msg;

$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
$headers .= 'From: k.karma@neoterichs.com' . "\r\n" .
			'Reply-To: k.karma@neoterichs.com' . "\r\n" .
			'X-Mailer: PHP/' . phpversion();

//mail($to, $subject, $message, $headers);
//insert code
$list = array();
$q_3 = pg_query("select send_mail_truhome('".$_POST['cont_name']."','".$_POST['cont_mail']."','".$_POST['cont_url']."','".$_POST['cont_message']."')");
echo "send_mail_truhome('".$_POST['cont_name']."','".$_POST['cont_mail']."','".$_POST['cont_url']."','".$_POST['cont_message']."')";
if($q_3){
	$list[] = array('status' => "Y");
}else{ 
	$list[] = array('status' => "N");
}



echo json_encode($list);
?>