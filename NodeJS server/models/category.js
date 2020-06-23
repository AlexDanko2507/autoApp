const Sequelize = require('sequelize');

module.exports.CategoryInit = function(db, Expense)
{
  // eslint-disable-next-line no-unused-vars
  const Category = db.define('category', {
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
  Category.hasMany(Expense, { onDelete: "cascade" })
  return Category;
}
