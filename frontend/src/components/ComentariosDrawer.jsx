import { useState, useEffect } from "react";
import { OcorrenciaService } from "../services/ocorrenciaService";
import "./ComentariosDrawer.css";

export default function ComentariosDrawer({ ocorrenciaId, onClose }) {
  const [comentarios, setComentarios] = useState([]);
  const [novoTexto, setNovoTexto] = useState("");
  const [loading, setLoading] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState(null);

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
            comentarios.map((c) => (
              <div key={c.id} className="comentario-item">
                <p className="comentario-texto">{c.texto}</p>
                <span className="comentario-data">
                  {new Date(c.created_at).toLocaleDateString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
            ))
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