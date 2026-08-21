import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const content = `
# Terms of Service

**Effective Date: ${new Date().getFullYear()}**

By accessing and using Satish Insights, you accept and agree to be bound by the terms and provision of this agreement.

### Content Use
All content provided on this blog is for informational purposes only. The owner of this blog makes no representations as to the accuracy or completeness of any information on this site or found by following any link on this site.

### Copyright Policy
Unless otherwise noted, Satish Insights is the legal copyright holder of all material on this blog and it may not be used, reprinted, modified, or published without our written consent.

### Reserve Rights
We reserve the right to change the focus of this blog, to shut it down, sell it, or to change the terms of use at our own discretion.

By using our site, you consent to our website's Terms of Service.
`;

export default function Terms() {
  useEffect(() => {
    document.title = 'Terms of Service - Satish Insights';
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
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}>
          <ArrowLeft size={16} /> Back to home
        </Link>
      </div>
      <div className="article-content glass-panel" style={{ padding: '40px' }}>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </motion.main>
  );
}
