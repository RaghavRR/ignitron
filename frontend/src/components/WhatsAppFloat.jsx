import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '917393985330';

const WhatsAppFloat = ({ message = "Hi IGNITRON Future Labs, I'd like to know more about your programs." }) => {
  const link = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with IGNITRON on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl hover:scale-110 transition-transform duration-200"
    >
      <FaWhatsapp size={28} />
    </a>
  );
};

export default WhatsAppFloat;
