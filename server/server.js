const OpenAI = require('openai');
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

let conversation =  [{ role: "system", content: "You are a chef creating recipes for me based only on the ingredients in their kitchen and their fitness goals" },
                  {role: "assistant", content: "I currently have no ingredients in my kitchen and no fitness goals"}]

async function generateCompletion(conversation) {
    try {
      const completion = await openai.chat.completions.create({
        messages: conversation,
        model: "gpt-3.5-turbo",
      });
      //handle completion
      console.log(completion.choices[0]);
    } catch (error) {
      console.error("Error: " + error)
    }
    
  }
  
  app.post('/updateIngredients', (req, res) => {
    //request is an array of ingredients
    update = "I now have these ingredients in my kitchen: "
    for(ingredient in req.body.ingredients){
      update = update + ingredient + ", ";
    }
    conversation.push(update);
    res.send("ingredients have been updated");
  })

  app.post('/updateFitnessGoal', (req, res) => {
    //request is an array of ingredients
    update = "My fitness goal is now: " + req.body.goal;
    conversation.push(update);
    res.send("Fitness Goal has been updated");
  })

  app.get('/getNewRecipe', async (req, res) => {
    completion = await generateCompletion(conversation);
    res.send(completion.choices[0].message.content);
  })



