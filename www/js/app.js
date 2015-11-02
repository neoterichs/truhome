// JavaScript Document
var globalip = "45.79.145.23/truhome.co/public_html/phonegapservices";
//var globalip = "192.168.1.10/ionic/truhome/services";
var token = "";
angular.module('ionicApp', ['ionic','ngCordova','ngIOS9UIWebViewPatch','starter.controllers'])
.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('eventmenu', {
      url: "/event",
      abstract: true,
      templateUrl: "templates/event-menu.html"
    })
    .state('eventmenu.home', {
      url: "/home",
      views: {
        'menuContent' :{
          templateUrl: "templates/home.html"
        }
      }
    })
    .state('eventmenu.checkin', {
      url: "/check-in",
      views: {
        'menuContent' :{
          templateUrl: "templates/check-in.html",
          controller: "CheckinCtrl"
        }
      }
    })
	.state('eventmenu.about', {
      url: "/about",
      views: {
        'menuContent' :{
          templateUrl: "templates/about.html"
        }
      }
    })
	.state('eventmenu.services', {
      url: "/services",
      views: {
        'menuContent' :{
          templateUrl: "templates/services.html"
        }
      }
    })
	.state('eventmenu.contactus', {
        url: "/contactus",
        views: {
          'menuContent' :{
            templateUrl: "templates/contactus.html",
			controller: "MapCtrl"
          }
        }
      })
	.state('eventmenu.sign-in', {
      url: "/sign-in",
      views: {
        'menuContent' :{
          templateUrl: "templates/sign-in.html",
		  controller: 'SignInCtrl'
        }
      }
    })
	.state('eventmenu.getinformation', {
      url: "/getinformation",
      views: {
        'menuContent' :{
          templateUrl: "templates/getinformation.html",
        }
      }
    })
	.state('eventmenu.emailus', {
      url: "/emailus",
      views: {
        'menuContent' :{
          templateUrl: "templates/emailus.html",
		  controller: "emailCtrl"
        }
      }
    })
    .state('eventmenu.attendees', {
      url: "/attendees",
      views: {
        'menuContent' :{
          templateUrl: "templates/attendees.html",
          controller: "AttendeesCtrl"
        }
      }
    })
	.state('eventmenu.account', {
      url: "/account",
      views: {
        'menuContent' :{
          templateUrl: "templates/account.html"
        }
      }
    })
	.state('eventmenu.profile', {
      url: "/profile",
      views: {
        'menuContent' :{
          templateUrl: "templates/profile.html",
		  controller: "profileCtrl"
        }
      }
    })
	.state('eventmenu.changepassword', {
      url: "/changepassword",
      views: {
        'menuContent' :{
          templateUrl: "templates/changepassword.html",
		  controller: "changepasswordCtrl"
        }
      }
    })
	.state('eventmenu.billinginfo', {
      url: "/billinginfo",
      views: {
        'menuContent' :{
          templateUrl: "templates/billinginfo.html",
		  controller: "billinginfoCtrl"
        }
      }
    })
	.state('eventmenu.helpsupport', {
      url: "/helpsupport",
      views: {
        'menuContent' :{
          templateUrl: "templates/helpsupport.html",
		  //controller: "helpsupportCtrl"
        }
      }
    })
	.state('eventmenu.history', {
      url: "/history",
      views: {
        'menuContent' :{
          templateUrl: "templates/history.html",
		  //controller: "historyCtrl"
        }
      }
    })
	.state('eventmenu.logout', {
      url: "/logout",
      views: {
        'menuContent' :{
          templateUrl: "templates/logout.html",
		  controller: "logoutCtrl"
        }
      }
    })
  
  $urlRouterProvider.otherwise("/event/check-in");
})

.directive('map', function() {
	return {
		restrict: 'E',
		scope: {
		  onCreate: '&'
		},
		link: function ($scope, $element, $attr) {
		  function initialize() {
			var myLatLng = {lat: 27.9769145, lng: -82.5590481};
			var mapOptions = {
			  center: new google.maps.LatLng(27.9769145, -82.5590481),
			  zoom: 16,
			  mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			var map = new google.maps.Map($element[0], mapOptions);
			var marker = new google.maps.Marker({
				position: myLatLng,
				map: map,
				label: "A",
				content:"Hello World!"
			});
			var infowindow = new google.maps.InfoWindow({
			  content:"5424 Ginger Cove Dr"
			});
			infowindow.open(map,marker);
			
			$scope.onCreate({map: map});
	
			// Stop the side bar from dragging when mousedown/tapdown on the map
			google.maps.event.addDomListener($element[0], 'mousedown', function (e) {
			  e.preventDefault();
			  return false;
			});
		  }
	
		  if (document.readyState === "complete") {
			initialize();
		  } else {
			google.maps.event.addDomListener(window, 'load', initialize);
		  }
		}
  	}
})

