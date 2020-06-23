module.exports = function(app) {
 
    const notificationAuto = require('../controllers/notificationAutoController');
 
    // Create a new notificationAuto
    app.post('/api/notificationAuto', notificationAuto.create);
 
    // Retrieve all notificationAuto
    app.get('/api/notificationAuto', notificationAuto.findAll);
 
    // Retrieve a single notificationAuto by Id
    app.get('/api/notificationAuto/:notificationAutoId', notificationAuto.findById);
 
    // Update a notificationAuto with Id
    app.put('/api/notificationAuto/:notificationAutoId', notificationAuto.update);
 
    // Delete a notificationAuto with Id
    app.delete('/api/notificationAuto/:notificationAutoId', notificationAuto.delete);
}