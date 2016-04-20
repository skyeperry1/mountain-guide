
(function(){

var app = angular.module('weather-icon-filters', [])
//Get the beaufort wind scale icon html code
app.filter('beaufortIcon', function() {
  return function(input) {
  	var beaufortScale;
    if(input < 1){beaufortScale = 0;}
    if(input >= 1 && input < 4){beaufortScale = 1;}
	if(input >= 4 && input < 8){beaufortScale = 2;}
	if(input >= 8 && input < 13){beaufortScale = 3;}
	if(input >= 13 && input < 19){beaufortScale = 4;}
	if(input >= 19 && input < 25){beaufortScale = 5;}
	if(input >= 25 && input < 32){beaufortScale = 6;}
	if(input >= 32 && input < 39){beaufortScale = 7;}
	if(input >= 39 && input < 47){beaufortScale = 8;}
	if(input >= 47 && input < 55){beaufortScale = 9;}
	if(input >= 55 && input < 64){beaufortScale = 10;}
	if(input >= 64 && input < 73){beaufortScale = 11;}
	if(input >= 73)	{beaufortScale = 12;}
	return "wi wi-wind-beaufort-" + beaufortScale;
  };
});
//Get the main weather icon html code
app.filter('mainWeatherIcon', function() {
  return function(input) {
  	var currentTime = new Date();
  	var iconHtml = "wi ";
  	 if( currentTime > input.sunrise && currentTime < input.sunset){
         iconHtml += "wi-day-";
         if(input.description.search(/ clear | sun | sunny /i)){return iconHtml += "sunny"; }
         if(input.description.search(/ drizzle | rain | showers /i)){return iconHtml += "rain"; }
         if(input.description.search(/ clouds | cloudy | overcast /i)){return iconHtml += "cloudy"; }
      } else {
         iconHtml += "wi-night-";
         if(input.description.search(/ clear | sun | sunny /i)){return iconHtml += "clear"; }
         if(input.description.search(/ drizzle | rain | showers /i)){return iconHtml += "alt-rain"; }
         if(input.description.search(/ clouds | cloudy | overcast /i)){return iconHtml += "alt-cloudy"; }
      }
      return iconHtml;
  };
});


})(); //Function Wrapper