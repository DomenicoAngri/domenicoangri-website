import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// import { RootState } from "./redux/store";
import HomepageContentsProps from "./Homepage.types";
import env from "../../config/environmentVariables";
import axios from "axios";
import { marked } from "marked";
import FatalError from "../../components/FatalError/FatalError";

// TODO: togliere isloading dalla pagina web, se serve metterlo, magari mettere un'icona / animazione di caricamento o delle shadow.
// TODO: aggiustare tutta la homepage.
// TODO: inserire animazioni.
// TODO: modificare la foto iniziale con react e farla a cerchio.
// TODO: mettere tutto sotto l'header.
// TODO: Modificare l'header.
// TODO: inventarsi qualcosa per marked per ogni campo.

const Homepage = () => {
    // Mi serve per prendere la lingua corrente dal reducer (default è en).
    const siteLanguage = useSelector((state) => state.language.currentLanguage);

    // This state will contain the response contents from the strapi API.
    const [homepageContents, setHomepageContentes] = useState<HomepageContentsProps>();

    useEffect(() => {
        retriveHomepageContents();
    }, [siteLanguage]);

    const retriveHomepageContents = async () => {
        try {
            const response = await axios.get(`${env.apiUrl}/homepagee?locale=${siteLanguage}`);
            setHomepageContentes(response.data.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            {homepageContents ? (
                <>
                    <h1>{homepageContents.homepageTitle}</h1>
                    <div dangerouslySetInnerHTML={{ __html: marked(homepageContents.homepageTextBody) }} />
                </>
            ) : (
                <FatalError codeError="500" title="error" description="error desc" />
            )}
        </>
    );
};

export default Homepage;
