(function(){
  // New vue app
  var app = new Vue({
    el: '#app',
    data: {
      weather: false,
      month: false,
      days: false,
      dayDates: false,
      title: 'cold',
      isActive: false,
      isDark: true,
      cityLocation: false,
      icons: false
    },
    methods: {
      alertThing: function () {
        alert('wow')
        // console.log(this)
      }
    }
  });

  // Blank Variable to store the location data in
  var locationData = { }

  // End loading STARTS
  function endLoading() {
    var loadingGIF = document.getElementById('loading')
    $(loadingGIF).hide()
  } // End loading ENDS


  // Get location STARTS
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log('not working')
    }
  } // Get location ENDS


  // Show position STARTS
  function showPosition(position) {
    console.log(position.coords.latitude)
    console.log(position.coords.longitude)

    locationData.lat = position.coords.latitude
    locationData.logn = position.coords.longitude

    // Call the AJAX request then once loaded display none the loading container
    makeAjaxRequest();
    endLoading()
  } // Show Position ENDS


 function makeAjaxRequest () {
    // GET request for remote image in node.js
    axios({
      method: 'get',
      url: 'https://api.openweathermap.org/data/2.5/onecall?lat='+locationData.lat+'&lon='+locationData.logn+'&units=metric&exclude=hourly,minute&appid=66ce6f7e945db003aaa343f0bc010dc8'
    }).then(function (response) {
      app.weather = response
      console.log(response.data)
      weatherCheck(response.data)
      makeMapBoxRequest()
      endLoading()

      // Get Icons STARTS
      function getIcons () {
        var icons = []
        for (var i = 0; i < 8; i++) {
          var iconCode = response.data.daily[i].weather[0].icon
          var iconUrl = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";
          icons.push(iconUrl)
        }
        app.icons = icons;

        console.log("http://openweathermap.org/img/wn/" + iconCode + "@2x.png")
        console.log(app.icons)
      } // Get Icons ENDS
      getIcons()
    });
  } // makeAjaxRequest ENDS


  function makeMapBoxRequest () {
		 // GET request for remote image in node.js
		 axios({
			 method: 'get',
			 url: 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+locationData.logn+','+locationData.lat+'.json?types=poi&access_token=pk.eyJ1IjoiY2xhc29tYXRvIiwiYSI6ImNrYjczZjNzeTAxdXkycWtjZXZqMW93bjMifQ.GKDp48PUnWCG9OBFMkN-_Q'
		 }).then(function (response) {
			 console.log(response)
       app.cityLocation = response.data.features[0].context[3].text
		 });
	 } // makeAjaxRequest ENDS






  function weatherCheck (data) {
    // console.log(data);
    // Has 8 checks
    if(data.daily[0].weather[0].description.includes('sun')) {
      alert('rain spotted');
      $('panelOne')
    }

    if(data.daily[0].weather[0].description.includes('sun')) {
      alert('rain spotted');
    }
  }





  // MomentJSTime
  // Get days STARTS
  function getDaysnDates () {
    var now = moment()
    var dates = []
    var days = []
    var daysRequired = 8

    for (var i = 1; i <= daysRequired; i++) {
      dates.push( moment().add(i, 'days').format('Do MMMM YYYY'))
      app.dayDates = {
        i: dates
      }
    }

    for (var i = 1; i <= daysRequired; i++) {
      days.push( moment().add(i, 'days').format('dddd'))
      app.days = {
        i: days
      }
    }
  } // getDaysnDates ENDS




  getLocation()
  getDaysnDates()
}()); // iffe function ENDS
