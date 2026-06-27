import { Link } from 'react-router-dom'
import { SectionHeader, Btn } from '../components/UI'
import { useRef, useState, useEffect } from 'react'
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'

// Custom hook for responsive breakpoints - ENHANCED
function useMediaQuery(query) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }
    const listener = () => setMatches(media.matches)
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [matches, query])

  return matches
}

// Hook for mobile/tablet/laptop/large detection
function useResponsive() {
  const isMobile = useMediaQuery('(max-width: 640px)')
  const isTablet = useMediaQuery('(min-width: 641px) and (max-width: 1024px)')
  const isLaptop = useMediaQuery('(min-width: 1025px) and (max-width: 1280px)')
  const isLarge = useMediaQuery('(min-width: 1281px)')
  const isPortrait = useMediaQuery('(orientation: portrait)')
  
  return { isMobile, isTablet, isLaptop, isLarge, isPortrait }
}

// Animated Section Component - RESPONSIVE
function AnimatedSection({ children, className = "", delay = 0 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Stagger Container for child animations - RESPONSIVE
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
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0.1
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Individual stagger item - RESPONSIVE
function StaggerItem({ children, className = "" }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: {
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1]
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Slide In Component - RESPONSIVE
function SlideIn({ children, from = "left", delay = 0, className = "", duration = 0.6 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-30px" })
  
  const getInitialPosition = () => {
    const distance = 40
    switch(from) {
      case "left": return { x: -distance, y: 0 }
      case "right": return { x: distance, y: 0 }
      case "bottom": return { x: 0, y: distance }
      case "top": return { x: 0, y: -distance }
      default: return { x: -distance, y: 0 }
    }
  }
  
  const initial = getInitialPosition()
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...initial }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...initial }}
      transition={{ 
        duration, 
        delay,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Parallax Image Component - RESPONSIVE
function ParallaxImage({ src, alt, className = "", speed = 0.5 }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 50 * speed])
  
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </motion.div>
  )
}

// Hover Card Component - RESPONSIVE
function HoverCard({ children, className = "" }) {
  const { isMobile } = useResponsive()
  
  return (
    <motion.div
      whileHover={!isMobile ? { 
        y: -6,
        boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
      } : {}}
      whileTap={isMobile ? { scale: 0.98 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Counter Animation Component - RESPONSIVE
function AnimatedCounter({ target, suffix = "", duration = 2 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)
  const { isMobile } = useResponsive()
  
  useEffect(() => {
    if (isInView) {
      let startTime = null
      const actualDuration = isMobile ? duration * 0.8 : duration // Faster on mobile
      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / (actualDuration * 1000), 1)
        setCount(Math.floor(progress * parseInt(target.replace(/,/g, ''))))
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      requestAnimationFrame(animate)
    }
  }, [isInView, target, isMobile])

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
      transition={{ type: "spring", stiffness: 100, damping: 10 }}
    >
      {count.toLocaleString()}{suffix}
    </motion.span>
  )
}

const Team = [
  { initials: 'AC', name: 'Founder & CEO', role: 'Anaghaa Consultancy Services', color: 'bg-[#1e3a5f]/10 text-[#1e3a5f]' },
  { initials: 'HR', name: 'Head of Recruitment', role: '5+ years experience', color: 'bg-[#4CAF50]/10 text-[#4CAF50]' },
  { initials: 'OB', name: 'Operations Manager', role: 'Pan-India placements', color: 'bg-[#1e3a5f]/10 text-[#1e3a5f]' },
  { initials: 'KP', name: 'HR Consulting Lead', role: 'Policy & compliance', color: 'bg-[#4CAF50]/10 text-[#4CAF50]' },
]

const Achievements = [
  { number: '100+', label: 'Successful placements' },
  { number: '10+', label: 'Satisfied clients' },
  { number: '12+', label: 'Industries served' },
  { number: '5+', label: 'Years in business' },
]

const reasons = [
  {
    title: 'Expert Team',
    desc: 'Our consultants bring 5+ years of industry experience and deep market insights.',
    icon: '👥'
  },
  {
    title: 'Personalized Approach',
    desc: 'We understand your unique needs and craft tailored solutions, not cookie-cutter answers.',
    icon: '🎯'
  },
  {
    title: 'Transparent Process',
    desc: 'Clear communication at every step. You know exactly what you\'re getting and why.',
    icon: '🔍'
  },
  {
    title: 'Results That Matter',
    desc: 'We measure success by real outcomes: placements that stick, clients that return.',
    icon: '✨'
  }
]

export default function About() {
  const { isMobile, isTablet, isLaptop, isLarge } = useResponsive()
  const heroRef = useRef(null)
  const { scrollY } = useScroll()
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0])
  const heroScale = useTransform(scrollY, [0, 300], [1, 1.1])
  
  // Responsive hero height
  const getHeroHeight = () => {
    if (isMobile) return "h-[250px] sm:h-[300px]"
    if (isTablet) return "h-[350px] md:h-[400px]"
    if (isLaptop) return "h-[400px] lg:h-[450px]"
    return "h-[450px] xl:h-[500px]"
  }

  // Responsive text sizes
  const getTitleSize = () => {
    if (isMobile) return "text-2xl sm:text-3xl"
    if (isTablet) return "text-4xl md:text-5xl"
    if (isLaptop) return "text-5xl lg:text-6xl"
    return "text-6xl xl:text-7xl"
  }

  // Responsive grid columns for team
  const getTeamGridCols = () => {
    if (isMobile) return "grid-cols-2"
    if (isTablet) return "grid-cols-2 md:grid-cols-4"
    return "grid-cols-4"
  }

  // Responsive padding
  const getSectionPadding = () => {
    if (isMobile) return "py-8 sm:py-10"
    if (isTablet) return "py-10 md:py-12"
    if (isLaptop) return "py-12 lg:py-14"
    return "py-14 xl:py-16"
  }

  // Responsive gap
  const getGap = () => {
    if (isMobile) return "gap-3"
    if (isTablet) return "gap-4 md:gap-6"
    return "gap-6 lg:gap-8"
  }
  
  return (
    <div className="overflow-x-hidden mt-12">
      {/* Hero Section with Parallax - RESPONSIVE */}
      <section ref={heroRef} className={`relative w-full ${getHeroHeight()} overflow-hidden`}>
        {/* Background Image with Parallax */}
        <motion.div 
          className="absolute inset-0"
          style={{ scale: heroScale }}
        >
          <img
            src="https://thumbs.dreamstime.com/b/business-team-meeting-modern-office-stunning-cityscape-background-sunset-professionals-silhouetted-discussing-377360085.jpg"
            alt="Business team meeting"
            className="w-full h-full object-cover"
          />
          {/* Blue Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a5f]/70 via-[#4CAF50]/60 to-[#1e3a5f]/65" />
        </motion.div>

        {/* Content Container */}
        <motion.div 
          className={`relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 flex flex-col justify-center ${isMobile ? 'pt-12' : ''}`}
          style={{ opacity: heroOpacity }}
        >
          {/* Breadcrumb */}
          <motion.div 
            className={`${isMobile ? 'mb-2' : 'mb-4 sm:mb-6 lg:mb-8'}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <nav className="flex items-center gap-2 text-xs sm:text-sm">
              <Link to="/" className="text-[#4CAF50] hover:text-[#5cc561] transition-colors font-medium">
                Home
              </Link>
              <span className="text-[#4CAF50]/60">›</span>
              <span className="text-white font-medium">About Us</span>
            </nav>
          </motion.div>

          {/* Main Title */}
          <div className="max-w-3xl">
            <motion.h1 
              className={`font-bold text-white mb-3 sm:mb-4 lg:mb-6 tracking-tight ${getTitleSize()}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              About <span className="text-[#4CAF50]">anaghaa</span>
            </motion.h1>

            {/* Quote Box */}
            <motion.div 
              className={`border-l-4 border-amber-400 pl-3 sm:pl-4 md:pl-6 ${isMobile ? 'py-1' : 'py-2'}`}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <p className={`text-blue-100 italic leading-relaxed font-light ${isMobile ? 'text-sm' : 'text-base sm:text-lg md:text-xl lg:text-2xl'}`}>
                "Good work should create real results, not just good-looking presentations — and we are here to deliver exactly that."
              </p>
              <motion.p 
                className={`text-amber-400 font-semibold ${isMobile ? 'mt-2 text-xs' : 'mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg'}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                — Anaghaa Consultancy Services, est. 2026
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* About Section - RESPONSIVE */}
      <section className={`${getSectionPadding()} bg-white`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className={`grid grid-cols-1 ${isMobile ? '' : 'lg:grid-cols-2'} ${getGap()} items-center`}>
            
            {/* Left Image Grid */}
            <SlideIn from="left" delay={0.1}>
              <div className="relative">
                <motion.div 
                  className={`absolute ${isMobile ? '-top-2 -left-2 w-16 h-16' : '-top-4 -left-4 sm:-top-6 sm:-left-6 w-24 h-24 sm:w-32 sm:h-32'} bg-[#1e3a5f]/20 rounded-full blur-2xl opacity-60`}
                  animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0.8, 0.6] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.div 
                  className={`absolute ${isMobile ? '-bottom-2 -right-2 w-20 h-20' : '-bottom-4 -right-4 sm:-bottom-6 sm:-right-6 w-32 h-32 sm:w-40 sm:h-40'} bg-[#4CAF50]/20 rounded-full blur-2xl opacity-60`}
                  animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.9, 0.6] }}
                  transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                />
                
                <div className={`relative grid grid-cols-2 ${isMobile ? 'gap-2' : 'gap-3 sm:gap-4'}`}>
                  <div className={`space-y-2 sm:space-y-4 ${isMobile ? 'mt-4' : 'mt-6 sm:mt-8'}`}>
                    <motion.div 
                      className="rounded-xl sm:rounded-2xl overflow-hidden shadow-lg"
                      whileHover={!isMobile ? { scale: 1.02 } : {}}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <img
                        src="https://images.stockcake.com/public/f/b/d/fbd0d15b-b75c-42eb-8cca-3e18571ce60f_large/corporate-strategy-meeting-stockcake.jpg"
                        alt="Team collaboration"
                        className={`w-full object-cover ${isMobile ? 'h-24' : 'h-32 sm:h-40 md:h-48'}`}
                      />
                    </motion.div>
                    <motion.div 
                      className={`rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#1e3a5f] to-[#4CAF50] p-3 sm:p-4 md:p-6 text-white`}
                      whileHover={!isMobile ? { scale: 1.05 } : {}}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <p className={`font-black mb-1 ${isMobile ? 'text-xl' : 'text-2xl sm:text-3xl'}`}>5+</p>
                      <p className={`font-medium opacity-90 ${isMobile ? 'text-[10px]' : 'text-xs sm:text-sm'}`}>Years of Excellence</p>
                    </motion.div>
                  </div>
                  <div className={`space-y-2 sm:space-y-4`}>
                    <motion.div 
                      className={`rounded-xl sm:rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 p-3 sm:p-4 md:p-6 text-white`}
                      whileHover={!isMobile ? { scale: 1.05 } : {}}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <p className={`font-black mb-1 ${isMobile ? 'text-xl' : 'text-2xl sm:text-3xl'}`}>95%</p>
                      <p className={`font-medium opacity-90 ${isMobile ? 'text-[10px]' : 'text-xs sm:text-sm'}`}>Client Retention</p>
                    </motion.div>
                    <motion.div 
                      className="rounded-xl sm:rounded-2xl overflow-hidden shadow-lg"
                      whileHover={!isMobile ? { scale: 1.02 } : {}}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <img
                        src="https://www.shutterstock.com/image-photo/diverse-business-team-people-having-600nw-2424450087.jpg"
                        alt="Professional interview"
                        className={`w-full object-cover ${isMobile ? 'h-24' : 'h-32 sm:h-40 md:h-48'}`}
                      />
                    </motion.div>
                  </div>
                </div>
              </div>
            </SlideIn>
            
            {/* Right Content */}
            <SlideIn from="right" delay={0.2}>
              <div className={`space-y-3 sm:space-y-6 ${isMobile ? 'mt-6' : 'mt-8 lg:mt-0'}`}>
                <motion.div 
                  className="inline-flex items-center gap-2"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <div className={`w-1 rounded-full bg-gradient-to-b from-[#4CAF50] to-[#1e3a5f] ${isMobile ? 'h-4' : 'h-6 sm:h-8'}`} />
                  <span className={`font-bold tracking-widest uppercase text-slate-500 ${isMobile ? 'text-[10px]' : 'text-xs'}`}>About Us</span>
                </motion.div>
                
                <h2 className={`font-bold text-slate-900 leading-tight ${isMobile ? 'text-xl' : 'text-2xl sm:text-3xl lg:text-4xl'}`}>
                  Your Trusted Partner in{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
                    Strategic Consulting
                  </span>
                </h2>
                
                <div className={`space-y-3 sm:space-y-4 text-slate-600 leading-relaxed ${isMobile ? 'text-sm' : 'text-sm sm:text-base'}`}>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <strong className="text-slate-900">Anaghaa Consultancy Services</strong> is your trusted partner in business growth, turning your organizational challenges into opportunities for success. We work with clients who want a partner that listens, thinks carefully, and delivers with consistency.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    We combine practical experience, creative problem-solving, and a people-first approach to every engagement. What makes us different is how we work: we stay transparent, move with purpose, and focus on outcomes that matter.
                  </motion.p>
                </div>
                
                <motion.div 
                  className={`flex flex-wrap gap-2 sm:gap-3 pt-2`}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, staggerChildren: 0.1 }}
                >
                  {["Transparent", "Results-Driven", "People-First", "Strategic"].map((tag, index) => (
                    <motion.span 
                      key={tag} 
                      className={`rounded-full font-semibold bg-slate-100 text-slate-700 border border-slate-200 ${isMobile ? 'px-2 py-1 text-[10px]' : 'px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm'}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * index }}
                      whileHover={!isMobile ? { scale: 1.05, backgroundColor: "#e2e8f0" } : {}}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </SlideIn>
            
          </div>
        </div>
      </section>

      {/* Story Section - RESPONSIVE */}
      <section className={`${isMobile ? 'py-6' : 'py-8 sm:py-10'} bg-white`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className={`grid ${isMobile ? 'grid-cols-1 gap-6' : 'md:grid-cols-2 gap-8 md:gap-12'} items-center`}>
            <AnimatedSection>
              <div>
                <SectionHeader tag="Our story" title="Who we are" />
                <p className={`text-gray-600 leading-relaxed mb-4 ${isMobile ? 'text-sm' : 'text-sm sm:text-base'}`}>
                  Anaghaa Consultancy Services was born from a simple belief: recruitment should be personal, honest, and genuinely effective. Too many consultancies treat candidates as commodities and clients as transactions. We set out to change that.
                </p>
                <p className={`text-gray-600 leading-relaxed mb-6 ${isMobile ? 'text-sm' : 'text-sm sm:text-base'}`}>
                  Today, we serve fast-growing startups and established enterprises alike, providing staffing solutions across 12+ industries — from IT and Healthcare to Construction and Aviation.
                </p>
                <motion.div
                  whileHover={!isMobile ? { scale: 1.05 } : {}}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to="/contact">
                    <Btn variant="dark">Get in touch</Btn>
                  </Link>
                </motion.div>
              </div>
            </AnimatedSection>
            
            <StaggerContainer className={`grid grid-cols-2 ${isMobile ? 'gap-2' : 'gap-3 sm:gap-4'}`} staggerDelay={0.1}>
              {Achievements.map((a, index) => (
                <StaggerItem key={a.label}>
                  <HoverCard className={`bg-gray-50 rounded-xl text-center border border-gray-100 ${isMobile ? 'p-3' : 'p-4 sm:p-5'}`}>
                    <div className={`font-syne font-bold text-primary mb-1 ${isMobile ? 'text-xl' : 'text-2xl sm:text-3xl'}`}>
                      <AnimatedCounter target={a.number} suffix={a.number.includes('+') ? '+' : ''} />
                    </div>
                    <div className={`text-gray-500 ${isMobile ? 'text-[10px]' : 'text-xs sm:text-sm'}`}>{a.label}</div>
                  </HoverCard>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Mission & Vision - RESPONSIVE */}
      <section className={`${getSectionPadding()} bg-gray-50`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'md:grid-cols-2 gap-4 sm:gap-6'}`}>
            <motion.div 
              className={`bg-blue-50 border border-blue-100 rounded-xl ${isMobile ? 'p-4' : 'p-6 sm:p-8'}`}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={!isMobile ? { y: -5, boxShadow: "0 10px 30px rgba(59, 130, 246, 0.15)" } : {}}
            >
              <motion.div 
                className={`mb-3 ${isMobile ? 'text-xl' : 'text-2xl sm:text-3xl'}`}
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                🎯
              </motion.div>
              <h3 className={`font-syne font-bold text-primary mb-3 ${isMobile ? 'text-base' : 'text-lg sm:text-xl'}`}>Our Mission</h3>
              <p className={`text-gray-600 leading-relaxed ${isMobile ? 'text-sm' : 'text-sm sm:text-base'}`}>
                To match the right talent with the right opportunity — efficiently, ethically, and with lasting impact. We believe every hire should be a win for both the employer and the candidate.
              </p>
            </motion.div>
            
            <motion.div 
              className={`bg-green-50 border border-green-100 rounded-xl ${isMobile ? 'p-4' : 'p-6 sm:p-8'}`}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={!isMobile ? { y: -5, boxShadow: "0 10px 30px rgba(34, 197, 94, 0.15)" } : {}}
            >
              <motion.div 
                className={`mb-3 ${isMobile ? 'text-xl' : 'text-2xl sm:text-3xl'}`}
                animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
              >
                🌟
              </motion.div>
              <h3 className={`font-syne font-bold text-accent-dark mb-3 ${isMobile ? 'text-base' : 'text-lg sm:text-xl'}`}>Our Vision</h3>
              <p className={`text-gray-600 leading-relaxed ${isMobile ? 'text-sm' : 'text-sm sm:text-base'}`}>
                To be India's most trusted manpower consultancy — known for quality, speed, and genuine care for both companies and candidate. Expanding our reach to every corner of India.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section - RESPONSIVE */}
      <section className={`${getSectionPadding()} bg-white`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className={`grid grid-cols-1 ${isMobile ? '' : 'lg:grid-cols-2'} ${getGap()} items-center`}>
            
            {/* Left Content */}
            <SlideIn from="left" delay={0.1}>
              <div className={`space-y-4 sm:space-y-8`}>
                <div>
                  <motion.div 
                    className={`inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-100 mb-4 ${isMobile ? 'px-2 py-1' : 'px-3 py-1.5 sm:px-4 sm:py-2'}`}
                    whileHover={!isMobile ? { scale: 1.05 } : {}}
                  >
                    <motion.div 
                      className="w-2 h-2 rounded-full bg-blue-500"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className={`font-bold tracking-widest uppercase text-blue-600 ${isMobile ? 'text-[10px]' : 'text-xs'}`}>Why Choose Us</span>
                  </motion.div>
                  <h2 className={`font-bold text-slate-900 leading-tight ${isMobile ? 'text-xl' : 'text-2xl sm:text-3xl lg:text-4xl'}`}>
                    What Makes Us{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1e3a5f] to-[#4CAF50]">
                      Different
                    </span>
                  </h2>
                </div>
                
                <div className={`space-y-2 sm:space-y-4`}>
                  {reasons.map((reason, index) => (
                    <motion.div 
                      key={reason.title}
                      className={`group flex items-start gap-2 sm:gap-4 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer ${isMobile ? 'p-2' : 'p-3 sm:p-4'}`}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={!isMobile ? { x: 10 } : {}}
                    >
                      <motion.div 
                        className={`rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors ${isMobile ? 'w-8 h-8 text-lg' : 'w-10 h-10 sm:w-12 sm:h-12 text-xl'}`}
                        whileHover={!isMobile ? { rotate: 360 } : {}}
                        transition={{ duration: 0.5 }}
                      >
                        {reason.icon}
                      </motion.div>
                      <div>
                        <h4 className={`font-bold text-slate-900 mb-1 ${isMobile ? 'text-sm' : 'text-sm sm:text-base'}`}>{reason.title}</h4>
                        <p className={`text-slate-600 leading-relaxed ${isMobile ? 'text-xs' : 'text-xs sm:text-sm'}`}>{reason.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </SlideIn>
            
            {/* Right Image */}
            <SlideIn from="right" delay={0.2}>
              <div className={`relative ${isMobile ? 'mt-6' : 'mt-8 lg:mt-0'}`}>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-[#1e3a5f]/20 to-[#4CAF50]/20 rounded-3xl blur-3xl opacity-40"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.4, 0.6, 0.4]
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                />
                <motion.div 
                  className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl"
                  whileHover={!isMobile ? { scale: 1.02 } : {}}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img
                    src="https://www.shutterstock.com/image-photo/business-manager-leads-focused-planning-600nw-2715611519.jpg"
                    alt="Team celebrating success"
                    className={`w-full object-cover ${isMobile ? 'h-[200px]' : 'h-[300px] sm:h-[400px] lg:h-[500px]'}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent" />
                </motion.div>
                
                {/* Floating Card */}
                <motion.div 
                  className={`absolute bg-white rounded-xl sm:rounded-2xl shadow-xl border border-slate-100 ${isMobile ? '-bottom-2 -right-2 p-3 max-w-[160px]' : '-bottom-4 -right-4 sm:-bottom-6 sm:-right-6 p-4 sm:p-5 max-w-[200px] sm:max-w-xs'}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  whileHover={!isMobile ? { y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" } : {}}
                >
                  <div className={`flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3`}>
                    <motion.div 
                      className={`rounded-full bg-green-100 flex items-center justify-center ${isMobile ? 'w-6 h-6' : 'w-8 h-8 sm:w-10 sm:h-10'}`}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <svg className={`text-green-600 ${isMobile ? 'w-3 h-3' : 'w-4 h-4 sm:w-5 sm:h-5'}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </motion.div>
                    <div>
                      <p className={`font-bold text-slate-900 ${isMobile ? 'text-xs' : 'text-sm sm:text-base'}`}>Trusted Partner</p>
                      <p className={`text-slate-500 ${isMobile ? 'text-[10px]' : 'text-xs'}`}>Since 2014</p>
                    </div>
                  </div>
                  <p className={`text-slate-600 ${isMobile ? 'text-[10px]' : 'text-xs sm:text-sm'}`}>"Anaghaa transformed our hiring process completely."</p>
                </motion.div>
              </div>
            </SlideIn>
            
          </div>
        </div>
      </section>

      {/* Team Section - RESPONSIVE */}
      <section className={`${getSectionPadding()} bg-white`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <SectionHeader 
              tag="Leadership" 
              title="Meet the team" 
              subtitle="Experienced professionals dedicated to your success." 
              center 
            />
          </motion.div>
          
          <StaggerContainer className={`grid ${getTeamGridCols()} ${isMobile ? 'gap-2' : 'gap-3 sm:gap-4'}`} staggerDelay={0.1}>
            {Team.map((member, index) => (
              <StaggerItem key={member.initials}>
                <motion.div 
                  className={`border border-gray-100 rounded-xl text-center hover:shadow-lg transition-all bg-white ${isMobile ? 'p-3' : 'p-4 sm:p-6'}`}
                  whileHover={!isMobile ? { 
                    y: -10, 
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                    borderColor: "#3b82f6"
                  } : {}}
                  whileTap={isMobile ? { scale: 0.95 } : {}}
                >
                  <motion.div 
                    className={`rounded-full flex items-center justify-center font-semibold mx-auto mb-2 sm:mb-4 ${member.color} ${isMobile ? 'w-10 h-10 text-xs' : 'w-12 h-12 sm:w-14 sm:h-14 text-sm sm:text-base'}`}
                    whileHover={!isMobile ? { scale: 1.1, rotate: 360 } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    {member.initials}
                  </motion.div>
                  <div className={`font-semibold text-gray-800 ${isMobile ? 'text-xs' : 'text-xs sm:text-sm'}`}>{member.name}</div>
                  <div className={`text-gray-400 mt-1 ${isMobile ? 'text-[10px]' : 'text-xs'}`}>{member.role}</div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </div>
  )
}