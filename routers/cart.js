const express = require("express");

const {Router} = express

const router = new Router()

router.get('/', (req, res)=>{
    res.send('cart todo ok')
})

module.exports = router