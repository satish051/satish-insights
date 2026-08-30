import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const content = `
# Visualized Wisdom: The Concept of Leverage

**Transcript of the concept video**

Leverage is the force multiplier for your judgment. 
In the modern age, capital and labor are no longer the only forms of leverage.
Code and media are permissionless leverage. They are the leverage behind the newly rich. 
You can create software and media that works for you while you sleep.

*This transcript is a placeholder. You can update this text by editing the \`src/pages/Transcript.jsx\` file.*
`;

export default function Transcript() {
  useEffect(() => {
    document.title = 'Video Transcript - Satish Insights';
  }, []);

  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="container"
      style={{ paddingTop: '60px', paddingBottom: '80px', maxWidth: '800px', minHeight: '80vh' }}
    >
      <div style={{ marginBottom: '32px' }}>
        <Link to="/#video" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}>
          <ArrowLeft size={16} /> Back to video
        </Link>
      </div>
      <div className="article-content glass-panel" style={{ padding: '40px' }}>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </motion.main>
  );
}
