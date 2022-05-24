const express = require("express");
const {Router} = express
const router = new Router()
const fs = require('fs')


router.delete('/delete/:id', (req, res) => {
    let index = req.params.id -1
    
    fs.readFile('./jsons/cart.json', 'utf-8', (err,data) => {
        if(err){
            res.send({message: 'Error de consulta'})
        }else{
            let cart = JSON.parse(data)
            cart.splice(index, 1)
            fs.writeFile('./jsons/cart.json' , JSON.stringify(cart), 'utf-8' , (err) => {
                if(err){
                    res.send({message:'No se pudo eliminar el carrito'})
                }else{
                    res.send({message:'Carrito eliminado!'})
                }
            })
        }
    })
})


//Delete de un producto por su ID
router.delete('/:id/products/:id_prod', (req, res) => {
    let idd = req.params.id_prod
    let idParse = JSON.parse(idd)

    fs.readFile('./jsons/cart.json', 'utf-8', (err,data) => {
        if(err){
            res.send({message: 'Error de consulta'})
        }else{
            let cart = JSON.parse(data)
            cart.forEach(x => {
                let prod = x.productos
                let itemFound = prod.find(x => x.id == idParse)
                if(!itemFound){
                    res.send({message: 'El producto no existe'})
                }else{
                    let index = prod.indexOf(itemFound)
                    
                    prod.splice(index, 1)
                    fs.writeFile('./jsons/cart.json' , JSON.stringify(cart), 'utf-8' , (err) => {
                        if(err){
                            res.send({message:'No se pudo eliminar el producto, intente de nuevo'})
                        }else{
                            res.send({message:'Producto eliminado!'})
                        }
                    })
                    
                }
                
            })
            
        }
    })
})


module.exports = router