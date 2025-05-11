import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import "./Header.scss";
import logoTransparent from "@asset/footballay_logo_transparent.png";

function Header() {
  const location = useLocation();
  return (
    <header className="main-header">
      <div className="main-header-wrapper">
        <div className="header-left">
          <Link to="/" className="app-title-link">
            <img
              src={logoTransparent}
              alt="Footballay Logo"
              className="logo-header"
            />
            <span className="app-title">Footballay</span>
          </Link>
        </div>
        <nav className="header-center">
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>
            소개
          </Link>
          <a
            href="https://footballay.gitbook.io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            사용법{" "}
            <FontAwesomeIcon
              icon={faUpRightFromSquare}
              style={{ fontSize: "0.95em", marginLeft: "0.3em" }}
            />
          </a>
          <Link
            to="/download"
            className={location.pathname === "/download" ? "active" : ""}
          >
            다운로드
          </Link>
        </nav>
        <div className="header-right"> </div>
      </div>
    </header>
  );
}

export default Header;
