const Sequelize = require('sequelize');

module.exports.CategoryWorkInit = function(db)
{
  // eslint-disable-next-line no-unused-vars
  const CategoryWork = db.define('categoryWork', {
      id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV1,
          primaryKey: true
        },
      name: {
          type: Sequelize.STRING,
          allowNull: false
          }
  })
  //CategoryWork.hasMany(TechnicalWork_CategoryWork, { onDelete: "cascade" })
  //CategoryWork.belongsToMany(TechnicalWork, {through: TechnicalWork_CategoryWork});
  return CategoryWork;
}
