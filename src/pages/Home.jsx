import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, ExternalLink, Sparkles, TrendingUp, BookOpen } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { articles } from '../data/articles';
import { works } from '../data/works';
import Newsletter from '../components/Newsletter';

const TICKER_ITEMS = [
  '✦ Technology', '✦ Money', '✦ Life & Growth', '✦ Software', '✦ Wealth', '✦ Mindset',
  '✦ AI', '✦ Investing', '✦ Productivity', '✦ Deep Work', '✦ Clarity', '✦ Simplicity'
];

const STATS = [
  { icon: <BookOpen size={22} />, value: '12+', label: 'Insights Published' },
  { icon: <TrendingUp size={22} />, value: '3', label: 'Projects Shipped' },
  { icon: <Sparkles size={22} />, value: '100%', label: 'Signal, No Noise' },
];

export default function Home() {
  const location = useLocation();
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 400], [0, -80]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.3]);

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
        style={{ y: heroY, opacity: heroOpacity }}
      >
        {/* Floating badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="hero-badge"
        >
          <Sparkles size={14} /> Now Writing · Volume 1
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{ position: 'relative', zIndex: 10 }}
        >
          Simple ideas about{' '}
          <motion.span
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.5}
            whileHover={{ scale: 1.1 }}
            whileDrag={{ scale: 1.3 }}
            className="text-gradient-animated cursor-grab"
            style={{ animationDelay: '0s', display: 'inline-block' }}
          >
            tech
          </motion.span>
          ,{' '}
          <motion.span
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.5}
            whileHover={{ scale: 1.1 }}
            whileDrag={{ scale: 1.3 }}
            className="text-gradient-animated cursor-grab"
            style={{ animationDelay: '2s', '--gradient-start': '#10b981', display: 'inline-block' }}
          >
            money
          </motion.span>
          , and{' '}
          <motion.span
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.5}
            whileHover={{ scale: 1.1 }}
            whileDrag={{ scale: 1.3 }}
            className="text-gradient-animated cursor-grab"
            style={{ animationDelay: '4s', '--gradient-start': '#f43f5e', display: 'inline-block' }}
          >
            life
          </motion.span>
          .
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Exploring the intersections of code, wealth creation, and living a meaningful life. Cutting through the noise to bring you actionable wisdom.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <button className="btn-primary" onClick={() => window.location.href = '#insights'}>
            Explore Articles <ArrowRight size={18} />
          </button>
          <a href="#works" className="btn-secondary">
            View My Work
          </a>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          className="stats-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85 }}
        >
          {STATS.map((s, i) => (
            <div key={i} className="stat-item">
              <span className="stat-icon">{s.icon}</span>
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
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
            <button className="btn-primary" style={{ marginTop: '16px' }}>Read Full Transcript <ArrowRight size={18} /></button>
          </motion.div>
          <motion.div
            className="video-player-wrapper"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="video-container glass-panel">
              <video src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" autoPlay loop muted playsInline></video>
            </div>
            <div className="video-glow"></div>
          </motion.div>
        </div>
      </section>

      {/* Featured Works */}
      <section id="works" className="featured container works-section" style={{ paddingTop: '40px' }}>
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-eyebrow">Built & Shipped</span>
          <h2 className="section-title">My Works</h2>
        </motion.div>
        <div className="works-grid">
          {works.map((work, index) => (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, type: 'spring', stiffness: 100 }}
            >
              <a
                href={work.url}
                target="_blank"
                rel="noreferrer"
                className="work-card glass-panel"
              >
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
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Insights */}
      <section id="insights" className="featured container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-eyebrow">Fresh Off the Press</span>
          <h2 className="section-title">Latest Insights</h2>
        </motion.div>
        <div className="featured-grid">
          {articles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <article className="article-card glass-panel" style={{ overflow: 'hidden', height: '100%' }}>
                <img src={article.image} alt={article.title} className="article-image" />
                <div className="article-meta">
                  <span style={{ color: article.color }}>{article.category}</span>
                  <span>{article.date}</span>
                </div>
                <h3>{article.title}</h3>
                <p>{article.excerpt}</p>
                <Link to={'/article/' + article.slug} className="read-more">Read Insight <ArrowRight size={16} /></Link>
              </article>
            </motion.div>
          ))}
        </div>
      </section>

      <Newsletter />
    </motion.main>
  );
}
