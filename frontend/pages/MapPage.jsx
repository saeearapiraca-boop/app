import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import BottomNav from "../src/components/BottomNav";
import "./MapPage.css";

export default function MapPage() {
  const navigate = useNavigate();

  const [problemas] = useState([
    {
      id: 1,
      titulo: "Rua São Francisco - Centro",
      descricao: "Muito lixo acumulado",
      bairro: "Centro",
      likes: 23,
      comentarios: 12,
      posicao: [-9.7549, -36.6611],
    },
    {
      id: 2,
      titulo: "Rua Duque de Caxias - Brasília",
      descricao: "Buraco enorme na rua",
      bairro: "Brasília",
      likes: 10,
      comentarios: 4,
      posicao: [-9.757, -36.658],
    },
  ]);

  return (
    <div className="full-map-page">
      {/* Botão flutuante para voltar à tela anterior */}
      <button 
        className="map-back-btn" 
        onClick={() => navigate(-1)}
        aria-label="Voltar"
      >
        ✕
      </button>

      {/* Mapa ocupando 100% da viewport */}
      <MapContainer
        center={[-9.7549, -36.6611]}
        zoom={14}
        scrollWheelZoom={true}
        className="full-map"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {problemas.map((problema) => (
          <Marker key={problema.id} position={problema.posicao}>
            <Popup>
              <strong>{problema.titulo}</strong>
              <br />
              {problema.descricao}
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <BottomNav />
    </div>
  );
}