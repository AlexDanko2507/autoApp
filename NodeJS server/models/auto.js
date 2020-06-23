const Sequelize = require('sequelize');

module.exports.AutoInit = function(db, Expense, TechnicalWork)
{
  // eslint-disable-next-line no-unused-vars
  const Auto = db.define('auto', {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1,
            primaryKey: true
            },
        run: {
            type: Sequelize.INTEGER,
            allowNull: false
            },
        year: {
            type: Sequelize.INTEGER,
            allowNull: false
            },
        fuel: {
            type: Sequelize.INTEGER,
            allowNull: false
            },
        comments: {
            type: Sequelize.STRING
            },
        imageUrl: {
            type: Sequelize.STRING
            },
  })
  Auto.hasMany(Expense, { onDelete: "cascade" })
  Auto.hasMany(TechnicalWork, { onDelete: "cascade" })
  return Auto;
}
