"use client";

import RpcInput from "./components/rpcInputs/rpcInput";
import TitleBar from "./components/titleBar/titleBar";
import Active from "./components/active/active";
import styles from "./page.module.css";
import Messages, { type Message } from "./components/messages/messages";
import { useEffect, useState } from "react";

export default function Home() {
  const [isActive, setIsActive] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  
  const showMessage = (
    title: string,
    text: string,
    type: Message["type"] = "info"
  ) => {
    const id = Date.now().toString();

    setMessages([{ id, title, text, type }]);

    setTimeout(() => {
      setMessages((prev) =>
        prev.map((message) =>
          message.id === id ? { ...message, isHiding: true } : message
        )
      );
    }, 2500);

    setTimeout(() => setMessages([]), 3000);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className={styles.page}>
      <TitleBar/>

    <Messages messages={messages} />

      <button type="button" className={styles.cfg} onClick={() => setIsOpen(true)}><i className='bx bx-cog'></i></button>

      {!isActive ? (
        <RpcInput setIsActive={setIsActive} showMessage={showMessage}/>
      ) : (
        <Active setIsActive={setIsActive}/>
      )}

      {isOpen && (
        <div className={`${styles.cfgDiv} ${styles.glass}`}>
          <button type="button" className={styles.closeBtn} onClick={() => setIsOpen(false)}><i className='bx bx-x'></i></button>
        </div>
      )}

    </div>
  );
}
