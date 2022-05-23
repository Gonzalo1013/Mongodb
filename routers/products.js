const express = require("express");
const fs = require('fs')
const {Router} = express
const router = new Router()


const arrayOfProducts = [];

//Mostrar todos los PRODUCTOS
router.get('/getAll', (req, res)=>{
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

//MOSTRAR PRODUCTO POR ID en Postman
// router.get(`/getPostman/:id`, (req, res) => {
//     let idItem = req.params.id
//     let id = JSON.parse(idItem)
//     fs.readFile('./jsons/products.json' , 'utf-8' , (err,data) =>{
//         if(err){
//             res.send({message: 'No se pudo leer el archivo'})
//         }else{
//             let product = JSON.parse(data)
//             let itemFound = product.find( x => x.id === id )
//             if(!itemFound){
//                 res.send({message: 'El producto no existe'})
//             }else{
//                 // res.send(itemFound)
//                 console.log(itemFound);
//                 res.render('getById', {data:itemFound})
//             }
//         }
//     })
// })

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
                res.send('El producto no existe')
            }else{
                res.render('getById', {data:itemFound})
            }
        }
    })
        
})



//AGREGAR PRODUCTOS A LA LISTA / ARRAY con multer desde un archivo EJS en web
const multer = require('multer')

router.get('/form', (req, res) => {
    res.render('form')
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
            console.log(newProduct);
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


//Eliminar un producto en Postman


// router.delete('/delete/:id' , (req, res) => {
//     let idItem = req.params.id
//     let idIndex = JSON.parse(idItem)
//     fs.readFile('./jsons/products.json', 'utf-8', (err, data) => {
//         if(err){
//             res.send({message: 'Error de lectura'})
//         }else{
//             let product = JSON.parse(data)
//             let itemFound = product.find(x => x.id === idIndex)

//             if(itemFound){
//                 let index = product.indexOf(itemFound)
//                 if(index > -1){
//                     product.splice(index, 1)

//                     fs.writeFile('./jsons/products.json' , JSON.stringify(product), 'utf-8', (err) => {
//                         if(err){
//                             res.send({message: 'Error al Eliminar producto'})
//                             }else{
//                                 res.send({message: `El producto fue eliminado exitosamente!`})
//                             }
//                     })
//                 }
//                 res.send({message: `El producto con ID: ${idItem}  fue eliminado con exitos!` })
//             }
//         }
//     })
// })


//Eliminar un producto en la web
router.get('/delete', (req, res) => {
    res.render('delete')
})
router.post('/deletePr', (req,res)=> {
    let {idd} = req.body
    let obj = {
        idd
    }
    let number = JSON.parse(obj.idd)
    fs.readFile('./jsons/products.json', 'utf-8', (err, data) => {
        if(err){
            res.send({message: 'Error al leer'})
        }else{
            let products = JSON.parse(data)
            let itemFound = products.find(x => x.id === number)
            if(!itemFound){
                res.send({message: 'El producto no existe'})
            }else{
                let index = products.indexOf(itemFound)
                if(index > -1){
                    products.splice(index, 1)
                    fs.writeFile('./jsons/products.json', JSON.stringify(products), 'utf-8', (err) => {
                        if(err){
                            res.send({message: 'Error al eliminar el producto'})
                        }
                        
                    })
                }
            }
            res.render("removed")
        }
    })
})
module.exports = router