const express = require("express");
const fs = require('fs')
const {Router} = express
const router = new Router()


//Eliminar un producto en Postman
router.delete('/delete/:id' , (req, res) => {
    let idItem = req.params.id
    let idIndex = JSON.parse(idItem)
    fs.readFile('./jsons/products.json', 'utf-8', (err, data) => {
        if(err){
            res.send({message: 'Error de lectura'})
        }else{
            let product = JSON.parse(data)
            let itemFound = product.find(x => x.id === idIndex)

            if(!itemFound){
                res.send({message: 'No se encontro el producto'})
            }else{
                let index = product.indexOf(itemFound)
                if(index > -1){
                    product.splice(index, 1)

                    fs.writeFile('./jsons/products.json' , JSON.stringify(product), 'utf-8', (err) => {
                        if(err){
                            res.send({message: 'Error al Eliminar producto'})
                            }else{
                                res.send({message: `El producto fue eliminado exitosamente!`})
                            }
                    })
                }
                res.send({message: `El producto con ID: ${idItem}  fue eliminado con exitos!` })
            }
        }
    })
})


//Eliminar un producto en la web
router.get('/delete', (req, res) => {
    if(req.query.admin){
        res.render('delete')
    }else{
        res.render('autenticator')
    }
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
                res.render('notExist')
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