import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// import { RootState } from "./redux/store";
import axios from "axios";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import env from "./config/environmentVariables";

import Header from "./components/header/Header";

// import FatalError from "@components/FatalError";
import FatalError from "./components/FatalError/FatalError";

function App() {
    const [count, setCount] = useState(0);
    const language = useSelector((state) => state.language.currentLanguage);
    const [bodyText, setBodyText] = useState([]);

    useEffect(() => {
        const fetchBodyText = async () => {
            try {
                // API from strapi
                const response = await axios.get(`${env.apiUrl}/homepage?locale=${language}`);
                setBodyText(response.data.data);
            } catch (err) {
                console.error(err);
            } finally {
                console.log("finally catch dentro homepage");
            }
        };
        fetchBodyText();
    }, [language]);

    return (
        <>
            {/* <FatalError /> */}
            <Header />
            <div className="mt-20">
                <img src={viteLogo} className="logo" alt="Vite logo" />
                <img src={reactLogo} className="logo react" alt="React logo" />
            </div>
            <h1>Domenico Angri Website</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
            </div>
            <p>{bodyText.body}</p>
            <p className="read-the-docs">Developed with love by DA</p>
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
            </section>
        </>
    );
}

export default App;
