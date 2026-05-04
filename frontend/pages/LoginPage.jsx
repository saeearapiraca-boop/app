import "./LoginPage.css";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="page login-page">
      <div className="top">
        <img src="/logoSAEE.png" alt="Logo" className="logo" />

        <div className="header">
        <span className="back" onClick={() => navigate("/")}>
           <i className="bi bi-arrow-left"></i>
        </span>
        <h2>Fazer Login</h2>
      </div></div>

      <div className="bottom">
        <p className="description">
          Entre com seu nome de usuário e senha.
        </p>

        <form className="form">
          <label>Nome de Usuário:</label>
          <input type="text" placeholder="Digite seu usuário" />

          <label>Senha:</label>
          <input type="password" placeholder="Digite sua senha" />

          <button className="btn primary">
            Entrar
          </button>

          <span 
            className="link"
            onClick={() => navigate("/registrar")}
          >
            Não tem conta? Criar agora
          </span>
        </form>
      </div>
    </div>
  );
}