import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { Dispatch } from "redux";
import { setLanguage } from "../../redux/reducers/language.reducer";
import HomepageContentsProps from "./Homepage.types";
import env from "../../config/environmentVariables";
import axios, { AxiosError, AxiosResponse } from "axios";
import { marked } from "marked";
import FatalError from "../../components/FatalError/FatalError";
import "./Homepage.css";
import GenderReveal from "../GenderReveal/GenderReveal";
import Greatings from "../../components/Greatings/Greatings";

import Lottie from "lottie-react";
import wip from "../../assets/svg/wip.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLanguage } from "@fortawesome/free-solid-svg-icons";
import Loader from "../../components/Loader/Loader";

// TODO: aggiustare tutta la homepage.
// TODO: inserire animazioni.
// TODO: modificare la foto iniziale con react e farla a cerchio.
// TODO: mettere tutto sotto l'header.
// TODO: Modificare l'header.
// TODO: Mettere i bordi a tutta l'app per non fare azzeccare le scritte al bordo.
// TODO: Capire cosa fare col marked se non ritorna un valore (non si può mettere stringa vuota nel dangerouslySetInnerHTML).
// TODO: Capire cosa fare con i campi qualora vuoti (tipo title e footer).
// TODO: capire come fare per la lingua inglese o italiano quando avviene errore oppure pagina non trovata.

const Homepage = () => {
    // Get the current site language from global state.
    const siteLanguage = useSelector((state: RootState) => state.language.currentLanguage);

    // Dispatch action to reducer.
    const dispatch: Dispatch = useDispatch();

    // This state will contain the response contents from the strapi API.
    const [homepageContents, setHomepageContentes] = useState<HomepageContentsProps>();

    // This state is useful to show a loading spinner when the page is loading.
    const [isLoading, setIsLoading] = useState<Boolean>(true);

    // This state contains the error if the API call fails.
    const [hasError, setHasError] = useState<AxiosError | null>(null);

    useEffect(() => {
        retriveHomepageContents();
    }, [siteLanguage]);

    const retriveHomepageContents = async () => {
        // Set loading to true for every new API call.
        setIsLoading(true);

        // Reset the error state.
        setHasError(null);

        try {
            const response: AxiosResponse = await axios.get(`${env.apiUrl}/homepage?locale=${siteLanguage}`);
            setHomepageContentes(response.data.data);
        } catch (error: AxiosError | any) {
            setHasError(error);
        } finally {
            // When the API call is finished, set loading to false.
            setIsLoading(false);
        }
    };

    return (
        <div className="p-3">
            {/* <GenderReveal /> */}

            {isLoading ? (
                <>
                    <Loader />
                </>
            ) : hasError ? (
                <FatalError codeError={hasError.status?.toString()} title={hasError.code} description={hasError.message} />
            ) : (
                <div className="flex flex-col md:items-start md:max-w-3xl mx-auto">
                    <div
                        className="self-end cursor-pointer mb-5"
                        onClick={() => {
                            siteLanguage === "it" ? dispatch(setLanguage("en")) : dispatch(setLanguage("it"));
                        }}
                    >
                        <FontAwesomeIcon icon={faLanguage} />
                    </div>

                    <div className="flex justify-center items-center mb-5">
                        <Lottie
                            style={{ width: 300, height: 300 }}
                            animationData={wip}
                            loop={true}
                            autoplay={true}
                            rendererSettings={{
                                progressiveLoad: true,
                                preserveAspectRatio: "xMidYMid slice",
                            }}
                        />
                    </div>

                    <div className="md:text-left">
                        <Greatings />
                        <div className="mb-5">{homepageContents?.homepageTitle}</div>
                        <div dangerouslySetInnerHTML={{ __html: marked(homepageContents?.homepageTextBody || "") }} />
                        <div className="text-gray-400 text-sm">{homepageContents?.homepageFooterText}</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Homepage;
