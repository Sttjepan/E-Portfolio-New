import React from "react";
import { motion, useViewportScroll, useTransform } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import Clock from "./Clock";

export default function Navbar() {
  const { scrollY } = useViewportScroll();
  const background = useTransform(
    scrollY,
    [0, 100],
    ["rgba(15, 23, 42, 0.2)", "rgba(15, 23, 42, 0.7)"]
  );
  const height = useTransform(scrollY, [0, 100], [100, 64]);

  const location = useLocation();

  const navLinks = [
    { name: "Projects", path: "/projects" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <motion.nav
      className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 transition-all duration-300 border-b border-white/10 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
      style={{
        backgroundColor: background,
        height,
      }}
    >
      {/* Logo */}
      <Link to="/" className="flex items-center h-20">
        <img
          src={logo}
          alt="Logo"
          className="h-12 w-auto object-contain drop-shadow-[0_0_6px_rgba(99,102,241,0.4)]"
        />
      </Link>

      {/* Centered Clock */}
      <div className="absolute left-1/2 transform -translate-x-1/2 text-white text-sm font-mono tracking-wide">
        <Clock />
      </div>

      {/* Nav Links */}
      <ul className="flex gap-8 text-white text-sm font-medium">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              to={link.path}
              className={`relative transition-colors hover:text-indigo-300 hover:drop-shadow-[0_0_6px_#6366f1] ${
                location.pathname === link.path
                  ? "text-indigo-300 after:w-full"
                  : "after:w-0"
              } after:absolute after:h-[2px] after:bg-indigo-400 after:bottom-[-4px] after:left-0 after:transition-all after:duration-300 hover:after:w-full`}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}
