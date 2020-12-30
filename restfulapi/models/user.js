var mongoose = require("mongoose");
const Joi = require('@hapi/joi');
var userSchema= mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

var User= mongoose.model("User",userSchema);
function validateUser(data){
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().email().min(3).max(150).required(),
        password: Joi.string().min(3).max(100).required(),
    });
    return schema.validate(data, {abortEarly:false});
}
function validateUserLogin(data){
    const schema = Joi.object({
        email: Joi.string().email().min(0).max().required(),
        password: Joi.string().min(3).max(10).required(),

    });
    return schema.validate(data, {abortEarly:false});
}    
module.exports.User = User; 
module.exports.validate = validateUser; 
module.exports.validateUserLogin = validateUserLogin;