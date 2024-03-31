import { Navigate, useNavigate } from "react-router-dom";
import SideBar from "../../components/SideBar/SideBar";
import ContentWrapper from "../../components/ContentWrapper/ContentWrapper";
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

export default function HomePage() {

    const location = useLocation();
    const navigate = useNavigate();
    let [searchParams] = useSearchParams();
    let { emailChange, username } = location.state || {};
    let [usersList, setUsersList] = useState([]);


    console.log(emailChange);

    let email = decodeURIComponent(searchParams.get('email') || '');
    if(!emailChange){
        emailChange = email;

        console.log(emailChange);
    }
    useEffect(() => {
        async function fetchData() {
            if (!emailChange && !email) {
                navigate('/');
                return;
            }
    
            try {
                const response = await axios.get('http://localhost:3000/users');
                setUsersList(response.data);

                const findUser = response.data.find(user => user.email === emailChange);
                console.log(findUser);
    
                if (findUser) {
                    
                    await axios.post('http://localhost:3000/updatePersonalInformation', {
                        goal: findUser.fitness,
                        weight: findUser.weight,
                        age: findUser.age,
                        gender: findUser.gender
                    });
    
                    console.log("Settings have been updated");
                } else {
                    console.log("User not found");
                }
    
            } catch (err) {
                console.error(err);
            }
        }
    
        fetchData();
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