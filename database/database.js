const sequelize = require('sequelize');

const connection = new sequelize('guiaperguntas', 'root', 'Myserver2003', {
    host: 'localhost',
    dialect: 'mysql'
})


module.exports = connection;