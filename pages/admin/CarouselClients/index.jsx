// NEXT JS
import Image from "next/image";
import styles from "./styles.module.scss";

// REACT
import { useEffect, useState, useRef } from "react";

// FRAMER MOTION
import { motion } from "framer-motion";

// MODAL
import Modal from "react-modal";

// ASSETS
import {
  netflix,
  movie01,
  movie02,
  movie03,
  movie04,
  movie05,
  sza,
} from "../../../assets/index";

// AXIOS API
import { Api, ApiMovies } from "../../../api/axios";
import axios from "axios";

export default function CarouselClients() {
  const [width, setWidth] = useState(0);
  const slider_wrapper = useRef();

  const [ourClients, setOurClients] = useState([]);
  const [myAccountServices, setMyAccountServices] = useState([]);
  const [services, setServices] = useState([]);
  const [ourClientId, setOurClientId] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  // Function open modal
  function modalIsOpen() {
    setIsOpen(true);
  }
  // Function close modal
  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    Api.get("/clients")
      .then((res) => {
        res.data.user;
        setOurClients(res.data.user);
      })
      .catch((error) => console.log("Erro: ", error));

    Api.get("/my-account-services")
      .then((res) => {
          res.data.accountServicesOfTheUser;
        setMyAccountServices(res.data.accountServicesOfTheUser);
      })
      .catch((error) => console.log("Erro: ", error));

    Api.get("/services")
      .then((res) => {
        res.data.services;
        setServices(res.data.services);
      })
      .catch((error) => console.log("Erro: ", error));

    setWidth(
      slider_wrapper.current.scrollWidth - slider_wrapper.current.offsetWidth
    );
  }, []);

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.slider_wrapper}
        ref={slider_wrapper}
        whileTap={{ cursor: "grabbing" }}
      >
        <motion.div
          className={styles.inner_carousel}
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
        >
          {ourClients.map((data, key) => {
            return (
              <motion.div
                className={styles.card}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.5 }}
                key={key}
                onClick={() => {
                  setOurClientId(data._id);
                  modalIsOpen();
                }}
              >
                <div className={styles.card_image}>
                  <img
                    src={`https://api-streaming.onrender.com/uploads/${data.photo_profile}`}
                    alt={data.name}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>

      {/* MODAL INFO CLIENT */}
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        overlayClassName={styles.modal_overlay}
        className={styles.modal_content}
      >
        {ourClients.map((data, key) => {
          if (data._id == ourClientId)
            return myAccountServices.map((i) => {
              if (i.user_id == data._id)
                return services.map((item) => {
                  if (i.service_id == item._id)
                    return (
                      <div key={key} className={styles.modal_clients}>
                        <img
                          src={`https://api-streaming.onrender.com/uploads/${data.photo_profile}`}
                          alt={data.name}
                        />
                        <div className={styles.name_clients}>
                          <h4>Nome:</h4>
                          <span>{data.name}</span>
                        </div>
                        <div className={styles.email_clients}>
                          <h4>Email:</h4>
                          <span>{data.email}</span>
                        </div>
                        <div className={styles.services_clients}>
                          <h4>Serviços:</h4>
                          <hr />
                          <div>
                            <Image
                              src={netflix}
                              alt="Serviços"
                              width={160}
                              height={160}
                            />
                            <Image
                              src={netflix}
                              alt="Serviços"
                              width={160}
                              height={160}
                            />
                            <Image
                              src={netflix}
                              alt="Serviços"
                              width={160}
                              height={160}
                            />
                            <Image
                              src={netflix}
                              alt="Serviços"
                              width={160}
                              height={160}
                            />
                          </div>
                        </div>
                        <div className={styles.btn_clients}>
                          <button
                            className={`${styles.btn_renovar} btn_default`}
                          >
                            Renovar
                          </button>
                          <button
                            className={`${styles.btn_delete} btn_default`}
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    );
                });
            });
        })}
      </Modal>
    </div>
  );
}
