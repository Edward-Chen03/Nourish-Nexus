import SideBar from "../../components/SideBar/SideBar"
import ContentWrapper from "../../components/ContentWrapper/ContentWrapper"
import Selector from "../../components/Selector/Selector"
import BasicTextField from "../../components/BasicTextField/BasicTextField"
import AgeSlider from "../../components/AgeSlider/AgeSlider"
import "./PersonalInfoPage.css"
import { Button } from "@mui/material"
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
    const fitnessGoalOptions = ["Gain Weight", "Lose Weight", "Grow Muscle", "Maintain Weight"]
    const genderOptions = ["Male", "Female"]
    const weightOptions = ["< 100", "< 150", "< 200", "< 250", "< 300", "> 350" ]
    return (
        <>
        <span style={{display: "flex"}}>
            <SideBar></SideBar>
            <ContentWrapper>
                <span className="PersonalInformationContent">
                    <h1>PERSONAL INFORMATION</h1>
                    <BasicTextField label="First Name"></BasicTextField>
                    <BasicTextField label="Last Name"></BasicTextField>
                    <Selector label="Gender" options={genderOptions}/>
                    <Selector label="Fitness Goal" options={fitnessGoalOptions}></Selector>
                    <Selector label="Weight" options={weightOptions}></Selector>
                    <AgeSlider></AgeSlider>
                    <span className="saveContainer">
                        <button onClick={() => console.log("hello")} className="saveButton">Save</button>
                    </span>

                </span>

            </ContentWrapper>
        </span>
        <button onClick={updateChanges}>Save Changes</button>   
        </>
    )
}
