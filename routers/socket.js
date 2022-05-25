const express = require("express");
const {Router} = express

const router = new Router()

router.get('/', (req, res) => {
    res.sendFile('public/socket.html', {root:'.'})
})

module.exports = router