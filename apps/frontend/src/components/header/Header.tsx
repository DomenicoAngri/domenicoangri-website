import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// import { RootState } from "@redux/store";
import { RootState } from "../../redux/store";

// import { setLanguage } from "@redux/reducers/language.reducer";
import { setLanguage } from "../../redux/reducers/language.reducer";

import axios from "axios";

// import env from "@config/environmentVariables";
import env from "../../config/environmentVariables";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLanguage, faBars, faX } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";
import { Dispatch } from "redux";

/**
 * // TODO
 * - Definire cosa fare se non dovesse comunicare col BE --> Stato di loading se le risposte sono null.
 * - Risolvere le dipendenze dei moduli.
 */

const Header = () => {
    // Dispatch action to reducer.
    const dispatch: Dispatch = useDispatch();

    // Get the current language global state.
    const language: string = useSelector((state: RootState) => state.language.currentLanguage);

    // Get url for API from env file.
    const apiUrl: string = env.apiUrl;

    // State for header response from strapi.
    const [headerResponse, setHeaderResponse] = useState();

    // State for menu.
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // For loading page - TODO-REMOVE
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResponseHeader = async () => {
            try {
                // API from strapi.
                const response = await axios.get(`${apiUrl}/header?populate=*&locale=${language}`);

                if (response) {
                    setHeaderResponse(response.data.data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchResponseHeader();
    }, [language]);

    if (loading) {
        return <div>Caricamento...</div>;
    }

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
        document.body.style.overflow = isMenuOpen ? "auto" : "hidden";
    };

    const TestComp = () => (
        <div
            className={`fixed inset-0 bg-black bg-opacity-100 transition-opacity duration-300 z-100 ${
                isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
        >
            <div
                className={`flex flex-col items-center justify-center h-full transition-transform duration-300 transform ${
                    isMenuOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <button className="text-white text-2xl mb-4" onClick={toggleMenu}>
                    Chiudi Menu
                </button>
                <ul className="text-white">
                    <li className="py-4">Voce 1</li>
                    <li className="py-4">Voce 2</li>
                    <li className="py-4">Voce 3</li>
                </ul>
            </div>
        </div>
    );

    return (
        <>
            {isMenuOpen ? (
                <TestComp />
            ) : (
                <header id="header" className="header">
                    <nav className="nav">
                        <div className="title">
                            <a href="#">{headerResponse.siteTitle}</a>
                        </div>
                        <div className="subNav">
                            <div
                                className="subNavElement"
                                onClick={() => {
                                    language === "en" ? dispatch(setLanguage("it")) : dispatch(setLanguage("en"));
                                }}
                            >
                                <FontAwesomeIcon icon={faLanguage} />
                            </div>
                            <div className="subNavElement" onClick={toggleMenu}>
                                <FontAwesomeIcon icon={isMenuOpen ? faX : faBars} />
                            </div>
                        </div>
                    </nav>
                </header>
            )}
        </>
    );
};

export default Header;
