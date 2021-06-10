const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/User')
const keys = require('../config/db-keys')
const errorHandler = require('../utils/errorHandler')

module.exports.login = async function(req, res) {
    const candidate = await User.findOne({email: req.body.email})

    if (candidate) {
        // password check, if user exists
        const passwordResult = await bcrypt.compareSync(req.body.password, candidate.password)
        if (passwordResult) {
            // token generation, passwords are identical
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, keys.jwt, {expiresIn: 60 * 60})

            res.status(200).json({
                // token: token
                token: `Bearer ${token}`
            })
        } else {
            //passwords are not identical
            res.status(401).json({
                message: 'Passwords are not identical. Try again'
            })
        }
    } else {
        // user is absent, error
        res.status(404).json({
            message: 'User with such email not found'
        })
    }



    // res.status(200).json({
    //     login: {
    //         email: req.body.email,
    //         password: req.body.password
    //     }
    //     // login: req.body
    // })
}

module.exports.register = async function (req, res) {
    // res.status(200).json({
    //     register: 'from controller'
    // })
    //
    // const user = new User({
    //     email: req.body.email,
    //     password: req.body.password
    // })
    // user.save().then(() => console.log('User created'))

    const candidate = await User.findOne({email: req.body.email})

    if (candidate) {
        // User exists, we need throw error
        res.status(409).json({
            message: 'Such email is busy. Please, try another.'
        })
    } else {
        // we have to create user
        const salt = bcrypt.genSaltSync(10)  // encoding password for
        const password = req.body.password
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
            // password: req.body.password
        })
        try {
            await user.save()
            res.status(201).json(user)
        } catch(err) {
            //process error
            errorHandler(res, err)
        }
    }
}


//npm i bcryptjs - for password encoding
//npm install jsonwebtoken
