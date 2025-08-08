import React, { useState } from 'react';
import { X, Heart, PartyPopper } from 'lucide-react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

interface RSVPModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function RSVPModal({ isOpen, onClose, onSuccess }: RSVPModalProps) {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({ name: '', guests: 1 });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error('Please enter your name');
      return;
    }

    setIsSubmitting(true);
    
    try {
      if (!supabase) {
        toast.error('Database not configured. Please connect to Supabase first.');
        return;
      }

      // Check for duplicate RSVP
      const { data: existingRSVP, error: checkError } = await supabase
        .from('rsvps')
        .select('id, name')
        .ilike('name', formData.name.trim())
        .maybeSingle();

      if (checkError) {
        throw checkError;
      }

      if (existingRSVP) {
        toast.error(`"${formData.name}" has already submitted an RSVP!`);
        return;
      }

      // Save to database
      const { error } = await supabase
        .from('rsvps')
        .insert({
          name: formData.name.trim(),
          guests: formData.guests,
          status: 'going'
        });

      if (error) throw error;

      // Send email notification
      const emailResponse = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-rsvp-email`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          guests: formData.guests,
          status: 'going'
        }),
      });

      if (!emailResponse.ok) {
        console.warn('Email notification failed, but RSVP was saved');
      }

      toast.success('RSVP received—see you soon!');
      setStep('success');
      setTimeout(() => {
        onSuccess?.() || onClose();
        resetModal();
      }, 1500);
    } catch (error) {
      console.error('RSVP submission error:', error);
      toast.error('Failed to submit RSVP. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetModal = () => {
    setStep('form');
    setFormData({ name: '', guests: 1 });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-in fade-in zoom-in duration-300">
        <button
          onClick={() => { onClose(); resetModal(); }}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-serif text-gray-800 mb-2">RSVP</h2>
          <p className="text-gray-600">Let us know if you can make it!</p>
        </div>

        {step === 'form' && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Name *
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-pink-200 focus:border-pink-300 transition-colors"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-2">
                Number of Participants *
              </label>
              <div className="flex items-center justify-center space-x-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, guests: Math.max(1, formData.guests - 1) })}
                  className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-xl font-bold text-gray-600 transition-colors"
                >
                  -
                </button>
                <div className="bg-gray-50 rounded-lg px-6 py-3 min-w-[80px] text-center">
                  <span className="text-2xl font-bold text-gray-800">{formData.guests}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, guests: Math.min(10, formData.guests + 1) })}
                  className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-xl font-bold text-gray-600 transition-colors"
                >
                  +
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-pink-300 to-blue-300 hover:from-pink-400 hover:to-blue-400 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-medium transition-all duration-300"
            >
              {isSubmitting ? 'Submitting...' : 'Submit RSVP'}
            </button>
          </form>
        )}

        {step === 'success' && (
          <div className="text-center">
            <div className="text-4xl mb-4">🎉</div>
            <p className="text-gray-700 text-lg mb-6">
              Thank you for your RSVP! We can't wait to see you there!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}