// Invitation interface.
export interface InvitationDataProps {
    inviteCode: string;
    invitationName: string;
    gender?: "M" | "F";
    attendance?: boolean;
    numberOfPeople: number;
}

// Step 1 entry invite code props.
export interface Step1InviteCodeEntryProps {
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
export interface Step2WelcomePageProps {
    invitationData: InvitationDataProps | null;
    goToNextStep: () => void;
    goToPreviousStep: () => void;
}

// Step 3 attendance confirmation props.
export interface Step3AttendanceConfirmationProps {
    updateInvitationData: InvitationDataProps | null;
    setUpdateInvitationData: (invitationData: InvitationDataProps) => void;
    goToNextStep: () => void;
    goToPreviousStep: () => void;
}

// Step 4 survey props.
export interface Step4SurveyProps {
    updateInvitationData: InvitationDataProps | null;
    goToNextStep: (finalInvitationData: InvitationDataProps) => Promise<void>;
    goToPreviousStep: () => void;
}

// Step 5 final details props.
export interface Step5FinalDetailsProps {
    updateInvitationData: InvitationDataProps | null;
}

export interface SurveyResultsProps {
    boyPercentage: number;
    girlPercentage: number;
    totalVotes: number;
}

export interface PieDataEntry {
    name: string;
    value: number;
    color: string;
}

export interface CustomizedLabelProps {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
    index: number;
}
