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

    const [firstChange, setFirstChange] = useState('');
    const [lastChange, setLastChange] = useState('');
    const [goalChange, setGoalChange] = useState('');
    const [weightChange, setWeightChange] = useState('');
    const [ageChange, setAgeChange] = useState('');
    const [genderChange, setGenderChange] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);

    let [searchParams] = useSearchParams();
    let navigate = useNavigate();


    const email = decodeURIComponent(searchParams.get('email') || '');

    console.log(email);

    useEffect(() => {
        if (!email) {
            navigate('/'); 
        }
    }, [email, navigate]);

    const updateChanges = async () => {
        await axios.post('http://localhost:3000/updatePersonalInformation', {

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
            <SideBar emailChange = {email}></SideBar>
            <ContentWrapper>
                <span className="PersonalInformationContent">
                    <h1>PERSONAL INFORMATION</h1>
                    <BasicTextField label="First Name" onChange={setFirstChange}></BasicTextField>
                    <BasicTextField label="Last Name" onChange={setLastChange}></BasicTextField>
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