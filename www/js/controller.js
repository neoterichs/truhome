// JavaScript Document
var globalusertype = "";
var globaluserid = "";
var slocid = "";
var orgid = "";
angular.module('starter.controllers', [])
.controller('MainCtrl', function($scope, $ionicSideMenuDelegate,$rootScope,$state) {
  $scope.attendees = [
    { firstname: 'Nicolas', lastname: 'Cage' },
    { firstname: 'Jean-Claude', lastname: 'Van Damme' },
    { firstname: 'Keanu', lastname: 'Reeves' },
    { firstname: 'Steven', lastname: 'Seagal' }
  ];
  
  var check_login =  localStorage.getItem("checklogin");
  globalusertype = localStorage.getItem("usertype");
  globaluserid = localStorage.getItem("userid");
  slocid = localStorage.getItem("slocid");
  orgid = localStorage.getItem("orgid");
 
  if(check_login == "set"){
  	$rootScope.control = {showLogin:false,showAccount:true,showLogout:true};
	$state.go('eventmenu.checkin');
  }else{
	$rootScope.control = {showLogin: true,showAccount:false,showLogout:false}; 
	$state.go('eventmenu.checkin');
  }
  	
  
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
})

.controller('CheckinCtrl', function($scope) {
  $scope.showForm = true;
  
  $scope.shirtSizes = [
    { text: 'Large', value: 'L' },
    { text: 'Medium', value: 'M' },
    { text: 'Small', value: 'S' }
  ];
  
  $scope.attendee = {};
  $scope.submit = function() {
    if(!$scope.attendee.firstname) {
      alert('Info required');
      return;
    }
    $scope.showForm = false;
    $scope.attendees.push($scope.attendee);
  };
  
})

.controller('AttendeesCtrl', function($scope) {
  
  $scope.activity = [];
  $scope.arrivedChange = function(attendee) {
    var msg = attendee.firstname + ' ' + attendee.lastname;
    msg += (!attendee.arrived ? ' has arrived, ' : ' just left, '); 
    msg += new Date().getMilliseconds();
    $scope.activity.push(msg);
    if($scope.activity.length > 3) {
      $scope.activity.splice(0, 1);
    }
  };
  
})

.controller('MapCtrl', function($scope, $ionicLoading) {
	$scope.mapCreated = function(map) {
		$scope.map = map;
	};
	
	$scope.centerOnMe = function () {
		console.log("Centering");
		if (!$scope.map) {
		  return;
		}
	
		$scope.loading = $ionicLoading.show({
		  content: 'Getting current location...',
		  showBackdrop: false
		});
	
		navigator.geolocation.getCurrentPosition(function (pos) {
		  console.log('Got pos', pos);
		  $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
		  $scope.loading.hide();
		}, function (error) {
		  alert('Unable to get location: ' + error.message);
		});
	};
})

.controller('emailCtrl', function($scope,$state,$http,$ionicPopup) {
	$scope.user = {
			name : '',
			email : '',
			website : '',
			comments : ''
	};
	
	$scope.sendemail = function(user){
		var name = user.name;
		var email = user.email;
		var website = user.website;
		var comments = user.comments;
		
		var data_parameters = "cont_name="+name+ "&cont_mail="+email+ "&cont_url="+website+ "&cont_message="+comments;
		$http.post("http://"+globalip+"/email.php",data_parameters, {
			headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
		})
		.success(function(response){
			if(response[0].status == "Y"){
				$ionicPopup.show({
				  template: '',
				  title: 'Email sent successfully.',
				  scope: $scope,
				  buttons: [
					{
					  text: 'Ok',
					  type: 'button-assertive'
					},
				  ]
				})
			}
		});
	}
})

.controller('SignInCtrl', function($scope,$state,$http,$ionicPopup,$rootScope) {
	$scope.signIn = function(user) {
		var username = user.username;
		var password = user.password;
		var utype = user.utype;
		
		if(typeof username === "undefined" || typeof password === "undefined" || username == "" || password == ""){
			$ionicPopup.show({
			  template: '',
			  title: 'Please fill all fields',
			  scope: $scope,
			  buttons: [
				{ 
				  text: 'Ok',
				  type: 'button-assertive'
				},
			  ]
			})
		}
		else{
			var data_parameters = "username="+username+ "&password="+password+ "&usertype="+utype;
			$http.post("http://"+globalip+"/login.php",data_parameters, {
				headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
			})
			.success(function(response) {
				console.log(response);
				if(response[0].status == "Y"){
					localStorage.setItem("checklogin","set"); // user is loged in or not
					localStorage.setItem("usertype",utype);  // save user type customer or tech
					localStorage.setItem("userid",response[0].userid);  // save user id
					localStorage.setItem("slocid",response[0].slocid);  // save sloc id
					localStorage.setItem("orgid",response[0].orgid);  // save org id
					$rootScope.control = {showLogin: false,showAccount:true,showLogout:true}; 
					window.location.reload(1);
				}
				else{
					$ionicPopup.show({
					  template: '',
					  title: 'Username or password is wrong',
					  scope: $scope,
					  buttons: [
						{
						  text: 'Ok',
						  type: 'button-assertive'
						},
					  ]
					})
				}
			});
		}
	};
})

.controller('profileCtrl', function($scope,$rootScope,$state,$window,$http) {
	$scope.demo = 'ios';
	$scope.usertitle = {Profiletitle : "Basic"};
	
	if(globalusertype == "T"){
		$scope.control = {showbasictabprofile:true,showaddresstabprofile:true,showworktabprofile:true,showbillingtabprofile:true};
		$scope.control1 = {showBasicprofile_tech:true,showAddressprofile_tech:false,showworkprofile:false,showbillingAddressprofile:false}; 
	}
	else{
		$scope.control = {showbasictabprofile:true,showaddresstabprofile:true,showworktabprofile:false,showbillingtabprofile:false};
		$scope.control1 = {showBasicprofile:true,showAddressprofile:false,showworkprofile:false,showbillingAddressprofile:false}; 
	}
	
  	$scope.setPlatform = function(p) {
		document.body.classList.remove('platform-ios');
		document.body.classList.remove('platform-android');
		document.body.classList.add('platform-' + p);
		$scope.demo = p;
		
		if(p == "ios"){
			if(globalusertype == "T"){
				$scope.control1 = {showBasicprofile_tech:true,showAddressprofile_tech:false,showworkprofile:false,showbillingAddressprofile:false}; 
			}
			else{
				$scope.control1 = {showBasicprofile:true,showAddressprofile:false,showworkprofile:false,showbillingAddressprofile:false}; 
			}
			$scope.usertitle = {Profiletitle : "Basic"};
		}
		if(p == "ionic"){
			if(globalusertype == "T"){
				$scope.control1 = {showBasicprofile: false,showAddressprofile:false,showworkprofile:true,showbillingAddressprofile:false}; 
			}
			else $scope.control1 = {showBasicprofile_tech: false,showAddressprofile_tech:false,showworkprofile:true,showbillingAddressprofile:false}; 
			$scope.usertitle = {Profiletitle : "Work Info"};
		}
		if(p == "ionic1"){
			if(globalusertype == "T"){
				$scope.control1 = {showBasicprofile_tech: false,showAddressprofile_tech:true,showworkprofile:false,showbillingAddressprofile:false}; 
			}
			else $scope.control1 = {showBasicprofile: false,showAddressprofile:true,showworkprofile:false,showbillingAddressprofile:false}; 
			$scope.usertitle = {Profiletitle : "Address"};
		}
		if(p == "ionic2"){
			if(globalusertype == "T"){
				$scope.control1 = {showBasicprofile_tech: false,showAddressprofile_tech:false,showworkprofile:false,showbillingAddressprofile:true}; 
			}
			else $scope.control1 = {showBasicprofile: false,showAddressprofile:false,showworkprofile:false,showbillingAddressprofile:true}; 
			$scope.usertitle = {Profiletitle : "Billing Address"};
		}
	}
	
	//get profile info
	var data_parameters = "usertype="+globalusertype+ "&userid="+globaluserid;
	$http.post("http://"+globalip+"/act_profile.php",data_parameters, {
		headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
	})
	.success(function(response) {
		console.log(response);
		if(globalusertype == "T"){
			$scope.user = {org_name : response[0].org_name,org_email_id : response[0].email_id,org_rmrks : response[0].org_rmrks,org_desc : response[0].org_desc,org_contact_no : response[0].contact_no,org_wrk_desc : response[0].wrk_desc,org_website_url : response[0].website_url,org_bill_country : response[0].bill_country,org_loc_state_nm : response[0].loc_state_nm,org_loc_city_nm : response[0].loc_city_nm,org_loc_zip : response[0].loc_zip,org_bill_addr_ln1 : response[0].bill_addr_ln1,org_bill_addr_ln2 : response[0].bill_addr_ln2,org_bill_region : response[0].bill_region,org_bill_city : response[0].bill_city,org_bill_zip : response[0].bill_zip};
		}
		else{
			$scope.user = {cust_first_nm : response[0].first_nm,cust_last_nm : response[0].last_nm,cust_email_id : response[0].email_id,cust_date_of_birth : response[0].date_of_birth,cust_contact_no : response[0].contact_no,cust_loc_addr_ln1 : response[0].loc_addr_ln1,cust_loc_addr_ln2 : response[0].loc_addr_ln2,cust_loc_country : response[0].loc_country,cust_loc_state_nm : response[0].loc_state_nm,cust_loc_city_nm : response[0].loc_city_nm,cust_loc_zip : response[0].loc_zip};
		}
	});
	//get profile info end
})

.controller('changepasswordCtrl', function($scope,$ionicPopup,$state,$http) {
	$scope.user = {
			opassword : '',
			npassword : '',
			cpassword : ''
	};
	
	$scope.changepassword = function(user){
		var oldpass = user.opassword;
		var newpass = user.npassword;
		var confirmpass = user.cpassword;

		if(oldpass != "" && newpass != "" && confirmpass != ""){
			if(newpass != confirmpass){
				$ionicPopup.show({
					  template: '',
					  title: "New & Confirm password didn't match",
					  scope: $scope,
					  buttons: [
						{ 
						  text: 'Ok',
						  type: 'button-assertive'
						},
					  ]
				})
			}
			else{
				var data_parameters = "usertype="+globalusertype+ "&userid="+globaluserid+ "&slocid="+slocid+ "&o_password="+oldpass+ "&ch_password="+newpass;
				$http.post("http://"+globalip+"/changepassword.php",data_parameters,{
					headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
				})
				.success(function(response) {
					if(response[0].status != "N"){
						$ionicPopup.show({
							  template: '',
							  title: "Password changed successfully",
							  scope: $scope,
							  buttons: [
								{ 
								  text: 'Ok',
								  type: 'button-calm'
								},
							  ]
						})
						$scope.user = {
								opassword: '',
								npassword : '',
								cpassword : ''
						};
					}
					else{
						$ionicPopup.show({
							  template: '',
							  title: "Old password is wrong",
							  scope: $scope,
							  buttons: [
								{ 
								  text: 'Ok',
								  type: 'button-assertive'
								},
							  ]
						})
					}
				});
			}
		}
		else{
			$ionicPopup.show({
				  template: '',
				  title: 'Please fill all fields',
				  scope: $scope,
				  buttons: [
					{ 
					  text: 'Ok',
					  type: 'button-assertive'
					},
				  ]
			})
		}
	}
})

.controller('billinginfoCtrl', function($scope,$state,$http) {
	$scope.demo = 'ios';
	$scope.user_btitle = {Profiletitle : "Summary"};
	
	$scope.bcontrol1 = {showBasicprofile:true,showAddressprofile:false,showworkprofile:false,showbillingAddressprofile:false}; 
	$scope.bcontrol = {showbasictabprofile:true,showaddresstabprofile:true,showworktabprofile:true,showbillingtabprofile:true};
	
	$scope.setPlatform = function(p) {
		document.body.classList.remove('platform-ios');
		document.body.classList.remove('platform-android');
		document.body.classList.add('platform-' + p);
		$scope.demo = p;
		
		if(p == "ios"){
			$scope.bcontrol1 = {showBasicprofile:true,showAddressprofile:false,showworkprofile:false,showbillingAddressprofile:false}; 
			$scope.user_btitle = {Profiletitle : "Summary"};
		}
		if(p == "ionic"){
			$scope.bcontrol1 = {showBasicprofile: false,showAddressprofile:false,showworkprofile:true,showbillingAddressprofile:false}; 
			$scope.user_btitle = {Profiletitle : "Pending Payment"};
		}
		if(p == "ionic1"){
			$scope.bcontrol1 = {showBasicprofile: false,showAddressprofile:true,showworkprofile:false,showbillingAddressprofile:false}; 
			$scope.user_btitle = {Profiletitle : "Payment Methods"};
		}
		if(p == "ionic2"){
			$scope.bcontrol1 = {showBasicprofile: false,showAddressprofile:false,showworkprofile:false,showbillingAddressprofile:true}; 
			$scope.user_btitle = {Profiletitle : "Transaction History"};
		}
	}
	
	//get billing info
	var data_parameters = "usertype="+globalusertype+ "&userid="+globaluserid+ "&slocid="+slocid;
	$http.post("http://"+globalip+"/act_billinginfo.php",data_parameters, {
		headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
	})
	.success(function(response) {
		console.log(response);
		if(globalusertype == "T"){
			$scope.user = {org_total_paid : response[0].total_paid,p_product_name : response[0].product_name,p_amount : response[0].amount};
			if(response[0].billinginfo[0].status == "Y")$scope.response = response[0].billinginfo;
			else $scope.response = "City";
		}
		else{
		}
	});
	
	$scope.doRefresh = function() {
    	var data_parameters = "usertype="+globalusertype+ "&userid="+globaluserid+ "&slocid="+slocid;
		$http.post("http://"+globalip+"/act_billinginfo.php",data_parameters, {
			headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
		})
		.success(function(response) {
			console.log(response);
			if(globalusertype == "T"){
				if(response[0].billinginfo[0].status == "Y")$scope.response = response[0].billinginfo;
				else $scope.response = "City";
			}
			else{
			}
			$scope.$broadcast('scroll.refreshComplete');
		});
	};
	//get billing info end
})

.controller('t_detailCtrl', function($scope,$stateParams) {
	$scope.response = $stateParams.order_id;
	$scope.response1 = $stateParams.transaction_id;
	$scope.response2 = $stateParams.t_date;
	$scope.response3 = $stateParams.amt; 
})

.controller('logoutCtrl', function($scope,$ionicLoading,$rootScope,$state,$window) {
	localStorage.setItem("checklogin","notset");
	localStorage.setItem("usertype","");
	window.location.reload(1);
})