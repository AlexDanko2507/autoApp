const Sequelize = require('sequelize');

module.exports.RoleInit = function(db, User)
{
  // eslint-disable-next-line no-unused-vars
  const Role = db.define('role', {
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
  Role.hasMany(User, { onDelete: "cascade" })
  return Role;
}
