import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomePage from "../pages/WelcomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ReportPage from "../pages/ReportPage";
import HomePage from "../pages/HomePage";
import ProfilePage from "../pages/ProfilePage";
import EditProfilePage from "../pages/EditProfilePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registrar" element={<RegisterPage /> }/>
        <Route path="/denuncias" element={<ReportPage />} />
        <Route path="/home" element={<HomePage />}/>
        <Route path="/perfil" element={<ProfilePage />}/>
        <Route path="/editar-perfil" element={<EditProfilePage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;