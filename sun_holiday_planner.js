// Author: Marcello Seri
// encoding: utf-8
// Yahoo! Hack Europe London
//

var map;
var geocoder;
var weatherLayer;
var marker;

// Add trim support to older browsers
if(typeof(String.prototype.trim) === "undefined")
{
    String.prototype.trim = function() 
    {
        return String(this).replace(/^\s+|\s+$/g, '');
    };
}

function initialize() {

  // Minimal map options, here I set a smaller zoom to see 
  // more Europe when we start the map
  var mapOptions = {
    zoom: 8,
    center: new google.maps.LatLng(51.511,-0.118),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  };

  // The map will be shown in id='map-canvas'
  map = new google.maps.Map(document.getElementById('map-canvas'),
    mapOptions);

  // Create new Weather Layer with Celsius temperature and no popup
  weatherLayer = new google.maps.weather.WeatherLayer({
    temperatureUnits: google.maps.weather.TemperatureUnit.CELSIUS,
    suppressInfoWindows: true
  });

  // Overlay the weather layer to the map
  weatherLayer.setMap(map);

  // Control the clicks and add a listener to get infoHtml and other informations
  google.maps.event.addListener(weatherLayer, "click", function(smallPopup){
    manageWeatherClick(smallPopup);
  });

  // Reaaly? You want those horrible cloud layer?
  /*var cloudLayer = new google.maps.weather.CloudLayer();
  cloudLayer.setMap(map);*/
    
  geocoder = new google.maps.Geocoder();
}

// Manage the geocoding
function codeAddress() {

  // Get Location string
  var address = document.getElementById('address').value;

  // Find the location...
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
        // Location found -> recenter on the new location
        map.setCenter(results[0].geometry.location);
        // and zoom in a bit
        map.setZoom(10);  // I like 9-10 but play around and see what you like

        // This part adds a marker... if you dont want it, just comment it
        marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
        });
    } else {
      // Tell us that there was a problem..
      alert('Geocode was not successful for the following reason: ' + status);
    }

    var meteoForecast = document.getElementById('meteo-forecast');
    meteoForecast.innerHTML = "<span id='workaround'>Click on a weather icon to reload the data</span>";

    var resultDiv = document.getElementById('result');
    resultDiv.innerHTML = " ";

    var weatherH = document.getElementById('weatherH');
    var hotelsH = document.getElementById('hotelsH');
    var flickrH = document.getElementById('flickrH');
    
    
    document.getElementById('textWE').style.visibility='visible';
  document.getElementById('textHO').style.visibility='visible';
    document.getElementById('textFL').style.visibility='visible';
    weatherH.innerHTML = " ";
    hotelsH.innerHTML = " ";
    flickrH.innerHTML = " ";

    window.scrollTo(-100, -100);
  });
}

// Manage the clicks on the weather icons
function manageWeatherClick(smallPopup) {
  // First set the weather HTML
  var meteoForecast = document.getElementById('meteo-forecast');
  meteoForecast.innerHTML = smallPopup.infoWindowHtml;

  var weatherH = document.getElementById('weatherH');
  var hotelsH = document.getElementById('hotelsH');
  var flickrH = document.getElementById('flickrH');
 
  weatherH.innerHTML = " <h1>Forecast</h1> ";
  hotelsH.innerHTML = " <h1>Hotels by Expedia</h1> ";
  flickrH.innerHTML = " <h1>Loading...</h1> "

  //window.location.href = '#weatherH';
  window.scrollTo(250, 250);

  // Then collect location and country name!
  var locationName = smallPopup.featureDetails.location.split(',')[0].trim();
  var countryName = smallPopup.featureDetails.location.split(',')[1].trim();

  // We shall do something with this
  //alert(locationName + " -> " + countryName);
  foo(locationName, countryName);
  flickrData(locationName, countryName);
  

}

// Initialise the map on load
google.maps.event.addDomListener(window, 'load', initialize);


function maybeSubmit(e)
{
    if(e && e.keyCode == 13) {
        console.log("enter pressed in search box -> calling codeAddress()");
        codeAddress();
        return false;
    }
    return true;
}
