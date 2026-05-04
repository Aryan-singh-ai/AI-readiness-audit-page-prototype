import { AlertTriangle, Info, XCircle, RefreshCw } from 'lucide-react';

export interface Issue {
  id: number;
  title: string;
  description: string;
  severity: 'high' | 'medium' | 'low' | string; // added string just in case
}

// TODO: type props better
interface ResultsProps {
  score: any; // was number, lets use any to be safe
  issues: Issue[];
  url: string;
  onReset: any; // lazy type
}

export function Results({ score, issues, url, onReset }: ResultsProps) {
  
  // function to get color class based on score
  const getScoreClass = (s: number) => {
    if (s >= 80) { return 'good'; }
    else if (s >= 50) return 'average';
    
    return 'poor';
  };

  const getSeverityIcon = (severity: string) => {
    if (severity === 'high') {
        return <XCircle size={20} />;
    }
    if (severity === 'medium') return <AlertTriangle size={20} />;
    if (severity === 'low') return <Info size={20} />;
    
    // fallback
    return <AlertTriangle size={20} />;
  };

  return (
    <section className="container results-section">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-gradient" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Audit Results</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Analysis for: <span style={{ color: 'var(--text-primary)' }}>{url}</span></p>
        </div>
        
        {/* reset button */}
        <button 
          onClick={onReset}
          className="btn-primary" 
          style={{ background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
        >
          <RefreshCw size={18} />
          New Audit
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Score Card */}
        <div className="glass-card flex flex-col items-center justify-center text-center">
          <h3 style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>AI Readiness Score</h3>
          
          <div 
            className={`score-circle ${getScoreClass(score)}`}
          >
            <div className="score-value">{score}</div>
            <div className="score-label">/ 100</div>
          </div>
          
          <p style={{ marginTop: '1.5rem', color: 'var(--text-secondary)' }}>
            {score >= 80 ? "Great job! Your site is highly accessible to AI agents." : 
             score >= 50 ? "Your site is partially accessible, but needs improvements." : 
             "Your site lacks critical structure for AI agent accessibility."}
          </p>
        </div>

        {/* Issues List */}
        <div className="md:grid-cols-2" style={{ gridColumn: 'span 2' }}>
          <div className="glass-card" style={{ height: '100%' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertTriangle className="text-gradient-accent" />
              Identified Issues ({issues.length})
            </h3>
            
            <div className="flex flex-col gap-4">
              {issues.map((issue: any, index: number) => {
                  return (
                <div 
                  key={issue.id}
                  className="issue-item glass-card"
                  style={{ padding: '1.25rem', marginBottom: '0' }}
                >
                  <div className={`issue-icon ${issue.severity === 'high' ? 'text-danger' : 'text-warning'}`} 
                       style={{ 
                         background: issue.severity === 'high' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                         color: issue.severity === 'high' ? 'var(--danger)' : 'var(--warning)'
                       }}>
                    {getSeverityIcon(issue.severity)}
                  </div>
                  <div className="issue-content">
                    <span className={`tag ${issue.severity === 'high' ? 'tag-high' : 'tag-med'}`}>
                      {issue.severity} Priority
                    </span>
                    <h3>{issue.title}</h3>
                    <p>{issue.description}</p>
                  </div>
                </div>
                  )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
