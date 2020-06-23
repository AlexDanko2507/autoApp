const db = require('../models/modelsInit');
const Mark = db.Mark;

module.exports.findModels = (req, res) => {
	Mark.findByPk(req.params.markId).then(mark => {
		if(!mark) res.status(400).send();
		else{
			mark.getModels().then(models => {
				return res.send(models);
			})
		}
	})
}

// Post a Mark
module.exports.create = (req, res) => {	
	// Save to MySQL database
	Mark.create({  
	name: req.body.name,
	}).then(mark => {		
		// Send created customer to client
		res.send(mark);
	});
};
 
// FETCH all Mark
module.exports.findAll = (req, res) => {
	Mark.findAll().then(mark => {
	// Send all customers to Client
	res.send(mark);
	});
};

// Find a Mark by Id
module.exports.findById = (req, res) => {	
	Mark.findByPk(req.params.markId).then(mark => {
		res.send(mark);
	})
};
 
// Update a Mark
module.exports.update = (req, res) => {
	const id = req.params.markId;
	Mark.update( { name: req.params.name }, 
                        { where: {id: req.params.markId} }
                    ).then(() => {
                        res.status(200).send("updated successfully a mark with id = " + id);
                    });
};
 
// Delete a Mark by Id
module.exports.delete = (req, res) => {
	const id = req.params.markId;
	console.log(id);
	Mark.destroy({
        where: { id: id }
    }).then(() => {
        res.status(200).send('deleted successfully a mark with id = ' + id);
    });
};