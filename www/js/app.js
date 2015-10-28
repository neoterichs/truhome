// JavaScript Document
//var globalip = "192.168.1.3:1837";
var globalip = "50.116.21.72:1837";
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

