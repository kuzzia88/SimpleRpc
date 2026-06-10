'use client';

import styles from './messages.module.css';

export type MessageType = 'success' | 'error' | 'info';

export type Message = {
  id: string;
  title: string;
  text: string;
  type?: MessageType;
  isHiding?: boolean;
};

type MessagesProps = {
  messages: Message[];
  onClose?: (id: string) => void;
};

const icons: Record<MessageType, string> = {
  success: 'bx-check',
  error: 'bx-x',
  info: 'bx-info-circle'
};

export default function Messages({ messages, onClose }: MessagesProps) {
  if (messages.length === 0) {
    return null;
  }

  return (
    <div className={styles.messageContainer} id="messageContainer">
      {messages.map((message) => {
        const type = message.type ?? 'success';

        return (
          <div key={message.id} className={`${styles.messageBox} ${message.isHiding ? styles.hide : styles.show}`}>
            <div className={styles.messageContent}>
              <div className={`${styles.messageIcon} ${styles[`${type}Icon`]}`}>
                <i className={`bx ${icons[type]}`}></i>
              </div>

              <div className={styles.messageText}>
                <h3>{message.title}</h3>
                <p>{message.text}</p>
              </div>

              {onClose && (
                <button type="button" className={styles.closeBtn} onClick={() => onClose(message.id)}>
                  <i className="bx bx-x"></i>
                </button>
              )}
            </div>

            <div className={`${styles.progressBar} ${styles[`${type}Progress`]}`}></div>
          </div>
        );
      })}
    </div>
  );
}
