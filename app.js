const express = require('express');
const bodyParser = require('body-parser')
const morgan = require('morgan');
const createError = require('http-errors');
require('dotenv').config() 
require('./helpers/auth-mongodb') 
const OauthRoute = require('./Routes/OauthRoute') 
const fileUpload = require("express-fileupload");
const app  = express();


app.use(express.json());
app.use(fileUpload());
app.use(express.urlencoded({extended: true}))


//Get Route
app.get('/',  async(req, res, next) => {
    res.send("Routing Express");
})

app.use('/auth', OauthRoute)
app.use(morgan('dev'));


app.use(async(req,res,next) => {
    next(createError.NotFound('This resource does not exits'))
})

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        },
    })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})