
const OpenAI = require('openai');

// https://nourish-nexus.onrender.com/


const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt');

app.use(express.json());
app.use(cors());
const port = 3000

const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.NOURISHMONGO;
let mongoose = require('mongoose');

mongoose.connect(uri);
let db = mongoose.connection;


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

let Users = require('./models/users.js');
let recipeList = require('./models/recipe.js');

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('connected', function () {

  console.log("db connected!");

})


const openai = new OpenAI();

let conversation = [{ role: "system", content: "You are a chef creating recipes for me based only on the ingredients in my kitchen and my personal information to fit my goals and make a healthy meal for me. If there are not enough ingredients, say \' I need more Ingredients to create a meal for you \'. Otherwise, please follow the format of displaying the recipe's name with Recipe:, then the ingredients with Ingredients: and then the Instructions with Instructions:" }];

let personalInformation = { role: "assistant", content: "I don't have any goals" };
let ingredientsConvo = { role: "assistant", content: "I don't have any ingredients" };

async function generateCompletion(convo) {
  try {

    const completion = await openai.chat.completions.create({
      messages: convo,
      model: "gpt-3.5-turbo",
    });
    conversation = [{ role: "system", content: "You are a chef creating recipes for me based only on the ingredients in my kitchen and my personal information to fit my goals and make a healthy meal for me. If there are not enough ingredients, say \' I need more Ingredients to create a meal for you \'. Otherwise, please follow the format of displaying the recipe's name with Recipe:, then the ingredients with Ingredients: and then the Instructions with Instructions:" }];
    //handle completion

    return completion.choices[0]

  } catch (error) {
    console.error(error)
  }

}

app.get('/users', async (req, res) => {

  let users = await Users.find({}).sort({});

  res.send(users);


})

app.get('/recipes', async (req, res) => {

  let recipes = await recipeList.find({}).sort({ name: 1 });
  res.send(recipes);


})

app.post('/addUser', async (req, res) => {

  let password = req.body.password;

  if (!req.body.email || !req.body.password || !req.body.gender || !req.body.fitness || !req.body.weight || !req.body.age) {
    return res.status(401).send("Invalid");
  }


  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) {
      console.log(err);
    }
    else {

      const newUser = new Users({

        email: req.body.email,
        name: req.body.name,
        password: hash,
        gender: req.body.gender,
        fitness: req.body.fitness,
        weight: req.body.weight,
        age: req.body.age

      });

      await newUser.save();
      res.send("New User Created");

    }
  })

});

app.post('/login', async (req, res) => {

  const { email } = req.body;

  const user = await Users.findOne({ email });

  let userPassword;
  let checkPassword;

  if (!user) {
    userPassword = null;
    return res.status(401).send("Invalid");
  } else {
    userPassword = user.password;
    checkPassword = await bcrypt.compare(req.body.password, userPassword);
  }

  if (!checkPassword) {
    return res.status(401).send("Invalid");
  }

  res.send(user);

});

app.post('/updateIngredients', (req, res) => {


  const ingredients = req.body.ingredients;
  update = "I now have these ingredients and only these ingredients in my kitchen: ";
  for (let i = 0; i < ingredients.length; i++) {
    if (i == ingredients.length - 1) {
      update += ingredients[i].title
    }
    else {
      update += ingredients[i].title + ", ";
    }
  }


  ingredientsConvo = { role: "assistant", content: update };
  res.send("ingredients have been updated");
})

app.post('/updatePersonalInformation', (req, res) => {
  update = "My fitness goal is now: " + req.body.goal + ". My age is now: " + req.body.age + ". My gender is now: " + req.body.gender + ". My weight range is now: " + req.body.weight + " pounds.";
  personalInformation = { role: "assistant", content: update };

  res.send("Fitness Goal has been updated");
})

app.get('/getNewRecipe', async (req, res) => {

  // add as recipe however need user
  conversation.push(personalInformation);
  conversation.push(ingredientsConvo);
  completion = await generateCompletion(conversation);
  // while(!completion.message.content.includes("Recipe") && !completion.message.content.includes("Ingredients") && !completion.message.content.includes("Instructions")){
  //   completion = await generateCompletion(conversation);
  // }

  res.send(completion.message.content);

})

app.post('/saveRecipe', async (req, res) => {

  let email = req.body.user;

  let findUser = await Users.findOne({ email });

  const newRecipe = new recipeList({

    user: findUser,
    name: req.body.name,
    ingredients: req.body.ingredients,
    description: req.body.description

  });

  await newRecipe.save();

  res.send("New Recipe Saved!")

});

app.delete('/deleteRecipe', async (req, res) => {
  try {
  
    const email = req.body.user;
    const recipeName = req.body.recipeIndex.name;

    let findUser = await Users.findOne({ email });

    const result = await recipeList.deleteOne({ user: findUser._id, name: recipeName });

    if (result.deletedCount === 0) {
      
      return res.status(401).send('Recipe not found.');
    }


    res.send('Recipe deleted successfully.');


  } catch (error) {
    console.error('Error deleting recipe:', error);
    res.status(401).send('Error deleting recipe.');
  }
});

app.put('/changeUser', async (req, res) => {


})



