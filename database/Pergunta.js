//Um model uma representação de uma tabela SQL em um objeto javaScript

const Sequelize = require('sequelize');
const connection = require('./database');

//Criando um  model
const Pergunta = connection.define('pergunta', {
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Pergunta.sync({ force: false }).then(() => { });

module.exports = Pergunta;
