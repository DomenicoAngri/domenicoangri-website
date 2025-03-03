import React, { useState } from "react";
import { motion } from "framer-motion";
import Button from "../../../components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faArrowLeft, faArrowRight, faMars, faVenus } from "@fortawesome/free-solid-svg-icons";
import { Step4SurveyProps, InvitationDataProps } from "../GenderReveal.types";

const Step4Survey: React.FC<Step4SurveyProps> = ({ updateInvitationData, goToPreviousStep, goToNextStep }) => {
    const [selectedGender, setSelectedGender] = useState<string | null>(null);
    const [error, setError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    // Configuration for shake animation in case of error
    const shakeAnimation = {
        x: [0, -5, 5, -5, 5, -3, 3, 0],
        transition: { duration: 0.3 },
    };

    const handleGenderSelection = (gender: string): void => {
        setSelectedGender(gender);
        setError(false);
    };

    const handleNextStep = (): void => {
        if (!selectedGender) {
            setError(true);
            setErrorMessage("Effettua una scelta!");
            return;
        }

        const newInvitationData: InvitationDataProps = {
            inviteCode: updateInvitationData?.inviteCode || "",
            invitationName: updateInvitationData?.invitationName || "",
            attendance: updateInvitationData?.attendance && true,
            numberOfPeople: updateInvitationData?.numberOfPeople ?? 1,
            gender: selectedGender as "M" | "F",
        };

        // Navigate to next step and pass data
        goToNextStep(newInvitationData);
    };

    return (
        <motion.div
            className="bodyContainer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
                duration: 0.3,
                ease: "easeOut",
            }}
        >
            <div className="flex flex-col items-center justify-center w-full max-w-md">
                <div className="w-full mb-6">
                    <div className="mb-4">
                        {updateInvitationData?.attendance ? (
                            <div>Bene, grazie per la conferma!</div>
                        ) : (
                            <div>Ci dispiace tanto che tu non riesca a partecipare 😢</div>
                        )}
                        <span>Un'ultima curiosità... Secondo te, sarà un maschietto o una femminuccia?!</span>
                    </div>

                    <motion.div animate={error ? shakeAnimation : {}} className="flex items-center justify-center w-full gap-4">
                        <button
                            onClick={() => handleGenderSelection("M")}
                            className={`h-24 flex-1 flex items-center justify-center ${
                                selectedGender === "M" ? "bg-blue-500" : "bg-blue-400 hover:bg-blue-500"
                            } text-white rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300`}
                            aria-label="Boy"
                        >
                            <FontAwesomeIcon icon={faMars} className="mr-2" />
                            Boy
                            {selectedGender === "M" && <FontAwesomeIcon icon={faCheck} className="ml-2" />}
                        </button>

                        <button
                            onClick={() => handleGenderSelection("F")}
                            className={`h-24 flex-1 flex items-center justify-center ${
                                selectedGender === "F" ? "bg-pink-500" : "bg-pink-300 hover:bg-pink-400"
                            } text-white rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-pink-300`}
                            aria-label="Girl"
                        >
                            <FontAwesomeIcon icon={faVenus} className="mr-2" />
                            Girl
                            {selectedGender === "F" && <FontAwesomeIcon icon={faCheck} className="ml-2" />}
                        </button>
                    </motion.div>

                    {error && (
                        <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-pink-300 text-sm mt-1 text-center">
                            {errorMessage}
                        </motion.div>
                    )}
                </div>

                <div className="flex space-x-4 mt-4">
                    <Button label="Indietro" color="bg-pink-300" disabled={false} iconSx={faArrowLeft} onClick={goToPreviousStep} />
                    <Button label="Avanti" color="bg-blue-400" disabled={false} iconDx={faArrowRight} onClick={handleNextStep} />
                </div>
            </div>
        </motion.div>
    );
};

export default Step4Survey;
