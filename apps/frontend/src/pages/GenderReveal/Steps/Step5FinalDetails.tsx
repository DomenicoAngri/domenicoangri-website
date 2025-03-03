import React, { useEffect, useState, JSX } from "react";
import axios from "axios";
import env from "../../../config/environmentVariables";
import { SurveyResultsProps } from "../GenderReveal.types";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

import { Step5FinalDetailsProps, PieDataEntry, CustomizedLabelProps, InvitationDataProps } from "../GenderReveal.types";

const Step5FinalDetails: React.FC<Step5FinalDetailsProps> = ({ updateInvitationData }) => {
    const [surveyResults, setSurveyResults] = useState<SurveyResultsProps | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);
    const { width, height } = useWindowSize();
    const [showConfetti, setShowConfetti] = useState<boolean>(true);

    useEffect(() => {
        setLoading(false);
        handleSurveyResult();

        // Deactivate confetti animation after 5 seconds.
        const timer = setTimeout(() => {
            setShowConfetti(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    const handleSurveyResult = async (): Promise<void> => {
        try {
            const response = await axios.get(`${env.apiUrl}/invitations/`);
            const guestList: InvitationDataProps[] = response.data.data;

            const maleVotes = countGender(guestList, "M");
            const femaleVotes = countGender(guestList, "F");
            const totalVotes = guestList.filter((guest) => guest.gender !== null && guest.gender !== undefined).length;

            setSurveyResults({
                boyPercentage: Math.ceil((maleVotes / totalVotes) * 100),
                girlPercentage: Math.floor((femaleVotes / totalVotes) * 100),
                totalVotes: totalVotes,
            });
        } catch (error) {
            console.error(error);
        }
    };

    const countGender = (guestList: InvitationDataProps[], gender: string): number => {
        return guestList.filter((guest) => guest.gender === gender).length;
    };

    // Pie chart data.
    const preparePieData = (): PieDataEntry[] => {
        if (!surveyResults) return [];

        return [
            { name: "Maschio", value: surveyResults.boyPercentage, color: "#60A5FA" },
            { name: "Femmina", value: surveyResults.girlPercentage, color: "#F9A8D4" },
        ];
    };

    const pieData: PieDataEntry[] = preparePieData();

    // Percentage into pie chart.
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: CustomizedLabelProps): JSX.Element => {
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
            {updateInvitationData?.attendance === true ? <>{showConfetti && <Confetti width={width} height={height} recycle={false} />}</> : null}

            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="mb-5">
                {updateInvitationData?.attendance === false ? (
                    <div>
                        <h2 className="defaultMarginBottom">Ci dispiace che tu non possa essere dei nostri 😔</h2>
                        <div>Se dovessi cambiare idea, puoi utilizzare lo stesso codice di invito per aggiornare la presenza!</div>
                    </div>
                ) : (
                    <div>
                        <h1 className="defaultMarginBottom">Tutto fatto! 🥳</h1>
                        <div>
                            {`Non vediamo l'ora di condividere questo momento speciale con ${updateInvitationData?.numberOfPeople === 1 ? "te!" : "voi!"} 🥰`}
                        </div>
                    </div>
                )}
            </motion.div>

            {updateInvitationData?.attendance === true ? (
                <>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="rounded-2xl shadow-2xl w-full mb-4 p-2"
                    >
                        <h2 className="mb-4">Dettagli dell'evento</h2>
                        <div>
                            <strong>Quando: </strong>
                            <span className="italic">Sabato 8 marzo.</span>
                        </div>
                        <div>
                            <strong>A che ora: </strong>
                            <span className="italic">dalle 13:00.</span>
                        </div>
                        <div className="mb-4">
                            <strong>Dove: </strong>
                            <span className="italic">al "Laghetto", Via Boscherona, 20900, (Monza).</span>
                        </div>
                        <div className="flex flex-col justify-center items-center defaultMarginBottom">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5584.381207453389!2d9.241270676849929!3d45.586712971076125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4786b9408a6efa8d%3A0xd0bb19a3a733d42b!2sIl%20Laghetto!5e0!3m2!1sen!2sit!4v1740928671242!5m2!1sen!2sit"
                                width="300"
                                height="300"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="rounded-2xl shadow-2xl w-full mb-4 p-2"
                    >
                        <div>
                            <h2 className="defaultMarginBottom">Note 📝</h2>
                            <div className="defaultMarginBottom">
                                Ti aspettiamo per condividere un momento speciale, gustando qualcosa insieme prima di scoprire il sesso della piccola
                                creatura in arrivo!
                            </div>
                            <div className="defaultMarginBottom">
                                L'evento si terrà all'aperto, in un luogo adatto sia ai bambini che agli amici a quattro zampe 🐶, quindi sentiti
                                libero di portarli con te!
                            </div>
                            <div className="defaultMarginBottom">
                                Speriamo in una giornata calda ☀️ e piacevole, ma potrebbe fare freschino, quindi porta con te un giubbino, giusto per
                                sicurezza.
                            </div>
                            <div className="defaultMarginBottom">Per qualsiasi informazione, contattaci! 😁</div>
                        </div>
                    </motion.div>
                </>
            ) : null}

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="rounded-2xl shadow-2xl w-full mb-4 p-2"
            >
                <h2 className="defaultMarginBottom">Cosa pensano gli invitati?</h2>

                {loading ? (
                    <div className="flex justify-center items-center h-40">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-400"></div>
                    </div>
                ) : (
                    <>
                        <div className="defaultMarginBottom">Finora, ecco come hanno votato i nostri amici e parenti:</div>

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

                        <div className="text-center text-sm">Totale voti: {surveyResults?.totalVotes || 0}</div>
                    </>
                )}
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.5 }} className="defaultMarginBottom">
                <span>Grazie di cuore per esserci ❤️</span>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.5 }}>
                <span className="text-gray-400 text-sm">Made with ♥️ by DA.</span>
            </motion.div>
        </div>
    );
};

export default Step5FinalDetails;
