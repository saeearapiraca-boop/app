import "./RegisterPage.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import UserService from "../src/services/userService";
import { validateRegisterForm } from "../src/services/validationUtils";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome_completo: "",
    data_nascimento: "",
    sexo: "",
    email: "",
    senha: "",
    termos: false
  });
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

    const validation = validateRegisterForm(form);
    if (!validation.valid) {
      showToast(Object.values(validation.errors)[0], "error");
      return;
    }

    if (!form.termos) {
      showToast("Aceite os termos", "error");
      return;
    }

    setIsLoading(true);
    try {
      await UserService.registerUser({
        nome_completo: form.nome_completo.trim(),
        email: form.email.toLowerCase().trim(),
        senha: form.senha,
        data_nascimento: form.data_nascimento,
        sexo: form.sexo
      });
      
      showToast("Conta criada!", "success");
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      showToast(error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page register-page">
      <div className="top">
        <img src="/logoSAEE.png" alt="Logo" className="logo" />
        <div className="header">
          <span className="back" onClick={() => navigate("/")}><i className="bi bi-arrow-left"></i></span>
          <h2>Criar Conta</h2>
        </div>
      </div>

      <div className="bottom">
        <p className="description">Preencha todas as informações abaixo.</p>
        <form className="form" onSubmit={handleSubmit}>
          <label>Nome Completo:</label>
          <input type="text" value={form.nome_completo} onChange={(e) => setForm({ ...form, nome_completo: e.target.value })} disabled={isLoading} required />

          <label>Data de Nascimento:</label>
          <input type="date" value={form.data_nascimento} onChange={(e) => setForm({ ...form, data_nascimento: e.target.value })} disabled={isLoading} required />

          <label>Sexo:</label>
          <select className="select-field" value={form.sexo} onChange={(e) => setForm({ ...form, sexo: e.target.value })} disabled={isLoading} required>
            <option value="">Selecione</option>
            <option value="masculino">Masculino</option>
            <option value="feminino">Feminino</option>
            <option value="outro">Outro</option>
            <option value="prefiro-nao-dizer">Prefiro não dizer</option>
          </select>

          <label>E-mail:</label>
          <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} disabled={isLoading} required />

          <label>Senha:</label>
          <input type="password" value={form.senha} onChange={(e) => setForm({ ...form, senha: e.target.value })} disabled={isLoading} required />

          <div className="terms">
            <input type="checkbox" checked={form.termos} onChange={(e) => setForm({ ...form, termos: e.target.checked })} disabled={isLoading} required />
            <span>Aceitar os termos e políticas de uso</span>
          </div>

          <button className="btn primary" disabled={isLoading} type="submit">
            {isLoading ? "Criando..." : "Finalizar Conta"}
          </button>
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