module.exports = function(app) {
 
    const user = require('../controllers/userController');
 
    // Signin user
    app.post('/api/signin', user.signin);
    
    // Signup user
    app.post('/api/signup', user.signup);

    app.post('/api/resetpassword', user.resetPassword);
 
    // Retrieve all user
    app.get('/api/user', user.findAll);

    app.get('/api/user/:userId/autos', user.findAutos);

    app.get('/api/user/:userId/autos/expense', user.findAutosExpense);
 
    // Retrieve a single user by Id
    app.get('/api/user/:userId', user.findById);
 
    // Update a user with Id
    app.put('/api/user/:userId', user.update);

    app.put('/api/user/:userId/password', user.updatePassword);

    app.put('/api/user/:userId/admin', user.updateAdmin);
 
    // Delete a user with Id
    app.delete('/api/user/:userId', user.delete);
}