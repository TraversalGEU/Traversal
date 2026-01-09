"use client"
import Link from 'next/link';
export default function Section1() {
  return (
    <section id='heroSection' className="  bg-black mt-10 h-[52vh] text-white flex flex-col justify-center px-6 sm:px-8 lg:px-12 pt-20 sm:pt-16 ">
      <div className="max-w-12xl pb-18 mx-auto text-center w-full">
        {/* Hero Title */}
        <h1 data-aos="fade-right" data-aos-duration="2200"   className=" text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
          BUILD.<span className="text-[#FF7A00]">DESIGN</span>.INNOVATE.
        </h1>
        
        {/* Subtitle */}
        <p  data-aos="fade-left" data-aos-duration="2200"   className="text-gray-400 text-sm sm:text-base md:text-lg mb-1 max-w-2xl mx-auto px-4 sm:px-0">
          The Official Technical Club for visionary developers and designers. We
        </p>
        <p  data-aos="fade-left" data-aos-duration="2200"   className="text-gray-400 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto px-4 sm:px-0">
          are <span className='text-[#FF7A00] hover:underline '>Traversal</span>.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4 sm:px-0">
          <Link href="/events">
            <button data-aos="flip-down" data-aos-duration="2200"  className="active:scale-90 bg-[#FF7A00] hover:bg-[#e66d00] hover:shadow-[0_0_20px_rgba(255,122,0,0.6)] text-white font-semibold px-8 py-3 rounded transition-all duration-32200-full sm:w-auto cursor-pointer">
              EXPLORE EVENTS
            </button >
          </Link>
          
          <a href="#teams">
            <button data-aos="flip-up" data-aos-duration="2200" className="active:scale-90 bg-transparent border-2 border-gray-700 hover:border-[#FF7A00] text-white font-semibold px-8 py-3 rounded transition-all duration-32200-full sm:w-auto cursor-pointer">
              MEET THE TEAMS
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}