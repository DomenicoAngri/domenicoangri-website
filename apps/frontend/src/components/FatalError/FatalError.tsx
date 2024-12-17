import { FatalErrorProps } from "./FatalError.types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import "./FatalError.css";

const FatalError = (props: FatalErrorProps) => {
    const { codeError, title, description, icon } = props;
    let defaultIconError: IconProp;

    if (icon) {
        defaultIconError = icon;
    } else {
        defaultIconError = faCircleExclamation;
    }

    return (
        <div className="container">
            <div className="icon">
                <FontAwesomeIcon icon={defaultIconError} />
            </div>
            <div className="title">{title}</div>
            <div>
                {description && (
                    <div className="description">
                        {codeError ? "Error with code: " : ""} {description}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FatalError;
