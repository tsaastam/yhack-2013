
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
    var info = ''
    
    
    var hotelSummary = resp["HotelListResponse"]["HotelList"]["HotelSummary"];
    var maxIter = hotelSummary.length;

    for(var i =0; i<maxIter; i++ ) { 
   //  info += hotelSummary[i]["address1"]; 
 
 
// info += "<div title=\"\" data-original-title=\"\" class=\"span4\">"+ hotelSummary[i]["address1"]+ "</div>";
 
 info += "    <li><img src=\"http://media.expedia.com" + hotelSummary[i]["thumbNailUrl"] + "\">"+ hotelSummary[i]["address1"] + "</li>";

 
 document.getElementById("result").innerHTML = info 
    }
    
    
   // for(hotelData in resp["HotelListResponse"]["HotelList"]["HotelSummary"] ){
   //   info += '<ul>' + hotelData["address1"] + '</ul>  <br>';
      //console.log(hotelData);
      //console.log(hotelData["address1"]);
      
 //  document.getElementById("result").innerHTML = info 
   //hotelData["address1"];
      
//    }
    console.log(resp["HotelListResponse"])
    console.log(resp["HotelListResponse"]["HotelList"])
    console.log(resp["HotelListResponse"]["HotelList"]["HotelSummary"])
    console.log(resp["HotelListResponse"]["HotelList"]["HotelSummary"][0])
    console.log(resp["HotelListResponse"]["HotelList"]["HotelSummary"][0]["address1"])
    var firstHotelAddr = resp["HotelListResponse"]["HotelList"]["HotelSummary"][0]["address1"];
   
   
     //<div class="row show-grid">
      //        <div title="" data-original-title="" class="span4">4</div>
    //          <div class="span5">5</div>
  //          </div>
   
   // document.getElementById("result").innerHTML = "first hotel address: "+firstHotelAddr;
   
 //  document.getElementById("result").innerHTML = " <div class=\"row show-grid\"> "+firstHotelAddr 

    
    alert(resp["HotelListResponse"]["HotelList"]["HotelSummary"][0]);
  }
  
  foo = function(city, ccode) {
    Y.jsonp(getExpediaUrl(city, ccode), getHotelInfo);
	}

}


);