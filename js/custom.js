(function(){


  function makeAjaxRequest () {
    // GET request for remote image in node.js
    axios({
      method: 'get',
      url: 'https://api.openweathermap.org/data/2.5/onecall?lat=-41.282626&lon=-174.773390&units=metric&exclude=hourly,minute&appid=66ce6f7e945db003aaa343f0bc010dc8'
    }).then(function (response) {
      console.log(response.data)
    });
  }

  makeAjaxRequest();

}()); // iffe function ENDS
