import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ButtonProps } from "./Button.types";

const Button: React.FC<ButtonProps> = ({ onClick, label, disabled, iconDx, iconSx, color = false }) => {
    return (
        <button
            onClick={onClick}
            className={`flex flex-row justify-evenly items-center w-32 p-2 text-white rounded-md hover:bg-gray-300 transition-colors ${color ? color : "bg-grey-400"}`}
            disabled={disabled}
        >
            {iconSx ? <FontAwesomeIcon icon={iconSx} /> : null}
            <span>{label}</span>
            {iconDx ? <FontAwesomeIcon icon={iconDx} /> : null}
        </button>
    );
};

export default Button;
