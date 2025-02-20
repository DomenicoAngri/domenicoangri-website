import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import FatalErrorProps from "./FatalError.types";
import FatalErrorSvgComponent from "../../assets/svg/FatalErrorSvgComponent";
import { motion } from "framer-motion";
import "./FatalError.css";

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

    // TODO DOMANI - Sto risolvendo errore del max-widht del container. Inoltre appena si carica la homepage se va a buon fine
    // per un attimo si vede il componente di errore, di flash e non deve accadere.

    return (
        <div className="container">
            <motion.div
                className="defaultMarginBottom"
                animate={isShaking ? { x: [0, -2, 2, -2, 2, 0] } : {}}
                transition={{ repeat: Infinity, duration: 0.3, ease: "easeInOut" }}
            >
                <FatalErrorSvgComponent width={150} height={150} />
            </motion.div>

            <h1 className="defaultMarginBottom">FATAL ERROR 🤯</h1>

            <p>È successo qualcosa di grave 😱 </p>
            <p>Di seguito i dettagli dell'errore:sadasdadsaasd</p>

            <div className="title">{title}</div>

            <div>
                {description && (
                    <div className="description">
                        {codeError ? "Error with code: " : ""} {description}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FatalError;
