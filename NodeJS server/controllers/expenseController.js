const db = require('../models/modelsInit');
const Expense = db.Expense;
const Category = db.Category;
const Auto = db.Auto;
const Mark = db.Mark;
const Model = db.Model;

// Post a Expense
module.exports.create = (req, res) => {	
	// Save to MySQL database
	Expense.create({  
		sum: req.body.sum,
		currentRun: req.body.currentRun,
		comments: req.body.comments,
		date: req.body.date,
		autoId: req.body.autoId,
		categoryId: req.body.categoryId,
	}).then(expense => {		
		res.send(expense);
	});
};
 
module.exports.createTechnicalWorkEnd = (req, res) => {	
	Category.findOne({where: {name: "ТО"}}).then(category=>{
		if(!category)
		{
			Category.create({  
				name: "ТО",
				}).then(newcategory => {		
					Expense.create({  
						sum: req.body.sum,
						currentRun: req.body.currentRun,
						comments: req.body.comments,
						date: req.body.date,
						autoId: req.body.autoId,
						categoryId: newcategory.id,
						technicalWorkId: req.body.technicalWorkId
					}).then(expense => {		
						res.send(expense);
					});
				});
		}
		else{
			Expense.create({  
				sum: req.body.sum,
				currentRun: req.body.currentRun,
				comments: req.body.comments,
				date: req.body.date,
				autoId: req.body.autoId,
				categoryId: category.id,
				technicalWorkId: req.body.technicalWorkId
			}).then(expense => {		
				res.send(expense);
			});
		}
	})
	

};

module.exports.expenseCategory = (req, res) => {
	console.log(req.body);
	const userId = req.body.userId;
	const categoryId = req.body.categoryId;
	Expense.findAll({
		order: [['date', 'DESC']],
		include: {model: Auto, 
			where:{
			userId: userId
				}, 
			include: [Mark, Model]
		},
		where: { 
			categoryId: categoryId
		}
		}).then(expenses=>{
			res.send(expenses);
		})
}

// FETCH all Expense
module.exports.findAll = (req, res) => {
	Expense.findAll({include: Category}).then(expense => {
	// Send all customers to Client
	res.send(expense);
	});
};

// Find a Expense by Id
module.exports.findById = (req, res) => {	
	Expense.findByPk(req.params.expenseId, {include: [Category, Auto]}).then(expense => {
		res.send(expense);
	})
};
 
// Update a Expense
module.exports.update = (req, res) => {
	const id = req.params.expenseId;
	Expense.update( { 
		sum: req.body.sum,
		currentRun: req.body.currentRun,
		comments: req.body.comments,
		date: req.body.date,
		autoId: req.body.autoId,
		categoryId: req.body.categoryId}, 
						{ where: 
							{id: id} 
						}
                    ).then(() => {
                        res.status(200).send("updated successfully a expense with id = " + id);
                    });
};
 
// Delete a Expense by Id
module.exports.delete = (req, res) => {
	const id = req.params.expenseId;
	console.log(id);
	Expense.destroy({
        where: { id: id }
    }).then(() => {
        res.status(200).send('deleted successfully a expense with id = ' + id);
    });
};