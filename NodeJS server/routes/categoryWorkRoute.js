module.exports = function(app) {

    const categoryWork = require('../controllers/categoryWorkController');
 
    // Create a new categoryWork
    app.post('/api/categoryWork', categoryWork.create);
 
    // Retrieve all categoryWork
    app.get('/api/categoryWork', categoryWork.findAll);
 
    // Retrieve a single categoryWork by Id
    app.get('/api/categoryWork/:categoryWorkId', categoryWork.findById);
 
    // Update a categoryWork with Id
    app.put('/api/categoryWork/:categoryWorkId', categoryWork.update);
 
    // Delete a categoryWork with Id
    app.delete('/api/categoryWork/:categoryWorkId', categoryWork.delete);
}
