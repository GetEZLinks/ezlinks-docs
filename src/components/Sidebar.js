// app/docs/components/Sidebar.js

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '../styles/Sidebar.module.scss';

const navItems = [
  {
    section: 'Get Started',
    items: [
      { title: 'Overview', href: '/' },
      { title: 'Quick Start Guide', href: '/quick-start' },
      // { title: 'Initial Setup', href: '/docs/setup' },
    ]
  },
  {
    section: 'Guides',
    items: [
      { title: 'Implementation Examples', href: '/implementation-examples' },
      // { title: 'Game Developer\'s Guide', href: '/docs/game-developers' },
      // { title: 'Indie Developer\'s Guide', href: '/docs/indie-developers' },
    ]
  },
  {
    section: 'Reference',
    items: [
      { title: 'SDK Reference', href: '/sdk' },
      { title: 'FAQ & Troubleshooting', href: '/faq' },
    ]
  }
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        {navItems.map((section, index) => (
          <div key={index} className={styles.navSection}>
            <h4 className={styles.sectionTitle}>{section.section}</h4>
            <ul className={styles.navList}>
              {section.items.map((item, itemIndex) => {
                const isActive = pathname === item.href;
                return (
                  <li key={itemIndex}>
                    <Link 
                      href={item.href}
                      className={`${styles.navItem} ${isActive ? styles.active : ''}`}
                    >
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}