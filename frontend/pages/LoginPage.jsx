import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    senha: ""
  });

  const [toasts, setToasts] = useState([]);

  const showToast = (msg, type = "error") => {
    const id = Date.now();

    setToasts((prev) => [...prev, { id, msg, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter(t => t.id !== id));
    }, 3000);
  };

  const validar = () => {
    if (!form.usuario.trim()) {
      showToast("Usuário obrigatório");
      return false;
    }

    if (!form.senha) {
      showToast("Senha obrigatória");
      return false;
    }

    if (form.senha.length < 6) {
      showToast("Senha mínimo 6 caracteres");
      return false;
    }

    if (!/[A-Z]/.test(form.senha)) {
      showToast("Senha precisa de letra maiúscula");
      return false;
    }

    if (!/[0-9]/.test(form.senha)) {
      showToast("Senha precisa de número");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validar()) return;

    showToast("Login realizado com sucesso!", "success");

  };

  return (
    <div className="page login-page">
      <div className="top">
        <img src="/logoSAEE.png" alt="Logo" className="logo" />

        <div className="header">
          <span className="back" onClick={() => navigate("/")}>
            <i className="bi bi-arrow-left"></i>
          </span>
          <h2>Fazer Login</h2>
        </div>
      </div>

      <div className="bottom">
        <p className="description">
          Entre com seus dados para acessar o sistema.
        </p>

        <form className="form" onSubmit={handleSubmit}>

          <label>E-mail:</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <label>Senha:</label>
          <input
            type="password"
            value={form.senha}
            onChange={(e) =>
              setForm({ ...form, senha: e.target.value })
            }
          />

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

      <div className="toast-container">
        {toasts.map((t) => (
          <div key={t.id} className={`toast ${t.type}`}>
            <i className={`bi ${
              t.type === "success"
                ? "bi-check-circle"
                : "bi-exclamation-circle"
            }`}></i>
            <span>{t.msg}</span>
          </div>
        ))}
      </div>
    </div>
  );
}