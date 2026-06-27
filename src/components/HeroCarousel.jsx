import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  Phone, 
  CheckCircle2,
  TrendingUp,
  Users,
  Award,
  Clock,
  Building2
} from "lucide-react";
import { Link } from "react-router-dom";

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80&auto=format&fit=crop",
    title: "Strategic Talent Solutions",
    subtitle: "For Forward-Thinking Businesses",
    description: "Empowering organizations with exceptional talent acquisition strategies that drive sustainable growth and competitive advantage.",
    ctaPrimary: { text: "Explore Services", link: "/services" },
    stats: [
      { icon: Users, value: "100+", label: "Placements" },
      { icon: Building2, value: "10+", label: "Clients" },
      { icon: Award, value: "95%", label: "Success" }
    ],
    ctaSecondary: { text: "Talk to an Expert", link: "/contact" }
  },
  {
    id: 2,
    image: "https://media.istockphoto.com/id/1365436662/photo/successful-partnership.jpg?s=612x612&w=0&k=20&c=B1xspe9Q5WMsLc7Hc9clR8MWUL4bsK1MfUdDNVNR2Xg=",
    title: "Executive Search Excellence",
    subtitle: "Leadership That Transforms",
    description: "Identifying and securing C-suite and senior leadership talent who shape organizational destiny and drive breakthrough performance.",
    ctaPrimary: { text: "Hire Leaders", link: "/services" },
    stats: [
      { icon: TrendingUp, value: "20+", label: "Leaders" },
      { icon: Building2, value: "12+", label: "Industries" },
      { icon: Users, value: "98%", label: "Retention" }
    ],
    ctaSecondary: { text: "Our Approach", link: "/about" }
  },
  {
    id: 3,
    image: "https://thumbs.dreamstime.com/b/collaborative-team-professionals-working-together-bright-modern-office-environment-showcasing-teamwork-communication-369519246.jpg",
    title: "End-to-End Recruitment",
    subtitle: "From Sourcing to Success",
    description: "Comprehensive hiring solutions spanning talent acquisition, assessment, and onboarding — delivering quality candidates at speed.",
    ctaPrimary: { text: "Start Hiring", link: "/contact" },
    stats: [
      { icon: Clock, value: "48h", label: "Response" },
      { icon: Award, value: "100%", label: "Commit" }
    ],
    ctaSecondary: { text: "View Process", link: "/services" }
  },
  {
    id: 4,
    image: "https://thumbs.dreamstime.com/b/group-diverse-professionals-engaging-discussion-modern-office-promoting-collaboration-teamwork-friendly-359424377.jpg",
    title: "Campus to Corporate",
    subtitle: "Building Future Talent Pipelines",
    description: "Connecting emerging talent with opportunity through strategic campus partnerships, training programs, and entry-level recruitment excellence.",
    ctaPrimary: { text: "Campus Programs", link: "/services" },
    stats: [
      { icon: Users, value: "20+", label: "Graduates" },
      { icon: TrendingUp, value: "85%", label: "Conversion" }
    ],
    ctaSecondary: { text: "Partner With Us", link: "/contact" }
  }
];

const trustIndicators = [
  "Pan-India Coverage",
  "Transparent Process", 
  "Results-Driven",
  "People-First Approach"
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;
  const isLaptop = windowWidth >= 1024 && windowWidth < 1280;
  const isLarge = windowWidth >= 1280;

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToSlide = (index) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, nextSlide]);

  // Touch/swipe handling for mobile
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) nextSlide();
    if (isRightSwipe) prevSlide();
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 1.1
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95
    })
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1]
      }
    })
  };

  const currentData = slides[currentSlide];

  // Responsive configurations
  const getCarouselHeight = () => {
    if (isMobile) return "h-[100svh]";
    if (isTablet) return "h-[600px]";
    if (isLaptop) return "h-[650px]";
    return "h-[750px]";
  };

  const getTitleSize = () => {
    if (isMobile) return "text-2xl sm:text-3xl";
    if (isTablet) return "text-4xl sm:text-5xl";
    if (isLaptop) return "text-5xl md:text-6xl";
    return "text-6xl lg:text-7xl";
  };

  return (
    <section 
      className={`relative w-full ${getCarouselHeight()} overflow-hidden bg-gray-900`}
      onMouseEnter={() => !isMobile && setIsAutoPlaying(false)}
      onMouseLeave={() => !isMobile && setIsAutoPlaying(true)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Background Images */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.4 },
            scale: { duration: 0.6 }
          }}
          className="absolute inset-0"
        >
          <img
            src={currentData.image}
            alt={currentData.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a5f]/95 via-[#1e3a5f]/80 to-[#4CAF50]/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center pt-16 sm:pt-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className={`${isMobile ? 'max-w-full' : 'max-w-3xl'}`}
          >
            {/* Badge */}
            <motion.div
              custom={0}
              variants={contentVariants}
              className={`inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-4 sm:mb-6 ${isMobile ? 'px-3 py-1.5' : 'px-4 py-2'}`}
            >
              <motion.span 
                className="w-2 h-2 rounded-full bg-[#4CAF50]"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className={`text-white/90 font-medium tracking-wide uppercase ${isMobile ? 'text-[10px]' : 'text-xs sm:text-sm'}`}>
                {currentData.subtitle}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              custom={1}
              variants={contentVariants}
              className={`font-bold text-white mb-3 sm:mb-4 leading-tight ${getTitleSize()}`}
            >
              {currentData.title.split(" ").map((word, i) => (
                <span key={i} className={i >= 1 ? "text-[#4CAF50]" : ""}>
                  {word}{" "}
                </span>
              ))}
            </motion.h1>

            {/* Description */}
            <motion.p
              custom={2}
              variants={contentVariants}
              className={`text-[#4CAF50]/90 mb-6 sm:mb-8 leading-relaxed ${isMobile ? 'text-sm max-w-full' : 'text-lg sm:text-xl max-w-2xl'}`}
            >
              {currentData.description}
            </motion.p>

            <motion.div
              custom={3}
              variants={contentVariants}
              className="flex flex-wrap gap-2 sm:gap-3 mb-5 sm:mb-8"
            >
              {currentData.stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-2 sm:px-4 sm:py-2.5"
                  >
                    <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-[#4CAF50] flex-shrink-0" />
                    <div className="flex items-baseline gap-1">
                      <span className="text-white font-bold text-sm sm:text-base">
                        {stat.value}
                      </span>
                      <span className="text-white/70 text-[10px] sm:text-xs uppercase">
                        {stat.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </motion.div>


            {/* Stats - 3 Column Grid on Mobile */}
            
            {/* CTA Buttons */}
            <motion.div
              custom={4}
              variants={contentVariants}
              className={`flex ${isMobile ? 'flex-col gap-3' : 'flex-col sm:flex-row gap-4'}`}
            >
              <Link
                to={currentData.ctaPrimary.link}
                className={`group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#1e3a5f] to-[#4CAF50] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#4CAF50]/30 transition-all duration-300 ${isMobile ? 'px-6 py-3 text-sm w-full' : 'px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base'}`}
              >
                <span>{currentData.ctaPrimary.text}</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to={currentData.ctaSecondary.link}
                className={`group inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 ${isMobile ? 'px-6 py-3 text-sm w-full' : 'px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base'}`}
              >
                <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>{currentData.ctaSecondary.text}</span>
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Trust Indicators - Hidden on Mobile */}
        {!isMobile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="absolute bottom-20 left-4 sm:left-6 lg:left-8 flex flex-wrap gap-2 sm:gap-3"
          >
            {trustIndicators.map((tag, index) => (
              <span key={index} className="text-xs text-white/70 tracking-wider uppercase flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-[#4CAF50]" />
                {tag}
              </span>
            ))}
          </motion.div>
        )}
      </div>

      {/* Navigation Arrows - Hidden on Mobile */}
      {!isMobile && (
        <>
          <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300">
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300">
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </>
      )}

      {/* Mobile Swipe Hint */}
      {isMobile && (
        <motion.div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 text-white/50 text-xs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
          <ChevronLeft className="w-4 h-4" />
          <span>Swipe</span>
          <ChevronRight className="w-4 h-4" />
        </motion.div>
      )}

      {/* Slide Indicators */}
      <div className={`absolute left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 sm:gap-3 ${isMobile ? 'bottom-16' : 'bottom-8'}`}>
        {slides.map((_, index) => (
          <button key={index} onClick={() => goToSlide(index)} className={`relative rounded-full overflow-hidden bg-white/30 transition-all duration-300 ${isMobile ? 'w-8 h-1' : 'w-10 sm:w-12 h-1.5'}`}>
            {index === currentSlide && (
              <motion.div className="absolute inset-0 bg-[#4CAF50]" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 6, ease: "linear" }} style={{ transformOrigin: "left" }} />
            )}
          </button>
        ))}
      </div>

      {/* Slide Counter - Hidden on Mobile */}
      {!isMobile && (
        <div className="absolute bottom-8 right-4 sm:right-6 lg:right-8 z-20 text-white/60 text-sm font-medium">
          <span className="text-white font-bold text-lg">{String(currentSlide + 1).padStart(2, '0')}</span>
          <span className="mx-2">/</span>
          <span>{String(slides.length).padStart(2, '0')}</span>
        </div>
      )}
    </section>
  );
}