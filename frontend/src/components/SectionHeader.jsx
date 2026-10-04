import React from 'react';

const SectionHeader = ({ eyebrow, title, subtitle, align = 'left' }) => (
  <div className={`mb-10 ${align === 'center' ? 'text-center max-w-2xl mx-auto' : ''}`}>
    {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
    <h2 className="heading-md md:heading-lg">{title}</h2>
    {subtitle && <p className="text-gray-600 mt-3 text-base md:text-lg">{subtitle}</p>}
  </div>
);

export default SectionHeader;
