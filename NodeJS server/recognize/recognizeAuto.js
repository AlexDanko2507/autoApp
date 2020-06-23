const request = require('request');

const promisifiedRequest = function(options) {
    return new Promise((resolve,reject) => {
      request(options, (error, response) => {
        if (response) {
          return resolve(response);
        }
        if (error) {
          return reject(error);
        }
      });
    });
  };

  var recognizeAuto = async function(url){
    console.log(encodeURIComponent(url));
    const urlAuto = {
        url: 'https://carnet.ai/recognize-url',
        method: 'POST',
        form: encodeURIComponent(url),
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.96 Safari/537.36'
        }
      };

      let response = await promisifiedRequest(urlAuto);
      console.log(response.statusCode)
      if(response.statusCode === 200)
      {
        var carObject = {
            mark:JSON.parse(response.body).car.make,
            model:JSON.parse(response.body).car.model,
            prop:JSON.parse(response.body).car.prob
        }
        console.log(carObject);
        return carObject;
    }else if(response.statusCode === 500)
    {
      return 500;
    }
  }

  module.exports = {
    recognizeAuto
  };