export default function Section2() {
  return (
    <section className="bg-black text-white py-16 sm:py-20 px-6 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <p data-aos="fade-right" data-aos-duration="2200" className="text-[#FF7A00] text-sm font-semibold mb-3 uppercase tracking-wider">
            WHO WE ARE
          </p>
          <h2 data-aos="fade-right" data-aos-duration="2200" className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Redefining the <span className="text-[#FF7A00]">standard</span> for
            <br />
            university technical
            <br />
            communities.
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Our Vision Card */}
          <div data-aos="fade-right" data-aos-duration="2200" className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-lg p-6 hover:border-[#FF7A00] transition-all duration-300">
            <div className="w-12 h-1 bg-[#FF7A00] mb-4"></div>
            <h3 className="text-xl font-bold mb-3">Our Vision</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              To cultivate a community of elite developers who bridge the gap between imagination and reality through code and design.
            </p>
          </div>

          {/* Our Mission Card */}
          <div data-aos="fade-down" data-aos-duration="2200" className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-lg p-6 hover:border-[#FF7A00] transition-all duration-300">
            <div className="w-12 h-1 bg-[#FF7A00] mb-4"></div>
            <h3 className="text-xl font-bold mb-3">Our Mission</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Empowering people with industry-grade skills, hackathon experiences, and a learning mindset that transcends the classroom.
            </p>
          </div>

          {/* The Culture Card */}
          <div data-aos="fade-left" data-aos-duration="2200" className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-lg p-6 hover:border-[#FF7A00] transition-all duration-300">
            <div className="w-12 h-1 bg-[#FF7A00] mb-4"></div>
            <h3 className="text-xl font-bold mb-3">The Culture</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              We don't limit tech projects; we build together. Agile teams learning collaborative excellence and unwavering ambition.
            </p>
          </div>
        </div>
      </div>
      
    </section>
  );
}