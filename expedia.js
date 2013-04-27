
var foo = null

YUI().use('jsonp', 'jsonp-url', function (Y) {
  function getExpediaUrl(city, ccode) {
    var url =
    "http://api.ean.com/ean-services/rs/hotel/v3/list?minorRev=22"+
    "&cid=55505"+
    "&apiKey=h6p3b3ewhjued3ks2uyvc884"+
    "&locale=en_US"+
    "&currencyCode=GBP"+
    "&city="+city+
    "&countryCode="+ccode+
	"&stateProvinceCode=''"+
    "&supplierCacheTolerance=MED_ENHANCED"+
    "&arrivalDate=04/27/2013"+
    "&departureDate=04/31/2013"+
    "&room1=2"+
    "&numberOfResults=10"+
    "&callback={callback}";
    return url
    }
  
  function getHotelInfo(resp) {
    console.log(resp);
    for(property in resp) {
      console.log(property)
    }
    console.log(resp["HotelListResponse"])
    console.log(resp["HotelListResponse"]["HotelList"])
    console.log(resp["HotelListResponse"]["HotelList"]["HotelSummary"])
    console.log(resp["HotelListResponse"]["HotelList"]["HotelSummary"][0])
    console.log(resp["HotelListResponse"]["HotelList"]["HotelSummary"][0]["address1"])
    var firstHotelAddr = resp["HotelListResponse"]["HotelList"]["HotelSummary"][0]["address1"];
    document.getElementById("result").innerHTML = "first hotel address: "+firstHotelAddr
  }
  
  foo = function(city, ccode) {
    Y.jsonp(getExpediaUrl(city, ccode), getHotelInfo);
	}

}


);