// src/app/page.tsx
import { redirect } from 'next/navigation';

export default function RootPage() {
  // Immediately redirect to the documentation index page
  redirect('/docs');
}
