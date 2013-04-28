
var foo = null

YUI().use('jsonp', 'jsonp-url', 'yql', 'yql-jsonp', function (Y) {
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
    //console.log(resp);
    var info = '';
    
    
    var hotelSummary = resp["HotelListResponse"]["HotelList"]["HotelSummary"];
    var maxIter = hotelSummary.length;

    for(var i =0; i<maxIter; i++ ) { 
 
      // info += "<div title=\"\" data-original-title=\"\" class=\"span4\">"+ hotelSummary[i]["address1"]+ "</div>";
      info += "    <li ><img src=\"http://media.expedia.com" + hotelSummary[i]["thumbNailUrl"] + "\">"+ hotelSummary[i]["address1"] + "</li>\n";
    }

    document.getElementById("result").innerHTML = info;
  }
  
  foo = function(city, ccode) {
    Y.jsonp(getExpediaUrl(city, ccode), getHotelInfo);
	}

  function setFlickrData(res) {
    console.log(res);
    var pics = res.query.results.photo;
    var maxIter = pics.length;
    var info = '';

    for(var i =0; i<maxIter; i++ ) { 
      info += "    <li><img src='" + pics[i].url_t + "'/></li>\n";
      // for the actual url is enough: pics[i].url_t.replace("_t","")
      // otherwise 'http://www.flickr.com/photos/' + pics[i].owner + '/' + pics[i].id
      // info += "    <li><a href='http://www.flickr.com/photos/" + pics[i].owner + "/" + pics[i].id + "' target='_blank'> <img src='" + pics[i].url_t + "'/></a></li>\n";
    }

    document.getElementById("resultF").innerHTML = info;
  }

  flickrData = function(city, ccode) {
     Y.YQL('select * from flickr.photos.search where (text="' + city +', ' + ccode+ '" and sort="interestingness-desc" and extras="url_t" and api_key="881c7c2901162e2a11efa3980a16553d")', function(res) {
        setFlickrData(res);
    
    });
  }

}


);