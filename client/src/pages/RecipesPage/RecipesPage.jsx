import SideBar from "../../components/SideBar/SideBar"
import ContentWrapper from "../../components/ContentWrapper/ContentWrapper"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom';

export default function Ingredients() {

    let [recipeList, setRecipeList] = useState([]);

    let [usersList, setUsersList] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3000/users')
            .then(res => { setUsersList(res.data); })
            .catch(err => console.error(err));
    }, []);

    let [searchParams] = useSearchParams();
    let navigate = useNavigate();


    const email = decodeURIComponent(searchParams.get('email') || '');

    console.log(email);

    useEffect(() => {
        if (!email) {
            navigate('/');
        }
    }, [email, navigate]);

    useEffect(() => {

        axios.get('http://localhost:3000/recipes')
            .then(res => { setRecipeList(res.data); })
            .catch(err => console.error(err));

    }, [])

    console.log(recipeList);

    const findUser = usersList.find(user => user.email == email);

    const filteredRecipes = recipeList.filter(recipe => recipe.user === findUser?._id);

    console.log(filteredRecipes);

    return (
        <>
            <span style={{ display: "flex" }}>
                <SideBar email={email}></SideBar>
                <ContentWrapper>
                    <span className="PersonalInformationContent">
                        <h1>YOUR RECIPES</h1>

                        <table>
                            <thead>
                                <tr>
                                    <th>Recipe Name</th>
                                    <th>Ingredients</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredRecipes.map((recipe, index) => (
                                    <tr key={index}>
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