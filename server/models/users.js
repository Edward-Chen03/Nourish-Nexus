const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {type: String},
    password: {type: String},
    name: {type: String},
    gender: {type: String},
    fitness: {type: String},
    weight: {type: String},
    age: {type: Number}
    
});

userSchema.virtual('url').get(function(){
    return '/posts/user/' + this._id;
});


module.exports = mongoose.model('Users', userSchema);