import SideBar from "../../components/SideBar/SideBar"
import ContentWrapper from "../../components/ContentWrapper/ContentWrapper"
import Selector from "../../components/Selector/Selector"
import BasicTextField from "../../components/BasicTextField/BasicTextField"
import AgeSlider from "../../components/AgeSlider/AgeSlider"
import "./PersonalInfoPage.css"
import { Button } from "@mui/material"
import {useState, useEffect} from 'react';
import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


export default function PersonalInfoPage() {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',    
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const setUseState = (key) => {
        const storedValue = localStorage.getItem(key);
        return storedValue !== null ? (storedValue) : "";
    }

    const [firstChange, setFirstChange] = useState(setUseState("firstname"))
    const [lastChange, setLastChange] = useState(setUseState("lastname"));
    const [goalChange, setGoalChange] = useState(setUseState("fitnessgoal"));
    const [weightChange, setWeightChange] = useState(setUseState("weight"));
    const [ageChange, setAgeChange] = useState(setUseState("age"));
    const [genderChange, setGenderChange] = useState(setUseState("gender"));
    const [openModal, setOpenModal] = useState(false);
    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);

    let [searchParams] = useSearchParams();
    let navigate = useNavigate();


    const email = decodeURIComponent(searchParams.get('email') || '');
    let currentUser = decodeURIComponent(searchParams.get('user') || '');


    useEffect(() => {
        if (!email) {
            navigate('/'); 
        }
    }, [email, navigate]);

    useEffect(() => {
        localStorage.setItem("firstname", firstChange);
        localStorage.setItem("lastname", lastChange);
        localStorage.setItem("fitnessgoal", goalChange);
        localStorage.setItem("weight", weightChange);
        localStorage.setItem("age", ageChange);
        localStorage.setItem("gender", genderChange);
    }, [openModal])

    const updateChanges = async () => {
        await axios.post('https://nourish-nexus-server.onrender.com/updatePersonalInformation', {

            goal: goalChange,
            weight: weightChange,
            age: ageChange,
            gender: genderChange

        }).then(
            //made create a popup to tell people that there information was updated
            setOpenModal(true)
        );
    }
    const fitnessGoalOptions = ["Gain Weight", "Lose Weight", "Grow Muscle", "Maintain Weight"]
    const genderOptions = ["Male", "Female"]
    const weightOptions = ["< 100", "< 150", "< 200", "< 250", "< 300", "> 350" ]
    return (
        <>
        <span style={{display: "flex"}}>
            <SideBar emailChange = {email} currentUser = {currentUser}></SideBar>
            <ContentWrapper>
                <span className="PersonalInformationContent">
                    <h1>PERSONAL INFORMATION</h1>
                    <BasicTextField label="First Name" onChange={setFirstChange} defaultValue={firstChange}></BasicTextField>
                    <BasicTextField label="Last Name" onChange={setLastChange} defaultValue={lastChange}></BasicTextField>
                    <Selector label="Gender" options={genderOptions} onSelect = {setGenderChange} defaultValue={genderChange}/>
                    <Selector label="Fitness Goal" options={fitnessGoalOptions} onSelect = {setGoalChange} defaultValue={goalChange}></Selector>
                    <Selector label="Weight" options={weightOptions} onSelect = {setWeightChange} defaultValue={weightChange}></Selector>
                    <AgeSlider onSelectAge={setAgeChange} defaultValue={ageChange}></AgeSlider>
                    <span className="saveContainer">
                        <button onClick={updateChanges} className="saveButton">Save</button>
                    </span>

                </span>

            </ContentWrapper>
        </span>
        <Modal
            open={openModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className='recipeModal'
        >
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Your personal info has been saved {firstChange} {lastChange}! 
            </Typography>
            </Box>
        </Modal>
        </>
    )
}