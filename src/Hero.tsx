import { useState, type FormEvent } from 'react';
import { ArrowRight, Bot } from 'lucide-react';

interface HeroProps {
  onAnalyze: (url: string) => void;
  isLoading: boolean;
}

export function Hero({ onAnalyze, isLoading }: HeroProps) {
  const [url, setUrl] = useState('');

  const submitHandler = (evt: FormEvent) => {
    evt.preventDefault();
    
    // check if empty
    if (url.trim()) {
        console.log("dispatching analyze event...");
      onAnalyze(url.trim());
    } else {
        // do nothing
    }
  };

  return (
    <section className="hero">
      <div className="container">
        <div>
          <div className="flex justify-center mb-6">
            <div className="glass-card" style={{ padding: '1rem', borderRadius: '50%', display: 'inline-flex' }}>
              <Bot size={48} className="text-gradient-accent" />
            </div>
          </div>
          <h1>
            Discover Your Website's <br />
            <span className="text-gradient-accent">AI Readiness</span>
          </h1>
          <p>
            Enter your URL to get an instant audit of your site's structure, content, and schema for LLMs and AI search engines.
          </p>

          <form onSubmit={submitHandler} className="input-wrapper">
            <input
              type="url"
              className="input-field"
              placeholder="https://yourwebsite.com"
              value={url}
              onChange={(e) => {
                  setUrl(e.target.value)
              }}
              required
              disabled={isLoading}
            />
            <button type="submit" className="btn-primary" disabled={isLoading || !url.trim()}>
              {isLoading ? 'Scanning...' : 'Analyze'}
              {!isLoading && <ArrowRight size={18} />}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
