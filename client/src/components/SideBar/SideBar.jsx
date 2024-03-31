import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import "./SideBar.css";
import defaultPFP from '/default_pfp.jpg'

export default function SideBar() {
    return (
        <>
        <span className="sideBarContainer">
            {/*Profile Picture */}
            <span className="profilePicture">
                <Avatar sx={{width: 100, height: 100}} src={defaultPFP}></Avatar>
            </span>  
            <span className="itemList">
                <a className='listItem' href="/PersonalInformation">
                    <span className='rubik-scribble-regular'>PERSONAL INFORMATION</span>
                </a>

                <a className='listItem' href="/Ingredients">
                    INGREDIENTS
                </a>

                <a className='listItem' href="/Recipes">
                    RECIPES
                </a>
            </span>


        </span>


        </>
    );
}