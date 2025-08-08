import React from 'react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("https://images.pexels.com/photos/1028726/pexels-photo-1028726.jpeg")',
          opacity: 0.5,
          filter: 'blur(1px)'
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-blue-50 opacity-80" />
      
      {/* Content */}
      <div className="relative text-center max-w-4xl mx-auto z-10">
        <p 
          className="text-gray-600 mb-4 font-serif italic"
          style={{ fontSize: '32px', color: '#555' }}
        >
          Kindly join us for
        </p>
        <h1 
          className="font-serif mb-6 leading-tight"
          style={{ fontSize: '48px', color: '#222' }}
        >
          Gender Reveal & Baby Shower
        </h1>
        <div 
          className="font-serif font-bold tracking-wider"
          style={{ fontSize: '48px', letterSpacing: '0.2em' }}
        >
          ALEXIS & WEISER
        </div>
      </div>
    </section>
  );
}