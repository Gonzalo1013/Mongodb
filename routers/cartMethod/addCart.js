const express = require("express");
const {Router} = express
const router = new Router()
const fs = require('fs')



router.post('/:id/products/:id_prod', (req, res) => {
    let idd = req.params.id_prod
    let id_pr = JSON.parse(idd)
    fs.readFile('./jsons/products.json', 'utf-8' , (err, data) => {
        if(err){
            res.send({message: 'No se encontro el archivo'})
        }else{
            let products = JSON.parse(data)
            let itemFound = products.find(x => x.id === id_pr)
            if(!itemFound){
                res.send({message: 'El producto no existe'})
            
            }else{
                fs.readFile('./jsons/cart.json', 'utf-8' , (err, dat) => {
                    if(err){
                        res.send({message: 'No se encontro el archivo.'})
                    }else{
                        let p = JSON.parse(dat)
                        p.forEach(x => {
                            x.productos.push(itemFound)
                            fs.writeFile('./jsons/cart.json' , JSON.stringify(p), 'utf-8' , (err) => {
                                if(err){
                                    res.send({message: 'Error! no se pudo cargar el producto'})
                                }else{
                                    res.send({message: `el producto ${itemFound} fue cargado al carrito` })
                                }
                            })
                        })
                        
                    }
                })
                
                
            }
        }
    })
})

module.exports = router