import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import axios from "axios";
import env from "../../../config/environmentVariables";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

import { Step5FinalDetailsProps } from "../GenderReveal.types";

// TODO: devo inserire la schermata fianle se la persona non viene devo modificare le scritte.
// TODO: sondaggio da DB
// TODO: Modificare la grafica

interface SurveyResultsProps {
    boyPercentage: number;
    girlPercentage: number;
    totalVotes: number;
}

const Step5FinalDetails: React.FC<Step5FinalDetailsProps> = ({ updateInvitationData }) => {
    const [surveyResults, setSurveyResults] = useState<SurveyResultsProps>();
    const [loading, setLoading] = useState(true);
    const { width, height } = useWindowSize();
    const [showConfetti, setShowConfetti] = useState(true);

    useEffect(() => {
        // const fetchSurveyResults = async () => {
        //     try {
        //         // const response = await axios.get(`${env.apiUrl}/invitations/surveyResults`);
        //         // setSurveyResults(response.data);
        //         setSurveyResults({
        //             boyPercentage: 60,
        //             girlPercentage: 40,
        //             totalVotes: 100,
        //         });
        //         setLoading(false);
        //     } catch (error) {
        //         console.error("Errore nel caricamento dei risultati:", error);
        //         setLoading(false);
        //     }
        // };

        // fetchSurveyResults();

        setLoading(false);
        handleSurveyResult();

        // Disattiva i coriandoli dopo 5 secondi
        const timer = setTimeout(() => {
            setShowConfetti(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    const handleSurveyResult = () => {
        setSurveyResults({
            boyPercentage: 70,
            girlPercentage: 30,
            totalVotes: 100,
        });
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

    // Funzione per renderizzare solo la percentuale all'interno del grafico
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180);
        const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180);

        return (
            <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontWeight="bold">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto">
            {showConfetti && <Confetti width={width} height={height} recycle={false} />}

            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="mb-6">
                <h2>Tutto fatto! 🥳</h2>
                <div>Non vediamo l'ora di condividere questo momento speciale con {updateInvitationData?.numberOfPeople === 1 ? "te!" : "voi!"}</div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="bg-white p-6 rounded-lg shadow-md w-full mb-6"
            >
                <h3 className="text-xl font-semibold mb-3">Dettagli dell'evento</h3>
                <div className="mb-2">
                    <span className="font-medium">Quando:</span> Sabato prossimo
                </div>
                <div className="mb-2">
                    <span className="font-medium">Dove:</span> Al laghetto
                </div>

                <div className="mt-4 p-3 bg-gray-50 rounded-md">
                    <span className="font-medium">Note:</span> Note addizionali
                </div>
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
                        <div className="mb-3 text-sm">Finora, ecco come hanno votato i nostri amici e parenti:</div>

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
                                        label={renderCustomizedLabel}
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

                        <div className="mt-4 text-center text-sm">Totale voti: {surveyResults?.totalVotes || 0}</div>
                    </>
                )}
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="mt-6 text-sm text-gray-500"
            >
                <p className="mt-2">❤️ Grazie di cuore per esserci ❤️</p>
            </motion.div>
        </div>
    );
};

export default Step5FinalDetails;
