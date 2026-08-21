import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Cpu, DollarSign, Heart, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { articles } from '../data/articles';
import { works } from '../data/works';
import Newsletter from '../components/Newsletter';

export default function Home() {
  const location = useLocation();

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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h1 style={{position: 'relative', zIndex: 10}}>
          Simple ideas about 
          <motion.span drag dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }} dragElastic={0.5} whileHover={{ scale: 1.1 }} whileDrag={{ scale: 1.3 }} className="text-gradient-animated cursor-grab" style={{animationDelay: '0s', display: 'inline-block'}}> tech</motion.span>, 
          <motion.span drag dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }} dragElastic={0.5} whileHover={{ scale: 1.1 }} whileDrag={{ scale: 1.3 }} className="text-gradient-animated cursor-grab" style={{animationDelay: '2s', '--gradient-start': '#10b981', display: 'inline-block'}}> money</motion.span>, and 
          <motion.span drag dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }} dragElastic={0.5} whileHover={{ scale: 1.1 }} whileDrag={{ scale: 1.3 }} className="text-gradient-animated cursor-grab" style={{animationDelay: '4s', '--gradient-start': '#f43f5e', display: 'inline-block'}}> life</motion.span>.
        </h1>
        <p>Exploring the intersections of code, wealth creation, and living a meaningful life. Cutting through the noise to bring you actionable wisdom.</p>
        <button className="btn-primary" onClick={() => window.location.href='#insights'}>
          Explore Articles <ArrowRight size={18} />
        </button>
      </motion.section>

      {/* Topics Section */}
      <section id="topics" className="topics container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Core Topics
        </motion.h2>
        <div className="topics-grid">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <Link to="/category/technology" className="topic-card glass-panel" style={{ display: 'block' }}>
              <div className="topic-icon">
                <Cpu size={32} />
              </div>
              <h3>Technology</h3>
              <p>Deep dives into software engineering, emerging trends, AI, and building robust systems.</p>
            </Link>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <Link to="/category/money" className="topic-card glass-panel" style={{ display: 'block' }}>
              <div className="topic-icon" style={{color: '#10b981'}}>
                <DollarSign size={32} />
              </div>
              <h3>Money</h3>
              <p>Practical frameworks for personal finance, investing, business building, and wealth preservation.</p>
            </Link>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
            <Link to="/category/life-growth" className="topic-card glass-panel" style={{ display: 'block' }}>
              <div className="topic-icon" style={{color: '#f43f5e'}}>
                <Heart size={32} />
              </div>
              <h3>Life & Growth</h3>
              <p>Mental models, productivity systems, stoic philosophy, and mastering the human experience.</p>
            </Link>
          </motion.div>
        </div>
      </section>

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
            <button className="btn-primary" style={{marginTop: '16px'}}>Read Full Transcript <ArrowRight size={18} /></button>
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
      <section id="works" className="featured container" style={{ paddingTop: '40px' }}>
        <h2 className="section-title">My Works</h2>
        <div className="featured-grid">
          {works.map((work, index) => (
            <motion.div 
              key={work.id}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <a href={work.url} target="_blank" rel="noreferrer" className="article-card glass-panel" style={{ display: 'block', overflow: 'hidden', height: '100%', textDecoration: 'none' }}>
                <img 
                  src={work.image} 
                  alt={work.title} 
                  className="article-image" 
                  style={{ objectPosition: 'top', borderBottom: '1px solid var(--panel-border)' }} 
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = 'https://via.placeholder.com/600x400?text=' + encodeURIComponent(work.title);
                  }}
                />
                <h3 style={{ marginTop: '8px' }}>{work.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{work.description}</p>
                <span className="read-more" style={{ marginTop: '16px' }}>Visit Live Site <ArrowRight size={16} /></span>
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Insights */}
      <section id="insights" className="featured container">
        <h2 className="section-title">Latest Insights</h2>
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
                  <span style={{color: article.color}}>{article.category}</span>
                  <span>{article.date}</span>
                </div>
                <h3>{article.title}</h3>
                <p>{article.excerpt}</p>
                <Link to={"/article/" + article.slug} className="read-more">Read Insight <ArrowRight size={16} /></Link>
              </article>
            </motion.div>
          ))}
        </div>
      </section>

      <Newsletter />
    </motion.main>
  );
}
