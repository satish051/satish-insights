import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import { articles } from '../data/articles';
import Newsletter from '../components/Newsletter';

export default function Article() {
  const { slug } = useParams();
  const article = articles.find(a => a.slug === slug);

  useEffect(() => {
    if (article) {
      document.title = `${article.title} - Satish Insights`;
    } else {
      document.title = 'Article Not Found - Satish Insights';
    }
  }, [article]);

  if (!article) {
    return (
      <motion.main 
        className="container" 
        style={{padding: '120px 0', textAlign: 'center'}}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
        <h2>Article not found</h2>
        <Link to="/" className="btn-primary" style={{marginTop: '24px'}}>Go Back Home</Link>
      </motion.main>
    );
  }

  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <article className="container" style={{paddingTop: '60px', paddingBottom: '80px', maxWidth: '800px'}}>
        <div style={{marginBottom: '32px'}}>
          <Link to="/" style={{display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)'}}>
            <ArrowLeft size={16} /> Back to home
          </Link>
        </div>
        
        <header style={{marginBottom: '48px', textAlign: 'center'}}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{color: article.color, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px'}}
          >
            {article.category} • {article.date}
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{fontSize: '3.5rem', marginBottom: '24px'}}
          >
            {article.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{fontSize: '1.25rem', color: 'var(--text-muted)'}}
          >
            {article.excerpt}
          </motion.p>
        </header>

        <motion.img 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          src={article.image} 
          alt={article.title} 
          style={{width: '100%', height: '400px', objectFit: 'cover', borderRadius: '16px', marginBottom: '48px'}} 
        />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="article-content" 
          style={{fontSize: '1.15rem', lineHeight: '1.8', color: 'var(--text-main)'}}
        >
          <ReactMarkdown>{article.content}</ReactMarkdown>
        </motion.div>
        
      </article>

      <Newsletter />
    </motion.main>
  );
}
