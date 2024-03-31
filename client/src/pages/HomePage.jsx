import { Navigate, useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar/SideBar";
import ContentWrapper from "../components/ContentWrapper/ContentWrapper";
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function HomePage() {

    const location = useLocation();
    const navigate = useNavigate();
    const { emailChange, username } = location.state || {};

    console.log(emailChange);

    useEffect(() => {

        if (!emailChange) {
            navigate('/');
        }

    }, [emailChange, navigate]);



    return (
        <>

            <span style={{ display: "flex" }}>
                <SideBar emailChange={emailChange} />
                <ContentWrapper />
            </span>

        </>
    );

}