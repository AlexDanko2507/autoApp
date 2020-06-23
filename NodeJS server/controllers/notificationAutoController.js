const db = require('../models/modelsInit');
const NotificationAuto = db.NotificationAuto;

// Post a NotificationAuto
module.exports.create = (req, res) => {	
	// Save to MySQL database
	NotificationAuto.create({  
	name: req.body.name,
	}).then(notificationAuto => {		
		// Send created customer to client
		res.send(notificationAuto);
	});
};
 
// FETCH all NotificationAuto
module.exports.findAll = (req, res) => {
	NotificationAuto.findAll().then(notificationAuto => {
	// Send all customers to Client
	res.send(notificationAuto);
	});
};

// Find a NotificationAuto by Id
module.exports.findById = (req, res) => {	
	NotificationAuto.findByPk(req.params.notificationAutoId).then(notificationAuto => {
		res.send(notificationAuto);
	})
};
 
// Update a NotificationAuto
module.exports.update = (req, res) => {
	const id = req.params.notificationAutoId;
	NotificationAuto.update( { name: req.params.name }, 
                        { where: {id: req.params.notificationAutoId} }
                    ).then(() => {
                        res.status(200).send("updated successfully a notificationAuto with id = " + id);
                    });
};
 
// Delete a NotificationAuto by Id
module.exports.delete = (req, res) => {
	const id = req.params.notificationAutoId;
	console.log(id);
	NotificationAuto.destroy({
        where: { id: id }
    }).then(() => {
        res.status(200).send('deleted successfully a notificationAuto with id = ' + id);
    });
};