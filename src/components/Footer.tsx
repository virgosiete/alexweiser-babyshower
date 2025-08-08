import React from 'react';
import { Rabbit, Crown } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-12 px-4" style={{ backgroundColor: '#F9D0D8' }}>
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center gap-6 mb-6">
          <div className="w-16 h-16 rounded-full bg-white bg-opacity-50 flex items-center justify-center">
            <Rabbit size={28} style={{ color: '#B6D9EF' }} />
          </div>
          <div className="w-16 h-16 rounded-full bg-white bg-opacity-50 flex items-center justify-center">
            <Crown size={28} style={{ color: '#F9D0D8' }} />
          </div>
        </div>
        <p className="text-gray-700 text-lg">
          Questions? Call/Text{' '}
          <a 
            href="tel:+14155550123" 
            className="font-semibold hover:underline"
          >
            +1 650-703-6415
          </a>
        </p>
      </div>
    </footer>
  );
}