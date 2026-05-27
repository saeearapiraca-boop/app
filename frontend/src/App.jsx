import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomePage from "../pages/WelcomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import HomePage from "../pages/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registrar" element={<RegisterPage /> }/>
        <Route path="/home" element={<HomePage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;