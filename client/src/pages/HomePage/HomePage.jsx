import { Navigate, useNavigate } from "react-router-dom";
import SideBar from "../../components/SideBar/SideBar";
import ContentWrapper from "../../components/ContentWrapper/ContentWrapper";
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function HomePage() {

    const location = useLocation();
    const navigate = useNavigate();
    const { emailChange, username } = location.state || {};
    let [usersList, setUsersList] = useState([]);


    console.log(emailChange);

    useEffect(() => {

        async function fetchData() {
            if (!emailChange) {
                navigate('/');
                return;
            }

            try {
                const res = axios.get('http://localhost:3000/users')
                    .then(res => { setUsersList(res.data); })
                    .catch(err => console.error(err));

                let findUser = usersList.find(user => user.email === emailChange);

                console.log(findUser);

                axios.post('http://localhost:3000/updatePersonalInformation', {

                    goal: findUser.fitness,
                    weight: findUser.weight,
                    age: findUser.age,
                    gender: findUser.gender

                }).then(

                    console.log("Settings have been updated")
                );

            } catch (err) {
                console.error(err);
            }

            fetchData();

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