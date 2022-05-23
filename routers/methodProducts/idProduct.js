const express = require("express");
const fs = require('fs')
const {Router} = express
const router = new Router()


//MOSTRAR PRODUCTO POR ID en Postman
router.get(`/getPostman/:id`, (req, res) => {
    let idItem = req.params.id
    let id = JSON.parse(idItem)
    fs.readFile('./jsons/products.json' , 'utf-8' , (err,data) =>{
        if(err){
            res.send({message: 'No se pudo leer el archivo'})
        }else{
            let product = JSON.parse(data)
            let itemFound = product.find( x => x.id === id )
            if(!itemFound){
                res.send({message: 'El producto no existe'})
            }else{
                console.log(itemFound);
                res.send(itemFound)
            }
        }
    })
})

//MOSTRAR UN PORDUCTO POR ID EN LA WEB
router.get('/findId', (req, res) => {
    res.render('findId')
})

router.post('/get', (req, res) => {
    let { numero } = req.body
    let numId ={
        numero
    }
    let num = JSON.parse(numId.numero)
    
    fs.readFile('./jsons/products.json', 'utf-8', (err, data) => {
        if(err){
            res.send('Error al buscar producto')
        }else{
            let products = JSON.parse(data)
            let itemFound = products.find(x => x.id === num )
            if(!itemFound){
                res.render('notExist')
            }else{
                res.render('getById', {data:itemFound})
            }
        }
    })
        
})

module.exports = router