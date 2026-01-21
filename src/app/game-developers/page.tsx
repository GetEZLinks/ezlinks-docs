// app/docs/game-developers/page.tsx
import fs from 'fs';
import path from 'path';
import MarkdownPage from '@/components/MarkdownPage';

export const metadata = {
  title: 'Game Developer Guide - EZLinks',
  description: 'Mobile attribution and deep linking built for game developers',
};

export default function GameDeveloperDocs() {
  const filePath = path.join(process.cwd(), 'content/game-developers/index.md');
  const content = fs.readFileSync(filePath, 'utf8');

  return <MarkdownPage content={content} />;
}