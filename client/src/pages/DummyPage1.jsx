import { useNavigate } from "react-router-dom";
import axios from 'axios';
export default function DummyPage1({userEmail, userName}) {
    let navigate = useNavigate();
    console.log(userName);


    let homePage = () => {
        navigate('/home')
    }

    let testBack = async () => {

        let testIngredients = ["Butter", "Chicken", "Potato", "Cilantro"]
        
        await axios.post('http://localhost:3000/updateIngredients', {

            ingredients: testIngredients

        })

    }

    let testBack1 = async () => {

        
        let test = await axios.get('http://localhost:3000/getNewRecipe');

        console.log(test.data);

        let dataSplit = test.data;

        const sections = dataSplit.split("\n\n");
        let ingredientsList = '';
        let instructions = '';
        let recipeName = '';
        sections.forEach(section => {
            if(section.startsWith("Recipe")){
                recipeName = section.split(": ")[1];
            }
            else if(section.startsWith("Ingredients:")){
                ingredientsList = section.split("\n").slice().join("\n");
            }
            else if(section.startsWith("Instructions:")){
                instructions = section.split("\n").slice().join("\n");
            }
        });

        console.log(recipeName);
        console.log(ingredientsList);
        console.log(instructions);
        let testUser = "testing123@gmail.com"
        await axios.post("http://localhost:3000/saveRecipe", { user: testUser, name: recipeName, ingredients: ingredientsList, description: instructions})

    }

    return (
        <>
        
        <button onClick={homePage}> Test Home </button>

        <button onClick = {testBack}>Test Backend</button>

        <button onClick = {testBack1}>Test Backend1</button>

        </>
        
    );
}