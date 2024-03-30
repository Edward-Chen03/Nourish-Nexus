import { Navigate, useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar/SideBar";
import { useState } from 'react'

export default function Login({setUserEmail}) {

    const [Login, setLogin] = useState('Login');
    
    let navigate = useNavigate();

    const HomePage = () => {
        navigate('/home')
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        HomePage();
    }

    const handleCreateSubmit = async (e) => {
        e.preventDefault();

        HomePage();
    }

    const setCreatePage = () =>{
        setLogin('Create');
    }

    const setLoginPage = () =>{
        setLogin('Login');
    }

    switch(Login){
        
        case 'Login':
            return(
            <>
            <div>

            <h1>Welcome! Please Login in using your email!</h1>

            <form onSubmit = {handleSubmit}>

            <p>Email</p>

            <input type = "text" id = "email" name = "email" /> <br />

            <button type = "submit"> Login </button>

            </form>

            <button onClick = {setCreatePage}> Create Account </button>


            </div>
            </>);
        case 'Create':
            return(
            <>
        <div>

            <h1>Welcome! Please Create An Account!</h1>

            <form onSubmit = {handleCreateSubmit}>

            <p>Email</p>

            <input type = "text" id = "email" name = "email" /> <br />

            <p>Name</p>

            <input type = "text" id = "name" name = "name" /> <br />

            <button type = "submit"> Login </button>

            </form>

            <button onClick = {setLoginPage}>Already Have an Account? Login</button>


        </div>
        </>)

        default:
            return NULL;
        
    }
}