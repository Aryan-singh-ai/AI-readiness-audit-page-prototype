import { useState } from 'react';
import { Hero } from './Hero';
import { Scanner } from './ScannerComp';
import { Results, type Issue } from './components/Results';
import { Bot } from 'lucide-react';

// todo: maybe move this to an api later idk
const MOCK_ISSUES: Issue[] = [
  {
    id: 1,
    title: "Missing Structured Schema",
    description: "No JSON-LD schema.org markup detected. AI agents struggle to parse unstructured content reliably.",
    severity: "high"
  },
  {
    id: 2,
    title: "Weak Heading Hierarchy",
    description: "Multiple missing or out-of-order H2/H3 tags. This confuses AI web scrapers trying to understand page context.",
    severity: "medium"
  },
  {
    id: 3,
    title: "No Explicit FAQ Section",
    description: "Lack of Q&A formats makes it difficult for LLMs to extract direct answers for retrieval-augmented generation (RAG).",
    severity: "medium"
  },
  {
    id: 4,
    title: "Dynamic Content Hidden Behind JS",
    description: "Critical content relies on client-side rendering without proper hydration, making it invisible to simple AI crawlers.",
    severity: "high"
  }
];

function App() {
  const [url, setUrl] = useState<string>('');
  
  // 0 = idle, 1 = scanning, 2 = results ... wait no lets just use strings its easier
  const [appState, setAppState] = useState<'idle' | 'scanning' | 'results'>('idle');
  
  const [score, setScore] = useState<number>(0);

  const handleAnalyze = (submittedUrl: string) => {
    // console.log("submitted: ", submittedUrl)
    setUrl(submittedUrl);
    setAppState('scanning');
    
    // Simulate network request and processing time
    setTimeout(() => {
      // Generate a mock score between 35 and 65 for realism
      let mockScore = Math.floor(Math.random() * (65 - 35 + 1)) + 35;
      
      // if (submittedUrl.includes('google')) mockScore = 100; // lol easter egg (commented out for now)

      setScore(mockScore);
      setAppState('results');
    }, 2800);
  };

  const handleReset = () => {
      setAppState('idle');
      setUrl('');
  };

  return (
    <div className="min-h-screen">
      <header className="header">
        <div className="container">
          <div className="logo">
            <Bot className="text-gradient-accent" />
            <span>AuditAI</span>
          </div>
        </div>
      </header>

      <main>
        {appState === 'idle' ? (
          <Hero onAnalyze={handleAnalyze} isLoading={false} />
        ) : null}
        
        {appState === 'scanning' && (
          <Scanner />
        )}
        
        {appState === 'results' && (
          <Results 
            url={url}
            score={score}
            issues={MOCK_ISSUES}
            onReset={handleReset}
          />
        )}
      </main>
    </div>
  );
}

export default App;
