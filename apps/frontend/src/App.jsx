import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import GenderReveal from "./pages/GenderReveal/GenderReveal";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/gender-reveal" element={<GenderReveal />} />
            </Routes>
        </Router>
    );
};

export default App;
