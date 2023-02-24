import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import Modal from "react-modal";

// AXIOS API
import { Api } from "../../../api/axios";

// ASSETS
import { logo, netflix } from "../../../assets";

import { MdOutlineAddToPhotos } from "react-icons/md";

import styles from "./styles.module.scss";
import { useState } from "react";
import { useEffect } from "react";

export default function ModalInfoService({ isOpen, closeModal, serviceId, setServiceId }) {
  const [services, setServices] = useState([]);

  function callServices() {
    Api.get(`/services`)
      .then((res) => {
        setServices(res.data.services);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    callServices();
  }, []);
  console.log("All services: ", services);

  return (
    <div>

      {services.map((service, index) => {
        {
          if(service._id == serviceId) {

            return (
              <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                overlayClassName={styles.modal_overlay}
                ariaHideApp={false}
                className={styles.Modal_new_service}
                key={index}
              >
                    <section className={styles.form} >
                      <div className={styles.form_group_heading}>
                        <button onClick={closeModal}>X</button>
                      </div>
          
                      <div className={styles.image}>
                        <img 
                          src={`https://api-streaming.onrender.com/uploads/${service.image}`} 
                          alt={service.name} />
                      </div>
          
                      <div className={styles.name}>
                        <label htmlFor="">Serviço</label>
                        <span>{service.name}</span>
                      </div>
          
                      <div className={styles.comission}>
                        <div>
                          <label htmlFor="">Comissão</label>
                          <span>{service.comissao}</span>
                        </div>
                        <div>
                          <label htmlFor="">Duração</label>
                          <span>31 dias</span>
                        </div>
                      </div>
          
                      <div className={styles.form_group_date}>
                        <div>
                          <label htmlFor="">Capacidade</label>
                          <span>{service.capacidade}</span>
                        </div>
                        <div>
                          <label htmlFor="">Pontos</label>
                          <span>{service.pontos}</span>
                        </div>
                        <div>
                          <label htmlFor="">Preço</label>
                          <span>{`${service.preco} kz`}</span>
                        </div>
                      </div>
          
                      <div className={styles.observaction}>
                        <label htmlFor="">Codigo de recarga</label>
                        <span>
                          {service.recarga}
                        </span>
                      </div>
                    </section>
              </Modal>
                  );
          }
        }
      })}
    </div>
  );
}
