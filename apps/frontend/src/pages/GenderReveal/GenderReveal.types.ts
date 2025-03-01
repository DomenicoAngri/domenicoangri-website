// Invitation interface.
export interface InvitationData {
    inviteCode: string;
    invitationName: string;
    gender: "M" | "F";
    eventDate: string;
    attendance: boolean;
    numberOfPeople: number;
}

// Step 1 entry invite code props.
export interface Step1Props {
    code: string;
    setCode: (code: string) => void;
    placeholder: string;
    setPlaceholder: (placeholder: string) => void;
    error: boolean;
    errorMessage: string;
    verifyInviteCode: () => Promise<void>;
    isInitialLoad: boolean;
}

// Step 2 welcome page props.
export interface Step2Props {
    invitationData: InvitationData | null;
    goToNextStep: () => void;
    goToPreviousStep: () => void;
}

// Props per Step3Survey
export interface Step3Props {
    goToNextStep: () => void;
    goToPreviousStep: () => void;
}

// // Props per Step4Reveal
// export interface Step4Props {
//     invitationData: InvitationData | null;
//     userGuess: "M" | "F" | null;
// }
