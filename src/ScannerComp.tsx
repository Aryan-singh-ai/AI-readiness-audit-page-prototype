import { useEffect, useState } from 'react';
import { Terminal } from 'lucide-react';

// just some random logs to make it look like its doing something
const logs = [
  "Initializing audit sequence...",
  "Fetching HTML structure...",
  "Analyzing heading hierarchy...",
  "Checking for schema.org markup...",
  "Evaluating semantic tags...",
  "Assessing content readability...",
  "Generating readiness score...",
];

export function Scanner() {
  let [currentLog, setCurrentLog] = useState(0);

  useEffect(() => {
    let interval = setInterval(() => {
        // increment unless we hit the end
      setCurrentLog((prev) => {
          if (prev < logs.length - 1) return prev + 1;
          return prev;
      });
    }, 400); 
    
    return () => {
        clearInterval(interval);
    };
  }, []);

  return (
    <section className="container">
      <div className="scanner-container">
        <div className="scanner-box">
          <div className="scanner-line"></div>
          
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="glass-card" style={{ padding: '1rem', borderRadius: '50%', display: 'inline-flex' }}>
              <Terminal size={32} className="text-gradient-accent" />
            </div>
            
            <h2 className="text-gradient" style={{ fontSize: '1.5rem' }}>Analyzing Website</h2>
            
            <div 
              style={{ 
                fontFamily: 'monospace', 
                color: 'var(--text-secondary)',
                marginTop: '1rem',
                minHeight: '24px'
              }}
            >
              {'>'} {logs[currentLog]}
            </div>
            
            <div style={{ width: '100%', height: '8px', background: 'var(--border-color)', borderRadius: '4px', marginTop: '2rem', overflow: 'hidden' }}>
              <div 
                style={{ height: '100%', background: 'var(--accent-primary)', width: `${((currentLog + 1) / logs.length) * 100}%`, transition: 'width 0.4s linear' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
