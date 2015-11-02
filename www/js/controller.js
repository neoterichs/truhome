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
					//window.location.reload(1);
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

.controller('profileCtrl', function($scope,$ionicLoading,$rootScope,$state,$window) {
	$scope.demo = 'ios';
	$scope.user = {Profiletitle : "Basic"};
	
	$scope.control1 = {showBasicprofile:true,showAddressprofile:false,showworkprofile:false,showbillingAddressprofile:false}; 
	if(globalusertype == "T")$scope.control = {showbasictabprofile:true,showaddresstabprofile:true,showworktabprofile:true,showbillingtabprofile:true};
	else $scope.control = {showbasictabprofile:true,showaddresstabprofile:true,showworktabprofile:false,showbillingtabprofile:false};
	
  	$scope.setPlatform = function(p) {
		document.body.classList.remove('platform-ios');
		document.body.classList.remove('platform-android');
		document.body.classList.add('platform-' + p);
		$scope.demo = p;
		
		if(p == "ios"){
			$scope.control1 = {showBasicprofile:true,showAddressprofile:false,showworkprofile:false,showbillingAddressprofile:false}; 
			$scope.user = {Profiletitle : "Basic"};
		}
		if(p == "ionic"){
			$scope.control1 = {showBasicprofile: false,showAddressprofile:false,showworkprofile:true,showbillingAddressprofile:false}; 
			$scope.user = {Profiletitle : "Work Info"};
		}
		if(p == "ionic1"){
			$scope.control1 = {showBasicprofile: false,showAddressprofile:true,showworkprofile:false,showbillingAddressprofile:false}; 
			$scope.user = {Profiletitle : "Address"};
		}
		if(p == "ionic2"){
			$scope.control1 = {showBasicprofile: false,showAddressprofile:false,showworkprofile:false,showbillingAddressprofile:true}; 
			$scope.user = {Profiletitle : "Billing Address"};
		}
	}
})

.controller('changepasswordCtrl', function($scope,$ionicLoading,$rootScope,$state,$window) {
})

.controller('billinginfoCtrl', function($scope,$ionicLoading,$rootScope,$state,$window) {
	$scope.demo = 'ios';
	$scope.user = {Profiletitle : "Summary"};
	
	$scope.bcontrol1 = {showBasicprofile:true,showAddressprofile:false,showworkprofile:false,showbillingAddressprofile:false}; 
	$scope.bcontrol = {showbasictabprofile:true,showaddresstabprofile:true,showworktabprofile:true,showbillingtabprofile:true};
	
	$scope.setPlatform = function(p) {
		document.body.classList.remove('platform-ios');
		document.body.classList.remove('platform-android');
		document.body.classList.add('platform-' + p);
		$scope.demo = p;
		
		if(p == "ios"){
			$scope.bcontrol1 = {showBasicprofile:true,showAddressprofile:false,showworkprofile:false,showbillingAddressprofile:false}; 
			$scope.user = {Profiletitle : "Summary"};
		}
		if(p == "ionic"){
			$scope.bcontrol1 = {showBasicprofile: false,showAddressprofile:false,showworkprofile:true,showbillingAddressprofile:false}; 
			$scope.user = {Profiletitle : "Pending Payment"};
		}
		if(p == "ionic1"){
			$scope.bcontrol1 = {showBasicprofile: false,showAddressprofile:true,showworkprofile:false,showbillingAddressprofile:false}; 
			$scope.user = {Profiletitle : "Payment Methods"};
		}
		if(p == "ionic2"){
			$scope.bcontrol1 = {showBasicprofile: false,showAddressprofile:false,showworkprofile:false,showbillingAddressprofile:true}; 
			$scope.user = {Profiletitle : "Transaction History"};
		}
	}
})

.controller('logoutCtrl', function($scope,$ionicLoading,$rootScope,$state,$window) {
	localStorage.setItem("checklogin","notset");
	localStorage.setItem("usertype","");
	window.location.reload(1);
})