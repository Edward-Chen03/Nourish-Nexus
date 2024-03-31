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

    const [showChip, setShowChip] = React.useState(true);
    const [ingredientList, setIngredientList] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [recipe, setRecipe] = React.useState('')

    let [searchParams] = useSearchParams();
    let navigate = useNavigate();


    const email = decodeURIComponent(searchParams.get('email') || '');

    console.log(email);

    useEffect(() => {
        if (!email) {
            navigate('/'); 
        }
    }, [email, navigate]);

    const handleDelete = () => {
        setShowChip(false);
    };

    const recipeCreate = async () => {
        axios.post('http://localhost:3000/updateIngredients', {
            ingredients: ingredientList
        });
        console.log("Ingredients added");
        const newRecipe = await axios.get('http://localhost:3000/getNewRecipe');
        setRecipe(newRecipe.data);
        console.log(newRecipe);
        setOpen(true);
    };

    return(
        <>
        <span style={{display: "flex"}}>
            <SideBar emailChange = {email}></SideBar>
            <ContentWrapper>
                <span className="IngredientsContent">
                    <IngredientSearch onSelectedIngredients={setIngredientList}></IngredientSearch>
                    <button onClick={recipeCreate}>Create Recipe</button>
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
            <Typography id="modal-modal-title" variant="h6" component="h2">
                New Recipe!
            </Typography>
            <div>{recipe}</div>
            </Box>
        </Modal>
        </>
    )
};