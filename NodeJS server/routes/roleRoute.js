module.exports = function(app) {
 
    const role = require('../controllers/roleController');
 
    app.get('/api/role/', role.findAll);


}