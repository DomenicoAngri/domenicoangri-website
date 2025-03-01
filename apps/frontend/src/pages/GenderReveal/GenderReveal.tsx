import { useState } from "react";
import env from "../../config/environmentVariables";
import axios, { AxiosError, AxiosResponse } from "axios";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import storkBaby from "../../assets/svg/storkBaby.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import "./GenderReveal.css";

const GenderReveal = () => {
    const [code, setCode] = useState("");
    const [placeholder, setPlaceholder] = useState("Codice invito...");
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // Configurazione dell'animazione di tremolio più veloce e stretto
    const shakeAnimation = {
        x: [0, -5, 5, -5, 5, -3, 3, 0],
        transition: { duration: 0.3 },
    };

    const verifyInviteCode = async () => {
        // Reset dello stato di errore
        setError(false);
        setErrorMessage("");

        try {
            const response = await axios.get(`${env.apiUrl}/invitations/verifyInviteCode/${code}`);
            console.log(response.data);
        } catch (error) {
            console.error(error);
            setError(true);

            // Imposta il messaggio di errore appropriato
            if (error.response) {
                // La richiesta è stata effettuata e il server ha risposto con un codice di stato
                // che non rientra nell'intervallo 2xx
                if (error.response.status === 404) {
                    setErrorMessage("Codice non valido");
                } else {
                    setErrorMessage("Errore di verifica");
                }
            } else if (error.request) {
                // La richiesta è stata effettuata ma non è stata ricevuta alcuna risposta
                setErrorMessage("Nessuna risposta dal server");
            } else {
                // Si è verificato un errore durante l'impostazione della richiesta
                setErrorMessage("Errore di connessione");
            }
        } finally {
        }
    };

    return (
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

                <motion.div
                    className="bodyContainer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 3.5, duration: 1, ease: "easeOut" }}
                >
                    <label htmlFor="inviteCode" className="mb-2">
                        Inserisci il codice del tuo invito:
                    </label>

                    <div className="w-72">
                        <div className="relative w-full">
                            <motion.div animate={error ? shakeAnimation : {}} className="w-full relative">
                                <input
                                    id="inviteCode"
                                    type="text"
                                    className={`w-full p-2 pr-10 border-2 ${error ? "border-pink-300" : "border-gray-300"} text-gray-500 placeholder-gray-300 rounded-lg text-center text-lg focus:outline-none focus:ring-2 focus:ring-grey-800`}
                                    placeholder={placeholder}
                                    onFocus={() => setPlaceholder("")}
                                    onBlur={(e) => {
                                        setPlaceholder(e.target.value ? "" : "Codice invito...");
                                    }}
                                    onChange={(e) => {
                                        setCode(e.target.value);
                                        if (error) {
                                            setError(false);
                                            setErrorMessage("");
                                        }
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            verifyInviteCode();
                                        }
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => verifyInviteCode()}
                                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 flex items-center justify-center bg-blue-400 rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300 mr-1 z-10"
                                    aria-label="Invia codice"
                                >
                                    <FontAwesomeIcon icon={faPaperPlane} />
                                </button>
                            </motion.div>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-pink-300 text-sm mt-1 text-left pl-1"
                            >
                                {errorMessage}
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default GenderReveal;
