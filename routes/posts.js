const router = require('express').Router()
const verify = require('./verifyToken')

router.get('/', verify, (req, res)=>{
    res.send(req.user)
    User.findbyOne({_id: req.user._id})
    
    // res.json({
    //     posts:{
    //         title: "1st post",
    //         des: "secret data"
    //     }
    // })
})


module.exports = router;