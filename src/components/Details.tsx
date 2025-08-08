import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';

export default function Details() {
  return (
    <section className="py-16 px-4" style={{ backgroundColor: '#FFFDF7' }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Date & Time */}
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-3 mb-6">
              <Calendar size={28} style={{ color: '#B6D9EF' }} />
              <h2 className="text-2xl font-serif text-gray-800">When</h2>
            </div>
            <div className="space-y-2">
              <p className="text-xl font-bold text-gray-800">
                Saturday, 30 August 2025
              </p>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <Clock size={18} style={{ color: '#F9D0D8' }} />
                <p className="text-lg text-gray-700">12 o'clock</p>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-3 mb-6">
              <MapPin size={28} style={{ color: '#F9D0D8' }} />
              <h2 className="text-2xl font-serif text-gray-800">Where</h2>
            </div>
            <div className="space-y-4">
              <p className="text-lg font-medium text-gray-800">
                2021 South Delaware St<br />
                San Mateo, CA
              </p>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3163.1852614732397!2d-122.30725862466714!3d37.55069877204269!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808f9ef0ca01f727%3A0x858b850c613fa9b2!2s2021%20S%20Delaware%20St%2C%20San%20Mateo%2C%20CA%2094403!5e0!3m2!1sen!2sus!4v1754614120933!5m2!1sen!2sus"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Event Location"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}