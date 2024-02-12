import React, { useState } from "react";
import "./style.css";
import { VscGrabber, VscClose } from "react-icons/vsc";
import { NavLink } from "react-router-dom";
import { logotext } from "../content_option";
import Themetoggle from "../components/themetoggle";
import Socialicons from "../components/socialicons";

const Headermain = () => {
    const [isActive, setActive] = useState(false);

    const handleToggle = () => {
        setActive(!isActive);
        document.body.classList.toggle("ovhidden");
    };

    const navLinks = [
        { to: "/", text: "Home" },
        { to: "/portfolio", text: "Portfolio" },
        { to: "/about", text: "About" },
        // { to: "/contact", text: "Contact" },
    ];

    return (
        <>
            <header
                className={`fixed-top site__header ${
                    isActive ? "menu__opend" : ""
                }`}
            >
                <div className="d-flex align-items-center justify-content-between">
                    <NavLink className="navbar-brand nav_ac" to="/">
                        {logotext}
                    </NavLink>

                    <Socialicons />

                    <div className="d-flex align-items-center">
                        <Themetoggle />
                        <button
                            className="menu__button  nav_ac"
                            onClick={handleToggle}
                        >
                            {isActive ? <VscClose /> : <VscGrabber />}
                        </button>
                    </div>
                </div>

                {isActive && (
                    <div className="bg__menu h-100">
                        <div className="menu__wrapper">
                            <div className="menu__container p-3">
                                <ul className="the_menu">
                                    {navLinks.map((link, index) => (
                                        <li key={index} className="menu_item">
                                            <NavLink
                                                to={link.to}
                                                onClick={handleToggle}
                                                className={({ isActive }) =>
                                                    isActive
                                                        ? "active"
                                                        : "inactive"
                                                }
                                            >
                                                {link.text}
                                            </NavLink>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </header>

            <div className="br-top"></div>
            <div className="br-bottom"></div>
            <div className="br-left"></div>
            <div className="br-right"></div>
        </>
    );
};

export default Headermain;
