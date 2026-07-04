'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const barbers = [
  {
    name: 'David Marcomin',
    price: 49.32,
    image: '/images/barber-david-v2.jpg',
  },
  {
    name: 'Richard Anderson',
    price: 28.48,
    image: '/images/barber-richard-v2.jpg',
  },
];

const celebrityHighlights = [
  { id: 1, image: '/images/celeb-1.jpg' },
  { id: 2, image: '/images/celeb-2.jpg' },
  { id: 3, image: '/images/celeb-3.jpg' },
  { id: 4, image: '/images/celeb-4.jpg' },
  { id: 5, image: '/images/celeb-5.jpg' },
];

const signatureStyles = [
  {
    id: 1,
    title: 'Classic Fade & Beard Sculpt',
    category: 'Cuts',
    image: '/images/highlight-cut.png',
    description: 'Sharp drop fade paired with a clean, hot-towel beard sculpt and lining.',
    duration: '45 min',
  },
  {
    id: 2,
    title: 'Premium Balayage & Styling',
    category: 'Colors',
    image: '/images/highlight-color.png',
    description: 'Seamless hand-painted warm highlights finished with modern blowout waves.',
    duration: '120 min',
  },
  {
    id: 3,
    title: 'Luxury Hot Towel Shave',
    category: 'Shaves',
    image: '/images/highlight-shave.png',
    description: 'Relaxing straight-razor shave with nourishing oils, steam, and cold compress.',
    duration: '30 min',
  },
];

export default function HomePage() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Intersection Observer for scroll tracking
  useEffect(() => {
    const sections = ['home', 'about', 'highlights', 'contact'];
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px', // Trigger when section occupies center area
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  // Intersection Observer for scroll-driven animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px 0px -100px 0px",
      threshold: 0.05,
    };

    const observerCallback = (entries: IntersectionObserverEntry[], obs: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const animatedElements = document.querySelectorAll(".scroll-animate");
    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Form submit handler
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormState({ name: '', email: '', message: '' });
    }, 3000);
  };



  return (
    <div className="mobile-container bg-white md:bg-transparent min-h-dvh md:min-h-0 overflow-y-auto pb-24 md:pb-16 md:px-6 max-w-[1180px] mx-auto w-full space-y-16 md:space-y-16">

      {/* ── SECTION 1: HOME ── */}
      <section id="home" className="space-y-6 md:space-y-8 scroll-mt-20">
        {/* ── Mobile Header (Hidden on Desktop) ── */}
        <div className="px-5 pt-4 flex items-center justify-between animate-slide-down md:hidden">
          <div>
            <p className="text-xs text-text-secondary">Good Morning 👋</p>
            <h1 className="text-lg font-bold text-text-primary">
              MR.KENT BARBERS
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button className="tap-effect relative w-10 h-10 flex items-center justify-center rounded-full bg-surface">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full" />
            </button>

            <img 
              src="/logo.jpg" 
              alt="MR.KENT BARBERS Logo" 
              className="w-10 h-10 rounded-full object-cover shadow-[0_2px_8px_rgba(0,0,0,0.15)]"
            />
          </div>
        </div>

        {/* ── Search Bar ── */}
        <div className="px-5 md:hidden mt-4 animate-slide-up animate-delay-100 w-full">
          <div className="flex items-center gap-3 bg-surface md:bg-white md:shadow-sm rounded-full px-4 py-3 border border-border-light/10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-text-muted shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search Salon, Specialist..."
              className="bg-transparent outline-none w-full text-sm text-text-primary placeholder:text-text-muted"
            />
          </div>
        </div>

        {/* ── Promo Banner ── */}
        <div className="px-5 md:px-0 md:pt-5 animate-scale-in animate-delay-200">
          <div className="relative w-full h-[200px] md:h-[500px] rounded-2xl md:rounded-[28px] overflow-hidden md:shadow-[0_24px_64px_rgba(26,26,46,0.18)] md:border md:border-white/70">
            <Image
              src="/images/promo-banner.png"
              alt="Promo banner"
              fill
              className="object-cover md:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/10" />
            <div className="hidden md:block absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/55 to-transparent" />

            <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12 lg:px-14 gap-3 md:gap-5">
              <span className="hidden md:inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white/90 backdrop-blur-md">
                Premium Grooming Studio
              </span>
              <h2 className="text-white text-xl md:text-5xl font-extrabold leading-tight max-w-[200px] md:max-w-xl uppercase tracking-wide">
                MRKENT BARBERS
              </h2>
              <p className="hidden md:block text-white/80 text-sm leading-6 max-w-lg text-justify">
                Book your session with certified stylists and settle into a sharper, calmer grooming experience built around detail.
              </p>
              <div className="flex items-center gap-3 flex-wrap">
                <Link href="/book" className="tap-effect inline-block bg-accent text-white text-xs md:text-sm font-bold px-5 md:px-6 py-2.5 md:py-3 rounded-full hover:bg-accent-light transition-colors shadow-[0_16px_36px_rgba(232,100,44,0.35)]">
                  Book Now
                </Link>
                <Link href="/book/emergency" className="tap-effect inline-block bg-red-600 text-white text-xs md:text-sm font-bold px-5 md:px-6 py-2.5 md:py-3 rounded-full hover:bg-red-700 transition-colors shadow-[0_16px_36px_rgba(220,38,38,0.35)]">
                  Emergency Booking
                </Link>
              </div>
            </div>

            <div className="hidden md:grid absolute right-12 bottom-7 grid-cols-3 gap-3 max-w-[520px]">
              {[
                ['4.9', 'Average rating'],
                ['12+', 'Expert stylists'],
                ['2016', 'Established'],
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-md">
                  <p className="text-xl font-extrabold text-white">{value}</p>
                  <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/65">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Salon Interior Gallery ── */}
        <div className="scroll-animate">
          <div className="px-5 md:px-0 flex items-center justify-between mb-4">
            <div>
              <p className="hidden md:block text-[11px] font-bold uppercase tracking-[0.16em] text-accent">Inside MR.KENT BARBERS</p>
              <h3 className="text-base font-bold text-text-primary md:text-2xl md:mt-1">
                Our Salon Gallery
              </h3>
            </div>
          </div>
          <div className="mt-2 px-5 md:px-0 flex md:grid md:grid-cols-2 gap-6 md:gap-6 overflow-x-auto md:overflow-visible hide-scrollbar pb-4 md:pb-0">
            {barbers.map((barber, idx) => (
              <div
                key={idx}
                className="group shrink-0 w-[260px] md:w-full rounded-2xl md:rounded-3xl shadow-md md:shadow-[0_14px_36px_rgba(26,26,46,0.06)] bg-white overflow-hidden border border-border-light/40 transition-all"
              >
                <div className="relative w-full h-[200px] md:h-[360px]">
                  <Image
                    src={barber.image}
                    alt="Salon Interior"
                    fill
                    className="object-cover md:transition-transform md:duration-700 md:group-hover:scale-105"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 2: ABOUT ── */}
      <section id="about" className="px-5 md:px-0 scroll-mt-20 scroll-animate">
        <div className="bg-white rounded-3xl p-6 md:p-10 border border-border-light/40 shadow-md md:shadow-[0_18px_48px_rgba(26,26,46,0.07)]">
          <div className="grid grid-cols-1 md:grid-cols-[0.95fr_1.05fr] gap-8 md:gap-10 items-center">
            {/* Left Column Text */}
            <div className="space-y-4 md:space-y-3 scroll-animate delay-150">
              <span className="text-accent font-bold tracking-widest text-xs uppercase">Our Story</span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-text-primary leading-tight">
                Crafting Styles, Building Confidence
              </h2>
              <p className="text-xs md:text-sm text-text-secondary leading-relaxed md:max-w-md text-justify">
                At MR.KENT BARBERS, we believe that grooming is more than just a haircut—it&apos;s an experience. Established in 2015, we have been dedicated to providing top-tier cuts, styling, and premium shaving services in a warm, sophisticated environment.
              </p>

              {/* Values checklists */}
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-xs font-semibold text-text-primary">Elite Certified Barbers</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-xs font-semibold text-text-primary">High-End Organic Grooming Products</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-xs font-semibold text-text-primary">Relaxing Ambiance & Drinks</span>
                </div>
              </div>
            </div>

            {/* Right Column Showcase */}
            <div className="relative w-full aspect-square md:aspect-[1.22/1] md:mx-auto rounded-2xl md:rounded-3xl overflow-hidden shadow-md scroll-animate delay-300">
              <Image
                src="/images/welcome-hero.png"
                alt="Salon Ambiance"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 text-white">
                <p className="text-[10px] font-bold tracking-wider uppercase opacity-75">Established</p>
                <p className="text-lg md:text-2xl font-extrabold">Since 2016</p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: SIGNATURE STYLES ── */}
      <section id="signature-styles" className="scroll-mt-20 space-y-5">
        <div className="px-5 md:px-0 space-y-1.5 scroll-animate">
          <p className="hidden md:block text-[11px] font-bold uppercase tracking-[0.16em] text-accent">Our Creations</p>
          <h1 className="text-2xl font-bold text-text-primary md:text-3xl">Signature Styles</h1>
          <p className="text-xs text-text-secondary md:text-sm max-w-2xl leading-relaxed text-justify">
            Explore our curated selection of signature haircuts and grooming designs crafted by our master stylists.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="px-5 md:px-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-5">
          {signatureStyles.map((item, index) => (
            <div
              key={item.id}
              className={`group rounded-2xl md:rounded-[24px] shadow-md md:shadow-[0_16px_42px_rgba(26,26,46,0.08)] bg-white border border-border-light/50 overflow-hidden w-full transition-all scroll-animate delay-${(index + 1) * 150}`}
            >
              <div className="relative w-full h-[220px] md:h-[260px]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover md:transition-transform md:duration-700 md:group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 rounded-full bg-accent text-white text-[10px] font-bold tracking-wider uppercase px-3 py-1">
                  {item.category}
                </span>
              </div>

              <div className="p-4 md:p-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-bold text-text-primary truncate">
                    {item.title}
                  </h2>
                  <span className="text-[11px] font-semibold text-text-muted shrink-0 bg-surface px-2.5 py-1 rounded-md">
                    {item.duration}
                  </span>
                </div>

                <p className="text-xs text-text-secondary mt-2 leading-relaxed h-[36px] overflow-hidden text-justify">
                  {item.description}
                </p>

                <div className="mt-4 pt-4 border-t border-border-light">
                  <Link
                    href="/book"
                    className="tap-effect block text-center bg-accent/5 hover:bg-accent text-accent hover:text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all w-full"
                  >
                    Book Style
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 4: CELEBRITY HIGHLIGHTS ── */}
      <section id="highlights" className="scroll-mt-20 space-y-5">
        <div className="px-5 md:px-0 space-y-1.5 scroll-animate">
          <p className="hidden md:block text-[11px] font-bold uppercase tracking-[0.16em] text-accent">Spotted at MR.KENT BARBERS</p>
          <h1 className="text-2xl font-bold text-text-primary md:text-3xl">Celebrity Highlights</h1>
          <p className="text-xs text-text-secondary md:text-sm max-w-2xl leading-relaxed text-justify">
            We are honored to style some of the most prominent personalities. See our celebrity guests alongside our founder.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="px-5 md:px-0 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-3.5">
          {celebrityHighlights.map((item, index) => (
            <div
              key={item.id}
              className={`group rounded-xl md:rounded-[18px] shadow-sm md:shadow-[0_10px_28px_rgba(26,26,46,0.06)] bg-white border border-border-light/40 overflow-hidden w-full transition-all scroll-animate delay-${(index + 1) * 150}`}
            >
              <div className="relative w-full h-[180px] md:h-[220px]">
                <Image
                  src={item.image}
                  alt="Celebrity Guest"
                  fill
                  className="object-cover md:transition-transform md:duration-700 md:group-hover:scale-105"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 5: GROOM WORKS ── */}
      <section id="groom-works" className="scroll-mt-20 space-y-5">
        <div className="px-5 md:px-0 space-y-1.5 scroll-animate">
          <p className="hidden md:block text-[11px] font-bold uppercase tracking-[0.16em] text-accent">Portfolio</p>
          <h1 className="text-2xl font-bold text-text-primary md:text-3xl">Groom Makeover Works</h1>
          <p className="text-xs text-text-secondary md:text-sm max-w-2xl leading-relaxed text-justify">
            Explore our curated gallery of wedding transformations. Click the feed to follow our makeover page on Instagram.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-8 md:gap-10 px-5 md:px-0 items-center">
          {/* Left Column: Interactive Instagram Feed Mockup Card */}
          <a
            href="https://www.instagram.com/the.men.makeover?igsh=Zml5MTRmemliNGk4"
            target="_blank"
            rel="noopener noreferrer"
            className="group block relative w-full aspect-[4/5] md:aspect-[1.3/1] rounded-3xl overflow-hidden shadow-lg md:shadow-[0_16px_48px_rgba(26,26,46,0.08)] bg-white border border-border-light/40 transition-all scroll-animate delay-150"
          >
            <Image
              src="/images/groom-works.jpg"
              alt="Groom Makeovers Instagram Feed"
              fill
              unoptimized
              className="object-cover contrast-[1.03] saturate-[1.03] md:transition-transform md:duration-750 md:group-hover:scale-105"
            />
            {/* Dark glassmorphic hover overlay */}
            <div className="absolute inset-0 bg-black/40 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-6 backdrop-blur-[2px]">
              <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mb-3 shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
                {/* SVG Instagram logo */}
                <svg
                  className="w-7 h-7 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </div>
              <p className="text-base font-extrabold tracking-tight">@the.men.makeover</p>
              <p className="text-[11px] font-semibold text-white/80 uppercase tracking-wider mt-1">View Instagram Feed</p>
            </div>
          </a>

          {/* Right Column: Styled Description & Bullet Points */}
          <div className="space-y-6 scroll-animate delay-300">
            <div className="space-y-3">
              <span className="text-accent font-bold tracking-widest text-[10px] uppercase">Groom Styling Specialist</span>
              <h2 className="text-xl md:text-2xl font-black text-text-primary leading-tight">
                Traditional & Modern Groom Transformations
              </h2>
              <p className="text-xs md:text-sm text-text-secondary leading-relaxed text-justify">
                Our specialized makeover division guarantees you look your absolute best for your special day. From skin prepping to precision beard line-ups and custom wedding hair settings, we customize every detail.
              </p>
            </div>

            {/* Core offerings */}
            <div className="space-y-3">
              {[
                "Custom Wedding Hair Setting & Styling",
                "Advanced Skin Prep & Glow Therapy",
                "Precision Beard Detailing & Grooming",
                "Dedicated On-Site Groom Makeover Assistant"
              ].map((text) => (
                <div key={text} className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center text-accent shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-xs font-semibold text-text-primary">{text}</span>
                </div>
              ))}
            </div>

            <a
              href="https://www.instagram.com/the.men.makeover?igsh=Zml5MTRmemliNGk4"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-[#E1306C] hover:bg-[#d8225e] text-white text-xs font-extrabold px-6 py-3 rounded-xl transition-all shadow-[0_10px_20px_rgba(225,48,108,0.2)] hover:shadow-[0_12px_24px_rgba(225,48,108,0.35)]"
            >
              <svg
                className="w-4 h-4 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              Follow Our Groom Works
            </a>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: CONTACT ── */}
      <section id="contact" className="scroll-mt-20 space-y-5">
        <div className="px-5 md:px-0 scroll-animate">
          <h1 className="text-2xl font-bold text-text-primary md:text-3xl">Contact Us</h1>
          <p className="text-xs text-text-secondary mt-1 md:text-sm text-justify">
            Have questions or want to speak with us? Drop a message!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6 px-5 md:px-0 items-start">
          {/* Contact Details */}
          <div className="space-y-6 scroll-animate delay-100">
            <div className="bg-white rounded-2xl p-5 border border-border-light shadow-sm md:shadow-md space-y-4">
              <h2 className="text-sm font-bold text-text-primary">Contact Details</h2>
              <div className="space-y-4">
                {/* Call Us */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] text-text-muted font-bold uppercase tracking-wider">Call Us</p>
                    <p className="text-xs font-semibold text-text-primary mt-0.5">+91 7356765254</p>
                  </div>
                </div>

                {/* Email Us */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] text-text-muted font-bold uppercase tracking-wider">Email Us</p>
                    <p className="text-xs font-semibold text-text-primary mt-0.5">mrkentbarbers@gmail.com</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] text-text-muted font-bold uppercase tracking-wider">Address</p>
                    <p className="text-xs font-semibold text-text-primary mt-0.5 leading-relaxed">
                      Bus Stand Road, near Pvt Bus Stand, Adimali, Kerala 685561
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="bg-white rounded-2xl p-5 border border-border-light shadow-sm md:shadow-md">
              <h2 className="text-sm font-bold text-text-primary mb-3">Opening Hours</h2>
              <div className="space-y-2 text-xs font-medium text-text-secondary">
                <div className="flex justify-between">
                  <span>Monday – Saturday</span>
                  <span className="text-text-primary">9:00 AM – 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="text-text-primary">10:00 AM – 6:00 PM</span>
                </div>
              </div>
            </div>

            {/* Real Google Maps Embed Widget */}
            <div className="bg-white rounded-2xl border border-border-light relative overflow-hidden h-48 shadow-sm md:shadow-md">
              <iframe
                src="https://maps.google.com/maps?q=Mr.%20Kent%20Unisex%20Salon%20Adimali&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 grayscale opacity-90 brightness-95"
                allowFullScreen
                loading="lazy"
              />

              {/* Custom overlay "Open in Maps" button */}
              <Link
                href="https://maps.app.goo.gl/boy9BLSadSPXffnX7?g_st=ac"
                target="_blank"
                className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-white/95 border border-slate-200/80 px-3 py-2 rounded-lg shadow-sm hover:shadow-md transition-shadow text-[11px] font-bold text-slate-800"
              >
                Open in Maps
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-6 border border-border-light shadow-sm md:shadow-lg h-full scroll-animate delay-200">
            <h2 className="text-sm md:text-base font-bold text-text-primary mb-4">Send a Message</h2>
            {submitted ? (
              <div className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-4 py-6 rounded-xl border border-emerald-100 text-center animate-fade-in flex flex-col items-center justify-center h-48">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-emerald-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Thank you! Your message was sent successfully.
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider block mb-1">Name</label>
                  <input
                    type="text"
                    placeholder="Your Name"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full text-xs rounded-xl bg-surface px-4 py-3.5 text-text-primary outline-none border border-border-light/10 focus:ring-2 focus:ring-accent/40"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider block mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="Your Email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full text-xs rounded-xl bg-surface px-4 py-3.5 text-text-primary outline-none border border-border-light/10 focus:ring-2 focus:ring-accent/40"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider block mb-1">Message</label>
                  <textarea
                    placeholder="How can we help you?"
                    required
                    rows={5}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full text-xs rounded-xl bg-surface px-4 py-3.5 text-text-primary outline-none border border-border-light/10 focus:ring-2 focus:ring-accent/40 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="tap-effect w-full bg-accent hover:bg-accent-light text-white text-xs font-semibold py-4 rounded-xl shadow-sm transition-all"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── Bottom Navigation (Hidden on Desktop) ── */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border-light safe-bottom z-50 md:hidden">
        <div className="flex items-center justify-around py-2">
          {/* Home */}
          <Link
            href="/#home"
            className="tap-effect flex flex-col items-center gap-0.5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-6 h-6 transition-colors ${activeSection === 'home' ? 'text-accent' : 'text-text-muted'}`}
              fill={activeSection === 'home' ? 'currentColor' : 'none'}
              viewBox="0 0 24 24"
              stroke={activeSection === 'home' ? 'none' : 'currentColor'}
              strokeWidth={activeSection === 'home' ? '0' : '1.8'}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12.5l9-9 9 9V21a1 1 0 01-1 1h-5v-6h-4v6H6a1 1 0 01-1-1v-8.5z" />
            </svg>
            <span className={`text-[10px] font-medium transition-colors ${activeSection === 'home' ? 'text-accent' : 'text-text-muted'}`}>Home</span>
            {activeSection === 'home' && <span className="w-1.5 h-1.5 rounded-full bg-accent animate-scale-in" />}
          </Link>

          {/* About */}
          <Link
            href="/#about"
            className="tap-effect flex flex-col items-center gap-0.5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-6 h-6 transition-colors ${activeSection === 'about' ? 'text-accent' : 'text-text-muted'}`}
              fill={activeSection === 'about' ? 'currentColor' : 'none'}
              viewBox="0 0 24 24"
              stroke={activeSection === 'about' ? 'none' : 'currentColor'}
              strokeWidth={activeSection === 'about' ? '0' : '1.8'}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className={`text-[10px] font-medium transition-colors ${activeSection === 'about' ? 'text-accent' : 'text-text-muted'}`}>About</span>
            {activeSection === 'about' && <span className="w-1.5 h-1.5 rounded-full bg-accent animate-scale-in" />}
          </Link>

          {/* Book (STANDOUT Separate Page Link) */}
          <Link
            href="/book"
            className="tap-effect flex flex-col items-center justify-center -mt-5 bg-gradient-to-r from-accent to-accent-light text-white w-14 h-14 rounded-full shadow-lg border-4 border-white z-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <rect x="3" y="4" width="18" height="18" rx="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-[9px] font-bold uppercase tracking-wider -mt-0.5">Book</span>
          </Link>

          {/* Highlights */}
          <Link
            href="/#highlights"
            className="tap-effect flex flex-col items-center gap-0.5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-6 h-6 transition-colors ${activeSection === 'highlights' ? 'text-accent' : 'text-text-muted'}`}
              fill={activeSection === 'highlights' ? 'currentColor' : 'none'}
              viewBox="0 0 24 24"
              stroke={activeSection === 'highlights' ? 'none' : 'currentColor'}
              strokeWidth={activeSection === 'highlights' ? '0' : '1.8'}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.54 4.92.42-3.73 3.23L16.23 18z" />
            </svg>
            <span className={`text-[10px] font-medium transition-colors ${activeSection === 'highlights' ? 'text-accent' : 'text-text-muted'}`}>Gallery</span>
            {activeSection === 'highlights' && <span className="w-1.5 h-1.5 rounded-full bg-accent animate-scale-in" />}
          </Link>

          {/* Contact */}
          <Link
            href="/#contact"
            className="tap-effect flex flex-col items-center gap-0.5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-6 h-6 transition-colors ${activeSection === 'contact' ? 'text-accent' : 'text-text-muted'}`}
              fill={activeSection === 'contact' ? 'currentColor' : 'none'}
              viewBox="0 0 24 24"
              stroke={activeSection === 'contact' ? 'none' : 'currentColor'}
              strokeWidth={activeSection === 'contact' ? '0' : '1.8'}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.62 10.79a15.15 15.15 0 006.59 6.59l2.2-2.2a1 1 0 01.9-.27 11.36 11.36 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.57 3.58 1 1 0 01-.27.9l-2.18 2.3z" />
            </svg>
            <span className={`text-[10px] font-medium transition-colors ${activeSection === 'contact' ? 'text-accent' : 'text-text-muted'}`}>Contact</span>
            {activeSection === 'contact' && <span className="w-1.5 h-1.5 rounded-full bg-accent animate-scale-in" />}
          </Link>
        </div>
      </nav>
    </div>
  );
}
