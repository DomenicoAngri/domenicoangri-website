import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import ErrorSvgComponent from "../../assets/svg/ErrorSvgComponent";
import { motion } from "framer-motion";
import "./NotFound.css";

import { ERROR_TITLE_EN, ERROR_TITLE_IT, ERROR_SUBTITLE_EN, ERROR_SUBTITLE_IT, WHAT_HAPPENED_EN, WHAT_HAPPENED_IT } from "./NotFound.config";

const NotFound = () => {
    // TODO - To fix in the future, when there is a page reload, the language const is lost for the general state.
    // const siteLanguage = useSelector((state: RootState) => state.language.currentLanguage);
    const siteLanguage = "en";
    const [isShaking, setIsShaking] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsShaking(true);
            setTimeout(() => setIsShaking(false), 400);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flexColumn h-screen text-center">
            <div className="mb-5">
                <motion.div
                    animate={isShaking ? { x: [0, -2, 2, -2, 2, 0] } : {}}
                    transition={{ repeat: Infinity, duration: 0.3, ease: "easeInOut" }}
                >
                    <ErrorSvgComponent width={150} height={150} />
                </motion.div>
            </div>

            <div className="flexColumn">
                <h1>{siteLanguage === "en" ? ERROR_TITLE_EN : ERROR_TITLE_IT}</h1>
                <h1 className="mb-5">{siteLanguage === "en" ? ERROR_SUBTITLE_EN : ERROR_SUBTITLE_IT}</h1>
                <span>{siteLanguage === "en" ? WHAT_HAPPENED_EN : WHAT_HAPPENED_IT}</span>
            </div>
        </div>
    );
};

export default NotFound;
