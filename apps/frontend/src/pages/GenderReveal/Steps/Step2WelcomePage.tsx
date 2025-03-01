import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Step2Props } from "../GenderReveal.types";

const Step2WelcomePage: React.FC<Step2Props> = ({ invitationData, goToNextStep, goToPreviousStep }) => {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bodyContainer">
            <h2 className="defaultMarginBottom">Ciao {invitationData?.invitationName || ""}!</h2>
            <div className="defaultMarginBottom">Domenico & Laura sono felici di invitarti al loro gender reveal!</div>
            <div className="mb-5">
                Per organizzare al meglio l'evento, ti chiediamo di farci sapere se potrai partecipare e se avrai ospiti con te.
            </div>

            <div className="flex space-x-4">
                <button
                    onClick={goToPreviousStep}
                    className="flex flex-row justify-evenly items-center w-32 p-2 bg-pink-300 text-white rounded-md hover:bg-gray-300 transition-colors"
                >
                    <FontAwesomeIcon icon={faArrowLeft} />
                    <span>Indietro</span>
                </button>
                <button
                    onClick={goToNextStep}
                    className="flex flex-row justify-evenly items-center w-32 p-2 bg-blue-400 text-white rounded-md hover:bg-blue-500 transition-colors"
                >
                    <span>Avanti</span>
                    <FontAwesomeIcon icon={faArrowRight} />
                </button>
            </div>
        </motion.div>
    );
};

export default Step2WelcomePage;
