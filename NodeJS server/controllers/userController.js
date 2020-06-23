const { Op } = require("sequelize");
const bcrypt = require("bcrypt-nodejs");
const db = require('../models/modelsInit');
const User = db.User;
const Mark = db.Mark;
const Model = db.Model;
const Role = db.Role;

module.exports.signin = (req, res) => {
	console.log(req.body);
	User.findOne({
		where:{
			[Op.or]:[
			{username: req.body.username},
			{email: req.body.username}
			]
		},  include: Role
	}).then(user =>{
			if(!user) res.status(400).send();
			else if(bcrypt.compareSync(req.body.password, user.hashpassword)){
				//res.status(200).send()
				res.status(200).send(user);
			}
		else{
			res.status(400).send();
		}
	}).catch(()=>res.status(400).send())
};

module.exports.signup = (req, res) => {
	console.log(req.body);
	Role.findOne({where:{
		name:"user"
	}}).then(role=>{
		User.findOne({
			where:{
				[Op.or]:[
				{username: req.body.username},
				{email: req.body.email}
				]
			}
		}).then(user =>{
				if(!user){
					User.create({  
						username: req.body.username,
						email: req.body.email,
						hashpassword: bcrypt.hashSync(req.body.password),
						imageUrl: req.body.imageUrl,
						roleId: role.id
				}
			).then(()=> res.status(200).send())}
			else{
				res.status(400).send();
			}
		}).catch(()=>res.status(400).send())
	}).catch(()=>res.status(400).send())

};

module.exports.findAutosExpense = (req, res) => {

	User.findByPk(req.params.userId).then(async user => {
		if(!user) res.status(400).send();
		else{
			var sumEx = .0;
			var autos = await user.getAutos();
			var ex;
			console.log("count auto"+ autos.length);
			for(let i =0; i<autos.length;i++)
			{
				ex = await autos[i].getExpenses();
				for(let j =0;j<ex.length;j++)
				{
					sumEx+=ex[j].sum;
				}
			}
			console.log(sumEx);
			res.status(200).send({sum: sumEx});
		}
	}).catch(()=>res.status(400).send())
}
 
module.exports.findAutos = (req, res) => {
	User.findByPk(req.params.userId).then(user => {
		if(!user) res.status(400).send();
		else{
			user.getAutos({order: [['createdAt', 'DESC']],  include: [Mark, Model] }).then(autos => {
				return res.send(autos);
			})
		}
	})
}

// FETCH all User
module.exports.findAll = (req, res) => {
	User.findAll({include: Role}).then(user => {
	// Send all customers to Client
	res.send(user);
	});
};

// Find a User by Id
module.exports.findById = (req, res) => {	
	User.findOne({where:{id:req.params.userId},include: Role}).then(user => {
		if(!user) res.status(400).send();
		else res.send(user);
	})
};
 
// Update a User
module.exports.update = (req, res) => {
	console.log(req.body);
	const id = req.params.userId;
	User.findOne({
		where:{
			[Op.or]:[
			{username: req.body.username},
			{email: req.body.email}
			]
		}
	}).then(user =>{
		//console.log(user);
		console.log(user.id);
		console.log(id);
		if(!user){
			User.update( { 
				username: req.body.username,
				email: req.body.email,
				imageUrl: req.body.imageUrl,
				roleId: req.body.roleId
			}, 
			{ where: 
				{id: id}
			}
			).then(() => {
				//res.status(200).send("updated successfully a User with id = " + id);
				User.findOne({where:{id:id}, include: Role}).then(newUser=>{
					res.status(200).send(newUser);
				})
			});
		}
		else if (user.id === id)
		{
			User.update( { 
				username: req.body.username,
				email: req.body.email,
				imageUrl: req.body.imageUrl,
				roleId: req.body.roleId
			}, 
			{ where: 
				{id: id}
			}
			).then(() => {
				//res.status(200).send("updated successfully a User with id = " + id);
				User.findOne({where:{id:id}, include: Role}).then(newUser=>{
					res.status(200).send(newUser);
				})
			});
		}
		else{
			res.status(400).send();
		}
	}).catch(()=>res.status(400).send());
};

module.exports.updatePassword = (req, res) =>{
	const id = req.params.userId;
	User.findByPk(id).then(user=>{
		if (bcrypt.compareSync(req.body.oldpassword, user.hashpassword))
		{
			User.update({
				hashpassword: bcrypt.hashSync(req.body.password)
			},
			{where:
				{id: id}
			}).then(()=>{
				User.findByPk(id).then(newUser=>{
					res.status(200).send(newUser);
				})
			}).catch(()=>res.status(400).send());
		}
		else{
			res.status(400).send();
		}
	}).catch(()=>res.status(400).send());
};

module.exports.updateAdmin = (req, res) =>{
	console.log(req.body);
	const id = req.params.userId;
	User.findOne({
		where:{
			[Op.or]:[
			{username: req.body.username},
			{email: req.body.email}
			]
		}
	}).then(user =>{
		//console.log(user);
		console.log(user.id);
		console.log(id);
		if(!user){
			User.update( { 
				username: req.body.username,
				email: req.body.email,
				roleId: req.body.roleId
			}, 
			{ where: 
				{id: id}
			}
			).then(() => {
				//res.status(200).send("updated successfully a User with id = " + id);
				User.findByPk(id).then(newUser=>{
					res.status(200).send(newUser);
				})
			});
		}
		else if (user.id === id)
		{
			User.update( { 
				username: req.body.username,
				email: req.body.email,
				roleId: req.body.roleId
			}, 
			{ where: 
				{id: id}
			}
			).then(() => {
				//res.status(200).send("updated successfully a User with id = " + id);
				User.findByPk(id).then(newUser=>{
					res.status(200).send(newUser);
				})
			});
		}
		else{
			res.status(400).send();
		}
	}).catch(()=>{
		console.log("error");
		res.status(400).send()
	});
};

module.exports.resetPassword = (req, res) =>{
	console.log(req.body);
	const username = req.body.username;
	User.findOne({where:
		{username: username}
	}).then(user=>{
			if(!user){
				res.status(400).send()
			}else{
				User.update( { 
					hashpassword: bcrypt.hashSync(req.body.password)
				}, 
				{ where: 
					{username: username}
				}
				).then(() => {
					//res.status(200).send("updated successfully a User with id = " + id);
						res.status(200).send();
				}).catch(()=>res.status(400).send());
			}
	}).catch(()=>res.status(400).send());
}
 
// Delete a User by Id
module.exports.delete = (req, res) => {
	const id = req.params.userId;
	console.log(id);
	User.destroy({
        where: { id: id }
    }).then(() => {
        res.status(200).send('deleted successfully a User with id = ' + id);
    });
};