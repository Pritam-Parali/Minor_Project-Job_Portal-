import React from "react";
import { NavLink } from "react-router-dom";

const Navbar =()=>{
    return(
        <>
        <div className="navbar">
                <nav>
                    <ul>
                        <li><NavLink to={'/'} className={'nav'}>Home</NavLink></li>
                        <li><NavLink to={'/About'} className={'nav'}>About Us</NavLink></li>
                        <li><NavLink to={'/Job'} className={'nav'}>Job</NavLink></li>
                        <li><NavLink to={'/Internship'} className={'nav'}>Internship</NavLink></li>
                        <li><NavLink to={'/Contact_us'} className={'nav'}>Contact Us</NavLink></li>
                        <li><NavLink to={'/Setting'} className={'nav'}>Settings</NavLink></li>
                    </ul>
                </nav>
            </div>
        </>
    )
}
export default Navbar;