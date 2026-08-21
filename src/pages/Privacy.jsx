import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const content = `
# Privacy Policy

**Effective Date: ${new Date().getFullYear()}**

At Satish Insights, your privacy is our priority. This document outlines the types of personal information that is received and collected by our website and how it is used.

### Information We Collect
We only collect information about you if we have a reason to do so—for example, to provide our services, to communicate with you, or to make our services better. This usually includes:
- **Email Address:** When you subscribe to our newsletter.
- **Usage Data:** Anonymous analytics to help us understand how you interact with our content.

### How We Use Information
- To deliver the newsletter you requested.
- To analyze trends and optimize the user experience.
- To protect our website against malicious activity.

### Your Choices
You may opt-out of our newsletter at any time by clicking the "unsubscribe" link at the bottom of any email we send. 

If you have any questions about this Privacy Policy, please contact us.
`;

export default function Privacy() {
  useEffect(() => {
    document.title = 'Privacy Policy - Satish Insights';
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
