import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Details from './components/Details';
import Footer from './components/Footer';
import RSVPModal from './components/RSVPModal';
import RSVPList from './components/RSVPList';

function App() {
  const [isRSVPModalOpen, setIsRSVPModalOpen] = useState(false);
  const [isRSVPListOpen, setIsRSVPListOpen] = useState(false);

  const handleRegistryClick = () => {
    window.open('https://www.amazon.com/baby-reg/your-registry/H9NTCT5RHCFF?ref_=br_dsk_tbnr_yr', '_blank');
  };

  return (
    <div className="min-h-screen font-serif">
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#F9D0D8',
            color: '#333',
          },
        }}
      />
      
      <Header />
      
      {/* Photo Section */}
      <section className="py-8 px-4" style={{ backgroundColor: '#FFFDF7' }}>
        <div className="max-w-4xl mx-auto text-center">
          <img
            src="https://ugbmtg4nks.ufs.sh/f/DlVflUN285AWD99H2oSN285AWXcmtTjMvL9GVYFpuef4IKCU"
            alt="Baby shower celebration"
            className="w-full max-w-2xl mx-auto rounded-lg shadow-lg"
            loading="lazy"
          />
        </div>
      </section>
      
      {/* Action Buttons Section */}
      <section className="py-8 px-4" style={{ backgroundColor: '#FFFDF7' }}>
        <div className="max-w-md mx-auto">
          <div className="flex flex-col gap-4">
            <button
              onClick={() => setIsRSVPModalOpen(true)}
              className="bg-white hover:bg-gray-50 text-gray-800 px-8 py-4 rounded-full font-medium shadow-lg transition-all duration-300 hover:shadow-xl text-lg"
            >
              RSVP
            </button>
            <button
              onClick={() => setIsRSVPListOpen(true)}
              className="bg-white hover:bg-gray-50 text-gray-800 px-8 py-4 rounded-full font-medium shadow-lg transition-all duration-300 hover:shadow-xl text-lg"
            >
              View
            </button>
            <button
              onClick={handleRegistryClick}
              className="bg-white hover:bg-gray-50 text-gray-800 px-8 py-4 rounded-full font-medium shadow-lg transition-all duration-300 hover:shadow-xl text-lg"
            >
              My Registry
            </button>
          </div>
        </div>
      </section>
      
      <Details />
      <Footer />
      
      <RSVPModal
        isOpen={isRSVPModalOpen}
        onClose={() => setIsRSVPModalOpen(false)}
        onSuccess={() => {
          setIsRSVPModalOpen(false);
          setIsRSVPListOpen(true);
        }}
      />
      
      <RSVPList
        isOpen={isRSVPListOpen}
        onClose={() => setIsRSVPListOpen(false)}
      />
    </div>
  );
}

export default App;