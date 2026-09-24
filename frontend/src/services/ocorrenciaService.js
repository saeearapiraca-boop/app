const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export const OcorrenciaService = {
  async listarTodas(localizacao = null) {
    const url = localizacao 
      ? `${API_BASE_URL}/api/v1/ocorrencias/?localizacao=${encodeURIComponent(localizacao)}`
      : `${API_BASE_URL}/api/v1/ocorrencias/`;

    const res = await fetch(url);
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData?.detail || `Erro HTTP: ${res.status}`);
    }
    return await res.json();
  },

  async curtir(ocorrenciaId) {
    const res = await fetch(`${API_BASE_URL}/api/v1/ocorrencias/${ocorrenciaId}/curtir`, {
      method: "POST",
    });
    if (!res.ok) throw new Error("Erro ao curtir ocorrência.");
    return await res.json();
  },

  async listarComentarios(ocorrenciaId) {
    const res = await fetch(`${API_BASE_URL}/api/v1/ocorrencias/${ocorrenciaId}/comentarios`);
    if (!res.ok) throw new Error("Erro ao carregar comentários.");
    return await res.json();
  },

  async adicionarComentario(ocorrenciaId, texto) {
    const res = await fetch(`${API_BASE_URL}/api/v1/ocorrencias/${ocorrenciaId}/comentarios`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ texto }),
    });
    if (!res.ok) throw new Error("Erro ao postar comentário.");
    return await res.json();
  }
};