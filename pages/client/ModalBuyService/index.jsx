import Modal from "react-modal";

import Link from "next/link";

import Image from "next/image";

// import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

import FormData from "form-data";

// ICONS
import { AiFillCloseCircle } from "react-icons/ai";
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
  serviceName,
  serviceImage,
  serviceDuraction,
  serviceDateInit,
  serviceDateFinish,
  servicePrice,
  serviceCapacity,
}) {
  const [inputFile, setInputFile] = useState("");
  const [modalNotification, setModalNotification] = useState(false);


  const [smsError, setSmsError] = useState(false);

  const [viewerPDF, setViewerPDF] = useState(false);

  // MODAL NOTIFICATION SEND AFTER BUY SERVICE
  function openModalNotification() {
    setModalNotification(true);
  }
  function closeModalNotification() {
    setModalNotification(false);
  }

  const [serviceTotal, setServiceTotal] = useState("");

  const ref = useRef(null);

  const [pdfFile, setPdfFile] = useState(null);
  const [viewPdf, setViewPdf] = useState(null);

  const newplugin = defaultLayoutPlugin();

  const fileType = ["application/pdf"];
  function handleChangePdf(e) {
    let selectedFile = ref.current.files[0];
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onload = (e) => {
          setPdfFile(e.target.result);
        };
      } else {
        setPdfFile(null);
      }
    } else {
      console.log("Please select pdf");
    }

    console.log(selectedFile);
  }

  function handleSubmitPdf(e) {
    e.preventDefault();

    console.log("Hello! PDF");

    if (pdfFile !== null) {
      setViewPdf(pdfFile);
    } else {
      setPdfFile(pdfFile);
    }
  }


  async function handlerSubmit(e) {
    e.preventDefault();

    const user_id = localStorage.getItem("userId");

    const file = ref.current.files[0];

    const form = new FormData();
    form.append("pdf_purchasing", file);
    form.append("user_id", user_id);
    form.append("account_service_id", account_id);
    form.append("how_many_screen", serviceTotal);

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

  const updateFieldHandler = (key, value) => {
    setServiceTotal((prev) => {
      return { ...prev, [key]: value };
    });
  };

  const [modalCompravatiovo, setModalComprovativo] = useState(false);

  function openModalComprovativo() {
    setModalComprovativo(true);
  }
  function closeModalComprovativo() {
    setModalComprovativo(false);
  }

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
          <button onClick={closeModal}>
            <AiFillCloseCircle />
          </button>

          <div className={styles.movie_info}>
            {smsError ? (
              <div className={styles.message_error}>
                <p>Preencha todos os campos correctamente!</p>
              </div>
            ) : (
              ""
            )}

            <div className={styles.form_image}>
              <img
                src={`https://api-streaming.onrender.com/uploads/${serviceImage}`}
                alt={serviceName || "Serviço"}
              />
            </div>

            <div className={styles.info_01}>
              <div className={styles.profile}>
                <h4>Perfis:</h4>
                <span>{serviceCapacity}</span>
              </div>
              <div className={styles.price}>
                <h4>Preço total:</h4>
                <span>
                  {new Intl.NumberFormat("pt-AO", {
                    style: "currency",
                    currency: "AOA",
                  }).format(servicePrice)}
                </span>
              </div>
            </div>

            <div className={styles.data_bank}>
              <header>
                <h3>Dados bancários</h3>
              </header>
              <div>
                <div className={styles.data_bank_first}>
                  <div>
                    <h4>Nº de conta:</h4>
                    <span>Banco BAI</span>
                  </div>

                  <div>
                    <h4>Banco:</h4>
                    <span>Banco BAI</span>
                  </div>
                </div>

                <div>
                  <h4>IBAN:</h4>
                  <span>Banco BAI</span>
                </div>
              </div>
            </div>

            <div className={styles.data_payments}>
              <header>
                <h3>Dados de pagamentos</h3>
              </header>
              <div className={styles.data_payments_1}>
                <div>
                  <h4>Valor à pagar:</h4>
                  <span>
                    {new Intl.NumberFormat("pt-AO", {
                      style: "currency",
                      currency: "AOA",
                    }).format(servicePrice)}
                  </span>
                </div>
                <div>
                  <h4>Periódo:</h4>
                  <span>
                    {serviceDuraction} dias
                  </span>
                </div>
              </div>
              <div>
                <div>
                  <h4>Data de inicio:</h4>
                  <span>
                  {serviceDateInit}
                  </span>
                </div>
                <div>
                  <h4>Data de termino:</h4>
                  <span>
                    {serviceDateFinish}
                  </span>
                </div>
              </div>
            </div>

           <div className={styles.btn_view}>

            <label 
            className={`${styles.label_image}`}
            style={{ width: `${viewerPDF ? '90%' : '100%'}` }}
            >
              <MdOutlineAddToPhotos />
              <input

                style={{ display: "none", width: `${viewerPDF ? '90%' : '100%'}` }}
                type="file"
                onChange={(e) => {
                  setInputFile(e.target.files[0].name);
                  handleChangePdf(e);
                  setViewerPDF(true);
                }}
                ref={ref}
              />

              <span>
                {inputFile === "" ? "Adicione um comprovativo" : inputFile}
              </span>
            </label>
            {viewerPDF ? (
                <button
                  type="button"
                  className="btn_default"
                  onClick={(e) => {
                    openModalComprovativo();
                    handleSubmitPdf(e);
                  }}
                >
                  Visualizar
                </button>
              ) : (
                ""
              )}
           </div>

            <div className={styles.btn_send}>
              <button type="submit" className="btn_default">
                Enviar
              </button>
              <Modal
                isOpen={modalCompravatiovo}
                onRequestClose={closeModalComprovativo}
                ariaHideApp={false}
                overlayClassName={styles.overlay_modal_comprovativo}
                className={styles.modal_comprovativo}
              >
                <div className={styles.viewer_pdf}>
                  <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.3.122/build/pdf.worker.min.js">
                    {viewPdf && (
                      <>
                        <Viewer fileUrl={viewPdf} plugins={[newplugin]} />
                      </>
                    )}
                    {!viewPdf && <>No DPF</>}
                  </Worker>
                </div>
              </Modal>

             
            </div>
          </div>
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
