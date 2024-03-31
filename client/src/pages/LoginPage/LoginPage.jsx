import { Navigate, useNavigate } from "react-router-dom";
import Selector from "../../components/Selector/Selector";
import AgeSlider from "../../components/AgeSlider/AgeSlider";
import { useState, useEffect } from 'react';
import axios from 'axios';
import './LoginPage.css'
import BasicTextField from '../../components/BasicTextField/BasicTextField'
import logo from '/NourishNexus.jpg'

export default function Login({ setUserEmail, setUserName }) {

    const [Login, setLogin] = useState('Create');
    const fitnessGoalOptions = ["Gain Weight", "Lose Weight", "Grow Muscle", "Maintain Weight"]
    const genderOptions = ["Male", "Female"]
    const weightOptions = ["< 100", "< 150", "< 200", "< 250", "< 300", "> 350" ]
    const [goalChange, setGoalChange] = useState('');
    const [weightChange, setWeightChange] = useState('');
    const [ageChange, setAgeChange] = useState('');
    const [genderChange, setGenderChange] = useState('');


    let [usersList, setUsersList] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3000/users')
             .then(res => { setUsersList(res.data); })
             .catch(err => console.error(err));
    }, []); 

    let navigate = useNavigate();

    const HomePage = (email, username) => {
        navigate('/home', { state: { email, username } })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        

        try {

            const response = await axios.post('http://localhost:3000/login', { email });

            setUserEmail(email);
        

            HomePage(email, response.data.name);

        }
        catch (error) {

            if (error.response && error.response.status == 401) {

                document.getElementById('CheckingInvalidLogin').innerHTML = 'No Login Found!';
            }
            else {
                
                console.error(error);
              
                document.getElementById('CheckingInvalidLogin').innerHTML = 'Error!';
            }

        }





    }

    const handleCreateSubmit = async (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const username = e.target.name.value;

        console.log(username);

        const newUser = await axios.post('http://localhost:3000/addUser', {

            email: email,
            name: username

        })

        console.log(newUser);

        setUserEmail(email);
        setUserName(username);

        HomePage(email, username);
    }

    const setCreatePage = () => {
        setLogin('Create');
    }

    const setLoginPage = () => {
        setLogin('Login');
    }

    switch (Login) {

        case 'Login':
            return (
                <> 
                    <span className="LoginPageContainer">
                        <span className="logoContainer">
                            <img className="logo" src={logo}/>
                            <h1 className="welcome">Welcome to Nourish Nexus</h1>
                            <h2 className="welcome">Enter your email to create an account!</h2>
                            <div className="info1">
                                <BasicTextField label="Email"></BasicTextField>
                            </div>
                            <span className="nextButtonContainer">
                                <button onClick={handleSubmit} className="nextButton">Sign up</button>
                            </span>
                        </span>
                    </span>

                </>);
        case 'Create':
            return (
                <>
                    <span className="LoginPageContainer">
                        <span className="logoContainer">
                            <img className="logo" src={logo}/>
                            <h1 className="welcome">Fill out your information to receive your Personalized Plan</h1>
                            <span className="info2">
                                <BasicTextField label="First Name"></BasicTextField>
                            </span>
                            <span className="info2">
                                <BasicTextField label="Last Name"></BasicTextField>
                            </span>
                            <span className="info2">
                                <Selector label="Gender" options={genderOptions} onSelect = {setGenderChange}/>
                            </span>
                            <span className="info2">
                                <Selector label="Fitness Goal" options={fitnessGoalOptions} onSelect = {setGoalChange}></Selector>
                            </span>
                            <span className="info2">
                                <Selector label="Weight" options={weightOptions} onSelect = {setWeightChange}></Selector>
                            </span>
                            <span className="info2">
                                <AgeSlider onSelectAge={setAgeChange}></AgeSlider>
                            </span>
                            <span className="nextButtonContainer">
                                <button onClick={handleSubmit} className="nextButton">Sign up</button>
                            </span>
                            <span   className="emptySpace"></span>
                        </span>
                    </span>

                </>)

        default:
            return NULL;

    }
}