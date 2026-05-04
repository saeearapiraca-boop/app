import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomePage from "../pages/WelcomePage";
import RegisterPage from "../pages/RegisterPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/registrar" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;