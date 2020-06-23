module.exports = function(app) {
 
    const expense = require('../controllers/expenseController');
 
    // Create a new expense
    app.post('/api/expense', expense.create);

    app.post('/api/expense/technicalWorkEnd', expense.createTechnicalWorkEnd);

    // Retrieve all expense
    app.get('/api/expense', expense.findAll);

    // Retrieve all expense
    app.post('/api/expense/category', expense.expenseCategory);
 
    // Retrieve a single expense by Id
    app.get('/api/expense/:expenseId', expense.findById);
 
    // Update a expense with Id
    app.put('/api/expense/:expenseId', expense.update);
 
    // Delete a expense with Id
    app.delete('/api/expense/:expenseId', expense.delete);
}