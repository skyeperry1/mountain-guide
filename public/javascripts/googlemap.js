(function(){
var app = angular.module('google-map', []);


app.directive('map', function() {
    return {
        restrict: 'E',
        replace: true,
        template: '<div></div>',
        controller: function() {
            
            this.lat;
            this.lon;

           

            this.getLatLng = function(mountain){
            	this.lat = mountain.coordinates.lat;
            	this.lon = mountain.coordinates.lon;
            };

            this.appendMap = function(mountain){
            	console.log(mountain);
            	this.getLatLng(mountain);
            	this.divID = mountain.symbol;
            	console.log(document.getElementById(this.divID)); 
            	this.myOptions = {
                zoom: 14,
                center: new google.maps.LatLng(this.lat ,this.lon ),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            	};

            	 this.map = new google.maps.Map(document.getElementById(this.divID), this.myOptions);  
            	 this.map = new google.maps.Map(document.getElementById(this.divID), this.myOptions);  
            	 
            };

            
            //console.log("lat " + this.lat);
           // console.log("lon " + this.lon);
            
        },
        controllerAs: 'map'
    };
});

})(); //Function Wrapper