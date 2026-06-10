'use client';

import styles from './active.module.css';
import { useEffect, useState } from "react";

interface RpcInputProps {
  setIsActive: (value: boolean) => void;
}

interface DiscordApp {
  id: string;
  name: string;
  icon: string | null;
}

export default function Active({ setIsActive }: RpcInputProps) {
  const [app, setApp] = useState<DiscordApp | null>(null);

  const applicationId = sessionStorage.getItem('appID');

  useEffect(() => {
    fetch(`https://discord.com/api/v10/applications/${applicationId}/rpc`)
      .then((res) => res.json())
      .then((data) => setApp(data))
      .catch(console.error);
  }, [applicationId]);

  const iconUrl =
    app?.icon
      ? `https://cdn.discordapp.com/app-icons/${app.id}/${app.icon}.png`
      : null;
  
  const disable = async () => {
    await window.desktop.stopRpc();
    setIsActive(false);
  }
return (
  <>
    <div className={styles.active}>
      <div className={styles.active_inner}>
        {iconUrl ? (
          <img src={iconUrl} className={styles.img} alt={app?.name} width={180} height={180} />
        ) : (
          <p>Иконка не найдена</p>
        )}
        <canvas className={styles.white_line}></canvas>
        <label>{app?.name}</label>
        <p>{app?.id}</p>
        <button className={styles.status} onClick={disable}><span>✅</span> Active</button>
      </div>
    </div>
  </>
);
}