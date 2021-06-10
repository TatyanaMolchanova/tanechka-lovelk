const express = require('express')
const controller = require('../controllers/post')
const router = express.Router()


// localhost:5000/api/auth/login
// router.get('/login', (req, res) => {
//     res.status(200).json({
//         login: true
//     })
// })

// localhost:5000/api/auth/create-post
router.post('/create-post', passport.authenticate('jwt', { session: false }), controller.login)


module.exports = router
