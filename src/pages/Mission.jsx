import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Target, 
  Eye, 
  Heart, 
  Shield, 
  Zap, 
  Users, 
  Award, 
  TrendingUp,
  ChevronDown,
  Quote,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Lightbulb,
  Handshake
} from "lucide-react";

// Custom hook for responsive design
function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) setMatches(media.matches);
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);
  return matches;
}

// Animation Components
function FadeIn({ children, delay = 0, direction = "up", className = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const directions = {
    up: { y: 50, x: 0 },
    down: { y: -50, x: 0 },
    left: { x: 50, y: 0 },
    right: { x: -50, y: 0 }
  };
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...directions[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...directions[direction] }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StaggerContainer({ children, className = "", staggerDelay = 0.1 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });
  
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
  );
}

function StaggerItem({ children, className = "" }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } 
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function FloatingCard({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay }}
      whileHover={{ 
        y: -10, 
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
        transition: { type: "spring", stiffness: 400, damping: 25 }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Core Values Data
const coreValues = [
  {
    icon: Heart,
    title: "People-First Approach",
    desc: "We believe in building genuine relationships with both clients and candidates, understanding that every placement impacts lives and careers.",
    color: "from-rose-500 to-rose-600"
  },
  {
    icon: Shield,
    title: "Transparency",
    desc: "Clear communication at every step. No hidden agendas, no surprises — just honest, open dialogue that builds lasting trust.",
    color: "from-[#1e3a5f] to-[#4CAF50]"
  },
  {
    icon: Zap,
    title: "Purposeful Action",
    desc: "We move with intention and speed. Every action is calculated to deliver meaningful outcomes, not just activity.",
    color: "from-[#1e3a5f] to-[#4CAF50]"
  },
  {
    icon: Target,
    title: "Results Focus",
    desc: "We measure success by real outcomes — placements that stick, clients that return, and businesses that grow.",
    color: "from-emerald-500 to-emerald-600"
  },
  {
    icon: Lightbulb,
    title: "Creative Problem-Solving",
    desc: "No two challenges are the same. We bring fresh perspectives and innovative solutions to every engagement.",
    color: "from-[#1e3a5f] to-[#4CAF50]"
  },
  {
    icon: Handshake,
    title: "Consistent Delivery",
    desc: "Reliability is our hallmark. We do what we say, when we say it — every single time.",
    color: "from-cyan-500 to-cyan-600"
  }
];

// Journey Milestones
const milestones = [
  { year: "2014", title: "Founded", desc: "Anaghaa Consultancy established with a vision to transform recruitment" },
  { year: "2016", title: "First 100 Placements", desc: "Reached milestone of 100 successful candidate placements" },
  { year: "2018", title: "Pan-India Expansion", desc: "Extended services across major cities in India" },
  { year: "2020", title: "Digital Transformation", desc: "Implemented AI-powered recruitment tools and ATS" },
  { year: "2022", title: "Industry Recognition", desc: "Awarded for excellence in HR consulting services" },
  { year: "2024", title: "2,400+ Placements", desc: "Celebrated milestone of transforming thousands of careers" }
];

// What Makes Us Different
const differentiators = [
  {
    title: "Strategic Consulting",
    desc: "We don't just fill positions — we understand your business strategy and align talent acquisition with your long-term goals.",
    icon: TrendingUp
  },
  {
    title: "Industry Expertise",
    desc: "Deep domain knowledge across Healthcare, IT, Manufacturing, and BFSI sectors ensures precise candidate matching.",
    icon: Award
  },
  {
    title: "Partnership Model",
    desc: "We function as an extension of your team, invested in your success and committed to your growth journey.",
    icon: Users
  }
];

export default function MissionVision() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 overflow-x-hidden mt-12">
      
      {/* Hero Banner Section */}
      <section 
        ref={heroRef}
        className="relative w-full h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] overflow-hidden"
      >
        {/* Background Image with Parallax */}
        <motion.div 
          className="absolute inset-0"
          style={{ scale: heroScale, y: heroY }}
        >
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80"
            alt="Our Mission"
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a5f]/85 via-[#1e3a5f]/75 to-[#4CAF50]/70" />
        </motion.div>

        {/* Content Container */}
        <motion.div 
          className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center"
          style={{ opacity: heroOpacity }}
        >
          {/* Breadcrumb */}
          <motion.nav 
            className="flex items-center gap-2 text-xs sm:text-sm mb-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/" className="text-[#4CAF50] hover:text-[#5cc561] transition-colors font-medium">
              Home
            </Link>
            <span className="text-[#4CAF50]/60">›</span>
            <span className="text-white font-medium">Mission & Vision</span>
          </motion.nav>

          {/* Main Title */}
          <div className="max-w-3xl">
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Our <span className="text-[#4CAF50]">Purpose</span>
            </motion.h1>

            {/* Quote Box */}
            <motion.div 
              className="border-l-4 border-[#4CAF50] pl-4 sm:pl-6 py-2"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <p className="text-base sm:text-lg md:text-xl text-[#ffff]/90 italic leading-relaxed font-light">
                "Good work should create real results, not just good-looking promises — and we are here to deliver exactly that."
              </p>
              <motion.p 
                className="text-[#4CAF50] mt-3 font-semibold text-sm sm:text-base"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                —  Anaghaa Consultancy Services, Est. 2026
              </motion.p>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div 
            className="absolute bottom-6 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-6 h-6 text-white/60" />
          </motion.div>
        </motion.div>
      </section>

      {/* Introduction Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center max-w-4xl mx-auto">
              <motion.span 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#4CAF50]/10 text-[#1e3a5f] text-sm font-semibold mb-4"
                whileHover={{ scale: 1.05 }}
              >
                <Sparkles className="w-4 h-4" />
                Who We Are
              </motion.span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Building Success Through People
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">
                We help businesses grow with clear strategy, dependable execution, and honest communication. 
                We started with one simple belief: good work should create real results, not just good-looking promises.
              </p>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                We work with clients who want a partner that listens, thinks carefully, and delivers with consistency. 
                We combine practical experience, creative problem-solving, and a people-first approach to every project.
              </p>
            </div>
          </FadeIn>

          {/* Stats Row */}
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 sm:mt-12" staggerDelay={0.1}>
            {[
              { value: "5+", label: "Years of Excellence" },
              { value: "100+", label: "Successful Placements" },
              { value: "10+", label: "Trusted Clients" },
              { value: "12+", label: "Industries Served" }
            ].map((stat, index) => (
              <StaggerItem key={index}>
                <motion.div 
                  className="text-center p-4 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200"
                  whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
                >
                  <motion.p 
                    className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#1e3a5f] to-[#4CAF50] bg-clip-text text-transparent"
                    initial={{ scale: 0.5 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 200, delay: index * 0.1 }}
                  >
                    {stat.value}
                  </motion.p>
                  <p className="text-gray-600 text-xs sm:text-sm mt-1">{stat.label}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Mission & Vision Cards */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            
            {/* Mission Card */}
            <FadeIn direction="left">
              <motion.div 
                className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-gray-100 h-full relative overflow-hidden"
                whileHover={{ y: -5, boxShadow: "0 25px 50px rgba(0,0,0,0.1)" }}
              >
                <motion.div 
                  className="absolute top-0 right-0 w-32 h-32 bg-[#4CAF50]/20 rounded-full blur-3xl opacity-50"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                
                <motion.div 
                  className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-5 shadow-lg"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Target className="w-7 h-7 text-white" />
                </motion.div>
                
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Our Mission</h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">
                  At Anaghaa Consultancy Services, our mission is to empower businesses across all industries 
                  with strategic consulting that solves complex challenges, drives sustainable growth, and 
                  unlocks their full potential through innovative solutions and expert guidance.
                </p>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  We match the right talent with the right opportunity — efficiently, ethically, and with 
                  lasting impact. Every hire should be a win for both the employer and the candidate.
                </p>
              </motion.div>
            </FadeIn>

            {/* Vision Card */}
            <FadeIn direction="right" delay={0.2}>
              <motion.div 
                className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-gray-100 h-full relative overflow-hidden"
                whileHover={{ y: -5, boxShadow: "0 25px 50px rgba(0,0,0,0.1)" }}
              >
                <motion.div 
                  className="absolute top-0 right-0 w-32 h-32 bg-amber-100 rounded-full blur-3xl opacity-50"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                />
                
                <motion.div 
                  className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center mb-5 shadow-lg"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Eye className="w-7 h-7 text-white" />
                </motion.div>
                
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Our Vision</h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">
                  To be India's premier multi-disciplinary consulting partner, transforming organizations 
                  by delivering transformative strategies, operational excellence, and forward-thinking 
                  solutions that create lasting competitive advantage in every field we serve.
                </p>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  We envision a future where every organization has access to the talent they need to thrive, 
                  and every individual finds meaningful work that fulfills their potential.
                </p>
              </motion.div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-10 sm:mb-14">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                Our Core Values
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
                The principles that guide everything we do
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6" staggerDelay={0.1}>
            {coreValues.map((value, index) => (
              <StaggerItem key={index}>
                <motion.div 
                  className="bg-gray-50 rounded-2xl p-5 sm:p-6 border border-gray-100 h-full group"
                  whileHover={{ 
                    y: -8, 
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                    borderColor: "#e5e7eb"
                  }}
                >
                  <motion.div 
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-4 shadow-md group-hover:shadow-lg transition-shadow`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <value.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <h4 className="font-bold text-gray-900 mb-2 text-base sm:text-lg">{value.title}</h4>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{value.desc}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* Left Content */}
            <FadeIn direction="left">
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 text-amber-600 text-xs font-semibold mb-3">
                  <Award className="w-3 h-3" />
                  Why Choose Us
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  What Makes Us <span className="text-blue-600">Different</span>
                </h2>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                  What makes us different is how we work: we stay transparent, move with purpose, 
                  and focus on outcomes that matter. We're not just another recruitment agency — 
                  we're your strategic partner in building exceptional teams.
                </p>

                <StaggerContainer className="space-y-4" staggerDelay={0.1}>
                  {differentiators.map((item, index) => (
                    <StaggerItem key={index}>
                      <motion.div 
                        className="flex items-start gap-4 p-4 rounded-xl bg-white border border-gray-100 shadow-sm"
                        whileHover={{ x: 5, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
                      >
                        <motion.div 
                          className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0"
                          whileHover={{ scale: 1.1, rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <item.icon className="w-5 h-5 text-blue-600" />
                        </motion.div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1 text-sm sm:text-base">{item.title}</h4>
                          <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                        </div>
                      </motion.div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </FadeIn>

            {/* Right Image/Visual */}
            <FadeIn direction="right" delay={0.2}>
              <div className="relative">
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-blue-100 to-amber-100 rounded-3xl blur-3xl opacity-40"
                  animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
                  transition={{ duration: 5, repeat: Infinity }}
                />
                <motion.div 
                  className="relative rounded-3xl overflow-hidden shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                    alt="Team collaboration"
                    className="w-full h-[300px] sm:h-[400px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                  
                  {/* Floating Stats */}
                  <motion.div 
                    className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-2xl p-4"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-center">
                        <p className="text-xl font-bold text-blue-600">95%</p>
                        <p className="text-xs text-gray-600">Client Retention</p>
                      </div>
                      <div className="w-px h-10 bg-gray-200" />
                      <div className="text-center">
                        <p className="text-xl font-bold text-amber-600">48h</p>
                        <p className="text-xs text-gray-600">Avg. Response</p>
                      </div>
                      <div className="w-px h-10 bg-gray-200" />
                      <div className="text-center">
                        <p className="text-xl font-bold text-emerald-600">100%</p>
                        <p className="text-xs text-gray-600">Commitment</p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      {/* <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-10 sm:mb-14">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                Our Journey
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
                Milestones that mark our growth and commitment to excellence
              </p>
            </div>
          </FadeIn>

          <div className="relative">
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-blue-200 via-amber-200 to-blue-200" />
            
            <div className="space-y-8 sm:space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex flex-col md:flex-row items-center gap-4 sm:gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  
                  <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <motion.div 
                      className="bg-gray-50 rounded-2xl p-5 border border-gray-100 inline-block w-full md:w-auto"
                      whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
                    >
                      <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-bold mb-2">
                        {milestone.year}
                      </span>
                      <h4 className="font-bold text-gray-900 mb-1 text-base sm:text-lg">{milestone.title}</h4>
                      <p className="text-gray-600 text-xs sm:text-sm">{milestone.desc}</p>
                    </motion.div>
                  </div>
                  
                  
                  <motion.div 
                    className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-amber-500 border-4 border-white shadow-lg z-10 flex-shrink-0"
                    whileHover={{ scale: 1.5 }}
                  />
                
                  <div className="hidden md:block w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section> */}

      {/* Testimonial Section */}
      {/* <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <motion.div 
              className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-gray-100 relative overflow-hidden"
              whileHover={{ boxShadow: "0 25px 50px rgba(0,0,0,0.1)" }}
            >
              <motion.div 
                className="absolute -top-10 -left-10 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-30"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 5, repeat: Infinity }}
              />
              
              <div className="relative z-10 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <Quote className="w-10 h-10 text-blue-200 mx-auto mb-4" />
                </motion.div>
                
                <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 italic leading-relaxed mb-6">
                  "Anaghaa Consultancy Services transformed our hiring process completely. Their people-first approach 
                  and transparent communication made them feel like an extension of our own team. 
                  The results speak for themselves — better hires, faster turnaround, and lasting partnerships."
                </p>
                
                <div className="flex items-center justify-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold">
                    VS
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-gray-900 text-sm sm:text-base">Vikram Sharma</p>
                    <p className="text-gray-500 text-xs sm:text-sm">CEO, TechVentures India</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </FadeIn>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-blue-600 to-blue-800 relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "40px 40px"
          }}
        />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h2 
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Ready to Partner With Us?
          </motion.h2>
          <motion.p 
            className="text-blue-100 text-sm sm:text-base mb-6 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Let's work together to build exceptional teams that drive your business forward.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-3 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <motion.a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-blue-600 font-semibold text-sm"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Journey
              <ArrowRight className="w-4 h-4" />
            </motion.a>
            <motion.a
              href="/services"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-blue-700 text-white font-semibold text-sm border border-blue-500"
              whileHover={{ scale: 1.05, backgroundColor: "#1d4ed8" }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Services
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}