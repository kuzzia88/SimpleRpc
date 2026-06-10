'use client;'

import styles from './titleBar.module.css';

export default function TitleBar() {
  const close = async () => {
    await window.desktop.closeApp();
  };

  const minimize = async () => {
    await window.desktop.minimizeApp();
  };
return (
  <div className={styles.titleBar}>
    <div className={styles.title}>SimpleRpc</div>
    <div className={styles.windowControls}>
      <div className={`${styles.controlBtn} ${styles.minimize}`} onClick={minimize}></div>
      <div className={`${styles.controlBtn} ${styles.close}`} onClick={close}></div>
    </div>
  </div>
);
}