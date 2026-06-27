// UI.jsx - Complete fixed version
import React from 'react';

// SectionHeader
export function SectionHeader({ tag, title, subtitle, center = false }) {
  return (
    <div className={`mb-10 ${center ? 'text-center' : ''}`}>
      {tag && (
        <p className="text-xs font-semibold uppercase tracking-widest text-violet-600 mb-2">
          {tag}
        </p>
      )}
      <h2 className="font-syne text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="text-gray-500 text-base leading-relaxed max-w-xl">
          {subtitle}
        </p>
      )}
    </div>
  )
}

// ServiceCard
export function ServiceCard({ icon, title, description, color }) {
  return (
    <div className="border border-gray-100 rounded-xl p-6 bg-white hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer group">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-4 ${color}`}>
        {icon}
      </div>
      <h3 className="font-syne font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
    </div>
  )
}

// StatCard
export function StatCard({ number, label }) {
  return (
    <div>
      <div className="font-syne text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
        {number}
      </div>
      <div className="text-sm text-gray-500 mt-1">{label}</div>
    </div>
  )
}

// TestimonialCard
export function TestimonialCard({ name, role, initials, color, text, stars }) {
  return (
    <div className="border border-gray-100 rounded-xl p-6 bg-white hover:shadow-md transition-all duration-200">
      <div className="text-amber-400 text-sm tracking-widest mb-3">
        {'★'.repeat(stars)}
      </div>
      <p className="text-sm text-gray-500 leading-relaxed italic mb-4">"{text}"</p>
      <div className="flex items-center gap-3">
        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold ${color}`}>
          {initials}
        </div>
        <div>
          <div className="text-sm font-semibold text-gray-800">{name}</div>
          <div className="text-xs text-gray-400">{role}</div>
        </div>
      </div>
    </div>
  )
}

// JobCard
export function JobCard({ job, onApply }) {
  return (
    <div className="border border-gray-100 rounded-xl p-5 bg-white hover:shadow-md transition-shadow flex items-start justify-between gap-4">
      <div className="flex-1 min-w-0">
        <h3 className="font-syne font-semibold text-gray-900 text-base mb-0.5">{job.title}</h3>
        <p className="text-sm text-gray-400 mb-2">{job.company} · {job.location}</p>
        <div className="flex flex-wrap gap-1.5 mb-2">
          {job.tags.map((tag) => (
            <span key={tag} className="text-xs bg-violet-50 text-violet-700 px-2.5 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
          <span className="bg-green-50 text-green-700 px-2 py-0.5 rounded-full">{job.type}</span>
          <span>{job.salary}</span>
          <span>{job.posted}</span>
        </div>
      </div>
      <button
        onClick={() => onApply && onApply(job)}
        className="flex-shrink-0 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200"
      >
        Apply
      </button>
    </div>
  )
}

// Button component (This was missing - FIXED)
export function Btn({ children, variant = 'primary', className = '', ...props }) {
  const base = 'inline-flex items-center justify-center px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 cursor-pointer'
  const variants = {
    primary: 'bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-sm hover:shadow-md',
    outline: 'border border-violet-300 text-violet-600 hover:bg-violet-50',
    outlineDark: 'border border-gray-300 text-gray-700 hover:bg-gray-50',
    dark: 'bg-gray-800 hover:bg-gray-900 text-white',
  }

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}

// Also export a default object for convenience
const UI = {
  SectionHeader,
  ServiceCard,
  StatCard,
  TestimonialCard,
  JobCard,
  Btn,
};

export default UI;