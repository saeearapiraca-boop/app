import { useState } from "react";
import "./ShareModal.css";

// Cada rede define como a mensagem/link são montados na URL de compartilhamento
const REDES = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    icone: "bi-whatsapp",
    cor: "#25D366",
    montarUrl: ({ texto }) => `https://wa.me/?text=${encodeURIComponent(texto)}`,
  },
  {
    id: "facebook",
    label: "Facebook",
    icone: "bi-facebook",
    cor: "#1877F2",
    montarUrl: ({ url }) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    id: "telegram",
    label: "Telegram",
    icone: "bi-telegram",
    cor: "#26A5E4",
    montarUrl: ({ url, mensagem }) => `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(mensagem)}`,
  },
  {
    id: "x",
    label: "X",
    icone: "bi-twitter-x",
    cor: "#000000",
    montarUrl: ({ texto }) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(texto)}`,
  },
  {
    id: "reddit",
    label: "Reddit",
    icone: "bi-reddit",
    cor: "#FF4500",
    montarUrl: ({ url, mensagem }) => `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(mensagem)}`,
  },
  {
    id: "pinterest",
    label: "Pinterest",
    icone: "bi-pinterest",
    cor: "#E60023",
    montarUrl: ({ url, mensagem }) => `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(mensagem)}`,
  },
];

/**
 * Modal de compartilhamento reutilizável.
 *
 * url        -> link público que será compartilhado (ex: link da ocorrência)
 * mensagem   -> texto curto que descreve o que está sendo compartilhado
 * onClose    -> callback para fechar o modal
 */
export default function ShareModal({ url, mensagem, onClose }) {
  const textoCompleto = `${mensagem}\n${url}`;
  const [textoEditavel, setTextoEditavel] = useState(textoCompleto);
  const [copiado, setCopiado] = useState(false);
  const [mostrarQr, setMostrarQr] = useState(false);

  const handleAbrirRede = (rede) => {
    const link = rede.montarUrl({ url, mensagem, texto: textoEditavel });
    window.open(link, "_blank", "noopener,noreferrer");
  };

  const handleCopiar = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      setCopiado(false);
    }
  };

  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(url)}`;

  return (
    <div className="share-overlay" onClick={onClose}>
      <div className="share-content" onClick={(e) => e.stopPropagation()}>
        <div className="share-header">
          <div>
            <h3>Compartilhe esta ocorrência</h3>
            <p className="share-subtitle">Compartilhe nas redes sociais ou copie o link.</p>
          </div>
          <button className="share-close-btn" onClick={onClose} aria-label="Fechar">✕</button>
        </div>

        <div className="share-icons-row">
          {REDES.map((rede) => (
            <button
              key={rede.id}
              className="share-icon-btn"
              onClick={() => handleAbrirRede(rede)}
              aria-label={`Compartilhar no ${rede.label}`}
            >
              <span className="share-icon-circle" style={{ background: rede.cor }}>
                <i className={`bi ${rede.icone}`}></i>
              </span>
              <span className="share-icon-label">{rede.label}</span>
            </button>
          ))}
        </div>

        <label className="share-field-label" htmlFor="share-mensagem">Mensagem</label>
        <textarea
          id="share-mensagem"
          className="share-textarea"
          value={textoEditavel}
          onChange={(e) => setTextoEditavel(e.target.value)}
          rows={3}
        />

        {mostrarQr && (
          <div className="share-qr-wrapper">
            <img src={qrSrc} alt="QR Code para acessar o link" width={160} height={160} />
          </div>
        )}

        <div className="share-actions-row">
          <button className="share-secondary-btn" onClick={() => setMostrarQr((v) => !v)}>
            <i className="bi bi-qr-code"></i> QRCode
          </button>
          <button className="share-primary-btn" onClick={handleCopiar}>
            <i className={`bi ${copiado ? "bi-check-lg" : "bi-link-45deg"}`}></i>
            {copiado ? "Link copiado!" : "Copiar link"}
          </button>
        </div>
      </div>
    </div>
  );
}
