import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../services/userService";
import { NotificacaoService } from "../services/notificacaoService";
import NotificacoesDrawer from "./NotificacoesDrawer";
import "./NotificacoesDrawer.css";

export default function SinoNotificacoes() {
  const navigate = useNavigate();
  const [naoLidas, setNaoLidas] = useState(0);
  const [aberto, setAberto] = useState(false);

  const logado = Boolean(UserService.getToken());

  const encerrarSessao = useCallback(() => {
    setAberto(false);
    navigate("/login");
  }, [navigate]);

  // Só busca e trata erro — quem chama decide o que fazer com o número.
  const buscarNaoLidas = useCallback(async () => {
    if (!UserService.getToken()) return null;

    try {
      return await NotificacaoService.contarNaoLidas();
    } catch (err) {
      if (err.sessaoExpirada) {
        encerrarSessao();
        return null;
      }
      console.error("Erro ao contar notificações não lidas:", err);
      return null;
    }
  }, [encerrarSessao]);

  const atualizarContagem = useCallback(async () => {
    const total = await buscarNaoLidas();
    if (total !== null) setNaoLidas(total);
  }, [buscarNaoLidas]);

  // Não há WebSocket no projeto: a contagem é buscada na montagem e de novo
  // quando o painel fecha.
  useEffect(() => {
    let ativo = true;

    async function carregar() {
      const total = await buscarNaoLidas();
      if (ativo && total !== null) setNaoLidas(total);
    }

    carregar();

    return () => {
      ativo = false;
    };
  }, [buscarNaoLidas]);

  if (!logado) return null;

  const handleFechar = () => {
    setAberto(false);
    atualizarContagem();
  };

  return (
    <div className="sino-wrapper">
      <button
        type="button"
        className="sino-btn"
        onClick={() => setAberto(true)}
        aria-label={
          naoLidas > 0 ? `Notificações, ${naoLidas} não lidas` : "Notificações"
        }
      >
        <i className="bi bi-bell"></i>
      </button>

      {naoLidas > 0 && (
        <span className="sino-badge">{naoLidas > 99 ? "99+" : naoLidas}</span>
      )}

      {aberto && (
        <NotificacoesDrawer
          onClose={handleFechar}
          onMudanca={atualizarContagem}
          onSessaoExpirada={encerrarSessao}
        />
      )}
    </div>
  );
}
