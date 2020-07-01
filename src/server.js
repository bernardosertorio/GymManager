const express = require('express')
const nunjucks = require('nunjucks')
const routes = require('./routes')
const methodOverride = require('method-override')


const server = express() // após puxar o express ele vira uma função.

server.use(express.urlencoded({ extended: true })) //Responsavel por fazer funcionar o body. Habilitando o express para tal.
server.use(express.static('public')) //local onde o server vai ouvir nossos arquivos estáticos.
server.use(methodOverride('_method')) // sobescrevendo os metodos dos verbos get e post. Podemos usar agora o put e delete. Precisa vir antes das configurações de rotas no serve para o programa entender. 
server.use(routes)


// configuração do nunjucks.

server.set("view engine", "njk")  
nunjucks.configure("src/app/views", {   
    express: server,
    autoescape: false,
    noCache: true
})

// Pondo o servidor on-line
server.listen(3333, function(){
    console.log('server is running')

})