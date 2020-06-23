const db = require('../models/modelsInit');
const Role = db.Role;

module.exports.findAll = (req, res) => {
	Role.findAll().then(role => {
	// Send all customers to Client
	res.send(role);
	});
};