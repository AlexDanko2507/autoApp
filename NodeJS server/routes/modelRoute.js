module.exports = function(app) {
 
    const model = require('../controllers/modelController');
 
    // Create a new model
    app.post('/api/model', model.create);
 
    // Retrieve all model
    app.get('/api/model', model.findAll);
 
    // Retrieve a single model by Id
    app.get('/api/model/:modelId', model.findById);
 
    // Update a model with Id
    app.put('/api/model/:modelId', model.update);
 
    // Delete a model with Id
    app.delete('/api/model/:modelId', model.delete);
}