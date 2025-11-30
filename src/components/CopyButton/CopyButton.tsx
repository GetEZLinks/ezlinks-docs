// components/CopyButton.tsx
'use client';

import { useState } from 'react';

interface CopyButtonProps {
  codeToCopy: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ codeToCopy }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      // TypeScript knows navigator.clipboard.writeText exists in modern environments
      await navigator.clipboard.writeText(codeToCopy);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      style={{
        color: isCopied ? '#10B981' : '#4B5563',
        // color: 'black',
        background: 'transparent',
        fontFamily: 'var(--font-mono)',
        padding: '5px 10px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        // fontSize: '1rem',
        // opacity: '0.8',
        fontWeight: '700',
        zIndex: 10, // Ensure the button is above the code block
      }}
    >
      {isCopied ? 'Copied!' : 'Copy'}
    </button>
  );
};

export default CopyButton;
