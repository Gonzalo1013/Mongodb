const express = require('express')
const app = express()
const path = require('path')


//ARCHIVOS ESTATICOS 
app.use("/public", express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))


//ROUTERS
const products = require('./routers/products')
const cart = require('./routers/cart')


app.use('/api/products', products)
app.use('/api/cart', cart)


//ENGINE
app.set('view engine','ejs')
app.set('views','./views')

//Ruta al path principal (/public/index.html)
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

const port = process.env.PORT || 8080

app.listen(port, () => {
    console.log('Server OK!!!');
})