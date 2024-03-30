import SideBar from "../../components/SideBar/SideBar"
import ContentWrapper from "../../components/ContentWrapper/ContentWrapper"
import GoalSelector from "../../components/GoalSelector/GoalSelector"
import "./PersonalInfoPage.css"
import {useState} from 'react';
import axios from 'axios';


export default function PersonalInfoPage() {
    const [goalChange, setGoalChange] = useState('');

    const handleGoalChange = (goal) => {
        setGoalChange(goal);
        console.log("goal Changed")
    };

    const updateChanges = async () => {
        await axios.post('http://localhost:3000/updatePersonalInformation', {

            goal: goalChange

        }).then(
            //made create a popup to tell people that there information was updated
            console.log("Settings have been updated")
        );
    }
    return (
        <>
        <span style={{display: "flex"}}>
            <SideBar></SideBar>
            <ContentWrapper>
                <span className="PersonalInformationContent">
                    <h1>PERSONAL INFORMATION</h1>
                    <GoalSelector onSelectGoal = {handleGoalChange}></GoalSelector>
                </span>
            </ContentWrapper>
        </span>
        <button onClick={updateChanges}>Save Changes</button>   
        </>
    )
}
