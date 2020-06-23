const db = require('../models/modelsInit');
const Auto = db.Auto;
const Model = db.Model;
const Mark = db.Mark;
const Category = db.Category;
const { Op } = require("sequelize");

// Post a Auto
module.exports.create = (req, res) => {	
	console.log(req.body);
	var check = 0;
	Mark.findByPk(req.body.markId).then(mark=>{
		mark.getModels().then(models=>{
			for(let i=0; i<models.length;i++){
				if(models[i].name === req.body.modelName){
					check = 1;
				}
			}
			if (check === 1)
			{
				Auto.create({  
					run: req.body.run,
					year: req.body.year,
					fuel: req.body.fuel,
					comments: req.body.comments,
					imageUrl: req.body.imageUrl,
					modelId: req.body.modelId,
					markId: req.body.markId,
					userId: req.body.userId,
					}).then(auto => {		
						// Send created customer to client
						res.send(auto);
					});
			}
			else{
				Model.create({
					name: req.body.modelName,
					markId: req.body.markId
				}).then(model =>{
				Auto.create({  
					run: req.body.run,
					year: req.body.year,
					fuel: req.body.fuel,
					comments: req.body.comments,
					imageUrl: req.body.imageUrl,
					modelId: model.id,
					markId: req.body.markId,
					userId: req.body.userId,
					}).then(auto => {		
						// Send created customer to client
						res.send(auto);
					});
				})
			}
		})
	})
};

module.exports.findAllExpenseCategory = (req, res) => {
	console.log(req.body);
	const categoryId = req.body.categoryId;
	Auto.findByPk(req.params.autoId).then(auto => {
		if(!auto) res.status(400).send();
		else{
			auto.getExpenses({
				order: [['date', 'DESC']],
				include: Category,
				where: { 
					categoryId: categoryId
				}
				}).then(expenses => {
				res.send(expenses);
			})
		}
	})
}
 
module.exports.findAllExpenseMonth = (req, res) => {
	console.log(req.body);
	const startDate = req.body.startDate;
	const endDate = req.body.endDate;
	Auto.findByPk(req.params.autoId).then(auto => {
		if(!auto) res.status(400).send();
		else{
			auto.getExpenses({
				order: [['date', 'DESC']],
				include: Category,
				where: { 
					date: {[Op.between] : [startDate, endDate]}
				}
				}).then(expenses => {
				res.send(expenses);
			})
		}
	})
}

module.exports.findAllExpense = (req, res) => {
	Auto.findByPk(req.params.autoId).then(auto => {
		if(!auto) res.status(400).send();
		else{
			auto.getExpenses({order: [['createdAt', 'DESC']],  include: Category }).then(expenses => {
				res.send(expenses);
			})
		}
	})
}

module.exports.findAllTechnicalWork = (req, res) => {
	Auto.findByPk(req.params.autoId).then(auto => {
		if(!auto) res.status(400).send();
		else{
			auto.getTechnicalWorks({order: [['date', 'DESC']]}).then(technicalWorks => {
				return res.send(technicalWorks);
			})
		}
	})
}

module.exports.findTechnicalWork = (req, res) => {
	Auto.findByPk(req.params.autoId).then(auto => {
		if(!auto) res.status(400).send();
		else{
			auto.getTechnicalWorks({where:{status:true},order: [['date', 'ASC']]}).then(technicalWorks => {
				return res.send(technicalWorks);
			})
		}
	})
}

module.exports.findTechnicalWorkNow = (req, res) => {
	Auto.findByPk(req.params.autoId).then(auto => {
		if(!auto) res.status(400).send();
		else{
			auto.getTechnicalWorks({where:{status:true},order: [['date', 'ASC']]}).then(technicalWorks => {
				if(technicalWorks.length === 0) res.status(400).send();
				return res.send(technicalWorks[0]);
			})
		}
	})
}

module.exports.updateRun = (req, res) => {
	const id = req.params.autoId;
	Auto.update({
		run: req.body.run
		},
		{
		where: {id: id}
	}).then(auto => {
		res.send(auto);
	})
}

// FETCH all Auto
module.exports.findAll = (req, res) => {
	Auto.findAll().then(auto => {
	// Send all customers to Client
	res.send(auto);
	});
};

// Find a Auto by Id
module.exports.findById = (req, res) => {	
	Auto.findByPk(req.params.autoId, {include: [Mark, Model]}).then(auto => {
		res.send(auto);
	})
};
 
// Update a Auto
module.exports.update = (req, res) => {
	const id = req.params.autoId;
	var check = 0;
	Mark.findByPk(req.body.markId).then(mark=>{
		mark.getModels().then(models=>{
			for(let i=0; i<models.length;i++){
				if(models[i].name === req.body.modelName){
					check = 1;
				}
			}
			console.log(check);
			if (check === 1)
			{
				Auto.update({  
					run: req.body.run,
					year: req.body.year,
					fuel: req.body.fuel,
					comments: req.body.comments,
					imageUrl: req.body.imageUrl,
					modelId: req.body.modelId,
					markId: req.body.markId,
					userId: req.body.userId,
					},
					{
						where: {id: id}
					}).then(() => {		
						// Send created customer to client
						res.status(200).send('updated successfully a Auto with id = ' + id);
					});
			}
			else{
				Model.create({
					name: req.body.modelName,
					markId: req.body.markId
				}).then(model =>{
				Auto.create({  
					run: req.body.run,
					year: req.body.year,
					fuel: req.body.fuel,
					comments: req.body.comments,
					imageUrl: req.body.imageUrl,
					modelId: model.id,
					markId: req.body.markId,
					userId: req.body.userId,
					},
					{
						where : {id: id}
					}).then(() => {		
						// Send created customer to client
						res.status(200).send('updated successfully a Auto with id = ' + id);
					});
				})
			}
		})
	})
};
 
// Delete a Auto by Id
module.exports.delete = (req, res) => {
	const id = req.params.autoId;
	console.log(id);
	Auto.destroy({
        where: { id: id }
    }).then(() => {
        res.status(200).send('deleted successfully a Auto with id = ' + id);
    });
};