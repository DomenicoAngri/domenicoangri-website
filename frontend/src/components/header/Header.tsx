import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setLanguage } from "../../redux/reducers/language.reducer";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLanguage } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";

const Header = () => {
    // Dispatch action to reducer.
    const dispatch = useDispatch();

    // Get the current language global state.
    const language = useSelector((state: RootState) => state.language.language);

    // Get url for API from env file.
    const url = import.meta.env.VITE_API_URL;

    // State for header response from strapi.
    const [headerResponse, setHeaderResponse] = useState();

    // Name of sections.
    // const [sections, setSections] = useState<String[]>([]);
    const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     const fetchResponseHeader = async () => {
    //         try {
    //             // API from strapi.
    //             const response = await axios.get(`${url}/header?populate=*&locale=${language}`);
    //             setHeaderResponse(response.data.data);
    //         } catch (err) {
    //             console.error(err);
    //         } finally {
    //             setLoading(false);
    //             console.log("finally catch nel primo useEffect");
    //             console.log("response del primo", headerResponse);
    //         }
    //     };
    //     fetchResponseHeader();
    // }, []);

    useEffect(() => {
        const fetchResponseHeader = async () => {
            try {
                // API from strapi.
                const response = await axios.get(`${url}/header?populate=*&locale=${language}`);
                setHeaderResponse(response.data.data);
                console.log("response della lingua 1", headerResponse);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
                console.log("finally catch in quello della lingua");
                console.log("response della lingua catch 2", headerResponse);
            }
        };
        fetchResponseHeader();
    }, [language]);

    // Usefull for to select current header section.
    // const [activeSection, setActiveSection] = useState("");

    // useEffect(() => {
    //     const handleScroll = () => {
    //         // const section1 = document.getElementById("section1");
    //         // const section2 = document.getElementById("section2");
    //         const scrollPosition = window.scrollY + window.innerHeight / 2;

    //         // if (section1 && section2) {
    //         //     if (section1.offsetTop <= scrollPosition && section1.offsetTop + section1.offsetHeight > scrollPosition) {
    //         //         setActiveSection("section1");
    //         //     } else if (section2.offsetTop <= scrollPosition && section2.offsetTop + section2.offsetHeight > scrollPosition) {
    //         //         setActiveSection("section2");
    //         //     } else {
    //         //         setActiveSection("");
    //         //     }
    //         // }

    //         sections.forEach((section, index) => {
    //             const selectedSection = document.getElementById(section);

    //             if (
    //                 selectedSection &&
    //                 selectedSection.offsetTop <= scrollPosition &&
    //                 selectedSection.offsetTop + selectedSection.offsetHeight > scrollPosition
    //             ) {
    //                 setActiveSection(selectedSection);
    //             }
    //         });
    //     };

    //     window.addEventListener("scroll", handleScroll);

    //     return () => {
    //         window.removeEventListener("scroll", handleScroll);
    //     };
    // }, [sections]);

    // useEffect(() => {
    //     // Aggiungi le sezioni qui, quando `headerResponse` cambia.
    //     if (headerResponse && headerResponse.menu_links) {
    //         const newSections = headerResponse.menu_links.map((menuLink) => menuLink.idSection);
    //         setSections(newSections);
    //     }
    // }, [headerResponse]);

    // const handleScrollToSectionClick = (event) => {
    //     event.preventDefault();
    //     const sectionId = event.currentTarget.getAttribute("href")?.substring(1);

    //     if (sectionId) {
    //         scrollToSection(sectionId);
    //     }
    // };

    // const scrollToSection = (sectionId: string) => {
    //     const header = document.getElementById("header");
    //     const section = document.getElementById(sectionId);

    //     if (header && section) {
    //         const headerHeight = header.offsetHeight;
    //         const sectionPosition = section.getBoundingClientRect().top + window.scrollY;

    //         window.scrollTo({
    //             top: sectionPosition - headerHeight,
    //         });
    //     }
    // };

    // const addSection = (section) => {
    //     setSections((prevItems) => [...prevItems, section]);
    //     console.log("Section ---> ", section);
    // };

    if (loading) {
        return <div>Caricamento...</div>; // Mostra un messaggio di caricamento
    }

    return (
        <header id="header" className="header">
            <nav className="nav">
                <div className="title">
                    <a href="#">{headerResponse.siteTitle}</a>
                </div>
                <div className="subNav">
                    {headerResponse.menu_links.map((menuLink) => (
                        <div key={menuLink.idSection} className="subNavElement">
                            <a
                                href={`#${menuLink.idSection}`}
                                // className={activeSection === `#${menuLink.idSection}` ? "activeSection" : "inactiveSection"}
                                // onClick={handleScrollToSectionClick}
                            >
                                {menuLink.sectionTitle}
                            </a>
                        </div>
                    ))}
                    {/* <div className="subNavElement">
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
                    </div> */}
                    <div
                        className="subNavElement"
                        onClick={() => {
                            language === "en" ? dispatch(setLanguage("it")) : dispatch(setLanguage("en"));
                        }}
                    >
                        <FontAwesomeIcon icon={faLanguage} />
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
