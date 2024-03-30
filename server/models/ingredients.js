const mongoose = require('mongoose');

const ingredientsSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref:'Users'},
    ingredients: {type: Array}
});

ingredientsSchema.virtual('url').get(function(){
    return '/posts/ingredients/' + this._id;
});


module.exports = mongoose.model('Ingredients', ingredientsSchema);