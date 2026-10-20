import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, fireEvent, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import ReportPage from "./ReportPage";

vi.mock("../src/components/BottomNav", () => ({ default: () => null }));

const nominatimOk = () => new Response(JSON.stringify([{ lat: "-9.75", lon: "-36.66" }]), { status: 200 });
let fetchMock;
function setup() {
  return render(
    <MemoryRouter initialEntries={["/denuncias"]}>
      <Routes>
        <Route path="/denuncias" element={<ReportPage />} />
        <Route path="/login" element={<div>LOGIN</div>} />
        <Route path="/registros" element={<div>FEED</div>} />
      </Routes>
    </MemoryRouter>
  );
}
const file = (name, type, size = 10) => new File([new Uint8Array(size)], name, { type });
async function fill(user, { media = file("a.jpg", "image/jpeg") } = {}) {
  if (media) await user.upload(document.getElementById("media"), media);
  await user.type(screen.getByLabelText("Descrição do ocorrido"), "Esgoto vazando na rua");
  await user.type(screen.getByLabelText("Localização"), "Rua Primavera");
}
beforeEach(() => {
  cleanup(); localStorage.clear();
  globalThis.URL.createObjectURL = vi.fn(() => "blob:x"); globalThis.URL.revokeObjectURL = vi.fn();
  fetchMock = vi.fn(); globalThis.fetch = fetchMock;
});

describe("ReportPage", () => {
  it("sem token redireciona ao login e não faz requisição", async () => {
    const user = userEvent.setup(); setup(); await fill(user);
    fetchMock.mockClear();
    await user.click(screen.getByRole("button", { name: /registrar denúncia/i }));
    expect(await screen.findByText("LOGIN")).toBeTruthy();
    expect(fetchMock).not.toHaveBeenCalledWith(expect.stringContaining("/ocorrencias/"), expect.anything());
  });

  it("exige mídia, com mensagem em português", async () => {
    localStorage.setItem("token", "t");
    const user = userEvent.setup(); setup(); await fill(user, { media: null });
    fetchMock.mockImplementation(async () => nominatimOk());
    await user.click(screen.getByRole("button", { name: /registrar denúncia/i }));
    expect((await screen.findByRole("alert")).textContent).toMatch(/Adicione uma foto ou vídeo/);
    expect(fetchMock.mock.calls.some(c => String(c[0]).includes("/ocorrencias/"))).toBe(false);
  });

  it.each([["f.heic","image/heic"],["f.gif","image/gif"],["f.mov","video/quicktime"]])("rejeita %s no seletor", async (n,t) => {
    const user = userEvent.setup({ applyAccept: false }); setup();
    await user.upload(document.getElementById("media"), file(n,t));
    expect(screen.getByRole("alert").textContent).toMatch(/Formato não suportado/);
  });

  it("rejeita arquivo acima de 10MB", async () => {
    const user = userEvent.setup(); setup();
    await user.upload(document.getElementById("media"), file("a.jpg","image/jpeg", 10*1024*1024+1));
    expect(screen.getByRole("alert").textContent).toMatch(/muito grande/);
  });

  it("geocodifica uma vez (blur + submit) e envia os campos certos", async () => {
    localStorage.setItem("token", "tok");
    fetchMock.mockImplementation(async (url) =>
      String(url).includes("nominatim") ? nominatimOk() : new Response("{}", { status: 201 }));
    const user = userEvent.setup(); setup(); await fill(user);
    await user.tab(); // blur
    await screen.findByText("Localização encontrada");
    await user.click(screen.getByRole("button", { name: /registrar denúncia/i }));
    await screen.findByText("FEED", {}, { timeout: 3000 });
    const nom = fetchMock.mock.calls.filter(c => String(c[0]).includes("nominatim"));
    expect(nom.length).toBe(1);
    expect(String(nom[0][0])).toContain("bounded=1");
    const post = fetchMock.mock.calls.find(c => String(c[0]).includes("/api/v1/ocorrencias/"));
    expect(post[1].headers.Authorization).toBe("Bearer tok");
    const fd = post[1].body;
    expect([...fd.keys()].sort()).toEqual(["descricao","latitude","localizacao","longitude","midia","tipo"]);
    expect(fd.get("tipo")).toBe("esgoto"); expect(fd.get("latitude")).toBe("-9.75");
  });

  it("401 limpa sessão e vai ao login", async () => {
    localStorage.setItem("token", "old");
    fetchMock.mockImplementation(async (url) =>
      String(url).includes("nominatim") ? nominatimOk() : new Response("{}", { status: 401 }));
    const user = userEvent.setup(); setup(); await fill(user);
    await user.click(screen.getByRole("button", { name: /registrar denúncia/i }));
    expect(await screen.findByText("LOGIN")).toBeTruthy();
    expect(localStorage.getItem("token")).toBeNull();
  });

  it("traduz 422 do FastAPI e falha de rede", async () => {
    localStorage.setItem("token", "t");
    fetchMock.mockImplementation(async (url) => String(url).includes("nominatim") ? nominatimOk()
      : new Response(JSON.stringify({ detail: [{ type: "missing", loc: ["body","midia"], msg: "Field required" }] }), { status: 422 }));
    const user = userEvent.setup(); setup(); await fill(user);
    await user.click(screen.getByRole("button", { name: /registrar denúncia/i }));
    expect((await screen.findByRole("alert")).textContent).toBe("Foto ou vídeo: campo obrigatório.");
    fetchMock.mockImplementation(async (url) => { if (String(url).includes("nominatim")) return nominatimOk(); throw new TypeError("Failed to fetch"); });
    await user.click(screen.getByRole("button", { name: /registrar denúncia/i }));
    await waitFor(() => expect(screen.getByRole("alert").textContent).toMatch(/Sem conexão/));
  });

  it("endereço não encontrado mostra erro no campo e permite nova tentativa", async () => {
    fetchMock.mockImplementationOnce(async () => new Response("[]", { status: 200 }));
    const user = userEvent.setup(); setup();
    await user.type(screen.getByLabelText("Localização"), "Rua Inexistente");
    await user.tab();
    expect((await screen.findByRole("alert")).textContent).toMatch(/Não encontramos esse endereço/);
    fetchMock.mockImplementationOnce(async () => nominatimOk());
    await user.click(screen.getByLabelText("Localização")); await user.tab();
    await screen.findByText("Localização encontrada");
  });
});
