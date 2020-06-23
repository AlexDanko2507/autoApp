const Sequelize = require('sequelize');

const sequelize  =  new Sequelize('autoapp', 'postgres', 'admin', {
  host: 'localhost',
  dialect: 'postgres',
  operatorsAliases: 0,
});

module.exports = sequelize;