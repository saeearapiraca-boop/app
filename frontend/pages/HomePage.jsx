import "./HomePage.css";

import { useState } from "react";

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

    <div className="home-container">

      {/* HEADER */}
      <header className="header">

        <button
          className="menu-btn"
          onClick={() => alert("Abrir menu")}
        >
          ☰
        </button>

        <h2>
          Arapiraca
        </h2>

        <div
          className="perfil"
          onClick={() => alert("Abrir perfil")}
        >
          👤
        </div>

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
            Ver todos
          </span>

        </div>

        {problemas.map((problema) => (

          <div
            key={problema.id}
            className="problem-card"
          >

            <div className="problem-content">

              <div className="problem-top">

                <div>

                  <h4>
                    {problema.titulo}
                  </h4>

                  <p className="bairro">
                    {problema.bairro}
                  </p>

                </div>

                <span className="status">
                  aberto
                </span>

              </div>

              <p className="descricao">
                {problema.descricao}
              </p>

              <div className="problem-footer">

                <span>
                  👍 {problema.likes}
                </span>

                <span>
                  💬 {problema.comentarios}
                </span>

                <button
                  className="explorar-btn"
                  onClick={() =>
                    alert(
                      `Abrindo ${problema.titulo}`
                    )
                  }
                >
                  Explorar
                </button>

              </div>

            </div>

          </div>

        ))}

      </section>

    </div>

  );
}