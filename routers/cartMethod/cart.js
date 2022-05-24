const express = require("express");
const {Router} = express
const router = new Router()
const fs = require('fs')


let arr = []
router.post('/', (req, res) => {
    let date= new Date()
    let times = date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
    let obj = {
        id: 1,
        timestamp: times,
        productos: []
    }
    arr.push(obj)
    fs.writeFile('./jsons/cart.json', JSON.stringify(arr), 'utf-8', (err) => {
        if(err){
            return 'Error al escribir'
        } else {
            res.send({message: `Carrito creado, id: ${obj.id}`})
        }
        
    })    
})



module.exports = router