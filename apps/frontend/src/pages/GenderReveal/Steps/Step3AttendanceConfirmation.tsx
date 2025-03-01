import React, { useState } from "react";
import { motion } from "framer-motion";
import Button from "../../../components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faMinus, faPlus, faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Step3AttendanceConfirmationProps } from "../GenderReveal.types";

const Step3AttendanceConfirmation: React.FC<Step3AttendanceConfirmationProps> = ({ invitationData, goToPreviousStep, goToNextStep }) => {
    const [guestCount, setGuestCount] = useState<number>(1);
    const [confirmed, setConfirmed] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    // Configuration for shake animation in case of error.
    const shakeAnimation = {
        x: [0, -5, 5, -5, 5, -3, 3, 0],
        transition: { duration: 0.3 },
    };

    const incrementGuestCount = (): void => {
        if (guestCount < 5) {
            setGuestCount((prev) => prev + 1);
            setError(false);
        } else {
            setError(true);
            setErrorMessage("Sono consentiti al massimo 5 ospiti!");
        }
    };

    const decrementGuestCount = (): void => {
        if (guestCount > 0) {
            setGuestCount((prev) => prev - 1);
            setError(false);
        }
    };

    const confirmAttendance = (): void => {
        // setConfirmed(true);
        // const data: ConfirmationData = {
        //     confirmed: true,
        //     guestCount: guestCount,
        // };
        // onSubmit(data);
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
                        <label htmlFor="guests">Numero di persone adulte (te compreso)</label>
                    </div>

                    <motion.div animate={error ? shakeAnimation : {}} className="flex items-center justify-center w-full">
                        <button
                            onClick={decrementGuestCount}
                            className="h-10 w-10 flex items-center justify-center bg-blue-400 hover:bg-blue-500 text-white rounded-l-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            aria-label="Decrease"
                        >
                            <FontAwesomeIcon icon={faMinus} />
                        </button>

                        <div
                            id="guests"
                            className="h-10 flex items-center justify-center px-4 border-t-2 border-b-2 border-gray-300 w-28 text-center text-lg"
                        >
                            {guestCount}
                        </div>

                        <button
                            onClick={incrementGuestCount}
                            className="h-10 w-10 flex items-center justify-center bg-blue-400 hover:bg-blue-500 text-white rounded-r-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            aria-label="Increase"
                        >
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    </motion.div>

                    {error && (
                        <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-pink-300 text-sm mt-1 text-center">
                            {errorMessage}
                        </motion.div>
                    )}
                </div>

                <div className="flex space-x-4">
                    <Button label="Indietro" color="bg-pink-300" disabled={false} iconSx={faArrowLeft} onClick={goToPreviousStep} />
                    <Button label="Avanti" color="bg-blue-400" disabled={false} iconDx={faArrowRight} onClick={goToNextStep} />
                </div>
            </div>
        </motion.div>
    );
};

export default Step3AttendanceConfirmation;
