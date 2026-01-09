
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, Filter,ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import eventsData from '../components/JSON_DATA/eventsData.json'



export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const router = useRouter();

  const filteredEvents = eventsData.filter((event) => {
    const matchesCategory =
      selectedCategory === "All" || event.category === selectedCategory;
    return matchesCategory;
  });

  const handleEventClick = (id) => {
    router.push(`/weekevents/${id}`);
  };

  return (
    <div>
      <Link data-aos="fade-down-right" data-aos-duration="1500" href='/'className="active:scale-90 ml-6 mt-4 inline-flex items-center gap-2 bg-[#FF7A00] text-white px-6 py-3 rounded-full transition-all duration-300 "><ArrowLeft/><span>Back</span></Link>  
      <div className="min-h-screen bg-black text-white pt-24 pb-16">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#FF7A00] mb-3">
            Explore All Events
          </h1>
          <p className="text-gray-400">
            Explore all upcoming Traversal events and experiences.  
          </p>
        </motion.div>

        

        {/* Events Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            layout
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  
                  className="bg-gradient-to-b from-gray-900 to-black rounded-xl overflow-hidden border border-gray-800 hover:border-[#FF7A00] hover:shadow-lg hover:shadow-[#FF7A00]/20 transition-all cursor-pointer group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                  
                  <div className="p-5">
                    <span className="text-xs text-[#FF7A00] font-semibold uppercase tracking-wide">
                      {event.category}
                    </span>
                    <h3 className="text-xl font-bold mt-2 mb-3 group-hover:text-[#FF7A00] transition-colors">
                      {event.title}
                    </h3>
                    
                    <div className="flex items-center gap-2 mb-2 text-sm text-gray-400">
                      <Calendar size={16} />
                      <span>{event.date}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-4 text-sm text-gray-400">
                      <MapPin size={16} />
                      <span>{event.location}</span>
                    </div>
                    
                    <button onClick={() => handleEventClick(event.id)} className="active:scale-90 w-full bg-[#FF7A00] hover:bg-[#e66d00] text-white px-4 py-2 rounded-lg transition-all font-semibold hover:shadow-lg hover:shadow-[#FF7A00]/30">
                      View Details
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center text-gray-400 py-12"
              >
                No events found matching your filters.
              </motion.p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
    </div>
    
  );
}