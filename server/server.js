
const OpenAI = require('openai');

// https://nourish-nexus.onrender.com/


const express = require('express');
const app = express();
const cors = require('cors');


app.use(express.json());
app.use(cors());
const port = 3000

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const openai = new OpenAI();

let conversation = [{ role: "system", content: "You are a chef creating recipes for me based only on the ingredients in their kitchen and their fitness goals" },
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

app.post('/updateIngredients', (req, res) => {
  //request is an array of ingredients
  console.log(req.body.ingredients);
  const ingredients = req.body.ingredients;
  update = "I now have these ingredients in my kitchen: "
  for (let i = 0; i < ingredients.length; i++) {
    if (i == ingredients.length - 1) {
      update += ingredients[i]
    }
    else {
      update += ingredients[i] + ", ";
    }
  }



  console.log(update);
  newConvoEntry = {role: "assistant", content: update};
  conversation.push(newConvoEntry);
  res.send("ingredients have been updated");
})

app.post('/updateFitnessGoal', (req, res) => {
  //request is an array of ingredients
  update = "My fitness goal is now: " + req.body.goal;
  console.log(update);
  conversation.push(update);
  res.send("Fitness Goal has been updated");
})

app.get('/getNewRecipe', async (req, res) => {

  completion = await generateCompletion(conversation);
  console.log(completion);
  res.send(completion.message.content);
})



