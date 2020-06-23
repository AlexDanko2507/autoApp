module.exports = function(app) {

    const recognize = require('../controllers/recognizeController');
 
    app.post('/api/recognize/', recognize.scanAuto);

    app.post('/api/recognize/createAuto', recognize.scanCreateAuto);

}