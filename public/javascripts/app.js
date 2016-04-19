(function(){
var app = angular.module('mountainguide', ['mountainguide-mountains']);

app.controller('MountainController', function(WeatherService){
	this.info = mountains;

	 this.info.forEach(updateMtnWeather);
	 

	function updateMtnWeather(element, index, array) {
		if(array[index].coordinates.lon &&  array[index].coordinates.lat){
	array[index].weatherconditions = WeatherService.getWeather(array[index].coordinates.lon, array[index].coordinates.lat);
  	console.log(array[index].weatherconditions);
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
		coordinates: {lon: 44.270489039 , lat: -71.303246453},
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
		coordinates: {lon: 44.144444 , lat: -71.605},
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


app.factory('WeatherService', function($http){
return{
  getWeather: function(lat,lon){

    var todaysWeather = { 
                    city : null,
                    temp : {}, 
                    sunrise:null,
                    sunset:null,
                    clouds: null, 
                    icon: null,
                    description: null,
                    wind: {},
                    humidity:null,
                    }; //Initialize Object to return
      
    //$http.jsonp('http://api.openweathermap.org/data/2.5/weather?zip=' + zipCode + ',us&units=imperial&callback=JSON_CALLBACK&APPID=fbd17554e063d707ecf8d9d4357f5765')
    //http://api.openweathermap.org/data/2.5/weather?lat=71.303&lon=44.270&units=imperial&APPID=fbd17554e063d707ecf8d9d4357f5765
    $http.jsonp('http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=imperial&callback=JSON_CALLBACK&APPID=f9dbd911bc01df1d9ce563b2ba4d3209')
   .success(function(data){
      if(data){
        todaysWeather.city = data.name;
        if(data.main){
        todaysWeather.temp.cur = data.main.temp;
        todaysWeather.temp.min = data.main.temp_min;
        todaysWeather.temp.max = data.main.temp_max;
        todaysWeather.humidity = data.main.humidity;
        }
        if(data.clouds){
        todaysWeather.clouds = data.clouds.all;
        }
        if(data.weather){
        todaysWeather.icon = data.weather[0].main.toLowerCase();
        todaysWeather.description = data.weather[0].description;
        }
        if(data.wind){
          todaysWeather.wind.speed = data.wind.speed;
          todaysWeather.wind.direction = data.wind.deg;
        }
        if(data.sys){
          todaysWeather.sunrise = new Date(data.sys.sunrise * 1000).getHours() //+ ":" + new Date(data.sys.sunrise * 1000).getMinutes();
          todaysWeather.sunset = new Date(data.sys.sunset * 1000).getHours() //+ ":" + new Date(data.sys.sunset * 1000).getMinutes();
        }
      } else {
        //Error Reporting
        alert(long + '/' + lat + 'No Weather Data Found'); 
      }
    });
    //console.log(todaysWeather);
    return todaysWeather;
  }  //End getWeather
  }; //End Factory Return
});  //End WeatherService Factory


})(); //Function Wrapper