import { Icon, IconProp } from "@fortawesome/fontawesome-svg-core";

export interface ButtonProps {
    label: string;
    onClick?: () => void;
    disabled?: boolean;
    iconDx?: IconProp;
    iconSx?: IconProp;
    color?: string;
}
