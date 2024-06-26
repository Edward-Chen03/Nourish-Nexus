import SideBar from "../../components/SideBar/SideBar"
import ContentWrapper from "../../components/ContentWrapper/ContentWrapper"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom';
import DeleteButton from "../../components/DeleteButton/DeleteButton";
import './RecipesPage.css'

export default function Ingredients() {

    let [recipeList, setRecipeList] = useState([]);

    let [usersList, setUsersList] = useState([]);
    useEffect(() => {
        axios.get('https://nourish-nexus-server.onrender.com/users')
            .then(res => { setUsersList(res.data); })
            .catch(err => console.error(err));
    }, []);

    let [searchParams] = useSearchParams();
    let navigate = useNavigate();


    const email = decodeURIComponent(searchParams.get('email') || '');
    let currentUser = decodeURIComponent(searchParams.get('user') || '');


    useEffect(() => {
        if (!email) {
            navigate('/');
        }
    }, [email, navigate]);

    useEffect(() => {

        axios.get('https://nourish-nexus-server.onrender.com/recipes')
            .then(res => { setRecipeList(res.data); })
            .catch(err => console.error(err));

    }, [])

    const handleDelete = async (recipe) => {
        try {
            const response = await axios.delete('https://nourish-nexus-server.onrender.com/deleteRecipe', {
                data: { recipeIndex: recipe, user: email },
            });
          

            await axios.get('https://nourish-nexus-server.onrender.com/recipes')
            .then(res => { setRecipeList(res.data); })
            .catch(err => console.error(err));
          
        } catch (error) {
            console.error("Error deleting recipe:", error);
        }
    };
    



    const findUser = usersList.find(user => user.email == email);

    const filteredRecipes = recipeList.filter(recipe => recipe.user === findUser?._id);



    return (
        <>
            <span style={{ display: "flex" }}>
                <SideBar emailChange ={email} currentUser={currentUser}></SideBar>
                <ContentWrapper>
                    <span className="PersonalInformationContent">
                        <h1>YOUR RECIPES</h1>

                        <table>
                            <thead>
                                <tr>
                                    <th>Delete </th>
                                    <th>Recipe Name</th>
                                    <th>Ingredients</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredRecipes.map((recipe, index) => (
                                    <tr key={index}>
                                        <td className="deleteContainer">
                                            <DeleteButton onClick={() => handleDelete(recipe)}></DeleteButton>
                                        </td>
                                        <td>{recipe.name}</td>
                                        <td>{recipe.ingredients}</td>
                                        <td>{recipe.description}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </span>
                </ContentWrapper>
            </span>
        </>
    )
};