import { useState } from "react";
import "./ReportPage.css";
import BottomNav from "../src/components/BottomNav";
import { useNavigate } from "react-router-dom";

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
      if (media) {
        formData.append("midia", media);
      }

      const baseUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
      const response = await fetch(`${baseUrl}/api/v1/ocorrencias/`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.detail ?? `Erro ${response.status}`);
      }

      setSuccess("Denúncia registrada com sucesso! Redirecionando...");
      setDescription("");
      setLocation("");
      setType(REPORT_TYPES[0].value);
      setMedia(null);
      setMediaPreview(null);

      // Redireciona para o feed após 1 segundo para o usuário ler a mensagem
      setTimeout(() => {
        navigate("/registros"); // ajuste para a sua rota (ex: /registros ou /feed)
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
            required
            placeholder="Ex: Rua Primavera, próximo ao mercado"
          />
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