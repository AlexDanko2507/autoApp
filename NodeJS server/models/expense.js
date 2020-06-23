const Sequelize = require('sequelize');

module.exports.ExpenseInit = function(db)
{
  // eslint-disable-next-line no-unused-vars
  const Expense = db.define('expense', {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1,
            primaryKey: true
            },
        sum: {
            type: Sequelize.DOUBLE,
            allowNull: false
            },
        currentRun: {
            type: Sequelize.INTEGER,
            allowNull: false
            },
        comments: {
            type: Sequelize.STRING
            },
        date: {
            type: Sequelize.DATE,
            allowNull: false
            },
  })
  return Expense;
}
