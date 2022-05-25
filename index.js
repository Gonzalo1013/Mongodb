const express = require('express')
const app = express()
// const path = require('path')
let msj = []


//Servidor HTTP
const http = require('http')
const server = http.createServer(app)



// //ARCHIVOS ESTATICOS 
app.use("/public", express.static('public'))
app.use(express.static(__dirname + '/public'))
app.use('/css', express.static('/public/css'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))


//ROUTERS for products
const getAll_products = require('./routers/methodProducts/getAllProduct')
const get_by_id = require('./routers/methodProducts/idProduct')
const add_Product = require('./routers/methodProducts/addProduct')
const change_Product = require('./routers/methodProducts/changeProduct')
const delete_Product = require('./routers/methodProducts/deleteProduct')
app.use('/api/products', [getAll_products, get_by_id, add_Product, change_Product, delete_Product])

//Routers for cart
const cart = require('./routers/cartMethod/cart')
const deleteCart = require('./routers/cartMethod/deleteCart')
const getCart = require('./routers/cartMethod/getCart')
const addCart = require('./routers/cartMethod/addCart')
app.use('/api/cart', [cart, deleteCart, getCart, addCart])



// //ENGINE
app.set('view engine','ejs')
app.set('views',['./views/viewsProducts', './views/viewsCart'])

//Ruta al path principal (/public/index.html)
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

const routerSocket= require('./routers/socket') 



//Puerto 
const port = process.env.PORT || 8080

// Router Socket
app.use('/chat', routerSocket)


//Servidor de Socket
const {Server} = require('socket.io')
const io = new Server(server)

io.on('connection', (socket) => {
    console.log('Usuario Conectado!');
//envio mensjae de hola cliente al front
    socket.emit('message_to_client', 'HOLA CLIENTE')
//recibo mensjae de Hola servidor 
    socket.on('message_to_back', (data) => {
        console.log(data);
    })
//recibo objeto del formulario
    socket.on('text', (data) => {
        msj.push(data)
        io.sockets.emit('messages', msj)
    })
})
server.listen(port, () => {
    console.log('SERVER OK!! open in ' + port);
})




