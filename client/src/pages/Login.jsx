import { Navigate, useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar/SideBar";
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Login({ setUserEmail, setUserName }) {

    const [Login, setLogin] = useState('Login');

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
                    <div>

                        <h1>Welcome! Please Login in using your email!</h1>

                        <form onSubmit={handleSubmit}>

                            <p>Email</p>

                            <input type="text" id="email" name="email" /> <br />

                            <button type="submit"> Login </button>

                        </form>
                        <p id="CheckingInvalidLogin" className="InvalidCheck"></p>

                        <button onClick={setCreatePage}> Create Account </button>


                    </div>
                </>);
        case 'Create':
            return (
                <>
                    <div>

                        <h1>Welcome! Please Create An Account!</h1>

                        <form onSubmit={handleCreateSubmit}>

                            <p>Email</p>

                            <input type="text" id="email" name="email" /> <br />

                            <p>Name</p>

                            <input type="text" id="name" name="name" /> <br />

                            <button type="submit"> Create </button>

                        </form>

                        <button onClick={setLoginPage}>Already Have an Account? Login</button>


                    </div>
                </>)

        default:
            return NULL;

    }
}