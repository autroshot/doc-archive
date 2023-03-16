import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import React from 'react';
// @ts-ignore
import MarkDown from './_markdown.md';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} 홈페이지`}
      description="개인적으로 번역하거나 정리한 문서를 모아 놓은 곳입니다."
    >
      <HomepageHeader />
      <main className="container">
        <div className={styles.main}>
          <MarkDown />
        </div>
      </main>
    </Layout>
  );
}
