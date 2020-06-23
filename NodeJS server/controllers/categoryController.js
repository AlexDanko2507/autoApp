const db = require('../models/modelsInit');
const Category = db.Category;

// Post a Category
module.exports.create = (req, res) => {	
	// Save to MySQL database
	Category.create({  
	name: req.body.name,
	}).then(category => {		
		// Send created customer to client
		res.send(category);
	});
};
 
// FETCH all Category
module.exports.findAll = (req, res) => {
	Category.findAll().then(category => {
	// Send all customers to Client
	res.send(category);
	});
};

// Find a Category by Id
module.exports.findById = (req, res) => {	
	Category.findByPk(req.params.categoryId).then(category => {
		res.send(category);
	})
};
 
// Update a Category
module.exports.update = (req, res) => {
	const id = req.params.categoryId;
	Category.update( { name: req.params.name }, 
                        { where: {id: req.params.categoryId} }
                    ).then(() => {
                        res.status(200).send("updated successfully a Category with id = " + id);
                    });
};
 
// Delete a Category by Id
module.exports.delete = (req, res) => {
	const id = req.params.categoryId;
	console.log(id);
	Category.destroy({
        where: { id: id }
    }).then(() => {
        res.status(200).send('deleted successfully a Category with id = ' + id);
    });
};