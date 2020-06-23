const Sequelize = require('sequelize');

module.exports.UserInit = function(db, Auto)
{
  // eslint-disable-next-line no-unused-vars
  const User = db.define('user', {
      id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV1,
          primaryKey: true
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false
            },
        email: {
            type: Sequelize.STRING,
            allowNull: false
            },
        hashpassword: {
            type: Sequelize.STRING,
            allowNull: false
            },
        imageUrl: {
            type: Sequelize.STRING
            }
  })
  User.hasMany(Auto, { onDelete: "cascade" })
  return User;
}
