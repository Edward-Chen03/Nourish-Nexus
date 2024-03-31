import { Navigate, useNavigate } from "react-router-dom";
import SideBar from "../../components/SideBar/SideBar";
import ContentWrapper from "../../components/ContentWrapper/ContentWrapper";
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function HomePage() {

    const location = useLocation();
    const navigate = useNavigate();
    const { emailChange, username } = location.state || {};
    let [usersList, setUsersList] = useState([]);


    console.log(emailChange);

    useEffect(async () => {

        if (!emailChange) {
            navigate('/');
        }

        await axios.get('http://localhost:3000/users')
            .then(res => { setUsersList(res.data); })
            .catch(err => console.error(err));

        let findUser = usersList.find(user => user.email === emailChange);

        await axios.post('http://localhost:3000/updatePersonalInformation', {

            goal: findUser.fitness,
            weight: findUser.weight,
            age: findUser.age,
            gender: findUser.gender

        }).then(
            //made create a popup to tell people that there information was updated
            console.log("Settings have been updated")
        );

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