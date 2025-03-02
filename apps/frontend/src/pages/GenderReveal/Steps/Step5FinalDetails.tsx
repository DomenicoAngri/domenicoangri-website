import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import axios from "axios";
import env from "../../../config/environmentVariables";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

const Step5FinalDetails = ({ invitationData }) => {
    const [surveyResults, setSurveyResults] = useState(null);
    const [loading, setLoading] = useState(true);
    const { width, height } = useWindowSize();
    const [showConfetti, setShowConfetti] = useState(true);

    useEffect(() => {
        const fetchSurveyResults = async () => {
            try {
                const response = await axios.get(`${env.apiUrl}/invitations/surveyResults`);
                setSurveyResults(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Errore nel caricamento dei risultati:", error);
                setLoading(false);
            }
        };

        fetchSurveyResults();

        // Disattiva i coriandoli dopo 5 secondi
        const timer = setTimeout(() => {
            setShowConfetti(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    // Formatta la data dell'evento
    const formatEventDate = (dateString) => {
        if (!dateString) return "Data da confermare";
        const date = new Date(dateString);
        return format(date, "EEEE d MMMM yyyy 'alle ore' HH:mm", { locale: it });
    };

    // Dati per il grafico a torta
    const preparePieData = () => {
        if (!surveyResults) return [];

        return [
            { name: "Maschio", value: surveyResults.boyPercentage, color: "#60A5FA" }, // text-blue-400
            { name: "Femmina", value: surveyResults.girlPercentage, color: "#F9A8D4" }, // text-pink-300
        ];
    };

    const pieData = preparePieData();

    return (
        <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto">
            {showConfetti && <Confetti width={width} height={height} recycle={false} />}

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-6"
            >
                <h2 className="text-2xl font-bold mb-2">Grazie per aver confermato!</h2>
                <p className="text-lg">Non vediamo l'ora di condividere questo momento speciale con te!</p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="bg-white p-6 rounded-lg shadow-md w-full mb-6"
            >
                <h3 className="text-xl font-semibold mb-3">Dettagli dell'evento</h3>
                <div className="mb-2">
                    <span className="font-medium">Quando:</span> {formatEventDate(invitationData?.eventDate)}
                </div>
                <div className="mb-2">
                    <span className="font-medium">Dove:</span> {invitationData?.location || "Luogo da confermare"}
                </div>
                {invitationData?.additionalInfo && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-md">
                        <span className="font-medium">Note:</span> {invitationData.additionalInfo}
                    </div>
                )}
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="bg-white p-6 rounded-lg shadow-md w-full"
            >
                <h3 className="text-xl font-semibold mb-4">Cosa pensano gli invitati?</h3>
                
                {loading ? (
                    <div className="flex justify-center items-center h-40">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-400"></div>
                    </div>
                ) : (
                    <>
                        <div className="mb-3 text-sm">
                            Finora, ecco come hanno votato i nostri amici e parenti:
                        </div>
                        
                        <div className="h-52">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value) => `${value}%`} />
                                    <Legend verticalAlign="bottom" height={36} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        
                        <div className="mt-4 text-center text-sm">
                            Totale voti: {surveyResults?.totalVotes || 0}
                        </div>
                    </>
                )}
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="mt-6 text-sm text-gray-500"
            >
                <p>
                    {invitationData?.eventType === "genderReveal" 
                        ? "Il grande momento della rivelazione si avvicina!" 
                        : "Non vediamo l'ora di festeggiare insieme!"}
                </p>
                <p className="mt-2">❤️ Grazie di cuore per esserci ❤️</p>
            </motion.div>
        </div>
    );
};

export default Step5FinalDetails;