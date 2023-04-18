const express = require('express');
const bodyParse = require('body-parser');
const app = express();
const port = 3000;
const connection = require('./database/database');
const Pergunta = require('./database/Pergunta');
const resposta = require('./database/Resposta');

//Seta a engine de visualização 
app.set('view engine', 'ejs')
//Seta para o express usar a pasta public para arquivos estaticos
app.use(express.static('public'))
//Seta para o express usar a biblioteca body-parse para traduzir requisições HTTP
app.use(bodyParse.urlencoded({ extended: false }));
app.use(bodyParse.json());
//Abre uma conexão com o banco de dados, com um "tratamento de erros"
connection
    .authenticate()
    .then(() => {
        console.log('conexão bem sucessidida');
    })
    .catch((err) => {
        console.log(err);
    })


//rotas do express
app.get("/", function (req, res) {
    Pergunta.findAll({
        raw: true,
        order: [
            ['id', 'DESC']
        ]
    }).then(perguntas => {
        res.render('index', {
            perguntas: perguntas
        })
    })
})
app.get("/perguntar", function (req, res) {
    res.render('perguntar', {

    });
})
app.post("/salvarpergunta", function (req, res) {
    let titulo = req.body.titulo;
    let descricao = req.body.descricao;

    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect('/')
    })
})

app.get("/pergunta/:id", function (req, res) {
    var id = req.params.id;
    Pergunta.findOne({
        where: { id: id }
    }).then(pergunta => {
        resposta.findAll(
            {
                where: { perguntaId: pergunta.id },
                order: [
                    ["id", "DESC"]
                ]
            }
        ).then((respostas) => {
            if (pergunta != undefined) {
                res.render('pergunta', {
                    pergunta: pergunta,
                    respostas: respostas
                });
            } else {
                res.redirect('/')
            }

        })


    })
})
app.post('/responder', function (req, res) {
    let corpo = req.body.corpo;
    let perguntaId = req.body.pergunta;
    resposta.create({
        corpo: corpo,
        perguntaId: perguntaId

    }).then(
        res.redirect('/pergunta/' + perguntaId)
    )
})

app.listen(port, (error) => {
    if (error) {
        console.log('Falha ao iniciar ' + error);
    } else {
        console.log('servidor rodando na porta \n http://localhost:' + port);
    }
});