import Lottie from "lottie-react";
import loader from "../../assets/svg/loader.json";

const Loader = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <Lottie
                style={{ width: 200, height: 200 }}
                animationData={loader}
                loop={true}
                autoplay={true}
                rendererSettings={{
                    progressiveLoad: true,
                    preserveAspectRatio: "xMidYMid slice",
                }}
            />
        </div>
    );
};

export default Loader;
