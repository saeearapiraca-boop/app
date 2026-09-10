import "./HomePage.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../src/components/BottomNav";
import UserService from "../src/services/userService";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from "react-leaflet";

const CENTER_ARAPIRACA = [-9.7549, -36.6611];

export default function HomePage() {
  const navigate = useNavigate();

  const [ocorrencias, setOcorrencias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOcorrencias = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
        const token = UserService.getToken();

        const response = await fetch(`${baseUrl}/api/v1/ocorrencias/`, {
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });

        if (response.ok) {
          const data = await response.json();
          // Filtra ocorrências que possuem latitude e longitude válidas para o mapa
          const validos = data.filter(
            (item) => item.latitude !== null && item.longitude !== null
          );
          setOcorrencias(validos);
        }
      } catch (error) {
        console.error("Erro ao carregar ocorrências para o mapa da home:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOcorrencias();
  }, []);

  return (
    <div className="home-page">
      <BottomNav />

      {/* HEADER */}
      <header className="home-header">
        <button
          className="menu-btn"
          onClick={() => alert("Abrir menu")}
        >
          ☰
        </button>

        <img src="/logoSAEE.png" alt="Logo" className="logo" />

        <img
          src="/user.png"
          alt="Usuário"
          className="user-avatar"
        />
      </header>

      {/* PESQUISA */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Pesquisar problemas..."
        />
        <button>
          <i className="bi bi-search"></i>
        </button>
      </div>

      {/* MAPA */}
      <section className="map-section">
        <button
          className="btn-expand-map"
          onClick={() => navigate("/mapa")}
          title="Ver mapa em tela cheia"
        >
          <i className="bi bi-arrows-fullscreen"></i>
        </button>

        <MapContainer
          center={CENTER_ARAPIRACA}
          zoom={13}
          scrollWheelZoom={true}
          className="map"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {ocorrencias.map((item) => (
            <Marker
              key={item.id}
              position={[item.latitude, item.longitude]}
            >
              <Popup>
                <strong>{item.tipo.toUpperCase()}</strong>
                <br />
                {item.localizacao}
                <br />
                <small>{item.descricao}</small>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </section>

      {/* PROBLEMAS */}
      <section className="section">
        <div className="section-header">
          <h3>Problemas em destaque</h3>
          <span onClick={() => navigate("/mapa")} style={{ cursor: "pointer" }}>
            ver todos
          </span>
        </div>

        <div className="problem-card">
          <div className="problem-image"></div>

          <div className="problem-content">
            <div className="problem-header">
              <h3>Bairro Primavera</h3>
              <span>Não resolvido</span>
            </div>

            <p className="descricao">
              O Bairro Primavera enfrenta graves problemas de infraestrutura e saúde pública. Moradores relatam constante falta de água e vias tomadas por buracos. Além disso, o descarte irregular de lixo e focos de água parada em terrenos baldios têm gerado grande preocupação com a proliferação de mosquitos da dengue.
            </p>

            <div className="problem-footer">
              <div className="stats">
                <i className="bi bi-camera-fill"></i>
                <span>178 fotos</span>
                <i className="bi bi-chat-left-dots-fill"></i>
                <span>35 relatos</span>
              </div>

              <button onClick={() => navigate("/mapa")}>Explorar</button>
            </div>
          </div>
        </div>
      </section>

      {/* EDUCATIVO */}
      <section className="section">
        <div className="section-header">
          <h3>Conteúdo educativo</h3>
          <span onClick={() => navigate('/aprender')} style={{ cursor: "pointer" }}>ver mais</span>
        </div>

        <div className="education-grid">
          <div className="education-card">
            <div className="education-image"></div>
            <div className="education-content">
              <h3>Descarte de Lixo</h3>
              <p>Aprenda a separar o lixo corretamente e descubra os dias da coleta seletiva no seu bairro.</p>
              <span>Ler mais</span>
            </div>
          </div>

          <div className="education-card">
            <div className="education-image2"></div>
            <div className="education-content">
              <h3>Água Parada</h3>
              <p>Saiba como vistoriar seu quintal e evitar o acúmulo de água em vasos e garrafas.</p>
              <span>Ler mais</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}