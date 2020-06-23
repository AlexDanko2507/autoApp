const db = require('../models/modelsInit');
const TechnicalWork_CategoryWork = db.TechnicalWork_CategoryWork;

// Post a TechnicalWork_CategoryWork
module.exports.create = (req, res) => {	
	// Save to MySQL database
	TechnicalWork_CategoryWork.create({  
	name: req.body.name,
	}).then(technicalWork_categoryWork => {		
		// Send created customer to client
		res.send(technicalWork_categoryWork);
	});
};
 
// FETCH all TechnicalWork_CategoryWork
module.exports.findAll = (req, res) => {
	TechnicalWork_CategoryWork.findAll().then(technicalWork_categoryWork => {
	// Send all customers to Client
	res.send(technicalWork_categoryWork);
	});
};

// Find a TechnicalWork_CategoryWork by Id
module.exports.findById = (req, res) => {	
	TechnicalWork_CategoryWork.findByPk(req.params.technicalWork_categoryWorkId).then(technicalWork_categoryWork => {
		res.send(technicalWork_categoryWork);
	})
};
 
// Update a TechnicalWork_CategoryWork
module.exports.update = (req, res) => {
	const id = req.params.technicalWork_categoryWorkId;
	TechnicalWork_CategoryWork.update( { name: req.params.name }, 
                        { where: {id: req.params.technicalWork_categoryWorkId} }
                    ).then(() => {
                        res.status(200).send("updated successfully a technicalWork_categoryWork with id = " + id);
                    });
};
 
// Delete a TechnicalWork_CategoryWork by Id
module.exports.delete = (req, res) => {
	const id = req.params.technicalWork_categoryWorkId;
	console.log(id);
	TechnicalWork_CategoryWork.destroy({
        where: { id: id }
    }).then(() => {
        res.status(200).send('deleted successfully a technicalWork_categoryWork with id = ' + id);
    });
};