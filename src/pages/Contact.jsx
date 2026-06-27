import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'

// Custom hook for responsive breakpoints
function useMediaQuery(query) {
  const [matches, setMatches] = useState(false)
  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) setMatches(media.matches)
    const listener = () => setMatches(media.matches)
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [matches, query])
  return matches
}

function useResponsive() {
  const isMobile = useMediaQuery('(max-width: 640px)')
  const isTablet = useMediaQuery('(min-width: 641px) and (max-width: 1024px)')
  const isDesktop = useMediaQuery('(min-width: 1025px)')
  return { isMobile, isTablet, isDesktop }
}

// Animation Components
function FadeIn({ children, delay = 0, direction = "up", className = "" }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  
  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 }
  }
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...directions[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...directions[direction] }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function StaggerContainer({ children, className = "", staggerDelay = 0.1 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-30px" })
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: staggerDelay, delayChildren: 0.1 }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function StaggerItem({ children, className = "" }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// SVG Icons
const PhoneIcon = () => (
  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
)

const MailIcon = () => (
  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
)

const MapPinIcon = () => (
  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const ClockIcon = () => (
  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const SendIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
)

const CheckCircleIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const LoaderIcon = () => (
  <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
)

const ArrowRightIcon = () => (
  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
)

const LinkedinIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.771-.773 1.771-1.729V1.729C24 .774 23.222 0 22.225 0z" />
  </svg>
)

const TwitterIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0021.197-11.83c0-.213 0-.426-.015-.637A9.935 9.935 0 0024 4.555z" />
  </svg>
)

const FacebookIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
)

const InstagramIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
)

const UploadIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
  </svg>
)

const BriefcaseIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
)

const UserIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
)

// Contact Data
const contactInfo = [
  {
    icon: PhoneIcon,
    title: "Phone",
    details: ["+91 98765 43210", "+91 98765 43211"],
    color: "bg-[#4CAF50]/10 text-[#1e3a5f]",
    hoverColor: "group-hover:bg-[#1e3a5f] group-hover:text-white"
  },
  {
    icon: MailIcon,
    title: "Email",
    details: ["info@anaghaaconsultancy.com", "careers@anaghaaconsultancy.com"],
    color: "bg-[#1e3a5f]/10 text-[#4CAF50]",
    hoverColor: "group-hover:bg-[#4CAF50] group-hover:text-white"
  },
  {
    icon: MapPinIcon,
    title: "Office",
    details: [" 3-13-4/402 Nirmal’s Kamala Sadan, Ramanthapur, Hyderabad,500013"],
    color: "bg-green-50 text-green-600",
    hoverColor: "group-hover:bg-green-600 group-hover:text-white"
  },
  {
    icon: ClockIcon,
    title: "Working Hours",
    details: ["Mon - Fri: 9:00 AM - 6:00 PM", "Sat: 10:00 AM - 2:00 PM"],
    color: "bg-[#4CAF50]/10 text-[#1e3a5f]",
    hoverColor: "group-hover:bg-[#1e3a5f] group-hover:text-white"
  }
]

const socialLinks = [
  { icon: LinkedinIcon, href: "#", label: "LinkedIn", color: "hover:bg-[#1e3a5f]" },
  { icon: TwitterIcon, href: "#", label: "Twitter", color: "hover:bg-sky-500" },
  { icon: FacebookIcon, href: "#", label: "Facebook", color: "hover:bg-[#1e3a5f]" },
  { icon: InstagramIcon, href: "#", label: "Instagram", color: "hover:bg-pink-600" }
]

const experienceLevels = [
  "Fresher (0-1 years)",
  "Junior (1-3 years)",
  "Mid-level (3-5 years)",
  "Senior (5-8 years)",
  "Expert (8+ years)"
]

const industries = [
  "IT & Software",
  "Banking & Finance",
  "Healthcare",
  "Manufacturing",
  "Retail",
  "Education",
  "Real Estate",
  "Others"
]

export default function Contact() {
  const { isMobile, isTablet } = useResponsive()
  const [activeTab, setActiveTab] = useState('jobseeker')
  
  // Job Seeker Form State
  const [jobSeekerData, setJobSeekerData] = useState({
    fullName: "",
    email: "",
    phone: "",
    experience: "",
    currentCompany: "",
    expectedSalary: "",
    resume: null,
    skills: "",
    message: ""
  })
  
  // Company Form State
  const [companyData, setCompanyData] = useState({
    companyName: "",
    contactPerson: "",
    designation: "",
    email: "",
    phone: "",
    industry: "",
    companySize: "",
    jobTitle: "",
    jobDescription: "",
    requirements: "",
    urgency: ""
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [focusedField, setFocusedField] = useState(null)
  const [fileName, setFileName] = useState("")
  
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100])
  
  const handleJobSeekerSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setJobSeekerData({
        fullName: "",
        email: "",
        phone: "",
        experience: "",
        currentCompany: "",
        expectedSalary: "",
        resume: null,
        skills: "",
        message: ""
      })
      setFileName("")
    }, 3000)
  }
  
  const handleCompanySubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setCompanyData({
        companyName: "",
        contactPerson: "",
        designation: "",
        email: "",
        phone: "",
        industry: "",
        companySize: "",
        jobTitle: "",
        jobDescription: "",
        requirements: "",
        urgency: ""
      })
    }, 3000)
  }
  
  const handleJobSeekerChange = (e) => {
    const { name, value } = e.target
    setJobSeekerData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleCompanyChange = (e) => {
    const { name, value } = e.target
    setCompanyData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setJobSeekerData(prev => ({ ...prev, resume: file }))
      setFileName(file.name)
    }
  }

  return (
    <div className="min-h-screen bg-white overflow-x-hidden mt-12">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] overflow-hidden"
      >
        <motion.div 
          className="absolute inset-0"
          style={{ y: heroY }}
        >
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80"
            alt="Modern office"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a5f]/70 via-[#4CAF50]/60 to-[#1e3a5f]/65" />
        </motion.div>
        
        <motion.div 
          className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center"
          style={{ opacity: heroOpacity }}
        >
          <motion.nav 
            className="flex items-center gap-2 text-xs sm:text-sm mb-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/" className="text-[#4CAF50] hover:text-[#5cc561] transition-colors font-medium">
              Home
            </Link>
            <span className="text-[#4CAF50]/60">›</span>
            <span className="text-white font-medium">Contact Us</span>
          </motion.nav>
          
          <motion.h1 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Let's <span className="text-amber-400">Connect</span>
          </motion.h1>
          
          <motion.p 
            className="text-sm sm:text-base md:text-lg text-green-50 max-w-2xl leading-relaxed font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Ready to transform your workforce? Get in touch with our expert consultants today.
          </motion.p>
        </motion.div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-8 sm:py-10 lg:py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4" staggerDelay={0.1}>
            {contactInfo.map((item) => (
              <StaggerItem key={item.title}>
                <motion.div 
                  className="group bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-gray-100 cursor-pointer h-full"
                  whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div 
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg ${item.color} flex items-center justify-center mb-3 transition-all duration-300 ${item.hoverColor}`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <item.icon />
                  </motion.div>
                  <h3 className="font-bold text-gray-900 mb-1 text-sm sm:text-base">{item.title}</h3>
                  {item.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                      {detail}
                    </p>
                  ))}
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Main Enquiry Forms Section */}
      <section className="py-8 sm:py-10 lg:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Tab Navigation */}
          <FadeIn>
            <div className="flex justify-center mb-8">
              <div className="bg-gray-100 p-1 rounded-2xl inline-flex">
                <motion.button
                  onClick={() => { setActiveTab('jobseeker'); setIsSubmitted(false); setIsSubmitting(false); }}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all ${
                    activeTab === 'jobseeker' 
                      ? 'bg-white text-[#1e3a5f] shadow-md' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  whileHover={{ scale: activeTab === 'jobseeker' ? 1 : 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <UserIcon />
                  Job Seekers
                </motion.button>
                <motion.button
                  onClick={() => { setActiveTab('company'); setIsSubmitted(false); setIsSubmitting(false); }}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all ${
                    activeTab === 'company' 
                      ? 'bg-white text-[#1e3a5f] shadow-md' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  whileHover={{ scale: activeTab === 'company' ? 1 : 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <BriefcaseIcon />
                  Companies
                </motion.button>
              </div>
            </div>
          </FadeIn>

          {/* ✅ FIX: grid with proper column spans — both children now live inside the grid */}
          <div className="grid lg:grid-cols-5 gap-6 lg:gap-8 items-start">
            
            {/* Left: Forms Area - Takes 3 columns */}
            <div className="lg:col-span-3">
              <AnimatePresence mode="wait">
                {activeTab === 'jobseeker' ? (
                  <motion.div
                    key="jobseeker"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 sm:p-6">
                      <div className="mb-6">
                        <motion.span 
                          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4CAF50]/10 text-[#4CAF50] text-xs font-semibold mb-2"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                        >
                          <span className="w-2 h-2 rounded-full bg-[#4CAF50] animate-pulse" />
                          For Candidates
                        </motion.span>
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                          Submit Your Resume
                        </h2>
                        <p className="text-gray-600 text-xs sm:text-sm">
                          Looking for your dream job? Upload your resume and we'll match you with the best opportunities.
                        </p>
                      </div>

                      <form onSubmit={handleJobSeekerSubmit} className="space-y-4">
                        {/* Personal Details */}
                        <div className="grid sm:grid-cols-2 gap-4">
                          <motion.div 
                            className="relative"
                            animate={{ scale: focusedField === 'js-name' ? 1.02 : 1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <label className="block text-xs font-semibold text-gray-700 mb-1">
                              Full Name *
                            </label>
                            <input
                              type="text"
                              name="fullName"
                              required
                              value={jobSeekerData.fullName}
                              onChange={handleJobSeekerChange}
                              onFocus={() => setFocusedField('js-name')}
                              onBlur={() => setFocusedField(null)}
                              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-[#4CAF50] focus:ring-2 focus:ring-green-200 outline-none transition-all text-sm"
                              placeholder="John Doe"
                            />
                          </motion.div>

                          <motion.div 
                            className="relative"
                            animate={{ scale: focusedField === 'js-email' ? 1.02 : 1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <label className="block text-xs font-semibold text-gray-700 mb-1">
                              Email Address *
                            </label>
                            <input
                              type="email"
                              name="email"
                              required
                              value={jobSeekerData.email}
                              onChange={handleJobSeekerChange}
                              onFocus={() => setFocusedField('js-email')}
                              onBlur={() => setFocusedField(null)}
                              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-[#4CAF50] focus:ring-2 focus:ring-green-200 outline-none transition-all text-sm"
                              placeholder="john@example.com"
                            />
                          </motion.div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <motion.div
                            animate={{ scale: focusedField === 'js-phone' ? 1.02 : 1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <label className="block text-xs font-semibold text-gray-700 mb-1">
                              Phone Number *
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              required
                              value={jobSeekerData.phone}
                              onChange={handleJobSeekerChange}
                              onFocus={() => setFocusedField('js-phone')}
                              onBlur={() => setFocusedField(null)}
                              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-[#4CAF50] focus:ring-2 focus:ring-green-200 outline-none transition-all text-sm"
                              placeholder="+91 98765 43210"
                            />
                          </motion.div>

                          <motion.div
                            animate={{ scale: focusedField === 'js-experience' ? 1.02 : 1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <label className="block text-xs font-semibold text-gray-700 mb-1">
                              Experience Level *
                            </label>
                            <select
                              name="experience"
                              required
                              value={jobSeekerData.experience}
                              onChange={handleJobSeekerChange}
                              onFocus={() => setFocusedField('js-experience')}
                              onBlur={() => setFocusedField(null)}
                              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-[#4CAF50] focus:ring-2 focus:ring-green-200 outline-none transition-all text-sm bg-white"
                            >
                              <option value="">Select experience</option>
                              {experienceLevels.map(level => (
                                <option key={level} value={level}>{level}</option>
                              ))}
                            </select>
                          </motion.div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <motion.div
                            animate={{ scale: focusedField === 'js-company' ? 1.02 : 1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <label className="block text-xs font-semibold text-gray-700 mb-1">
                              Current Company
                            </label>
                            <input
                              type="text"
                              name="currentCompany"
                              value={jobSeekerData.currentCompany}
                              onChange={handleJobSeekerChange}
                              onFocus={() => setFocusedField('js-company')}
                              onBlur={() => setFocusedField(null)}
                              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-[#4CAF50] focus:ring-2 focus:ring-green-200 outline-none transition-all text-sm"
                              placeholder="Current employer (if any)"
                            />
                          </motion.div>

                          <motion.div
                            animate={{ scale: focusedField === 'js-salary' ? 1.02 : 1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <label className="block text-xs font-semibold text-gray-700 mb-1">
                              Expected Salary (LPA)
                            </label>
                            <input
                              type="text"
                              name="expectedSalary"
                              value={jobSeekerData.expectedSalary}
                              onChange={handleJobSeekerChange}
                              onFocus={() => setFocusedField('js-salary')}
                              onBlur={() => setFocusedField(null)}
                              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-[#4CAF50] focus:ring-2 focus:ring-green-200 outline-none transition-all text-sm"
                              placeholder="e.g., 5-7 LPA"
                            />
                          </motion.div>
                        </div>

                        {/* Resume Upload */}
                        <motion.div
                          className="relative"
                          animate={{ scale: focusedField === 'js-resume' ? 1.02 : 1 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Upload Resume *
                          </label>
                          <div className="relative">
                            <input
                              type="file"
                              name="resume"
                              required
                              accept=".pdf,.doc,.docx"
                              onChange={handleFileChange}
                              onFocus={() => setFocusedField('js-resume')}
                              onBlur={() => setFocusedField(null)}
                              className="hidden"
                              id="resume-upload"
                            />
                            <label
                              htmlFor="resume-upload"
                              className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#4CAF50] hover:bg-green-50 transition-all group"
                            >
                              <UploadIcon />
                              <span className="text-sm text-gray-600 group-hover:text-[#4CAF50] font-medium">
                                {fileName || "Click to upload PDF, DOC, or DOCX"}
                              </span>
                            </label>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">Max file size: 5MB</p>
                        </motion.div>

                        <motion.div
                          animate={{ scale: focusedField === 'js-skills' ? 1.02 : 1 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Key Skills
                          </label>
                          <input
                            type="text"
                            name="skills"
                            value={jobSeekerData.skills}
                            onChange={handleJobSeekerChange}
                            onFocus={() => setFocusedField('js-skills')}
                            onBlur={() => setFocusedField(null)}
                            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-[#4CAF50] focus:ring-2 focus:ring-green-200 outline-none transition-all text-sm"
                            placeholder="e.g., React, Node.js, Python, Project Management"
                          />
                        </motion.div>

                        <motion.div
                          animate={{ scale: focusedField === 'js-message' ? 1.02 : 1 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Additional Message
                          </label>
                          <textarea
                            name="message"
                            rows={3}
                            value={jobSeekerData.message}
                            onChange={handleJobSeekerChange}
                            onFocus={() => setFocusedField('js-message')}
                            onBlur={() => setFocusedField(null)}
                            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-[#4CAF50] focus:ring-2 focus:ring-green-200 outline-none transition-all resize-none text-sm"
                            placeholder="Tell us about your career goals..."
                          />
                        </motion.div>

                        <motion.button
                          type="submit"
                          disabled={isSubmitting || isSubmitted}
                          className={`w-full py-3 rounded-lg font-semibold text-white flex items-center justify-center gap-2 transition-all ${
                            isSubmitted ? 'bg-green-500' : 'bg-gradient-to-r from-[#1e3a5f] to-[#4CAF50] hover:from-[#152a45] hover:to-[#3d9a3f] cursor-pointer'
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <AnimatePresence mode="wait">
                            {isSubmitting ? (
                              <motion.div
                                key="loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex items-center gap-2"
                              >
                                <LoaderIcon />
                                <span className="text-sm">Submitting...</span>
                              </motion.div>
                            ) : isSubmitted ? (
                              <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex items-center gap-2"
                              >
                                <CheckCircleIcon />
                                <span className="text-sm">Application Submitted!</span>
                              </motion.div>
                            ) : (
                              <motion.div
                                key="send"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex items-center gap-2"
                              >
                                <span className="text-sm">Submit Application</span>
                                <SendIcon />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.button>
                      </form>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="company"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 sm:p-6">
                      <div className="mb-6">
                        <motion.span 
                          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4CAF50]/10 text-[#4CAF50] text-xs font-semibold mb-2"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                        >
                          <span className="w-2 h-2 rounded-full bg-[#4CAF50] animate-pulse" />
                          For Employers
                        </motion.span>
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                          Post Job Requirements
                        </h2>
                        <p className="text-gray-600 text-xs sm:text-sm">
                          Looking for talent? Share your requirements and we'll find the perfect candidates for your organization.
                        </p>
                      </div>

                      <form onSubmit={handleCompanySubmit} className="space-y-4">
                        {/* Company Details */}
                        <div className="bg-gray-50 p-4 rounded-xl">
                          <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <BriefcaseIcon />
                            Company Information
                          </h3>
                          <div className="grid sm:grid-cols-2 gap-4">
                            <motion.div 
                              className="relative"
                              animate={{ scale: focusedField === 'co-name' ? 1.02 : 1 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <label className="block text-xs font-semibold text-gray-700 mb-1">
                                Company Name *
                              </label>
                              <input
                                type="text"
                                name="companyName"
                                required
                                value={companyData.companyName}
                                onChange={handleCompanyChange}
                                onFocus={() => setFocusedField('co-name')}
                                onBlur={() => setFocusedField(null)}
                                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-[#4CAF50] focus:ring-2 focus:ring-green-200 outline-none transition-all text-sm"
                                placeholder="Company Ltd."
                              />
                            </motion.div>

                            <motion.div 
                              className="relative"
                              animate={{ scale: focusedField === 'co-contact' ? 1.02 : 1 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <label className="block text-xs font-semibold text-gray-700 mb-1">
                                Contact Person *
                              </label>
                              <input
                                type="text"
                                name="contactPerson"
                                required
                                value={companyData.contactPerson}
                                onChange={handleCompanyChange}
                                onFocus={() => setFocusedField('co-contact')}
                                onBlur={() => setFocusedField(null)}
                                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-[#4CAF50] focus:ring-2 focus:ring-green-200 outline-none transition-all text-sm"
                                placeholder="Full Name"
                              />
                            </motion.div>

                            <motion.div 
                              className="relative"
                              animate={{ scale: focusedField === 'co-designation' ? 1.02 : 1 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <label className="block text-xs font-semibold text-gray-700 mb-1">
                                Designation *
                              </label>
                              <input
                                type="text"
                                name="designation"
                                required
                                value={companyData.designation}
                                onChange={handleCompanyChange}
                                onFocus={() => setFocusedField('co-designation')}
                                onBlur={() => setFocusedField(null)}
                                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-[#4CAF50] focus:ring-2 focus:ring-green-200 outline-none transition-all text-sm"
                                placeholder="HR Manager, CTO, etc."
                              />
                            </motion.div>

                            <motion.div 
                              className="relative"
                              animate={{ scale: focusedField === 'co-industry' ? 1.02 : 1 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <label className="block text-xs font-semibold text-gray-700 mb-1">
                                Industry *
                              </label>
                              <select
                                name="industry"
                                required
                                value={companyData.industry}
                                onChange={handleCompanyChange}
                                onFocus={() => setFocusedField('co-industry')}
                                onBlur={() => setFocusedField(null)}
                                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-[#4CAF50] focus:ring-2 focus:ring-green-200 outline-none transition-all text-sm bg-white"
                              >
                                <option value="">Select industry</option>
                                {industries.map(ind => (
                                  <option key={ind} value={ind}>{ind}</option>
                                ))}
                              </select>
                            </motion.div>

                            <motion.div 
                              className="relative"
                              animate={{ scale: focusedField === 'co-size' ? 1.02 : 1 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <label className="block text-xs font-semibold text-gray-700 mb-1">
                                Company Size
                              </label>
                              <select
                                name="companySize"
                                value={companyData.companySize}
                                onChange={handleCompanyChange}
                                onFocus={() => setFocusedField('co-size')}
                                onBlur={() => setFocusedField(null)}
                                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-[#4CAF50] focus:ring-2 focus:ring-green-200 outline-none transition-all text-sm bg-white"
                              >
                                <option value="">Select size</option>
                                <option value="1-50">1-50 employees</option>
                                <option value="51-200">51-200 employees</option>
                                <option value="201-500">201-500 employees</option>
                                <option value="501-1000">501-1000 employees</option>
                                <option value="1000+">1000+ employees</option>
                              </select>
                            </motion.div>

                            <motion.div
                              animate={{ scale: focusedField === 'co-phone' ? 1.02 : 1 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <label className="block text-xs font-semibold text-gray-700 mb-1">
                                Phone Number *
                              </label>
                              <input
                                type="tel"
                                name="phone"
                                required
                                value={companyData.phone}
                                onChange={handleCompanyChange}
                                onFocus={() => setFocusedField('co-phone')}
                                onBlur={() => setFocusedField(null)}
                                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-[#4CAF50] focus:ring-2 focus:ring-green-200 outline-none transition-all text-sm"
                                placeholder="+91 98765 43210"
                              />
                            </motion.div>
                          </div>
                        </div>

                        {/* Job Requirements */}
                        <div className="bg-[#4CAF50]/5 p-4 rounded-xl">
                          <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <BriefcaseIcon />
                            Job Requirements
                          </h3>
                          <div className="space-y-4">
                            <motion.div 
                              className="relative"
                              animate={{ scale: focusedField === 'co-title' ? 1.02 : 1 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <label className="block text-xs font-semibold text-gray-700 mb-1">
                                Job Title/Position *
                              </label>
                              <input
                                type="text"
                                name="jobTitle"
                                required
                                value={companyData.jobTitle}
                                onChange={handleCompanyChange}
                                onFocus={() => setFocusedField('co-title')}
                                onBlur={() => setFocusedField(null)}
                                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-[#4CAF50] focus:ring-2 focus:ring-green-200 outline-none transition-all text-sm"
                                placeholder="e.g., Senior React Developer"
                              />
                            </motion.div>

                            <motion.div
                              animate={{ scale: focusedField === 'co-desc' ? 1.02 : 1 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <label className="block text-xs font-semibold text-gray-700 mb-1">
                                Job Description *
                              </label>
                              <textarea
                                name="jobDescription"
                                required
                                rows={3}
                                value={companyData.jobDescription}
                                onChange={handleCompanyChange}
                                onFocus={() => setFocusedField('co-desc')}
                                onBlur={() => setFocusedField(null)}
                                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-[#4CAF50] focus:ring-2 focus:ring-green-200 outline-none transition-all resize-none text-sm"
                                placeholder="Brief description of the role, responsibilities..."
                              />
                            </motion.div>

                            <div className="grid sm:grid-cols-2 gap-4">
                              <motion.div
                                animate={{ scale: focusedField === 'co-req' ? 1.02 : 1 }}
                                transition={{ type: "spring", stiffness: 300 }}
                              >
                                <label className="block text-xs font-semibold text-gray-700 mb-1">
                                  Specific Requirements
                                </label>
                                <input
                                  type="text"
                                  name="requirements"
                                  value={companyData.requirements}
                                  onChange={handleCompanyChange}
                                  onFocus={() => setFocusedField('co-req')}
                                  onBlur={() => setFocusedField(null)}
                                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-[#4CAF50] focus:ring-2 focus:ring-green-200 outline-none transition-all text-sm"
                                  placeholder="Skills, experience, qualifications..."
                                />
                              </motion.div>

                              <motion.div
                                animate={{ scale: focusedField === 'co-urgency' ? 1.02 : 1 }}
                                transition={{ type: "spring", stiffness: 300 }}
                              >
                                <label className="block text-xs font-semibold text-gray-700 mb-1">
                                  Hiring Urgency
                                </label>
                                <select
                                  name="urgency"
                                  value={companyData.urgency}
                                  onChange={handleCompanyChange}
                                  onFocus={() => setFocusedField('co-urgency')}
                                  onBlur={() => setFocusedField(null)}
                                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-[#4CAF50] focus:ring-2 focus:ring-green-200 outline-none transition-all text-sm bg-white"
                                >
                                  <option value="">Select priority</option>
                                  <option value="immediate">Immediate (Within 1 week)</option>
                                  <option value="urgent">Urgent (Within 2 weeks)</option>
                                  <option value="moderate">Moderate (Within 1 month)</option>
                                  <option value="planning">Future Planning</option>
                                </select>
                              </motion.div>
                            </div>
                          </div>
                        </div>

                        {/* ✅ FIX: Missing email field added to company form */}
                        <motion.div
                          animate={{ scale: focusedField === 'co-email' ? 1.02 : 1 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Business Email *
                          </label>
                          <input
                            type="email"
                            name="email"
                            required
                            value={companyData.email}
                            onChange={handleCompanyChange}
                            onFocus={() => setFocusedField('co-email')}
                            onBlur={() => setFocusedField(null)}
                            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-[#4CAF50] focus:ring-2 focus:ring-green-200 outline-none transition-all text-sm"
                            placeholder="hr@company.com"
                          />
                        </motion.div>

                        <motion.button
                          type="submit"
                          disabled={isSubmitting || isSubmitted}
                          className={`w-full py-3 rounded-lg font-semibold text-white flex items-center justify-center gap-2 transition-all ${
                            isSubmitted ? 'bg-green-500' : 'bg-gradient-to-r from-[#1e3a5f] to-[#4CAF50] hover:from-[#152a45] hover:to-[#3d9a3f] cursor-pointer'
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <AnimatePresence mode="wait">
                            {isSubmitting ? (
                              <motion.div
                                key="loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex items-center gap-2"
                              >
                                <LoaderIcon />
                                <span className="text-sm">Submitting...</span>
                              </motion.div>
                            ) : isSubmitted ? (
                              <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex items-center gap-2"
                              >
                                <CheckCircleIcon />
                                <span className="text-sm">Request Submitted!</span>
                              </motion.div>
                            ) : (
                              <motion.div
                                key="send"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex items-center gap-2"
                              >
                                <span className="text-sm">Submit Requirement</span>
                                <SendIcon />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.button>
                      </form>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ✅ FIX: Right Info Panel — now correctly wrapped in lg:col-span-2 div */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                className="space-y-5 lg:sticky lg:top-4"
              >
                {/* Why Choose Us */}
                <div className="bg-white rounded-2xl p-5 shadow-md border border-gray-100">
                  <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-[#4CAF50]/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-[#4CAF50]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </span>
                    Why Partner With Us?
                  </h3>
                  <StaggerContainer className="space-y-3" staggerDelay={0.08}>
                    {[
                      { icon: "🎯", text: "Precision Matching", desc: "AI-powered candidate filtering" },
                      { icon: "⚡", text: "Fast Turnaround", desc: "48-hour shortlist guarantee" },
                      { icon: "🤝", text: "End-to-End Support", desc: "From sourcing to onboarding" },
                      { icon: "📊", text: "Market Insights", desc: "Salary benchmarking & trends" }
                    ].map((item, index) => (
                      <StaggerItem key={index}>
                        <motion.div 
                          className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
                          whileHover={{ x: 5 }}
                        >
                          <span className="text-lg group-hover:scale-110 transition-transform">{item.icon}</span>
                          <div>
                            <div className="text-sm font-semibold text-gray-800">{item.text}</div>
                            <div className="text-xs text-gray-500">{item.desc}</div>
                          </div>
                        </motion.div>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </div>

                {/* Map Section */}
                <motion.div 
                  className="relative rounded-2xl overflow-hidden shadow-lg bg-gray-100 h-[280px] sm:h-[320px] group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d7614.737863259963!2d78.53201504007896!3d17.394073751930463!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1s3-13-4%2F402%20Nirmal%E2%80%99s%20Kamala%20Sadan%2C%20Ramanthapur%2C%20Hyderabad%2C500013!5e0!3m2!1sen!2sin!4v1776417057017!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: "grayscale(15%) contrast(1.1) brightness(0.95)" }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#1e3a5f]/60 via-[#4CAF50]/20 to-transparent pointer-events-none" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                    <motion.div 
                      className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/20"
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-start gap-3 sm:gap-4">
                        <motion.div 
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-linear-to-br from-[#4CAF50] to-[#1e3a5f] flex items-center justify-center text-white flex-shrink-0 shadow-lg"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        >
                          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </motion.div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-gray-900 text-sm sm:text-base">Hyderabad Office</p>
                          <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed font-medium">
                             3-13-4/402 Nirmal’s Kamala Sadan, Ramanthapur, Hyderabad,500013
                          </p>
                        </div>
                        <motion.a
                          href="https://maps.google.com/?q=3-13-4/402+Nirmal's+Kamala+Sadan+Ramanthapur+Hyderabad"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#4CAF50]/10 flex items-center justify-center text-[#4CAF50] flex-shrink-0 hover:bg-[#4CAF50] hover:text-white transition-all shadow-md"
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </motion.a>
                      </div>
                    </motion.div>
                  </div>

                  <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full pointer-events-none"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="w-4 h-4 bg-[#4CAF50] rounded-full shadow-lg shadow-[#4CAF50]/50" />
                    <div className="w-8 h-2 bg-black/20 rounded-full blur-sm mt-1 -ml-2" />
                  </motion.div>
                </motion.div>

                {/* Social Links */}
                <div className="bg-white rounded-xl p-4 border border-gray-200">
                  <div className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wider">Follow Us</div>
                  <div className="flex gap-2">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-600 transition-all hover:shadow-md"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.1, y: -3, backgroundColor: "#7c3aed", color: "#fff" }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={social.label}
                      >
                        <social.icon />
                      </motion.a>
                    ))}
                  </div>
                </div>

              </motion.div>
            </div>
            {/* End Right Info Panel */}

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 sm:py-10 bg-gradient-to-r from-[#1e3a5f] to-[#4CAF50] relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 opacity-10"
          animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h2 
            className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Ready to Transform Your Workforce?
          </motion.h2>
          <motion.p 
            className="text-white/80 text-xs sm:text-sm mb-4 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Whether you're a job seeker or an employer, we're here to help you succeed.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <motion.button
              onClick={() => { setActiveTab('jobseeker'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full font-semibold text-xs sm:text-sm transition-all ${
                activeTab === 'jobseeker' 
                  ? 'bg-white text-[#1e3a5f]' 
                  : 'bg-[#1e3a5f] text-white border border-[#1e3a5f] hover:bg-[#152a45]'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <UserIcon />
              I'm a Job Seeker
            </motion.button>
            <motion.button
              onClick={() => { setActiveTab('company'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full font-semibold text-xs sm:text-sm transition-all ${
                activeTab === 'company' 
                  ? 'bg-white text-[#1e3a5f]' 
                  : 'bg-[#1e3a5f] text-white border border-[#1e3a5f] hover:bg-[#152a45]'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <BriefcaseIcon />
              I'm an Employer
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
