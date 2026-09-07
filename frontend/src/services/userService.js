const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

class UserService {
  static async registerUser(userData) {
    const response = await fetch(`${API_BASE_URL}/api/v1/usuarios/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.detail || "Erro ao registrar");
    }

    return await response.json();
  }

  static async loginUser(email, senha) {
    const response = await fetch(`${API_BASE_URL}/api/v1/usuarios/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.detail || "Erro ao fazer login");
    }

    const data = await response.json();
    localStorage.setItem("token", data.access_token);
    localStorage.setItem("user", JSON.stringify(data.user));
    return data;
  }

  // NOVO MÉTODO: busca o histórico de ocorrências do usuário autenticado
  static async getMinhasOcorrencias() {
    const token = this.getToken();

    const response = await fetch(`${API_BASE_URL}/api/v1/usuarios/me/ocorrencias`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const error = new Error(errorData?.detail || `Erro ${response.status}`);
      error.status = response.status;
      throw error;
    }

    return await response.json();
  }

  static logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  static getToken() {
    return localStorage.getItem("token");
  }

  static getUser() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }
}

export default UserService;