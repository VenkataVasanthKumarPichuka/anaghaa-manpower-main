// Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../public/anaghaa-logo.png";

const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Mission", path: "/mission" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-[#4CAF50]/20 shadow-[0_4px_32px_rgba(0,0,0,0.08)]"
          : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <img 
            src={logo} 
            alt="Anaghaa Manpower Consultants" 
            className="h-17 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`relative text-sm tracking-wide transition-colors duration-200 group ${
                location.pathname === link.path
                  ? "text-[#1e3a5f] font-semibold"
                  : "text-gray-600 hover:text-[#1e3a5f]"
              }`}
            >
              {link.label}
              <span
                className={`absolute -bottom-1 left-0 h-px bg-[#4CAF50] transition-all duration-300 ${
                  location.pathname === link.path
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          ))}
          <Link
            to="/contact"
            className="ml-2 px-5 py-2 bg-gradient-to-r from-[#1e3a5f] to-[#4CAF50] text-white text-sm tracking-wide rounded-md hover:shadow-lg hover:shadow-[#4CAF50]/30 transition-all duration-200 relative group overflow-hidden"
          >
            <span className="relative z-10">Get in Touch</span>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-[#1e3a5f] text-xl w-10 h-10 flex items-center justify-center border border-[#4CAF50]/30 rounded-md hover:border-[#4CAF50] transition-colors duration-200"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white backdrop-blur-md border-t border-[#4CAF50]/20 px-6 py-8 flex flex-col gap-6 shadow-lg">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm tracking-widest uppercase transition-colors duration-200 flex items-center gap-3 ${
                location.pathname === link.path
                  ? "text-[#1e3a5f] font-semibold"
                  : "text-gray-600 hover:text-[#1e3a5f]"
              }`}
            >
              {location.pathname === link.path && (
                <span className="w-4 h-px bg-[#4CAF50]" />
              )}
              {link.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="mt-2 px-5 py-3 bg-gradient-to-r from-[#1e3a5f] to-[#4CAF50] text-white text-sm tracking-wide text-center rounded-md"
          >
            Get in Touch
          </Link>
        </div>
      )}
    </nav>
  );
}