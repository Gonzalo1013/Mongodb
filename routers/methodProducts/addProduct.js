const express = require("express");
const fs = require('fs')
const {Router} = express
const router = new Router()



const arrayOfProducts = [];


//AGREGAR PRODUCTOS A LA LISTA / ARRAY con multer desde un archivo EJS en web
const multer = require('multer')

router.get('/form', (req, res) => {
    if(req.query.admin){
        res.render('form')
    }else{
        res.render('autenticator')
    }
})

let storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public/uploads' , {root:'.'})
    },
    filename: function(req,file, cb){
        cb(null, file.originalname)
    }
})

let upload = multer({storage})

router.post('/add' , upload.single('thumbnail'), (req, res) => {
    let date= new Date()
    let times = date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
    let codes = Math.floor(Math.random() * (10000000))
    
    let {title, description, price, stock} = req.body
    let firstProd = {
        title,
        description,
        price,
        thumbnail: req.file.filename,
        stock,
        id: 1,
        code: '000' + codes,
        timestamp: times
    }
    arrayOfProducts.push(firstProd)
    
    fs.readFile('./jsons/products.json', 'utf-8' , (err,data) =>{
        if(err){
            res.send({message: 'Error de lectura' })
        }
        if(data === ''){
            fs.writeFile('./jsons/products.json', JSON.stringify(arrayOfProducts), 'utf-8', (err) => {
                if(err){
                    res.send({message:'Error al cargar producto' })
                }else{
                    res.render('newProduct') 
                }
            })
        }else{
            let arr = JSON.parse(data)
            let newId = arr[arr.length-1].id +1
            
            let {title, description, price, stock} = req.body
            let newProduct = {
                title,
                description,
                price,
                thumbnail: req.file.filename,
                stock,
                id: newId,
                code: '000' + codes,
                timestamp: times
            }
            arr.push(newProduct)
            fs.writeFile('./jsons/products.json' , JSON.stringify(arr), 'utf-8', (err) => {
                if(err){
                    res.send({message: 'Error al cargar producto'})
                }else{
                    res.render('newProduct')
                }
            })
        }
    })
})

module.exports = router