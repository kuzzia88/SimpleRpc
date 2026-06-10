'use client';

import { type Message } from '../messages/messages';
import styles from './rpcInput.module.css';
import { type ChangeEvent, useState } from "react";

interface RpcInputProps {
  setIsActive: (value: boolean) => void;
  showMessage: (
    title: string,
    text: string,
    type?: Message["type"]
  ) => void;
}

interface RpcForm {
  applicationId: string;
  details: string;
  state: string;
  largeImageKey: string;
  smallImageKey: string,
  imageText: string;

  fBtnLabel: string;
  fBtnUrl: string;

  sBtnLabel: string;
  sBtnUrl: string;
}

export default function RpcInput({ setIsActive, showMessage }: RpcInputProps) {
  const [isFBtnOpen, setIsFBtnOpen] = useState(false);
  const [isSBtnOpen, setIsSBtnOpen] = useState(false);

  const [form, setForm] = useState<RpcForm>({
    applicationId: "",
    details: "",
    state: "",
    largeImageKey: "",
    smallImageKey: "",
    imageText: "",

    fBtnLabel: "",
    fBtnUrl: "",

    sBtnLabel: "",
    sBtnUrl: ""
  });

  const isActiveChecked = 
    form.applicationId.trim() !== "" &&
    form.details.trim() !== "" &&
    form.state.trim() !== ""
  const isApplicationIdValid = /^\d{17,20}$/.test(form.applicationId.trim());
  const isDetailsValid = form.details.trim().length <= 128;
  const isStateValid = form.state.trim().length <= 128;
  const isImageTextValid = form.imageText.trim().length <= 128;

  const isFirstButtonEmpty =
    form.fBtnLabel.trim() === "" &&
    form.fBtnUrl.trim() === "";

  const isFirstButtonValid =
    isFirstButtonEmpty ||
    (
      form.fBtnLabel.trim().length > 0 &&
      form.fBtnLabel.trim().length <= 32 
    );

  const isSecondButtonEmpty =
    form.sBtnLabel.trim() === "" &&
    form.sBtnUrl.trim() === "";

  const isSecondButtonValid =
    isSecondButtonEmpty ||
    (
      form.sBtnLabel.trim().length > 0 &&
      form.sBtnLabel.trim().length <= 32
    );

  const isActiveReady =
    isApplicationIdValid &&
    (isDetailsValid || isStateValid) &&
    isImageTextValid &&
    isFirstButtonValid &&
    isSecondButtonValid;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    if (isActiveReady) {
      console.log(form);
      await window.desktop.startRpc(form);
      showMessage("Success", "Data verified", "success");
      setIsActive(true);
    } else {
      showMessage("Error", "The data was entered incorrectly!", "error");
    }
  };
return (
  <>
  <div className={styles.rpc_inputs}>
    <h1>SimpleRpc</h1>

    <canvas className={styles.white_line}></canvas>

    <div className={styles.rpc_input}>
      <input type="text" className={styles.rpc_input_inner} placeholder="Application ID" name="applicationId" value={form.applicationId} onChange={handleChange} />
      <p>ID приложения</p>
    </div>

    <div className={styles.rpc_input}>
      <input type="text" className={styles.rpc_input_inner} placeholder="Details" name="details" value={form.details} onChange={handleChange} />
      <p>Первая строка статуса</p>
    </div>

    <div className={styles.rpc_input}>
      <input type="text" className={styles.rpc_input_inner} placeholder="State" name="state" value={form.state} onChange={handleChange} />
      <p>Вторая строка статуса</p>
    </div>

    <div className={styles.rpc_input}>
      <input type="text" className={styles.rpc_input_inner} placeholder="Large Image Key" name="largeImageKey" value={form.largeImageKey} onChange={handleChange} />
      <p>Ключ большой картинки</p>
    </div>

    <div className={styles.rpc_input}>
      <input type="text" className={styles.rpc_input_inner} placeholder="Small Image Key" name="smallImageKey" value={form.smallImageKey} onChange={handleChange} />
      <p>Ключ маленькой картинки</p>
    </div>

    <div className={styles.rpc_input}>
      <input type="text" className={styles.rpc_input_inner} placeholder="Image Text" name="imageText" value={form.imageText} onChange={handleChange} />
      <p>Текст при наведении</p>
    </div>

    <div className={styles.rpc_btn_div}>
      <div className={styles.rpc_btn_group}>
        <button type="button" className={`${styles.rpc_btn} ${isFBtnOpen ? styles.rpc_btn_open : ""}`} onClick={() => setIsFBtnOpen(!isFBtnOpen)}><label>Button 1</label><i className={`bx bx-chevron-up ${isFBtnOpen ? styles.rotate : ""}`}></i></button>
        <div className={`${styles.rpc_btn_content} ${isFBtnOpen ? styles.rpc_btn_content_open : ""}`}>
          <input type="text" placeholder="Label" name="fBtnLabel" value={form.fBtnLabel} onChange={handleChange} />
          <input type="text" placeholder="Url" name="fBtnUrl" value={form.fBtnUrl} onChange={handleChange} />
        </div>
      </div>

      <div className={styles.rpc_btn_group}>
        <button type="button" className={`${styles.rpc_btn} ${isSBtnOpen ? styles.rpc_btn_open : ""}`} onClick={() => setIsSBtnOpen(!isSBtnOpen)}><label>Button 2</label><i className={`bx bx-chevron-up ${isSBtnOpen ? styles.rotate : ""}`}></i></button>
        <div className={`${styles.rpc_btn_content} ${isSBtnOpen ? styles.rpc_btn_content_open : ""}`}>
          <input type="text" placeholder="Label" name="sBtnLabel" value={form.sBtnLabel} onChange={handleChange} />
          <input type="text" placeholder="Url" name="sBtnUrl" value={form.sBtnUrl} onChange={handleChange} />
        </div>
      </div>
    </div>

    <button type="button" className={styles.activeBtn} disabled={!isActiveChecked} onClick={handleSubmit}>Active</button>
  </div>
  </>
);
}
