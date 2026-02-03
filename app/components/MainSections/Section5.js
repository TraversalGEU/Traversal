import React from 'react';
import facultyData from '../JSON_DATA/Faculty.json';

export default function Section5() {
  return (
    <section className="bg-black text-white py-16 sm:py-20 px-6 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p data-aos="fade-down" data-aos-duration="2200" className="text-[#FF7A00] text-sm font-semibold mb-3 uppercase tracking-wider">
            MENTORS
          </p>
          <h2 data-aos="fade-up" data-aos-duration="2200" className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Faculty Coordinators
          </h2>
          <div className="w-24 h-1 bg-[#FF7A00] mx-auto mt-4"></div>
        </div>

        {/* Faculty Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {facultyData.map((faculty) => (
            <div
              data-aos="fade-up" data-aos-duration="2200"
              key={faculty.id}
              className="bg-gradient-to-b from-gray-900 to-black border-l-4 border-[#FF7A00] p-6 rounded-lg hover:shadow-lg hover:shadow-[#FF7A00]/20 transition-all duration-300 group"
            >
              <h3 className="text-lg font-bold mb-2 group-hover:text-[#FF7A00] transition-colors">
                {faculty.name}
              </h3>
              <p className="text-[#FF7A00] text-sm font-semibold uppercase tracking-wide mb-1">
                {faculty.designation}
              </p>
              <p className="text-gray-400 text-xs">
                {faculty.department}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
