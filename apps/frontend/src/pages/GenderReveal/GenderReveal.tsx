import { useState } from "react";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import storkBaby from "../../assets/svg/storkBaby.json";
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
                >
                    SARÀ LUI O SARÀ LEI?!
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

                    <input
                        id="inviteCode"
                        type="text"
                        // value={code}
                        // onChange={(e) => setCode(e.target.value)}
                        className="w-64 p-2 border-2 border-gray-300 text-gray-500 placeholder-gray-300 rounded-lg text-center text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={placeholder}
                        onFocus={() => setPlaceholder("")}
                        onBlur={(e) => setPlaceholder(e.target.value ? "" : "Inserisci il codice invito")}
                    />
                </motion.div>
            </div>
        </div>
    );
};

export default GenderReveal;
