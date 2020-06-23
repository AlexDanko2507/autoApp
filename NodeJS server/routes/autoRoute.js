module.exports = function(app) {

    const auto = require('../controllers/autoController');
 
    // Create a new auto
    app.post('/api/auto', auto.create);
 
    // Retrieve all auto
    app.get('/api/auto', auto.findAll);
 
    app.get('/api/auto/:autoId/expenses', auto.findAllExpense);

    app.post('/api/auto/:autoId/expenses/month', auto.findAllExpenseMonth);
    
    app.post('/api/auto/:autoId/expenses/category', auto.findAllExpenseCategory);

    app.get('/api/auto/:autoId/technicalworks', auto.findTechnicalWork);

    app.get('/api/auto/:autoId/technicalworks/all', auto.findAllTechnicalWork);

    app.get('/api/auto/:autoId/technicalworks/now', auto.findTechnicalWorkNow);

    // Retrieve a single auto by Id
    app.get('/api/auto/:autoId', auto.findById);
 
    // Update a auto with Id
    app.put('/api/auto/:autoId', auto.update);

    app.put('/api/auto/:autoId/run', auto.updateRun);
 
    // Delete a auto with Id
    app.delete('/api/auto/:autoId', auto.delete);
}