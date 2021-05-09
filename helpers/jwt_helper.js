const JWT = require('jsonwebtoken');
const createError = require('http-errors')

module.exports = {
    signAccessToken: (userId) => {
        return new Promise((resolve, reject) => {

            const payload = {

            }

             const secret = process.env.ACCESS_TOKEN_SECRET

            const options = {

                expiresIn: "10m",
                issuer: "mern-commerce.com",
                audience: userId
            }

            JWT.sign(payload, secret, options, (err, token) => {
                if(err) {
                   //reject(err)
                    console.log(err.message)
                    reject(createError.InternalServerError())
                } 
                resolve(token)
            })
        })
    },

    //Create a verify access token function for only authenticated users
      verifyAccessToken: (req,res,next) => {
          //Check if the authorization headers exist in request
          if(!req.headers['authorization']) return next(createError.Unauthorized())

          //If the header is present
          const authHeader = req.headers['authorization']

          //Store the authorization header by split in an array
          const bearerToken = authHeader.split(' ')

          const token = bearerToken[1]

          JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
              if(err) {
                  return next(createError.Unauthorized())
              }

              req.payload = payload

              next()
          })
      }
}