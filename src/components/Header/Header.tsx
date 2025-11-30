// src/components/Header/Header.tsx (Updated)
'use client';
import { motion } from 'framer-motion';
// import ThemeToggle from '@/components/ThemeToggle/ThemeToggle';
import styles from './Header.module.scss';
import Image from 'next/image';
import Link from 'next/link';


export default function Header() {
  return (
    <motion.header 
      className={styles.header}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className={styles.container}>
        <nav className={styles.nav}>
          <div className={styles.logo}>
            <Link href='/'>
              <Image
                src='/logo/ezlinks.svg'
                alt="Logo for EZLinks"
                height={24}
                width={150}
              />
            </Link>
          </div>
          
          <div className={styles.navLinks}>
            {/* <a target="_blank" href="https://docs.getezlinks.io">Docs</a> */}
            {/* <a href="pricing">Pricing</a> */}
            <a href="#github">GitHub</a>
            {/* <ThemeToggle /> */}
            <a href="#dashboard" className="btn secondary">Dashboard</a>
          </div>
        </nav>
      </div>
    </motion.header>
  );
}