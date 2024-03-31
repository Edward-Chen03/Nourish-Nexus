
const OpenAI = require('openai');

// https://nourish-nexus.onrender.com/


const express = require('express');
const app = express();
const cors = require('cors');


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

let conversation = [{ role: "system", content: "You are a chef creating recipes for me based only on the ingredients in my kitchen and my personal information to fit my goals and make a healthy meal for me. If there are not enough ingredients, say \' I need more Ingredients to create a meal for you \'. Otherwise, please follow the format of displaying the recipe's name with Recipe:, then the ingredients with Ingredients: and then the Instructions with Instructions:" }  ];

let personalInformation = { role: "assistant", content: "I don't have any goals"};
let ingredientsConvo = { role: "assistant", content: "I don't have any ingredients"};

async function generateCompletion(convo) {
  try {
    console.log(convo)
    const completion = await openai.chat.completions.create({
      messages: convo,
      model: "gpt-3.5-turbo",
    });
    conversation = [{ role: "system", content: "You are a chef creating recipes for me based only on the ingredients in my kitchen and my personal information to fit my goals and make a healthy meal for me. If there are not enough ingredients, say \' I need more Ingredients to create a meal for you \'. Otherwise, please follow the format of displaying the recipe's name with Recipe:, then the ingredients with Ingredients: and then the Instructions with Instructions:" }  ];
    //handle completion
    console.log(completion.choices[0]);

    return completion.choices[0]

  } catch (error) {
    console.error(error)
  }

}

app.get('/users', async (req, res) =>{

  let users = await Users.find({}).sort({name: 1});
  res.send(users);


})

app.get('/recipes', async (req, res) =>{

  let recipes = await recipeList.find({}).sort({name: 1});
  res.send(recipes);


})

app.post('/addUser', async (req, res) => {

  console.log(req.body);

  const newUser = new Users({

    email: req.body.email,
    name: req.body.name,
    gender: req.body.gender,
    fitness: req.body.fitness,
    weight: req.body.weight

  });

  await newUser.save();
  res.send("New User Created");

});

app.post('/login', async (req, res) =>{

  const {email} = req.body;

  console.log(email);

  const user = await Users.findOne({email})

  if(!user){
    return res.status(401).send("Invalid");
  }

  res.send(user);

});

app.post('/updateIngredients', (req, res) => {
  
  console.log("i here bitch");
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



  //console.log(update);
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

app.post('/saveRecipe', async (req, res) =>{

    let email = req.body.user;

    let findUser = await Users.findOne({email});  

    const newRecipe = new recipeList({

      user: findUser,
      name: req.body.name,
      ingredients: req.body.ingredients,
      description: req.body.description

    });

    await newRecipe.save();

    console.log(newRecipe);

    res.send("New Recipe Saved!")

});

app.put('/changeUser', async (req, res) =>{


})



