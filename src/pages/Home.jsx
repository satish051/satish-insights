import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, ExternalLink, Sparkles, X } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { articles } from '../data/articles';
import { works } from '../data/works';
import { photos } from '../data/photography';
import Newsletter from '../components/Newsletter';
import MagneticButton from '../components/MagneticButton';
import RevealText from '../components/RevealText';
import TiltCard from '../components/TiltCard';
import RuneHeading from '../components/RuneHeading';

const TICKER_ITEMS = [
  '✦ Technology', '✦ Money', '✦ Life & Growth', '✦ Software', '✦ Wealth', '✦ Mindset',
  '✦ AI', '✦ Investing', '✦ Photography', '✦ Productivity', '✦ Deep Work', '✦ Clarity', '✦ Simplicity'
];

export default function Home() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const worksRef = useRef(null);

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 400], [0, -80]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  // Works horizontal scroll
  const { scrollYProgress: worksScrollProgress } = useScroll({
    target: worksRef,
    offset: ["start start", "end end"]
  });
  
  // Maps scroll progress 0-1 to horizontal transform. 
  // The element width is (works.length * 100vw). Percentage is relative to that.
  // To slide by (N-1) viewports: -(N-1)/N * 100%
  const xPercent = -((works.length - 1) / works.length) * 100;
  const worksX = useTransform(worksScrollProgress, [0, 1], ["0%", `${xPercent}%`]);

  // Photo parallax transforms
  const photoMultipliers = [-0.05, 0, 0.05, -0.03, 0.03, -0.02];
  const photoTransforms = photos.map((_, i) => useTransform(scrollY, [0, 5000], [0, 5000 * photoMultipliers[i]]));

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      }
    }
  }, [location]);

  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      {/* Hero Section */}
      <motion.section
        id="home"
        className="hero container"
        style={{ y: heroY, opacity: heroOpacity, position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: '40px', paddingBottom: '20px', minHeight: 'calc(100vh - 120px)' }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="hero-badge"
          style={{ marginBottom: '12px' }}
        >
          <Sparkles size={14} /> Now Writing · Volume 1
        </motion.div>

        <motion.h1
          variants={{
            hidden: { opacity: 1 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } }
          }}
          initial="hidden"
          animate="visible"
          style={{ position: 'relative', zIndex: 10, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', columnGap: '0.25em', rowGap: '0.1em', fontSize: 'clamp(2.5rem, 5vw, 3.5rem)' }}
        >
          {['Simple', 'ideas', 'about'].map((word, i) => (
            <motion.span key={i} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
              {word}
            </motion.span>
          ))}
          
          <span style={{ display: 'inline-flex', alignItems: 'baseline' }}>
            <motion.span
              variants={{ hidden: { opacity: 0, scale: 0.8, filter: 'blur(10px)' }, visible: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.6 } } }}
              drag
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={0.5}
              whileHover={{ scale: 1.1 }}
              whileDrag={{ scale: 1.3 }}
              className="text-gradient-animated cursor-grab"
              style={{ animationDelay: '0s' }}
            >
              technology
            </motion.span>
            <motion.span variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>,</motion.span>
          </span>
          
          <span style={{ display: 'inline-flex', alignItems: 'baseline' }}>
            <motion.span
              variants={{ hidden: { opacity: 0, scale: 0.8, filter: 'blur(10px)' }, visible: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.6 } } }}
              drag
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={0.5}
              whileHover={{ scale: 1.1 }}
              whileDrag={{ scale: 1.3 }}
              className="text-gradient-animated cursor-grab"
              style={{ animationDelay: '2s', '--gradient-start': '#10b981' }}
            >
              finance
            </motion.span>
            <motion.span variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>,</motion.span>
          </span>
          
          <motion.span variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>and</motion.span>
          
          <span style={{ display: 'inline-flex', alignItems: 'baseline' }}>
            <motion.span
              variants={{ hidden: { opacity: 0, scale: 0.8, filter: 'blur(10px)' }, visible: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.6 } } }}
              drag
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={0.5}
              whileHover={{ scale: 1.1 }}
              whileDrag={{ scale: 1.3 }}
              className="text-gradient-animated cursor-grab"
              style={{ animationDelay: '4s', '--gradient-start': '#f43f5e' }}
            >
              purpose
            </motion.span>
            <motion.span variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>.</motion.span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{ margin: '16px auto 24px auto', maxWidth: '600px', lineHeight: '1.5' }}
        >
          Exploring the intersections of modern code, financial strategy, and intentional design. Cutting through the noise to bring you actionable, engineered wisdom.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '24px' }}
        >
          <MagneticButton className="btn-primary hover-target" onClick={() => window.location.href = '#insights'}>
            Explore Articles <ArrowRight size={18} />
          </MagneticButton>
          <MagneticButton href="#works" className="btn-secondary hover-target">
            View My Work
          </MagneticButton>
        </motion.div>

      </motion.section>

      {/* Marquee Ticker */}
      <div className="ticker-wrapper">
        <div className="ticker-track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="ticker-item">{item}</span>
          ))}
        </div>
      </div>

      {/* Featured Video */}
      <section id="video" className="video-section container">
        <div className="video-split-layout">
          <motion.div
            className="video-text-content"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-gradient">Visualized Wisdom</h2>
            <h3>The Concept of Leverage</h3>
            <p>Sometimes ideas are better understood through motion. Watch this short concept video breaking down how high-leverage individuals build outsized value with minimal effort.</p>
            <Link to="/transcript" className="btn-primary" style={{ marginTop: '16px', display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
              Read Full Transcript <ArrowRight size={18} />
            </Link>
          </motion.div>
          <motion.div
            className="video-player-wrapper"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="video-container glass-panel">
              <video src="/videos/concept-video.mp4" autoPlay loop muted playsInline></video>
            </div>
            <div className="video-glow"></div>
          </motion.div>
        </div>
      </section>

      {/* Featured Works - Horizontal Scroll */}
      <section id="works" ref={worksRef} style={{ height: isMobile ? 'auto' : `${works.length * 100}vh`, position: 'relative' }}>
        <div style={{ position: isMobile ? 'relative' : 'sticky', top: 0, height: isMobile ? 'auto' : '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden' }}>
          
          <div className="container" style={{ paddingTop: '24px', paddingBottom: '16px' }}>
            <div className="section-header" style={{ marginBottom: '16px' }}>
              <RevealText as="span" className="section-eyebrow">Built & Shipped</RevealText>
              <RuneHeading className="section-title" delay={200}>My Works</RuneHeading>
            </div>
          </div>

          <motion.div
            style={{
              x: isMobile ? 0 : worksX,
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              width: isMobile ? '100%' : `${works.length * 100}vw`,
              padding: isMobile ? '0 1.5rem' : '0'
            }}
          >
            {works.map((work, index) => (
              <div key={work.id} style={{ width: isMobile ? '100%' : '100vw', padding: isMobile ? '0 0 40px 0' : '0 10vw', flexShrink: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--text-muted)', opacity: 0.15, marginBottom: '0.5rem', fontFamily: 'var(--font-serif)' }}>
                  0{index + 1}
                </div>
                <TiltCard>
                  <a href={work.url} target="_blank" rel="noreferrer" className="work-card glass-panel hover-target" style={{ display: 'block', margin: 0 }}>
                    <div className="work-img-wrapper">
                      <img
                        src={work.image}
                        alt={work.title}
                        className="work-img"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `https://via.placeholder.com/800x450/0ea5e9/ffffff?text=${encodeURIComponent(work.title)}`;
                        }}
                      />
                      <div className="work-overlay">
                        <span className="work-visit-btn">
                          <ExternalLink size={20} /> Visit Site
                        </span>
                      </div>
                    </div>
                    <div className="work-info">
                      <h3>{work.title}</h3>
                      <p>{work.description}</p>
                      <span className="work-url">{work.url.replace('https://', '')}</span>
                    </div>
                  </a>
                </TiltCard>
              </div>
            ))}
          </motion.div>

          {!isMobile && (
            <div style={{ position: 'absolute', bottom: '40px', left: '10vw', right: '10vw', height: '4px', background: 'var(--panel-border)', borderRadius: '2px', overflow: 'hidden' }}>
              <motion.div style={{ height: '100%', background: 'var(--accent-gradient)', scaleX: worksScrollProgress, transformOrigin: 'left' }} />
            </div>
          )}
        </div>
      </section>

      {/* Featured Insights */}
      <section id="insights" className="featured container" style={{ paddingTop: '80px' }}>
        <div className="section-header">
          <RevealText as="span" className="section-eyebrow">Fresh Off the Press</RevealText>
          <RuneHeading className="section-title">Latest Insights</RuneHeading>
        </div>
        <div className="featured-grid">
          {articles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <TiltCard>
                <article className="article-card glass-panel" style={{ overflow: 'hidden', height: '100%', margin: 0 }}>
                  <img src={article.image} alt={article.title} className="article-image" />
                  <div className="article-meta">
                    <span style={{ color: article.color }}>{article.category}</span>
                    <span>{article.date}</span>
                  </div>
                  <h3>{article.title}</h3>
                  <p>{article.excerpt}</p>
                  <Link to={'/article/' + article.slug} className="read-more">Read Insight <ArrowRight size={16} /></Link>
                </article>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Photography Section */}
      <section id="photography" className="featured container" style={{ paddingTop: '80px' }}>
        <div className="section-header">
          <RevealText as="span" className="section-eyebrow">Through The Lens</RevealText>
          <RuneHeading className="section-title">Photography</RuneHeading>
          <p style={{ marginTop: '16px', color: 'var(--text-muted)' }}>Capturing moments, geometry, and light. A visual diary of my passion.</p>
        </div>
        
        <div className="photography-grid">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              className="photo-item"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedPhoto(photo)}
              style={{ cursor: 'pointer' }}
            >
              <motion.img layoutId={`photo-${photo.id}`} src={photo.url} alt={photo.title} />
              <div className="photo-overlay">
                <motion.h3 layoutId={`title-${photo.id}`}>{photo.title}</motion.h3>
                <p>{photo.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Newsletter />
      
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lightbox-overlay"
            onClick={() => setSelectedPhoto(null)}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              zIndex: 99999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px'
            }}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                color: '#fff',
                borderRadius: '50%',
                width: '48px',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={24} />
            </button>
            <div
              style={{
                position: 'relative',
                maxWidth: '1200px',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                overflowY: 'auto'
              }}
            >
              <motion.img
                layoutId={`photo-${selectedPhoto.id}`}
                src={selectedPhoto.url}
                alt={selectedPhoto.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  maxHeight: '75vh',
                  borderRadius: '8px'
                }}
              />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                style={{
                  marginTop: '24px',
                  paddingBottom: '24px',
                  textAlign: 'center',
                  color: '#fff'
                }}
              >
                <motion.h3 layoutId={`title-${selectedPhoto.id}`} style={{ fontSize: '2rem', marginBottom: '8px' }}>
                  {selectedPhoto.title}
                </motion.h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1.1rem' }}>
                  {selectedPhoto.description}
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.main>
  );
}
