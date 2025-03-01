import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Step3Props } from "../GenderReveal.types";

const Step3Attendance: React.FC<Step3Props> = ({ goToNextStep, goToPreviousStep }) => {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bodyContainer">
            <div className="mb-4">STEP 3</div>

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

export default Step3Attendance;
