(function(){
	var app = angular.module('mountainguide-mountains',[]);

	app.controller('PanelController', function(){

	this.tab = 1;

	this.selectTab= function(setTab){
		this.tab = setTab;
	};

	this.isSelected = function(checkTab){
		return this.tab === checkTab;
	};


});//PanelController

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

					this.selectTab= function(setTab){
						this.tab = setTab;
					};

					this.isSelected = function(checkTab){
						return this.tab === checkTab;
					};
				},
		controllerAs: 'panel' //mountainPanel Controller
	};
});
})();