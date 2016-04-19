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
		templateUrl: 'mountain-info.html'
	};
});//Mountain Info

app.directive('mountainPanel', function(){
	return{
		restrict: 'E',
		templateUrl: 'mountain-panel.html',
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
				},
		controllerAs: 'panel' //mountainPanel Controller
	};
});
})();