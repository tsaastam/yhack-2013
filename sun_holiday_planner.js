var map;
                var geocoder;
                var weatherLayer;
                
                //var myLocation = "London, UK";
                
                function initialize() {
                    
                    var mapOptions = {
                        zoom: 6,
                        center: new google.maps.LatLng(51.511,-0.118),
                        mapTypeId: google.maps.MapTypeId.ROADMAP,
                    };
                    
                    map = new google.maps.Map(document.getElementById('map-canvas'),
                                                  mapOptions);
                    
                    weatherLayer = new google.maps.weather.WeatherLayer({
                                                                            temperatureUnits: google.maps.weather.TemperatureUnit.CELSIUS,
                                                                            suppressInfoWindows: true
                                                                            });
                    
                    weatherLayer.setMap(map);

                    google.maps.event.addListener(weatherLayer, "click", function(smallPopup){
                      var meteoForecast = document.getElementById('meteo-forecast');
                      meteoForecast.innerHTML = smallPopup.infoWindowHtml;

                      alert(smallPopup.featureDetails.location);
                    });
                    
                    /*var cloudLayer = new google.maps.weather.CloudLayer();
                     cloudLayer.setMap(map);*/
                    
                    geocoder = new google.maps.Geocoder();
                }
                
                function codeAddress() {
                  var address = document.getElementById('address').value;

                  geocoder.geocode( { 'address': address}, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                      map.setCenter(results[0].geometry.location);
                      map.setZoom(9);  // I like 9-10 but play around and see what you like
                      var marker = new google.maps.Marker({
                          map: map,
                          position: results[0].geometry.location
                      });
                    } else {
                      alert('Geocode was not successful for the following reason: ' + status);
                    }
                  });
                }

                google.maps.event.addDomListener(window, 'load', initialize);