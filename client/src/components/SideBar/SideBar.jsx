import * as React from 'react';
import "./SideBar.css";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { styled } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function SideBar({ emailChange, currentUser }) {

    console.log(emailChange);

    let [usersList, setUsersList] = useState([]);

    const encodedVar = encodeURIComponent(emailChange);

    useEffect(() => {
        axios.get('https://nourish-nexus-server.onrender.com/users')
            .then(res => { setUsersList(res.data); })
            .catch(err => console.error(err));
    }, []);

    let findUser = usersList.find(user => user.email == emailChange);

    const encodedUser = encodeURIComponent(findUser);

    console.log(findUser);

    if(!findUser){
        findUser = currentUser;
    }

    return (
        <>
            <span className="sideBarContainer">
                {/*Profile Picture */}
                <span className="profilePicture">
                    <IconButton>
                        <AccountCircleIcon sx={{width: 200, height: 200}}></AccountCircleIcon>
                    </IconButton>   
                </span>
                <p className='userName'>{findUser.name}</p>
                <span className="itemList">
                    <a className='listItem' href={`/Home?email=${encodedVar}&user=${encodedUser}`}>
                        HOME
                    </a>
                    <a className='listItem' href={`/PersonalInformation?email=${encodedVar}&user=${encodedUser}`}>
                        PERSONAL INFORMATION
                    </a>

                    <a className='listItem' href={`/Ingredients?email=${encodedVar}&user=${encodedUser}`}>
                        INGREDIENTS
                    </a>

                    <a className='listItem' href={`/Recipes?email=${encodedVar}&user=${encodedUser}`}>
                        RECIPES
                    </a>
                </span> 
            </span>


        </>
    );
}