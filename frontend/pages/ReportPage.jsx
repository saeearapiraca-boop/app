import React, { useState } from "react";
import "./ReportPage.css";

const REPORT_TYPES = [
  { value: "esgoto", label: "Esgoto" },
  { value: "agua", label: "Água" },
  { value: "mosquito", label: "Mosquito" },
  { value: "lixo", label: "Lixo" },
];

export default function ReportPage() {
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

      const baseUrl = import.meta.env.VITE_API_URL ?? "http://localhost:8000";
      const response = await fetch(`${baseUrl}/api/v1/ocorrencias/`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.detail ?? `Erro ${response.status}`);
      }

      setSuccess("Denúncia registrada com sucesso!");
      setDescription("");
      setLocation("");
      setType(REPORT_TYPES[0].value);
      setMedia(null);
      setMediaPreview(null);
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
        <label htmlFor="media">Foto (imagem ou vídeo):</label>
        <input
          id="media"
          type="file"
          accept="image/*,video/*"
          onChange={handleMediaChange}
        />
        {mediaPreview && (
          <div className="report-preview">
            {media && media.type.startsWith("image") ? (
              <img src={mediaPreview} alt="Pré-visualização" />
            ) : (
              <video src={mediaPreview} controls style={{ maxWidth: "100%", maxHeight: 200, borderRadius: 8 }} />
            )}
          </div>
        )}
        <label htmlFor="description">Descrição:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          required
          placeholder="Descreva o problema..."
        />
        <label htmlFor="location">Localização:</label>
        <input
          id="location"
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          placeholder="Ex: Rua, bairro, ponto de referência..."
        />
        <label htmlFor="type">Tipo de denúncia:</label>
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
        <button type="submit" disabled={loading}>
          {loading ? "Enviando..." : "Registrar"}
        </button>
        {success && <div className="report-success">{success}</div>}
        {error && <div className="report-error">{error}</div>}
      </form>
    </div>
  );
}
