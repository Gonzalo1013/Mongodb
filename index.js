const express = require('express')
const app = express()



//ARCHIVOS ESTATICOS 
app.use(express.static(__dirname + '/public'))
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




const port = process.env.PORT || 8080

app.listen(port, () => {
    console.log('Server OK!!!');
})