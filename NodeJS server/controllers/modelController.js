const db = require('../models/modelsInit');
const Model = db.Model;

// Post a Model
module.exports.create = (req, res) => {	
	// Save to MySQL database
	Model.create({  
	name: req.body.name,
	}).then(model => {		
		// Send created customer to client
		res.send(model);
	});
};
 
// FETCH all Model
module.exports.findAll = (req, res) => {
	Model.findAll().then(model => {
	// Send all customers to Client
	res.send(model);
	});
};

// Find a Model by Id
module.exports.findById = (req, res) => {	
	Model.findByPk(req.params.modelId).then(model => {
		res.send(model);
	})
};
 
// Update a Model
module.exports.update = (req, res) => {
	const id = req.params.modelId;
	Model.update( { name: req.params.name }, 
                        { where: {id: req.params.modelId} }
                    ).then(() => {
                        res.status(200).send("updated successfully a model with id = " + id);
                    });
};
 
// Delete a Model by Id
module.exports.delete = (req, res) => {
	const id = req.params.modelId;
	console.log(id);
	Model.destroy({
        where: { id: id }
    }).then(() => {
        res.status(200).send('deleted successfully a model with id = ' + id);
    });
};