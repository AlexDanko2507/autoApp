const Sequelize = require('sequelize');

module.exports.NotificationAutoInit = function(db) 
{
  // eslint-disable-next-line no-unused-vars
  const NotificationAuto = db.define('notificationAuto', {
      id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV1,
          primaryKey: true
        },
      dateStart: {
          type: Sequelize.DATE,
          allowNull: false
          }
  })
  //NotificationAuto.hasOne(TechnicalWork, { onDelete: "cascade"});
  return NotificationAuto;
}
