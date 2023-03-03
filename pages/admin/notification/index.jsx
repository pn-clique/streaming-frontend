import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

// Core viewer
import { Viewer } from '@react-pdf-viewer/core';

// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';



// Create new plugin instance
// const defaultLayoutPluginInstance = defaultLayoutPlugin();



// // PDF NEW METHOD


// PDF
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

import { useState, useEffect, useRef } from "react";

// MOTION ANIMATIONS
import { motion } from "framer-motion";

// ASSETS
import { logo, netflix, comprovativo01 } from "../../../assets";

// ICONS
import { IoMdNotifications, IoIosNotifications } from "react-icons/io";

// COMPONENTS
import { Loader } from "../../../components/Loader";
import Skeleton from "../../../components/Skeleton";


import ViewPDF from "../../../components/ViewPDF";

// MODAL
import Modal from "react-modal";

// STYLES
import styles from "./styles.module.scss";

// AXIOS
import { Api } from "../../../api/axios";

export default function notification() {
  const [isOpen, setIsOpen] = useState(false);

  
  const [referenceId, setReferenceId] = useState('')
  const [value, setValue] = useState('')
  const [description, setDescription] = useState('')



  // Active state
  const [color, setColor] = useState(true);

  // FEEDBACK STATE
  const [feedback, setFeedback] = useState('')

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const [numPage, setNumPage] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSucess({ numPage }) {
    setNumPage(numPage);
  }

  const [comprovativos, setComprovativos] = useState([]);

  const [image, setImage] = useState("");
  const [pdfImage, setPdfImage] = useState('')
  const [imageFile, setImageFile] = useState("");

  const [account, setAccount] = useState([]);
  const [clients, setClients] = useState([]);
  const [purchasedId, setPurchasedId] = useState("");
  const [accountId, setAccountId] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [pendent, setPendent] = useState(true);
  // const [accept, setAccept] = useState(1)



  useEffect(() => {

    let token = localStorage.getItem("token");
    if (token == 'Token inválido' || token == 'token não informado' || token == 'Token malformatado' || token == 'Erro no token') {
      navigate.push("/login");
    }

    Api.get("all-account-services-of-the-user")
      .then((res) => {
        setComprovativos(res.data.accountServicesOfTheUser);
        console.log(res.data.accountServicesOfTheUser);
      })
      .catch((error) => console.log("Erro: ", error));

     // downloadPDF();

    Api.get("account-service")
      .then((res) => {
        console.log(res.data.accountServices);
        setAccount(res.data.accountServices);
      })
      .catch((err) => console.log(err));

    Api.get("clients")
      .then((res) => {
        setClients(res.data.user);
        console.log(res.data.user);
      })
      .catch((error) => console.log("Erro: ", error));
  }, []);

  const acceptPayments = (e) => {
    console.log("params : ", e);
    console.log("message : ", feedback);

    Api.put(
      `/purchased-account-services/${purchasedId}/${accountId}/${serviceId}`,
      {
        accept: e, message: feedback, how_many_screen: 1
      }
    )
      .then((res) => {
        console.log("sucess : ", res.data);

        Api.post(`payments/${res.data.accountServicesOfTheUser._id}`, {
          description: description, number_reference: referenceId, value: value
        }).then(res => {
          console.log('Success: ', res.data);
          closeModal();
          window.location.reload(false);
        })
        .catch(error => {
          console.log('Not Success: ', error)
        })

      })
      .catch((error) => {
        console.log("error : ", error);
      });
  };
  return (
    <>
      <header className={styles.header_nav}>
        <div>
          <Link href={"/"}>
            <Image src={logo} alt="PN Clique logo" className={styles.logo} />
          </Link>
          <nav>
            <Link href={"./dashboard"} className={"btn_default"} type="button">
              Dashboard
            </Link>
          </nav>
        </div>
      </header>

      <div className={styles.btn_options}>
        <button
          className={`btn_default ${color}`}
          style={{
            backgroundColor: `${color == true ? "#D81E5B" : " "}`,
          }}
          onClick={() => {
            setPendent(true);
            setColor(true);
          }}
        >
          Pendentes
        </button>
        <button
          className="btn_default"
          style={{
            backgroundColor: `${color == false ? "#D81E5B" : " "}`,
          }}
          onClick={() => {
            setPendent(false);
            setColor(true);
          }}
        >
          Aceites
        </button>
      </div>

      <section className={styles.comprovativos}>
        <div className={styles.container}>
          <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            ariaHideApp={false}
            className={styles.modal}
            overlayClassName={styles.overlay}
          >
            <div className={styles.image}>
              {imageFile === "image/png" ||
              imageFile === "image/jpeg" ||
              imageFile === "image/jpg" ? (
                <img
                  src={`https://api-streaming.onrender.com/uploads/${image}`}
                  alt={image}
                />
              ) : (
                // <div>
                //   <Document
                //     file={`https://api-streaming.onrender.com/uploads/${image}`}
                //     onLoadSuccess={onDocumentLoadSucess}
                //   >
                //     <Page pageNumber={pageNumber}></Page>
                //   </Document>
                //   <p>
                //     Page {pageNumber} of {numPage}{" "}
                //   </p>
                // </div>

                <div>

                  <h4>PDF File</h4>

                  <Link
                      href={`https://api-streaming.onrender.com/uploads/${pdfImage}`} 
                      target={'_blank'} 
                    >
                    <Viewer fileUrl={`https://api-streaming.onrender.com/uploads/${pdfImage}`} />
                    </Link>

          
              </div>
              )}
            </div>

            {pendent ? (
              <>
                <div className={styles.feedback}>
                  <div className={styles.form_group}>
                  <input 
                  type={'text'} 
                  value={referenceId} 
                  placeholder="Id de referência" 
                  
                  onChange={(e) => {
                    setReferenceId(e.target.value)
                  }} 
                  />
                  <input 
                  type={'text'} 
                  value={value} 
                  placeholder="Valor do serviço" 
                  
                  onChange={(e) => {
                    setValue(e.target.value)
                  }} 
                  />
                  </div>
                  <textarea
                   placeholder="Digite uma descrição da compra"
                   value={description}
                   onChange={(e) => {
                    setDescription(e.target.value)
                   }}
                   ></textarea>

                    <textarea
                   placeholder="Digite um feedback para o cliente"
                   value={feedback}
                   onChange={(e) => {
                    setFeedback(e.target.value)
                   }}
                   ></textarea>
                </div>

                <div className={styles.button_group}>
                  <button
                    className={`btn_default`}
                    onClick={() => {
                      acceptPayments(1);
                    }}
                  >
                    Aceitar
                  </button>
                  <button
                    className={`btn_default ${styles.btn_recusar}`}
                    onClick={() => {
                      //setAccept(0)
                      acceptPayments(3);
                    }}
                  >
                    Recusar
                  </button>
                </div>
              </>
            ) : (
              ""
            )}
          </Modal>

          {comprovativos == "" ? (
            <div className={styles.container_skeleton}>
              <Skeleton width={220} height={200} borderRadius={"0.25rem"} />
              <Skeleton width={220} height={200} borderRadius={"0.25rem"} />
              <Skeleton width={220} height={200} borderRadius={"0.25rem"} />
              <Skeleton width={220} height={200} borderRadius={"0.25rem"} />
            </div>
          ) : (
            <>
              {pendent == true ? (
                <>
                  {comprovativos.map((data, index) => {
                    if (data.accept == 2)
                      return account.map((account) => {
                        if (data.account_service_id?._id == account._id) {
                          return clients.map((client) => {
                            if (data.user_id?._id == client._id) {
                              return (
                                <div
                                  className={styles.comprovativo}
                                  onClick={() => {
                                    openModal();
                                    setPurchasedId(data._id);
                                    setAccountId(account._id);
                                    setServiceId(account.service_id._id);
                                    setImage(data.pdf_purchasing);
                                    setImageFile(data.typeFile);
                                    setPdfImage(data.pdf_purchasing)
                                  }}
                                  key={index}
                                >
                                  {data.typeFile === "image/png" ||
                                  data.typeFile === "image/jpeg" ||
                                  data.typeFile === "image/jpg" ? (
                                    <img
                                      src={`https://api-streaming.onrender.com/uploads/${data.pdf_purchasing}`}
                                      alt={data.pdf_purchasing}
                                    />
                                  ) : (
                                    <Link
                                      href={`https://api-streaming.onrender.com/uploads/${data.pdf_purchasing}`} 
                                      target={'_blank'} 
                                    >
                                      <Document
                                        file={`https://api-streaming.onrender.com/uploads/${data.pdf_purchasing}`}
                                        onLoadSuccess={onDocumentLoadSucess}
                                      >
                                        <Page pageNumber={pageNumber} />
                                      </Document>
                                      <p>
                                        Page {pageNumber} of {numPage}{" "}
                                      </p>
                                    </Link>
                                  )}
                                  <header>
                                    <h4>{client.name}</h4>
                                    <span>{account.service_id.name}</span>
                                    <span>
                                      {new Intl.DateTimeFormat("pt-BR").format(
                                        new Date(data.createdAt)
                                      )}
                                    </span>
                                  </header>
                                </div>
                              );
                            }
                          });
                        }
                      });
                  })}
                </>
              ) : (
                <>
                  {comprovativos.map((data, index) => {
                    if (data.accept == 1)
                      return account.map((account) => {
                        if (data.account_service_id?._id == account._id) {
                          return clients.map((client) => {
                            if (data.user_id?._id == client._id) {
                              return (
                                <div
                                  className={styles.comprovativo}
                                  onClick={() => {
                                    openModal();
                                    setPurchasedId(data._id);
                                    setAccountId(account._id);
                                    setServiceId(account.service_id._id);
                                    setImage(data.pdf_purchasing);
                                    setImageFile(data.typeFile);
                                  }}
                                  key={index}
                                >
                                  {data.typeFile === "image/png" ||
                                  data.typeFile === "image/jpeg" ||
                                  data.typeFile === "image/jpg" ? (
                                    <img
                                      src={`https://api-streaming.onrender.com/uploads/${data.pdf_purchasing}`}
                                      alt={data.pdf_purchasing}
                                    />
                                  ) : (
                                    <div>
                                      {/* <Document
                                        file={`https://api-streaming.onrender.com/uploads/${data.pdf_purchasing}`}
                                        onLoadSuccess={onDocumentLoadSucess}
                                      >
                                        <Page pageNumber={pageNumber} />
                                      </Document> */}
                                      <h4>PDF File</h4>
                                      <p>
                                        Page {pageNumber} of {numPage}
                                      </p>
                                    </div>
                                  )}
                                  <header>
                                    <h4>{data.name}</h4>
                                    <span>
                                      {new Intl.DateTimeFormat("pt-BR").format(
                                        new Date(data.createdAt)
                                      )}
                                    </span>
                                    <span>{client.name}</span>
                                    <span>{account.service_id.name}</span>
                                  </header>
                                </div>
                              );
                            }
                          });
                        }
                      });
                  })}
                </>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
