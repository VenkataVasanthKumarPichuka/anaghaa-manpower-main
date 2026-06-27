import React from 'react';

export default function SectionLabel({ label, centered = false }) {
  return (
    <div className={`flex items-center gap-3 ${centered ? 'justify-center' : ''} mb-4`}>
      <div className="h-px w-8 bg-violet-400" />
      <span className="text-xs text-violet-600 tracking-[0.2em] uppercase">{label}</span>
      <div className="h-px w-8 bg-violet-400" />
    </div>
  );
}