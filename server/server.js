import  OpenAI from "openai";

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

async function main() {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: "You are a helpful assistant." }],
      model: "gpt-3.5-turbo",
    });
  
    console.log(completion.choices[0]);
  }
  
main();
