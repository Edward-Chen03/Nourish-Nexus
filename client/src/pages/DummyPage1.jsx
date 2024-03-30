import { useNavigate } from "react-router-dom";
import axios from 'axios';
export default function DummyPage1({userEmail, userName}) {
    let navigate = useNavigate();
    console.log(userName);
    
    if(userName == ''){
        navigate("/");
    }

    let homePage = () => {
        navigate('/')
    }

    let testBack = async () => {

        let testIngredients = ["Butter", "Chicken", "Potato", "Cilantro"]
        
        await axios.post('http://localhost:3000/updateIngredients', {

            ingredients: testIngredients

        })

    }

    let testBack1 = async () => {

        
        let test = await axios.get('http://localhost:3000/getNewRecipe');

        console.log(test);

    }

    return (
        <>
        
        <button onClick={homePage}> Test Home </button>

        <button onClick = {testBack}>Test Backend</button>

        <button onClick = {testBack1}>Test Backend1</button>

        </>
        
    );
}