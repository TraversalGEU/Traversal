"use client"

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import coreTeamData from '../JSON_DATA/coreTeam.json';

export default function MeetTheTeamSection() {
  const [selectedTeam, setSelectedTeam] = useState('core');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false); // NEW ★

  const teamData = {
    core: coreTeamData,
  };

  const currentTeam = teamData[selectedTeam];
  const totalSlides = currentTeam.length;

  const handleTeamChange = (team) => {
    setSelectedTeam(team);
    setCurrentIndex(0);
    setDirection(0);
  };

  // ---------------------------
  // AUTO-SLIDE with PAUSE
  // ---------------------------
  useEffect(() => {
    if (isPaused) return; // pause when dragging

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 2200);

    return () => clearInterval(timer);
  }, [totalSlides, isPaused]);

  // ---------------------------
  // SHOW 3 SLIDES (DESKTOP)
  // ---------------------------
  const getVisibleSlides = () => {
    const slidesToShow = 3;
    const half = Math.floor(slidesToShow / 2);

    return Array.from({ length: slidesToShow }, (_, i) => {
      const index = (currentIndex - half + i + totalSlides) % totalSlides;
      return currentTeam[index];
    });
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => Math.abs(offset) * velocity;

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      let newIndex = prev + newDirection;
      if (newIndex < 0) newIndex = totalSlides - 1;
      if (newIndex >= totalSlides) newIndex = 0;
      return newIndex;
    });
  };

  return (
    <section id='teams' className="bg-black text-white py-16 sm:py-20 px-6 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <p data-aos="fade-down" data-aos-duration="2200" className="text-[#FF7A00] text-sm font-semibold mb-3 uppercase tracking-wider">
            THE SQUAD
          </p>
          <h2 data-aos="fade-up" data-aos-duration="2200" className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8">
            Meet the Team
          </h2>
        </div>

        {/* Carousel */}
        <div className="relative">

          {/* Desktop View */}
          <div className="hidden md:block">
            <div data-aos="zoom-out" data-aos-duration="2200" className="relative h-[400px] overflow-hidden">
              <AnimatePresence initial={false} custom={direction}>
                
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 1, ease: "easeInOut" }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}

                  // ★ NEW EVENTS TO PAUSE/RESUME
                  onDragStart={() => setIsPaused(true)}
                  onPointerDown={() => setIsPaused(true)}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);
                    if (swipe < -swipeConfidenceThreshold) paginate(1);
                    else if (swipe > swipeConfidenceThreshold) paginate(-1);
                    setIsPaused(false); // resume
                  }}
                  onPointerUp={() => setIsPaused(false)}

                  className="absolute inset-0 flex gap-6 justify-center cursor-grab active:cursor-grabbing"
                >
                  {getVisibleSlides().map((member, idx) => (
                    <motion.div
                      key={`${member.id}_${idx}`}
                      className="w-80 bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-lg overflow-hidden hover:border-[#FF7A00] transition-all duration-300"
                    >
                      <div className="h-80 overflow-hidden">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500 pointer-events-none"
                        />
                      </div>
                      <div className="p-6 text-center">
                        <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                        <p className="text-[#FF7A00] text-sm font-semibold uppercase tracking-wide">
                          {member.position}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

              </AnimatePresence>
            </div>
          </div>

          {/* Mobile View */}
          <div className="md:hidden">
            <div className="relative h-[450px] overflow-hidden">
              <AnimatePresence initial={false} custom={direction}>
                
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 1, ease: "easeInOut" }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}

                  // ★ SAME PAUSE/RESUME FOR MOBILE
                  onDragStart={() => setIsPaused(true)}
                  onPointerDown={() => setIsPaused(true)}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);
                    if (swipe < -swipeConfidenceThreshold) paginate(1);
                    else if (swipe > swipeConfidenceThreshold) paginate(-1);
                    setIsPaused(false);
                  }}
                  onPointerUp={() => setIsPaused(false)}

                  className="absolute inset-0 flex justify-center cursor-grab active:cursor-grabbing"
                >
                  <div className="w-full max-w-sm bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-lg overflow-hidden">
                    <div className="h-80 overflow-hidden">
                      <img
                        src={currentTeam[currentIndex].image}
                        alt={currentTeam[currentIndex].name}
                        className="w-full h-full object-cover pointer-events-none"
                      />
                    </div>
                    <div className="p-6 text-center">
                      <h3 className="text-xl font-bold mb-2">{currentTeam[currentIndex].name}</h3>
                      <p className="text-[#FF7A00] text-sm font-semibold uppercase tracking-wide">
                        {currentTeam[currentIndex].position}
                      </p>
                    </div>
                  </div>
                </motion.div>

              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
