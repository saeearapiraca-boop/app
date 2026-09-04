import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomePage from "../pages/WelcomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ReportPage from "../pages/ReportPage";
import HomePage from "../pages/HomePage";
import ProfilePage from "../pages/ProfilePage";
import EditProfilePage from "../pages/EditProfilePage";
import EducationPage from "../pages/EducationPage";
import ArticlePage from "../pages/ArticlePage";
import MapPage from "../pages/MapPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registrar" element={<RegisterPage /> }/>
        <Route path="/denuncias" element={<ReportPage />} />
        <Route path="/home" element={<HomePage />}/>
        <Route path="/mapa" element={<MapPage />} /> 
        <Route path="/perfil" element={<ProfilePage />}/>
        <Route path="/editar-perfil" element={<EditProfilePage />}/>
        <Route path="/aprender" element={<EducationPage />}/>
        <Route path="/educativo/:id" element={<ArticlePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;