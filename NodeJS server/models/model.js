const Sequelize = require('sequelize');

module.exports.ModelInit = function(db, Auto)
{
  // eslint-disable-next-line no-unused-vars
  const Model = db.define('model', {
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
  Model.hasMany(Auto, { onDelete: "cascade" });
  return Model;
}

