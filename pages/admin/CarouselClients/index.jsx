// NEXT JS
import Image from "next/image";
import styles from "./styles.module.scss";

// REACT
import { useEffect, useState, useRef } from "react";

// FRAMER MOTION
import { motion } from "framer-motion";

// MODAL
import Modal from "react-modal";

// Skeleton
import Skeleton from "../../../components/Skeleton";

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
  const [allAccount, setAllAccount] = useState([]);
  const [ourClientId, setOurClientId] = useState("");
  const [myAccountId, setMyAccountId] = useState('')

  const [isOpen, setIsOpen] = useState(false);
  const [ourAccountServices, setOurAccountServices] = useState([]);

  // Function open modal
  function modalIsOpen() {
    setIsOpen(true);
  }
  // Function close modal
  function closeModal() {
    setIsOpen(false);
  }

  function myAccount() {

    
    Api.get(`my-account-services/${myAccountId}`)
    .then((res) => {
      res.data.accountServicesOfTheUser;
      setMyAccountServices(res.data.accountServicesOfTheUser);
    })
    .catch((error) => console.log("Erro: ", error));
  }
  
  useEffect(() => {
    
    myAccount();


    Api.get("/clients")
      .then((res) => {
        res.data.user;
        setOurClients(res.data.user);
      })
      .catch((error) => console.log("Erro: ", error));

    Api.get("/services")
      .then((res) => {
        res.data.services;
        setAllAccount(res.data.services);
      })
      .catch((error) => console.log("Erro: ", error));

      Api.get("/account-service")
      .then((res) => {
        res.data.accountServices;
        setOurAccountServices(res.data.accountServices);
      })
      .catch((error) => console.log("Erro: ", error));

    setWidth(
      slider_wrapper.current.scrollWidth - slider_wrapper.current.offsetWidth
    );
  }, [ourClientId]);

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.slider_wrapper}
        ref={slider_wrapper}
        whileTap={{ cursor: "grabbing" }}
      >
        {
          ourClients == '' ? (
            <div className={styles.container_skeleton}>
              <Skeleton width={"160px"} height={160} borderRadius={"0.25rem"} />
              <Skeleton width={"160px"} height={160} borderRadius={"0.25rem"} />
              <Skeleton width={"160px"} height={160} borderRadius={"0.25rem"} />
              <Skeleton width={"160px"} height={160} borderRadius={"0.25rem"} />
            </div>
          ) : (
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
                  myAccount();
                  setMyAccountId(data._id)
                }}
              >
                <div className={styles.card_image}>
                  <img
                    src={`https://api-streaming.onrender.com/uploads/${data.photo_profile}`}
                    alt={'data.name'}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
          )
        }
      </motion.div>

      {/* MODAL INFO CLIENT */}
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        overlayClassName={styles.modal_overlay}
        className={styles.modal_content}
      >
        {

          ourClients.map((data, key) => {
          if (data._id == ourClientId)
            return (
              <div key={key} className={styles.modal_clients}>
                  <img
                    src={`https://api-streaming.onrender.com/uploads/${data.photo_profile}`}
                    alt={data.name} />
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
                  {
                    myAccountServices == "" ? (
                      <div className={styles.container_skeleton}>
              <Skeleton width={220} height={200} borderRadius={"0.25rem"} />
              <Skeleton width={220} height={200} borderRadius={"0.25rem"} />
              <Skeleton width={220} height={200} borderRadius={"0.25rem"} />
              <Skeleton width={220} height={200} borderRadius={"0.25rem"} />
            </div>
                    ) : (
                      <>
                      {
                    myAccountServices.map((i, keyValue) => {

                      if (i.user_id._id == data._id) {
                        return ourAccountServices.map((item) => {
                          if (i.account_service_id?._id == item._id)
                          return allAccount.map((service) => {
                            if (service._id == i.account_service_id?.service_id) {
                              return (
                                <div>
                                    <img
                                      src={`https://api-streaming.onrender.com/uploads/${service.image}`}
                                      alt={service.name} />
                                </div>
                              )
                            }
                            
                          })

                        })

                      } 

                    })
                  }</>
                    )
                  }
                  </div>
                </div>
      
            </div>
          )
              

            })
        }
        
      </Modal>
    </div>
  );
}
