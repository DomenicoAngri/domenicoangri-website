import FatalErrorProps from "./FatalError.types";
import FatalErrorSvgComponent from "../../assets/svg/FatalErrorSvgComponent";
import "./FatalError.css";

const FatalError = (props: FatalErrorProps) => {
    const { codeError, title, description } = props;

    return (
        <div className="container">
            <div className="icon">
                <FatalErrorSvgComponent width={300} height={300} />
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
