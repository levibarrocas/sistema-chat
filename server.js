var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

var mensagens = [];
app.use(express.static(__dirname));

app.get('/messages', (req, res) => {
    res.send(mensagens);
  })

app.post('/messages', (req, res) => {
    let m = new Mensagem(req.body.name,req.body.message);
    try {
        mensagens.push(m);
        res.sendStatus(200);
        io.emit('message', req.body);
    }
    catch(e) {
        res.sendStatus(500);
    }
    finally{
        console.log('Mensagem postada');
    }
})

function Mensagem(nome,mensagem) {
    return {nome : nome,mensagem : mensagem}
}

io.on('connection', () =>{
    console.log('Um cliente conectado')
})
  
  
var server = http.listen(4000, () => {
    console.log('Servidor na porta', server.address().port);
});