import UserService from "./userService";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

/**
 * O token expira em 30 minutos e o projeto não tem refresh token. Como a tela
 * de notificações consulta a API sozinha, a expiração vira erro visível: aqui
 * ela é traduzida em `erro.sessaoExpirada`, para quem chamou mandar o usuário
 * de volta ao login em vez de mostrar uma lista vazia sem explicação.
 */
async function request(caminho, options = {}) {
  const token = UserService.getToken();

  const response = await fetch(`${API_BASE_URL}/api/v1/notificacoes${caminho}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  if (response.status === 401) {
    UserService.logout();
    const erro = new Error("Sua sessão expirou. Entre novamente.");
    erro.sessaoExpirada = true;
    throw erro;
  }

  if (!response.ok) {
    const dados = await response.json().catch(() => ({}));
    const erro = new Error(dados?.detail || `Erro ${response.status}`);
    erro.status = response.status;
    throw erro;
  }

  return await response.json();
}

export const NotificacaoService = {
  async listar(apenasNaoLidas = false) {
    const query = apenasNaoLidas ? "?apenas_nao_lidas=true" : "";
    return await request(`/${query}`);
  },

  async contarNaoLidas() {
    const dados = await request("/nao-lidas");
    return dados.nao_lidas;
  },

  async marcarComoLida(notificacaoId) {
    return await request(`/${notificacaoId}/lida`, { method: "PATCH" });
  },
};

export default NotificacaoService;
