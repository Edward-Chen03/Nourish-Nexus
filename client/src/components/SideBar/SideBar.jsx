import * as React from 'react';
import "./SideBar.css";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { styled } from '@mui/material/styles';
import { IconButton } from '@mui/material';

export default function SideBar({ emailChange }) {

    console.log(emailChange);

    const encodedVar = encodeURIComponent(emailChange);

    return (
        <>
            <span className="sideBarContainer">
                {/*Profile Picture */}
                <span className="profilePicture">
                    <IconButton>
                        <AccountCircleIcon sx={{width: 200, height: 200}}></AccountCircleIcon>
                    </IconButton>

                </span>
                <span className="itemList">
                    <a className='listItem' href={`/Home?email=${encodedVar}`}>
                        HOME
                    </a>
                    <a className='listItem' href={`/PersonalInformation?email=${encodedVar}`}>
                        PERSONAL INFORMATION
                    </a>

                    <a className='listItem' href={`/Ingredients?email=${encodedVar}`}>
                        INGREDIENTS
                    </a>

                    <a className='listItem' href={`/Recipes?email=${encodedVar}`}>
                        RECIPES
                    </a>
                </span> 
            </span>


        </>
    );
}