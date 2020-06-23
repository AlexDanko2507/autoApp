const db = require('../models/modelsInit');
const TechnicalWork = db.TechnicalWork;
const CategoryWork = db.CategoryWork;
const NotificationAuto = db.NotificationAuto;

// Post a TechnicalWork
module.exports.create = (req, res) => {	
	// Save to MySQL database
	const listWorkId = req.body.listWorkId;
	const dateStart = req.body.dateStart;
	console.log(listWorkId);
	console.log(dateStart);
	
		TechnicalWork.create({  
			name: req.body.name,
			comments: req.body.comments,
			date: req.body.date,
			status: req.body.status,
			autoId: req.body.autoId
			}).then(technicalWork => {		
				for(let i = 0;i<listWorkId.length;i++)
				{
					CategoryWork.findByPk(listWorkId[i]).then(categoryWork => {
						if(!categoryWork) res.status(400).send();
						technicalWork.addCategoryWork(categoryWork).then(()=>{
							if(i === listWorkId.length-1)
							{
								NotificationAuto.create({
									dateStart: dateStart,
									technicalWorkId: technicalWork.id
								})
							}
						}).catch(()=>res.status(400).send());
					})
				}
				res.status(200).send(technicalWork);
			}).catch(()=>res.status(400).send());
};

module.exports.endTechnicalWork = (req, res) =>{
	const id = req.params.technicalWorkId;
	TechnicalWork.update({
		status:false
	},
	{
		where:{id: id}
	}).then(()=>{
		res.status(200).send();
	})
}

// Update a TechnicalWork
module.exports.update = async (req, res) => {
	const id = req.params.technicalWorkId;
	const listWorkId = req.body.listWorkId;
	const dateStart = req.body.dateStart;
	console.log(dateStart);
	var notify = await NotificationAuto.findOne({where:{
		technicalWorkId: id
	}});
	await NotificationAuto.update({
		dateStart: dateStart
	},
	{
		where:{id:notify.id}
	})
	var tWork = await TechnicalWork.findByPk(id);
	var cWork = await tWork.getCategoryWorks();
	if(cWork)
	{
		for(let i = 0;i<cWork.length;i++)
		{
			await cWork[i].technicalWork_categoryWork.destroy()
		}
	}
	for(let i = 0;i<listWorkId.length;i++)
	{
		var cw = await CategoryWork.findByPk(listWorkId[i]);
		if(cw)
		await tWork.addCategoryWork(cw);
	}
	TechnicalWork.update({
		name: req.body.name,
		comments: req.body.comments,
		date: req.body.date
	},
	{
		where:{id: id}
	}).then(()=>{
		res.status(200).send();
	})

};
 
module.exports.findNotificationAuto = (req, res) => {
	const id = req.params.technicalWorkId;
	TechnicalWork.findByPk(id).then(technicalWork => {
		if(!technicalWork) res.status(400).send();
		technicalWork.getNotificationAuto().then(notificationAuto => {
			res.status(200).send(notificationAuto);
		}).catch(()=>res.status(400).send());
	}).catch(()=>res.status(400).send());
}

module.exports.findCategoryWork = (req, res) => {
	const id = req.params.technicalWorkId;
	TechnicalWork.findByPk(id).then(technicalWork => {
		if(!technicalWork) res.status(400).send();
		technicalWork.getCategoryWorks().then(categoryWorks => {
			res.status(200).send(categoryWorks);
		}).catch(()=>res.status(400).send());
	}).catch(()=>res.status(400).send());
}

// FETCH all TechnicalWork
module.exports.findAll = (req, res) => {
	TechnicalWork.findAll().then(technicalWork => {
	// Send all customers to Client
	res.send(technicalWork);
	});
};

// Find a TechnicalWork by Id
module.exports.findById = (req, res) => {	
	TechnicalWork.findByPk(req.params.technicalWorkId).then(technicalWork => {
		res.send(technicalWork);
	})
};
 
// Delete a TechnicalWork by Id
module.exports.delete = (req, res) => {
	const id = req.params.technicalWorkId;
	console.log(id);
	TechnicalWork.destroy({
        where: { id: id }
    }).then(() => {
        res.status(200).send('deleted successfully a technicalWork with id = ' + id);
    });
};