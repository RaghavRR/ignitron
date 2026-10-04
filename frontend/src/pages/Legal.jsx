import React from 'react';
import { useLocation } from 'react-router-dom';

const content = {
  '/privacy-policy': {
    title: 'Privacy Policy',
    body: 'IGNITRON Future Labs respects your privacy. Information submitted through our enquiry forms is used solely to respond to your request and is never sold to third parties. Contact info.ignitron@gmail.com for any data requests.',
  },
  '/terms': {
    title: 'Terms & Conditions',
    body: 'By using this website you agree to use its content for informational and educational purposes only. All project tutorials, kits and curriculum materials are the intellectual property of IGNITRON Future Labs.',
  },
};

const Legal = () => {
  const { pathname } = useLocation();
  const page = content[pathname] || content['/privacy-policy'];
  return (
    <section className="section bg-white">
      <div className="container-max max-w-3xl mx-auto">
        <h1 className="heading-lg mb-6">{page.title}</h1>
        <p className="text-gray-600 leading-relaxed">{page.body}</p>
      </div>
    </section>
  );
};

export default Legal;
