const mongoose = require('mongoose');


mongoose.connect(process.env.MONGO_URI, {dbName: process.env.DB_NAME,
 useUnifiedTopology: true,
 useNewUrlParser: true,
 useFindAndModify: false,
 useCreateIndex: true
})
.then(() => {
    console.log("Connected Successfully")
})
.catch((err) => console.log(err.message));

mongoose.connection.on('connected', () => {
    console.log("Mongoose Connection To MongoDB Successful")
})

mongoose.connection.on('error', (error) => {
    console.log(err.message)
})

mongoose.connection.on('disconnected', () => {
    console.log("MongoDB Disconnected")
})

process.on('SIGINT', async() => {
    await mongoose.connection.close()
    process.exit()
})
