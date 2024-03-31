
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

let Users = require('./models/users');
let IngredientsList = require('./models/ingredients');

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('connected', function () {

  console.log("db connected!");

})

const openai = new OpenAI();

let conversation = [{ role: "system", content: "You are a chef creating recipes for me based only on the ingredients in my kitchen and my personal information to fit my goals and make a healthy meal for me" },
{ role: "assistant", content: "I currently have no ingredients in my kitchen and no fitness goals" }]

async function generateCompletion(conversation) {
  try {
    const completion = await openai.chat.completions.create({
      messages: conversation,
      model: "gpt-3.5-turbo",
    });
    //handle completion
    console.log(completion.choices[0]);

    return completion.choices[0]

  } catch (error) {
    console.error(error)
  }

}

app.post('/addUser', (req, res) =>{
  
  console.log(req.body);
  
})

app.post('/updateIngredients', (req, res) => {
  //request is an array of ingredients
  console.log(req.body.ingredients);
  const ingredients = req.body.ingredients;
  update = "I now have these ingredients and only these ingredients in my kitchen: "
  for (let i = 0; i < ingredients.length; i++) {
    if (i == ingredients.length - 1) {
      update += ingredients[i].title
    }
    else {
      update += ingredients[i].title + ", ";
    }
  }
  update += ". Please forget ingredients I may have had before."



  console.log(update);
  newConvoEntry = { role: "assistant", content: update };
  conversation.push(newConvoEntry);
  res.send("ingredients have been updated");
})

app.post('/updatePersonalInformation', (req, res) => {
  //request is an array of ingredients
  update = "My fitness goal is now: " + req.body.goal + ". My age is now: " + req.body.age + ". My gender is now: " + req.body.gender + ". My weight range is now: " + req.body.weight + " pounds.";
  newConvoEntry = { role: "assistant", content: update };
  conversation.push(newConvoEntry);
  res.send("Fitness Goal has been updated");
})

app.get('/getNewRecipe', async (req, res) => {

  completion = await generateCompletion(conversation);
  console.log(completion);
  res.send(completion.message.content);
})




