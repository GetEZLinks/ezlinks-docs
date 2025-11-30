// components/CodeSnippet.js
// 'use client';
import { Code } from 'bright';
import CopyButton from './CopyButton/CopyButton';

Code.theme = "github-light"
export default function CodeSnippet({ codeString, language }: {codeString: string, language: string}) {
  
  return (
    <div style={{
      borderRadius: '12px',
      overflow: 'hidden', // Ensures header corners match the bright code block corners
      boxShadow: '0 4px 4px rgba(0, 0, 0, 0.051)',
      marginTop: '20px', // Add some spacing above
      marginBottom: '20px', // Add some spacing below
      border: '1px solid #e1e4e8',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 15px',
        backgroundColor: '#a1a1a125', // Dark header color
        color: '#1a1a1a',
        fontFamily: 'sans-serif',
        fontSize: '0.9em',
        borderTopLeftRadius: '12px',
        borderTopRightRadius: '12px',
      }}>
        {language}
        <CopyButton codeToCopy={codeString} />
      </div>
      <div style={{ padding: '0.5rem', overflowX: 'auto' }}>
        <Code 
          lang={language} 
        >
          {codeString}
        </Code>
      </div>
    </div>
  );
}
