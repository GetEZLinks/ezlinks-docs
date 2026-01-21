// app/docs/game-developers/[slug]/page.tsx
import fs from 'fs';
import path from 'path';
import MarkdownPage from '@/components/MarkdownPage';
import { notFound } from 'next/navigation';

// 1. Define params as a Promise
// 1. Define the dynamic segment as a Promise
type PageProps = {
  params: Promise<{ slug: string }>;
};


export async function generateStaticParams() {
  const contentDir = path.join(process.cwd(), 'content/game-developers');
  const files = fs.readdirSync(contentDir);

  return files
    .filter(file => file.endsWith('.md') && file !== 'index.md')
    .map(file => ({
      slug: file.replace('.md', ''),
    }));
}

export async function generateMetadata({ params }: PageProps ) {
const { slug } = await params;
  const filePath = path.join(process.cwd(), 'content/game-developers', `${slug}.md`);
  
  if (!fs.existsSync(filePath)) {
    return { title: 'Not Found' };
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const titleMatch = content.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1] : slug;

  return {
    title: `${title} - EZLinks`,
  };
}

export default async function GameDevPage({ params }: PageProps) {  // 3. Await the params before destructuring
  const { slug } = await params;

  const filePath = path.join(process.cwd(), 'content/game-developers', `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const content = fs.readFileSync(filePath, 'utf8');

  return <MarkdownPage content={content} />;
}