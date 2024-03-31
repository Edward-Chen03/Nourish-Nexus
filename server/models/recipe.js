const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref:'Users'},
    name: {type: String},
    ingredients: {type: String},
    description: {type: String}
});

recipeSchema.virtual('url').get(function(){
    return '/posts/recipe/' + this._id;
});


module.exports = mongoose.model('Recipes', recipeSchema);