import Modal from "react-modal";

import Link from "next/link";

import Image from "next/image";

// import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

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
  serviceName,
  serviceImage,
  serviceDuraction,
  servicePrice,
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

    console.log(selectedFile)
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
          <button onClick={closeModal}>X</button>

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

            <div className={styles.service_info}>
              <div className={styles.form_group}>
                <span>Serviço: {serviceName}</span>
              </div>

              <div className={styles.form_group}>
                <span>
                  Preço:
                  {new Intl.NumberFormat("pt-AO", {
                    style: "currency",
                    currency: "AOA",
                  }).format(servicePrice)}
                </span>
              </div>

              <div className={styles.form_group}>
                <span>Duração: {serviceDuraction} dias</span>
              </div>
            </div>

            <div className={styles.services_number}>
              <h4>Selecione quantos serviços deseja comprar:</h4>
              <div>
                <label htmlFor="option1">
                  <input
                    type="radio"
                    name="genero"
                    id="option1"
                    value="1"
                    checked={serviceTotal.step3 === "1"}
                    onChange={(event) =>
                      updateFieldHandler("step3", event.target.value)
                    }
                  />
                  <span>1</span>
                </label>
                <label htmlFor="option2">
                  <input
                    type="radio"
                    name="genero"
                    id="option2"
                    value="2"
                    checked={serviceTotal.step3 === "2"}
                    onChange={(event) =>
                      updateFieldHandler("step3", event.target.value)
                    }
                  />
                  <span>2</span>
                </label>
                <label htmlFor="option3">
                  <input
                    type="radio"
                    name="genero"
                    id="option3"
                    value="3"
                    checked={serviceTotal.step3 === "3"}
                    onChange={(event) =>
                      updateFieldHandler("step3", event.target.value)
                    }
                  />
                  <span>3</span>
                </label>
                <label htmlFor="option4">
                  <input
                    type="radio"
                    name="genero"
                    id="option4"
                    value="4"
                    checked={serviceTotal.step3 === "4"}
                    onChange={(event) =>
                      updateFieldHandler("step3", event.target.value)
                    }
                  />
                  <span>4</span>
                </label>
                <label htmlFor="option5">
                  <input
                    type="radio"
                    name="genero"
                    id="option5"
                    value="5"
                    checked={serviceTotal.step3 === "5"}
                    onChange={(event) =>
                      updateFieldHandler("step3", event.target.value)
                    }
                  />
                  <span>5</span>
                </label>
              </div>
            </div>

            <label className={styles.label_image}>
              <MdOutlineAddToPhotos />
              <input
                style={{ display: "none" }}
                type="file"
                onChange={(e) => {
                  setInputFile(e.target.files[0].name);
                  handleChangePdf(e)
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
              <Modal
                isOpen={modalCompravatiovo}
                onRequestClose={closeModalComprovativo}
                ariaHideApp={false}
              >
                <div className="viewer-pdf">
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
              <button
                type="button"
                className="btn_default"
                onClick={(e) => {
                  openModalComprovativo()
                  handleSubmitPdf(e)
                }}
              >
                Ver comprovativos
              </button>
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
