import { Navigate, useNavigate } from "react-router-dom";
import Selector from "../../components/Selector/Selector";
import AgeSlider from "../../components/AgeSlider/AgeSlider";
import { useState, useEffect } from 'react';
import axios from 'axios';
import './LoginPage.css'
import BasicTextField from '../../components/BasicTextField/BasicTextField'
import logo from '/NourishNexus.jpg'

export default function Login({ setUserEmail, setUserName }) {

    const [Login, setLogin] = useState('Login');
    const fitnessGoalOptions = ["Gain Weight", "Lose Weight", "Grow Muscle", "Maintain Weight"]
    const genderOptions = ["Male", "Female"]
    const weightOptions = ["< 100", "< 150", "< 200", "< 250", "< 300", "> 350"]
    const [goalChange, setGoalChange] = useState('');
    const [weightChange, setWeightChange] = useState('');
    const [ageChange, setAgeChange] = useState('');
    const [genderChange, setGenderChange] = useState('');
    const [emailChange, setEmailChange] = useState('');
    const [passwordChange, setPasswordChange] = useState('');
    const [firstChange, setFirstChange] = useState('');
    const [lastChange, setLastChange] = useState('');


    let [usersList, setUsersList] = useState([]);
    useEffect(() => {
        axios.get('https://nourish-nexus-server.onrender.com/users')
            .then(res => { setUsersList(res.data); })
            .catch(err => console.error(err));
    }, []);

    let navigate = useNavigate();

    const HomePage = (email, username) => {
        navigate('/home', { state: { emailChange, username } })
    }

    const handleEmailChange = (value) => {
        setEmailChange(value);
    }

    const handlePasswordChange = (value) => {
        setPasswordChange(value);
    }

    const saveToLocalStorage = () => {
        localStorage.setItem("firstname", firstChange);
        localStorage.setItem("lastname", lastChange);
        localStorage.setItem("fitnessgoal", goalChange);
        localStorage.setItem("weight", weightChange);
        localStorage.setItem("age", ageChange);
        localStorage.setItem("gender", genderChange);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();



        console.log(emailChange);


        try {

            const response = await axios.post('https://nourish-nexus-server.onrender.com/login', { email: emailChange, password: passwordChange });

            setUserEmail(emailChange);

            saveToLocalStorage();

            HomePage(emailChange, response.data.name);

        }
        catch (error) {

            if (error.response && error.response.status == 401) {

                document.getElementById('CheckingInvalidLogin').innerHTML = 'Incorrect Login!';
            }
            else {

                console.error(error);

                document.getElementById('CheckingInvalidLogin').innerHTML = 'Error!';
            }

        }





    }

    const handleTransferToCreateSubmit = async (e) => {

        setLogin('Create');

    }

    const handleTransferToSubmit = async (e) => {

        setLogin('Login');

    }

    const handleCreateSubmit = async (e) => {
        e.preventDefault();

        const email = emailChange;
        let username = firstChange + " " + lastChange
        try {
            const newUser = await axios.post('https://nourish-nexus-server.onrender.com/addUser', {

                email: email,
                name: username,
                password: passwordChange,
                gender: genderChange,
                fitness: goalChange,
                weight: weightChange,
                age: ageChange

            });

            console.log(newUser);

            setUserEmail(email);
            setUserName(username);


            HomePage(emailChange, username);
        }
        catch (error) {

            if (error.response && error.response.status == 401) {

                document.getElementById('CheckingInvalidSign').innerHTML = 'Insufficient Parameters';
            }
            else {

                console.error(error);

                document.getElementById('CheckingInvalidSign').innerHTML = 'Error!';
            }
        }
    }


    switch (Login) {

        case 'Login':
            return (
                <>
                    <span className="LoginPageContainer">
                        <span className="logoContainer">
                            <img className="logo" src={logo} />
                            <h1 className="welcome">Welcome to Nourish Nexus</h1>
                            <h2 className="welcome">Login</h2>
                            <div className="info1">
                                <BasicTextField label="Email" value={emailChange} onChange={handleEmailChange}></BasicTextField>
                                <BasicTextField label="Password" type="password" value={passwordChange} onChange={handlePasswordChange}></BasicTextField>
                            </div>
                            <span className="nextButtonContainer">
                                <p id="CheckingInvalidLogin"></p>
                                <button onClick={handleSubmit} className="nextButton">Sign In </button>
                                <button onClick={handleTransferToCreateSubmit} className="nextButton">Click Here to Sign Up </button>
                            </span>
                        </span>
                    </span>

                </>);
        case 'Create':
            return (
                <>
                    <span className="LoginPageContainer">
                        <span className="logoContainer">
                            <img className="logo" src={logo} />
                            <h1 className="welcome">Fill out your information to receive your Personalized Plan</h1>
                            <span className="info2">
                                <BasicTextField label="First Name" onChange={setFirstChange}></BasicTextField>
                            </span>
                            <span className="info2">
                                <BasicTextField label="Last Name" onChange={setLastChange}></BasicTextField>
                            </span>
                            <span className="info2">
                                <BasicTextField label="Email" value={emailChange} onChange={handleEmailChange}></BasicTextField>
                            </span>
                            <span className="info2">
                                <BasicTextField label="Password" type="password" onChange={handlePasswordChange}></BasicTextField>
                            </span>
                            <span className="info2">
                                <Selector label="Gender" options={genderOptions} onSelect={setGenderChange} />
                            </span>
                            <span className="info2">
                                <Selector label="Fitness Goal" options={fitnessGoalOptions} onSelect={setGoalChange}></Selector>
                            </span>
                            <span className="info2">
                                <Selector label="Weight" options={weightOptions} onSelect={setWeightChange}></Selector>
                            </span>
                            <span className="info2">
                                <AgeSlider onSelectAge={setAgeChange}></AgeSlider>
                            </span>
                            <span className="nextButtonContainer">
                                <p id="CheckingInvalidSign"></p>
                                <button onClick={handleCreateSubmit} className="nextButton">Sign up</button>
                                <button onClick={handleTransferToSubmit} className="nextButton">Already Have An Account? Sign in</button>
                            </span>
                            <span className="emptySpace"></span>
                        </span>
                    </span>

                </>)

        default:
            return NULL;

    }
}