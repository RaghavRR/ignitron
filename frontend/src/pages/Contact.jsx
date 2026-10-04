import React, { useState } from 'react';
import { FaWhatsapp, FaEnvelope, FaPhone } from 'react-icons/fa';
import api from '../api/axios';
import EditableImage from '../components/EditableImage';

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '917393985330';

const interestOptions = [
  'ATL Lab Setup', 'Innovation Lab', 'STEM Program', 'Robotics', 'DIY Kits', 'Curriculum', 'Teacher Training', 'Workshop', 'Other',
];

const initialForm = {
  name: '', schoolOrg: '', designation: '', phone: '', email: '', city: '', interestedIn: 'Other', message: '', website: '',
};

const Contact = () => {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ loading: false, error: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const buildWhatsAppMessage = () =>
    `Hi IGNITRON Future Labs, I'm ${form.name || ''} from ${form.schoolOrg || 'my school'}. ` +
    `I'm interested in: ${form.interestedIn}. ${form.message ? `Message: ${form.message}` : ''}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: '' });
    try {
      await api.post('/leads', form);
      // After a successful enquiry submission, redirect straight to WhatsApp so the
      // conversation continues instantly — exactly as requested.
      const link = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildWhatsAppMessage())}`;
      window.location.href = link;
    } catch (err) {
      setStatus({ loading: false, error: err.response?.data?.message || 'Something went wrong. Please try again.' });
      return;
    }
    setForm(initialForm);
    setStatus({ loading: false, error: '' });
  };

  return (
    <>
      <section className="bg-white section !pb-8">
        <div className="container-max grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="eyebrow mb-2">Contact IGNITRON</p>
            <h1 className="heading-lg">Let's Build Your School's Innovation Ecosystem.</h1>
          </div>
          <EditableImage keyName="contact_hero" alt="Contact IGNITRON" className="rounded-2xl w-full h-[260px] object-cover" />
        </div>
      </section>

      <section className="section !pt-4 bg-white">
        <div className="container-max grid grid-cols-1 lg:grid-cols-5 gap-10">
          <form onSubmit={handleSubmit} className="lg:col-span-3 card p-8 space-y-5">
            {/* honeypot field for spam protection */}
            <input type="text" name="website" value={form.website} onChange={handleChange} className="hidden" tabIndex="-1" autoComplete="off" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input required name="name" placeholder="Full Name" value={form.name} onChange={handleChange} className="input" />
              <input required name="schoolOrg" placeholder="School / Organization" value={form.schoolOrg} onChange={handleChange} className="input" />
              <input name="designation" placeholder="Designation" value={form.designation} onChange={handleChange} className="input" />
              <input required name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} className="input" />
              <input required type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="input" />
              <input name="city" placeholder="City" value={form.city} onChange={handleChange} className="input" />
            </div>

            <select name="interestedIn" value={form.interestedIn} onChange={handleChange} className="input">
              {interestOptions.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>

            <textarea
              name="message"
              placeholder="Tell us about your requirement..."
              rows="4"
              value={form.message}
              onChange={handleChange}
              className="input resize-none"
            />

            {status.error && <p className="text-red-600 text-sm">{status.error}</p>}

            <button type="submit" disabled={status.loading} className="btn-primary w-full justify-center disabled:opacity-60">
              {status.loading ? 'Submitting...' : 'Submit & Continue on WhatsApp'}
            </button>
            <p className="text-xs text-gray-500 text-center">
              Submitting this form will take you to WhatsApp to continue the conversation instantly.
            </p>
          </form>

          <div className="lg:col-span-2 space-y-5">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="card p-6 flex items-center gap-4 hover:shadow-lg"
            >
              <span className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center text-2xl"><FaWhatsapp /></span>
              <div>
                <p className="font-bold">WhatsApp</p>
                <p className="text-gray-500 text-sm">+91 7393985330</p>
              </div>
            </a>
            <a href="mailto:info.ignitron@gmail.com" className="card p-6 flex items-center gap-4 hover:shadow-lg">
              <span className="w-12 h-12 rounded-full bg-orange-50 text-ignitron-orange flex items-center justify-center text-2xl"><FaEnvelope /></span>
              <div>
                <p className="font-bold">Email</p>
                <p className="text-gray-500 text-sm">info.ignitron@gmail.com</p>
              </div>
            </a>
            <a href={`tel:+${WHATSAPP_NUMBER}`} className="card p-6 flex items-center gap-4 hover:shadow-lg">
              <span className="w-12 h-12 rounded-full bg-orange-50 text-ignitron-orange flex items-center justify-center text-2xl"><FaPhone /></span>
              <div>
                <p className="font-bold">Phone</p>
                <p className="text-gray-500 text-sm">+91 7393985330</p>
              </div>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
