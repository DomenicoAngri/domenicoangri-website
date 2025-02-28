import { useState } from "react";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import storkBaby from "../../assets/svg/storkBaby.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faBaby } from "@fortawesome/free-solid-svg-icons";
import "./GenderReveal.css";

const GenderReveal = () => {
    const [code, setCode] = useState("");
    const [placeholder, setPlaceholder] = useState("Codice invito...");

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

                    {/* <div className="flex items-center justify-center w-full">
                        <div className="relative flex items-center max-w-xs w-full">
                            <input
                                id="inviteCode"
                                type="text"
                                // value={code}
                                // onChange={(e) => setCode(e.target.value)}
                                // className="w-64 p-2 border-2 border-gray-300 text-gray-500 placeholder-gray-300 rounded-lg text-center text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                className="w-full p-3 pr-12 border-2 border-gray-300 text-gray-500 placeholder-gray-300 rounded-full text-center text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder={placeholder}
                                onFocus={() => setPlaceholder("")}
                                onBlur={(e) => setPlaceholder(e.target.value ? "" : "Codice invito...")}
                            />

                            <button
                                type="button"
                                onClick={() => {
                                    /* Qui inserisci la chiamata al BE */
                    /*   }}
                                className="absolute right-1 h-10 w-10 flex items-center justify-center  hover:bg-pink-300 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                aria-label="Invia codice"
                            >
                                <FontAwesomeIcon icon={faCircleCheck} />
                            </button>
                        </div>
                    </div> */}

                    <div className="relative w-72">
                        <input
                            id="inviteCode"
                            type="text"
                            // value={code}
                            // onChange={(e) => setCode(e.target.value)}
                            className="w-full p-2 pr-10 border-2 border-gray-300 text-gray-500 placeholder-gray-300 rounded-lg text-center text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder={placeholder}
                            onFocus={() => setPlaceholder("")}
                            onBlur={(e) => setPlaceholder(e.target.value ? "" : "Codice invito...")}
                        />
                        <button
                            type="button"
                            onClick={() => {
                                /* Qui inserisci la chiamata al BE */
                            }}
                            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 flex items-center justify-center bg-blue-400 rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300 mr-1"
                            aria-label="Invia codice"
                        >
                            <FontAwesomeIcon icon={faBaby} />
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default GenderReveal;
