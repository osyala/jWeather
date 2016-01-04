
$(document).ready(function() {
  var lat, long, forecast_url, city, state, temp, wind, summary, icon;


// getting my location

  $.ajax({
    url: 'http://freegeoip.net/json/',
    type: 'POST',
    dataType: 'jsonp',
    success: function(location) {
      city = location.city;
      $('.city').text(city);
      lat = location.latitude;
      long = location.longitude;
      if ('383c5c72dbd2079467637bcf31e7f27d') {
        forecast_url = "https://api.forecast.io/forecast/383c5c72dbd2079467637bcf31e7f27d/" + lat + "," + long;
      } else {
        return;
      }

      // pulling data

      $.ajax({
        url: forecast_url,
        dataType: "jsonp",
        success: function(data) {
          temp = data.currently.temperature;
          var c = temp - 32 / 1.8;
          $('.temp').text(Math.round(temp) + ' F / ' + Math.round(c) + ' C');
          summary = data.currently.summary;
          $('.summary').text(summary);
          icon = data.currently.icon;
          var windBearing = data.currently.windBearing;
          var windSpeed = data.currently.windSpeed;
          wind = "Wind " + degToCompass(windBearing) + " " + Math.round(windSpeed) + " knots";
          
          $('.wind').text(wind);

          var skycons = new Skycons({
            "color": "black"
          });

          skycons.set("icon1", icon);
          skycons.play();
        }
      });
    }
  });
  
  function degToCompass(num) {
    var val=parseInt((num/22.5)+.5);
    var arr=["N","NNE","NE","ENE","E","ESE", "SE", "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];
    return arr[(val % 16)];
  }
});