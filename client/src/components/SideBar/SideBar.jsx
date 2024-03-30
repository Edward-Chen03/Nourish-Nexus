import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import "./SideBar.css";
import defaultPFP from '../../../public/default_pfp.jpg'

export default function SideBar() {
    return (
        <>
        <span className="container">
            {/*Profile Picture */}
            <span className="profilePicture">
                <Avatar sx={{width: 100, height: 100}} src={defaultPFP}></Avatar>
            </span>  
            <span className="itemList">
                <a className='listItem'>
                    PERSONAL INFORMATION
                </a>

                <a className='listItem'>
                    INGREDIENTS
                </a>

                <a className='listItem'>
                    RECIPES
                </a>
            </span>


        </span>


        </>
    );
}