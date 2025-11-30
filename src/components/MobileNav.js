// app/docs/components/MobileNav.js

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '../styles/MobileNav.module.scss';

// Using the same navigation items as in Sidebar.js
const navItems = [
  {
    section: 'Get Started',
    items: [
      { title: 'Overview', href: '/docs' },
      { title: 'Quick Start Guide', href: '/docs/quick-start' },
      { title: 'Initial Setup', href: '/docs/setup' },
    ]
  },
  {
    section: 'Guides',
    items: [
      { title: 'Implementation Examples', href: '/docs/implementation-examples' },
      { title: 'Game Developer\'s Guide', href: '/docs/game-developers' },
      { title: 'Indie Developer\'s Guide', href: '/docs/indie-developers' },
    ]
  },
  {
    section: 'Reference',
    items: [
      { title: 'SDK Reference', href: '/docs/sdk' },
      { title: 'API Reference', href: '/docs/api' },
      { title: 'FAQ & Troubleshooting', href: '/docs/faq' },
    ]
  }
];

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.mobileNav}>
      <div className={styles.mobileHeader}>
        <Link href="/" className={styles.logoLink}>
          <div className={styles.logoPlaceholder}>EZLinks</div>
        </Link>
        <button 
          className={`${styles.menuButton} ${isOpen ? styles.open : ''}`} 
          onClick={toggleMenu}
          aria-label="Toggle mobile menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      
      {isOpen && (
        <div className={styles.mobileMenu}>
          <nav>
            {navItems.map((section, index) => (
              <div key={index} className={styles.navSection}>
                <h3 className={styles.sectionTitle}>{section.section}</h3>
                <ul className={styles.navList}>
                  {section.items.map((item, itemIndex) => {
                    const isActive = pathname === item.href;
                    return (
                      <li key={itemIndex}>
                        <Link 
                          href={item.href}
                          className={`${styles.navItem} ${isActive ? styles.active : ''}`}
                          onClick={closeMenu}
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
        </div>
      )}
    </div>
  );
}