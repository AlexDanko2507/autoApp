const express = require('express');
const app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
const db = require('./config/database');
// const autoParser = require('./parser/parserAuto');

// async function g(){
//   var m = await autoParser.parserMark();
//   await autoParser.parserLogo(m);
//   await autoParser.parserModel(m);
// }

//const bcrypt = require("bcrypt-nodejs");
// const init = require('./models/modelsInit');
// async function initM()
// {
//   await init.Role.create({name: "user"});
//   var admin = await init.Role.create({name: "admin"});
//   await init.User.create({
//     username:"admin",
//     email:"admin@mail.ru", 
//     hashpassword:bcrypt.hashSync("admin"), 
//     imageUrl: "https://vulcan.dl.playstation.net/img/cfn/11307T1XOiMuX_vELxahR6uU-zPFxlFnUDFLkQvSmhmxW5mAnioODoXxKLy8kCYANzOHIzImX9petWL2VnIlLglyBeU7NLwN.jpg",
//     roleId: admin.id});

//   await init.Category.create({name:"Заправка"});
//   await init.Category.create({name:"Мойка"});
//   await init.Category.create({name:"Страховка"});
//   await init.Category.create({name:"Ремонт"});
//   await init.Category.create({name:"Налог"});
//   await init.Category.create({name:"Штраф"});
//   await init.Category.create({name:"Кредит"});
//   await init.Category.create({name:"Прочее"});

//   await init.CategoryWork.create({name:"Замена масла двигателя"});
//   await init.CategoryWork.create({name:"Замена масла в КПП"});
//   await init.CategoryWork.create({name:"Замена воздушного фильтра"});
//   await init.CategoryWork.create({name:"Замена масляного фильтра"});
//   await init.CategoryWork.create({name:"Замена передних тормозных колодок"});
//   await init.CategoryWork.create({name:"Замена задних тормозных колодок"});
//   await init.CategoryWork.create({name:"Заправка кондиционера"});
//   await init.CategoryWork.create({name:"Замена свечей зажигания"});
//   await init.CategoryWork.create({name:"Мойка автомобиля"});
//   await init.CategoryWork.create({name:"Замена охлаждающей жидкости"});
//   await init.CategoryWork.create({name:"Замена тормозной жидкости"});
//   await init.CategoryWork.create({name:"Замена фильтра салона"});
//   await init.CategoryWork.create({name:"Сход-развал"});
//   await init.CategoryWork.create({name:"Замена ремня ГРМ"});
//   await init.CategoryWork.create({name:"Замена АКБ"});
// }

require('./routes/exportRoutes')(app);
app.get('/', (req, res) => res.send('SERVER ON'));

db.authenticate()
  .then(() => {
    console.log('Database connected...');
    app.listen(3000, () => console.log('SERVER ON'));
  })
  .catch(err => console.log('Error: ' + err))


    




