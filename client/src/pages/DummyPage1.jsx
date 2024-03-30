import { useNavigate } from "react-router-dom";

export default function HomePage() {
    let navigate = useNavigate();

    let homePage = () => {
        navigate('/')
    }

    let testBack = () => {
        
    }

    return (
        <>
        
        <button onClick={homePage}> Test Home </button>

        <button onClick = {testBack}>Test Backend</button>

        </>
        
    );
}