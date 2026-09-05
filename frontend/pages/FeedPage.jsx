import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { OcorrenciaService } from "../src/services/ocorrenciaService";
import ComentariosDrawer from "../src/components/ComentariosDrawer";
import BottomNav from "../src/components/BottomNav";
import "./FeedPage.css";

export default function FeedPage() {
  const navigate = useNavigate();
  const [ocorrencias, setOcorrencias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busca, setBusca] = useState("");
  const [activeOcorrenciaId, setActiveOcorrenciaId] = useState(null);
  const [showFabMenu, setShowFabMenu] = useState(false);

  // Armazena no navegador quais denúncias este usuário já curtiu
  const [likedPosts, setLikedPosts] = useState(() => {
    try {
      const salvos = localStorage.getItem("@saee_curtidas");
      return salvos ? JSON.parse(salvos) : [];
    } catch {
      return [];
    }
  });

  const baseUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

  useEffect(() => {
    let isMounted = true;

    async function carregarFeed() {
      try {
        const data = await OcorrenciaService.listarTodas();
        if (isMounted) {
          // Deduplicação estrita por ID para evitar duplicatas visuais
          const listaUnica = Array.isArray(data)
            ? Array.from(new Map(data.map((item) => [item.id, item])).values())
            : [];
          setOcorrencias(listaUnica);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Erro ao carregar o feed.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    carregarFeed();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleCurtir = async (id) => {
  // Se o usuário já curtiu este post, bloqueia qualquer nova chamada
  if (likedPosts.includes(id)) {
    return;
  }

  // 1. Marca imediatamente como curtido no estado e no localStorage
  const novasCurtidas = [...likedPosts, id];
  setLikedPosts(novasCurtidas);
  localStorage.setItem("@saee_curtidas", JSON.stringify(novasCurtidas));

  // 2. Atualização otimista do contador na tela (+1)
  setOcorrencias((prev) =>
    prev.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          curtidas: (item.curtidas || 0) + 1,
        };
      }
      return item;
    })
  );

  // 3. Envia a requisição para a API uma única vez
  try {
    const atualizada = await OcorrenciaService.curtir(id);
    // Sincroniza com o valor real retornado do banco
    if (atualizada && typeof atualizada.curtidas === "number") {
      setOcorrencias((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, curtidas: atualizada.curtidas } : item
        )
      );
    }
  } catch (err) {
    console.error("Falha ao salvar curtida no servidor:", err);
  }
};

  const getTipoStyle = (tipo) => {
    switch (tipo?.toLowerCase()) {
      case "esgoto":
        return { background: "#c83e1c" };
      case "agua":
        return { background: "#06b6d4" };
      case "lixo":
        return { background: "#eab308" };
      default:
        return { background: "#10b981" };
    }
  };

  const getTempoDecorrido = (dataStr) => {
    if (!dataStr) return "Recentemente";
    const horas = Math.floor((new Date() - new Date(dataStr)) / (1000 * 60 * 60));
    return horas <= 0 ? "Agora há pouco" : `Há ${horas} horas`;
  };

  const ocorrenciasFiltradas = ocorrencias.filter((o) =>
    o.descricao?.toLowerCase().includes(busca.toLowerCase()) ||
    o.localizacao?.toLowerCase().includes(busca.toLowerCase()) ||
    o.tipo?.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="feed-container">
      {/* Barra de Pesquisa */}
      <div className="feed-search-box">
        <i className="bi bi-search"></i>
        <input
          type="text"
          placeholder="Buscar problemas na sua região..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <button className="filter-btn" aria-label="Filtrar">
          <i className="bi bi-sliders"></i>
        </button>
      </div>

      <div className="feed-header-actions">
        <span className="ver-mais">ver mais</span>
      </div>

      {/* Lista de Cards */}
      <div className="feed-list">
        {loading && <p className="feed-status">Carregando denúncias...</p>}
        {error && <p className="feed-status" style={{ color: "#dc2626" }}>{error}</p>}

        {!loading && !error && ocorrenciasFiltradas.length === 0 && (
          <p className="feed-status">Nenhuma ocorrência encontrada.</p>
        )}

        {!loading &&
          !error &&
          ocorrenciasFiltradas.map((item) => {
            const curtiu = likedPosts.includes(item.id);

            return (
              <article key={item.id} className="feed-card">
                <header className="card-top">
                  <img src="/user.png" alt="Avatar" className="user-icon" />
                  <div className="user-info">
                    <h4>Cidadão</h4>
                    <small className="time-text">{getTempoDecorrido(item.created_at)}</small>
                    <p className="loc-text">{item.localizacao}</p>
                  </div>
                  <span className="badge-tipo" style={getTipoStyle(item.tipo)}>
                    {item.tipo}
                  </span>
                </header>

                <p className="card-desc">{item.descricao}</p>

                {item.midia_url && (
                  <div className="media-preview-area">
                    {item.midia_url.endsWith(".mp4") ? (
                      <video src={`${baseUrl}${item.midia_url}`} controls />
                    ) : (
                      <img src={`${baseUrl}${item.midia_url}`} alt="Mídia da ocorrência" />
                    )}
                  </div>
                )}

                <footer className="card-actions">
                  <button
                        className={`btn-action ${curtiu ? "active-like" : ""}`}
                        onClick={() => handleCurtir(item.id)}
                        disabled={curtiu}
                    >
                    <i className={`bi ${curtiu ? "bi-hand-thumbs-up-fill" : "bi-hand-thumbs-up"}`}></i>{" "}
                    {item.curtidas || 0} curtidas
                </button>

                  <button
                    className="btn-action"
                    onClick={() => setActiveOcorrenciaId(item.id)}
                  >
                    <i className="bi bi-chat-left"></i> Comentários
                  </button>

                  <button
                    className="btn-action"
                    onClick={() => navigator.clipboard?.writeText(window.location.href)}
                  >
                    <i className="bi bi-share"></i> compartilhar
                  </button>
                </footer>
              </article>
            );
          })}
      </div>

      {/* Botões Flutuantes (FAB) */}
      <div className="fab-wrapper">
        {showFabMenu && (
          <div className="fab-options">
            <button onClick={() => navigate("/denuncias")} className="fab-pill">
              Criar Registro
            </button>
            <button onClick={() => navigate("/perfil")} className="fab-pill">
              Histórico de Registros
            </button>
          </div>
        )}
        <button
          className="fab-main-btn"
          onClick={() => setShowFabMenu(!showFabMenu)}
          aria-label="Opções de registro"
        >
          <i className={`bi ${showFabMenu ? "bi-x-lg" : "bi-plus-lg"}`}></i>
        </button>
      </div>

      {/* Gaveta de Comentários */}
      {activeOcorrenciaId && (
        <ComentariosDrawer
          ocorrenciaId={activeOcorrenciaId}
          onClose={() => setActiveOcorrenciaId(null)}
        />
      )}

      <BottomNav />
    </div>
  );
}