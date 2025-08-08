import React, { useState, useEffect } from 'react';
import { X, Users, Calendar } from 'lucide-react';
import { supabase, RSVP } from '../lib/supabase';
import toast from 'react-hot-toast';

interface RSVPListProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RSVPList({ isOpen, onClose }: RSVPListProps) {
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      fetchRSVPs();
    }
  }, [isOpen]);

  const fetchRSVPs = async () => {
    setLoading(true);
    try {
      if (!supabase) {
        toast.error('Database not configured');
        return;
      }

      const { data, error } = await supabase
        .from('rsvps')
        .select('*')
        .eq('status', 'going')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRsvps(data || []);
    } catch (error) {
      console.error('Error fetching RSVPs:', error);
      toast.error('Failed to load RSVP data');
    } finally {
      setLoading(false);
    }
  };

  const totalGuests = rsvps.reduce((sum, rsvp) => sum + rsvp.guests, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-100 to-blue-100 p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-serif text-gray-800 mb-2">RSVP Database</h2>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Users size={16} />
                  <span>{rsvps.length} families</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={16} />
                  <span>{totalGuests} total guests</span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-96">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin w-8 h-8 border-2 border-pink-300 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-600">Loading RSVP data...</p>
            </div>
          ) : rsvps.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 text-lg">No RSVPs yet</p>
              <p className="text-gray-500 text-sm mt-2">Be the first to RSVP!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {rsvps.map((rsvp, index) => (
                <div
                  key={rsvp.id}
                  className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-pink-200 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-800 text-lg">
                        {index + 1}. {rsvp.name}
                      </h3>
                      <div className="flex items-center gap-1 text-gray-600 mt-1">
                        <Users size={14} />
                        <span className="text-sm">
                          {rsvp.guests === 1 ? '1 participant' : `${rsvp.guests} participants`}
                        </span>
                      </div>
                    </div>
                    <div className="text-right text-xs text-gray-500">
                      {new Date(rsvp.created_at || '').toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="text-center text-sm text-gray-600">
            Total: <strong>{rsvps.length} families</strong> • <strong>{totalGuests} guests</strong>
          </div>
        </div>
      </div>
    </div>
  );
}