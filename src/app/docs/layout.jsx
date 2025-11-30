// app/docs/layout.js
import { Inter } from 'next/font/google';
import Sidebar from '../../components/Sidebar';
import PageNavigation from '../../components/PageNavigation';
import MobileNav from '../../components/MobileNav';
import styles from '../../styles/DocsLayout.module.scss';

const inter = Inter({ subsets: ['latin'] });

export default function DocsLayout({ children }) {
  return (
    <div className={inter.className}>
      <MobileNav />
      <div className={styles.docsContainer}>
        <Sidebar />
        <main className={styles.mainContent}>
          {children}
        </main>
        <PageNavigation />
      </div>
    </div>
  );
}