import { BrowserRouter, Routes, Route } from "react-router-dom";
import withAuth from "./components/withAuth.tsx";
import LoginPage from "./components/LoginPage.tsx";
import CalculatorPage from "./components/CalculatorPage.tsx";
import "./App.css";

// Оборачиваем калькулятор в HOC для проверки аутентификации
const ProtectedCalculator = withAuth(CalculatorPage);

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/*" element={<ProtectedCalculator />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
