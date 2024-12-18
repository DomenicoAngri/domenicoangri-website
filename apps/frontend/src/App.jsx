import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// import { RootState } from "./redux/store";
import axios from "axios";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import { marked } from "marked";

import env from "./config/environmentVariables";

import Header from "./components/header/Header";

// import FatalError from "@components/FatalError";
import FatalError from "./components/FatalError/FatalError";

// TODO: togliere isloading dalla pagina web.
// TODO: aggiustare tutta la homepage.
// TODO: inserire animazioni.
// TODO: modificare la foto iniziale con react e farla a cerchio.
// TODO: mettere tutto sotto l'header.
// TODO: Modificare l'header.
// TODO: inventarsi qualcosa per marked per ogni campo.

function App() {
    const language = useSelector((state) => state.language.currentLanguage);
    const [homepage, setHomepage] = useState([]);

    // For loading page - TODO-REMOVE
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBodyText = async () => {
            try {
                // API from strapi

                // Fields for request can i use.
                // populate: '*',
                // fields: '*',
                // publicationState: 'live',
                // locale: ['en','de'],

                const response = await axios.get(`${env.apiUrl}/homepage?locale=${language}`);
                setHomepage(response.data.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
                console.log("finally catch dentro homepage");
            }
        };
        fetchBodyText();
    }, [language]);

    if (loading) {
        return <div>Caricamento...</div>;
    }

    return (
        <>
            {/* <FatalError /> */}
            <Header />

            <div dangerouslySetInnerHTML={{ __html: marked(homepage.homepageTitle) }} />
            <div dangerouslySetInnerHTML={{ __html: marked(homepage.homepageBody) }} />

            <p className="footer">Developed with love by DA</p>

            {/*             
            <p>
                Cos’è Lorem Ipsum? Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. Lorem Ipsum è considerato
                il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo tipografo prese una cassetta di caratteri e li assemblò per
                preparare un testo campione. È sopravvissuto non solo a più di cinque secoli, ma anche al passaggio alla videoimpaginazione,
                pervenendoci sostanzialmente inalterato. Fu reso popolare, negli anni ’60, con la diffusione dei fogli di caratteri trasferibili
                “Letraset”, che contenevano passaggi del Lorem Ipsum, e più recentemente da software di impaginazione come Aldus PageMaker, che
                includeva versioni del Lorem Ipsum.
            </p>
            <p>
                Cos’è Lorem Ipsum? Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. Lorem Ipsum è considerato
                il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo tipografo prese una cassetta di caratteri e li assemblò per
                preparare un testo campione. È sopravvissuto non solo a più di cinque secoli, ma anche al passaggio alla videoimpaginazione,
                pervenendoci sostanzialmente inalterato. Fu reso popolare, negli anni ’60, con la diffusione dei fogli di caratteri trasferibili
                “Letraset”, che contenevano passaggi del Lorem Ipsum, e più recentemente da software di impaginazione come Aldus PageMaker, che
                includeva versioni del Lorem Ipsum.
            </p>
            <p>
                Cos’è Lorem Ipsum? Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. Lorem Ipsum è considerato
                il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo tipografo prese una cassetta di caratteri e li assemblò per
                preparare un testo campione. È sopravvissuto non solo a più di cinque secoli, ma anche al passaggio alla videoimpaginazione,
                pervenendoci sostanzialmente inalterato. Fu reso popolare, negli anni ’60, con la diffusione dei fogli di caratteri trasferibili
                “Letraset”, che contenevano passaggi del Lorem Ipsum, e più recentemente da software di impaginazione come Aldus PageMaker, che
                includeva versioni del Lorem Ipsum.
            </p>
            <section id="section1">
                <h2>About</h2>
                <p>
                    Cos’è Lorem Ipsum? Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. Lorem Ipsum è
                    considerato il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo tipografo prese una cassetta di caratteri e
                    li assemblò per preparare un testo campione. È sopravvissuto non solo a più di cinque secoli, ma anche al passaggio alla
                    videoimpaginazione, pervenendoci sostanzialmente inalterato. Fu reso popolare, negli anni ’60, con la diffusione dei fogli di
                    caratteri trasferibili “Letraset”, che contenevano passaggi del Lorem Ipsum, e più recentemente da software di impaginazione come
                    Aldus PageMaker, che includeva versioni del Lorem Ipsum.
                </p>
                <p>
                    Cos’è Lorem Ipsum? Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. Lorem Ipsum è
                    considerato il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo tipografo prese una cassetta di caratteri e
                    li assemblò per preparare un testo campione. È sopravvissuto non solo a più di cinque secoli, ma anche al passaggio alla
                    videoimpaginazione, pervenendoci sostanzialmente inalterato. Fu reso popolare, negli anni ’60, con la diffusione dei fogli di
                    caratteri trasferibili “Letraset”, che contenevano passaggi del Lorem Ipsum, e più recentemente da software di impaginazione come
                    Aldus PageMaker, che includeva versioni del Lorem Ipsum.
                </p>
                <p>
                    Cos’è Lorem Ipsum? Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. Lorem Ipsum è
                    considerato il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo tipografo prese una cassetta di caratteri e
                    li assemblò per preparare un testo campione. È sopravvissuto non solo a più di cinque secoli, ma anche al passaggio alla
                    videoimpaginazione, pervenendoci sostanzialmente inalterato. Fu reso popolare, negli anni ’60, con la diffusione dei fogli di
                    caratteri trasferibili “Letraset”, che contenevano passaggi del Lorem Ipsum, e più recentemente da software di impaginazione come
                    Aldus PageMaker, che includeva versioni del Lorem Ipsum.
                </p>
            </section>

            <section id="section2">
                <h2>Exp</h2>
                <p>
                    Cos’è Lorem Ipsum? Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. Lorem Ipsum è
                    considerato il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo tipografo prese una cassetta di caratteri e
                    li assemblò per preparare un testo campione. È sopravvissuto non solo a più di cinque secoli, ma anche al passaggio alla
                    videoimpaginazione, pervenendoci sostanzialmente inalterato. Fu reso popolare, negli anni ’60, con la diffusione dei fogli di
                    caratteri trasferibili “Letraset”, che contenevano passaggi del Lorem Ipsum, e più recentemente da software di impaginazione come
                    Aldus PageMaker, che includeva versioni del Lorem Ipsum.
                </p>
                <p>
                    Cos’è Lorem Ipsum? Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. Lorem Ipsum è
                    considerato il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo tipografo prese una cassetta di caratteri e
                    li assemblò per preparare un testo campione. È sopravvissuto non solo a più di cinque secoli, ma anche al passaggio alla
                    videoimpaginazione, pervenendoci sostanzialmente inalterato. Fu reso popolare, negli anni ’60, con la diffusione dei fogli di
                    caratteri trasferibili “Letraset”, che contenevano passaggi del Lorem Ipsum, e più recentemente da software di impaginazione come
                    Aldus PageMaker, che includeva versioni del Lorem Ipsum.
                </p>
                <p>
                    Cos’è Lorem Ipsum? Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. Lorem Ipsum è
                    considerato il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo tipografo prese una cassetta di caratteri e
                    li assemblò per preparare un testo campione. È sopravvissuto non solo a più di cinque secoli, ma anche al passaggio alla
                    videoimpaginazione, pervenendoci sostanzialmente inalterato. Fu reso popolare, negli anni ’60, con la diffusione dei fogli di
                    caratteri trasferibili “Letraset”, che contenevano passaggi del Lorem Ipsum, e più recentemente da software di impaginazione come
                    Aldus PageMaker, che includeva versioni del Lorem Ipsum.
                </p>
            </section> */}
        </>
    );
}

export default App;
