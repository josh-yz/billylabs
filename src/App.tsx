import { useEffect, useRef, useState } from 'react';
import { Play, Mail, ArrowDown, Youtube, Instagram, ExternalLink, Menu, X, ArrowRight } from 'lucide-react';

/* ─── ANIMATION HOOK ─── */
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(e.target); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function Fade({
  children, className = '', delay = 0, from = 'bottom',
}: { children: React.ReactNode; className?: string; delay?: number; from?: 'bottom' | 'left' | 'right' | 'none' }) {
  const { ref, visible } = useInView();
  const base = from === 'left' ? 'translate-x-16' : from === 'right' ? '-translate-x-16' : from === 'none' ? '' : 'translate-y-12';
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-x-0 translate-y-0 scale-100' : `opacity-0 ${base}`} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ─── NAV ─── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);
  const links = ['About', 'Work', 'Process', 'Reels', 'Contact'];
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#f5f1e8]/97 backdrop-blur-xl shadow-md py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="font-black text-2xl tracking-tight">
          <span className={scrolled ? 'text-[#123f83]' : 'text-white'}>Billy</span>
          <span className="text-[#123f83]"> Labs</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className={`text-xs font-black uppercase tracking-widest transition-colors duration-300 ${scrolled ? 'text-[#315481] hover:text-[#123f83]' : 'text-white/70 hover:text-white'}`}
            >
              {l}
            </a>
          ))}
          <a
            href="#contact"
            className="px-5 py-2.5 bg-[#123f83] hover:bg-[#123f83]/90 text-[#f5f1e8] text-xs font-black rounded-lg uppercase tracking-widest transition-all duration-300 hover:shadow-lg hover:shadow-[#123f83]/40"
          >
            Hire Us
          </a>
        </div>
        <button onClick={() => setOpen(!open)} className={`md:hidden ${scrolled ? 'text-[#123f83]' : 'text-white'}`}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <div className="absolute top-full left-0 right-0 bg-[#f5f1e8] shadow-2xl py-6 px-6 border-t border-[#123f83]/10">
          {links.map(l => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              onClick={() => setOpen(false)}
              className="block py-3 text-[#315481] font-black uppercase tracking-widest text-sm hover:text-[#123f83] transition-colors border-b border-[#123f83]/10 last:border-0"
            >
              {l}
            </a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)} className="mt-4 inline-block px-6 py-3 bg-[#123f83] text-[#f5f1e8] font-black rounded-lg text-sm">
            Hire Us
          </a>
        </div>
      )}
    </nav>
  );
}

/* ─── HERO ─── */
function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 120);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="paper-texture relative min-h-screen bg-[#f5f1e8] flex items-center overflow-hidden pt-24 pb-16">
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }}
      />

      {/* Cobalt accent circles */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block">
        <div className="absolute top-1/3 left-1/2 w-96 h-96 bg-[#123f83]/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#315481]/8 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-14 lg:gap-20 items-center">
        <div className="max-w-3xl">
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#123f83]/10 border border-[#123f83]/30 mb-8 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            <span className="w-2 h-2 bg-[#123f83] rounded-full animate-pulse" />
            <span className="text-xs font-bold text-[#315481] uppercase tracking-widest">Video Agency · Available for Projects</span>
          </div>

          <div
            className={`mb-7 transition-all duration-700 delay-150 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <h1 className="font-black leading-[0.84]">
              <span className="block text-7xl sm:text-8xl lg:text-9xl text-[#123f83]">BILLY</span>
              <span className="block text-7xl sm:text-8xl lg:text-9xl text-[#315481]">LABS</span>
            </h1>
            <p className="mt-7 max-w-xl text-3xl sm:text-4xl font-black leading-tight tracking-tight text-[#123f83]">
              Transforming Content <span className="text-[#315481]">into Entertainment.</span>
            </p>
          </div>

          <p
            className={`text-lg text-[#315481]/85 max-w-xl mb-10 leading-relaxed transition-all duration-700 delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            A video agency for film, television, and entertainment. We transform ideas, audiovisual material, and stories into engaging videos built to capture attention and keep audiences hooked.
          </p>

          <div
            className={`flex flex-wrap gap-4 mb-14 transition-all duration-700 delay-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            <a
              href="#work"
              className="group flex items-center gap-2 px-8 py-4 bg-[#123f83] text-[#f5f1e8] font-black rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 uppercase tracking-wide text-sm"
            >
              <Play size={16} fill="currentColor" />View Our Work
            </a>
            <a
              href="mailto:contactobillylabs@gmail.com?subject=Video%20Production%20Inquiry&body=Hi%20Billy%20Labs%2C%20I'd%20love%20to%20discuss%20a%20video%20project."
              className="flex items-center gap-2 px-8 py-4 border-2 border-[#123f83]/40 hover:border-[#123f83] text-[#123f83] font-black rounded-xl transition-all duration-300 hover:bg-[#123f83]/10 uppercase tracking-wide text-sm"
            >
              <Mail size={16} />Get in Touch
            </a>
          </div>

          <div
            className={`flex gap-12 transition-all duration-700 delay-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            {[['8+', 'Years'], ['1,000+', 'Videos Produced'], ['4', 'Media Companies']].map(([n, l]) => (
              <div key={l}>
                <p className="text-5xl font-black text-[#123f83]">{n}</p>
                <p className="text-xs text-[#315481] uppercase tracking-widest mt-1 font-bold">{l}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={`relative hidden lg:block transition-all duration-1000 delay-300 ${loaded ? 'opacity-100 translate-y-0 rotate-0' : 'opacity-0 translate-y-8 rotate-2'}`}>
          <div className="absolute -inset-5 rounded-[2rem] border-2 border-[#123f83]/15 rotate-3" />
          <div className="relative aspect-square overflow-hidden rounded-[3rem] bg-[#f5f1e8] p-5 shadow-2xl shadow-[#123f83]/20">
            <div className="absolute inset-3 rounded-[2.4rem] border border-[#123f83]/15" />
            <div className="relative h-full w-full overflow-hidden rounded-[2.4rem] bg-[#f5f1e8]">
              <div className="absolute left-[-8%] right-[-8%] top-[18%] h-24 rotate-[-4deg] bg-[#315481] opacity-95" />
              <img
                src="/Gemini_Generated_Image_k7nxm7k7nxm7k7nx.jpeg"
                alt="Billy Labs hand-painted logo"
                className="relative z-10 h-full w-full object-cover object-center transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        </div>
        </div>
      </div>

      <a href="#about" className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-[#123f83]/50 hover:text-[#123f83] transition-colors">
        <span className="text-xs uppercase tracking-[0.3em] font-black">Scroll</span>
        <ArrowDown size={16} className="animate-bounce" />
      </a>
    </section>
  );
}

/* ─── MARQUEE STRIP ─── */
const MARQUEE_ITEMS = ['VALNET', '·', 'COLLIDER', '·', 'CHV', '·', 'WATCHMOJO', '·', 'SCREEN RANT', '·', 'VIDEO PRODUCER', '·', 'CONTENT EDITOR', '·', 'ENTERTAINMENT', '·', 'VALNET', '·', 'COLLIDER', '·', 'CHV', '·', 'WATCHMOJO', '·', 'SCREEN RANT', '·', 'VIDEO PRODUCER', '·', 'CONTENT EDITOR', '·', 'ENTERTAINMENT', '·'];

function MarqueeStrip() {
  return (
    <section className="py-5 bg-[#123f83] overflow-hidden border-y border-[#315481]">
      <div className="flex animate-marquee whitespace-nowrap">
        {MARQUEE_ITEMS.map((item, i) => (
          <span key={i} className={`text-sm font-black uppercase tracking-widest px-4 ${item === '·' ? 'text-[#315481]' : 'text-[#f5f1e8]'}`}>
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}

/* ─── ABOUT ─── */
function About() {
  return (
    <section id="about" className="paper-texture py-28 bg-[#f5f1e8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <Fade>
            <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 bg-[#123f83]/10 text-[#123f83] font-black text-xs rounded-full uppercase tracking-widest mb-6">
              About Us
            </span>
            <h2 className="font-black text-5xl sm:text-6xl text-slate-900 leading-none mb-8">
              Billy Labs<br />
              <span className="text-[#123f83]">Transforming</span><br />
              Content into Entertainment
            </h2>
            <p className="text-slate-500 leading-relaxed mb-4">
              We are Billy Labs, a video agency specializing in film, television, and entertainment. We edit and transform your ideas, audiovisual material, and stories into engaging videos designed to capture attention, increase reach, and keep audiences hooked.
            </p>
            <p className="text-slate-500 leading-relaxed mb-4">
              From YouTube videos and Shorts to social media content, trailers, clips, and entertainment edits, we create content optimized for various platforms. Our approach combines creative editing, visual storytelling, pacing, sound design, graphics, and audience-centric strategies to make every video more engaging and memorable.
            </p>
            <p className="text-slate-500 leading-relaxed mb-10">
              With 8+ years of experience across broadcast television and global digital media, we don't just edit videos — we transform content into experiences people want to watch and share.
            </p>
            <div className="flex justify-center gap-3">
              <a
                href="https://www.youtube.com/@screenvview/videos"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 bg-[#123f83] hover:bg-[#123f83]/90 text-[#f5f1e8] rounded-xl transition-all duration-300 font-bold text-sm hover:scale-105"
              >
                <Youtube size={17} /> Our Channel
              </a>
              <a
                href="https://www.instagram.com/billylabss/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 bg-[#123f83] hover:bg-[#123f83]/90 text-[#f5f1e8] rounded-xl transition-all duration-300 font-bold text-sm hover:scale-105"
              >
                <Instagram size={17} /> Follow Us
              </a>
            </div>
            </div>
          </Fade>
        </div>
      </div>
    </section>
  );
}

/* ─── WORK EXPERIENCE ─── */
const EXPERIENCE = [
  {
    company: 'VALNET / SCREEN RANT',
    role: 'Production Partner',
    period: '2021 – Present',
    description: 'Producing and editing high-performance YouTube videos and Shorts for Screen Rant — one of the largest film and TV channels on YouTube with 10M+ subscribers.',
    color: 'bg-[#123f83] text-[#f5f1e8]',
    accent: 'bg-[#315481]',
  },
  {
    company: 'COLLIDER',
    role: 'Content Partner',
    period: '2020 – 2021',
    description: "Produced and edited entertainment content covering film releases, streaming news, and pop culture for Collider's YouTube audience.",
    color: 'bg-[#f5f1e8] text-[#123f83] border-2 border-[#123f83]/10',
    accent: 'bg-[#123f83]/10 text-[#123f83]',
  },
  {
    company: 'WATCHMOJO',
    role: 'Content Partner',
    period: '2019 – 2020',
    description: "Researched, scripted, and edited top-list entertainment videos for one of YouTube's most-subscribed channels worldwide.",
    color: 'bg-[#123f83] text-[#f5f1e8]',
    accent: 'bg-[#315481]',
  },
  {
    company: 'CHV — CHILEVISIÓN',
    role: 'Broadcast Partner',
    period: '2016 – 2019',
    description: 'Television production for Chilean broadcast channel CHV, covering live entertainment shows, news segments, and on-air packages.',
    color: 'bg-[#f5f1e8] text-[#123f83] border-2 border-[#123f83]/10',
    accent: 'bg-[#123f83]/10 text-[#123f83]',
  },
];

function WorkExperience() {
  return (
    <section className="py-28 bg-[#123f83] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <Fade className="mb-16">
          <span className="text-[#315481] font-black text-xs uppercase tracking-[0.3em] block mb-4">Track Record</span>
          <h2 className="font-black text-7xl sm:text-8xl lg:text-9xl text-[#f5f1e8] leading-none">
            PARTNER<br />
            <span className="text-[#315481]">EXP.</span>
          </h2>
        </Fade>

        <div className="grid sm:grid-cols-2 gap-5">
          {EXPERIENCE.map((exp, i) => (
            <Fade key={i} delay={i * 100}>
              <div className={`${exp.color} rounded-3xl p-8 h-full flex flex-col hover:scale-[1.02] transition-transform duration-300 shadow-xl`}>
                <span className={`self-start text-xs font-black px-3 py-1 rounded-full ${exp.accent} uppercase tracking-widest mb-5`}>
                  {exp.period}
                </span>
                <h3 className="font-black text-2xl mb-1 leading-tight">{exp.company}</h3>
                <p className={`text-xs font-black uppercase tracking-widest mb-4 ${exp.color.includes('border') ? 'text-slate-500' : 'text-[#315481]'}`}>
                  {exp.role}
                </p>
                <p className={`leading-relaxed flex-1 text-sm ${exp.color.includes('border') ? 'text-slate-500' : 'text-[#f5f1e8]/80'}`}>
                  {exp.description}
                </p>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── COMPANIES ─── */
const COMPANY_CARDS = [
  { name: 'VALNET', tagline: 'Digital Media Group', dark: true },
  { name: 'COLLIDER', tagline: 'Film & TV Entertainment', dark: false },
  { name: 'CHV', tagline: 'Chilevisión · Broadcast TV', dark: true },
  { name: 'WATCHMOJO', tagline: 'YouTube Network', dark: false },
  { name: 'SCREEN RANT', tagline: 'Valnet · Film & TV Reviews', dark: true },
];

const MARQUEE_LOGOS = [
  'Screen Rant', 'Collider', 'WatchMojo', 'Valnet', 'Chilevisión',
  'Screen Rant', 'Collider', 'WatchMojo', 'Valnet', 'Chilevisión',
];

function Companies() {
  return (
    <section className="py-28 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <Fade className="text-center mb-16">
          <span className="text-[#123f83] font-black text-xs uppercase tracking-[0.3em] block mb-4">Trusted By</span>
          <h2 className="font-black text-5xl sm:text-6xl text-slate-900 leading-none">
            Brands We've<br />
            <span className="text-[#123f83]">Partnered With</span>
          </h2>
        </Fade>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {COMPANY_CARDS.map((c, i) => (
            <Fade key={i} delay={i * 70} from="none">
              <div className={`px-6 py-8 rounded-2xl text-center hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-md hover:shadow-xl ${c.dark ? 'bg-[#123f83] text-[#f5f1e8]' : 'bg-white border-2 border-[#123f83]/10 text-slate-900'}`}>
                <p className="font-black text-lg tracking-tight leading-none mb-2">{c.name}</p>
                <p className={`text-[10px] uppercase tracking-widest ${c.dark ? 'text-[#315481]' : 'text-slate-400'}`}>{c.tagline}</p>
              </div>
            </Fade>
          ))}
        </div>
      </div>

      <Fade className="mt-16" delay={300}>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />
          <div className="flex gap-12 animate-marquee whitespace-nowrap">
            {MARQUEE_LOGOS.map((logo, i) => (
              <span key={i} className="text-3xl font-black text-slate-300 hover:text-[#123f83] transition-colors duration-300 tracking-tight">
                {logo}
              </span>
            ))}
          </div>
        </div>
      </Fade>
    </section>
  );
}

/* ─── PROCESS ─── */
const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Define the Story',
    description: 'We align on the audience, message, and creative direction before a single frame is cut.',
  },
  {
    number: '02',
    title: 'Shape the Edit',
    description: 'We build the rhythm, visuals, sound, and details that turn raw material into a story people want to watch.',
  },
  {
    number: '03',
    title: 'Deliver with Impact',
    description: 'You receive polished, platform-ready content designed to perform across every screen that matters.',
  },
];

function Process() {
  return (
    <section id="process" className="paper-texture py-28 bg-[#f5f1e8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <Fade className="mb-16">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div>
              <span className="text-[#123f83] font-black text-xs uppercase tracking-[0.3em] block mb-4">The Approach</span>
              <h2 className="font-black text-6xl sm:text-7xl lg:text-8xl text-slate-900 leading-[0.88]">
                FROM IDEA<br />
                <span className="text-[#123f83]">TO IMPACT.</span>
              </h2>
            </div>
            <p className="text-slate-500 max-w-sm text-sm leading-relaxed lg:pb-2">
              A clear, collaborative process that keeps the creative sharp and the final result focused on your audience.
            </p>
          </div>
        </Fade>

        <div className="grid lg:grid-cols-3 gap-5">
          {PROCESS_STEPS.map((step, i) => (
            <Fade key={step.number} delay={i * 100}>
              <div className="group relative h-full rounded-3xl border border-[#123f83]/12 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className="mb-16 flex items-start justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#123f83] text-sm font-black text-[#f5f1e8] transition-transform duration-300 group-hover:rotate-12">
                    {step.number}
                  </span>
                  <ArrowRight size={22} className="text-[#123f83]/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#123f83]" />
                </div>
                <h3 className="mb-4 text-2xl font-black text-slate-900">{step.title}</h3>
                <p className="text-sm leading-relaxed text-slate-500">{step.description}</p>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── PORTFOLIO ─── */
const CHANNELS: { key: string; title: string; badgeClass: string; videos: { url: string }[] }[] = [
  {
    key: 'watchmojo',
    title: 'WatchMojo',
    badgeClass: 'bg-slate-800 text-white',
    videos: [
      { url: 'https://www.youtube.com/watch?v=ok86bM3pLis' },
      { url: 'https://www.youtube.com/watch?v=6A6KaFAVrjg' },
      { url: 'https://www.youtube.com/watch?v=3djWH__UJ0E' },
      { url: 'https://www.youtube.com/watch?v=jtrn40FSISw' },
    ],
  },
  {
    key: 'youtube',
    title: 'YouTube',
    badgeClass: 'bg-red-600 text-white',
    videos: [
      { url: 'https://www.youtube.com/watch?v=4F1KRFXPWY8&t=2s' },
      { url: 'https://www.youtube.com/watch?v=BO6oAwhuj0M&t=1s' },
      { url: 'https://www.youtube.com/watch?v=5GEMsJiL3zE&t=1s' },
      { url: 'https://www.youtube.com/watch?v=FJQzXOe608w' },
    ],
  },
  {
    key: 'collider',
    title: 'Collider',
    badgeClass: 'bg-amber-600 text-white',
    videos: [
      { url: 'https://www.youtube.com/watch?v=3lvQFcI1_Dc' },
      { url: 'https://www.youtube.com/watch?v=1AQZp4WRLWM' },
      { url: 'https://www.youtube.com/watch?v=ci4nc1MgsAk' },
      { url: 'https://www.youtube.com/watch?v=rci1C0051X8' },
    ],
  },
];

const SHORTS = [
  { url: 'https://www.youtube.com/shorts/7RMfCkNiEAY', channel: 'Screen Rant' },
  { url: 'https://www.youtube.com/shorts/s6v9pBdcd94', channel: 'Screen Rant' },
  { url: 'https://www.youtube.com/shorts/Etdf0TVD8F8', channel: 'Screen Rant' },
  { url: 'https://www.youtube.com/shorts/uoJLO-y13Jg', channel: 'ScreenView' },
  { url: 'https://www.youtube.com/shorts/_B3ZJ3MisXI', channel: 'ScreenView' },
  { url: 'https://www.youtube.com/shorts/A_l2Vmoxa_E', channel: 'Chef Jeroyoshi' },
];


function ReelCard({ short }: { short: typeof SHORTS[number] }) {
  const id = short.url.match(/shorts\/([^?&/]+)/)?.[1];
  return (
    <a
      href={short.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-[1.04] transition-all duration-300 cursor-pointer"
    >
      <div className="aspect-[9/16] bg-slate-900 relative">
        {id && (
          <img
            src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`}
            alt=""
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            onError={e => { (e.currentTarget as HTMLImageElement).src = `https://img.youtube.com/vi/${id}/hqdefault.jpg`; }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
        <div className="absolute top-3 left-3">
          <span className="bg-pink-600 text-white text-xs font-black px-2.5 py-1 rounded-md uppercase tracking-widest">
            {short.channel === 'Screen Rant' ? 'Screen Rant' : 'ScreenView'}
          </span>
        </div>
        <div className="absolute top-3 right-3 w-9 h-9 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Play size={14} fill="white" className="text-white ml-0.5" />
        </div>
        <div className="absolute bottom-4 left-3 right-3">
          <p className="text-white text-xs font-black uppercase tracking-widest opacity-70">{short.channel}</p>
        </div>
      </div>
    </a>
  );
}

function InstagramPreview() {
  return (
    <Fade className="mb-16">
      <a
        href="https://www.instagram.com/billylabss/"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-5 rounded-2xl bg-gradient-to-r from-[#0a1f3d] via-[#123f83] to-[#315481] p-6 shadow-lg transition-all duration-500 hover:shadow-2xl hover:scale-[1.02]"
      >
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-600 via-orange-500 to-yellow-400 shadow-md transition-transform duration-300 group-hover:scale-110">
          <Instagram size={26} className="text-white" />
        </div>
        <div className="flex-1">
          <p className="text-lg font-black text-white">@billylabss</p>
          <p className="text-sm font-bold uppercase tracking-widest text-white/60">Follow Billy Labs on Instagram</p>
        </div>
        <ExternalLink size={20} className="text-white/40 transition-colors group-hover:text-white" />
      </a>
    </Fade>
  );
}

function Reels() {
  return (
    <section id="reels" className="py-28 bg-slate-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <Fade className="mb-16">
          <span className="text-pink-500 font-black text-xs uppercase tracking-[0.3em] block mb-4">Short Form</span>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2 className="font-black text-6xl sm:text-7xl lg:text-8xl text-white leading-none">
              REELS &<br />
              <span className="text-pink-500">SHORTS</span>
            </h2>
            <p className="text-slate-400 max-w-xs text-sm leading-relaxed pb-2">
              Short-form vertical content for Screen Rant and ScreenView — crafted for social platforms.
            </p>
          </div>
        </Fade>
        <InstagramPreview />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {SHORTS.map((s, i) => (
            <Fade key={i} delay={i * 60}>
              <ReelCard short={s} />
            </Fade>
          ))}
        </div>
        <Fade delay={300}>
          <div className="mt-8 text-center">
            <a
              href="https://www.instagram.com/billylabss/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-pink-500/40 hover:border-pink-400 text-pink-400 hover:text-pink-300 font-black text-xs rounded-xl uppercase tracking-widest transition-all duration-300"
            >
              <Instagram size={15} /> View All Reels on Instagram
            </a>
          </div>
        </Fade>
      </div>
    </section>
  );
}

/* Screen Rant — combined videos + articles */
const SR_ITEMS: ({ type: 'video'; url: string } | { type: 'article'; title: string; desc: string; url: string; img: string })[] = [
  { type: 'video', url: 'https://www.youtube.com/watch?v=3m2pdqE-hqw' },
  { type: 'video', url: 'https://www.youtube.com/watch?v=ia1Wmwgwo5k' },
  {
    type: 'article',
    title: "Why Netflix Canceled Zack Snyder's Army of the Dead Franchise",
    desc: "Breaking down why Netflix pulled the plug on the planned Army of the Dead zombie universe.",
    url: 'https://screenrant.com/video/zack-snyder-army-of-the-dead-franchise-canceled-explained/',
    img: '/screenrant/articles/Captura_de_pantalla_2026-07-03_a_la(s)_11.47.37_p.m..png',
  },
  {
    type: 'article',
    title: "Twilight's New Remake Plan Is How The Books Should Have Been Adapted From The Start",
    desc: "Why the animated remake could finally deliver the faithful adaptation Twilight fans always wanted.",
    url: 'https://screenrant.com/twilight-animated-remake-better-book-adaptation-live-action-movie/',
    img: '/Captura_de_pantalla_2026-07-03_a_la(s)_7.30.51_p.m..png',
  },
  {
    type: 'article',
    title: "The Boys: Hughie's Shapeshifter Story Was Wrong In Season 4",
    desc: "How Hughie's arc in Season 4 missed the mark and what the shapeshifter storyline should have been.",
    url: 'https://screenrant.com/the-boys-hughie-shapeshifter-story-wrong-season-4/',
    img: '/screenrant/articles/Captura_de_pantalla_2026-08-12_a_la(s)_10.33.08_p.m..png',
  },
  {
    type: 'article',
    title: "Why Alicent Won't Let Helaena Fly Dreamfyre In House Of The Dragon",
    desc: "The reason behind Alicent keeping Helaena grounded and what it means for the Greens' strategy.",
    url: 'https://screenrant.com/why-alicent-wont-let-helaena-fly-dreamfyre-house-of-the-dragon/',
    img: '/screenrant/articles/Captura_de_pantalla_2026-08-12_a_la(s)_10.33.22_p.m..png',
  },
];

function VideoCard({ url, isShort = false }: { url: string; isShort?: boolean }) {
  const id = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|shorts\/)([^&\n?#]+)/)?.[1];
  return (
    <Fade className="h-full">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block h-full relative overflow-hidden rounded-2xl shadow-md hover:shadow-2xl hover:scale-[1.04] transition-all duration-300"
      >
        <div className="aspect-video bg-slate-200 relative">
          <img
            src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`}
            alt=""
            className="w-full h-full object-cover"
            onError={e => { (e.currentTarget as HTMLImageElement).src = `https://img.youtube.com/vi/${id}/hqdefault.jpg`; }}
          />
          <div className={`absolute inset-0 flex items-center justify-center ${isShort ? 'bg-emerald-900/30 group-hover:bg-emerald-900/0' : 'bg-blue-900/40 group-hover:bg-blue-900/0'} transition-colors duration-300`}>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-xl ${isShort ? 'bg-emerald-500' : 'bg-blue-700'}`}>
              <Play size={18} fill="white" className="text-white ml-0.5" />
            </div>
          </div>
          <div className="absolute top-2 right-2">
            <span className={`px-2 py-1 text-xs font-black rounded-md ${isShort ? 'bg-emerald-800/90 text-emerald-200' : 'bg-blue-900/90 text-blue-200'}`}>
              {isShort ? 'SHORT' : 'VIDEO'}
            </span>
          </div>
        </div>
      </a>
    </Fade>
  );
}

function ArticleCard({ a }: { a: { title: string; desc: string; url: string; img: string } }) {
  return (
    <a
      href={a.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:scale-[1.03] transition-all duration-300"
    >
      <div className="aspect-video relative">
        <img src={a.img} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="bg-blue-700 text-white text-xs font-black px-2 py-1 rounded uppercase tracking-widest">Screen Rant</span>
          <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-black px-2 py-1 rounded uppercase tracking-widest">Article</span>
        </div>
        <div className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ExternalLink size={13} className="text-white" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p className="text-white font-black text-sm leading-tight">{a.title}</p>
        </div>
      </div>
      <div className="flex flex-1 flex-col bg-slate-50 p-3 border-t border-slate-100">
        <p className="text-slate-500 text-xs leading-relaxed line-clamp-2">{a.desc}</p>
        <div className="flex items-center gap-1 mt-2 text-blue-700 text-xs font-black">
          Read Article <ArrowRight size={11} />
        </div>
      </div>
    </a>
  );
}

const IMPACT = [
  { value: '10M+', label: 'Subscribers Reached', sub: 'Across Screen Rant, Collider & WatchMojo', accent: 'bg-blue-800' },
  { value: '1,000+', label: 'Videos Produced', sub: 'Long-form, Shorts, trailers & social content', accent: 'bg-blue-700' },
  { value: '4', label: 'Media Companies', sub: 'Valnet, Collider, WatchMojo, CHV', accent: 'bg-slate-700' },
  { value: '8+', label: 'Years of Experience', sub: 'Chile & Canada · Broadcast to Digital', accent: 'bg-blue-900' },
];

function ImpactStats() {
  return (
    <Fade className="mt-20">
      <div className="rounded-3xl bg-slate-950 overflow-hidden">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4">
          {IMPACT.map((item, i) => (
            <Fade key={i} delay={i * 100} from="none">
              <div className={`relative p-10 flex flex-col border-r border-b border-white/5 last:border-r-0 group hover:bg-white/5 transition-colors duration-300 ${i >= 2 ? 'border-b-0' : ''}`}>
                <div className={`w-10 h-1 ${item.accent} rounded-full mb-6 group-hover:w-16 transition-all duration-500`} />
                <p className="font-black text-6xl text-white leading-none mb-3">{item.value}</p>
                <p className="font-black text-sm text-blue-400 uppercase tracking-widest mb-2">{item.label}</p>
                <p className="text-slate-500 text-xs leading-relaxed">{item.sub}</p>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </Fade>
  );
}

function Work() {
  return (
    <section id="work" className="py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <Fade className="mb-20">
          <span className="text-blue-800 font-black text-xs uppercase tracking-[0.3em] block mb-4">Portfolio</span>
          <h2 className="font-black text-7xl sm:text-8xl text-slate-900 leading-none">
            FEATURED<br />
            <span className="text-blue-800">VIDEOS</span>
          </h2>
        </Fade>

        {/* Screen Rant — videos + articles combined */}
        <Fade className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <span className="px-4 py-2 text-sm font-black rounded-xl uppercase tracking-widest bg-blue-800 text-white">Screen Rant</span>
            <div className="flex-1 h-px bg-slate-100" />
          </div>
          <div className="grid items-stretch sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SR_ITEMS.map((item, i) => (
              item.type === 'video'
                ? <VideoCard key={i} url={item.url} />
                : <Fade key={i} delay={i * 80} className="h-full"><ArticleCard a={item} /></Fade>
            ))}
          </div>
        </Fade>

        {/* Other channel sections */}
        {CHANNELS.map((ch, ci) => (
          <Fade key={ch.key} delay={ci * 50} className="mb-20">
            <div className="flex items-center gap-4 mb-8">
              <span className={`px-4 py-2 text-sm font-black rounded-xl uppercase tracking-widest ${ch.badgeClass}`}>{ch.title}</span>
              <div className="flex-1 h-px bg-slate-100" />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {ch.videos.map((v, i) => <VideoCard key={i} url={v.url} />)}
            </div>
          </Fade>
        ))}

        {/* Impact Stats */}
        <ImpactStats />
      </div>
    </section>
  );
}

/* ─── MY CHANNEL ─── */
const MY_CHANNEL_VIDEOS = [
  { url: 'https://www.youtube.com/watch?v=4F1KRFXPWY8' },
  { url: 'https://www.youtube.com/watch?v=BO6oAwhuj0M' },
  { url: 'https://www.youtube.com/watch?v=5GEMsJiL3zE' },
  { url: 'https://www.youtube.com/watch?v=FJQzXOe608w' },
  { url: 'https://www.youtube.com/watch?v=3m2pdqE-hqw' },
  { url: 'https://www.youtube.com/watch?v=ia1Wmwgwo5k' },
];

function MyChannel() {
  return (
    <section id="mychannel" className="relative py-28 bg-[#0a1f3d] overflow-hidden">
      <div
        className="absolute inset-0 opacity-20"
        style={{ backgroundImage: 'linear-gradient(rgba(18,63,131,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(18,63,131,.15) 1px, transparent 1px)', backgroundSize: '50px 50px' }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#123f83]/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        <Fade className="mb-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600/20 border border-red-500/40 mb-6">
                <Youtube size={14} className="text-red-400" />
                <span className="text-xs font-black text-red-400 uppercase tracking-widest">My Personal Channel</span>
              </span>
              <h2 className="font-black text-6xl sm:text-7xl lg:text-8xl text-white leading-none">
                FILM &<br />
                <span className="bg-gradient-to-r from-[#123f83] via-[#315481] to-[#f5f1e8] bg-clip-text text-transparent">TV UNIVERSE</span>
              </h2>
            </div>
            <p className="text-slate-400 max-w-xs text-sm leading-relaxed pb-2">
              Every video you see here was created by me — from concept to final cut. 100% original content shaped by creative vision.
            </p>
          </div>
        </Fade>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {MY_CHANNEL_VIDEOS.map((v, i) => {
            const id = v.url.match(/(?:watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1];
            return (
              <Fade key={i} delay={i * 80}>
                <a
                  href={v.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.03] transition-all duration-300"
                >
                  <div className="aspect-video bg-slate-900 relative">
                    <img
                      src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={e => { (e.currentTarget as HTMLImageElement).src = `https://img.youtube.com/vi/${id}/hqdefault.jpg`; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1f3d]/90 via-transparent to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                        <Play size={22} fill="white" className="text-white ml-1" />
                      </div>
                    </div>
                    <div className="absolute top-3 left-3">
                      <span className="bg-red-600 text-white text-xs font-black px-2.5 py-1 rounded-md uppercase tracking-widest flex items-center gap-1">
                        <Youtube size={11} /> Original
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="text-white text-sm font-black uppercase tracking-widest opacity-80">Billy Labs Production</p>
                    </div>
                  </div>
                </a>
              </Fade>
            );
          })}
        </div>

        <Fade delay={300}>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://www.youtube.com/@screenvview/videos"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-black rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl uppercase tracking-wide text-sm"
            >
              <Youtube size={18} /> Visit My Channel
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="https://www.instagram.com/billylabss/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-4 border-2 border-white/20 hover:border-white/40 text-white/80 hover:text-white font-black rounded-xl transition-all duration-300 uppercase tracking-wide text-sm"
            >
              <Instagram size={17} /> Follow on Instagram
            </a>
          </div>
        </Fade>
      </div>
    </section>
  );
}

/* ─── CONTACT ─── */
function Contact() {
  return (
    <section id="contact" className="py-28 bg-[#123f83] overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(rgba(245,241,232,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(245,241,232,.04) 1px, transparent 1px)', backgroundSize: '60px 60px' }}
      />
      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <Fade>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#315481]/40 border border-[#315481]/50 mb-10">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs font-black text-[#f5f1e8]/80 uppercase tracking-widest">Ready to Collaborate</span>
          </div>
        </Fade>
        <Fade delay={100}>
          <h2 className="font-black text-7xl sm:text-8xl text-[#f5f1e8] leading-none mb-8">
            LET'S<br />
            <span className="text-[#315481]">WORK</span><br />
            TOGETHER
          </h2>
        </Fade>
        <Fade delay={200}>
          <p className="text-[#f5f1e8]/60 text-lg mb-12 max-w-sm mx-auto">
            Have an exciting project? Let Billy Labs bring your vision to life through compelling video content.
          </p>
        </Fade>
        <Fade delay={300}>
          <a
            href="mailto:contactobillylabs@gmail.com?subject=Video%20Production%20Inquiry&body=Hi%20Billy%20Labs%2C%20I'd%20love%20to%20discuss%20a%20video%20project."
            className="group inline-flex items-center gap-3 px-10 py-5 bg-[#f5f1e8] text-[#123f83] font-black text-sm rounded-2xl uppercase tracking-widest transition-all duration-300 hover:shadow-2xl hover:shadow-[#0a1f3d]/50 hover:scale-105"
          >
            <Mail size={20} />
            Get in Touch
          </a>
        </Fade>
        <Fade delay={400}>
          <div className="mt-10 flex items-center justify-center gap-4">
            <a href="https://www.youtube.com/@screenvview/videos" target="_blank" rel="noopener noreferrer" className="p-4 bg-[#f5f1e8]/5 hover:bg-[#315481] text-[#f5f1e8] rounded-2xl transition-all duration-300 hover:scale-110">
              <Youtube size={22} />
            </a>
            <a href="https://www.instagram.com/billylabss/" target="_blank" rel="noopener noreferrer" className="p-4 bg-[#f5f1e8]/5 hover:bg-[#315481] text-[#f5f1e8] rounded-2xl transition-all duration-300 hover:scale-110">
              <Instagram size={22} />
            </a>
          </div>
        </Fade>
        <Fade delay={500}>
          <p className="mt-8 text-[#315481] text-sm font-medium">contactobillylabs@gmail.com</p>
        </Fade>
      </div>
    </section>
  );
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer className="bg-[#0a1f3d] py-8 border-t border-[#123f83]/30">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-black text-xl text-[#f5f1e8]">Billy<span className="text-[#315481]"> Labs</span></span>
        <p className="text-[#315481] text-sm">Video Producer & Editor · Entertainment Specialist</p>
        <p className="text-[#315481]/60 text-xs">&copy; {new Date().getFullYear()} All rights reserved.</p>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="bg-white text-slate-900">
      <Navbar />
      <Hero />
      <MarqueeStrip />
      <About />
      <WorkExperience />
      <Companies />
      <Process />
      <Work />
      <MyChannel />
      <Reels />
      <Contact />
      <Footer />
    </div>
  );
}
