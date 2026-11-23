// @vitest-environment jsdom

import { beforeEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

function setup() {
  render(
    <MemoryRouter initialEntries={["/admin"]}>
      <Routes>
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <div>PAINEL ADMINISTRATIVO</div>
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<div>LOGIN</div>} />
        <Route path="/home" element={<div>HOME</div>} />
      </Routes>
    </MemoryRouter>
  );
}

describe("ProtectedRoute", () => {
  beforeEach(() => {
    cleanup();
    localStorage.clear();
  });

  it("redireciona visitante sem login para a pagina de login", () => {
    setup();
    expect(screen.getByText("LOGIN")).toBeTruthy();
  });

  it("redireciona usuario comum para a home", () => {
    localStorage.setItem("token", "token-comum");
    localStorage.setItem("user", JSON.stringify({ is_admin: false }));
    setup();
    expect(screen.getByText("HOME")).toBeTruthy();
  });

  it("permite acesso ao usuario administrador", () => {
    localStorage.setItem("token", "token-admin");
    localStorage.setItem("user", JSON.stringify({ is_admin: true }));
    setup();
    expect(screen.getByText("PAINEL ADMINISTRATIVO")).toBeTruthy();
  });
});
