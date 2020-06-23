const db = require('../models/modelsInit');
const CategoryWork = db.CategoryWork;

// Post a Category
module.exports.create = (req, res) => {	
	// Save to MySQL database
	CategoryWork.create({  
	name: req.body.name,
	}).then(categoryWork => {		
		// Send created customer to client
		res.send(categoryWork);
	});
};
 
// FETCH all Category
module.exports.findAll = (req, res) => {
	CategoryWork.findAll().then(categoryWork => {
	// Send all customers to Client
	res.send(categoryWork);
	});
};

// Find a Category by Id
module.exports.findById = (req, res) => {	
	CategoryWork.findByPk(req.params.categoryWorkId).then(categoryWork => {
		res.send(categoryWork);
	})
};
 
// Update a Category
module.exports.update = (req, res) => {
	const id = req.params.categoryWorkId;
	CategoryWork.update( { name: req.params.name }, 
                        { where: {id: req.params.categoryWorkId} }
                    ).then(() => {
                        res.status(200).send("updated successfully a CategoryWork with id = " + id);
                    });
};
 
// Delete a Category by Id
module.exports.delete = (req, res) => {
	const id = req.params.categoryWorkId;
	console.log(id);
	CategoryWork.destroy({
        where: { id: id }
    }).then(() => {
        res.status(200).send('deleted successfully a CategoryWork with id = ' + id);
    });
};