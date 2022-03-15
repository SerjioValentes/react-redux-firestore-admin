import React from "react";
import {Link} from "react-router-dom";
import '../style/main.css';


export const NavBar = () => {

    return (
        <nav className={'navBar'}>
            <p className={'navBar-item'}>
                <Link to={"/userPage"}>User Page</Link>
            </p>
            <p className={'navBar-item'}>
                <Link to={"/mainPage"}>Main Page</Link>
            </p>
        </nav>
    )
}
