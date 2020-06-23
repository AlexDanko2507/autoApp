const Sequelize = require('sequelize');

module.exports.TechnicalWork_CategoryWorkInit = function(db)
{
  // eslint-disable-next-line no-unused-vars
  const TechnicalWork_CategoryWork = db.define('technicalWork_categoryWork', {
      id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV1,
          primaryKey: true
        }
  })
  return TechnicalWork_CategoryWork;
}
