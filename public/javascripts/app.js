(function(){
var app = angular.module('mountainguide', ['mountainguide-mountains']);

app.controller('MountainController', function(WeatherService){
	this.info = mountains;

	 this.info.forEach(updateMtnWeather);
	 

	function updateMtnWeather(element, index, array) {
	array[index].weatherconditions = WeatherService.getWeather(array[index].coordinates.lon, array[index].coordinates.lat);
  	console.log(array[index].weatherconditions);
	}  

	
}); //MountainController(Main)

var mountains = [
	{
		name : "Mount Washington",
		elevation : 6288,
		location : "Pinkham's Grant, NH",
		summited: false,
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
		weatherconditions: null
	},
	{
		name : "Owl's Head",
		elevation : 4025,
		location : "Frankconia, NH",
		summited: true,
		image: "https://d30y9cdsu7xlg0.cloudfront.net/png/16025-200.png",
		notes : [
				{
					date: new Date(),
					trail: "Main trail",
					body: "It was a good hike"
				},
				{
					date:  new Date(),
					trail: "west trail",
					body: "It was a crappy hike"
				}
		],
		coordinates: {lon: 44.144444 , lat: -71.605},
		weatherconditions: null
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


app.factory('wikiService', function($http) {

    var wikiService = {
        get: function(term) {
            return $http.jsonp('http://wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&titles=' + term + '&format=json&callback=JSON_CALLBACK');
        }
    };
    return wikiService;
});


app.controller('WikiController', function($scope, wikiService) {
    var wiki = this;
    wiki.pojam = 'Mount_Liberty_(New_Hampshire)';
      
   	wiki.getInfo = function(){
        wikiService.get(wiki.pojam).then(function(data) {
            wiki.wikiData = data.data;
         	var id = Object.keys(wiki.wikiData.query.pages)[0];
       	 	wiki.text = wiki.wikiData.query.pages[id].revisions[0]['*'];
       	 	
       	 	//Split the text into an array of newline charecters
       	 	
       	 	var mysplit = wiki.text.split("\n");

       	 		
       	 	//console.log(mysplit);
       	 	var elevation;
       	 	
       	 	var mymatch;

       	 	var searchTerms = ['lat_d','long_d','location', "region", 'elevation_ft'];

       	 	for(var i=0; i < mysplit.length; i++){
       	 		for(var j=0; j < searchTerms.length; j++){
	       	 		if( mysplit[i].match(searchTerms[j]) ){
	   	 			mymatch = mysplit[i];
	   	 			console.log(mymatch);
	   	 			mymatch = mymatch.replace(/[^\d\-\.\|]/g,'');
	   	 			console.log("After Replace" + mymatch);

	   	 			//Count the periods to see if both lon and lat are together
	   	 			var letter = '\\.';
	   	 			var periodCount = ( mymatch.match( RegExp(letter,'g') ) || [] ).length;	   	 		
	   	 			console.log("periosCount: " + periodCount);

	   	 			if( periodCount > 1){
	   	 				console.log("more than two periods found");
	   	 				mymatch = mymatch.replace(/[^\d\-\.]/g,' ');
	   	 				mymatch = mymatch.trim().split(" ");
	   	 				console.log(mymatch);
	   	 			}

	   	 			console.log(mymatch);	   	 
	   	 			console.log("******MATCH FOUND*******" + searchTerms[j] + mymatch);
	   	 			} //End Match Sanatizing
				}

       	 	} //End Data Array Loop

       	 	
            
        });
    }	// getWikiInfo
 

wiki.getInfo();
    
});    



})(); //Function Wrapper