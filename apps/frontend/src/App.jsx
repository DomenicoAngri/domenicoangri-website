import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import GenderReveal from "./pages/GenderReveal/GenderReveal";
import GenderRevealStats from "./pages/GenderRevealStats/GenderRevealStats";
import NotFound from "./pages/NotFound/NotFound";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/gender-reveal" element={<GenderReveal />} />
                <Route path="/gender-reveal-stats" element={<GenderRevealStats />} />

                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default App;
