const express = require("express");
const fs = require('fs')
const {Router} = express
const router = new Router()
const multer = require('multer')

let storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public/uploads' , {root:'.'})
    },
    filename: function(req,file, cb){
        cb(null, file.originalname)
    }
})

let upload = multer({storage})

//MODIFICAR PRODUCTO en Postman
router.put('/change/:id' , (req, res) => {
    let idItem = req.params.id-1
    let idIndex = JSON.parse(idItem)
    fs.readFile('./jsons/products.json', 'utf-8', (err, data)=> {
        if(err){
            res.send({message: 'Error de lectura'})
        }else{
            let product = JSON.parse(data)

            product[idIndex]["title"] = req.body.title
            product[idIndex]["description"] = req.body.description
            product[idIndex]["price"] = req.body.price
            product[idIndex]["thumbnail"] = req.body.thumbnail
            product[idIndex]["stock"] = req.body.stock
            
            fs.writeFile('./jsons/products.json', JSON.stringify(product), 'utf-8' , (err) => {
                if(err){
                    res.send({message: 'No se pudo actualizar el producto'})
                }else{
                    res.send({message: 'Producto actualizado'})
                }
            })
        }
    })
})

//MODIFICAR PRODUCTO en web
router.get('/put', (req, res)=> {
    if(req.query.admin){
        res.render('put')
    }else{
        res.render('autenticator')
    }
})
router.post('/callProd', (req, res) => {
    let {idnumber} = req.body
    let idd = JSON.parse(idnumber)
    fs.readFile('./jsons/products.json', 'utf-8', (err, data) => {
        if(err){
            res.send({message: 'Error al buscar Archivo'})
        }else{
            let product = JSON.parse(data)
            let itemFound = product.find(x => x.id === idd)
            if(!itemFound){
                res.render('notExist')
            }else{
                res.render('callProd', {data:itemFound})
            }
        }
    })
})
router.post('/change' , upload.single('thumbnail') , (req, res) => {
    let date= new Date()
    let times = date.toLocaleDateString() + ' ' + date.toLocaleTimeString()

    let {title, description, price, stock, id, code} = req.body
    let changeObj = {
        title,
        description,
        price,
        stock,
        thumbnail: req.file.filename,
        id,
        code,
        timestamp: times
    }

    fs.readFile('./jsons/products.json', 'utf-8', (err, data) => {
        if(err){
            res.send({message:'Error al cargar'})
        }else{
            let product = JSON.parse(data)
            let idd = JSON.parse(changeObj.id)
            let itemFound = product.find(x => x.id === idd)
            let ind = product.indexOf(itemFound)
            
            product[ind]["title"] = req.body.title
            product[ind]["description"] = req.body.desciption
            product[ind]["price"] = req.body.price
            product[ind]["stock"] = req.body.stock
            product[ind]["thumbnail"] = changeObj.thumbnail

            fs.writeFile('./jsons/products.json', JSON.stringify(product), 'utf-8' , (err) => {
                if(err){
                    res.send({message: 'No se pudo actualizar el producto'})
                }
            })
        }
    })
    res.render('put')
})

module.exports = router