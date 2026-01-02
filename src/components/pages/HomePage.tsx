// HPI 1.6-V
import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, Database, TrendingUp, FileSpreadsheet, ChevronDown } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// --- Utility Components for Motion & Interaction ---

/**
 * AnimatedElement: Handles scroll-triggered reveals using IntersectionObserver.
 * Safe, performant, and declarative.
 */
type AnimatedElementProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  animation?: 'fade-up' | 'fade-in' | 'slide-in-right';
};

const AnimatedElement: React.FC<AnimatedElementProps> = ({ 
  children, 
  className = '', 
  delay = 0,
  animation = 'fade-up' 
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        // Add a small delay if requested via style
        setTimeout(() => {
          element.classList.add('is-visible');
        }, delay);
        observer.unobserve(element);
      }
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    observer.observe(element);
    return () => observer.disconnect();
  }, [delay]);

  const getAnimationClass = () => {
    switch (animation) {
      case 'fade-in': return 'opacity-0 transition-opacity duration-1000 ease-out';
      case 'slide-in-right': return 'opacity-0 translate-x-10 transition-all duration-1000 ease-out';
      case 'fade-up': default: return 'opacity-0 translate-y-10 transition-all duration-1000 ease-out';
    }
  };

  return (
    <div ref={ref} className={`${getAnimationClass()} ${className} [&.is-visible]:opacity-100 [&.is-visible]:translate-y-0 [&.is-visible]:translate-x-0`}>
      {children}
    </div>
  );
};

/**
 * ParallaxContainer: Creates a smooth parallax effect using CSS variables and scroll position.
 * Uses requestAnimationFrame for performance.
 */
const ParallaxContainer: React.FC<{ children: React.ReactNode; speed?: number; className?: string }> = ({ 
  children, 
  speed = 0.5, 
  className = '' 
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const scrollProgress = window.innerHeight - rect.top;
      // Only animate if in view
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const offset = scrollProgress * speed * 0.1;
        ref.current.style.setProperty('--parallax-y', `${offset}px`);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div ref={ref} className={className} style={{ transform: 'translateY(var(--parallax-y, 0px))', transition: 'transform 0.1s linear' }}>
      {children}
    </div>
  );
};

// --- Main Page Component ---

export default function HomePage() {
  // Canonical Data Sources
  const competencies = [
    {
      id: 'viz',
      icon: <BarChart3 size={32} />,
      title: "Data Visualization",
      description: "Creating intuitive dashboards and charts that communicate complex findings with clarity and impact.",
      image: "https://static.wixstatic.com/media/c3d12d_9d8abf6c4be4486e92d6895e23252d03~mv2.png?originWidth=320&originHeight=320"
    },
    {
      id: 'db',
      icon: <Database size={32} />,
      title: "Database Management",
      description: "Proficient in SQL and NoSQL databases, ensuring efficient data retrieval and storage optimization.",
      image: "https://static.wixstatic.com/media/c3d12d_527ac813aa5d46ad9aa6b252281f7557~mv2.png?originWidth=320&originHeight=320"
    },
    {
      id: 'stat',
      icon: <TrendingUp size={32} />,
      title: "Statistical Analysis",
      description: "Applying advanced statistical methods to uncover trends, correlations, and predictive patterns.",
      image: "https://static.wixstatic.com/media/c3d12d_5f5d27e9dd4e4b2aa7e9fd198ccc4f2b~mv2.png?originWidth=320&originHeight=320"
    },
    {
      id: 'bi',
      icon: <FileSpreadsheet size={32} />,
      title: "Business Intelligence",
      description: "Translating data insights into actionable business strategies that drive growth and efficiency.",
      image: "https://static.wixstatic.com/media/c3d12d_d6f1759abcaf4fc291f165d41bfebf27~mv2.png?originWidth=320&originHeight=320"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-primary overflow-clip selection:bg-primary selection:text-background">
      <Header />

      {/* --- HERO SECTION --- 
          Design: Asymmetrical split with massive typography and parallax imagery.
          Motif: Architectural lines and large serif headings.
      */}
      <section className="relative w-full min-h-screen flex flex-col justify-center pt-24 pb-12 overflow-hidden">
        {/* Background Grid Motif */}
        <div className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.03]" 
             style={{ backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)', backgroundSize: '6rem 6rem' }}>
        </div>

        <div className="w-full max-w-[120rem] mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Text Content - Spans 7 columns */}
            <div className="lg:col-span-7 flex flex-col justify-center relative z-20">
              <AnimatedElement animation="fade-up">
                <span className="inline-block py-2 px-4 border border-primary/20 rounded-full text-sm font-paragraph tracking-widest uppercase mb-6 bg-background/50 backdrop-blur-sm w-fit">
                  Dhanuja • Data Analyst
                </span>
              </AnimatedElement>
              
              <AnimatedElement animation="fade-up" delay={100}>
                <h1 className="font-heading text-7xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tight text-primary mb-8">
                  Crafting <br/>
                  <span className="italic font-light ml-12">Insight</span>
                </h1>
              </AnimatedElement>

              <AnimatedElement animation="fade-up" delay={200}>
                <p className="font-paragraph text-xl md:text-2xl text-primary/80 max-w-xl leading-relaxed mb-10 border-l border-primary/20 pl-6">
                  Transforming complex datasets into clear, strategic narratives that drive business intelligence.
                </p>
              </AnimatedElement>

              <AnimatedElement animation="fade-up" delay={300}>
                <div className="flex flex-wrap gap-4">
                  <Link 
                    to="/projects"
                    className="group relative px-8 py-4 bg-primary text-primary-foreground font-paragraph text-lg overflow-hidden rounded-sm transition-all hover:shadow-lg"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      View Projects <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                    </span>
                    <div className="absolute inset-0 bg-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></div>
                  </Link>
                  <Link 
                    to="/contact"
                    className="px-8 py-4 border border-primary text-primary font-paragraph text-lg hover:bg-primary/5 transition-colors rounded-sm"
                  >
                    Contact Me
                  </Link>
                </div>
              </AnimatedElement>
            </div>

            {/* Visual Content - Spans 5 columns with Parallax */}
            <div className="lg:col-span-5 relative h-[60vh] lg:h-[80vh] hidden lg:block">
              {/* Image 1 - Top Right */}
              <ParallaxContainer speed={-0.5} className="absolute top-0 right-0 w-3/4 aspect-[3/4] z-10">
                <div className="w-full h-full overflow-hidden rounded-sm shadow-2xl border border-primary/10">
                  <Image 
                    src="https://static.wixstatic.com/media/c3d12d_61aefcc704e14891abb9e05cf153b03e~mv2.png?originWidth=576&originHeight=768"
                    alt="Data visualization dashboard"
                    className="w-full h-full object-cover scale-110"
                    width={600}
                  />
                </div>
              </ParallaxContainer>

              {/* Image 2 - Bottom Left - Overlapping */}
              <ParallaxContainer speed={0.8} className="absolute bottom-12 left-0 w-2/3 aspect-square z-20">
                <div className="w-full h-full overflow-hidden rounded-sm shadow-2xl border-4 border-background">
                  <Image 
                    src="https://static.wixstatic.com/media/c3d12d_e773c565bfcf40b4ab2fc9ef31ab0616~mv2.png?originWidth=576&originHeight=768"
                    alt="Analyst working"
                    className="w-full h-full object-cover"
                    width={500}
                  />
                </div>
              </ParallaxContainer>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-primary/50">
          <ChevronDown size={32} />
        </div>
      </section>

      {/* --- ABOUT SECTION --- 
          Design: Sticky side heading with scrolling content.
          Motif: Clean typography and generous whitespace.
      */}
      <section className="w-full py-24 md:py-32 border-t border-primary/10 bg-background relative">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Sticky Heading */}
            <div className="lg:col-span-4 relative">
              <div className="lg:sticky lg:top-32">
                <AnimatedElement>
                  <h2 className="font-heading text-5xl md:text-6xl text-primary mb-6">
                    The Art of <br/> Analysis
                  </h2>
                  <div className="w-24 h-1 bg-primary mb-8"></div>
                  <p className="font-paragraph text-primary/60 text-lg max-w-xs">
                    Bridging the gap between raw numbers and strategic decisions.
                  </p>
                </AnimatedElement>
              </div>
            </div>

            {/* Scrolling Content */}
            <div className="lg:col-span-8 space-y-16">
              <AnimatedElement delay={100}>
                <p className="font-heading text-3xl md:text-4xl leading-tight text-primary/90">
                  "I am a dedicated Data Analyst with expertise in extracting meaningful patterns from complex datasets. My approach combines statistical rigor with creative problem-solving."
                </p>
              </AnimatedElement>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <AnimatedElement delay={200}>
                  <div className="p-8 bg-white/5 border border-primary/10 rounded-sm hover:border-primary/30 transition-colors h-full">
                    <h3 className="font-heading text-2xl mb-4">Strategic Vision</h3>
                    <p className="font-paragraph text-primary/70 leading-relaxed">
                      With a strong foundation in data visualization and business intelligence, I transform raw information into compelling narratives that empower organizations to make informed choices.
                    </p>
                  </div>
                </AnimatedElement>
                
                <AnimatedElement delay={300}>
                  <div className="p-8 bg-white/5 border border-primary/10 rounded-sm hover:border-primary/30 transition-colors h-full">
                    <h3 className="font-heading text-2xl mb-4">Technical Precision</h3>
                    <p className="font-paragraph text-primary/70 leading-relaxed">
                      Leveraging advanced statistical modeling and database management to ensure accuracy, reliability, and depth in every analysis delivered.
                    </p>
                  </div>
                </AnimatedElement>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CORE COMPETENCIES SECTION --- 
          Design: Horizontal cards or a grid with hover effects.
          Motif: Icons and structured layout.
      */}
      <section className="w-full py-24 md:py-32 bg-secondary text-secondary-foreground relative overflow-hidden">
        {/* Decorative Background Element */}
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

        <div className="max-w-[120rem] mx-auto px-6 md:px-12 relative z-10">
          <AnimatedElement>
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/10 pb-8">
              <h2 className="font-heading text-5xl md:text-7xl text-secondary-foreground">
                Core Competencies
              </h2>
              <p className="font-paragraph text-secondary-foreground/60 mt-4 md:mt-0 max-w-md text-right">
                A comprehensive toolkit designed to solve complex data challenges.
              </p>
            </div>
          </AnimatedElement>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {competencies.map((skill, index) => (
              <AnimatedElement key={skill.id} delay={index * 100} className="h-full">
                <div className="group h-full p-8 bg-white/5 border border-white/10 rounded-sm hover:bg-white/10 transition-all duration-500 flex flex-col justify-between min-h-[320px]">
                  <div>
                    <div className="w-14 h-14 flex items-center justify-center bg-buttonbackground rounded-sm mb-8 text-primary group-hover:scale-110 transition-transform duration-500">
                      {skill.icon}
                    </div>
                    <h3 className="font-heading text-2xl mb-4 text-secondary-foreground group-hover:translate-x-2 transition-transform duration-300">
                      {skill.title}
                    </h3>
                    <p className="font-paragraph text-secondary-foreground/70 text-sm leading-relaxed">
                      {skill.description}
                    </p>
                  </div>
                  <div className="mt-8 w-full h-[1px] bg-white/10 group-hover:bg-white/30 transition-colors relative overflow-hidden">
                    <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-in-out"></div>
                  </div>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>

      {/* --- FEATURED PROJECT TEASER (New Section) --- 
          Design: Full width image with overlay content.
          Motif: Immersive visual.
      */}
      <section className="w-full py-24 md:py-32 bg-background">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12">
          <div className="relative rounded-sm overflow-hidden group">
            <div className="aspect-[21/9] w-full relative">
              <Image 
                src="https://static.wixstatic.com/media/c3d12d_587a2af96aa0405f8b8e11ba108baa6b~mv2.png?originWidth=1600&originHeight=640"
                alt="Featured Project Analysis"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                width={1600}
              />
              <div className="absolute inset-0 bg-primary/40 group-hover:bg-primary/30 transition-colors duration-500"></div>
            </div>
            
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8 text-white">
              <AnimatedElement animation="fade-up">
                <span className="inline-block py-1 px-3 border border-white/30 rounded-full text-xs font-paragraph tracking-widest uppercase mb-4 bg-black/20 backdrop-blur-md">
                  Featured Case Study
                </span>
              </AnimatedElement>
              <AnimatedElement animation="fade-up" delay={100}>
                <h2 className="font-heading text-5xl md:text-7xl mb-6 max-w-4xl">
                  Retail Market Analysis 2025
                </h2>
              </AnimatedElement>
              <AnimatedElement animation="fade-up" delay={200}>
                <Link 
                  to="/projects"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white text-primary font-paragraph text-lg hover:bg-buttonbackground transition-colors rounded-sm"
                >
                  View Case Study <ArrowRight size={20} />
                </Link>
              </AnimatedElement>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- 
          Design: Minimalist, centered, high contrast.
      */}
      <section className="w-full py-24 md:py-40 bg-background border-t border-primary/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <AnimatedElement animation="fade-up">
            <h2 className="font-heading text-6xl md:text-8xl text-primary mb-8 leading-none">
              Ready to <br/> Collaborate?
            </h2>
          </AnimatedElement>
          
          <AnimatedElement animation="fade-up" delay={100}>
            <p className="font-paragraph text-xl md:text-2xl text-primary/70 mb-12 max-w-2xl mx-auto">
              Let's discuss how data-driven insights can elevate your next project and drive measurable results.
            </p>
          </AnimatedElement>
          
          <AnimatedElement animation="fade-up" delay={200}>
            <Link 
              to="/contact"
              className="group inline-flex items-center gap-4 text-2xl font-heading text-primary border-b border-primary pb-1 hover:text-primary/70 hover:border-primary/70 transition-all"
            >
              Get in Touch
              <ArrowRight size={24} className="transform group-hover:translate-x-2 transition-transform" />
            </Link>
          </AnimatedElement>
        </div>
      </section>

      <Footer />
    </div>
  );
}