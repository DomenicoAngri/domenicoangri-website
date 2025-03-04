export interface Guests {
    id: number;
    inviteCode: string;
    inviteName: string;
    nameAndSurname: string;
    attendance?: boolean | null | undefined;
    numberOfPeople?: number;
    gender?: "M" | "F";
}

export interface GuestsStats {
    present: number;
    absent: number;
    noResponse: number;
    totalPeople: number;
    presentGuestList: Guests[];
    absentGuestList: Guests[];
    noResponseGuestList: Guests[];
    maleVotes: number;
    femaleVotes: number;
    totalVotes: number;
}
