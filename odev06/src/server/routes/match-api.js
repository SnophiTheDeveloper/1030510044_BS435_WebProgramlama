const express = require('express');

const router = express.Router();

router.get('/matches',(req,res)=>{


    const payload = {'name':"test"};

    res.status(200).json(payload);
});

module.exports = router;