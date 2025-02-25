import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import HomepageContentsProps from "./Homepage.types";
import env from "../../config/environmentVariables";
import axios, { AxiosError, AxiosResponse } from "axios";
import { marked } from "marked";
import FatalError from "../../components/FatalError/FatalError";
import "./Homepage.css";
import GenderReveal from "../GenderReveal/GenderReveal";

// TODO: aggiustare tutta la homepage.
// TODO: inserire animazioni.
// TODO: modificare la foto iniziale con react e farla a cerchio.
// TODO: mettere tutto sotto l'header.
// TODO: Modificare l'header.
// TODO: Mettere i bordi a tutta l'app per non fare azzeccare le scritte al bordo.
// TODO: Inserire un loading spinner.
// TODO: Capire cosa fare col marked se non ritorna un valore (non si può mettere stringa vuota nel dangerouslySetInnerHTML).

const Homepage = () => {
    // Get the current site language from global state.
    const siteLanguage = useSelector((state: RootState) => state.language.currentLanguage);

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
        <>
            <GenderReveal />

            {/* 
                GENDER REVEAL HOMEPAGE WIP
            
            {isLoading ? (
                <div className="loading-container">
                    <p>Loading...</p>
                </div>
            ) : hasError ? (
                <FatalError codeError={hasError.status?.toString()} title={hasError.code} description={hasError.message} />
            ) : (
                <div className="prova">
                    <h1>{homepageContents?.homepageTitle}</h1>
                    <div dangerouslySetInnerHTML={{ __html: marked(homepageContents?.homepageTextBody || "") }} />
                </div>
            )} */}
        </>
    );
};

export default Homepage;
