import SideBar from "../../components/SideBar/SideBar"
import ContentWrapper from "../../components/ContentWrapper/ContentWrapper"
import GoalSelector from "../../components/GoalSelector/GoalSelector"
import "./PersonalInfoPage.css"

export default function PersonalInfoPage() {
    return (
        <>
        <span style={{display: "flex"}}>
            <SideBar></SideBar>
            <ContentWrapper>
                <span className="PersonalInformationContent">
                    <h1>PERSONAL INFORMATION</h1>
                    <GoalSelector></GoalSelector>
                </span>
            </ContentWrapper>
        </span>   
        </>
    )
}
