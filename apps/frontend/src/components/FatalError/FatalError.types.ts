import { IconProp } from "@fortawesome/fontawesome-svg-core";

export interface FatalErrorProps {
    codeError?: string;
    title: string;
    description?: string;
    icon?: IconProp;
}
