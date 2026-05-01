"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Border from './Border';
import AOS from 'aos';
import { X, Menu } from 'lucide-react';
import 'aos/dist/aos.css';
import EventRegistrationModal from './EventRegistrationModal';
import axios from 'axios';

// On Render: https://your-backend-name.onrender.com
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen]           = useState(false);
  const [isModalOpen, setIsModalOpen]         = useState(false);
  const [registrationOpen, setRegistrationOpen] = useState(false); 

  useEffect(() => {
    AOS.init();
  }, []);

  // Check if registration is open ──
  // Calls /api/status on every page load.
  // If registrationOpen is true → show button + auto popup.
  // If false → button hidden, no popup, clean navbar.
  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/status`);
        const isOpen = res.data.registrationOpen;
        setRegistrationOpen(isOpen);

        //  Auto popup — only if registration is open ──
        // Uses sessionStorage so popup shows once per browser session.
        // Next time they open a new tab or new session, it shows again.
        if (isOpen) {
          const hasSeenModal = sessionStorage.getItem("traversal_modal_seen");
          if (!hasSeenModal) {
            setTimeout(() => {
              setIsModalOpen(true);
              sessionStorage.setItem("traversal_modal_seen", "true");
            }, 1000); // 1 second delay so page loads first
          }
        }
      } catch (error) {
        // If backend is down or unreachable, fail silently.
        // Registration button stays hidden — safe default.
        console.error("Could not fetch registration status:", error.message);
        setRegistrationOpen(false);
      }
    };

    checkStatus();
  }, []);

  return (
    <>
      <nav className="bg-black text-white fixed w-full top-0 z-50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">

            {/* Logo */}
            <div className="flex-shrink-0" data-aos="fade-down-right" data-aos-duration="1900">
              <a href="#heroSection">
                <img src="/traversalLogo.png" alt="Traversal Logo" className="h-20 w-[12.4em] cursor-pointer" />
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link data-aos="fade-down-right" data-aos-duration="2000" href="/about" className="hover:text-[#FF7A00] hover:underline transition-colors duration-200">
                ABOUT
              </Link>
              <Link data-aos="fade-down-right" data-aos-duration="2500" href="/events" className="hover:text-[#FF7A00] hover:underline transition-colors duration-200">
                EVENTS
              </Link>
              <a data-aos="fade-down-right" data-aos-duration="2800" href="#teams" className="hover:text-[#FF7A00] hover:underline transition-colors duration-200">
                TEAMS
              </a>
              <a data-aos="fade-down-right" data-aos-duration="3000" href="#footer" className="hover:text-[#FF7A00] hover:underline transition-colors duration-200">
                CONTACT
              </a>

              {/* ── REGISTER BUTTON — only renders when registrationOpen is true ── */}
              {registrationOpen && (
                <button
                  data-aos="fade-down-left"
                  data-aos-duration="2200"
                  onClick={() => setIsModalOpen(true)}
                  className="relative bg-[#FF7A00] hover:bg-[#e66d00] hover:shadow-[0_0_18px_rgba(255,122,0,0.5)] text-white text-sm font-bold px-5 py-2.5 rounded-lg transition-all duration-300 active:scale-95 tracking-wide"
                >
                  REGISTER NOW
                </button>
              )}
            </div>

            {/* Mobile: Register + Hamburger */}
            <div className="md:hidden flex items-center gap-3">

              {/* ── Mobile register button — only when open ── */}
              {registrationOpen && (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="text-[#FF7A00] border border-[#FF7A00]/40 hover:bg-[#FF7A00] hover:text-white text-xs font-bold px-3 py-2 rounded-lg transition-all duration-200 active:scale-95"
                >
                  REGISTER
                </button>
              )}

              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-orange-500 hover:text-[#FF7A00] transition-colors">
                {isMenuOpen
                  ? <X data-aos="zoom-in" data-aos-duration="1500" size={28} />
                  : <Menu data-aos="fade-down-left" data-aos-duration="1500" size={28} />
                }
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 top-16 bg-black z-40">
            <div className="flex flex-col items-center justify-center h-full space-y-8 text-2xl">
              <Link data-aos="zoom-in" data-aos-duration="2000" href="/about" className="hover:text-[#FF7A00] transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>
                ABOUT
              </Link>
              <Border />
              <Link data-aos="zoom-in" data-aos-duration="2500" href="/events" className="hover:text-[#FF7A00] transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>
                EVENTS
              </Link>
              <Border />
              <a data-aos="zoom-in" data-aos-duration="2800" href="#teams" className="hover:text-[#FF7A00] transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>
                TEAMS
              </a>
              <Border />
              <a data-aos="zoom-in" data-aos-duration="3000" href="#footer" className="hover:text-[#FF7A00] transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>
                CONTACT
              </a>
              <Border />

              {/* Mobile menu register button */}
              {registrationOpen && (
                <>
                  <button
                    data-aos="zoom-in" data-aos-duration="3200"
                    onClick={() => { setIsModalOpen(true); setIsMenuOpen(false); }}
                    className="bg-[#FF7A00] hover:bg-[#e66d00] text-white font-bold px-10 py-3 rounded-lg transition-all duration-200 active:scale-95 tracking-wide"
                  >
                    REGISTER NOW
                  </button>
                  <Border />
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Registration Modal — only mounts when registrationOpen is true */}
      {registrationOpen && (
        <EventRegistrationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}