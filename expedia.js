
var foo = null

YUI().use('jsonp', 'jsonp-url', 'yql', 'yql-jsonp', function (Y) {

  function writeDate(len) {
    var d = new Date();
    
    if (len != 0) {
      d.setDate( d.getDate() + len);
    }

    var curr_date = d.getDate();
    var curr_month = d.getMonth() + 1; //Months are zero based
    var curr_year = d.getFullYear();

    return curr_date + "/" + curr_month + "/" + curr_year;
  }

  function getExpediaUrl(city, ccode) {
    var today = writeDate(0);
    var dATomorrow = writeDate(3);

    var url =
    "http://api.ean.com/ean-services/rs/hotel/v3/list?minorRev=22"+
    "&cid=55505"+
    "&apiKey=h6p3b3ewhjued3ks2uyvc884"+
    "&locale=en_US"+
    "&currencyCode=GBP"+
    "&city="+city+
    "&countryCode="+ccode+
    "&supplierCacheTolerance=MED_ENHANCED"+
    "&room1=2"+
    "&numberOfResults=6"+
    "&callback={callback}";
    //"&arrivalDate=" +today +
    //"&departureDate="+ dATomorrow +

    //console.log(url);

    return url
    }
   
  
  function getHotelInfo(resp) {
    //console.log(resp);
    var info = '';
    
    
    var hotelSummary = resp["HotelListResponse"]["HotelList"]["HotelSummary"];
    var maxIter = hotelSummary.length;

    for(var i =0; i<Math.min(maxIter,6); i++ ) { 
 
	  var rating = String(hotelSummary[i]["tripAdvisorRating"]).replace(".", "");
	 
     var infoLink = "<a target=\"new\" href=\""+ hotelSummary[i]["deepLink"] + "\">"
 
      // info += "<div title=\"\" data-original-title=\"\" class=\"span4\">"+ hotelSummary[i]["address1"]+ "</div>";
      info += "    <li> <div style=\"padding: 20px;\" ><div align=\"center\"><span class=\"rating-static rating-" + rating + "\"></span>" + infoLink + hotelSummary[i]["name"] + "</a> " + infoLink + "<img src=\"http://media.expedia.com" + hotelSummary[i]["thumbNailUrl"] + "\"> </a> <br/><br/></div>"+ hotelSummary[i]["locationDescription"];
	  info += "   ";
	//  info += "    "+ "<img  height=\"102\" width=\"42\" src=\""+  hotelSummary[i]["tripAdvisorRatingUrl"]   +"\" > </div>"+" </li>\n"
	 info += "    "+ " </div>"+" </li>\n"
	
	  //console.log(rating)

     // TODO: need to remove existing markers before adding these new ones
     // - not sure how to remove them so just commenting this out for now
//     var lati = hotelSummary[i]["latitude"];
//     var longi = hotelSummary[i]["longitude"];
//     console.log(lati);
//     console.log(longi);
//     var hotelLatLong = new google.maps.LatLng(lati, longi);
//     var hotelMarker = new google.maps.Marker({
//         map: map,
//         position: hotelLatLong
//     });

    }

    document.getElementById("result").innerHTML = info;
  }
  
  foo = function(city, ccode) {
    Y.jsonp(getExpediaUrl(city, ccode), getHotelInfo);
	}
	
	

  function setFlickrData(res,city) {
    //console.log(res);
    try {
      var pics = res.query.results.photo;
    } catch (e) {
      pics = [];
    }
    
    var maxIter = pics.length;
    var info = '<div class=\"span12,offset1\">';
     document.getElementById('flickrH').innerHTML = "<h1> Flickr photos from "+ city +  "</h1>"

    for(var i =0; i<maxIter; i++ ) { 
      //info += '    <div class="flickrContainer" style="background-image: url(\'' + pics[i].url_t.replace('_t','_q') +'\'); height: 200px; width: 200px; background-repeat:no-repeat; background-position:center center; background-size: 150px 150px; overlay: hidden; float:left;"> </div>​\n';
      info += '    <div style="height: 180px; width: 180px; overlay: hidden; float:left;">';
      info += '<a href="http://www.flickr.com/photos/' + pics[i].owner + '/' + pics[i].id +'" target="_blank">';
      info += '<img src="' +  pics[i].url_t.replace('_t','_q') + '" style="width:150px;"/>';
      info += '</a></div>​\n';
      // for the actual url is enough: pics[i].url_t.replace("_t","")
      //info += "    <img  width=\"110px\" src='" + pics[i].url_t + "'/>";
      // for the actual url is enough: pics[i].url_t.replace("_t","")
      // otherwise 'http://www.flickr.com/photos/' + pics[i].owner + '/' + pics[i].id
      // info += "    <li><a href='http://www.flickr.com/photos/" + pics[i].owner + "/" + pics[i].id + "' target='_blank'> <img src='" + pics[i].url_t + "'/></a></li>\n";
    }
info += "</div>";
    document.getElementById("resultF").innerHTML = info;
  }

  flickrData = function(city, ccode) {
     Y.YQL('select * from flickr.photos.search(30) where (text="' + city +', ' + ccode+ '" and sort="interestingness-desc" and extras="url_t" and api_key="881c7c2901162e2a11efa3980a16553d")', function(res) {
        setFlickrData(res,city);
    
    });
  }

}


);
