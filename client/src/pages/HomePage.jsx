import { Navigate, useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar/SideBar";
import ContentWrapper from "../components/ContentWrapper/ContentWrapper";

export default function HomePage() {

    return (
        <>
        <span style={{display: "flex"}}>
            <SideBar/>
            <ContentWrapper/>
            </span>
        </>
    );
}