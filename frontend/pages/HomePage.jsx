import "./HomePage.css";
import { useState } from "react";
import BottomNav from "../src/components/BottomNav";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from "react-leaflet";

export default function HomePage() {

  const [problemas] = useState([
    {
      id: 1,
      titulo: "Lixo",
      descricao: "Muito lixo acumulado",
      bairro: "Centro",
      likes: 23,
      comentarios: 12,
      posicao: [-9.7549, -36.6611]
    },
    {
      id: 2,
      titulo: "Buraco",
      descricao: "Buraco enorme na rua",
      bairro: "Brasília",
      likes: 10,
      comentarios: 4,
      posicao: [-9.7570, -36.6580]
    }
  ]);

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
          🔍
        </button>

      </div>

      {/* MAPA */}
      <section className="map-section">

        <MapContainer
          center={[-9.7549, -36.6611]}
          zoom={13}
          scrollWheelZoom={true}
          className="map"
        >

          <TileLayer
            attribution='&copy; OpenStreetMap'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {problemas.map((problema) => (

            <Marker
              key={problema.id}
              position={problema.posicao}
            >

              <Popup>

                <strong>
                  {problema.titulo}
                </strong>

                <br />

                {problema.descricao}

              </Popup>

            </Marker>

          ))}

        </MapContainer>

      </section>

      {/* PROBLEMAS */}
      <section className="section">

        <div className="section-header">

          <h3>
            Problemas em destaque
          </h3>

          <span>
            ver todos
          </span>

        </div>

        <div className="problem-card">

          <div className="problem-image">

          </div>

          <div className="problem-content">
            <div className="problem-header">
              <h3>Bairro Primavera</h3>
              <span>Não resolvido</span>
            </div>

            <p className="descricao">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi magni expedita consequatur sint ab praesentium temporibus, enim aliquam voluptatem iure, vel saepe vero inventore atque itaque voluptate modi repellendus doloribus.
            </p>

            <div className="problem-footer">
              <div className="stats">
                <span>👥 178 fotos</span>
                <span>💬 35 relatos</span>
              </div>

              <button>Explorar</button>
            </div>
          </div>
          </div>

      </section>

      {/* EDUCATIVO */}
      <section className="section">

        <div className="section-header">
          <h3>Conteúdo educativo</h3>
          <span>ver mais</span>
        </div>

        <div className="education-grid">

          <div className="education-card">
            <div className="education-image"></div>

            <div className="education-content">
              <h3>Descarte de Lixo</h3>
              <p>Descrição</p>
              <span>Ler mais</span>
            </div>
          </div>

          <div className="education-card">
            <div className="education-image"></div>

            <div className="education-content">
              <h3>Água Parada</h3>
              <p>Descrição</p>
              <span>Ler mais</span>
            </div>
          </div>

        </div>

      </section>
    </div>

  );
}