import { motion } from "framer-motion";

import { useEffect, useState, useRef } from "react";


import Modal from "react-modal";  

import {
  netflix,
  movie01,
  movie02,
  movie03,
  movie04,
  movie05,
} from "../../assets";

import Image from "next/image";
import styles from "./styles.module.scss";
import { newReleases } from "../../dataAPI/DataAdmin/Datas";

// AXIOS API
import { Api, ApiMovies } from "../../api/axios";
import axios from "axios";
import Skeleton from "./../Skeleton";




export function CarouselMyServices({myAccounts, services}) {

  const [modalAccounService, setModalAccountService] = useState(false);

  const [accountService, setAccountService] = useState([])

  const [accountServiceUserId, setAccountServiceUserId] = useState('')

  Api.get('./account-service')
  .then(res => {
    setAccountService(res.data.accountServices)
  })
  .catch(error => console.log('Erro account service: ', error))



  function openModalAccountService() {
    setModalAccountService(true);
  }
  function closeModalAccountService() {
    setModalAccountService(false);
  }


  const [width, setWidth] = useState(0);
  const slider_wrapper = useRef();



  useEffect(() => {

    setWidth(
      slider_wrapper.current.scrollWidth - slider_wrapper.current.offsetWidth
    );
  }, [width]);

  return (
    <div className={styles.container}>
      
      
      <motion.div
        className={styles.slider_wrapper}
        ref={slider_wrapper}
        whileTap={{ cursor: "grabbing" }}
      >
       {
        myAccounts === '' ? (
          <div className={styles.container_skeleton}>
              <Skeleton width={141} height={200} borderRadius={"0.25rem"} />
              <Skeleton width={141} height={200} borderRadius={"0.25rem"} />
              <Skeleton width={141} height={200} borderRadius={"0.25rem"} />
              <Skeleton width={141} height={200} borderRadius={"0.25rem"} />
            </div>
        ) : (
          (
            myAccounts.length == 0 ? (
              <div className={styles.no_account_services}>
                  <h2>Sem nenhum serviço!</h2>
                  <span>Compre os nossos serviços para poder usufruir mais do que temos a lhe oferecer</span>
                </div>
            ) : (
              <motion.div
            className={styles.inner_carousel}
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
          >
            {myAccounts.map((data) => {
              if(data.accept === 1 && data.time_remaining > 0) {
                return services.map((item) => {
                  if (data.account_service_id?.service_id == item._id)
                  return (
                    <motion.div
                      className={styles.card}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ duration: 0.5 }}
                      key={data._id}
                      onClick={() => {
                        openModalAccountService();
                        setAccountServiceUserId(data._id);
                      }}
                    >
                      <div className={styles.card_image}>
                        <img src={`https://api-streaming.onrender.com/uploads/${item.image}`} />
                      </div>
                    </motion.div>
                  )
                })
              } else {
                // return (
                //   <div className={styles.no_account_services}>
                //   <h2>Sem nenhum serviço!</h2>
                //   <span>Compre os nossos serviços para poder usufruir mais do que temos a lhe oferecer</span>
                // </div>
                // )
              }
            })}
          </motion.div>
            )
          
          )
        )
       }
      </motion.div>


      <Modal
      isOpen={modalAccounService}
      onRequestClose={closeModalAccountService}
      overlayClassName={styles.modal_overlay}
      ariaHideApp={false}
      className={styles.Modal_new_service}
    >
      {accountService.map((account, index) => {
         return myAccounts.map(data => {
          if(account._id == data.account_service_id?._id && data._id == accountServiceUserId) {
            return (
              <section className={styles.form} key={index}>
                <div className={styles.form_group_heading}>
                  <div>
                    <h2>{account.service_id.name}</h2>
                  </div>
                  <button onClick={closeModalAccountService}>X</button>
                </div>
    
                <div className={styles.form_group_email}>
                  <label htmlFor="">E-mail</label>
                  <span>{account.count_service_email}</span>
                </div>
    
                <div className={styles.form_group_date}>
                  <div>
                    <label htmlFor="">Início</label>
                    <span>{account.date_init}</span>
                  </div>
                  <div>
                    <label htmlFor="">Vencimento</label>
                    <span>{account.date_finish}</span>
                  </div>
                </div>
    
                <div className={styles.form_group_data_service}>
                  <div>
                    <label htmlFor="">Palavra-passe</label>
                    <span>{account.password}</span>
                  </div>
                  <div>
                    <label htmlFor="">Serviço</label>
                    <span>{account.service_id.name}</span>
                  </div>
                </div>
              </section>
            );
          }
         })
      })}
    </Modal>


    </div>
  );
}

