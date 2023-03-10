import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

// // PDF NEW METHOD

import { useState, useEffect, useRef } from "react";

// MOTION ANIMATIONS
import { motion } from "framer-motion";

// ASSETS
import { logo, netflix, pdf } from "../../../assets";

// ICONS
import { IoMdNotifications, IoIosWarning } from "react-icons/io";
import { RiErrorWarningFill } from "react-icons/ri";
import { AiFillCloseCircle } from 'react-icons/ai'


// COMPONENTS
import { Loader } from "../../../components/Loader";
import Skeleton from "../../../components/Skeleton";

import ViewPDF from "../../../components/ViewPDF";

// The path to `package.json` can be changed depending the path of current file
import packageJson from "../../../package.json";

import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

// MODAL
import Modal from "react-modal";

// STYLES
import styles from "./styles.module.scss";

// AXIOS
import { Api } from "../../../api/axios";
import PDF from "../../../components/ViewPDF/PDF";

export default function notification() {
  const [isOpen, setIsOpen] = useState(false);

  const [referenceId, setReferenceId] = useState("");
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");

  // Active state
  const [color, setColor] = useState(2);

  // FEEDBACK STATE
  const [feedback, setFeedback] = useState("");

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
  const [pdfImage, setPdfImage] = useState("");
  const [imageFile, setImageFile] = useState("");

  const [account, setAccount] = useState([]);
  const [clients, setClients] = useState([]);
  const [purchasedId, setPurchasedId] = useState("");
  const [accountId, setAccountId] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [pendent, setPendent] = useState(2);
  // const [accept, setAccept] = useState(1)

  const [payments, setPayments] = useState([]);

  const getPayments = () => {
    Api.get('/payments')
    .then((res) => {
      console.log('payments all : ', res.data.payments);
      setPayments(res.data.payments)
    })
    .catch((err) => console.log('error in get payments : ', err))
  }

  const [paymentAccetedId, setPaymentAccetedId] = useState('');
  console.log('Code reference id: ',paymentAccetedId)
  console.log('Code reference id 2: ',purchasedId)

  

  useEffect(() => {
    let permission = localStorage.getItem("permission");

    // PROTECT ROUTER URL
    if (
      permission == 0 ||
      permission == null ||
      permission == undefined ||
      permission == ""
    ) {
      navigate.push("/login");
      //window.location.reload()
    }

    if (permission == 2 || permission == 3) {
      navigate.push("/client/dashboard");
    }

    let token = localStorage.getItem("token");
    if (
      token == "Token inv??lido" ||
      token == "token n??o informado" ||
      token == "Token malformatado" ||
      token == "Erro no token"
    ) {
      navigate.push("/login");
    }

    getPayments();

    Api.get("all-account-services-of-the-user")
      .then((res) => {
        setComprovativos(res.data.accountServicesOfTheUser);
        console.log(res.data.accountServicesOfTheUser);
      })
      .catch((error) => console.log("Erro: ", error));

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


  const dataPayments = Object.values(payments)
  const msgExist = 'J?? existe um pagamento com esse n??mero de referencia!'
  function filterPayments(payments) {
    return payments.filter(item => {
      if(
        item.number_reference == referenceId
      ) {
        return item;
      }
    }) 
  }


  const acceptPayments = (e) => {

    Api.put(
      `/purchased-account-services/${purchasedId}/${accountId}/${serviceId}`,
      {
        accept: e,
        message: feedback,
        how_many_screen: 1,
      }
    )
      .then((res) => {

        if (res.data.accountServicesOfTheUser.accept == 3) {
          closeModal();
          window.location.reload(false);
        } else {
          Api.post(`payments/${res.data.accountServicesOfTheUser._id}`, {
            description: description,
            number_reference: referenceId,
            value: value,
          })
            .then((res) => {
              closeModal();
              window.location.reload(false);
            })
            .catch((error) => {
              console.log("Not Success: ", error);
            });
        }
        
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
            backgroundColor: `${color == 2 ? "#D81E5B" : "transparent"}`,
          }}
          onClick={() => {
            setPendent(2);
            setColor(2);
          }}
        >
          Pendentes
        </button>
        <button
          className={`btn_default ${color}`}
          style={{
            backgroundColor: `${color == 1 ? "#D81E5B" : "transparent"}`,
          }}
          onClick={() => {
            setPendent(1);
            setColor(1);
          }}
        >
          Aceites
        </button>
        <button
          className={`btn_default ${color}`}
          style={{
            backgroundColor: `${color == 3 ? "#D81E5B" : "transparent"}`,
          }}
          onClick={() => {
            setPendent(3);
            setColor(3);
          }}
        >
          Recusados
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
            <button className={styles.closeModal} onClick={closeModal}>
              <AiFillCloseCircle />
            </button>

            <div className={styles.image}>
              {imageFile === "image/png" ||
              imageFile === "image/jpeg" ||
              imageFile === "image/jpg" ? (
                <img
                  src={`https://api-streaming.onrender.com/uploads/${image}`}
                  alt={image}
                />
              ) : (
                <div>
                  <Link
                    className={styles.btn_download}
                    href={`https://api-streaming.onrender.com/uploads/${pdfImage}`}
                    target={"_blank"}
                  >
                    Baixar comprovativo
                  </Link>
                </div>
              )}
            </div>

            {pendent == 2 ? (
              <>
                <div className={styles.feedback}>
                  <div>
                    {
                      filterPayments(dataPayments).map((data) => {
                        return (
                          <h2 className={styles.alert_text}>{data != ''? (msgExist) : ''}</h2>
                        )
                      })
                    }
                  </div>
                  <div className={styles.form_group}>
                    <input
                      type={"text"}
                      value={referenceId}
                      placeholder="Id de refer??ncia"
                      onChange={(e) => {
                        setReferenceId(e.target.value);
                      }}
                      onKeyPress={(e) => {
                        setReferenceId(e.target.value);
                      }}
                    />
                    <input
                      type={"text"}
                      value={value}
                      placeholder="Valor do servi??o"
                      onChange={(e) => {
                        setValue(e.target.value);
                      }}
                    />
                  </div>
                  <textarea
                    placeholder="Digite uma descri????o da compra"
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  ></textarea>

                  <textarea
                    placeholder="Digite um feedback para o cliente"
                    value={feedback}
                    onChange={(e) => {
                      setFeedback(e.target.value);
                    }}
                  ></textarea>
                </div>

                <div className={styles.button_group}>
                  <button
                    className={`btn_default`}
                    onClick={() => {
                      acceptPayments(1);
                      // setModalComprovativoAlreadyExists(true)
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
              <>
                {
                  pendent == 1 ? (
                    <>
                    
                {
                  payments.map((item, key) => {
                    if(item.account_services_of_the_user_id._id == purchasedId) {
                      return (
                        <div key={key} className={styles.feedback_acceteds}>
                      <div className={styles.form_group}>
                        <div>
                          <label htmlFor="">Codigo de refer??ncia</label>
                          <span>{item.number_reference}</span>
                        </div>
                        <div>
                          <label htmlFor="">Valor ?? pagar</label>
                          <span>{item.value}</span>
                        </div>
                      </div>
                      <p>{item.description || 'Sem descri????o'}</p>
    
                      <p>{item.account_services_of_the_user_id.message || 'Sem feedback'}</p>
                    </div>
                      )
                    }
                  })
                }
                    </>
                  ) : <p>Baixe o comprovativo clicando no bot??o acima.</p>
                }
              </>
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
              {pendent == 2 ? (
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
                                    setPdfImage(data.pdf_purchasing);
                                    setPaymentAccetedId(data._id);
                                  }}
                                  key={index}
                                >
                                  {data.typeFile === "image/png" ||
                                  data.typeFile === "image/jpeg" ||
                                  data.typeFile === "image/jpg" ? (
                                    <img
                                      src={`https://api-streaming.onrender.com/uploads/${data.pdf_purchasing}`}
                                      alt={'Comprovativo de compra'}
                                    />
                                  ) : (
                                    <Image src={pdf} alt={pdf} className={styles.pdf_icon} />
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
                <>{
                  pendent == 1 ? (
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
                                      <Image src={pdf} alt={pdf} className={styles.pdf_icon} />
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
                  ) : ('')
                }

                {
                  pendent == 2 ? (
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
                                      <Image src={pdf} alt={pdf} className={styles.pdf_icon} />
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
                  ) : ('')
                }

{
                  pendent == 3? (
                    <>
                    {comprovativos.map((data, index) => {
                    if (data.accept == 3)
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
                                      <Image src={pdf} alt={pdf} className={styles.pdf_icon} />
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
                  ) : ('')
                }
                  
                </>
              )}
            </>
          )}
        </div>
      </section>

   
    </>
  );
}
