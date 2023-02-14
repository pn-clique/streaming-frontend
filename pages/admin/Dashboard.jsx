import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { useState, useEffect, useRef } from "react";

// OTHERS
import FormData from "form-data";

// MOTION ANIMATIONS
import { motion } from "framer-motion";

// ASSETS
import { logo, netflix } from "../../assets";

// COMPONENTS
import { Loader } from "../../components/Loader";

// STYLES
import styles from "./styles.module.scss";

import { services, statistics } from "../../dataAPI/DataAdmin/Datas";
import ModalNewService from "./ModalNewService";
import ModalAddAccountService from "./ModalAddAccountService";
import ModalEditAccountService from "./ModalEditAccountService";
import { Api } from "../../api/axios";
import { CarouselClients } from "./CarouselClients";
import ModalEditionService from "./ModalEditionService";

export default function Dashboard() {
  function handlerDeleteService(id) {
    Api.delete(`services/${id}`)
      .then((res) => {
        console.log(res.data.message);

        window.location.reload();
      })
      .catch((error) => console.log("Erro: ", error));
  }

  function handlerDeleteAccountService(id) {
    Api.delete(`account-service/${id}`)
      .then((res) => {
        console.log('delete account services : ', res.data.message);

        window.location.reload();
      })
      .catch((error) => console.log("Erro in delete account: ", error));
  }

  const [isLoader, setIsLoader] = useState(true);
  const [serviceId, setServiceId] = useState("");
  const [accountServiceId, setAccountServiceId] = useState("");

  const navigate = useRouter();

  const [ourClientsLength, setOurClientsLength] = useState(0);
  const [ourPartnersLength, setOurPartnersLength] = useState(0);
  const [ourService, setOurService] = useState([]);
  const [ourServiceLength, setOurServiceLength] = useState(0);
  const [ourAccountServices, setAccountOurServices] = useState([]);
  const [ourAccountServicesLength, setAccountOurServicesLength] = useState(0);

  useEffect(() => {
    Api.get("/services")
      .then((res) => {
         setOurService(res.data.services);
          setOurServiceLength(res.data.services.length)})
      .catch((error) => console.log("Erro: ", error));

    Api.get("/account-service")
      .then((res) => {
        console.log("account-services : ", res.data.accountServices);
        setAccountOurServices(res.data.accountServices);
        setAccountOurServicesLength(res.data.accountServices.length)
      })
      .catch((error) => console.log("Erro: ", error));

      Api.get("/clients")
      .then((res) => {
        console.log("clients : ", res.data.user);
        setOurClientsLength(res.data.user.length)
      })
      .catch((error) => console.log("Erro: ", error));

      Api.get("/partners")
      .then((res) => {
        console.log("partners : ", res.data.user);
        setOurPartnersLength(res.data.user.length)
      })
      .catch((error) => console.log("Erro: ", error));

    setTimeout(() => {
      setIsLoader(false);
    }, 2000);

  }, []);

  const [ModalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpenAccount, setModalIsOpenAccount] = useState(false);
  const [modalEditionServiceIsOpen, setModalEditionServiceIsOpen] = useState(false);
  const [modalEditionAccountServiceIsOpen, setModalEditionAccountServiceIsOpen] = useState(false)

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

  function openEditionService() {
    console.log("servies id : ", serviceId);
    setModalEditionServiceIsOpen(true);
  }

  function openEditionAccountService() {
    setModalEditionServiceIsOpen(true);
  }

  function handlerLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("permission");

    navigate.push("/Login");
  }

  if (isLoader) {
    return <Loader />;
  }

  return (
    <>
      <header className={styles.header_nav}>
        <div>
          <Link href={"/"}>
            <Image src={logo} alt="PN Clique logo" className={styles.logo} />
          </Link>
          <nav>
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
              <span>{ourClientsLength}</span>
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

      <section className={styles.services}>
        <div>
          <header>
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
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
          <div>
            {ourService.map((service) => (
              <motion.div
                className={styles.card}
                initial={{ y: 200, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
                key={service.name}
              >
                <div>
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
                    setModalEditionServiceIsOpen={setModalEditionServiceIsOpen}
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
                    onClick={() => handlerDeleteService(service._id)}
                  >
                    Apagar
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
          <button className="btn_default">Mostrar mais serviços</button>
        </div>
      </section>

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
          <div>
            {ourAccountServices.map((data, key) => {
              return (
                <div key={key} className={styles.card}>
                  <div>
                    <img
                      src={`https://api-streaming.onrender.com/uploads/${data.service_id.image}`}
                      alt={data.count_service_email}
                      
                    />
                    <span>{data.count_service_email}</span>
                  </div>
                  <ModalEditAccountService
                    ModalIsOpen={modalEditionAccountServiceIsOpen}
                    closeModal={!modalEditionAccountServiceIsOpen}
                    accountServiceId={accountServiceId}
                    setAccountServiceId={setAccountServiceId}
                    modalEditionAccountServiceIsOpen={modalEditionAccountServiceIsOpen}
                    setModalEditionAccountServiceIsOpen={setModalEditionAccountServiceIsOpen}
                  />
                  <div className={styles.button_group}>
                    <button
                     type="button"
                      className="btn_default"
                      onClick={() => {
                        setAccountServiceId(data._id);
                        openEditionAccountService();
                      }}>
                      Editar
                    </button>
                    <button
                     type="button"
                      className="btn_default"
                      onClick={() => handlerDeleteAccountService(data._id)}>
                      Apagar
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <button className="btn_default">
            Mostrar mais conta de serviços
          </button>
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
              <motion.h2>Nossos clientes</motion.h2>
              <div></div>
            </motion.div>
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
