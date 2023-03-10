import Image from "next/image";
import { useRouter } from "next/router";
import { useRef } from "react";

import Modal from "react-modal";

// AXIOS API
import { Api } from "../../../api/axios";

// ASSETS
import { loadingIcon } from "../../../assets";

// ICONS
import { AiFillCloseCircle } from 'react-icons/ai'

import styles from "./styles.module.scss";
import { useState } from "react";
import { useEffect } from "react";

export default function ModalAddAccountService({ ModalIsOpen, closeModal }) {
  const [email, setEmail] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [capacity, setCapacity] = useState("");
  const [price, setPrice] = useState("");
  const [points, setPoints] = useState("");
  const [password, setPassword] = useState("");
  const [serviceId, setServiceId] = useState("");

  const refCapacity = useRef(null);
  const refPoints = useRef(null);
  const refPrice = useRef(null);
  
  const [smsError, setSmsError] = useState(false);

  // STATE LOADER
  const [loader, setLoader] = useState(false);

  const [service, setService] = useState([]);

  function callServices() {
    Api.get("services")
      .then((res) => setService(res.data.services))
      .catch((err) => console.log(err));

  }

  useEffect(() => {
    callServices();
  }, []);

  function handlerSubmit(e) {
    e.preventDefault();

    const data = {
      count_service_email: email,
      date_init:dateStart,
      date_finish: dateEnd,
      capacity: refCapacity.current.value,
      points: refPoints.current.value,
      price: refPoints.current.value,
      password,
      service_id: serviceId,
      in_day: 1,
    };

    Api.post("/account-service", data)
    .then((res) => {
      closeModal();
      res
      window.location.reload();
      setSmsError(false);
    })
    .catch((error) => {
      console.log('Ola, erro: ',error);
      setSmsError(true);
    })
    .finally(() => {
      setLoader(false)
    })

    
  }

  return (
    <Modal
      isOpen={ModalIsOpen}
      onRequestClose={closeModal}
      overlayClassName={styles.modal_overlay}
      ariaHideApp={false}
      className={styles.Modal_new_service}
    >
      <form className={styles.form} onSubmit={handlerSubmit}>
        <>
        {smsError ? (
            <div className={styles.message_error}>
              <p>Preencha todos os campos correctamente!</p>
            </div>
          ) : (
            ""
          )}
        </>
        <div className={styles.form_group_heading}>
          <div>
            <h2>Adicionar conta de servi??o</h2>
            <span>Adicionar nova conta de servi??os</span>
          </div>
          <button onClick={closeModal}>
            <AiFillCloseCircle />
          </button>
        </div>

        <div className={styles.form_group_email}>
          <input
            type="email"
            placeholder="Digite o email da conta de  servi??o:"
            required
            autoComplete="false"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.form_group_date}>
          <input
            type="date"
            placeholder="Digite a data de in??cio:"
            value={dateStart}
            onChange={(e) => setDateStart(e.target.value)}
          />
          <input
            type="date"
            placeholder="Digite a data de vencimento:"
            value={dateEnd}
            autoComplete="false"
            onChange={(e) => setDateEnd(e.target.value)}
          />
        </div>

        <div className={styles.form_group_data_service}>
          {service.map((data, key) => {
            if (data._id == serviceId)
              return (
                <input
                  type="text"
                  placeholder="Capacidade:"
                  autoComplete="false"
                  disabled="disabled"
                  value={data.capacidade}
                  ref={refCapacity}
                  key={key}
                />
              );
          })}
          {service.map((data, key) => {
            if (data._id == serviceId)
              return (
                <input
                  type="text"
                  placeholder="Pontos:"
                  autoComplete="false"
                  disabled="disabled"
                  value={data.pontos}
                  ref={refPoints}
                  key={key}
                />
              );
          })}
          {service.map((data, key) => {
            if (data._id == serviceId)
              return (
                <input
                  type="text"
                  placeholder="Pre??o:"
                  autoComplete="false"
                  disabled="disabled"
                  value={data.preco}
                  ref={refPrice}
                  key={key}
                />
              );
          })}
        </div>

        <div className={styles.form_group_password}>
          <input
            type="password"
            placeholder="Palavra-passe:"
            value={password}
            autoComplete="false"
            onChange={(e) => setPassword(e.target.value)}
            
          />
          <select
            value={serviceId}
            onChange={(e) => setServiceId(e.target.value)}
          >
            <option value="">Escolha um servi??o</option>
            {service.map((data, key) => (
              <option value={data._id} key={key}>
                {data.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.btn_add_account}>
          <button type="submit" className="btn_default" onClick={handlerSubmit}>
            Adicionar
            {loader ? <Image src={loadingIcon} alt={loadingIcon} /> : ""}
          </button>
        </div>
      </form>
    </Modal>
  );
}
