(function(){
var app = angular.module('mountainguide', ['mountainguide-mountains', 'mountainguide-weather', 'weather-icon-filters', 'google-map']);

app.controller('MountainController', function(WeatherService){
	this.info = mountains;

	 this.info.forEach(updateMtnWeather);
	 

	function updateMtnWeather(element, index, array) {
		if(array[index].coordinates.lon &&  array[index].coordinates.lat){
	array[index].weatherconditions = WeatherService.getWeather(array[index].coordinates.lon, array[index].coordinates.lat);
  	//console.log(array[index].weatherconditions);
  	}
	};  

	
}); //MountainController(Main)

var mountains = [
	{	
		rank : 1,
		name : "Mount Washington",
    symbol: "Wa",
    display_name: "Washington",
		elevation : 6288,
		location : "Pinkham's Grant",
    county: "CO",
    land_manager: "NH",
		summited: false,
    summit_type: "Alpine",
    range: "Franconia",
    region: "East",
    designation: "Wilderness Area",
    phone: 6035955555,
		image : "https://d30y9cdsu7xlg0.cloudfront.net/png/16025-200.png", 
		notes : [
				{
					date: new Date(),
					trail: "Main trail",
					body: "It was a good hike"
				},
				{
					date: new Date(),
					trail: "west trail",
					body: "It was a crappy hike"
				}
				],
		coordinates: {lon: -71.303246453 , lat:44.270489039 },
		weatherconditions: null,
    trails: [{
      name: "Skyline Trail", 
      distance: 10.2, 
      booktime: "6:45",
      badge: "/images/badges/badge.png",
      complete: true
    }, 
    {
      name: "Skyline Trail", 
      distance: 10.2, 
      booktime: "6:45",
      badge: "/images/badges/badge.png",
      complete: false
    }]
	},
	{	
		rank: 43,
		name : "Owl's Head",
    symbol: "Oh",
    display_name: "Owl's Head",
    county: "CO",
    land_manager: "NH",
		elevation : 4025,
		location : "Frankconia",
		summited: true,
    summit_type: "Alpine",
    range: "Franconia",
    region: "West",
    designation: "Wilderness Area",
    phone: 6035955555,
		image: "https://d30y9cdsu7xlg0.cloudfront.net/png/16025-200.png",
		notes : [
				{
					date: new Date(),
					trail: "Main trail",
					body: "It was a good hike"
				}
		],
		coordinates: {lon:-71.605  , lat: 44.144444},
		weatherconditions: null,
    trails: [{
      name: "Skyline Trail", 
      distance: 10.2, 
      booktime: "6:45",
      badge: "/images/badges/badge.png",
      complete: true
    }, 
    {
      name: "Skyline Trail", 
      distance: 10.2, 
      booktime: "6:45",
      badge: "/images/badges/badge.png",
      complete: true
    }]
	}
];//Mountains





})(); //Function Wrapper