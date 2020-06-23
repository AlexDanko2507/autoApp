module.exports = function(app) {
 
    const category = require('../controllers/categoryController');
 
    // Create a new category
    app.post('/api/category', category.create);
 
    // Retrieve all category
    app.get('/api/category', category.findAll);
 
    // Retrieve a single category by Id
    app.get('/api/category/:categoryId', category.findById);
 
    // Update a category with Id
    app.put('/api/category/:categoryId', category.update);
 
    // Delete a category with Id
    app.delete('/api/category/:categoryId', category.delete);
}