const mongoose = require('mongoose');
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')


const UserSchema = new Schema({
   email:{
    type: String,
    required: true,
    lowercase: true,
    unique: true
   },
   password: {
       type: String,
       required: true
   }
})

UserSchema.pre('save', async function (next) {
    try{
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(this.password, salt)
        console.log(this.email, this.password)
        this.password = hashPassword
        next()
    }catch(error){
         next(error)
    }
})

UserSchema.methods.isValidPassword = async function (password) {
    try{
        return  await bcrypt.compare(password, this.password)
    }catch(error) {
        throw error
    }
}

const User = mongoose.model('user', UserSchema);
module.exports = User
