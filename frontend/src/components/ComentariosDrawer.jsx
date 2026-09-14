import { useState, useEffect } from "react";
import { OcorrenciaService } from "../services/ocorrenciaService";
import UserService from "../services/userService";
import "./ComentariosDrawer.css";

// Paleta fixa para o avatar, escolhida a partir do nome (mesma pessoa = mesma cor sempre)
const CORES_AVATAR = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#06b6d4"];

function corParaNome(nome) {
  const soma = nome.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return CORES_AVATAR[soma % CORES_AVATAR.length];
}

function inicial(nome) {
  return nome?.trim()?.charAt(0)?.toUpperCase() || "?";
}

export default function ComentariosDrawer({ ocorrenciaId, onClose }) {
  const [comentarios, setComentarios] = useState([]);
  const [novoTexto, setNovoTexto] = useState("");
  const [loading, setLoading] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState(null);
  const usuarioAtual = UserService.getUser();

  useEffect(() => {
    async function carregar() {
      try {
        const dados = await OcorrenciaService.listarComentarios(ocorrenciaId);
        setComentarios(dados);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    carregar();
  }, [ocorrenciaId]);

  const handleEnviar = async (e) => {
    e.preventDefault();
    if (!novoTexto.trim() || enviando) return;

    setEnviando(true);
    setErro(null);
    try {
      await OcorrenciaService.adicionarComentario(ocorrenciaId, novoTexto.trim());
      setNovoTexto("");
      const dados = await OcorrenciaService.listarComentarios(ocorrenciaId);
      setComentarios(dados);
    } catch (err) {
      console.error(err);
      setErro("Não foi possível enviar seu comentário. Tente novamente.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer-content" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <h3>Comentários</h3>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="drawer-list">
          {loading ? (
            <p className="status-msg">Carregando comentários...</p>
          ) : comentarios.length === 0 ? (
            <p className="status-msg">Nenhum comentário por enquanto. Escreva o primeiro!</p>
          ) : (
            comentarios.map((c) => {
              const nome = c.nome_usuario || "Cidadão";
              const ehAutor = usuarioAtual && c.usuario_id && usuarioAtual.id === c.usuario_id;
              return (
                <div key={c.id} className="comentario-item">
                  <div
                    className="comentario-avatar"
                    style={{ background: corParaNome(nome) }}
                    aria-hidden="true"
                  >
                    {inicial(nome)}
                  </div>
                  <div className="comentario-corpo">
                    <div className="comentario-topo">
                      <span className="comentario-nome">
                        {nome}
                        {ehAutor && <span className="comentario-badge-voce">Você</span>}
                      </span>
                      <span className="comentario-data">
                        {new Date(c.created_at).toLocaleDateString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                    <p className="comentario-texto">{c.texto}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {erro && <p className="status-msg erro-msg">{erro}</p>}

        <form onSubmit={handleEnviar} className="drawer-form">
          <input
            type="text"
            placeholder="Adicione um comentário..."
            value={novoTexto}
            onChange={(e) => setNovoTexto(e.target.value)}
            disabled={enviando}
            required
          />
          <button type="submit" disabled={enviando}>
            {enviando ? "Enviando..." : "Enviar"}
          </button>
        </form>
      </div>
    </div>
  );
}