import { Link, useNavigate } from 'react-router-dom'
import { useRef, useState, useEffect } from 'react'
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'

// Custom hook for responsive breakpoints
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
  
  return { isMobile, isTablet, isLaptop, isLarge }
}

// Animated Section Component
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

// Stagger Container for child animations
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

// Individual stagger item
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

// Blog posts data
const blogPosts = [
  {
    id: 1,
    title: 'Top 10 Skills Every HR Professional Needs in 2026',
    excerpt: 'Explore the essential skills that modern HR consultants need to succeed in today\'s dynamic workplace.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=500&q=60',
    category: 'HR Trends',
    date: 'March 28, 2026',
    readTime: '5 min read',
    author: 'Sarah Johnson'
  },
  {
    id: 2,
    title: 'How to Build a Winning Recruitment Strategy',
    excerpt: 'Learn proven tactics to attract top talent and build a recruitment process that converts.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=500&q=60',
    category: 'Recruitment',
    date: 'March 20, 2026',
    readTime: '7 min read',
    author: 'Michael Chen'
  },
  {
    id: 3,
    title: 'Remote Work Culture: Best Practices & Challenges',
    excerpt: 'Understanding how to foster engagement and collaboration in a distributed workforce.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=500&q=60',
    category: 'Workplace Culture',
    date: 'March 15, 2026',
    readTime: '6 min read',
    author: 'Emily Rodriguez'
  },
  {
    id: 4,
    title: 'The Future of Talent Management',
    excerpt: 'AI, automation, and human-centric approaches are reshaping how companies manage talent.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=500&q=60',
    category: 'Technology',
    date: 'March 10, 2026',
    readTime: '8 min read',
    author: 'David Kumar'
  },
  {
    id: 5,
    title: 'Employee Retention Strategies That Actually Work',
    excerpt: 'Discover effective methods to retain your best talent and reduce turnover costs.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=500&q=60',
    category: 'Employee Engagement',
    date: 'March 5, 2026',
    readTime: '6 min read',
    author: 'Lisa Zhang'
  },
  {
    id: 6,
    title: 'Diversity & Inclusion in Modern Workplaces',
    excerpt: 'Creating inclusive work environments that attract and retain diverse talent.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=500&q=60',
    category: 'Diversity',
    date: 'February 28, 2026',
    readTime: '7 min read',
    author: 'James Wilson'
  },
]

const categories = ['All', 'HR Trends', 'Recruitment', 'Workplace Culture', 'Technology', 'Employee Engagement', 'Diversity']

const founders = [
  {
    id: 1,
    initials: 'AC',
    name: 'Founder & CEO',
    fullName: 'Anaghaa Consultancy',
    title: 'Chief Executive Officer',
    specialization: 'Talent Acquisition | HR Strategy | Leadership Development',
    bio: 'With over 10+ years of global experience across Canada, Switzerland, France, and Singapore, our founder brings a rich, international perspective to talent management. Specialized in identifying and nurturing top talent, with a proven track record of successful placements across 12+ industries.',
    experience: '10+ years in recruitment and HR consulting',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=60',
    color: 'from-[#1e3a5f] to-[#4CAF50]'
  },
  {
    id: 2,
    initials: 'HR',
    name: 'Head of Recruitment',
    fullName: 'Recruitment Excellence Team',
    title: 'Director of Talent Acquisition',
    specialization: 'Executive Search | Tech Recruitment | Talent Pipeline',
    bio: 'Leading our recruitment strategy with 5+ years of proven expertise in identifying and placing top talent. Specializes in building talent pipelines for rapid scaling and maintaining quality standards throughout the recruitment process.',
    experience: '5+ years in talent acquisition and HR operations',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=60',
    color: 'from-[#4CAF50] to-[#1e3a5f]'
  }
]

const testimonials = [
  {
    id: 1,
    quote: "Anaghaa Consultancy transformed our hiring process completely. Their people-first approach and transparent communication made them feel like an extension of our own team. The results speak for themselves — better hires, faster turnaround, and lasting partnerships.",
    rating: 5,
    name: 'Vikram Sharma',
    title: 'CEO, SoftWare India',
    company: 'SoftWare Solutions',
    showCompany: false
  },
  {
    id: 2,
    quote: "We partnered with Anaghaa for our expansion hiring. Their market insights and candidate quality were exceptional. They delivered 15 senior developers in just 3 weeks without compromising on quality.",
    rating: 5,
    name: 'Priya Patel',
    title: 'HR Director, Tech Startups',
    company: 'TechVision Ventures',
    showCompany: false
  },
  {
    id: 3,
    quote: "Outstanding service! The team understood our culture and values deeply. They didn't just fill positions; they helped us build the right team. Highly recommended for any organization serious about talent.",
    rating: 5,
    name: 'Rajesh Kumar',
    title: 'Operations Head, Global Corp',
    company: 'Global Ventures Ltd',
    showCompany: false
  }
]

export default function Blog() {
  const { isMobile, isTablet, isLaptop, isLarge } = useResponsive()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [testimonialStates, setTestimonialStates] = useState({})
  const navigate = useNavigate()
  const heroRef = useRef(null)
  const { scrollY } = useScroll()
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0])
  const heroScale = useTransform(scrollY, [0, 300], [1, 1.1])

  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory)

  const toggleCompanyDetails = (id) => {
    setTestimonialStates(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

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

  // Responsive padding
  const getSectionPadding = () => {
    if (isMobile) return "py-5 sm:py-7"
    if (isTablet) return "py-7 md:py-9"
    if (isLaptop) return "py-9 lg:py-11"
    return "py-11 xl:py-13"
  }

  // Responsive gap
  const getGap = () => {
    if (isMobile) return "gap-2.5"
    if (isTablet) return "gap-3 md:gap-4"
    return "gap-4 lg:gap-6"
  }
  
  return (
    <div className="overflow-x-hidden mt-12">
      {/* Hero Section with Parallax */}
      <section ref={heroRef} className={`relative w-full ${getHeroHeight()} overflow-hidden`}>
        {/* Background Image with Parallax */}
        <motion.div 
          className="absolute inset-0"
          style={{ scale: heroScale }}
        >
          <img
            src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1920&q=80"
            alt="Blog insights and industry trends"
            className="w-full h-full object-cover"
          />
          {/* Navy & Green Overlay */}
          <div className="absolute inset-0 bg-linear-to-r from-[#1e3a5f]/70 via-[#4CAF50]/60 to-[#1e3a5f]/65" />
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
              <Link to="/" className="text-[#4CAF50] hover:text-[#5cc561] transition-colors font-semibold">
                Home
              </Link>
              <span className="text-[#4CAF50]/70">›</span>
              <span className="text-white font-semibold">Blog & Insights</span>
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
              Industry <span className="text-[#4CAF50]">Insights</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.div 
              className={`border-l-4 border-[#4CAF50] pl-3 sm:pl-4 md:pl-6 ${isMobile ? 'py-1' : 'py-2'}`}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <p className={`text-green-50 italic leading-relaxed font-medium ${isMobile ? 'text-sm' : 'text-base sm:text-lg md:text-xl lg:text-2xl'}`}>
                "Stay ahead of the curve with expert insights on HR trends, recruitment strategies, and workplace culture."
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Founders/Leadership Section - PREMIUM LAYOUT */}
      <section className={`${getSectionPadding()} bg-white`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <AnimatedSection className="mb-12 text-center">
            <h2 className={`font-bold text-gray-900 mb-3 tracking-tight ${isMobile ? 'text-2xl' : 'text-3xl sm:text-4xl lg:text-5xl'}`}>
              Meet Our <span className="text-[#4CAF50]">Leadership</span>
            </h2>
            <p className={`text-gray-600 font-medium max-w-2xl mx-auto ${isMobile ? 'text-sm' : 'text-base sm:text-lg'}`}>
              Experienced professionals dedicated to transforming your organization
            </p>
          </AnimatedSection>

          {/* Founders Grid */}
          <div className="space-y-12 sm:space-y-14">
            {founders.map((founder, index) => (
              <motion.div
                key={founder.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`grid grid-cols-1 ${isMobile ? '' : 'md:grid-cols-2'} gap-6 lg:gap-8 items-center ${index % 2 === 1 ? 'md:grid-flow-dense' : ''}`}
              >
                {/* Image Section */}
                <motion.div
                  className={`relative ${index % 2 === 1 ? 'md:order-2' : ''}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: index * 0.15 }}
                >
                  <motion.div
                    className="relative rounded-2xl overflow-hidden shadow-xl"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <img
                      src={founder.image}
                      alt={founder.fullName}
                      className="w-full h-80 sm:h-96 object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-gray-900/40 to-transparent" />
                    
                    {/* Floating Badge */}
                    <motion.div
                      className={`absolute bottom-5 left-5 bg-linear-to-r ${founder.color} text-white px-4 py-2.5 rounded-xl shadow-lg text-sm`}
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <p className="text-xs sm:text-sm font-bold\">{founder.experience}</p>
                    </motion.div>
                  </motion.div>
                </motion.div>

                {/* Content Section */}
                <motion.div
                  className={`${index % 2 === 1 ? 'md:order-1' : ''}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: index * 0.15 + 0.1 }}
                >
                  {/* Pre-title */}
                  <motion.span
                    className="inline-block px-4 py-1.5 rounded-full bg-[#4CAF50]/10 text-[#4CAF50] text-xs font-bold uppercase tracking-wider mb-2"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.2 }}
                  >
                    {founder.name}
                  </motion.span>

                  {/* Main Title */}
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-1 tracking-tight">
                    Hi, I'm {founder.fullName}.
                  </h3>

                  {/* Subtitle */}
                  <p className="text-lg sm:text-xl font-bold text-[#1e3a5f] mb-4">
                    {founder.title}
                  </p>

                  {/* Specialization */}
                  <div className="mb-4">
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1.5">Specialization</p>
                    <p className="text-base sm:text-lg text-gray-700 font-semibold">
                      {founder.specialization}
                    </p>
                  </div>

                  {/* Bio */}
                  <p className="text-gray-600 leading-relaxed mb-6 font-medium text-base sm:text-lg">
                    {founder.bio}
                  </p>

                  {/* Experience Badge */}
                  <div className="flex flex-wrap gap-3">
                    <motion.div
                      className="px-5 py-3 rounded-lg bg-[#4CAF50]/10 border border-[#4CAF50]/30"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <p className="text-xs font-bold text-[#4CAF50] uppercase">✓ Verified Expert</p>
                    </motion.div>
                    <motion.div
                      className="px-5 py-3 rounded-lg bg-[#1e3a5f]/10 border border-[#1e3a5f]/30"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <p className="text-xs font-bold text-[#1e3a5f] uppercase">🌍 Global Experience</p>
                    </motion.div>
                  </div>

                  {/* Social/CTA */}
                  <motion.div
                    className="mt-6 flex gap-2 sm:gap-3"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.3 }}
                  >
                    <motion.button
                      onClick={() => navigate('/contact')}
                      className="px-6 py-3 rounded-lg bg-[#4CAF50] text-white font-bold hover:bg-[#3d9a3f] transition-all cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Connect
                    </motion.button>
                    <motion.button
                      onClick={() => navigate('/services')}
                      className="px-6 py-3 rounded-lg border-2 border-[#1e3a5f] text-[#1e3a5f] font-bold hover:bg-[#1e3a5f]/5 transition-all cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Learn More
                    </motion.button>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Testimonials Section */}
      <section className={`${getSectionPadding()} bg-white`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <AnimatedSection className="mb-10 text-center">
            <h2 className={`font-bold text-gray-900 mb-3 tracking-tight ${isMobile ? 'text-2xl' : 'text-3xl sm:text-4xl lg:text-5xl'}`}>
              What Our <span className="text-[#4CAF50]">Clients Say</span>
            </h2>
            <p className={`text-gray-600 font-medium max-w-2xl mx-auto ${isMobile ? 'text-sm' : 'text-base sm:text-lg'}`}>
              Real experiences from companies we've helped achieve their goals
            </p>
          </AnimatedSection>

          <StaggerContainer 
            className={`grid grid-cols-1 ${isLaptop || isLarge ? 'lg:grid-cols-3' : 'md:grid-cols-2'} gap-6`}
            staggerDelay={0.1}
          >
            {testimonials.map((testimonial) => (
              <StaggerItem key={testimonial.id}>
                <motion.div
                  className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 hover:shadow-xl transition-all h-full flex flex-col group"
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {/* Header with Gradient */}
                  <div className="bg-linear-to-r from-[#1e3a5f] to-[#4CAF50] p-6 text-white relative overflow-hidden">
                    <motion.div
                      className="absolute top-2 right-2 text-3xl opacity-20"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    >
                      "
                    </motion.div>
                    
                    {/* Star Rating */}
                    <div className="flex gap-1 mb-2 relative z-10">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <motion.span
                          key={i}
                          className="text-lg"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ delay: i * 0.1, duration: 0.6, repeat: Infinity }}
                        >
                          ⭐
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    {/* Quote */}
                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4 italic font-medium flex-1">
                      "{testimonial.quote}"
                    </p>

                    {/* Divider */}
                    <div className="border-t border-gray-200 my-3" />

                    {/* Author Info */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{testimonial.name}</p>
                        <p className="text-xs text-gray-600 font-medium">{testimonial.title}</p>
                      </div>
                      <motion.button
                        onClick={() => toggleCompanyDetails(testimonial.id)}
                        className="px-3 py-1.5 rounded-full text-xs font-semibold bg-[#4CAF50]/10 text-[#4CAF50] hover:bg-[#4CAF50] hover:text-white transition-all whitespace-nowrap"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {testimonialStates[testimonial.id] ? 'Hide' : 'Show'} Company
                      </motion.button>
                    </div>

                    {/* Company Details - Toggle */}
                    <AnimatePresence>
                      {testimonialStates[testimonial.id] && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-3 pt-3 border-t border-gray-200"
                        >
                          <div className="flex items-center gap-1.5">
                            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-[#1e3a5f] to-[#4CAF50] flex items-center justify-center text-white text-xs font-bold">
                              {testimonial.company.charAt(0)}
                            </div>
                            <div>
                              <p className="text-sm font-bold text-gray-900">{testimonial.company}</p>
                              <p className="text-xs text-gray-500 font-medium">Trusted Partner</p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className={`${getSectionPadding()} bg-white`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          
          {/* Section Header */}
          <AnimatedSection className="mb-8 text-center">
            <h2 className={`font-bold text-gray-900 mb-3 tracking-tight ${isMobile ? 'text-2xl' : 'text-3xl sm:text-4xl lg:text-5xl'}`}>
              Latest <span className="text-[#4CAF50]">Articles</span>
            </h2>
            <p className={`text-gray-600 font-medium max-w-2xl mx-auto ${isMobile ? 'text-sm' : 'text-base sm:text-lg'}`}>
              Discover expert tips, industry trends, and practical advice to transform your organization
            </p>
          </AnimatedSection>

          {/* Category Filter */}
          <AnimatedSection delay={0.1} className="mb-6 sm:mb-8 lg:mb-10 flex flex-wrap gap-2 sm:gap-2 justify-center">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 sm:px-5 py-2 rounded-full font-semibold text-sm transition-all ${
                  selectedCategory === category
                    ? 'bg-[#1e3a5f] text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {category}
              </motion.button>
            ))}
          </AnimatedSection>

          {/* Blog Posts Grid */}
          <StaggerContainer 
            className={`grid grid-cols-1 ${isMobile ? '' : 'sm:grid-cols-2'} ${isLaptop || isLarge ? 'lg:grid-cols-3' : ''} gap-6 lg:gap-8`}
            staggerDelay={0.1}
          >
            {filteredPosts.map((post) => (
              <StaggerItem key={post.id}>
                <motion.div
                  className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 hover:shadow-xl transition-all h-full flex flex-col group"
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {/* Image Container */}
                  <div className="relative h-48 sm:h-56 overflow-hidden bg-gray-200">
                    <motion.img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      whileHover={{ scale: 1.15 }}
                    />
                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                      <span className="inline-block px-3 py-1 rounded-full bg-[#4CAF50] text-white text-xs font-bold">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col">
                    {/* Meta Info */}
                    <div className="flex items-center justify-between mb-2 text-xs sm:text-sm text-gray-500">
                      <span className="font-medium">{post.date}</span>
                      <span className="font-medium">{post.readTime}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#4CAF50] transition-colors">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2 flex-1 font-medium">
                      {post.excerpt}
                    </p>

                    {/* Author & CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-linear-to-br from-[#1e3a5f] to-[#4CAF50] flex items-center justify-center text-white text-xs font-bold">
                          {post.author.charAt(0)}
                        </div>
                        <span className="text-xs font-semibold text-gray-700">{post.author}</span>
                      </div>
                      <motion.a
                        href="#"
                        className="text-[#4CAF50] hover:text-[#1e3a5f] font-bold text-sm transition-colors"
                        whileHover={{ x: 4 }}
                      >
                        →
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* No Posts Message */}
          {filteredPosts.length === 0 && (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-gray-600 text-lg font-medium">No posts found in this category</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className={`${getSectionPadding()} bg-linear-to-r from-[#1e3a5f] to-[#4CAF50] relative overflow-hidden`}>
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
          }}
        />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <AnimatedSection>
            <h2 className={`font-bold text-white mb-2 tracking-tight ${isMobile ? 'text-2xl' : 'text-3xl sm:text-4xl'}`}>
              Stay Informed
            </h2>
            <p className="text-green-50 text-sm sm:text-base mb-5 font-medium">
              Subscribe to our newsletter for the latest HR insights delivered to your inbox
            </p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white/90 text-gray-900 placeholder-gray-500 font-medium focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
              />
              <motion.button
                className="px-6 py-3 rounded-lg bg-white text-[#1e3a5f] font-bold hover:bg-gray-100 transition-all whitespace-nowrap"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
