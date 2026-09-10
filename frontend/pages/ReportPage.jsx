import { useState } from "react";
import "./ReportPage.css";
import BottomNav from "../src/components/BottomNav";
import { useNavigate } from "react-router-dom";
import UserService from "../src/services/userService"; 

const REPORT_TYPES = [
  { value: "esgoto", label: "Esgoto" },
  { value: "agua", label: "Água" },
  { value: "mosquito", label: "Mosquito" },
  { value: "lixo", label: "Lixo" },
];

export default function ReportPage() {
  const navigate = useNavigate();

  const [media, setMedia] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [locationStatus, setLocationStatus] = useState("");
  const [type, setType] = useState(REPORT_TYPES[0].value);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    setMedia(file);
    if (file) {
      setMediaPreview(URL.createObjectURL(file));
    } else {
      setMediaPreview(null);
    }
  };

  const geocodeLocation = async (address) => {
    if (!address.trim()) {
      throw new Error("Informe a localização da denúncia.");
    }

    const params = new URLSearchParams({
      q: `${address}, Arapiraca, AL, Brasil`,
      format: "jsonv2",
      limit: "1",
      countrycodes: "br",
    });
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?${params.toString()}`,
      { headers: { Accept: "application/json" } }
    );
    const results = await response.json().catch(() => []);

    if (!response.ok || results.length === 0) {
      throw new Error("Não foi possível encontrar as coordenadas dessa localização.");
    }

    const coordinates = {
      latitude: Number(results[0].lat),
      longitude: Number(results[0].lon),
    };
    return coordinates;
  };

  const handleLocationBlur = async () => {
    if (!location.trim()) {
      setLocationStatus("");
      return;
    }

    setLocationStatus("Buscando localização...");
    try {
      await geocodeLocation(location);
      setLocationStatus("Localização encontrada");
    } catch (err) {
      setLocationStatus("");
      setError(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("descricao", description);
      formData.append("localizacao", location);
      formData.append("tipo", type);
      const coordinates = await geocodeLocation(location);
      formData.append("latitude", coordinates.latitude);
      formData.append("longitude", coordinates.longitude);
      if (media) {
        formData.append("midia", media);
      }

      // 1. Resgata o usuário logado e anexa o ID no formulário
      const user = UserService.getUser();
      if (user?.id) {
        formData.append("usuario_id", user.id);
      }

      // 2. Resgata o token JWT para autenticar a requisição
      const token = UserService.getToken();

      const baseUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
      const response = await fetch(`${baseUrl}/api/v1/ocorrencias/`, {
        method: "POST",
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        const detail = Array.isArray(data?.detail)
          ? data.detail.map((item) => item.msg || item.detail).filter(Boolean).join("; ")
          : data?.detail;
        throw new Error(detail || `Erro ${response.status}`);
      }

      setSuccess("Denúncia registrada com sucesso! Redirecionando...");
      setDescription("");
      setLocation("");
      setLocationStatus("");
      setType(REPORT_TYPES[0].value);
      setMedia(null);
      setMediaPreview(null);

      setTimeout(() => {
        navigate("/registros");
      }, 1000);

    } catch (err) {
      setError(err.message || "Erro ao registrar denúncia. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="report-container">
      <h2 className="report-title">Registrar Denúncia</h2>
      
      <form className="report-form" onSubmit={handleSubmit}>
        
        {/* Área de Upload Customizada */}
        <div className="input-group">
          <label className="upload-label" htmlFor="media">
            <i className="bi bi-camera-fill"></i>
            <span>Adicionar foto ou vídeo do problema</span>
            <input
              id="media"
              type="file"
              accept="image/*,video/*"
              onChange={handleMediaChange}
              style={{ display: "none" }} 
            />
          </label>
          
          {mediaPreview && (
            <div className="report-preview">
              {media && media.type.startsWith("image") ? (
                <img src={mediaPreview} alt="Pré-visualização" />
              ) : (
                <video src={mediaPreview} controls />
              )}
            </div>
          )}
        </div>

        {/* Tipo de Denúncia */}
        <div className="input-group">
          <label htmlFor="type">Tipo de denúncia</label>
          <div className="select-wrapper">
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              {REPORT_TYPES.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Descrição */}
        <div className="input-group">
          <label htmlFor="description">Descrição do ocorrido</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            required
            placeholder="Descreva o problema com detalhes (ex: falta de água há 3 dias, entulho na calçada...)"
          />
        </div>

        {/* Localização */}
        <div className="input-group">
          <label htmlFor="location">Localização</label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onBlur={handleLocationBlur}
            required
            placeholder="Ex: Rua Primavera, próximo ao mercado"
          />
          {locationStatus && (
            <span className="location-status">{locationStatus}</span>
          )}
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Enviando..." : "Registrar Denúncia"}
        </button>

        {success && <div className="report-success">{success}</div>}
        {error && <div className="report-error">{error}</div>}
      </form>

      <BottomNav />
    </div>
  );
}