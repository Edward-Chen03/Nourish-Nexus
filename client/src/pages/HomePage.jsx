import { Navigate, useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar/SideBar";
import ContentWrapper from "../components/ContentWrapper/ContentWrapper";
import { useLocation } from 'react-router-dom';
import {useEffect, useState} from 'react';

export default function HomePage() {

    const location = useLocation();
    const navigate = useNavigate();
    const {email, username} = location.state || {};

    useEffect(() => {
        if (!email) {
            navigate('/'); 
        }
    }, [email, navigate]);
    
    console.log(email);

    const page1 = () => {
        navigate('/DummyPage1')
    }



    return (
        <>
        <span style={{display: "flex"}}>
            <SideBar email = {email} />
            <ContentWrapper/>
            </span>

            <button onClick={page1}> Test </button>
        </>
    );
}