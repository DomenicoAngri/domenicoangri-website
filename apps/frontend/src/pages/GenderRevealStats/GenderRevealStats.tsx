// InviteStatsComponent.tsx
import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import env from "../../config/environmentVariables";
import FatalError from "../../components/FatalError/FatalError";
import { Guests, GuestsStats } from "./GenderRevealStats.types";
import Loader from "../../components/Loader/Loader";

const GenderRevealStats: React.FC = () => {
    const [stats, setStats] = useState<GuestsStats>({
        present: 0,
        absent: 0,
        noResponse: 0,
        totalPeople: 0,
        presentGuestList: [],
        absentGuestList: [],
        noResponseGuestList: [],
        maleVotes: 0,
        femaleVotes: 0,
        totalVotes: 0,
    });

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getGuests = async (): Promise<void> => {
            try {
                setIsLoading(true);
                const response = await axios.get(`${env.apiUrl}/invitations?pagination[limit]=100`, {
                    headers: {
                        "Cache-Control": "no-cache, no-store, must-revalidate",
                        Pragma: "no-cache",
                        Expires: "0",
                    },
                });

                calculateStats(response.data.data);
            } catch (error) {
                const axiosError = error as AxiosError;

                if (axiosError.response) {
                    // Il server ha risposto con un codice di stato diverso da 2xx
                    console.error("Server error:", axiosError.response.status, axiosError.response.data);
                    throw new Error(`Errore del server: ${axiosError.response.status}`);
                } else if (axiosError.request) {
                    // La richiesta è stata fatta ma non c'è stata risposta
                    console.error("Network error:", axiosError.request);
                    throw new Error("Errore di rete: nessuna risposta dal server");
                } else {
                    // Errore nella configurazione della richiesta
                    console.error("Request error:", axiosError.message);
                    throw new Error(`Errore nella richiesta: ${axiosError.message}`);
                }
            } finally {
                setIsLoading(false);
            }
        };

        getGuests();
    }, []);

    const calculateStats = (invites: Guests[]): void => {
        // Inizializza i contatori
        let present: number = 0;
        let absent: number = 0;
        let noResponse: number = 0;
        let totalPeople: number = 0;
        let presentGuests: Guests[] = [];
        let absentGuests: Guests[] = [];
        let noResponseGuests: Guests[] = [];
        let maleVotes: number = 0;
        let femaleVotes: number = 0;
        let totalVotes: number = 0;
        // let genderStats = { male: 0, female: 0, other: 0, unknown: 0 };

        // Calcola le statistiche
        invites.forEach((guest) => {
            const attendees = guest.numberOfPeople || 0;

            if (guest.attendance === true) {
                present += attendees;
                totalPeople += attendees;
                presentGuests.push(guest);
            } else if (guest.attendance === false) {
                absent++;
                absentGuests.push(guest);
            } else {
                // attendance è null o undefined
                noResponse++;
                noResponseGuests.push(guest);
            }

            // Statistiche di genere
            if (guest.gender) {
                const gender = guest.gender.toLowerCase();

                if (gender === "m") {
                    maleVotes++;
                    totalVotes++;
                } else {
                    femaleVotes++;
                    totalVotes++;
                }
            }
        });

        setStats({
            present,
            absent,
            noResponse,
            totalPeople,
            presentGuestList: presentGuests,
            absentGuestList: absentGuests,
            noResponseGuestList: noResponseGuests,
            maleVotes: maleVotes,
            femaleVotes: femaleVotes,
            totalVotes: totalVotes,
        });
    };

    const renderTable = (title: string, guests: Guests[]) => (
        <div className="overflow-x-auto rounded-lg shadow-sm mb-6">
            <h2 className="text-xl font-semibold mb-3">{title}</h2>
            <table className="w-full text-sm">
                <thead>
                    <tr>
                        <th className="py-3 px-4 text-left font-extrabold">Codice Invito</th>
                        <th className="py-3 px-4 text-left font-extrabold">Nome e Cognome</th>
                        <th className="py-3 px-4 text-right font-extrabold">Numero Persone</th>
                    </tr>
                </thead>
                <tbody>
                    {guests.length > 0 ? (
                        guests.map((guest) => (
                            <tr key={guest.id} className="border-t-1 border-white">
                                <td className="py-3 px-4">{guest.inviteCode}</td>
                                <td className="py-3 px-4">{`${guest.nameAndSurname || ""}`}</td>
                                <td className="py-3 px-4 text-right">{guest.numberOfPeople || 0}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3} className="py-3 px-4 text-center">
                                Nessun invitato in questa categoria
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );

    if (isLoading) return <Loader />;
    if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

    return (
        <div className="max-w-full p-4 md:p-6">
            <h1 className="text-center mb-6">Statistiche Invitati</h1>

            <div className="flex justify-center mb-6">
                <div className="rounded-lg shadow-2xl p-4 text-center w-full max-w-xs">
                    <p className="text-3xl font-extrabold">{stats.totalPeople}</p>
                    <p className="text-sm font-extrabold">Totale Persone presenti</p>
                </div>
            </div>

            <div className="overflow-x-auto rounded-lg shadow-sm mb-6">
                <table className="w-full text-sm">
                    <thead>
                        <tr>
                            <th className="py-3 px-4 text-left font-extrabold">Stato</th>
                            <th className="py-3 px-4 text-right font-extrabold">Numero</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-t-1 border-white">
                            <td className="py-3 px-4">Presenti</td>
                            <td className="py-3 px-4 text-right">{stats.present}</td>
                        </tr>
                        <tr className="border-t-1 border-white">
                            <td className="py-3 px-4">Assenti</td>
                            <td className="py-3 px-4 text-right">{stats.absent}</td>
                        </tr>
                        <tr className="border-t-1 border-white">
                            <td className="py-3 px-4">Non Risposto</td>
                            <td className="py-3 px-4 text-right">{stats.noResponse}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h2 className="text-xl font-semibold mb-3">Statistiche genere</h2>
            <div className="overflow-x-auto rounded-lg shadow-sm mb-6">
                <table className="w-full text-sm">
                    <tbody>
                        <tr className="border-t-1 border-white">
                            <td className="py-3 px-4 font-extrabold">Maschio</td>
                            <td className="py-3 px-4 text-right">{stats.totalVotes ? Math.round((stats.maleVotes / stats.totalVotes) * 100) : 0}%</td>
                        </tr>
                        <tr className="border-t-1 border-white">
                            <td className="py-3 px-4 font-extrabold">Femmina</td>
                            <td className="py-3 px-4 text-right">
                                {stats.totalPeople ? Math.round((stats.femaleVotes / stats.totalVotes) * 100) : 0}%
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="grid grid-cols-1 gap-6 mb-6">
                {renderTable("Invitati Presenti", stats.presentGuestList)}
                {renderTable("Invitati Assenti", stats.absentGuestList)}
                {renderTable("Invitati Senza Risposta", stats.noResponseGuestList)}
            </div>
        </div>
    );
};

export default GenderRevealStats;
