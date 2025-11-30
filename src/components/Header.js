// app/docs/components/Header.js
import Link from 'next/link';
import styles from '../styles/Header.module.scss';

export default function Header({ title, description }) {
  return (
    <header className={styles.header}>
      <h1>{title}</h1>
      {description && <p className={styles.description}>{description}</p>}
    </header>
  );
}