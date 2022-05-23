const express = require("express");
const fs = require('fs')
const {Router} = express
const router = new Router()

//Mostrar todos los PRODUCTOS en  postman
router.get('/getAll', (req, res)=>{
    fs.readFile('./jsons/products.json' , 'utf-8' , (err,data) =>{
        if(err){
            res.send({message:'No se pudo leer el archivo' })
        }else if(data === ''){
            res.send({message: 'No hay ningun Producto cargado'})
        }else{
            let products = JSON.parse(data)
            res.send(products)
        }
    })
})
//Mostrar todos los PRODUCTOS en web
router.get('/product', (req, res)=>{
    fs.readFile('./jsons/products.json' , 'utf-8' , (err,data) =>{
        if(err){
            res.send({message:'No se pudo leer el archivo' })
        }else if(data === ''){
            res.send({message: 'No hay ningun Producto cargado'})
        }else{
            let products = JSON.parse(data)
            res.render('index', {data:products})
        }
    })
})

module.exports = router