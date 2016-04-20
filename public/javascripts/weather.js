(function(){
	var app = angular.module('mountainguide-weather',[]);

	app.factory('WeatherService', function($http){
return{
  getWeather: function(lon,lat){

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
                    //pressure: null
                    }; //Initialize Object to return

    $http.jsonp('http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=imperial&callback=JSON_CALLBACK&APPID=f9dbd911bc01df1d9ce563b2ba4d3209')
   .success(function(data){
      if(data){
        todaysWeather.city = data.name;
        if(data.main){
        todaysWeather.temp.cur = data.main.temp;
        todaysWeather.temp.min = data.main.temp_min;
        todaysWeather.temp.max = data.main.temp_max;
        todaysWeather.humidity = data.main.humidity;
        //todaysWeather.pressure = data.main.pressure;
        //console.log(data);
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
          todaysWeather.sunrise = data.sys.sunrise * 1000;  
          todaysWeather.sunset = data.sys.sunset * 1000;  
          //console.log("sunrise: " + data.sys.sunrise + "city: " + data.sys.sunset);
        }
      } else {
        //Error Reporting
        console.log(long + '/' + lat + 'No Weather Data Found'); 
      }
    });
    //console.log(todaysWeather);
    return todaysWeather;
  }  //End getWeather
  }; //End Factory Return
});  //End WeatherService Factory



})(); //Function Wrapper