"use client"

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Border from '../components/Border';

export default function AboutPage() {
    const statsRef = useRef(null);
    const isStatsInView = useInView(statsRef, { once: true });

    const stats = [
        { label: "Whatsapp COMMUNITY", value: "1200+", color: "#FF7A00" },
        { label: "Instagram Reach", value: "100+", color: "#FF7A00" },
        { label: "Discord Members", value: "100+", color: "#FF7A00" }
    ];

    const sections = [
        {
            id: 1,
            title: "Our Vision",
            description: "To cultivate a community of elite developers who bridge the gap between imagination and reality through code and design.",
            image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80",
            isOrange: true
        },
        {
            id: 2,
            title: "The Culture",
            description: "We don't limit tech projects; we build together. Agile teams learning collaborative excellence and unwavering ambition.",
            image: "https://images.pexels.com/photos/7845454/pexels-photo-7845454.jpeg",
            isOrange: true,
            reverse: true
        },
        {
            id: 3,
            title: "Our Mission",
            description: "Empowering people with industry-grade skills, hackathon experiences, and a learning mindset that transcends the classroom.",
            image: "https://images.pexels.com/photos/34258667/pexels-photo-34258667.jpeg",
            isOrange: true
        }
    ];

    return (
        <div>
            <Link data-aos="fade-down-right" data-aos-duration="1500" href='/' className="active:scale-90 ml-6 mt-4 inline-flex items-center gap-2 bg-[#FF7A00] text-white px-6 py-3 rounded-full transition-all duration-300 "><ArrowLeft /><span>Back</span></Link>
            <div className="min-h-screen bg-black text-white">
                {/* Hero Section */}
                <section className="pt-32 pb-16 px-6 sm:px-8 lg:px-12">
                    <div className="max-w-7xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                                Redefining the <span className="text-[#FF7A00]">standard</span>
                                <br />
                                for university technical
                                <br />
                                <span className="text-gray-500">communities.</span>
                            </h1>
                        </motion.div>
                    </div>
                </section>

                {/* Video Reel Section */}
                <section className="py-8 px-6 sm:px-8 lg:px-12">
                    <div className="max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative rounded-xl overflow-hidden border border-gray-800"
                        >

                            <div className="aspect-video bg-gray-900 flex items-center justify-center">
                                <video className="w-full h-full object-cover" src='/Trav.mp4' autoPlay
                                    loop
                                    muted
                                    playsInline />
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Stats Section */}
                <section ref={statsRef} className="py-2 px-6 sm:px-8 lg:px-12">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {stats.map((stat, index) => (
                                <motion.div
                                key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.6, delay: index * 0.2 }}
                                    className="text-center"
                                    >
                                    <p className="text-gray-400 text-sm mb-2 uppercase tracking-wider">
                                        {stat.label}
                                    </p>
                                    <h3 className="text-5xl sm:text-6xl font-bold text-gray-600">
                                        {stat.value}
                                    </h3>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
                
                {/* Vision, Culture, Mission Sections */}
                <section className="py-30 px-6 sm:px-8 lg:px-12">
                    <div className="max-w-6xl mx-auto space-y-24">
                        {sections.map((section, index) => (
                            <motion.div
                                key={section.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${section.reverse ? 'md:grid-flow-dense' : ''
                                    }`}
                            >
                                {/* Text Content */}
                                <div className={section.reverse ? 'md:col-start-2' : ''}>
                                    <div className="w-12 h-1 bg-[#FF7A00] mb-4"></div>
                                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                                        {section.title}
                                    </h2>
                                    <p className="text-gray-400 pb-10 leading-relaxed">
                                        {section.description}
                                    </p>
                                <Border/>
                                </div>

                                {/* Image */}
                                <div className={section.reverse ? 'md:col-start-1 md:row-start-1' : ''}>
                                    <div className="rounded-lg overflow-hidden border border-gray-800 hover:border-[#FF7A00] transition-all duration-300">
                                        <img
                                            src={section.image}
                                            alt={section.title}
                                            className="w-full h-64 sm:h-80 object-cover hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
