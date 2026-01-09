import React from 'react'
import eventsData from '@/app/components/JSON_DATA/upcomingEventsDesc.json'
import Link from 'next/link'
import { ArrowLeft, Calendar, Users, MapPin } from 'lucide-react'

export default async function EventDetail({ params }) {
    // Await params
    const { id } = await params

    // Find event by id (string comparison for custom IDs like evt_2025_hackathon_01)
    const eventDetail = eventsData.find(f => f.id === id)

    if (!eventDetail) return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">No event found!</h1>
                <p className="text-gray-400 mb-6">More events to come , Stay Tuned !</p>
                <Link href='/events' className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF7A00] to-[#e66d00] px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-[#FF7A00]/50 hover:scale-105 transition">
                    <ArrowLeft className="w-5 h-5" />
                    <span>Back to Events</span>
                </Link>
            </div>
        </div>
    )

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Back Button */}
            <div className="max-w-4xl mx-auto pt-8 px-8">
                <Link href='/events' className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition">
                    <ArrowLeft className="w-5 h-5" />
                    <span>Back to Events</span>
                </Link>
            </div>

            {/* Main Content */}
            <section className="max-w-4xl mx-auto px-8 py-8">
                {/* Title Section with gradient border */}
                <div className="mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#FF7A00] via-[#ff9933] to-[#FF7A00] bg-clip-text text-transparent">
                        {eventDetail.title}
                    </h1>
                    <div className="h-1 w-24 bg-gradient-to-r from-[#FF7A00] to-[#ff9933] rounded-full"></div>
                </div>

                {/* Event Meta Info */}
                <div className="flex flex-wrap gap-4 mb-8">
                    <div className="flex items-center gap-2 bg-gray-800/50 backdrop-blur px-4 py-2 rounded-lg border border-[#FF7A00]/20">
                        <Calendar className="w-5 h-5 text-[#FF7A00]" />
                        <span className="text-sm text-gray-300">{eventDetail.date}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 bg-gray-800/50 backdrop-blur px-4 py-2 rounded-lg border border-[#FF7A00]/20">
                        <MapPin className="w-5 h-5 text-[#FF7A00]" />
                        <span className="text-sm text-gray-300">{eventDetail.location}</span>
                    </div>
                </div>

                {/* Description Card */}
                <div className="bg-gray-800/50 backdrop-blur rounded-2xl p-8 border border-[#FF7A00]/20 hover:border-[#FF7A00]/40 transition shadow-xl">
                    <h2 className="text-2xl font-semibold mb-4 text-[#FF7A00]">About This Event</h2>
                    <div className="prose prose-invert max-w-none">
                        <p className="text-lg text-gray-300 leading-relaxed whitespace-pre-line">
                            {eventDetail.description || "Join us for an amazing event filled with learning, networking, and fun! This is a great opportunity to connect with fellow students and professionals in the field. Don't miss out on this incredible experience!"}
                        </p>
                    </div>
                </div>

            </section>
        </div>
    )
}