import { useEffect, useRef, useState } from "react";
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

// Limites idênticos aos do backend (schemas/ocorrencia.py e endpoints/ocorrencias.py)
const DESCRIPTION_MIN = 5;
const DESCRIPTION_MAX = 500;
const LOCATION_MIN = 3;
const LOCATION_MAX = 255;
const MAX_FILE_SIZE_MB = 10;
const ALLOWED_MEDIA_TYPES = ["image/jpeg", "image/png", "image/webp", "video/mp4"];

// Caixa ao redor de Arapiraca (esq, topo, dir, base) para a busca não cair em outra cidade
const ARAPIRACA_VIEWBOX = "-36.81,-9.60,-36.51,-9.90";

const FIELD_LABELS = {
  descricao: "Descrição",
  localizacao: "Localização",
  tipo: "Tipo de denúncia",
  latitude: "Latitude",
  longitude: "Longitude",
  midia: "Foto ou vídeo",
};

const NETWORK_ERROR_MESSAGE = "Sem conexão com o servidor. Verifique sua internet e tente novamente.";

// Converte o `detail` de erros 422 do FastAPI em mensagens em português.
function formatApiError(data, status) {
  const detail = data?.detail;

  if (Array.isArray(detail)) {
    const messages = detail.map((item) => {
      const field = Array.isArray(item.loc) ? item.loc[item.loc.length - 1] : null;
      const label = FIELD_LABELS[field] || field || "Campo";
      return item.type === "missing"
        ? `${label}: campo obrigatório.`
        : `${label}: valor inválido.`;
    });
    return messages.join(" ");
  }

  if (typeof detail === "string" && detail) return detail;
  return `Erro ${status}. Tente novamente.`;
}

export default function ReportPage() {
  const navigate = useNavigate();

  const [media, setMedia] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [locationStatus, setLocationStatus] = useState("");
  const [locationFailed, setLocationFailed] = useState(false);
  const [type, setType] = useState(REPORT_TYPES[0].value);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Guarda a última geocodificação (endereço + promise). Evita consultar o
  // Nominatim duas vezes (blur + submit) e respeita o limite de 1 req/s.
  const geocodeCache = useRef({ address: null, promise: null });

  // Libera a URL temporária da pré-visualização ao trocar a mídia ou sair da página.
  useEffect(() => {
    return () => {
      if (mediaPreview) URL.revokeObjectURL(mediaPreview);
    };
  }, [mediaPreview]);

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    setError("");

    if (!file) {
      setMedia(null);
      setMediaPreview(null);
      return;
    }

    if (!ALLOWED_MEDIA_TYPES.includes(file.type)) {
      setError("Formato não suportado. Use JPG, PNG, WEBP ou MP4.");
      e.target.value = "";
      setMedia(null);
      setMediaPreview(null);
      return;
    }

    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setError(`Arquivo muito grande. O limite é ${MAX_FILE_SIZE_MB}MB.`);
      e.target.value = "";
      setMedia(null);
      setMediaPreview(null);
      return;
    }

    setMedia(file);
    setMediaPreview(URL.createObjectURL(file));
  };

  const fetchCoordinates = async (address) => {
    const params = new URLSearchParams({
      q: `${address}, Arapiraca, AL, Brasil`,
      format: "jsonv2",
      limit: "1",
      countrycodes: "br",
      viewbox: ARAPIRACA_VIEWBOX,
      bounded: "1",
    });
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?${params.toString()}`,
      { headers: { Accept: "application/json" } }
    );

    if (response.status === 429) {
      throw new Error("Muitas buscas seguidas. Aguarde alguns segundos e tente novamente.");
    }

    const results = await response.json().catch(() => []);

    if (!response.ok || !Array.isArray(results) || results.length === 0) {
      throw new Error("Não encontramos esse endereço em Arapiraca. Tente incluir o nome da rua ou do bairro.");
    }

    return {
      latitude: Number(results[0].lat),
      longitude: Number(results[0].lon),
    };
  };

  const geocodeLocation = (rawAddress) => {
    const address = rawAddress.trim();
    if (!address) {
      return Promise.reject(new Error("Informe a localização da denúncia."));
    }

    const cache = geocodeCache.current;
    if (cache.address === address && cache.promise) {
      return cache.promise;
    }

    const promise = fetchCoordinates(address).catch((err) => {
      // Não guarda falhas: permite tentar de novo com o mesmo texto.
      if (geocodeCache.current.promise === promise) {
        geocodeCache.current = { address: null, promise: null };
      }
      if (err instanceof TypeError) throw new Error(NETWORK_ERROR_MESSAGE);
      throw err;
    });

    geocodeCache.current = { address, promise };
    return promise;
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
    setLocationStatus("");
    setLocationFailed(false);
  };

  const handleLocationBlur = async () => {
    if (location.trim().length < LOCATION_MIN) {
      setLocationStatus("");
      setLocationFailed(false);
      return;
    }

    setLocationFailed(false);
    setLocationStatus("Buscando localização...");
    try {
      await geocodeLocation(location);
      setLocationStatus("Localização encontrada");
    } catch (err) {
      setLocationFailed(true);
      setLocationStatus(err.message);
    }
  };

  const redirectToLogin = () => {
    UserService.logout();
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    // A API exige usuário autenticado: sem token, manda para o login.
    const token = UserService.getToken();
    if (!token) {
      redirectToLogin();
      return;
    }

    const trimmedDescription = description.trim();
    const trimmedLocation = location.trim();

    if (!media) {
      setError("Adicione uma foto ou vídeo do problema.");
      return;
    }
    if (trimmedDescription.length < DESCRIPTION_MIN) {
      setError(`A descrição precisa ter pelo menos ${DESCRIPTION_MIN} caracteres.`);
      return;
    }
    if (trimmedLocation.length < LOCATION_MIN) {
      setError(`A localização precisa ter pelo menos ${LOCATION_MIN} caracteres.`);
      return;
    }

    setLoading(true);

    try {
      const coordinates = await geocodeLocation(trimmedLocation);

      const formData = new FormData();
      formData.append("descricao", trimmedDescription);
      formData.append("localizacao", trimmedLocation);
      formData.append("tipo", type);
      formData.append("latitude", coordinates.latitude);
      formData.append("longitude", coordinates.longitude);
      formData.append("midia", media);

      const baseUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
      const response = await fetch(`${baseUrl}/api/v1/ocorrencias/`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (response.status === 401) {
        redirectToLogin();
        return;
      }

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(formatApiError(data, response.status));
      }

      setSuccess("Denúncia registrada com sucesso! Redirecionando...");
      setDescription("");
      setLocation("");
      setLocationStatus("");
      setLocationFailed(false);
      setType(REPORT_TYPES[0].value);
      setMedia(null);
      setMediaPreview(null);
      geocodeCache.current = { address: null, promise: null };

      setTimeout(() => {
        navigate("/registros");
      }, 1000);
    } catch (err) {
      if (err instanceof TypeError) {
        setError(NETWORK_ERROR_MESSAGE);
      } else {
        setError(err.message || "Erro ao registrar denúncia. Tente novamente.");
      }
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
            <i className="bi bi-camera-fill" aria-hidden="true"></i>
            <span>
              {media ? "Trocar foto ou vídeo" : "Adicionar foto ou vídeo do problema"}
            </span>
            <input
              id="media"
              className="visually-hidden"
              type="file"
              accept={ALLOWED_MEDIA_TYPES.join(",")}
              onChange={handleMediaChange}
            />
          </label>
          <small className="field-hint">
            JPG, PNG, WEBP ou MP4, até {MAX_FILE_SIZE_MB}MB.
          </small>

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
            minLength={DESCRIPTION_MIN}
            maxLength={DESCRIPTION_MAX}
            placeholder="Descreva o problema com detalhes (ex: falta de água há 3 dias, entulho na calçada...)"
          />
          <small className="field-hint">
            {description.length}/{DESCRIPTION_MAX}
          </small>
        </div>

        {/* Localização */}
        <div className="input-group">
          <label htmlFor="location">Localização</label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={handleLocationChange}
            onBlur={handleLocationBlur}
            required
            minLength={LOCATION_MIN}
            maxLength={LOCATION_MAX}
            placeholder="Ex: Rua Primavera, próximo ao mercado"
          />
          {locationStatus && (
            <span
              className={`location-status${locationFailed ? " location-status--error" : ""}`}
              role={locationFailed ? "alert" : "status"}
            >
              {locationStatus}
            </span>
          )}
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Enviando..." : "Registrar Denúncia"}
        </button>

        {success && <div className="report-success" role="status">{success}</div>}
        {error && <div className="report-error" role="alert">{error}</div>}
      </form>

      <BottomNav />
    </div>
  );
}
