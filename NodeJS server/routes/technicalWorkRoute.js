module.exports = function(app) {
 
    const technicalWork = require('../controllers/technicalWorkController');
 
    // Create a new technicalWork
    app.post('/api/technicalWork', technicalWork.create);

    app.get('/api/technicalWork/:technicalWorkId/categoryWork', technicalWork.findCategoryWork);

    app.get('/api/technicalWork/:technicalWorkId/notificationAuto', technicalWork.findNotificationAuto);
 
    // Retrieve all technicalWork
    app.get('/api/technicalWork', technicalWork.findAll);
 
    // Retrieve a single technicalWork by Id
    app.get('/api/technicalWork/:technicalWorkId', technicalWork.findById);
 
    // Update a technicalWork with Id
    app.put('/api/technicalWork/:technicalWorkId', technicalWork.update);

    app.put('/api/technicalWork/:technicalWorkId/end', technicalWork.endTechnicalWork);
 
    // Delete a technicalWork with Id
    app.delete('/api/technicalWork/:technicalWorkId', technicalWork.delete);
}  