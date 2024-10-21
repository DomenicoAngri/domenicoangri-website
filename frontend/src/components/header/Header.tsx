import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLanguage } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";

const Header = () => {
    const [activeSection, setActiveSection] = useState("");

    useEffect(() => {
        const handleScroll = () => {
            const section1 = document.getElementById("section1");
            const section2 = document.getElementById("section2");
            const scrollPosition = window.scrollY + window.innerHeight / 2;

            if (section1 && section2) {
                if (section1.offsetTop <= scrollPosition && section1.offsetTop + section1.offsetHeight > scrollPosition) {
                    setActiveSection("section1");
                } else if (section2.offsetTop <= scrollPosition && section2.offsetTop + section2.offsetHeight > scrollPosition) {
                    setActiveSection("section2");
                } else {
                    setActiveSection("");
                }
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleScrollToSectionClick = (event) => {
        event.preventDefault();
        const sectionId = event.currentTarget.getAttribute("href")?.substring(1);

        if (sectionId) {
            scrollToSection(sectionId);
        }
    };

    const scrollToSection = (sectionId: string) => {
        const header = document.getElementById("header");
        const section = document.getElementById(sectionId);

        if (header && section) {
            const headerHeight = header.offsetHeight;
            const sectionPosition = section.getBoundingClientRect().top + window.scrollY;

            window.scrollTo({
                top: sectionPosition - headerHeight,
            });
        }
    };

    return (
        <header id="header" className="header">
            <nav className="nav">
                <div className="title">
                    <a href="#">Domenico Angri</a>
                </div>
                <div className="subNav">
                    <div className="subNavElement">
                        <a
                            href="#section1"
                            className={activeSection === "section1" ? "activeSection" : "inactiveSection"}
                            onClick={handleScrollToSectionClick}
                        >
                            About
                        </a>
                    </div>
                    <div className="subNavElement">
                        <a
                            href="#section2"
                            className={activeSection === "section2" ? "activeSection" : "inactiveSection"}
                            onClick={handleScrollToSectionClick}
                        >
                            Exp
                        </a>
                    </div>
                    <div className="subNavElement">
                        <FontAwesomeIcon icon={faLanguage} />
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
