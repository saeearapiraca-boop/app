import "./LoginPage.css";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    
  const navigate = useNavigate();

  return (
    <div className="page login-page">

      <div className="top">
        <img 
            src="/logoSAEE.png" 
            alt="Logo" 
            className="logo"
        />
      </div>

      <div className="bottom">
        <p>
          Olá👋, seja bem-vindo(a) ao <br />
          <strong>SAEE Arapiraca</strong>
        </p>

        <button className="btn secondary">
          Já sou usuário
        </button>

        <button className="btn primary" onClick={() => navigate("/registrar")}>
          Criar Conta
        </button>
      </div>

    </div>
  );
}