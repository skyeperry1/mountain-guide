(function(){
	var app = angular.module('icon-filter', []);
	
	app.filter('summitTypeIcon', function(){
		return function(input) {
				
			if(input.search(/alpine/i) ){return "icon-summit-alpine";}
			if(input.search(/wooded/i)){return "icon-summit-wooded";}
			else{return "";}
		};
	});

	app.filter('trailDesignation', function(){
		return function(input){
			if(input.search(/Wilderness/i) ){return "icon-designation-wilderness";}
			if(input.search(/appalachian/i)){return "icon-designation-appalachain";}
			else{return "";}
		};
	});

	app.filter('summitView', function(){
		return function(input){
			if(input.search(/lookout|observation/i) ){return "icon-lookout-obsv";}
			if(input.search(/natural/i)){return "icon-lookout-ntrl";}
			else{return "";}
		};
	});

})();//function wrapper