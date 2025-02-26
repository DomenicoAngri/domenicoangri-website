import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { italianGreetings, englishGreetings } from "./Greatings.types";
import "./Greatings.css";

const Greatings = () => {
    // Get the current site language from global state.
    const siteLanguage = useSelector((state: RootState) => state.language.currentLanguage);

    // Get the correct greetings based on the site language.
    const greetingsArray = siteLanguage === "it" ? italianGreetings : englishGreetings;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Timer per l'animazione di fade in/out
        const fadeTimer = setInterval(() => {
            setIsVisible(false);

            setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % greetingsArray.length);
                setIsVisible(true);
            }, 700);
        }, 3000);

        return () => clearInterval(fadeTimer);
    }, []);

    return (
        <div className="transition-opacity duration-700 ease-in-out" style={{ opacity: isVisible ? 1 : 0 }}>
            <span className="text-5xl font-semibold mr-2">{greetingsArray[currentIndex].text}</span>
            <span className="text-sm font-semibold">({greetingsArray[currentIndex].language})</span>
        </div>
    );
};

export default Greatings;
