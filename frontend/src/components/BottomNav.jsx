import { NavLink } from "react-router-dom";
import "./BottomNav.css";

export default function BottomNav() {
  return (
    <nav className="bottom-nav">

      <NavLink
        to="/home"
        className={({ isActive }) =>
          isActive ? "nav-item active" : "nav-item"
        }
      >
        <i className="bi bi-house"></i>
        
      </NavLink>

      <NavLink
        to="/relatos"
        className={({ isActive }) =>
          isActive ? "nav-item active" : "nav-item"
        }
      >
        <i className="bi bi-map"></i>
      </NavLink>

      <NavLink
        to="/denuncias"
        className={({ isActive }) =>
          isActive ? "nav-item active" : "nav-item"
        }
      >
        <i className="bi bi-plus-circle"></i>
      </NavLink>

      <NavLink
        to="/aprender"
        className={({ isActive }) =>
          isActive ? "nav-item active" : "nav-item"
        }
      >
        <i className="bi bi-journal-check"></i>
      </NavLink>

      <NavLink
        to="/perfil"
        className={({ isActive }) =>
          isActive ? "nav-item active" : "nav-item"
        }
      >
        <i className="bi bi-person"></i>
      </NavLink>

    </nav>
  );
}