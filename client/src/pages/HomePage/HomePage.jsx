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
    let currentUser = decodeURIComponent(searchParams.get('user') || '');
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
                const response = await axios.get('https://nourish-nexus-server.onrender.com/users');
                setUsersList(response.data);

                const findUser = response.data.find(user => user.email === emailChange);
                console.log(findUser);
    
                if (findUser) {
                    
                    await axios.post('https://nourish-nexus-server.onrender.com/updatePersonalInformation', {
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
                <SideBar emailChange={emailChange} currentUser = {currentUser} />
                <ContentWrapper>
                
                <h1>Welcome to Nourish Nexus</h1>

                <p> We are a innovative web application where culinary aspirations meet fitness objectives in the most personalized manner. At the heart of our service lies a simple yet profound belief: everyone deserves to enjoy meals that not only delight the palate but also align perfectly with their health and fitness goals. Nourish Nexus is more than just a recipe site; it's your personal chef and health manager, all rolled into one seamless experience.

Using cutting-edge technology, Nourish Nexus takes the guesswork out of meal planning. By understanding your unique fitness targets and scrutinizing the ingredients you have on hand, we craft delicious, nutritious recipes tailored just for you. Whether you're looking to lose weight, gain muscle, maintain a balanced diet, or simply make the most of what’s in your pantry, Nourish Nexus is your go-to companion.</p>



                </ContentWrapper>
            </span>

        </>
    );

}