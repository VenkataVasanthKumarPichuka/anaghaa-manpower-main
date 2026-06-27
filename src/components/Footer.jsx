// Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import logo1 from "../../public/anaghaa-logo.png"; // Ensure this path is correct based on your project structure

const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Mission", path: "/mission" },
  { label: "Contact", path: "/contact" },
];

const SERVICES = [
  { label: "Talent Acquisition", path: "/services" },
  { label: "Executive Search", path: "/services" },
  { label: "Niche Recruitment", path: "/services" },
  { label: "Staffing & RPO", path: "/services" },
  { label: "Campus Drives", path: "/services" },
  { label: "Strategic Consulting", path: "/services" },
];

// Social media icons as components
const LinkedinIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      {/* Decorative top wave */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#1e3a5f] via-[#4CAF50] to-[#1e3a5f]" />
      
      {/* Floating decorative elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-[#4CAF50]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-48 h-48 bg-[#1e3a5f]/5 rounded-full blur-3xl" />

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="grid md:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Brand Column - Takes 4 columns */}
          <div className="md:col-span-4">
            <Link to="/" className="flex items-center gap-4 mb-6 group">
              {/* Logo Container */}
              <div className="">
                <img src={logo1} alt="Anaghaa Logo" className="h-30 w-40" />
              </div>
            </Link>
            
            <p className="text-gray-600 text-sm leading-relaxed mb-6 max-w-xs">
              Connecting Talent with Opportunity. Empowering businesses with strategic consulting and people-first solutions that drive sustainable growth.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {[
                { icon: <LinkedinIcon />, label: "LinkedIn" },
                { icon: <TwitterIcon />, label: "Twitter" },
                { icon: <FacebookIcon />, label: "Facebook" },
                { icon: <InstagramIcon />, label: "Instagram" },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#1e3a5f] hover:border-[#4CAF50] hover:shadow-md transition-all duration-300 group"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links - Takes 2 columns */}
          <div className="md:col-span-2">
            <h4 className="text-[#1e3a5f] font-semibold text-sm uppercase tracking-wider mb-5 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#4CAF50] rounded-full" />
              Explore
            </h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-600 text-sm hover:text-[#4CAF50] transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-[#4CAF50] transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services - Takes 3 columns */}
          <div className="md:col-span-3">
            <h4 className="text-[#1e3a5f] font-semibold text-sm uppercase tracking-wider mb-5 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#4CAF50] rounded-full" />
              Our Services
            </h4>
            <ul className="space-y-3">
              {SERVICES.map((s) => (
                <li key={s.label}>
                  <Link
                    to={s.path}
                    className="text-gray-600 text-sm hover:text-[#4CAF50] transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-[#4CAF50] transition-all duration-200" />
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info - Takes 3 columns */}
          <div className="md:col-span-3">
            <h4 className="text-[#1e3a5f] font-semibold text-sm uppercase tracking-wider mb-5 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#4CAF50] rounded-full" />
              Get In Touch
            </h4>
            
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-[#4CAF50]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#4CAF50]/20 transition-colors">
                  <svg className="w-4 h-4 text-[#4CAF50]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">Email</p>
                  <a href="mailto:hello@anaghaa.com" className="text-gray-700 text-sm hover:text-[#4CAF50] transition-colors">
                    hello@anaghaa.com
                  </a>
                </div>
              </li>
              
              <li className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-[#1e3a5f]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#1e3a5f]/20 transition-colors">
                  <svg className="w-4 h-4 text-[#1e3a5f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">Phone</p>
                  <span className="text-gray-700 text-sm">+91 00000 00000</span>
                </div>
              </li>
              
              <li className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-[#4CAF50]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#4CAF50]/20 transition-colors">
                  <svg className="w-4 h-4 text-[#4CAF50]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">Address</p>
                  <span className="text-gray-700 text-sm leading-relaxed">
                    3-13-4/402 Nirmal’s Kamala Sadan, Ramanthapur, Hyderabad,500013
                  </span>
                </div>
              </li>
            </ul>
            
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-[#1e3a5f] text-white py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/80">
            © {new Date().getFullYear()} Anaghaa Consultancy Services. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-white/80">
            <Link to="/privacy" className="hover:text-[#4CAF50] transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-[#4CAF50] transition-colors">Terms of Service</Link>
            <span className="text-[#4CAF50] font-medium">Made with ❤ in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}