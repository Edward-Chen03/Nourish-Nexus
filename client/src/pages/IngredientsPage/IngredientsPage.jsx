import * as React from 'react';
import SideBar from "../../components/SideBar/SideBar"
import ContentWrapper from "../../components/ContentWrapper/ContentWrapper"
import IngredientSearch from "../../components/IngredientSearch/IngredientSearch"
import './IngredientsPage.css'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {useState, useEffect} from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from "../../components/Loading/Loading"
import TransitionAlerts from '../../components/TransitionAlerts/TransitionAlerts';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };



export default function Ingredients() {

    const getValIfLS = () => {
        const storedValue = localStorage.getItem('items');
        return storedValue !== null ? JSON.parse(storedValue) : [];
      }

    const [showChip, setShowChip] = React.useState(true);
    const [showAlert, setShowAlert] = React.useState(false);
    const [ingredientList, setIngredientList] = React.useState(getValIfLS());
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [recipe, setRecipe] = React.useState('')
    const [isLoading, setIsLoading] = React.useState(false);
    const [recipeTitle, setRecipeTitle] = React.useState('');
    const [recipeIng, setRecipeIng] = React.useState('');
    const [toDo, setToDo] = React.useState('');

    let [searchParams] = useSearchParams();
    let navigate = useNavigate();


    const email = decodeURIComponent(searchParams.get('email') || '');
    let currentUser = decodeURIComponent(searchParams.get('user') || '');

    console.log(email);

    useEffect(() => {
        if (!email) {
            navigate('/'); 
        }
    }, [email, navigate]);

    const handleDelete = () => {
        setShowChip(false);
    };

    const splitRecipe = (recipeToSplit) => {
        const recipeIndex = recipeToSplit.indexOf('Recipe:');
        const ingredientsIndex = recipeToSplit.indexOf('Ingredients:');
        const instructionsIndex = recipeToSplit.indexOf('Instructions:');
    
        if (recipeIndex !== -1 && ingredientsIndex !== -1 && instructionsIndex !== -1) {
            const recipeTitle = recipeToSplit.substring(recipeIndex + 'Recipe:'.length, ingredientsIndex).trim();
            const recipeIng = recipeToSplit.substring(ingredientsIndex + 'Ingredients:'.length, instructionsIndex).trim();
            const toDo = recipeToSplit.substring(instructionsIndex + 'Instructions:'.length).trim();
            
            setRecipeTitle(recipeTitle);
            setRecipeIng(recipeIng);
            setToDo(toDo);
        } else {
            // Handle case where one of the headings is missing
            console.error('One or more headings missing in the recipe');
        }
    };

    const recipeCreate = async () => {
        setIsLoading(true);
        await axios.post('https://nourish-nexus-server.onrender.com/updateIngredients', {
            ingredients: ingredientList
        });
        console.log("Ingredients added");
        const newRecipe = await axios.get('https://nourish-nexus-server.onrender.com/getNewRecipe');
        console.log(newRecipe);
        if (!newRecipe.data.includes("I need")) {
            splitRecipe(newRecipe.data); // Pass newRecipe.data directly
        } else {
            setToDo("Insufficient Information");
            setRecipeIng("Insufficient Information");
            setRecipeTitle("Insufficient Information");
        }
        setRecipe(newRecipe.data); // Update state after splitting
        setIsLoading(false);
        setOpen(true);
    };

    const saveRecipe = async () => {
        axios.post('https://nourish-nexus-server.onrender.com/saveRecipe', {
            user: email,
            name: recipeTitle,
            ingredients: recipeIng,
            description: toDo

        });
        console.log("saved recipe");
        setOpen(false);
        setShowAlert(true);
    }

    return(
        <>
        <span style={{display: "flex"}}>
            <SideBar emailChange = {email} currentUser = {currentUser}></SideBar>
            <ContentWrapper>
                <span className='alert'>
                    <TransitionAlerts label={recipeTitle + " has been saved!"} open={showAlert} setOpen={setShowAlert}></TransitionAlerts>
                </span>
                <span className="IngredientsContent">
                    <h1>INGREDIENTS</h1>
                    <IngredientSearch onSelectedIngredients={setIngredientList}></IngredientSearch>
                    {isLoading && <Loading></Loading>}
                    <span className='createRecipeButtonContainer'>
                        <button onClick={recipeCreate} className='createRecipeButton'>Create Recipe</button>
                    </span>
                </span>
            </ContentWrapper>
        </span>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className='recipeModal'
        >
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h4" component="h1">
                {recipeTitle}
            </Typography>
            <div>
                <Typography variant="body1" component="p">
                    <strong>Ingredients:</strong>
                </Typography>
                {recipeIng}
            </div>
            <div>
                <Typography variant="body1" component="p">
                    <strong>Instructions:</strong>
                </Typography>
                {toDo}
            </div>
            {recipeTitle !== "Insufficient Information" && (
    <button onClick={saveRecipe} className='saveRecipe'>Save Recipe</button>
)}
            </Box>
        </Modal>
        </>
    )
};