"use client"

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import eventsData from '../JSON_DATA/currentEvent.json'


export default function Section3() {
  const router = useRouter();

  const handleEventClick = (id) => {
    router.push(`/weekevents/${id}`);
  };

  return (
    <section className="bg-black text-white py-16 sm:py-20 px-6 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div data-aos="fade-right" data-aos-duration="2200" className="flex justify-between items-center mb-8 sm:mb-12">
          <div>
            <p className="text-[#FF7A00] text-sm font-semibold mb-2 uppercase tracking-wider">
              LATEST UPDATES
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              Events & Insights
            </h2>
          </div>
          <Link 
            href="/events" 
            className="hidden sm:flex items-center gap-2 text-[#FF7A00] hover:gap-4 transition-all duration-300 font-semibold group"
          >
            VIEW ALL
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Events Grid */}
        <div data-aos="zoom-in" data-aos-duration="2200" className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {eventsData.map((event) => (
            <div
              key={event.id}
              onClick={() => handleEventClick(event.id)}
              className="group relative bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-lg overflow-hidden hover:border-[#FF7A00] transition-all duration-300 cursor-pointer"
            >
              {/* Event Image */}
              <div className="relative h-48 sm:h-64 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-[#FF7A00] text-white text-xs font-semibold px-3 py-1 rounded uppercase">
                    {event.category}
                  </span>
                </div>

                {/* Arrow Icon */}
                <div className="absolute top-4 right-4 bg-[#FF7A00] rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowRight className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Event Content */}
              <div className="p-6">
                <h3 className="text-xl sm:text-2xl font-bold mb-2 group-hover:text-[#FF7A00] transition-colors duration-300">
                  {event.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View All Button */}
        <Link 
          href="/events" 
          className="flex sm:hidden items-center justify-center gap-2 text-[#FF7A00] hover:gap-4 transition-all duration-300 font-semibold mt-8 group"
        >
          VIEW ALL
          <ArrowRight className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}