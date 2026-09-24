import { useState, useEffect } from "react";
import { NotificacaoService } from "../services/notificacaoService";
import "./NotificacoesDrawer.css";

// O `tipo` vindo da API decide o ícone. Eventos novos só precisam de uma
// entrada aqui — o backend não muda.
const ICONE_POR_TIPO = {
  status_alterado: "bi-arrow-repeat",
};

function iconeDe(tipo) {
  return ICONE_POR_TIPO[tipo] || "bi-bell";
}

function formatarData(valor) {
  return new Date(valor).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function NotificacoesDrawer({ onClose, onMudanca, onSessaoExpirada }) {
  const [notificacoes, setNotificacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function carregar() {
      try {
        const dados = await NotificacaoService.listar();
        setNotificacoes(dados);
      } catch (err) {
        if (err.sessaoExpirada) {
          onSessaoExpirada?.();
          return;
        }
        console.error(err);
        setErro("Não foi possível carregar suas notificações. Tente novamente.");
      } finally {
        setLoading(false);
      }
    }
    carregar();
  }, [onSessaoExpirada]);

  const handleMarcarLida = async (notificacao) => {
    if (notificacao.lida) return;

    // Atualiza a tela na hora e confirma com a API em seguida.
    setNotificacoes((atuais) =>
      atuais.map((n) => (n.id === notificacao.id ? { ...n, lida: true } : n))
    );

    try {
      await NotificacaoService.marcarComoLida(notificacao.id);
      onMudanca?.();
    } catch (err) {
      if (err.sessaoExpirada) {
        onSessaoExpirada?.();
        return;
      }
      console.error(err);
      // Desfaz a marcação otimista, já que a API recusou.
      setNotificacoes((atuais) =>
        atuais.map((n) => (n.id === notificacao.id ? { ...n, lida: false } : n))
      );
      setErro("Não foi possível marcar como lida. Tente novamente.");
    }
  };

  return (
    <div className="notif-overlay" onClick={onClose}>
      <div className="notif-content" onClick={(e) => e.stopPropagation()}>
        <div className="notif-header">
          <h3>Notificações</h3>
          <button className="notif-close" onClick={onClose} aria-label="Fechar notificações">
            ✕
          </button>
        </div>

        <div className="notif-list">
          {loading ? (
            <p className="notif-status">Carregando notificações...</p>
          ) : notificacoes.length === 0 ? (
            <p className="notif-status">
              Nenhuma notificação por enquanto. Você é avisado aqui quando o
              status de uma denúncia sua mudar.
            </p>
          ) : (
            notificacoes.map((n) => (
              <button
                key={n.id}
                type="button"
                className={n.lida ? "notif-item" : "notif-item nao-lida"}
                onClick={() => handleMarcarLida(n)}
              >
                <i className={`bi ${iconeDe(n.tipo)} notif-icone`}></i>
                <span className="notif-corpo">
                  <span className="notif-mensagem">{n.mensagem}</span>
                  <span className="notif-data">{formatarData(n.created_at)}</span>
                </span>
                {!n.lida && <span className="notif-ponto" aria-label="Não lida"></span>}
              </button>
            ))
          )}
        </div>

        {erro && <p className="notif-status notif-erro">{erro}</p>}
      </div>
    </div>
  );
}
