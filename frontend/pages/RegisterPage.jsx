import "./RegisterPage.css";
import "./LoginPage.css";

export default function RegisterPage() {
  return (
    <div className="page register-page">

    <div className="top">
        <img src="/logoSAEE.png" alt="Logo" className="logo" />

        <div className="header">
            <span 
            className="back">
                <i class="bi bi-arrow-left"></i>
            </span>
            <h2>Criar Conta</h2>
        </div>
    </div>

    <div className="bottom">
        <p className="description">
        Para criar sua conta preencha todas as informações abaixo.
        </p>

        <form className="form">

        <label>Nome Completo:</label>
        <input type="text" />

        <label>Data de Nascimento:</label>
        <input type="date" />

        <label>Sexo:</label>
        <input type="text" />

        <label>Nome de Usuário:</label>
        <input type="text" />

        <label>Senha:</label>
        <input type="password" />

        <div className="terms">
            <input type="checkbox" />
            <span>Aceitar os termos e as políticas de condições de uso</span>
        </div>

        <button className="btn primary">
            Finalizar Conta
        </button>

        </form>

    </div>

    </div>
  );
}