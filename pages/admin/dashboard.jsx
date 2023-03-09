import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { useState, useEffect, useRef } from "react";

// OTHERS
import FormData from "form-data";

// MOTION ANIMATIONS
import { motion } from "framer-motion";

// ASSETS
import { logo, default_image } from "../../assets";

// ICONS
import { IoMdNotifications } from "react-icons/io";

// COMPONENTS
import { Loader } from "../../components/Loader";

// STYLES
import styles from "./styles.module.scss";

// MODAL
import Modal from "react-modal";

// Skeleton
import Skeleton from "../../components/Skeleton";

import { services, statistics } from "../../dataAPI/DataAdmin/Datas";
import ModalNewService from "./ModalNewService";
import ModalAddAccountService from "./ModalAddAccountService";
import ModalEditAccountService from "./ModalEditAccountService";
import { Api } from "../../api/axios";
import CarouselClients from "./CarouselClients";
import ModalEditionService from "./ModalEditionService";
import ModalInfAccountService from "./ModalInfAccountService";
import ModalInfoService from "./ModalInfoService";

export default function Dashboard() {
  function handlerDeleteService(id) {
    Api.delete(`services/${id}`)
      .then((res) => {
        // console.log(res.data.message);

        window.location.reload();
        closeModal();
      })
      .catch((error) => console.log("Erro: ", error));
  }

  function verifyDayAccount() {
    Api.get('/account-service-exhausted')
    .then(res => res)
    .catch(error => console.log('Erro: ', error))
  }

  function verifyAccountDuplicate() {
    Api.get('/account-service-reverte-duplicate')
    .then(res => res)
    .catch(error => console.log('Erro: ', error))
  }

  function verifyTimeExcedidAccount() {
    Api.get('/account-service-of-the-user-time-out-excedid')
    .then(res => res)
    .catch(error => console.log('Erro: ', error))
  }

  function handlerDeleteAccountService(id) {
    Api.delete(`account-service/${id}`)
      .then((res) => {
        // console.log("delete account services : ", res.data.message);

        window.location.reload();
      })
      .catch((error) => console.log("Erro in delete account: ", error));
  }



  const [isLoader, setIsLoader] = useState(true);
  const [serviceId, setServiceId] = useState("");
  const [accountServiceId, setAccountServiceId] = useState("");

  const navigate = useRouter();

  const [ourClientsLength, setOurClientsLength] = useState([]);
  const [ourPartnersLength, setOurPartnersLength] = useState(0);
  const [ourService, setOurService] = useState([]);
  const [ourServiceLength, setOurServiceLength] = useState(0);
  const [ourAccountServices, setAccountOurServices] = useState([]);
  const [ourAccountServicesLength, setAccountOurServicesLength] = useState(0);


  const [newPayments, setNewPayments] = useState([])

  function payments() {
    Api.get('all-account-services-of-the-user')
    .then(res => {
      var arr = [];
      res.data.accountServicesOfTheUser.forEach(element => {
        if (element.newPayments != 0) {
          // console.log('news payments into if : ', element.length)
          arr.push(element);
        }
      });
      setNewPayments(arr.length);
      // console.log('Data: ', res.data.accountServicesOfTheUser);
      // console.log('Data Array : ', arr);
    })
    .catch(error => console.log('Erro: ', error));
  }


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
    if (token == 'Token inválido' || token == 'token não informado' || token == 'Token malformatado' || token == 'Erro no token') {
      navigate.push("/login");
    }

    setTimeout(() => {
      verifyDayAccount()
      // verifyAccountDuplicate()
      verifyTimeExcedidAccount()
    }, 86400000)

    payments()
    //filterPayments(dataPayments)

    Api.get("/services")
      .then((res) => {
        setOurService(res.data.services);
        setOurServiceLength(res.data.services.length);
      })
      .catch((error) => console.log("Erro: ", error));

    Api.get("/top-five-account-services")
      .then((res) => {
        // console.log("account-services : ", res.data.accountServices);
        setAccountOurServices(res.data.accountServices);
        setAccountOurServicesLength(res.data.accountServices.length);
      })
      .catch((error) => console.log("Erro: ", error));

    Api.get("/clients")
      .then((res) => {
        // console.log("clients : ", res.data.user);
        setOurClientsLength(res.data.user);
      })
      .catch((error) => console.log("Erro: ", error));

    Api.get("/partners")
      .then((res) => {
        setOurPartnersLength(res.data.user.length);
      })
      .catch((error) => console.log("Erro: ", error));

    setTimeout(() => {
      setIsLoader(false);
    }, 2000);
  }, [newPayments]);

  const [ModalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpenAccount, setModalIsOpenAccount] = useState(false);
  const [modalEditionServiceIsOpen, setModalEditionServiceIsOpen] =
    useState(false);
  const [
    modalEditionAccountServiceIsOpen,
    setModalEditionAccountServiceIsOpen,
  ] = useState(false);

  function openModal() {
    setModalIsOpen(true);
  }
  function closeModal() {
    setModalIsOpen(false);
  }

  function openModalAccount() {
    setModalIsOpenAccount(true);
  }
  function closeModalAccount() {
    setModalIsOpenAccount(false);
  }

  // MODAL EDIT SERVICE
  function openEditionService() {
    console.log("servies id : ", serviceId);
    setModalEditionServiceIsOpen(true);
  }

  function openEditionAccountService() {
    setModalEditionAccountServiceIsOpen(true);
  }

  // MODAL SERVICE
  const [modalInfoService, setModalInfoService] = useState(false);

  const [accountId, setAccountId] = useState("");

  function openModalInfoService() {
    setModalInfoService(true);
  }

  function closeModalInfoService() {
    setModalInfoService(false);
  }

  // MODAL ACCOUNT SERVICE
  const [modalInfoAccount, setModalInfoAccount] = useState(false);

  function openModalInfoAccount() {
    setModalInfoAccount(true);
  }

  function closeModalInfoAccount() {
    setModalInfoAccount(false);
  }

  const [modalDeleteAccountService, setModalDeleteAccountService] =
    useState(false);
  // FUNCTIONS DELETE ACCOUNT SERVICES
  function openModalDeleteAccountService() {
    setModalDeleteAccountService(true);
  }
  function closeModalDeleteAccountService() {
    setModalDeleteAccountService(false);
  }



  // FUNCTION CONFIRM DELETE ACCOUNT SERVICE
  const [deleteAccount, setDeleteAccount] = useState("");
  const [image, setImage] = useState("");
  const [serviceName, setServiceName] = useState("");

  function handlerDeleteAccountService() {
    Api.delete(`account-service/${deleteAccount}`)
      .then((res) => {
        console.log("delete account services : ", res.data.message);
        closeModal();
        window.location.reload();
      })
      .catch((error) => console.log("Erro in delete account: ", error));
  }

  // FUNCTION LOGOUT
  function handlerLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("permission");

    navigate.push("/login");
  }


  if (isLoader) {
    return <Loader />;
  }
  // key
  return (
    <>
      <header className={styles.header_nav}>
        <div>
          <Link href={"/"}>
            <Image src={logo} alt="PN Clique logo" className={styles.logo} />
          </Link>
          <nav>
            <Link
              href={"./notification"}
              className={`btn_default ${styles.notification}`}
            >
              <IoMdNotifications />
              <span >
              {
                newPayments
              }
              </span>
            </Link>
            <button
              onClick={handlerLogout}
              className={"btn_default"}
              type="button"
            >
              Terminar sessão
            </button>
          </nav>
        </div>
      </header>

      <section className={styles.statistics}>
        <div>
          <motion.div
            initial={{ y2: -100, opacity: 0, scale: 0, skewY: 5 }}
            animate={{ x: 0, opacity: 1, scale: 1, skewY: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <h4>Serviços</h4>
            <span>{ourServiceLength}</span>
          </motion.div>
          <motion.div
            initial={{ y2: -100, opacity: 0, scale: 0, skewY: 5 }}
            animate={{ x: 0, opacity: 1, scale: 1, skewY: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <h4>Contas de serviço</h4>
            <span>{ourAccountServicesLength}</span>
          </motion.div>
          <motion.div
            initial={{ y2: -100, opacity: 0, scale: 0, skewY: 5 }}
            animate={{ x: 0, opacity: 1, scale: 1, skewY: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <h4>Clientes</h4>
            <span>{ourClientsLength.length}</span>
          </motion.div>
          <motion.div
            initial={{ y2: -100, opacity: 0, scale: 0, skewY: 5 }}
            animate={{ x: 0, opacity: 1, scale: 1, skewY: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <h4>Parceiros</h4>
            <span>{ourPartnersLength}</span>
          </motion.div>
        </div>
      </section>

      {/* SERVICE */}
      <section className={styles.services}>
        <div>
          <header>
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <ModalInfoService
                isOpen={modalInfoService}
                closeModal={closeModalInfoService}
                serviceId={serviceId}
                setServiceId={setServiceId}
              />
              <motion.h2>Nossos serviços</motion.h2>
              <div></div>
            </motion.div>
            <ModalNewService
              ModalIsOpen={ModalIsOpen}
              closeModal={closeModal}
            />
            <motion.button
              onClick={openModal}
              className="btn_default"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Adicionar serviço
            </motion.button>
          </header>
          {ourService == "" ? (
            <div className={styles.container_skeleton}>
              <Skeleton width={"100%"} height={50} borderRadius={"0.25rem"} />
              <Skeleton width={"100%"} height={50} borderRadius={"0.25rem"} />
              <Skeleton width={"100%"} height={50} borderRadius={"0.25rem"} />
              <Skeleton width={"100%"} height={50} borderRadius={"0.25rem"} />
            </div>
          ) : (
            <div className={styles.container_service}>
              {ourService.map((service) => (
                <motion.div
                  className={styles.card}
                  initial={{ y: 200, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1 }}
                  key={service.name}
                >
                  <div
                    onClick={(e) => {
                      openModalInfoService();
                      setServiceId(service._id);
                    }}
                  >
                    
                        <img
                      src={`https://api-streaming.onrender.com/uploads/${service.image}`}
                      alt={service.name}
                    />
                    <span>{service.name}</span>
                  </div>
                  <div className={styles.button_group}>
                    <ModalEditionService
                      ModalIsOpen={modalEditionServiceIsOpen}
                      closeModal={!modalEditionServiceIsOpen}
                      serviceId={serviceId}
                      setServiceId={setServiceId}
                      modalEditionServiceIsOpen={modalEditionServiceIsOpen}
                      setModalEditionServiceIsOpen={
                        setModalEditionServiceIsOpen
                      }
                    />
                    <button
                      type="button"
                      className="btn_default"
                      onClick={() => {
                        setServiceId(service._id);
                        openEditionService();
                      }}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      className="btn_default"
                      onClick={() => { navigate.push({
                        pathname: '/admin/servicesFilter',
                        query: { serviceId: service._id, results: true, serviceName: service.name }
                      }) } }
                    >
                      Ver contas
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <button type="button" className="btn_default">
            Mostrar mais serviços
          </button>
        </div>
      </section>

      {/* ACCOUNT SERVICE */}
      <section className={styles.services}>
        <div>
          <header>
            <div>
              <h2>Conta de serviços</h2>
              <div></div>
            </div>
            <ModalAddAccountService
              ModalIsOpen={modalIsOpenAccount}
              closeModal={closeModalAccount}
            />
            <button onClick={openModalAccount} className={"btn_default"}>
              Adicionar conta de serviço
            </button>
          </header>
          {ourAccountServices == "" ? (
            <div className={styles.container_skeleton}>
              <Skeleton width={"100%"} height={50} borderRadius={"0.25rem"} />
              <Skeleton width={"100%"} height={50} borderRadius={"0.25rem"} />
              <Skeleton width={"100%"} height={50} borderRadius={"0.25rem"} />
              <Skeleton width={"100%"} height={50} borderRadius={"0.25rem"} />
            </div>
          ) : (
            <div>
              <ModalInfAccountService
                isOpen={modalInfoAccount}
                closeModal={closeModalInfoAccount}
                accountId={accountId}
                setAccountId={setAccountId}
              />
              {ourAccountServices.map((data) => {
                return (
                  <div key={data._id} className={styles.card}>
                    <div
                      onClick={() => {
                        openModalInfoAccount();
                        setAccountId(data._id);
                      }}
                    >
                      <img
                        src={`https://api-streaming.onrender.com/uploads/${data.service_id.image}`}
                        alt={data.service_id.name}
                      />
                      <span>{data.service_id.name}</span>
                    </div>
                    <ModalEditAccountService
                      ModalIsOpen={modalEditionAccountServiceIsOpen}
                      closeModal={!modalEditionAccountServiceIsOpen}
                      accountServiceId={accountServiceId}
                      setAccountServiceId={setAccountServiceId}
                      modalEditionAccountServiceIsOpen={
                        modalEditionAccountServiceIsOpen
                      }
                      setModalEditionAccountServiceIsOpen={
                        setModalEditionAccountServiceIsOpen
                      }
                    />
                    <div className={styles.button_group}>
                      <button
                        type="button"
                        className="btn_default"
                        onClick={() => {
                          setAccountServiceId(data._id);
                          openEditionAccountService();
                        }}
                      >
                        Editar
                      </button>

                      <Modal
                        isOpen={modalDeleteAccountService}
                        onRequestClose={closeModalDeleteAccountService}
                        ariaHideApp={false}
                        className={styles.modal_delete}
                        overlayClassName={styles.modal_delete_overlay}
                      >
                        <img
                          src={`https://api-streaming.onrender.com/uploads/${image}`}
                          alt={image}
                        />
                        <p>{serviceName}</p>
                        <span>
                          Tem a certeza que deseja eliminar este cliente?
                        </span>
                        <div className={styles.button_group}>
                          <button
                            className={`btn_default ${styles.btn_delete}`}
                            onClick={() => {
                              handlerDeleteAccountService(data._id);
                            }}
                          >
                            Confirmar
                          </button>
                        </div>
                      </Modal>

                      <button
                        type="button"
                        className="btn_default"
                        onClick={() => {
                          openModalDeleteAccountService();
                          setImage(data.service_id.image);
                          setServiceName(data.service_id.name);
                          setDeleteAccount(data._id);
                        }}
                      >
                        Apagar
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <Link href={"./accountServicesFilter"} className="btn_default">
            Mostrar contas de serviços
          </Link>
        </div>
      </section>

      <section className={styles.clients}>
        <div>
          <header>
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2>Nossos clientes</h2>
              <div></div>
            </motion.div>

            <Link className={"btn_default"} href={"./clientsFilter"}>
              Mostrar todos clientes
            </Link>

            <ModalNewService
              ModalIsOpen={ModalIsOpen}
              closeModal={closeModal}
            />
          </header>
          <CarouselClients />
        </div>
      </section>
    </>
  );
}
