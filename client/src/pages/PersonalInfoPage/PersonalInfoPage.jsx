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
    const [weightChange, setWeightChange] = useState('');
    const [ageChange, setAgeChange] = useState('');
    const [genderChange, setGenderChange] = useState('');

    const updateChanges = async () => {
        await axios.post('http://localhost:3000/updatePersonalInformation', {

            goal: goalChange,
            weight: weightChange,
            age: ageChange,
            gender: genderChange

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
                    <Selector label="Gender" options={genderOptions} onSelect = {setGenderChange}/>
                    <Selector label="Fitness Goal" options={fitnessGoalOptions} onSelect = {setGoalChange}></Selector>
                    <Selector label="Weight" options={weightOptions} onSelect = {setWeightChange}></Selector>
                    <AgeSlider onSelectAge={setAgeChange}></AgeSlider>
                    <span className="saveContainer">
                        <button onClick={updateChanges} className="saveButton">Save</button>
                    </span>

                </span>

            </ContentWrapper>
        </span>
        </>
    )
}
