import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLanguage } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";

const Header = () => {
    return (
        <header className="header">
            <nav className="nav">
                <div className="title">Domenico Angri</div>
                <div className="subNav">
                    <div className="subNavElement">About</div>
                    <div className="subNavElement">Exp</div>
                    <div className="subNavElement">
                        <FontAwesomeIcon icon={faLanguage} />
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
