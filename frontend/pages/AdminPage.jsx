import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import UserService from "../src/services/userService";
import { OcorrenciaService } from "../src/services/ocorrenciaService";
import "./AdminPage.css";

const CORES_TIPO = {
  esgoto: "#c83e1c",
  agua: "#06b6d4",
  lixo: "#eab308",
  mosquito: "#10b981",
};

const STATUS_POSSIVEIS = ["Aberto", "Em análise", "Resolvido"];

export default function AdminPage() {
  const navigate = useNavigate();
  const [secaoAtiva, setSecaoAtiva] = useState("indicadores"); // "indicadores" | "denuncias"
  const [ocorrencias, setOcorrencias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [checkingAccess, setCheckingAccess] = useState(true);

  // Estados da aba de gerenciamento
  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("Todos");
  const [statusSalvando, setStatusSalvando] = useState(null);

  const baseUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

  useEffect(() => {
    let active = true;

    async function carregarDados() {
      try {
        const token = UserService.getToken();
        if (!token) {
          navigate("/login", { replace: true });
          return;
        }

        const user = await UserService.getCurrentUser();
        if (!user.is_admin) {
          navigate("/home", { replace: true });
          return;
        }
        if (!active) return;
        setAuthorized(true);

        const res = await fetch(`${baseUrl}/api/v1/ocorrencias/admin`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        if (!res.ok) {
          const error = new Error(
            "Erro ao carregar dados das ocorrências administrativas."
          );
          error.status = res.status;
          throw error;
        }

        const data = await res.json();
        if (active) setOcorrencias(Array.isArray(data) ? data : []);
      } catch (err) {
        if (err.status === 401) {
          UserService.logout();
          navigate("/login", { replace: true });
        } else if (err.status === 403) {
          navigate("/home", { replace: true });
        } else if (active) {
          setError(err.message);
        }
      } finally {
        if (active) {
          setCheckingAccess(false);
          setLoading(false);
        }
      }
    }

    carregarDados();
    return () => {
      active = false;
    };
  }, [baseUrl, navigate]);

  if (checkingAccess || !authorized) {
    return null;
  }

  // Alterar status direto na tabela
  const handleAlterarStatus = async (id, novoStatus) => {
    const anterior = ocorrencias.find((o) => o.id === id)?.status;
    if (novoStatus === anterior) return;

    setStatusSalvando(id);
    setOcorrencias((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: novoStatus } : o))
    );

    try {
      const atualizada = await OcorrenciaService.alterarStatus(id, novoStatus);
      setOcorrencias((prev) =>
        prev.map((o) => (o.id === id ? { ...o, status: atualizada.status } : o))
      );
    } catch (err) {
      console.error(err);
      setOcorrencias((prev) =>
        prev.map((o) => (o.id === id ? { ...o, status: anterior } : o))
      );
      alert("Não foi possível alterar o status.");
    } finally {
      setStatusSalvando(null);
    }
  };

  // 1. Indicadores gerais (Total e Status)
  const total = ocorrencias.length;
  const abertas = ocorrencias.filter((o) => o.status === "Aberto").length;
  const emAnalise = ocorrencias.filter((o) => o.status === "Em análise").length;
  const resolvidas = ocorrencias.filter((o) => o.status === "Resolvido").length;

  // 2. Dados agrupados por tipo de ocorrência
  const contagemPorTipo = ocorrencias.reduce((acc, item) => {
    const tipo = item.tipo?.toLowerCase() || "outros";
    acc[tipo] = (acc[tipo] || 0) + 1;
    return acc;
  }, {});

  const dadosGraficoTipo = Object.entries(contagemPorTipo).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
    key: name,
  }));

  // 3. Top 5 locais/bairros com mais ocorrências
  const contagemPorLocal = ocorrencias.reduce((acc, item) => {
    const local = item.localizacao?.trim() || "Não informado";
    acc[local] = (acc[local] || 0) + 1;
    return acc;
  }, {});

  const dadosGraficoBairro = Object.entries(contagemPorLocal)
    .map(([local, quantidade]) => ({ local, quantidade }))
    .sort((a, b) => b.quantidade - a.quantidade)
    .slice(0, 5);

  // Filtragem da tabela de denúncias
  const ocorrenciasFiltradas = ocorrencias.filter((o) => {
    const bateTexto =
      o.descricao?.toLowerCase().includes(busca.toLowerCase()) ||
      o.localizacao?.toLowerCase().includes(busca.toLowerCase()) ||
      o.nome_usuario?.toLowerCase().includes(busca.toLowerCase());
    const bateStatus = filtroStatus === "Todos" || o.status === filtroStatus;
    return bateTexto && bateStatus;
  });

  return (
    <>
      {/* AVISO DE BLOQUEIO PARA DISPOSITIVOS MÓVEIS */}
      <div className="admin-mobile-block">
        <div className="mobile-block-card">
          <i className="bi bi-laptop"></i>
          <h2>Acesso Restrito ao Desktop</h2>
          <p>
            O Painel Administrativo do SAEE está disponível apenas em computadores ou telas maiores.
          </p>
          <button onClick={() => navigate("/home")} className="btn-voltar-home">
            Voltar para a Home
          </button>
        </div>
      </div>

      {/* PAINEL ADMINISTRATIVO (VISÍVEL APENAS EM DESKTOP) */}
      <div className="admin-layout">
        {/* MENU LATERAL (SIDEBAR) */}
        <aside className="admin-sidebar">
          <div className="sidebar-brand">
            <img src="/logoSAEE.png" alt="Logo SAEE" className="sidebar-logo" />
            <span className="sidebar-badge">Admin</span>
          </div>

          <nav className="sidebar-nav">
            <button
              className={`sidebar-item ${secaoAtiva === "indicadores" ? "active" : ""}`}
              onClick={() => setSecaoAtiva("indicadores")}
            >
              <i className="bi bi-pie-chart-fill"></i>
              <span>Indicadores</span>
            </button>

            <button
              className={`sidebar-item ${secaoAtiva === "denuncias" ? "active" : ""}`}
              onClick={() => setSecaoAtiva("denuncias")}
            >
              <i className="bi bi-list-check"></i>
              <span>Gerenciar Denúncias</span>
            </button>
          </nav>

          <div className="sidebar-footer">
            <button className="sidebar-back-btn" onClick={() => navigate("/home")}>
              <i className="bi bi-box-arrow-left"></i>
              <span>Voltar ao App</span>
            </button>
          </div>
        </aside>

        {/* CONTEÚDO PRINCIPAL */}
        <main className="admin-main">
          <div className="admin-container">
            <header className="admin-header">
              <h1>
                {secaoAtiva === "indicadores"
                  ? "Painel Administrativo"
                  : "Gerenciamento de Denúncias"}
              </h1>
              <p>
                {secaoAtiva === "indicadores"
                  ? "Visão geral das ocorrências urbanas de Arapiraca"
                  : "Acompanhe e atualize o status das ocorrências registradas"}
              </p>
            </header>

            {loading && <p className="admin-status">Carregando indicadores...</p>}
            {error && <p className="admin-status erro">{error}</p>}

            {/* SEÇÃO 1: INDICADORES E GRÁFICOS */}
            {!loading && !error && secaoAtiva === "indicadores" && (
              <>
                {/* CARDS DE RESUMO */}
                <section className="kpi-grid">
                  <div className="kpi-card">
                    <div className="kpi-icon total">
                      <i className="bi bi-clipboard-data"></i>
                    </div>
                    <div className="kpi-info">
                      <span className="kpi-label">Total de Ocorrências</span>
                      <strong className="kpi-value">{total}</strong>
                    </div>
                  </div>

                  <div className="kpi-card">
                    <div className="kpi-icon aberto">
                      <i className="bi bi-exclamation-circle"></i>
                    </div>
                    <div className="kpi-info">
                      <span className="kpi-label">Em Aberto</span>
                      <strong className="kpi-value">{abertas}</strong>
                    </div>
                  </div>

                  <div className="kpi-card">
                    <div className="kpi-icon analise">
                      <i className="bi bi-hourglass-split"></i>
                    </div>
                    <div className="kpi-info">
                      <span className="kpi-label">Em Análise</span>
                      <strong className="kpi-value">{emAnalise}</strong>
                    </div>
                  </div>

                  <div className="kpi-card">
                    <div className="kpi-icon resolvido">
                      <i className="bi bi-check-circle"></i>
                    </div>
                    <div className="kpi-info">
                      <span className="kpi-label">Resolvidas</span>
                      <strong className="kpi-value">{resolvidas}</strong>
                    </div>
                  </div>
                </section>

                {/* GRÁFICOS */}
                <section className="charts-grid">
                  {/* Gráfico 1: Top Bairros / Locais */}
                  <div className="chart-box">
                    <h3>Locais com Mais Registros</h3>
                    {dadosGraficoBairro.length === 0 ? (
                      <p className="empty-chart">Sem dados suficientes</p>
                    ) : (
                      <ResponsiveContainer width="100%" height={330}>
                        <BarChart
                          data={dadosGraficoBairro}
                          layout="vertical"
                          margin={{ top: 5, right: 25, left: 10, bottom: 5 }}
                        >
                          <XAxis type="number" allowDecimals={false} />
                          <YAxis
                            type="category"
                            dataKey="local"
                            width={165}
                            interval={0}
                            tick={{ fontSize: 12, fill: "#374151" }}
                            tickFormatter={(valor) =>
                              valor.length > 22 ? `${valor.slice(0, 22)}...` : valor
                            }
                          />
                          <Tooltip
                            formatter={(value) => [`${value} ocorrência(s)`, "Registros"]}
                            labelFormatter={(label) => `Local: ${label}`}
                            wrapperStyle={{
                              maxWidth: "280px",
                              whiteSpace: "normal",
                              zIndex: 1000,
                            }}
                            contentStyle={{
                              borderRadius: "10px",
                              border: "1px solid #e5e7eb",
                              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.12)",
                              fontSize: "13px",
                            }}
                            labelStyle={{
                              whiteSpace: "normal",
                              wordBreak: "break-word",
                              marginBottom: "4px",
                              fontWeight: 600,
                              color: "#1f2937",
                            }}
                          />
                          <Bar
                            dataKey="quantidade"
                            fill="#3461A4"
                            barSize={24}
                            radius={[0, 6, 6, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    )}
                  </div>

                  {/* Gráfico 2: Por Categoria */}
                  <div className="chart-box">
                    <h3>Ocorrências por Tipo</h3>
                    {dadosGraficoTipo.length === 0 ? (
                      <p className="empty-chart">Sem dados suficientes</p>
                    ) : (
                      <ResponsiveContainer width="100%" height={330}>
                        <PieChart>
                          <Pie
                            data={dadosGraficoTipo}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius={65}
                            outerRadius={105}
                            paddingAngle={4}
                          >
                            {dadosGraficoTipo.map((entry) => (
                              <Cell
                                key={entry.key}
                                fill={CORES_TIPO[entry.key] || "#64748b"}
                              />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                </section>
              </>
            )}

            {/* SEÇÃO 2: GERENCIAR DENÚNCIAS */}
            {!loading && !error && secaoAtiva === "denuncias" && (
              <section className="gestao-card">
                <div className="gestao-toolbar">
                  <input
                    type="text"
                    placeholder="Buscar por local, descrição ou cidadão..."
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                  />
                  <select
                    value={filtroStatus}
                    onChange={(e) => setFiltroStatus(e.target.value)}
                  >
                    <option value="Todos">Todos os status</option>
                    {STATUS_POSSIVEIS.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Categoria</th>
                      <th>Localização e Descrição</th>
                      <th>Autor</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ocorrenciasFiltradas.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="empty-table">
                          Nenhuma ocorrência encontrada.
                        </td>
                      </tr>
                    ) : (
                      ocorrenciasFiltradas.map((item) => (
                        <tr key={item.id}>
                          <td className="col-id" title={item.id}>
                            #{String(item.id).slice(0, 8)}
                          </td>
                          <td>
                            <span
                              className="badge-tipo-admin"
                              style={{
                                backgroundColor:
                                  CORES_TIPO[item.tipo?.toLowerCase()] || "#64748b",
                              }}
                            >
                              {item.tipo}
                            </span>
                          </td>
                          <td>
                            <strong>{item.localizacao}</strong>
                            <p className="table-desc">{item.descricao}</p>
                          </td>
                          <td>{item.nome_usuario || "Cidadão"}</td>
                          <td>
                            <select
                              className={`status-select-admin ${
                                item.status === "Resolvido"
                                  ? "resolvido"
                                  : item.status === "Em análise"
                                  ? "analise"
                                  : "aberto"
                              }`}
                              value={item.status || "Aberto"}
                              disabled={statusSalvando === item.id}
                              onChange={(e) =>
                                handleAlterarStatus(item.id, e.target.value)
                              }
                            >
                              {STATUS_POSSIVEIS.map((s) => (
                                <option key={s} value={s}>
                                  {s}
                                </option>
                              ))}
                            </select>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </section>
            )}
          </div>
        </main>
      </div>
    </>
  );
}