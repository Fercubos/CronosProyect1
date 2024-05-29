const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;

const userSchema = new Schema({
    email: String,
    password: String
});


userSchema.methods.encryptPassword = (password) => {//Encripta la contraseña
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword= function (password) { //Compara la contraseña   
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('users', userSchema);
