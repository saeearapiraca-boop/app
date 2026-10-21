import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import BottomNav from "../src/components/BottomNav";
import UserService from "../src/services/userService";
import "./MapPage.css";

const CENTER_ARAPIRACA = [-9.7549, -36.6611];

export default function MapPage() {
  const navigate = useNavigate();
  const [ocorrencias, setOcorrencias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Define a URL base do backend
  const baseUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

  useEffect(() => {
    const fetchOcorrencias = async () => {
      try {
        const token = UserService.getToken();

        const response = await fetch(`${baseUrl}/api/v1/ocorrencias/`, {
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });

        if (!response.ok) {
          throw new Error(`Erro ${response.status}: Falha ao carregar ocorrências`);
        }

        const data = await response.json();
        
        const ocorrenciasComCoords = data.filter(
          (item) => item.latitude !== null && item.longitude !== null
        );

        setOcorrencias(ocorrenciasComCoords);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOcorrencias();
  }, [baseUrl]);

  // Função auxiliar para montar a URL completa da mídia
  const getMediaUrl = (url) => {
    if (!url) return "";
    return url.startsWith("http") ? url : `${baseUrl}${url}`;
  };

  return (
    <div className="full-map-page">
      <button 
        className="map-back-btn" 
        onClick={() => navigate(-1)}
        aria-label="Voltar"
      >
        ✕
      </button>

      {loading && <div className="map-loading-overlay">Carregando mapa...</div>}
      {error && <div className="map-error-overlay">{error}</div>}

      <MapContainer
        center={CENTER_ARAPIRACA}
        zoom={14}
        scrollWheelZoom={true}
        className="full-map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {ocorrencias.map((item) => (
          <Marker key={item.id} position={[item.latitude, item.longitude]}>
            <Popup>
              <div className="popup-content">
                <strong>{item.tipo ? item.tipo.toUpperCase() : "OCORRÊNCIA"} - {item.localizacao}</strong>
                <p style={{ margin: "6px 0" }}>{item.descricao}</p>
                
                {/* Renderização com URL absoluta e tratamento de vídeo */}
                {item.midia_url && (
                  item.midia_url.endsWith(".mp4") ? (
                    <video 
                      src={getMediaUrl(item.midia_url)} 
                      controls 
                      style={{ width: "100%", maxHeight: "150px", borderRadius: "6px", marginTop: "6px" }} 
                    />
                  ) : (
                    <img 
                      src={getMediaUrl(item.midia_url)} 
                      alt="Mídia da ocorrência" 
                      style={{ width: "100%", maxHeight: "150px", objectFit: "cover", borderRadius: "6px", marginTop: "6px" }} 
                    />
                  )
                )}

                <small style={{ display: "block", marginTop: "6px", color: "#666" }}>
                  Status: <strong>{item.status}</strong> | Por: {item.nome_usuario || "Cidadão"}
                </small>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <BottomNav />
    </div>
  );
}