import { useEffect, useState } from "react";
import "./ProfilePage.css";
import BottomNav from "../src/components/BottomNav";
import { useNavigate } from "react-router-dom";
import UserService from "../src/services/userService";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [ocorrencias, setOcorrencias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";
  const user = UserService.getUser();
  const userName = user?.nome_completo ? user.nome_completo.split(" ")[0] : "Usuário";

  useEffect(() => {
    async function carregarDados() {
      setLoading(true);
      setError("");

      try {
        const data = await UserService.getMinhasOcorrencias();
        setOcorrencias(Array.isArray(data) ? data : []);
      } catch (err) {
        if (err.status === 401) {
          UserService.logout();
          navigate("/login");
          return;
        }
        setError(err.message || "Erro ao carregar histórico.");
      } finally {
        setLoading(false);
      }
    }

    carregarDados();
  }, [navigate]);

  const midias = ocorrencias.filter((item) => Boolean(item.midia_url));

  const formatMediaUrl = (url) => {
    if (!url) return "";
    return url.startsWith("http") ? url : `${baseUrl}${url}`;
  };

  const getStatusStyle = (status) => {
    const normalized = (status || "").toLowerCase();
    if (normalized === "resolvido") {
      return { background: "#d1fae5", color: "#065f46" };
    }
    if (normalized.includes("análise") || normalized.includes("analise")) {
      return { background: "#dbeafe", color: "#1e40af" };
    }
    return { background: "#fef3c7", color: "#92400e" };
  };

  return (
    <div className="profile-page">
      <BottomNav />

      <div className="profile-header">
        <span className="back" onClick={() => navigate(-1)}>
          <i className="bi bi-arrow-left"></i>
        </span>

        <div className="profile-avatar-container">
          <img src="/user.png" alt="Usuário" className="profile-avatar" />
          <button className="edit-avatar" onClick={() => navigate("/editar-perfil")}>
            <i className="bi bi-pencil-fill"></i>
          </button>
        </div>

        <h1 className="name">{userName}</h1>
      </div>

      <div className="profile-card">
        <div className="stats">
          <div className="stat">
            <i className="bi bi-camera-fill"></i>
            <h3>{midias.length}</h3>
            <p>mídias enviadas</p>
          </div>

          <div className="stat">
            <i className="bi bi-fire"></i>
            <h3>{ocorrencias.length}</h3>
            <p>registros feitos</p>
          </div>

          <div className="stat">
            <i className="bi bi-list"></i>
            <h3>
              {ocorrencias.filter((o) => (o.status || "").toLowerCase() === "resolvido").length}
            </h3>
            <p>solicitações resolvidas</p>
          </div>
        </div>

        <p className="bio">
          Transformando o nosso bairro através da tecnologia e da união. Meu objetivo é
          ajudar a identificar focos de água parada, acúmulo de lixo e falhas de infraestrutura,
          garantindo que os moradores tenham voz e que as melhorias cheguem até as nossas ruas.
        </p>
      </div>

      {loading && (
        <p style={{ textAlign: "center", margin: "20px 0", color: "#666" }}>
          Carregando ocorrências...
        </p>
      )}

      {error && (
        <p style={{ textAlign: "center", margin: "20px 0", color: "#dc2626" }}>
          {error}
        </p>
      )}

      {!loading && !error && (
        <>
          {/* Seção: Meus registros */}
          <section className="gallery-section">
            <div className="section-header">
              <h2>Meus registros ({ocorrencias.length})</h2>
            </div>

            {ocorrencias.length === 0 ? (
              <p style={{ padding: "0 16px", color: "#777" }}>
                Você ainda não registrou nenhuma denúncia.
              </p>
            ) : (
              <div
                className="gallery-row"
                style={{
                  display: "flex",
                  gap: "12px",
                  overflowX: "auto",
                  padding: "4px 0",
                }}
              >
                {ocorrencias.map((item) => {
                  const style = getStatusStyle(item.status);
                  return (
                    <div
                      key={item.id}
                      className="gallery-card"
                      style={{
                        minWidth: "220px",
                        maxWidth: "260px",
                        padding: "12px",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                        background: "#fff",
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <strong style={{ textTransform: "capitalize", fontSize: "0.9rem" }}>
                          {item.tipo}
                        </strong>
                        <span
                          style={{
                            fontSize: "0.75rem",
                            padding: "2px 8px",
                            borderRadius: "12px",
                            fontWeight: 600,
                            ...style,
                          }}
                        >
                          {item.status}
                        </span>
                      </div>

                      <p
                        style={{
                          fontSize: "0.85rem",
                          color: "#4b5563",
                          margin: "4px 0",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {item.descricao}
                      </p>

                      <small style={{ color: "#6b7280", fontSize: "0.75rem" }}>
                        📍 {item.localizacao}
                      </small>
                      <small style={{ color: "#9ca3af", fontSize: "0.7rem" }}>
                        {new Date(item.created_at).toLocaleDateString("pt-BR")}
                      </small>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* Seção: Mídias */}
          <section className="gallery-section">
            <div className="section-header">
              <h2>Mídias ({midias.length})</h2>
            </div>

            {midias.length === 0 ? (
              <p style={{ padding: "0 16px", color: "#777" }}>
                Nenhuma foto ou vídeo anexado.
              </p>
            ) : (
              <div
                className="media-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))",
                  gap: "8px",
                }}
              >
                {midias.map((item) => (
                  <div
                    key={item.id}
                    className="media-card"
                    style={{
                      height: "100px",
                      borderRadius: "8px",
                      overflow: "hidden",
                    }}
                  >
                    {item.midia_url.endsWith(".mp4") ? (
                      <video
                        src={formatMediaUrl(item.midia_url)}
                        controls
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    ) : (
                      <img
                        src={formatMediaUrl(item.midia_url)}
                        alt={item.descricao}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}