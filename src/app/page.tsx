"use client";

import RpcInput from "./components/rpcInputs/rpcInput";
import TitleBar from "./components/titleBar/titleBar";
import styles from "./page.module.css";
import { useEffect, useState } from "react";

export default function Home() {
  const [isActive, setIsActive] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  

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
      <button type="button" className={styles.cfg} onClick={() => setIsOpen(true)}><i className='bx bx-cog'></i></button>

      {!isActive ? (
        <RpcInput/>
        // <div className={styles.rpc_inputs}>
        //   <h1>SimpleRpc</h1>

        //   <canvas className={styles.white_line}></canvas>

        //   <div className={styles.rpc_input}>
        //     <input type="text" className={styles.rpc_input_inner} placeholder="Application ID" />
        //     <p>ID приложения</p>
        //   </div>

        //   <div className={styles.rpc_input}>
        //     <input type="text" className={styles.rpc_input_inner} placeholder="Details" />
        //     <p>Первая строка статуса</p>
        //   </div>

        //   <div className={styles.rpc_input}>
        //     <input type="text" className={styles.rpc_input_inner} placeholder="State" />
        //     <p>Вторая строка статуса</p>
        //   </div>

        //   <div className={styles.rpc_input}>
        //     <input type="text" className={styles.rpc_input_inner} placeholder="Large Image Key" />
        //     <p>Ключ большой картинки</p>
        //   </div>

        //   {/* <div className={styles.rpc_input}>
        //     <input type="text" className={styles.rpc_input_inner} placeholder="Large Image Text" />
        //     <p>Текст при наведении</p>
        //   </div> */}

        //   <div className={styles.rpc_input}>
        //     <input type="text" className={styles.rpc_input_inner} placeholder="Small Image Key" />
        //     <p>Ключ маленькой картинки</p>
        //   </div>

        //   {/* <div className={styles.rpc_input}>
        //     <input type="text" className={styles.rpc_input_inner} placeholder="Small Image Text" />
        //     <p>Текст при наведении</p>
        //   </div> */}

        //   <div className={styles.rpc_input}>
        //     <input type="text" className={styles.rpc_input_inner} placeholder="Image Text" />
        //     <p>Текст при наведении</p>
        //   </div>

        //   <div className={styles.rpc_btn_div}>
        //     <div className={styles.rpc_btn_group}>
        //       <button type="button" className={`${styles.rpc_btn} ${isFBtnOpen ? styles.rpc_btn_open : ""}`} onClick={() => setIsFBtnOpen(!isFBtnOpen)}><label>Button 1</label><i className={`bx bx-chevron-up ${isFBtnOpen ? styles.rotate : ""}`}></i></button>
        //       <div className={`${styles.rpc_btn_content} ${isFBtnOpen ? styles.rpc_btn_content_open : ""}`}>
        //         <input type="text" placeholder="Label"/>
        //         <input type="text" placeholder="Url"/>
        //       </div>
        //     </div>

        //     <div className={styles.rpc_btn_group}>
        //       <button type="button" className={`${styles.rpc_btn} ${isSBtnOpen ? styles.rpc_btn_open : ""}`} onClick={() => setIsSBtnOpen(!isSBtnOpen)}><label>Button 2</label><i className={`bx bx-chevron-up ${isSBtnOpen ? styles.rotate : ""}`}></i></button>
        //       <div className={`${styles.rpc_btn_content} ${isSBtnOpen ? styles.rpc_btn_content_open : ""}`}>
        //         <input type="text" placeholder="Label"/>
        //         <input type="text" placeholder="Url"/>
        //       </div>
        //     </div>
        //   </div>

        //   <button type="button" className={styles.activeBtn} disabled={!isActiveReady}>Active</button>
        // </div>
      ) : (
        <div></div>
      )}

      {isOpen && (
        <div className={`${styles.cfgDiv} ${styles.glass}`}>
        {/* <div className={styles.cfgDiv}> */}
          {/* <button type="button" className={styles.closeBtn}><i className='bx bx-x'></i></button> */}
          {/* <button type="button" className={styles.closeBtn}>×</button> */}
          <button type="button" className={styles.closeBtn} onClick={() => setIsOpen(false)}><i className='bx bx-x'></i></button>

        </div>
      )}

    </div>
  );
}
