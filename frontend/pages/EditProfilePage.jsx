import "./EditProfilePage.css";
import { useNavigate } from "react-router-dom";

export default function EditProfilePage() {
  const navigate = useNavigate();

  return (
    <div className="edit-profile-page">

      <div className="edit-top">

        <span className="back" onClick={() => navigate(-1)}>
          <i className="bi bi-arrow-left"></i>
        </span>

        <h2>Editar Perfil</h2>

        <div className="avatar-container">
          <img
            src="/user.png"
            alt="Usuário"
            className="profile-avatar"
          />

        </div>

      </div>

      <div className="edit-bottom">

        <h3>INFORMAÇÕES PESSOAIS</h3>

        <form className="form">

          <label>Nome Completo:</label>
          <input
            type="text"
            defaultValue="Karleandro"
          />

          <label>Data de Nascimento:</label>
          <input
            type="date"
            defaultValue="2004-04-14"
          />

          <label>SEXO:</label>

          <select>
            <option>Masculino</option>
            <option>Feminino</option>
            <option>Outro</option>
          </select>

          <h3 className="section-title">
            LOGIN E SENHA
          </h3>

          <label>Usuário:</label>
          <input
            type="email"
            defaultValue="karleandro@gmail.com"
          />

          <label>Senha:</label>
          <input
            type="password"
            defaultValue="123456"
          />

          <button
            type="submit"
            className="save-btn"
          >
            Salvar Alterações
          </button>

        </form>

      </div>

    </div>
  );
}