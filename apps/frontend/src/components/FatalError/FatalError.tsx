import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import FatalErrorProps from "./FatalError.types";
import FatalErrorSvgComponent from "../../assets/svg/FatalErrorSvgComponent";
import { motion } from "framer-motion";
import "./FatalError.css";

import {
    ERROR_TITLE_EN,
    ERROR_TITLE_IT,
    ERROR_BELOW_EN,
    ERROR_BELOW_IT,
    ERROR_CODE_EN,
    ERROR_CODE_IT,
    ERROR_DESCRIPTION_EN,
    ERROR_DESCRIPTION_IT,
    ERROR_EN,
    ERROR_IT,
    WHAT_HAPPENED_EN,
    WHAT_HAPPENED_IT,
} from "./FatalError.config";

const FatalError = (props: FatalErrorProps) => {
    const { codeError, title, description } = props;

    const siteLanguage = useSelector((state) => state.language.currentLanguage);
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
            <div className="defaultMarginBottom">
                <motion.div
                    animate={isShaking ? { x: [0, -2, 2, -2, 2, 0] } : {}}
                    transition={{ repeat: Infinity, duration: 0.3, ease: "easeInOut" }}
                >
                    <FatalErrorSvgComponent width={150} height={150} />
                </motion.div>
            </div>

            <div className="flexColumn defaultMarginBottom">
                <h1>{siteLanguage === "en" ? ERROR_TITLE_EN : ERROR_TITLE_IT}</h1>
                <span>{siteLanguage === "en" ? WHAT_HAPPENED_EN : WHAT_HAPPENED_IT}</span>
            </div>

            <div className="flexColumn">
                <span>{siteLanguage === "en" ? ERROR_BELOW_EN : ERROR_BELOW_IT}</span>
                <span>
                    <strong>{siteLanguage === "en" ? ERROR_CODE_EN : ERROR_CODE_IT}</strong> {codeError}
                </span>
                <span>
                    <strong>{siteLanguage === "en" ? ERROR_EN : ERROR_IT}</strong> {description}
                </span>
                <span>
                    <strong>{siteLanguage === "en" ? ERROR_DESCRIPTION_EN : ERROR_DESCRIPTION_IT}</strong> {title}
                </span>
            </div>
        </div>
    );
};

export default FatalError;
