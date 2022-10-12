import React, { useState, useEffect } from "react";
import styled from "styled-components";
import logo from "../assets/logo.svg";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { link, links } from "../utils/constant";
import CartButtons from "./CartButtons";
import { useProductsContext } from "../context/products_context";
import { motion } from "framer-motion";
import { FaMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa";
import "../index.css";

const getStorageTheme = () => {
  let theme = "light-time";
  if (localStorage.getItem("theme")) {
    theme = localStorage.getItem("theme");
  }
  return theme;
};

const Navbar = () => {
  const { openSidebar } = useProductsContext();

  // dark mode
  const [theme, setTheme] = useState(getStorageTheme());

  const toggleTheme = () => {
    if (theme === "dark-theme") {
      setTheme("light-theme");
    } else {
      setTheme("dark-theme");
    }
  };

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);
  return (
    <NavContainer>
      <div className="nav-center">
        <div className="nav-header">
          {/* change icon */}

          <button
            id="btn"
            onClick={toggleTheme}
            className={`${theme === "dark-theme" ? "show" : "hidden"}`}
          >
            <FaMoon />
          </button>

          <button
            id="btn"
            className={`${theme === "dark-theme" ? "hidden" : "show"}`}
            onClick={toggleTheme}
          >
            <FaSun color="yellow" />
          </button>

          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
          <button type="button" className="nav-toggle" onClick={openSidebar}>
            <FaBars />
          </button>
        </div>
        <ul className="nav-links">
          {links.map((link) => {
            const { id, text, url } = link;
            return (
              <motion.li key={id}>
                <Link to={url}>{text}</Link>
              </motion.li>
            );
          })}
        </ul>
        <CartButtons />
      </div>
    </NavContainer>
  );
};

const NavContainer = styled.nav`
  .hidden {
    display: none;
  }
  .show {
    display: block;
  }
  #btn {
    background: var(--clr-primary);
    color: var(--clr-bcg);
    padding: 0.25rem 0.5rem;
    border-radius: 5px;
    border-color: transparent;
    text-transform: capitalize;
    transition: all 0.3s linear;
    font-weight: bold;
    letter-spacing: 2px;
    cursor: pointer;
    font-size: 18px;
    padding: 0 1rem;
  }
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  .nav-center {
    width: 90vw;
    margin: 0 auto;
    max-width: var(--max-width);
  }
  .nav-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      width: 175px;
      margin-left: -15px;
    }
  }
  .nav-toggle {
    background: transparent;
    border: transparent;

    color: var(--clr-primary-5);
    cursor: pointer;
    svg {
      font-size: 2rem;
    }
  }
  .nav-links {
    display: none;
  }
  .cart-btn-wrapper {
    display: none;
  }
  @media (min-width: 992px) {
    .nav-toggle {
      display: none;
    }
    .nav-center {
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
    }
    .nav-links {
      display: flex;
      justify-content: center;
      li {
        margin: 0 0.5rem;
      }
      a {
        color: var(--clr-grey-3);
        font-size: 1rem;
        text-transform: capitalize;
        letter-spacing: var(--spacing);
        padding: 0.5rem;
        &:hover {
          border-bottom: 2px solid var(--clr-primary-7);
        }
      }
    }
    .cart-btn-wrapper {
      display: grid;
    }
  }
`;

export default Navbar;
