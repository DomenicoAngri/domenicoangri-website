import React from "react";
import { motion } from "framer-motion";
import Button from "../../../components/Button/Button";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Step2WelcomePageProps } from "../GenderReveal.types";

const Step2WelcomePage: React.FC<Step2WelcomePageProps> = ({ invitationData, goToNextStep, goToPreviousStep }) => {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bodyContainer">
            <h2 className="defaultMarginBottom">Ciao {invitationData?.invitationName || ""}!</h2>
            <div className="defaultMarginBottom">Domenico & Laura sono felici di invitarti al loro gender reveal!</div>
            <div className="mb-5">
                Per organizzare al meglio l'evento, ti chiediamo di farci sapere se potrai partecipare e se avrai ospiti con te.
            </div>

            <div className="flex space-x-4">
                <Button label="Indietro" color="bg-pink-300" disabled={false} iconSx={faArrowLeft} onClick={goToPreviousStep} />
                <Button label="Avanti" color="bg-blue-400" disabled={false} iconDx={faArrowRight} onClick={goToNextStep} />
            </div>
        </motion.div>
    );
};

export default Step2WelcomePage;
