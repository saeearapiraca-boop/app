import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import UserService from "../src/services/userService";

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", senha: "" });
  const [toasts, setToasts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const showToast = (msg, type = "error") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, msg, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter(t => t.id !== id));
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email?.trim()) {
      showToast("E-mail obrigatório");
      return;
    }

    if (!form.senha) {
      showToast("Senha obrigatória");
      return;
    }

    setIsLoading(true);
    try {
      await UserService.loginUser(form.email.toLowerCase().trim(), form.senha);
      showToast("Login realizado!", "success");
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      showToast(error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page login-page">
      <div className="top">
        <img src="/logoSAEE.png" alt="Logo" className="logo" />
        <div className="header">
          <span className="back" onClick={() => navigate("/")}><i className="bi bi-arrow-left"></i></span>
          <h2>Fazer Login</h2>
        </div>
      </div>

      <div className="bottom">
        <p className="description">Entre com seus dados para acessar o sistema.</p>
        <form className="form" onSubmit={handleSubmit}>
          <label>E-mail:</label>
          <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} disabled={isLoading} required />

          <label>Senha:</label>
          <input type="password" value={form.senha} onChange={(e) => setForm({ ...form, senha: e.target.value })} disabled={isLoading} required />

          <button className="btn primary" disabled={isLoading} type="submit">
            {isLoading ? "Entrando..." : "Entrar"}
          </button>

          <span className="link" onClick={() => navigate("/registrar")}>
            Não tem conta? Criar agora
          </span>
        </form>
      </div>

      <div className="toast-container">
        {toasts.map((t) => (
          <div key={t.id} className={`toast ${t.type}`}>
            <i className={`bi ${t.type === "success" ? "bi-check-circle" : "bi-exclamation-circle"}`}></i>
            <span>{t.msg}</span>
          </div>
        ))}
      </div>
    </div>
  );
}