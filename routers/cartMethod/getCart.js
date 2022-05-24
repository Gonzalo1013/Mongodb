const express = require("express");
const {Router} = express
const router = new Router()
const fs = require('fs')


router.get('/:id/products' , (req, res) => {
    fs.readFile('./jsons/cart.json' , 'utf-8' , (err, data) => {
        if(err){
            res.send('Error de lectura')
        }else{
            let products = JSON.parse(data)
            products.forEach(x => {
                res.send(x.productos)
            })
        }
    })
})


module.exports = router