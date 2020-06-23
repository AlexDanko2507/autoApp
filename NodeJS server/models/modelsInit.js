const db = require('../config/database');
const models = require('./exportModels');

const Expense = models.Expense.ExpenseInit(db);
const NotificationAuto = models.NotificationAuto.NotificationAutoInit(db);
const TechnicalWork_CategoryWork = models.TechnicalWork_CategoryWork.TechnicalWork_CategoryWorkInit(db);
const TechnicalWork = models.TechnicalWork.TechnicalWorkInit(db, NotificationAuto, Expense);
const Auto = models.Auto.AutoInit(db, Expense, TechnicalWork);
const Category = models.Category.CategoryInit(db, Expense);
const CategoryWork = models.CategoryWork.CategoryWorkInit(db);
const Model = models.Model.ModelInit(db, Auto);
const Mark = models.Mark.MarklInit(db, Model, Auto);
const User = models.User.UserInit(db, Auto);
const Role = models.Role.RoleInit(db, User);
TechnicalWork.belongsToMany(CategoryWork, {through: TechnicalWork_CategoryWork});
CategoryWork.belongsToMany(TechnicalWork, {through: TechnicalWork_CategoryWork});
Auto.belongsTo(User);
Auto.belongsTo(Mark);
Auto.belongsTo(Model);
Model.belongsTo(Mark);
User.belongsTo(Role);
Expense.belongsTo(Category);
Expense.belongsTo(Auto);
TechnicalWork.belongsTo(Auto);
TechnicalWork_CategoryWork.belongsTo(CategoryWork);
TechnicalWork_CategoryWork.belongsTo(TechnicalWork);

// db.sync({force: true})
//   .then(() => {
//     console.log('Database connected...');
//     })
//   .catch(err => console.log('Error: ' + err))

module.exports = {
    Auto,
    Category,
    CategoryWork,
    Expense,
    Mark,
    Model,
    NotificationAuto,
    TechnicalWork_CategoryWork,
    TechnicalWork,
    User,
    Role
}