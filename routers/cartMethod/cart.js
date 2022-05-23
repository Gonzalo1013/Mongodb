const express = require("express");

const {Router} = express

const router = new Router()

router.get('/', (req, res)=>{
    res.send('cart todo ok')
})

let asd = Date.now()
console.log(asd);


module.exports = router