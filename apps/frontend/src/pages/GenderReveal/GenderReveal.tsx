import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import env from "../../config/environmentVariables";
import Lottie from "lottie-react";
import { motion, AnimatePresence } from "framer-motion";
import storkBaby from "../../assets/svg/storkBaby.json";

import Step1InviteCodeEntry from "./Steps/Step1InviteCodeEntry";
import Step2WelcomePage from "./Steps/Step2WelcomePage";
import Step3AttendanceConfirmation from "./Steps/Step3AttendanceConfirmation";
import Step4Survey from "./Steps/Step4Survey";
import Step5FinalDetails from "./Steps/Step5FinalDetails";

import { InvitationDataProps, InvitationSurveyProps } from "./GenderReveal.types";
import FatalError from "../../components/FatalError/FatalError";

import "./GenderReveal.css";

// TODO: Set all phrases const into consts file.
// TODO: if BE not working, think what to do.

const GenderReveal: React.FC = () => {
    const [code, setCode] = useState("");
    const [placeholder, setPlaceholder] = useState("Codice invito...");
    const [error, setError] = useState<boolean>(false);
    const [fatalError, setFatalError] = useState<AxiosError | null>(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [invitationData, setInvitationData] = useState<InvitationDataProps | null>(null);
    const [updateInvitationData, setUpdateInvitationData] = useState<InvitationDataProps | null>(null);
    const [invitationSurvey, setInvitationSurvey] = useState<InvitationSurveyProps | null>(null);
    const [updateInvitationSurvey, setUpdateInvitationSurvey] = useState<InvitationSurveyProps | null>(null);

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
            const responseInvitationData = await axios.get(`${env.apiUrl}/gender-reveal/invitations/verifyInviteCode/${lowerCaseCode}`);

            // Save the invitation data response from API.
            setInvitationData(responseInvitationData.data.invitation);

            // Save the invitation data response from API to update after confirmation.
            setUpdateInvitationData(responseInvitationData.data.invitation);

            // Retrive data invitation survey for gender.
            const responseInvitationSurvey = await axios.get(`${env.apiUrl}/invitation-survey`);

            // Save the invitation survey response from API.
            setInvitationSurvey(responseInvitationSurvey.data.data);

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

    const updateAttendance = async (finalInvitationData: InvitationDataProps): Promise<void> => {
        try {
            setUpdateInvitationData(finalInvitationData);

            let updateInvitationSurvey: InvitationSurveyProps | null = null;

            if (invitationSurvey) {
                updateInvitationSurvey = invitationSurvey;

                if (finalInvitationData.gender === "M") {
                    updateInvitationSurvey = {
                        // ...updateInvitationSurvey,
                        maleVotes: updateInvitationSurvey.maleVotes + 1,
                        femaleVotes: updateInvitationSurvey.femaleVotes - 1,
                        totalVotes: updateInvitationSurvey.totalVotes,
                    };
                } else {
                    updateInvitationSurvey = {
                        // ...updateInvitationSurvey,
                        maleVotes: updateInvitationSurvey.maleVotes - 1,
                        femaleVotes: updateInvitationSurvey.femaleVotes + 1,
                        totalVotes: updateInvitationSurvey.totalVotes,
                    };
                }
            }

            // Update invitation data.
            const lowerCaseCode = code.toLowerCase();
            await axios.put(`${env.apiUrl}/gender-reveal/invitations/updateAttendance/${lowerCaseCode}`, finalInvitationData);

            console.log("UPDATE SURVEY ---> ", updateInvitationSurvey);

            // Update survey data.
            await axios.put(`${env.apiUrl}/invitation-survey`, { data: updateInvitationSurvey });
            setUpdateInvitationSurvey(updateInvitationSurvey);

            goToNextStep();
        } catch (error) {
            console.error(error);
            setError(true);

            // Set the correct error message based on the error type.
            const axiosError = error as AxiosError;

            if (axiosError.response) {
                if (axiosError.response.status === 404) {
                    console.error("Codice non valido, riprova!");
                } else {
                    console.error("Si è verificato un errore durante la verifica del codice. Prova a ricaricare la pagina.");
                }
            } else if (axiosError.request) {
                console.error("Nessuna risposta dal server");
            } else {
                console.error("Errore di connessione");
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
            ) : currentStep === 5 ? (
                <div className="mainContainer">
                    <motion.div key="step5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 3 }}>
                        <Step5FinalDetails updateInvitationData={updateInvitationData} updateInvitationSurveyData={updateInvitationSurvey} />
                    </motion.div>
                </div>
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
                                    <Step3AttendanceConfirmation
                                        updateInvitationData={updateInvitationData}
                                        setUpdateInvitationData={setUpdateInvitationData}
                                        goToPreviousStep={goToPreviousStep}
                                        goToNextStep={goToNextStep}
                                    />
                                </motion.div>
                            )}

                            {currentStep === 4 && (
                                <motion.div
                                    key="step4"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{
                                        exit: { duration: 3 },
                                    }}
                                >
                                    <Step4Survey
                                        updateInvitationData={updateInvitationData}
                                        goToPreviousStep={goToPreviousStep}
                                        goToNextStep={updateAttendance}
                                    />
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
