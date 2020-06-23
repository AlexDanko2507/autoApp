const scan = require("../recognize/recognizeAuto");
const db = require('../models/modelsInit');
const Mark = db.Mark;
const Model = db.Model;

module.exports.scanAuto = async (req,res) => {
    const img = req.body.img;
    const img2 = img;
    const carObject = await scan.recognizeAuto(img2);
    console.log(carObject);
    if(carObject!==500)
    {
        res.status(200).send(carObject);
    }
    else
    {
        res.status(500).send('Something broke!');
    }
}


module.exports.scanCreateAuto = async (req,res) => {
    const img = req.body.img;
    const img2 = img;
    const carObject = await scan.recognizeAuto(img2);
    const marks = await Mark.findAll();

    if(carObject!==500)
    {
        const models = await Model.findAll({where:{name: carObject.model}});
        for(let i=0;i<marks.length;i++)
        {
            if(marks[i].name.includes(ucFirst(carObject.mark.toLowerCase())) || marks[i].name.includes(carObject.mark))
            {
                for(let j=0;j<models.length;j++)
                {
                    if(models[j].markId === marks[i].id)
                    {
                        var newCarObject = {
                            mark:carObject.mark,
                            model:carObject.model,
                            prop:carObject.prop,
                            markId: marks[i].id,
                            modelId: models[j].id
                        }
                        res.status(200).send(newCarObject);
                        return;
                    }
                }

                console.log(marks[i].id);
                return;
            }
        }
        res.status(401).send('Something broke!');
    }
    else
    {
        res.status(500).send('Something broke!');
    }

    function ucFirst(str) {
        if (!str) return str;
      
        return str[0].toUpperCase() + str.slice(1);
      }
}