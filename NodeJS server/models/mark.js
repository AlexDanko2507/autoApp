const Sequelize = require('sequelize');

module.exports.MarklInit = function(db, Model, Auto)
{
    // eslint-disable-next-line no-unused-vars
    const Mark = db.define('mark', {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
            },
        imageUrl: {
            type: Sequelize.STRING
            }
    })
    Mark.hasMany(Model, { onDelete: "cascade" });
    Mark.hasMany(Auto, { onDelete: "cascade" });
    return Mark;
}