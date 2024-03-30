import { useNavigate } from "react-router-dom";

export default function HomePage() {
    let navigate = useNavigate();

    let homePage = () => {
        navigate('/')
    }

    return (
        <>
        
        <button onClick={homePage}> Test Home </button>

        </>
        
    );
}