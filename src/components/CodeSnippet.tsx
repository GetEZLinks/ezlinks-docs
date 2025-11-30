// components/CodeSnippet.js
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export default function CodeSnippet({ codeString }: {codeString: string}) {
  
  return (
    <SyntaxHighlighter language="bash" style={oneLight} wrapLines={true}>
      {codeString}
    </SyntaxHighlighter>
  );
}
