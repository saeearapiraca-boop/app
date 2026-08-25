import "./ProfilePage.css";
import BottomNav from "../src/components/BottomNav";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const navigate = useNavigate();

  return (
    <div className="profile-page">

        <BottomNav />

      <div className="profile-header">

        <span className="back" onClick={() => navigate(-1)}>
          <i className="bi bi-arrow-left"></i>
        </span>

        <div className="profile-avatar-container">
          <img
            src="/user.png"
            alt="Usuário"
            className="profile-avatar"
          />

          <button className="edit-avatar" onClick={() => navigate("/editar-perfil")}>
            <i className="bi bi-pencil-fill"></i>
          </button>
        </div>

        <h1 className="name">Karleandro</h1>

      </div>

      <div className="profile-card">

        <div className="stats">

          <div className="stat">
            <i className="bi bi-camera-fill"></i>
            <h3>32</h3>
            <p>mídias enviadas</p>
          </div>

          <div className="stat">
            <i className="bi bi-fire"></i>
            <h3>16</h3>
            <p>registros feitos</p>
          </div>

          <div className="stat">
            <i className="bi bi-list"></i>
            <h3>6</h3>
            <p>solicitações verificadas</p>
          </div>

        </div>

        <p className="bio">
          Transformando o nosso bairro através da tecnologia e da união. Meu objetivo é ajudar a identificar focos de água parada, acúmulo de lixo e falhas de infraestrutura, garantindo que os moradores tenham voz e que as melhorias cheguem até as nossas ruas.
        </p>

        <div className="tags">

          <span>lixo 6</span>
          <span>esgoto à céu aberto 4</span>
          <span>água 3</span>
          <span>alagamento 2</span>
          <span>bueiro 2</span>
          <span>mosquito 1</span>

        </div>

      </div>

      <section className="gallery-section">

        <div className="section-header">
          <h2>Meus registros</h2>
        </div>

        <div className="gallery-row">
          <div className="gallery-card"></div>
          <div className="gallery-card"></div>
          <div className="gallery-card"></div>
        </div>

      </section>

      <section className="gallery-section">

        <div className="section-header">
          <h2>Mídias</h2>
        </div>

        <div className="media-grid">
          <div className="media-card"></div>
          <div className="media-card"></div>
        </div>

      </section>

    </div>
  );
}