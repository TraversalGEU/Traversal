"use client";
import { FaDiscord, FaGithub, FaLinkedin, FaInstagram, FaWhatsapp } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  return (
    <footer id="footer" className="bg-[#1a1a1a] text-gray-300 py-10 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10">

        {/* Brand Section */}
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold tracking-wide">
            TRAVERSAL<span className="text-[#FF7A00]">•</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-sm text-sm leading-relaxed">
            The premium Technical society for innovators, builders, and future leaders.
          </p>
        </div>

        {/* Explore */}
        <div>
          <h3 className="text-sm font-semibold mb-4 text-gray-200">EXPLORE</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <Link href="/events" className="hover:text-white cursor-pointer">
                Events
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white cursor-pointer">
                About
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-sm font-semibold mb-4 text-gray-200">CONTACT</h3>
          <ul className="space-y-2 text-sm text-gray-400">

            <li>
              <Link href="mailto:traversalgeu15@gmail.com" className="hover:text-white cursor-pointer">
                Email Us
              </Link>
            </li>

            <li>
              <Link href="https://discord.gg/zfxqJPNW7" target="_blank" className="hover:text-white cursor-pointer">
                Discord
              </Link>
            </li>

            <li>
              <Link href="https://chat.whatsapp.com/CgqgV5IFvCZKQE6zP3OTYO" target="_blank" className="hover:text-white cursor-pointer">
                Whatsapp
              </Link>
            </li>

            <li>
              <Link href="https://www.linkedin.com/company/traversal-geu15/" target="_blank" className="hover:text-white cursor-pointer">
                LinkedIn
              </Link>
            </li>

          </ul>
        </div>
      </div>

      {/* Social Icons */}
      <div className="max-w-7xl mx-auto mt-12 flex justify-end space-x-5 pr-2">

        <Link href="https://discord.gg/zfxqJPNW7" target="_blank">
          <div className="bg-[#2a2a2a] p-3 rounded-full hover:bg-[#FF7A00] transition cursor-pointer">
            <FaDiscord size={18} />
          </div>
        </Link>

        <Link href="https://chat.whatsapp.com/CgqgV5IFvCZKQE6zP3OTYO" target="_blank">
          <div className="bg-[#2a2a2a] p-3 rounded-full hover:bg-[#FF7A00] transition cursor-pointer">
            <FaWhatsapp size={18} />
          </div>
        </Link>

        <Link href="https://www.linkedin.com/company/traversal-geu15/" target="_blank">
          <div className="bg-[#2a2a2a] p-3 rounded-full hover:bg-[#FF7A00] transition cursor-pointer">
            <FaLinkedin size={18} />
          </div>
        </Link>

        <Link href="https://www.instagram.com/traversal.geu?igsh=NHZjc2w4b3EyaDRs" target="_blank">
          <div className="bg-[#2a2a2a] p-3 rounded-full hover:bg-[#FF7A00] transition cursor-pointer">
            <FaInstagram size={18} />
          </div>
        </Link>

      </div>

      {/* Bottom thin border */}
      <div className="mt-10 h-px bg-white/10"></div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto mt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} TRAVERSAL. All rights reserved.
      </div>
    </footer>
  );
}
