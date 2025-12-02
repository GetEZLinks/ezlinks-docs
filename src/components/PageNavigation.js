// app/docs/components/PageNavigation.js

'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '../styles/PageNavigation.module.scss';
import TOCIcon from '@/icons/toc.svg';

import { usePathname } from 'next/navigation';

export default function PageNavigation() {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState('');

  const pathname = usePathname();

  useEffect(() => {
    // Get all headings in the content
    const contentHeadings = Array.from(document.querySelectorAll('h2, h3')).map(heading => ({
      id: heading.id,
      text: heading.textContent,
      level: heading.tagName === 'H2' ? 2 : 3
    }));
    
    setHeadings(contentHeadings);

    // Set up intersection observer to highlight active section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0px -80% 0px' }
    );

    document.querySelectorAll('h2, h3').forEach(heading => {
      observer.observe(heading);
    });

    return () => {
      observer.disconnect();
    };
  }, [pathname]);

  if (headings.length === 0) {
    return null;
  }


  return (
    <aside className={styles.pageNavigation}>
      <div className={styles.sticky}>
        <Image src={TOCIcon} alt="EzLinks" width={13} height={13} />
        <h4 className={styles.navTitle}>On this page</h4>
        <nav>
          <ul className={styles.navList}>
            {headings.map((heading, index) => (
              <li 
                key={index} 
                className={`
                  ${styles.navItem} 
                  ${heading.level === 3 ? styles.subItem : ''} 
                  ${heading.id === activeId ? styles.active : ''}
                `}
              >
                <a href={`#${heading.id}`}>{heading.text}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}