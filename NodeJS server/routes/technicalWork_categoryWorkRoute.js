module.exports = function(app) {
 
    const technicalWork_categoryWork = require('../controllers/technicalWork_categoryWorkController');
 
    // Create a new technicalWork_categoryWork
    app.post('/api/technicalWork_categoryWork', technicalWork_categoryWork.create);
 
    // Retrieve all technicalWork_categoryWork
    app.get('/api/technicalWork_categoryWork', technicalWork_categoryWork.findAll);
 
    // Retrieve a single technicalWork_categoryWork by Id
    app.get('/api/technicalWork_categoryWork/:technicalWork_categoryWorkId', technicalWork_categoryWork.findById);
 
    // Update a technicalWork_categoryWork with Id
    app.put('/api/technicalWork_categoryWork/:technicalWork_categoryWorkId', technicalWork_categoryWork.update);
 
    // Delete a technicalWork_categoryWork with Id
    app.delete('/api/technicalWork_categoryWork/:technicalWork_categoryWorkId', technicalWork_categoryWork.delete);
}