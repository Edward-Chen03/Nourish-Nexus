import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import "./SideBar.css";

export default function SideBar() {
    return (
        <>
        <span className="container">
            {/*Profile Picture */}
            <span className="ProfilePicture">
                <Avatar sx={{width: 100, height: 100}}>
                    <span className="ProfileName">
                        H
                    </span>
                </Avatar>
            </span>  

            <a className='listItems'>
                PERSONAL INFORMATION
            </a>

            <a className='listItems'>
                INGREDIENTS
            </a>

            <a className='listItems'>
                RECIPES
            </a>

        </span>


        </>
    );
}