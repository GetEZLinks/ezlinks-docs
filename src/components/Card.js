// app/docs/components/Card.js
import Link from 'next/link';
import styles from '../styles/Card.module.scss';

export default function Card({ title, description, icon, href }) {
  return (
    <Link href={href} className={styles.cardLink}>
      <div className={styles.card}>
        {icon && <div className={styles.cardIcon}>{icon}</div>}
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardDescription}>{description}</p>
      </div>
    </Link>
  );
}