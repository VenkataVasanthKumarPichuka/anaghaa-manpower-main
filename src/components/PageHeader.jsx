import React from 'react';
import SectionLabel from './SectionLabel';

export default function PageHeader({ title, subtitle, label }) {
  return (
    <div className="text-center mb-16">
      <SectionLabel label={label} centered={true} />
      <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-gray-800 mb-4">
        {title}
      </h1>
      {subtitle && (
        <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}