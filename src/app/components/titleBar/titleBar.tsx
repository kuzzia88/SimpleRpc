'use client;'

import styles from './titleBar.module.css';

export default function TitleBar() {
return (
  <div className={styles.titleBar}>
    <div className={styles.title}>SimpleRpc</div>
    <div className={styles.windowControls}>
      <div className={`${styles.controlBtn} ${styles.minimize}`}></div>
      <div className={`${styles.controlBtn} ${styles.close}`}></div>
    </div>
  </div>
);
}