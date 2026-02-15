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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
  {facultyData.map((faculty) => (
    
    <div
      key={faculty.id}
      data-aos="fade-up"
      data-aos-duration="2200"
      className="bg-gradient-to-r from-gray-900 to-black 
      border border-gray-800 hover:border-[#FF7A00]
      rounded-xl p-5
      flex flex-col lg:flex-row items-center 
      lg:items-start gap-6
      transition-all duration-300 group"
    >

      {/* Image */}
      <div className="flex-shrink-0">
        <img
          src={faculty.image}
          alt={faculty.name}
          className="h-[220px] w-[170px] object-cover 
          rounded-lg border border-gray-700
          scale-110 transition-transform duration-500"
        />
      </div>

      {/* Details */}
      <div className="text-center lg:text-left">
        <h3 className="text-4xl font-bold group-hover:text-[#FF7A00]">
          {faculty.name}
        </h3>

        <p className="text-[#FF7A00] text-2xl font-semibold uppercase mt-2">
          {faculty.designation}
        </p>

        <p className="text-gray-400 text-[15px] mt-1">
          {faculty.department}
        </p>
      </div>

    </div>

  ))}
</div>

      </div>
    </section>
  );
}
