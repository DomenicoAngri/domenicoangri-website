// src/components/Header.tsx
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        // Logica dark
        setDarkMode(!darkMode);
    };

    return (
        <header className={`fixed top-0 left-0 w-full bg-gray-900 text-white py-6 shadow-md z-50 bg-opacity-85 backdrop-blur-sm`}>
            <nav className="container mx-auto flex justify-between items-center px-4">
                <div className="text-xl font-bold">Domenico Angri</div>
                <div className="flex items-center space-x-6">
                    <a href="#" className="hover:text-gray-200">
                        About
                    </a>
                    <a href="#" className="hover:text-gray-200">
                        CV
                    </a>
                    <button onClick={toggleDarkMode}>
                        <FontAwesomeIcon icon={faMoon} />
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default Header;
