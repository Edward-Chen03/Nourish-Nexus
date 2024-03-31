const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {type: String},
    name: {type: String},
    
});

userSchema.virtual('url').get(function(){
    return '/posts/user/' + this._id;
});


module.exports = mongoose.model('Users', userSchema);