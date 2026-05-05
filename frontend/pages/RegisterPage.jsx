import "./RegisterPage.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: "",
    data: "",
    sexo: "",
    usuario: "",
    senha: "",
    termos: false
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
    if (!form.nome.trim()) {
      showToast("Nome é obrigatório");
      return false;
    }

    if (!form.data) {
      showToast("Data de nascimento obrigatória");
      return false;
    }

    if (!form.sexo) {
      showToast("Selecione o sexo");
      return false;
    }

    if (!form.usuario.trim()) {
      showToast("Usuário obrigatório");
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

    if (!form.termos) {
      showToast("Aceite os termos");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validar()) return;

    showToast("Conta criada com sucesso!", "success");
  };

  return (
    <div className="page register-page">
      <div className="top">
        <img src="/logoSAEE.png" alt="Logo" className="logo" />

        <div className="header">
          <span className="back" onClick={() => navigate("/")}>
            <i className="bi bi-arrow-left"></i>
          </span>
          <h2>Criar Conta</h2>
        </div>
      </div>

      <div className="bottom">
        <p className="description">
          Para criar sua conta preencha todas as informações abaixo.
        </p>

        <form className="form" onSubmit={handleSubmit}>
          
          <label>Nome Completo:</label>
          <input
            type="text"
            value={form.nome}
            onChange={(e) =>
              setForm({ ...form, nome: e.target.value })
            }
          />

          <label>Data de Nascimento:</label>
          <input
            type="date"
            value={form.data}
            onChange={(e) =>
              setForm({ ...form, data: e.target.value })
            }
          />

          <label>Sexo:</label>
          <select
            className="select-field"
            value={form.sexo}
            onChange={(e) =>
              setForm({ ...form, sexo: e.target.value })
            }
          >
            <option value="">Selecione uma opção</option>
            <option value="masculino">Masculino</option>
            <option value="feminino">Feminino</option>
            <option value="outro">Outro</option>
            <option value="prefiro-nao-dizer">Prefiro não dizer</option>
          </select>

          <label>Nome de Usuário:</label>
          <input
            type="text"
            value={form.usuario}
            onChange={(e) =>
              setForm({ ...form, usuario: e.target.value })
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

          <div className="terms">
            <input
              type="checkbox"
              checked={form.termos}
              onChange={(e) =>
                setForm({ ...form, termos: e.target.checked })
              }
            />
            <span>
              Aceitar os termos e as políticas de condições de uso
            </span>
          </div>

          <button className="btn primary">
            Finalizar Conta
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