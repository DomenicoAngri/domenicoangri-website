import React, { useState } from "react";
import env from "../../config/environmentVariables";
import axios, { AxiosError, AxiosResponse } from "axios";
import Lottie from "lottie-react";
import { motion, AnimatePresence } from "framer-motion";
import storkBaby from "../../assets/svg/storkBaby.json";
import "./GenderReveal.css";

import Step1InviteCodeEntry from "./Steps/Step1InviteCodeEntry";
import Step2WelcomePage from "./Steps/Step2WelcomePage";
import Step3Attendance from "./Steps/Step3Attendance";

import { InvitationData } from "./GenderReveal.types";
import FatalError from "../../components/FatalError/FatalError";

// TODO: fare il made with love.
// TODO: vedere dove mettere tutte le costanti del progetto.
// TODO: riorganizzare tutti gli import.
// TODO: per domani, fare step 3 per la conferma della presenza e fare step 4 per survey e fare step 5 per le informazioni finali.
// TODO: per domani fare i button come componenti da importare.

const GenderReveal: React.FC = () => {
    const [code, setCode] = useState("");
    const [placeholder, setPlaceholder] = useState("Codice invito...");
    const [error, setError] = useState<boolean>(false);
    const [fatalError, setFatalError] = useState<AxiosError | null>(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [invitationData, setInvitationData] = useState<InvitationData | null>(null);

    // Useful for the first animation render.
    const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);

    const verifyInviteCode = async (): Promise<void> => {
        // Reset error state.
        setError(false);
        setErrorMessage("");

        if (!code.trim()) {
            setError(true);
            setErrorMessage("Inserisci un codice valido");
            return;
        }

        try {
            // To lower case before sending the request.
            const lowerCaseCode = code.toLowerCase();
            const response = await axios.get(`${env.apiUrl}/invitations/verifyInviteCode/${lowerCaseCode}`);

            console.log("RESPONSE DATA --> ", response.data.invitation);

            // Save the invitation data response from API.
            setInvitationData(response.data.invitation);

            // Go to the next step.
            goToNextStep();
        } catch (error) {
            console.error(error);
            setError(true);

            // Set the correct error message based on the error type.
            const axiosError = error as AxiosError;

            if (axiosError.response) {
                if (axiosError.response.status === 404) {
                    setErrorMessage("Codice non valido, riprova!");
                } else {
                    console.error("Si è verificato un errore durante la verifica del codice. Prova a ricaricare la pagina.");
                    setFatalError(axiosError);
                }
            } else if (axiosError.request) {
                console.error("Nessuna risposta dal server");
                setFatalError(axiosError);
            } else {
                console.error("Errore di connessione");
                setFatalError(axiosError);
            }
        }
    };

    const goToNextStep = (): void => {
        setCurrentStep((prev) => prev + 1);
    };

    const goToPreviousStep = (): void => {
        // If we back to the first step, mean it's not the first render.
        if (currentStep === 2) {
            setIsInitialLoad(false);
        }

        setCurrentStep((prev) => prev - 1);
    };

    return (
        <>
            {fatalError ? (
                <FatalError codeError={fatalError.status?.toString()} title={fatalError.code} description={fatalError.message} />
            ) : (
                <div className="mainContainer">
                    <motion.div
                        initial={{ x: "-20vw", y: "-20vh" }}
                        animate={{
                            x: "calc(50vw - 150px)",
                            y: "calc(15vh - 100px)",
                        }}
                        transition={{ type: "tween", duration: 2, ease: "easeOut" }}
                        style={{
                            width: 400,
                            height: 400,
                        }}
                    >
                        <Lottie animationData={storkBaby} loop={true} autoplay={true} />
                    </motion.div>

                    <div className="bodyContainer">
                        <motion.h1
                            initial={{ opacity: 0, y: 50 }}
                            animate={{
                                opacity: 1,
                                y: [50, -10],
                            }}
                            transition={{
                                delay: 2.5,
                                type: "spring",
                                stiffness: 500,
                                damping: 20,
                                duration: 3,
                            }}
                            className="mb-2"
                        >
                            SARÀ <span className="text-blue-400">LUI</span> O SARÀ <span className="text-pink-300">LEI</span>?!
                        </motion.h1>

                        <AnimatePresence mode="wait">
                            {currentStep === 1 && (
                                <motion.div key="step1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                    <Step1InviteCodeEntry
                                        code={code}
                                        setCode={setCode}
                                        placeholder={placeholder}
                                        setPlaceholder={setPlaceholder}
                                        error={error}
                                        errorMessage={errorMessage}
                                        verifyInviteCode={verifyInviteCode}
                                        isInitialLoad={isInitialLoad}
                                    />
                                </motion.div>
                            )}

                            {currentStep === 2 && (
                                <motion.div key="step2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                    <Step2WelcomePage
                                        invitationData={invitationData}
                                        goToNextStep={goToNextStep}
                                        goToPreviousStep={goToPreviousStep}
                                    />
                                </motion.div>
                            )}

                            {currentStep === 3 && (
                                <motion.div key="step3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                    <Step3Attendance goToNextStep={goToNextStep} goToPreviousStep={goToPreviousStep} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            )}
        </>
    );
};

export default GenderReveal;
