import Modal from "react-modal";

import Link from "next/link";

import Image from "next/image";

import FormData from "form-data";

// iCONS
import { MdOutlineAddToPhotos } from "react-icons/md";

import styles from "./styles.module.scss";
import { movie05, netflix } from "../../../assets";
import { useState, useRef, useEffect } from "react";
import { Api } from "../../../api/axios";
import axios from "axios";

export default function ModalBuyService({
  ModalIsOpen,
  closeModal,
  account_id,
  data,
}) {
  const [inputFile, setInputFile] = useState("");
  const [modalNotification, setModalNotification] = useState(false);

  const [smsError, setSmsError] = useState(false);

  // MODAL NOTIFICATION SEND AFTER BUY SERVICE
  function openModalNotification() {
    setModalNotification(true);
  }
  function closeModalNotification() {
    setModalNotification(false);
  }

  const [boleto, setBoleto] = useState("");

  const ref = useRef(null);

  async function handlerSubmit(e) {
    e.preventDefault();

    const user_id = localStorage.getItem("userId");

    const file = ref.current.files[0];

    const form = new FormData();
    form.append("pdf_purchasing", file);
    form.append("user_id", user_id);
    form.append("account_service_id", account_id);

    let token = "";
    if (typeof window !== "undefined") {
      token = localStorage.getItem("token");
    }

    const url = `https://api-streaming.onrender.com/purchase-account-services/${account_id}`;

    await axios
      .post(url, form, {
        headers: {
          //...form.getHeaders,
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("response buy service : ", response);
        openModalNotification();
        setSmsError(false);
        closeModal();
      })
      .catch((error) => {
        setModalNotification(false);
        setSmsError(true);
        console.log("Error: ", error);
      });
  }

  useEffect(() => {
    // setTimeout(() => {
    //   closeModalNotification();
    // }, 2000);
    // return () =>  clearTimeout(timer);
  }, []);

  console.log("Notification: ", modalNotification);

  return (
    <>
      <Modal
        isOpen={ModalIsOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        overlayClassName={styles.modal_overlay}
        className={styles.Modal_new_service}
      >
        <form
          className={styles.form}
          encType="multipart/form-data"
          onSubmit={handlerSubmit}
        >
          <button onClick={closeModal}>X</button>

          {/* <div className={styles.movie_info}>
            {smsError ? (
              <div className={styles.message_error}>
                <p>Preencha todos os campos correctamente!</p>
              </div>
            ) : (
              ""
            )}

            <div className={styles.form_image}>
              <img
                src={`https://api-streaming.onrender.com/uploads/${
                  data.service_id?.image || data.image
                }`}
                alt={data.service_id?.name || "Serviço"}
              />
            </div>

            <div className={styles.service_info}>
              <div className={styles.form_group}>
                <span>Serviço: {data.serviceName}</span>
              </div>

              <div className={styles.form_group}>
                <span>Preço: {data.servicePrice}</span>
              </div>

              <div className={styles.form_group}>
                <span>Duração: {data.serviceDuraction} dias</span>
              </div>
            </div>

            <label className={styles.label_image}>
              <MdOutlineAddToPhotos />
              <input
                style={{ display: "none" }}
                type="file"
                onChange={(e) => {
                  setInputFile(e.target.files[0].name);
                }}
                ref={ref}
              />

              <span>
                {inputFile === "" ? "Adicione um comprovativo" : inputFile}
              </span>
            </label>

            <div className={styles.btn_send}>
              <button type="submit" className="btn_default">
                Enviar
              </button>
            </div>
          </div> */}
        </form>
      </Modal>

      <Modal
        isOpen={modalNotification}
        onRequestClose={closeModalNotification}
        ariaHideApp={false}
        overlayClassName={styles.overlay_modal_notification}
        className={styles.modal_notification}
      >
        <button onClick={closeModalNotification}>X</button>
        <h2>A sua compra está pendente!</h2>
        <p>
          Lhe será enviado uma notificação, assim que o admin confirmar a sua
          compra
        </p>
        <Link href={"./filterPaymentClient"}>Ver pagamentos</Link>
      </Modal>
    </>
  );
}
