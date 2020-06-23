const request = require('request');
const cheerio = require('cheerio');
const init = require('../models/modelsInit');

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

var parserMark = async function()
{
  const optionsMark = {
    url: 'https://databases.one/cardatabase-demo-basic/',
    method: 'GET',
    gzip: true,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.96 Safari/537.36'
    }
  };
  var marks = [];
  let responseMark = await promisifiedRequest(optionsMark);
  var $ = cheerio.load(responseMark.body);
  $('#make > option').each((i,mark) =>{
    //console.log($(mark).attr('value') + "-" + $(mark).html());
    const markId = $(mark).attr('value')
    const markName = $(mark).text()
    if ($(mark).attr('value')!==''){
      marks.push({
        markId,
        markName
      })
    }
  })
  console.log(marks.length)
  return marks;
}

// eslint-disable-next-line no-unused-vars
var parserLogo = async function(marks)
{
  const optionsLogo = {
    url: '',
    method: 'GET',
    "content-type": "image/png",
    gzip: true,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.96 Safari/537.36'
    }
  };

  var marksLogo = [];
  for (var i = 0;i<marks.length;i++)
  {
    var markLogoName = marks[i].markName.toLowerCase()
    optionsLogo.url = 'https://www.carlogos.org/car-logos/'+markLogoName.replace(' ', '-')+'-logo.png'
    let responseLogo = await promisifiedRequest(optionsLogo);
    if (responseLogo.statusCode != 404)
    {
        const markName = marks[i].markName;
        const markUrl = optionsLogo.url

        marksLogo.push({
            markName,
            markUrl
        });
        console.log(marks[i].markName+" url:" + optionsLogo.url)
        await init.Mark.create({
          name: markName,
          imageUrl: markUrl
        })
    }
    else
    {
      optionsLogo.url = 'https://carlogos.eu/car-manufacturers-icons/car_brand_logos/'+markLogoName.replace(' ', '-')+'.jpg'
      let responseLogo = await promisifiedRequest(optionsLogo);
      if (responseLogo.statusCode != 404)
      {
        const markName = marks[i].markName;
        const markUrl = optionsLogo.url

        marksLogo.push({
            markName,
            markUrl
        });
          console.log(marks[i].markName+" url:" + optionsLogo.url)
          await init.Mark.create({
            name: markName,
            imageUrl: markUrl
          })
      }
      else
      {
        const markName = marks[i].markName;
        const markUrl = null

        marksLogo.push({
            markName,
            markUrl
        });
          console.log(marks[i].markName)
          await init.Mark.create({
            name: markName,
            imageUrl: markUrl
          })
      }
    }
  }
  console.log(marksLogo.length)
  return marksLogo;
}

// eslint-disable-next-line no-unused-vars
var parserModel = async function(marks)
{
  const optionsModel = {
    url: 'https://databases.one/cardatabase-demo-basic/get_model.php',
    method: 'POST',
    form: {id: 1},
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.96 Safari/537.36'
    }
  };

  var markModels = [];

  for (var i = 0;i<marks.length;i++)
  {
    optionsModel.form.id=marks[i].markId;
    const markName = marks[i].markName;
    const markModel = [];
    
    let response = await promisifiedRequest(optionsModel);
    var $ = cheerio.load(response.body);
    $('option').each((j, model)=>{
      if ($(model).attr("selected") !== "selected")
      {
        const nameM = $(model).text();
        init.Mark.findOne({where: {name: markName}}).then(mark=>
          {
            if(!mark) return console.log("Mark not found");
            mark.createModel({name:nameM}).catch(err=>console.log(err));
          }
        )
        markModel.push($(model).text());
        console.log(marks[i].markId +"-"+ $(model).text())
     }
    })
    markModels.push({
        markName,
        markModel
    });
    console.log(markModels);
  }

}


module.exports = {
    parserMark,
    parserLogo,
    parserModel
  };
  

