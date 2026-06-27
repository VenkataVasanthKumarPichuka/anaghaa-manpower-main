import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  CheckCircle2, 
  ArrowRight, 
  Users, 
  Target, 
  Briefcase, 
  GraduationCap, 
  Search, 
  FileCheck, 
  Clock, 
  TrendingUp,
  Sparkles,
  Award,
  Building2,
  ChevronDown,
  Phone
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

// Data based on PDF content - Expanded
const services = [
  {
    id: "talent-acquisition",
    icon: Users,
    title: "End-to-End Talent Acquisition",
    subtitle: "Complete Hiring Lifecycle Management",
    desc: "We manage the entire recruitment journey from sourcing to onboarding, ensuring you get the right talent at the right time. Our multi-channel approach combines technology with human expertise.",
    features: [
      "Multi-platform sourcing (Naukri, LinkedIn, Indeed, referrals)",
      "Advanced ATS & talent database management",
      "AI-powered resume screening & matching",
      "Interview scheduling & coordination",
      "Offer negotiation & onboarding support",
      "Candidate engagement & relationship management",
      "Faster time-to-hire with quality candidates",
      "Dedicated account managers for each client"
    ],
    stats: { value: "100+", label: "Successful Placements" },
    img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
    color: "from-[#1e3a5f] to-[#4CAF50]"
  },
  {
    id: "executive-search",
    icon: Target,
    title: "Executive Search & Headhunting",
    subtitle: "Premium Leadership Hiring Solutions",
    desc: "Confidential, targeted search for C-suite and senior leadership roles. We access passive talent pools and use discreet approaches to find transformative leaders for your organization.",
    features: [
      "Headhunting passive & non-active candidates",
      "C-Suite, VP & Director level hiring",
      "Confidential search strategies",
      "Competitor & market intelligence analysis",
      "Extensive professional network reach",
      "Leadership assessment & benchmarking",
      "Succession planning support",
      "Board advisory services"
    ],
    stats: { value: "98%", label: "Retention Rate" },
    img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80",
    color: "from-[#1e3a5f] to-[#4CAF50]"
  },
  {
    id: "niche-recruitment",
    icon: Briefcase,
    title: "Niche & Specialized Recruitment",
    subtitle: "Industry-Specific Expertise",
    desc: "Deep domain knowledge across Healthcare, IT, Manufacturing, and BFSI sectors. We understand the unique skill requirements and regulatory landscapes of specialized industries.",
    features: [
      "Healthcare: Doctors, nurses, paramedical staff",
      "IT: Developers, architects, data scientists",
      "Manufacturing: Engineers, technicians, QA",
      "Skill-based technical screening",
      "Certification & license verification",
      "Domain-specific competency tests",
      "Regulatory compliance checks",
      "Industry-focused talent pools"
    ],
    stats: { value: "12+", label: "Industries Served" },
    img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    color: "from-[#1e3a5f] to-[#4CAF50]"
  },
  {
    id: "screening",
    icon: FileCheck,
    title: "Screening & Assessment",
    subtitle: "Rigorous Evaluation Process",
    desc: "Comprehensive candidate evaluation including skills testing, behavioral assessments, and background verification to ensure you hire the best fit for your culture and requirements.",
    features: [
      "Technical skills assessment & testing",
      "Psychometric & behavioral evaluations",
      "Cultural fit analysis",
      "Background & reference checks",
      "Resume optimization for candidates",
      "Interview preparation & mock sessions",
      "Competency-based interviewing",
      "Video interview platforms"
    ],
    stats: { value: "95%", label: "Client Satisfaction" },
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
    color: "from-[#1e3a5f] to-[#4CAF50]"
  },
  {
    id: "staffing",
    icon: Clock,
    title: "Temporary & Contract Staffing",
    subtitle: "Flexible Workforce Solutions",
    desc: "Agile staffing solutions for project-based needs, seasonal demands, and interim requirements. We handle payroll, compliance, and administration so you can focus on business.",
    features: [
      "Short-term & project-based hires",
      "Payroll management & processing",
      "Statutory compliance handling",
      "Contract-to-hire conversions",
      "Onboarding & offboarding support",
      "Timesheet & attendance management",
      "Replacement guarantees",
      "24/7 support availability"
    ],
    stats: {},
    img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80",
    color: "from-[#1e3a5f] to-[#4CAF50]"
  },
  {
    id: "rpo",
    icon: Building2,
    title: "Recruitment Process Outsourcing",
    subtitle: "End-to-End Hiring Partnership",
    desc: "Full-scale RPO services managing your entire recruitment function. From job profiling to offer management, we act as your internal talent acquisition team.",
    features: [
      "Complete hiring pipeline management",
      "Job profiling & description creation",
      "Employer branding & promotion",
      "Campus recruitment programs",
      "Diversity & inclusion hiring",
      "Recruitment analytics & reporting",
      "Technology platform integration",
      "Scalable team deployment"
    ],
    stats: { value: "40%", label: "Cost Reduction" },
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    color: "from-[#1e3a5f] to-[#4CAF50]"
  }
];

const additionalServices = [
  {
    icon: GraduationCap,
    title: "Campus Drives & Training",
    desc: "Organize college placement programs and skill development sessions for entry-level talent acquisition.",
    color: "bg-orange-100 text-orange-600"
  },
  {
    icon: Search,
    title: "Resume Optimization",
    desc: "Help job seekers refine profiles and prepare for interviews through professional guidance and mock sessions.",
    color: "bg-teal-100 text-teal-600"
  },
  {
    icon: TrendingUp,
    title: "Market Intelligence",
    desc: "Salary benchmarking, competitor analysis, and talent market insights to inform your hiring strategy.",
    color: "bg-indigo-100 text-indigo-600"
  },
  {
    icon: Award,
    title: "Employer Branding",
    desc: "Enhance your employer value proposition to attract top talent in competitive markets.",
    color: "bg-pink-100 text-pink-600"
  }
];

const processSteps = [
  { step: "01", title: "Discovery", desc: "Understanding your requirements and culture" },
  { step: "02", title: "Sourcing", desc: "Multi-channel candidate identification" },
  { step: "03", title: "Screening", desc: "Rigorous assessment and shortlisting" },
  { step: "04", title: "Selection", desc: "Interview coordination and evaluation" },
  { step: "05", title: "Onboarding", desc: "Seamless integration support" }
];

export default function ServicesPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  const [activeService, setActiveService] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 overflow-x-hidden mt-12">
      
      {/* Hero Banner Section - Light Theme Style */}
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
            alt="Professional team collaboration"
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay - Light theme style */}
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
            <span className="text-white font-medium">Services</span>
          </motion.nav>

          {/* Main Title */}
          <div className="max-w-3xl">
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Our <span className="text-[#4CAF50]">Services</span>
            </motion.h1>

            {/* Quote Box - Styled like your reference */}
            <motion.div 
              className="border-l-4 border-[#4CAF50] pl-4 sm:pl-6 py-2"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <p className="text-base sm:text-lg md:text-xl text-blue-100 italic leading-relaxed font-light">
                "Empowering businesses with strategic staffing solutions that drive growth, innovation, and lasting success."
              </p>
              <motion.p 
                className="text-amber-400 mt-3 font-semibold text-sm sm:text-base"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                — Comprehensive HR Solutions Since 2026
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
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-4"
                whileHover={{ scale: 1.05 }}
              >
                <Sparkles className="w-4 h-4" />
                What We Offer
              </motion.span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Strategic Consulting & Staffing Solutions
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                At Anaghaa Consultancy Services, we combine practical experience, creative problem-solving, 
                and a people-first approach to deliver transformative HR solutions. From talent acquisition 
                to executive search, we help businesses build high-performing teams that drive sustainable growth.
              </p>
            </div>
          </FadeIn>

          {/* Stats Row */}
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 sm:mt-12" staggerDelay={0.1}>
            {[
              { value: "100+", label: "Placements" },
              { value: "10+", label: "Clients" },
              { value: "12+", label: "Industries" },
              { value: "5+", label: "Years Experience" }
            ].map((stat, index) => (
              <StaggerItem key={index}>
                <motion.div 
                  className="text-center p-4 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200"
                  whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
                >
                  <motion.p 
                    className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent"
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

      {/* Main Services Section */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-10 sm:mb-14">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                Core Services
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
                Comprehensive recruitment solutions tailored to your business needs
              </p>
            </div>
          </FadeIn>

          <div className="space-y-16 sm:space-y-20 lg:space-y-24">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-12 ${index % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}
                onMouseEnter={() => setActiveService(service.id)}
                onMouseLeave={() => setActiveService(null)}
              >
                {/* Image Side */}
                <div className="w-full lg:w-1/2">
                  <FloatingCard className="relative group rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg">
                    <motion.div 
                      className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-10`}
                    />
                    <motion.img
                      src={service.img}
                      alt={service.title}
                      className="w-full h-64 sm:h-72 lg:h-80 object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6 }}
                    />
                    
                    {/* Floating Stats Badge */}
                    <motion.div 
                      className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg z-20"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                    >
                      <p className="text-xl sm:text-2xl font-bold text-gray-900">{service.stats.value}</p>
                      <p className="text-xs text-gray-600">{service.stats.label}</p>
                    </motion.div>

                    {/* Icon Badge */}
                    <motion.div 
                      className={`absolute top-4 left-4 w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg z-20`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <service.icon className="w-6 h-6 text-white" />
                    </motion.div>
                  </FloatingCard>
                </div>

                {/* Content Side */}
                <div className="w-full lg:w-1/2">
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${service.color} text-white mb-3`}>
                      {service.subtitle}
                    </span>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-5">
                      {service.desc}
                    </p>

                    <StaggerContainer className="space-y-2 sm:space-y-3" staggerDelay={0.05}>
                      {service.features.map((feature, i) => (
                        <StaggerItem key={i}>
                          <motion.div 
                            className="flex items-start gap-3 group"
                            whileHover={{ x: 5 }}
                          >
                            <motion.div 
                              className={`w-5 h-5 rounded-full bg-gradient-to-br ${service.color} flex items-center justify-center flex-shrink-0 mt-0.5`}
                              whileHover={{ scale: 1.2 }}
                            >
                              <CheckCircle2 className="w-3 h-3 text-white" />
                            </motion.div>
                            <span className="text-gray-700 text-xs sm:text-sm group-hover:text-gray-900 transition-colors">
                              {feature}
                            </span>
                          </motion.div>
                        </StaggerItem>
                      ))}
                    </StaggerContainer>

                    <motion.div>
                      <Link
                        to="/contact"
                        className={`mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r ${service.color} text-white text-sm font-semibold shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg`}
                      >
                        Learn More
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-10 sm:mb-14">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                Our Process
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
                A streamlined approach to delivering exceptional results
              </p>
            </div>
          </FadeIn>

          <div className="relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-amber-200 to-blue-200 transform -translate-y-1/2" />
            
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 relative" staggerDelay={0.1}>
              {processSteps.map((step, index) => (
                <StaggerItem key={index}>
                  <motion.div 
                    className="relative bg-white rounded-2xl p-5 border border-gray-200 shadow-sm text-center"
                    whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                  >
                    <motion.div 
                      className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg"
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {step.step}
                    </motion.div>
                    <h4 className="font-bold text-gray-900 mb-1 text-sm sm:text-base">{step.title}</h4>
                    <p className="text-gray-600 text-xs">{step.desc}</p>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Additional Services Grid */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                Additional Solutions
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                Specialized services to support your HR strategy
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6" staggerDelay={0.1}>
            {additionalServices.map((service, index) => (
              <StaggerItem key={index}>
                <motion.div 
                  className="bg-white rounded-2xl p-5 border border-gray-200 h-full"
                  whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div 
                    className={`w-12 h-12 rounded-xl ${service.color} flex items-center justify-center mb-4`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <service.icon className="w-6 h-6" />
                  </motion.div>
                  <h4 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">{service.title}</h4>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{service.desc}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

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
            Ready to Build Your Dream Team?
          </motion.h2>
          <motion.p 
            className="text-blue-100 text-sm sm:text-base mb-6 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Let's discuss how Anaghaa Consultancy can transform your hiring process and drive business growth.
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
              Get Started
              <ArrowRight className="w-4 h-4" />
            </motion.a>
            <motion.a
              href="tel:+919876543210"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-blue-700 text-white font-semibold text-sm border border-blue-500"
              whileHover={{ scale: 1.05, backgroundColor: "#1d4ed8" }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone className="w-4 h-4" />
              Call Us
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}