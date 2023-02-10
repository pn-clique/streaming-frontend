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
import { Api } from "../../api/axios";

export default function Dashboard() {
  const [isLoader, setIsLoader] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoader(false);
    }, 2000);
  }, []);

  const [ModalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpenAccount, setModalIsOpenAccount] = useState(false);

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
          {statistics.map((stat) => (
            <motion.div
              initial={{ y2: -100, opacity: 0, scale: 0, skewY: 5 }}
              animate={{ x: 0, opacity: 1, scale: 1, skewY: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              key={stat.id}
            >
              <h4>{stat.type}</h4>
              <span>{stat.value}</span>
            </motion.div>
          ))}
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
            {services.map((service) => (
              <motion.div
                className={styles.card}
                initial={{ y: 200, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
                key={service.id}
              >
                <div>
                  <Image src={service.image} alt={service.name} />
                  <span>{service.name}</span>
                </div>
                <div className={styles.button_group}>
                  <button type="button" className="btn_default">
                    Editar
                  </button>
                  <button type="button" className="btn_default">
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
            <button 
              onClick={openModalAccount}
              className={'btn_default'}
              >
              Adicionar conta de serviço
            </button>
          </header>
          <div>
            <div className={styles.card}>
              <div>
                <Image src={netflix} alt="Netflix" />
                <span>Netflix</span>
              </div>
              <div className={styles.button_group}>
                <button type="button" className="btn_default">
                  Editar
                </button>
                <button type="button" className="btn_default">
                  Apagar
                </button>
              </div>
            </div>
            <div className={styles.card}>
              <div>
                <Image src={netflix} alt="Netflix" />
                <span>Netflix</span>
              </div>
              <div className={styles.button_group}>
                <button type="button" className="btn_default">
                  Editar
                </button>
                <button type="button" className="btn_default">
                  Apagar
                </button>
              </div>
            </div>
            <div className={styles.card}>
              <div>
                <Image src={netflix} alt="Netflix" />
                <span>Netflix</span>
              </div>
              <div className={styles.button_group}>
                <button type="button" className="btn_default">
                  Editar
                </button>
                <button type="button" className="btn_default">
                  Apagar
                </button>
              </div>
            </div>
            <div className={styles.card}>
              <div>
                <Image src={netflix} alt="Netflix" />
                <span>Netflix</span>
              </div>
              <div className={styles.button_group}>
                <button type="button" className="btn_default">
                  Editar
                </button>
                <button type="button" className="btn_default">
                  Apagar
                </button>
              </div>
            </div>
          </div>
          <button className="btn_default">
            Mostrar mais conta de serviços
          </button>
        </div>
      </section>
    </>
  );
}
