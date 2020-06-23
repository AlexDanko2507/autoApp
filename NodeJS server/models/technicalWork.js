const Sequelize = require('sequelize');

module.exports.TechnicalWorkInit = function(db, NotificationAuto, Expense)
{
  // eslint-disable-next-line no-unused-vars
  const TechnicalWork = db.define('technicalWork', {
      id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV1,
          primaryKey: true
        },
    name: {
        type: Sequelize.STRING,
        allowNull: false
        },
    comments: {
        type: Sequelize.STRING,
        allowNull: false
        },
    date: {
        type: Sequelize.DATE,
        allowNull: false
        },
    status: {
        type: Sequelize.BOOLEAN,
        allowNull: true
        }
  })
  //TechnicalWork.hasMany(TechnicalWork_CategoryWork, { onDelete: "cascade" })
  //TechnicalWork.belongsToMany(CategoryWork, {through: TechnicalWork_CategoryWork});
  TechnicalWork.hasMany(Expense, { onDelete: "cascade" })
  TechnicalWork.hasOne(NotificationAuto, { onDelete: "cascade"});
  return TechnicalWork;
}
