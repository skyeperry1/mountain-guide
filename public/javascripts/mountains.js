(function(){
	var app = angular.module('mountainguide-mountains',[]);



app.controller('NoteController',function(){
	this.note = {};
	this.addNote = function(mountain){
		mountain.notes.push(this.note);
		this.note = {};
	};

});//NoteController

app.directive('mountainInfo',function(){
	return{
		restrict: 'E',
		templateUrl: '/views/mountain-info.html'
	};
});//Mountain Info

app.directive('mountainPanel', function(){
	return{
		restrict: 'E',
		templateUrl: '/views/mountain-panel.html',
		controller : function(){

					this.tab = 1;
					this.expanded = false;

					this.getColor = function(mountain){
						if(mountain.region === "East"){
							return "#0964b7";
						}
						if(mountain.region === "West"){
							return "#E25041";
						}
					};

					this.selectTab= function(setTab){
						this.tab = setTab;
					};

					this.toggleExpand = function(){
						if (this.expanded){
							this.expanded = false;
						} else {
							this.expanded = true;
						}
					};

					this.isSelected = function(checkTab){
						return this.tab === checkTab;
					};
	           

		            this.getLatLng = function(mountain){
		            	this.lat = mountain.coordinates.lat;
		            	this.lon = mountain.coordinates.lon;
		            };

		            this.appendMap = function(mountain){
		            	
		            	this.getLatLng(mountain);
		            	this.divID = mountain.symbol;
		            	console.log(document.getElementById(this.divID)); 
		            	this.myOptions = {
		                zoom: 14,
		                center: new google.maps.LatLng(this.lat ,this.lon ),
		                mapTypeId: google.maps.MapTypeId.TERRAIN,
		                disableDefaultUI: true
		            	};

		            	var map = new google.maps.Map(document.getElementById(this.divID), this.myOptions);  
		            	var mapCenter = map.getCenter();

		            	setTimeout(function () {
    					google.maps.event.trigger(map, 'resize');
    					console.log("resizing");
    					map.setCenter(mapCenter);
						}, 10);
		            };
				},
		controllerAs: 'panel' //mountainPanel Controller
	};
});
})();