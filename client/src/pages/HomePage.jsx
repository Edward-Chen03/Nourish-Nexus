import { Navigate, useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar/SideBar";

export default function HomePage() {
    
    let navigate = useNavigate();

    const page1 = () => {
        navigate('/DummyPage1')
    }

    return (
        <>
        <SideBar/>

        <button onClick={page1}> Test </button>

        </>
        
    );
}