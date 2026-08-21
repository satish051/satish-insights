import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { articles } from '../data/articles';
import Newsletter from '../components/Newsletter';

export default function Category() {
  const { id } = useParams();
  
  // Format id for display (e.g., 'technology' -> 'Technology', 'life-growth' -> 'Life & Growth')
  const categoryName = id === 'life-growth' ? 'Life & Growth' : id.charAt(0).toUpperCase() + id.slice(1);
  
  const categoryArticles = articles.filter(
    (a) => a.category.toLowerCase() === (id === 'life-growth' ? 'life' : id.toLowerCase()) || 
           a.category.toLowerCase() === categoryName.toLowerCase()
  );

  useEffect(() => {
    document.title = `${categoryName} - Satish Insights`;
  }, [categoryName]);

  let themeColor = 'var(--accent-cyan)';
  if (id === 'money') themeColor = '#10b981';
  if (id === 'life-growth') themeColor = '#f43f5e';

  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <section className="container" style={{paddingTop: '60px', paddingBottom: '40px'}}>
        <div style={{marginBottom: '32px'}}>
          <Link to="/" style={{display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)'}}>
            <ArrowLeft size={16} /> Back to home
          </Link>
        </div>
        
        <header style={{marginBottom: '48px', textAlign: 'center'}}>
          <h1 style={{fontSize: '3rem', marginBottom: '16px', color: themeColor}}>{categoryName} Insights</h1>
          <p style={{fontSize: '1.25rem', color: 'var(--text-muted)'}}>Explore our latest thoughts on {categoryName.toLowerCase()}.</p>
        </header>

        {categoryArticles.length > 0 ? (
          <div className="featured-grid">
            {categoryArticles.map((article, index) => (
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
        ) : (
          <div style={{textAlign: 'center', padding: '60px 0'}}>
            <h3 style={{color: 'var(--text-muted)'}}>No articles published in this category yet.</h3>
          </div>
        )}
      </section>

      <Newsletter />
    </motion.main>
  );
}
