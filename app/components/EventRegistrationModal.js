"use client";
import { useState, useEffect } from "react";
import { X, User, Mail, Phone, BookOpen, ChevronDown, CheckCircle, Loader2, AlertCircle } from "lucide-react";
import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function EventRegistrationModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    branch: "",
    year: "",
    event: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  // Lock body scroll when modal open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Valid email is required";
    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Enter a valid 10-digit number";
    if (!formData.branch) newErrors.branch = "Select your branch";
    if (!formData.year) newErrors.year = "Select your year";
    if (!formData.event) newErrors.event = "Select an event";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    if (serverError) setServerError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE}/api/register`, formData);
      if (response.data.success) {
        setSubmitted(true);
      }
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        "Something went wrong. Please try again.";
      setServerError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", phone: "", branch: "", year: "", event: "" });
      setErrors({});
      setServerError("");
    }, 400);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fadeIn" />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-[#111111] border border-gray-800 rounded-2xl shadow-2xl shadow-black/60 animate-slideUp overflow-hidden">

        <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#FF7A00] to-transparent" />

        {/* Header */}
        <div className="flex items-start justify-between px-6 pt-6 pb-4">
          <div>
            <p className="text-[#FF7A00] text-xs font-semibold uppercase tracking-widest mb-1">Traversal•</p>
            <h2 className="text-2xl font-bold text-white leading-tight">Event Registration</h2>
            <p className="text-gray-500 text-sm mt-1">Fill in your details to register</p>
          </div>
          <button
            onClick={handleClose}
            className="ml-4 mt-1 text-gray-500 hover:text-white hover:bg-white/10 rounded-full p-2 transition-all duration-200 flex-shrink-0"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mx-6 h-px bg-gray-800" />

        {/* Body */}
        <div className="px-6 py-5 max-h-[70vh] overflow-y-auto custom-scroll">
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-10 text-center animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-[#FF7A00]/15 flex items-center justify-center mb-4">
                <CheckCircle className="text-[#FF7A00]" size={36} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">You're Registered!</h3>
              <p className="text-gray-400 text-sm max-w-xs">
                Thanks <span className="text-[#FF7A00] font-semibold">{formData.name.split(" ")[0]}</span>! We've received your registration. See you at the event.
              </p>
              <button onClick={handleClose} className="mt-7 px-8 py-2.5 bg-[#FF7A00] hover:bg-[#e66d00] text-white font-semibold rounded-lg transition-all duration-200 active:scale-95">
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Server Error Banner */}
              {serverError && (
                <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 animate-fadeIn">
                  <AlertCircle size={18} className="text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-red-400 text-sm leading-snug">{serverError}</p>
                </div>
              )}

              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Full Name</label>
                <div className="relative">
                  <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Ayush Rawat"
                    className={`w-full bg-[#1a1a1a] border ${errors.name ? "border-red-500" : "border-gray-700 focus:border-[#FF7A00]"} text-white text-sm rounded-lg pl-9 pr-4 py-3 outline-none transition-all placeholder:text-gray-600`} />
                </div>
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com"
                    className={`w-full bg-[#1a1a1a] border ${errors.email ? "border-red-500" : "border-gray-700 focus:border-[#FF7A00]"} text-white text-sm rounded-lg pl-9 pr-4 py-3 outline-none transition-all placeholder:text-gray-600`} />
                </div>
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Phone Number</label>
                <div className="relative">
                  <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="10-digit mobile number" maxLength={10}
                    className={`w-full bg-[#1a1a1a] border ${errors.phone ? "border-red-500" : "border-gray-700 focus:border-[#FF7A00]"} text-white text-sm rounded-lg pl-9 pr-4 py-3 outline-none transition-all placeholder:text-gray-600`} />
                </div>
                {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
              </div>

              {/* Branch + Year */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Branch</label>
                  <div className="relative">
                    <BookOpen size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                    <select name="branch" value={formData.branch} onChange={handleChange}
                      className={`w-full appearance-none bg-[#1a1a1a] border ${errors.branch ? "border-red-500" : "border-gray-700 focus:border-[#FF7A00]"} text-white text-sm rounded-lg pl-9 pr-8 py-3 outline-none transition-all`}>
                      <option value="">Select</option>
                      <option value="CSE">CSE</option>
                      <option value="CSE-AI">CSE-AI</option>
                      <option value="CSE-DS">CSE-DS</option>
                      <option value="ECE">ECE</option>
                      <option value="ME">ME</option>
                      <option value="CE">CE</option>
                      <option value="Other">Other</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                  </div>
                  {errors.branch && <p className="text-red-400 text-xs mt-1">{errors.branch}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Year</label>
                  <div className="relative">
                    <select name="year" value={formData.year} onChange={handleChange}
                      className={`w-full appearance-none bg-[#1a1a1a] border ${errors.year ? "border-red-500" : "border-gray-700 focus:border-[#FF7A00]"} text-white text-sm rounded-lg px-4 pr-8 py-3 outline-none transition-all`}>
                      <option value="">Select</option>
                      <option value="1st">1st Year</option>
                      <option value="2nd">2nd Year</option>
                      <option value="3rd">3rd Year</option>
                      <option value="4th">4th Year</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                  </div>
                  {errors.year && <p className="text-red-400 text-xs mt-1">{errors.year}</p>}
                </div>
              </div>

              {/* Event */}
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Select Event</label>
                <div className="relative">
                  <select name="event" value={formData.event} onChange={handleChange}
                    className={`w-full appearance-none bg-[#1a1a1a] border ${errors.event ? "border-red-500" : "border-gray-700 focus:border-[#FF7A00]"} text-white text-sm rounded-lg px-4 pr-8 py-3 outline-none transition-all`}>
                    <option value="">Choose an event</option>
                    <option value="Hackathon">Hackathon</option>
                    <option value="UI/UX Workshop">UI/UX Workshop</option>
                    <option value="Web Dev Bootcamp">Web Dev Bootcamp</option>
                    <option value="DSA Challenge">DSA Challenge</option>
                    <option value="Open Mic Tech Talk">Open Mic Tech Talk</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                </div>
                {errors.event && <p className="text-red-400 text-xs mt-1">{errors.event}</p>}
              </div>

              {/* Submit */}
              <button type="submit" disabled={loading}
                className="w-full mt-2 flex items-center justify-center gap-2 bg-[#FF7A00] hover:bg-[#e66d00] hover:shadow-[0_0_20px_rgba(255,122,0,0.4)] disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-lg transition-all duration-200 active:scale-[0.98]">
                {loading ? <><Loader2 size={18} className="animate-spin" />Submitting...</> : "Register Now"}
              </button>
            </form>
          )}
        </div>

        <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#FF7A00]/30 to-transparent" />
      </div>

      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(24px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
        .animate-fadeIn { animation: fadeIn 0.25s ease forwards; }
        .animate-slideUp { animation: slideUp 0.3s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        .custom-scroll::-webkit-scrollbar { width: 4px; }
        .custom-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #FF7A00; border-radius: 8px; }
      `}</style>
    </div>
  );
}