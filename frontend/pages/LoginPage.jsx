import "./LoginPage.css";

export default function LoginPage() {
  return (
    <div className="page">

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

        <button className="btn primary">
          Criar Conta
        </button>
      </div>

    </div>
  );
}