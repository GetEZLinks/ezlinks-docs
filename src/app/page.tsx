// app/page.js

import styles from '../styles/GettingStarted.module.scss';
import Card from '../components/Card';

import GuideIcon from '@/icons/guide.svg';
import BoltIcon from '@/icons/bolt.svg';
import CodeBlockIcon from '@/icons/code-block.svg';

import FaqIcon from '@/icons/faq.svg';

export const metadata = {
  title: 'EZLinks Documentation | Getting Started',
  description: 'Learn how to implement and use EZLinks in your applications',
};

export default function DocsHomePage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 id="getting-started">Welcome to EZLinks</h1>
        <p className={styles.subtitle}>
          EZLinks is a powerful deep linking and attribution platform that helps you connect your users across platforms and measure campaign performance.
        </p>
      </header>

      <section>
        <h2 id="overview" className={styles.sectionTitle}>Overview</h2>
        <p>
          EZLinks provides tools for creating and managing deep links, tracking user journeys, and measuring conversion across platforms. 
          Our SDK supports iOS, Android, Web, and Unity, making it easy to implement a consistent cross-platform experience.
        </p>
      </section>

      <section className={styles.cardSection}>
        <h2 id="quick-links" className={styles.sectionTitle}>Quick Links</h2>
        <div className={styles.cardGrid}>
          <Card
            title="Quick Start Guide"
            description="Get up and running with EZLinks in minutes with our step-by-step guide."
            href="/quick-start"
            icon={BoltIcon}
          />
          <Card 
            title="Implementation Examples"
            description="Real-world examples showing how to implement EZLinks for common use cases."
            href="/implementation-examples"
            icon={GuideIcon}
          />
          <Card 
            title="SDK Reference"
            description="Comprehensive documentation for our iOS, Android, Web, and Unity SDKs."
            href="/sdk"
            icon={CodeBlockIcon}
          />
          <Card 
            title="FAQ & Troubleshooting"
            description="Answers to common questions and solutions to typical integration challenges."
            href="/"
            icon={FaqIcon}
          />
        </div>
      </section>

      <section className={styles.cardSection}>
        <h2 id="developer-guides" className={styles.sectionTitle}>Developer Guides</h2>
        <div className={styles.cardGrid}>
          <Card 
            title="Game Developer's Guide"
            description="Specialized instructions for game studios and indie game developers with platform-specific details."
            href="/game-developers"
            icon={GuideIcon}
          />
          <Card 
            title="Indie Developer's Guide"
            description="Resources tailored to indie developers, focusing on quick implementation and cost-effectiveness."
            href="/"
            icon={GuideIcon}
          />
        </div>
      </section>

      <section style={{margin: "3rem 0"}}>
        <h2 id="why-ezlinks" className={styles.sectionTitle}>Why EZLinks?</h2>
        <div className={styles.featureGrid}>
          <div className={styles.featureItem}>
            <h3>Simple Implementation</h3>
            <p>Get up and running quickly with just a few lines of code.</p>
          </div>
          <div className={styles.featureItem}>
            <h3>Cross-Platform Support</h3>
            <p>Seamless experience across iOS, Android, Web, and Unity.</p>
          </div>
          <div className={styles.featureItem}>
            <h3>Powerful Analytics</h3>
            <p>Track user journeys and measure campaign performance.</p>
          </div>
          <div className={styles.featureItem}>
            <h3>Developer-Friendly</h3>
            <p>Built by developers for developers, with excellent support.</p>
          </div>
        </div>
      </section>

      <section style={{margin: "3rem 0"}}>
        <h2 id="getting-help" className={styles.sectionTitle}>Getting Help</h2>
        <p>
          If you need assistance with implementing EZLinks, our support team is here to help. 
          Feel free to <a href="mailto:support@ezlinks.io" className={styles.link}>contact us</a> with any questions.
        </p>
      </section>
    </div>
  );
}