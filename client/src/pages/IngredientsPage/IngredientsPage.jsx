import * as React from 'react';
import SideBar from "../../components/SideBar/SideBar"
import ContentWrapper from "../../components/ContentWrapper/ContentWrapper"
import IngredientSearch from "../../components/IngredientSearch/IngredientSearch"
import './IngredientsPage.css'
import IngredientChip from "../../components/IngredientChip/IngredientChip";
import {useState, useEffect} from 'react';
import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom';

export default function Ingredients() {

    const [showChip, setShowChip] = React.useState(true);

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

    return(
        <>
        <span style={{display: "flex"}}>
            <SideBar email = {email}></SideBar>
            <ContentWrapper>
                <span className="IngredientsContent">
                    <IngredientSearch></IngredientSearch>
                </span>

            </ContentWrapper>
        </span>
        </>
    )
};