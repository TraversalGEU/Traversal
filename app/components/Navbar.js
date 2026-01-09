"use client"
import { useState,useEffect } from 'react';
import Link from 'next/link';
import Border from './Border';
import AOS from 'aos'
import { X,Menu } from 'lucide-react';
import 'aos/dist/aos.css'
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
useEffect(() => {
    AOS.init();
  }, [])
  return (
    <nav  className="bg-black text-white fixed w-full top-0 z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0" data-aos="fade-down-right" data-aos-duration="1900">
            <a href="#heroSection">
              <img 
                src="/traversalLogo.png" 
                alt="Traversal Logo" 
                className="h-20 w-[12.4em] cursor-pointer"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link  data-aos="fade-down-right" data-aos-duration="2000" href="/about" className="hover:text-[#FF7A00] hover:underline transition-colors duration-200">
              ABOUT
            </Link>
            <Link  data-aos="fade-down-right" data-aos-duration="2500" href="/events" className="hover:text-[#FF7A00] hover:underline transition-colors duration-200">
              EVENTS
            </Link>
            <a  data-aos="fade-down-right" data-aos-duration="2800" href="#teams" className="hover:text-[#FF7A00] hover:underline transition-colors duration-200">
              TEAMS
            </a>
            <a  data-aos="fade-down-right" data-aos-duration="3000" href="#footer" className="hover:text-[#FF7A00] hover:underline transition-colors duration-200">
              CONTACT
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
            onClick={toggleMenu}
            className="md:hidden text-orange-500 hover:text-[#FF7A00] transition-colors"
          >
            {isMenuOpen ? <X data-aos="zoom-in" data-aos-duration="1500" size={28} /> : <Menu data-aos="fade-down-left" data-aos-duration="1500" size={28} />}
          </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation - Full Screen */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-black z-40">
          <div className="flex flex-col items-center justify-center h-full space-y-8 text-2xl">
            <Link 
              data-aos="zoom-in" data-aos-duration="2000"
              href="/about" 
              className="hover:text-[#FF7A00] transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              ABOUT
            </Link>
            <Border/>
            <Link 
              data-aos="zoom-in" data-aos-duration="2500"
              href="/events" 
              className="hover:text-[#FF7A00] transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              EVENTS
            </Link>
            <Border/>
            <a 
              data-aos="zoom-in" data-aos-duration="2800"
              href="#teams" 
              className="hover:text-[#FF7A00] transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              TEAMS
            </a>
            <Border/>
            <a
              data-aos="zoom-in" data-aos-duration="3000" 
              href="#footer" 
              className="hover:text-[#FF7A00] transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              CONTACT
            </a>
            <Border/>
          </div>
        </div>
      )}
    </nav>
  );
}