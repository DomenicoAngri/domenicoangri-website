import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { Step1Props } from "../GenderReveal.types";

const Step1InviteCodeEntry: React.FC<Step1Props> = ({
    code,
    setCode,
    placeholder,
    setPlaceholder,
    error,
    errorMessage,
    verifyInviteCode,
    isInitialLoad,
}) => {
    // Configuration for faster and tighter shake animation.
    const shakeAnimation = {
        x: [0, -5, 5, -5, 5, -3, 3, 0],
        transition: { duration: 0.3 },
    };

    return (
        <>
            <motion.div
                className="bodyContainer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                    delay: isInitialLoad ? 3.5 : 0,
                    duration: isInitialLoad ? 1 : 0.3,
                    ease: "easeOut",
                }}
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
                                value={code}
                                onFocus={() => setPlaceholder("")}
                                onBlur={(e) => {
                                    setPlaceholder(e.target.value ? "" : "Codice invito...");
                                }}
                                onChange={(e) => {
                                    setCode(e.target.value);
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
        </>
    );
};

export default Step1InviteCodeEntry;
