module.exports = function(app) {
 
    const mark = require('../controllers/markController');
 
    // Create a new mark
    app.post('/api/mark', mark.create);
 
    // Retrieve all mark
    app.get('/api/mark', mark.findAll);
 
    // Retrieve a single mark by Id
    app.get('/api/mark/:markId', mark.findById);

    app.get('/api/mark/:markId/models', mark.findModels);
 
    // Update a mark with Id
    app.put('/api/mark/:markId', mark.update);
 
    // Delete a mark with Id
    app.delete('/api/mark/:markId', mark.delete);
}