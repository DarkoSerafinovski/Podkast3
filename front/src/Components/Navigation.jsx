import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Navigation.css";

const Navigation = () => {
  const navigate = useNavigate();

  // Uloga korisnika iz sessionStorage
  const role = sessionStorage.getItem("userRole") || "viewer";

  // Funkcija za logout
  const handleLogout = () => {
    sessionStorage.clear(); // Briše sve podatke iz sessionStorage
    navigate("/"); // Preusmerava na login stranicu
  };

  // Navigacija za različite uloge
  const navItems = {
    admin: [
      { name: "Podkasti i Epizode", path: "/podkasti" },
      { name: "Korisnici", path: "/korisnici" },
      { name: "Kategorije Podkasta", path: "/kategorije" },
      { name: "Spotify", path: "/spotify" },
    ],
    creator: [
      { name: "Svi Podkasti", path: "/podkasti" },
      { name: "Naš Nalog", path: "/my-account" },
      { name: "Spotify", path: "/spotify" },
    ],
    viewer: [
      { name: "Svi Podkasti", path: "/podkasti" },
      { name: "Omiljeni Podkasti", path: "/omiljeni-podkasti" },
      { name: "Spotify", path: "/spotify" },
    ],
  };

  const getNavItems = () => {
    switch (role) {
      case "admin":
        return navItems.admin;
      case "creator":
        return navItems.creator;
      case "viewer":
        return navItems.viewer;
      default:
        return [];
    }
  };

  return (
    <nav className="navigation">
      <div className="nav-left">
        <h1 className="nav-logo">Podkast Platforma</h1>
      </div>
      <ul className="nav-links">
        {getNavItems().map((item, index) => (
          <li key={index} className="nav-item">
            <Link to={item.path} className="nav-link">
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="nav-right">
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
