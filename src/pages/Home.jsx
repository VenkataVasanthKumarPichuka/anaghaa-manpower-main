// Home.jsx
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import HeroCarousel from "../components/HeroCarousel";
import { 
  Search, 
  Users, 
  Target, 
  ClipboardCheck, 
  Briefcase, 
  GraduationCap, 
  ArrowRight, 
  Sparkles, 
  TrendingUp, 
  Shield, 
  Lightbulb, 
  Heart, 
  Quote, 
  Building2, 
  Phone, 
  Mail,
  MapPin,
  ChevronDown,
  CheckCircle2,
  Award,
  Clock,
  Zap
} from "lucide-react";

const STATS = [
  { value: "100+", label: "Clients Served", icon: Building2 },
  { value: "5+", label: "Industries Covered", icon: Target },
  { value: "5000+", label: "Placements Made", icon: Users },
  { value: "98%", label: "Client Retention", icon: Award },
];

const SERVICES = [
  {
    icon: Search,
    tag: "Core Service",
    title: "Talent Acquisition",
    desc: "End-to-end recruitment across all industries — sourcing top candidates via job portals, professional networks, and proprietary databases for permanent or contract roles.",
    features: ["Job Portal Sourcing", "Network Mapping", "Contract & Permanent"],
    path: "/services",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    icon: Target,
    tag: "Specialized",
    title: "Executive Search",
    desc: "Targeting passive, high-calibre talent for senior positions. We leverage LinkedIn, personal referrals, and deep industry networks to headhunt the right leaders.",
    features: ["C-Suite Hiring", "Senior Management", "Passive Talent"],
    path: "/services",
    color: "from-amber-500 to-amber-600",
    bgColor: "bg-amber-50"
  },
  {
    icon: Briefcase,
    tag: "Industry Focus",
    title: "Niche Recruitment",
    desc: "Specialized hiring in Healthcare, IT, and Manufacturing — with rigorous screening of resumes, certifications, and background verifications for domain-critical roles.",
    features: ["Healthcare", "Information Technology", "Manufacturing"],
    path: "/services",
    color: "from-emerald-500 to-emerald-600",
    bgColor: "bg-emerald-50"
  },
  {
    icon: ClipboardCheck,
    tag: "Assessment",
    title: "Screening & Evaluation",
    desc: "Comprehensive candidate assessments including skills tests, structured interviews, cultural fit analysis, and thorough background checks to shortlist the best fits.",
    features: ["Skills Testing", "Cultural Fit", "Background Checks"],
    path: "/services",
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50"
  },
  {
    icon: Users,
    tag: "Flexible Staffing",
    title: "Contract & RPO",
    desc: "Temporary and contract staffing for project-based needs, along with full Recruitment Process Outsourcing — managing your entire hiring pipeline from profiling to offer.",
    features: ["Short-Term Hires", "Onboarding Support", "Full RPO"],
    path: "/services",
    color: "from-rose-500 to-rose-600",
    bgColor: "bg-rose-50"
  },
  {
    icon: GraduationCap,
    tag: "Entry-Level",
    title: "Campus Drives & Training",
    desc: "Organized college placement drives and skills development sessions — building a pipeline of trained, interview-ready entry-level talent for your organization.",
    features: ["Campus Recruiting", "Mock Interviews", "Skills Development"],
    path: "/services",
    color: "from-cyan-500 to-cyan-600",
    bgColor: "bg-cyan-50"
  },
];

const INDUSTRIES = [
  "Healthcare", "Information Technology", "Manufacturing",
  "Banking & Finance", "Retail & E-Commerce", "Education",
  "Pharmaceuticals", "Logistics", "Real Estate",
  "Engineering", "Media & Communications", "Hospitality",
];

const PROCESS = [
  {
    step: "01",
    title: "Discovery Call",
    desc: "We start by understanding your business, goals, and the specific challenges you're solving for.",
    icon: Phone
  },
  {
    step: "02",
    title: "Strategy Design",
    desc: "We craft a tailored recruitment or consulting strategy aligned to your timelines, budget, and culture.",
    icon: Lightbulb
  },
  {
    step: "03",
    title: "Execution",
    desc: "Our team sources, screens, and delivers — with clear communication and transparency throughout.",
    icon: Zap
  },
  {
    step: "04",
    title: "Delivery & Support",
    desc: "We don't disappear after placement. We ensure successful onboarding and long-term fit.",
    icon: CheckCircle2
  },
];

const HERO_IMAGE = "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80&auto=format&fit=crop";
const ABOUT_IMAGE = "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=80&auto=format&fit=crop";
const TEAM_IMAGE = "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?w=900&q=80&auto=format&fit=crop";

// Animation Components
function FadeIn({ children, delay = 0, direction = "up", className = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 }
  };
  
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

export default function Home() {
  const counterRefs = useRef([]);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  useEffect(() => {
    const observers = counterRefs.current.map((el) => {
      if (!el) return null;
      const target = parseInt(el.dataset.target);
      const suffix = el.dataset.suffix || "";
      const duration = 1800;
      const steps = 60;
      const increment = target / steps;
      let current = 0;
      let count = 0;
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            const timer = setInterval(() => {
              count++;
              current = Math.min(Math.round(increment * count), target);
              el.textContent = current + suffix;
              if (current >= target) clearInterval(timer);
            }, duration / steps);
            observer.disconnect();
          }
        },
        { threshold: 0.5 }
      );
      observer.observe(el);
      return observer;
    });
    return () => observers.forEach((o) => o && o.disconnect());
  }, []);

  return (
    <>
      <HeroCarousel />

      {/* WHAT WE DO SECTION - REDUCED PADDING */}
      <section className="py-10 sm:py-12 md:py-16 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="text-center mb-10 sm:mb-12">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="h-px w-10 bg-[#4CAF50]" />
                <span className="text-xs text-[#1e3a5f] tracking-[0.2em] uppercase font-semibold">
                  What We Do
                </span>
                <div className="h-px w-10 bg-blue-300" />
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl bg-gradient-to-r from-[#1e3a5f] to-[#4CAF50] bg-clip-text text-transparent mb-3 font-bold">
                Built Around Your Success
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed">
                We combine practical experience, creative problem-solving, and a people-first approach to deliver end-to-end talent and consulting solutions across every industry.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5" staggerDelay={0.1}>
            {SERVICES.map((s, i) => (
              <StaggerItem key={i}>
                <Link
                  to={s.path}
                  className="group block bg-white border border-gray-200 hover:border-[#4CAF50] p-6 rounded-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-[#4CAF50]/20 h-full"
                >
                  <div className="flex items-center justify-between mb-4">
                    <motion.div 
                      className={`w-10 h-10 rounded-lg ${s.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <s.icon className={`w-5 h-5 bg-gradient-to-r ${s.color} [&>path]:stroke-current`} style={{ stroke: "url(#gradient)" }} />
                      <svg width="0" height="0">
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#2563eb" />
                            <stop offset="100%" stopColor="#1d4ed8" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </motion.div>
                    <span className="text-[10px] text-[#1e3a5f] tracking-widest uppercase border border-[#4CAF50] px-2 py-0.5 rounded-full bg-[#4CAF50]/10 group-hover:bg-[#4CAF50]/20 transition-colors">
                      {s.tag}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg text-gray-800 mb-2 group-hover:text-[#1e3a5f] transition-colors duration-300 font-bold">
                    {s.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">
                    {s.desc}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {s.features.map((f) => (
                      <span
                        key={f}
                        className="text-[10px] text-gray-600 tracking-wide border border-gray-200 px-2 py-0.5 rounded-full bg-gray-50 group-hover:border-[#4CAF50] group-hover:bg-[#4CAF50]/10 transition-all duration-300"
                      >
                        {f}
                      </span>
                    ))}
                  </div>

                  <span className="text-xs text-[#1e3a5f] tracking-widest uppercase flex items-center gap-2 group-hover:gap-3 transition-all duration-200 font-semibold">
                    Learn More <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <div className="text-center mt-8">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#4CAF50] text-[#1e3a5f] text-sm tracking-wide rounded-lg hover:bg-gradient-to-r hover:from-[#1e3a5f] hover:to-[#4CAF50] hover:text-white hover:border-transparent transition-all duration-300 font-semibold group"
            >
              View All Services
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ABOUT STRIP - REDUCED PADDING */}
      <section className="py-10 sm:py-12 md:py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
          <FadeIn direction="left">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-[#4CAF50]" />
                <span className="text-xs text-[#1e3a5f] tracking-[0.2em] uppercase font-semibold">Who We Are</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-gray-800 leading-tight mb-4 font-bold">
                A Partner That Listens,<br />
                <span className="bg-gradient-to-r from-[#1e3a5f] to-[#4CAF50] bg-clip-text text-transparent">Thinks & Delivers</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                We started with one simple belief: good work should create real results — not just good-looking promises. Our team partners with clients who want more than a vendor; they want a trusted advisor.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                What makes us different is how we work. We stay transparent, move with purpose, and focus on outcomes that matter. Every engagement is built on listening carefully, thinking deeply, and delivering with consistency.
              </p>

              <StaggerContainer className="grid grid-cols-2 gap-3 mb-6" staggerDelay={0.1}>
                {[
                  { label: "Transparent Communication", icon: Shield },
                  { label: "Outcome-Focused Work", icon: Target },
                  { label: "Creative Problem-Solving", icon: Lightbulb },
                  { label: "People-First Approach", icon: Heart },
                ].map((item) => (
                  <StaggerItem key={item.label}>
                    <motion.div 
                      className="flex items-start gap-2 p-2 rounded-lg hover:bg-[#4CAF50]/10 transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      <item.icon className="w-4 h-4 text-[#4CAF50] mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 text-xs leading-snug font-medium">{item.label}</span>
                    </motion.div>
                  </StaggerItem>
                ))}
              </StaggerContainer>

              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-[#1e3a5f] text-sm tracking-wide hover:gap-4 transition-all duration-200 border-b-2 border-[#4CAF50] pb-1 hover:border-[#4CAF50] font-semibold group"
              >
                Discover Our Story <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeIn>

          <FadeIn direction="right">
            <div className="relative h-64 sm:h-72 md:h-80">
              <motion.img
                src={ABOUT_IMAGE}
                alt="Team collaboration"
                className="absolute inset-0 w-full sm:w-[calc(100%-12px)] h-[55%] object-cover object-center rounded-lg shadow-md"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              />
              <motion.img
                src={TEAM_IMAGE}
                alt="Professional consulting"
                className="absolute bottom-0 right-0 sm:right-2 w-[55%] h-[40%] object-cover object-center rounded-lg shadow-md"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div 
                className="absolute bottom-0 left-0 sm:left-2 w-[42%] h-[40%] bg-white border-2 border-[#4CAF50] rounded-lg flex flex-col items-center justify-center p-2 text-center shadow-md"
                whileHover={{ y: -5 }}
              >
                <div className="font-serif text-xl sm:text-2xl bg-gradient-to-r from-[#1e3a5f] to-[#4CAF50] bg-clip-text text-transparent mb-0.5 font-bold">5+</div>
                <div className="text-[10px] text-gray-500 tracking-wider uppercase font-medium">Years of Experience</div>
              </motion.div>
              <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-[#4CAF50] rounded-tl-lg" />
              <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-[#4CAF50] rounded-br-lg" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* INDUSTRIES - FIXED GRID + REDUCED PADDING */}
      <section className="py-10 sm:py-12 md:py-16 px-4 sm:px-6 bg-gray-50 border-t border-gray-200/50">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="text-center mb-8 sm:mb-10">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="h-px w-8 bg-[#4CAF50]" />
                <span className="text-xs text-[#1e3a5f] tracking-[0.2em] uppercase font-semibold">Industries We Serve</span>
                <div className="h-px w-8 bg-[#4CAF50]" />
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl bg-gradient-to-r from-[#1e3a5f] to-[#4CAF50] bg-clip-text text-transparent font-bold">
                Expertise Across Every Sector
              </h2>
            </div>
          </FadeIn>

          {/* FIXED: Grid layout instead of flex to prevent overlap */}
          <StaggerContainer 
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3" 
            staggerDelay={0.05}
          >
            {INDUSTRIES.map((industry) => (
              <StaggerItem key={industry}>
                <motion.div
                  className="group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-center hover:border-[#4CAF50] hover:shadow-sm hover:shadow-[#4CAF50]/10 transition-all duration-300 cursor-default">
                    <span className="text-xs text-gray-700 font-medium group-hover:text-[#1e3a5f] transition-colors duration-300">
                      {industry}
                    </span>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* PROCESS - REDUCED PADDING */}
      <section className="py-10 sm:py-12 md:py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="text-center mb-10 sm:mb-12">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="h-px w-8 bg-[#4CAF50]" />
                <span className="text-xs text-[#1e3a5f] tracking-[0.2em] uppercase font-semibold">How We Work</span>
                <div className="h-px w-8 bg-[#4CAF50]" />
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl bg-gradient-to-r from-[#1e3a5f] to-[#4CAF50] bg-clip-text text-transparent mb-3 font-bold">
                Simple. Transparent. Effective.
              </h2>
              <p className="text-gray-600 max-w-md mx-auto text-sm">
                Our process is built around clarity — you always know what we're doing, why we're doing it, and when to expect results.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 relative">
            <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-[#4CAF50]/30 via-[#4CAF50] to-[#4CAF50]/30" />

            {PROCESS.map((p, i) => (
              <motion.div 
                key={i} 
                className="relative px-2 text-center group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
              <motion.div 
                className="relative w-14 h-14 mx-auto mb-3 flex items-center justify-center border-2 border-[#4CAF50]/30 bg-white rounded-full group-hover:border-[#4CAF50] group-hover:bg-[#4CAF50]/10 transition-all duration-300 shadow-md"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <p.icon className="w-5 h-5 text-[#4CAF50]" />
              </motion.div>
              <div className="font-serif text-xs text-[#4CAF50] mb-1 font-bold">{p.step}</div>
              <h3 className="font-serif text-base text-gray-800 mb-2 group-hover:text-[#1e3a5f] transition-colors duration-300 font-bold">
                {p.title}
              </h3>
              <p className="text-gray-500 text-xs leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE / TRUST - REDUCED PADDING */}
      <section className="py-10 sm:py-12 md:py-16 px-4 sm:px-6 relative overflow-hidden bg-gradient-to-br from-[#1e3a5f] to-[#152d47]">
        <motion.div 
          className="absolute top-6 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 0.1, scale: 1 }}
          viewport={{ once: true }}
        >
          <Quote className="w-24 h-24 text-white" />
        </motion.div>
        
        <div className="relative max-w-3xl mx-auto text-center">
          <motion.blockquote 
            className="font-serif text-xl sm:text-2xl md:text-3xl text-white leading-relaxed mb-4 italic"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            "Good work should create real results — not just good-looking promises."
          </motion.blockquote>
          
          <motion.div 
            className="flex items-center justify-center gap-3 mb-6 flex-wrap"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="h-px w-8 bg-[#4CAF50]/50" />
            <p className="text-white/80 text-xs tracking-[0.25em] uppercase font-semibold">Anaghaa Consultancy</p>
            <div className="h-px w-8 bg-[#4CAF50]/50" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link
              to="/mission"
              className="inline-block px-6 py-3 border-2 border-[#4CAF50]/50 text-white text-xs tracking-wide rounded-lg hover:bg-[#4CAF50] hover:text-[#1e3a5f] hover:border-[#4CAF50] transition-all duration-300 font-semibold"
            >
              Our Mission & Vision →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* RESUME / CANDIDATE SECTION - REDUCED PADDING */}
      <section className="py-10 sm:py-12 md:py-16 px-4 sm:px-6 bg-gray-50/50 border-t border-gray-200/50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <FadeIn direction="left">
            <motion.div 
              className="border-2 border-gray-200 hover:border-[#4CAF50] p-5 sm:p-6 rounded-xl group transition-all duration-300 relative overflow-hidden bg-white hover:shadow-lg h-full"
              whileHover={{ y: -5 }}
            >
              <motion.div 
                className="w-10 h-10 rounded-lg bg-[#4CAF50]/10 flex items-center justify-center mb-4 group-hover:bg-[#1e3a5f] transition-colors duration-300"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Building2 className="w-5 h-5 text-[#1e3a5f] group-hover:text-white transition-colors" />
              </motion.div>
              <h3 className="font-serif text-lg text-gray-800 mb-2 group-hover:text-[#1e3a5f] transition-colors duration-300 font-bold">
                For Employers
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                Whether you need to fill one critical role or build an entire team, we manage your hiring pipeline end-to-end — from job profiling and candidate sourcing to offer negotiation and onboarding.
              </p>
              <ul className="space-y-2 mb-5">
                {["Permanent & Contract Placements", "Recruitment Process Outsourcing", "Executive & Leadership Hiring", "Campus Recruitment Drives"].map(item => (
                  <li key={item} className="text-xs text-gray-600 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4CAF50] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-[#1e3a5f] text-xs tracking-widest uppercase hover:gap-3 transition-all duration-200 font-semibold group/link"
              >
                Hire Through Us <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </FadeIn>

          <FadeIn direction="right">
            <motion.div 
              className="border-2 border-gray-200 hover:border-[#4CAF50] p-5 sm:p-6 rounded-xl group transition-all duration-300 relative overflow-hidden bg-white hover:shadow-lg h-full"
              whileHover={{ y: -5 }}
            >
              <motion.div 
                className="w-10 h-10 rounded-lg bg-[#1e3a5f]/10 flex items-center justify-center mb-4 group-hover:bg-[#4CAF50] transition-colors duration-300"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Users className="w-5 h-5 text-[#4CAF50] group-hover:text-white transition-colors" />
              </motion.div>
              <h3 className="font-serif text-lg text-gray-800 mb-2 group-hover:text-[#4CAF50] transition-colors duration-300 font-bold">
                For Job Seekers
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                We don't just place you in a job — we help you find the right one. From resume optimization to mock interview sessions and career guidance, we prepare you for success.
              </p>
              <ul className="space-y-2 mb-5">
                {["Resume Optimization", "Mock Interview Sessions", "Career Counselling", "Access to Exclusive Openings"].map(item => (
                  <li key={item} className="text-xs text-gray-600 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4CAF50] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-[#4CAF50] text-xs tracking-widest uppercase hover:gap-3 transition-all duration-200 font-semibold group/link"
              >
                Find Your Next Role <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </FadeIn>
        </div>
      </section>

      {/* CTA BANNER - REDUCED PADDING */}
      <section className="py-10 sm:py-12 md:py-16 px-4 sm:px-6 bg-gradient-to-br from-[#1e3a5f] to-[#0d1e2d] relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "40px 40px"
          }}
        />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div 
            className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 text-center border border-white/20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="h-px w-6 bg-white/50" />
              <span className="text-xs text-white/80 tracking-[0.2em] uppercase font-semibold">Let's Talk</span>
              <div className="h-px w-6 bg-white/50" />
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white mb-3 leading-tight font-bold">
              Ready to Transform<br />
              <span className="text-white/90">Your Business?</span>
            </h2>
            <p className="text-white/80 mb-6 max-w-md mx-auto text-sm leading-relaxed">
              Let's start with a conversation. Tell us about your goals, your challenges, and where you want to go.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/contact"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#1e3a5f] font-semibold tracking-wide rounded-lg hover:shadow-lg transition-all duration-300 text-sm"
              >
                <span>Start a Conversation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-white/40 text-white hover:bg-white/10 transition-all duration-300 tracking-wide rounded-lg font-semibold text-sm"
              >
                Explore Our Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}