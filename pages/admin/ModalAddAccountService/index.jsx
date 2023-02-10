import { useRouter } from "next/router";
import { useRef } from "react";

import Modal from "react-modal";

// AXIOS API
import { Api } from "../../../api/axios";

import { MdOutlineAddToPhotos } from "react-icons/md";

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

    closeModal();

    const data = {
      count_service_email: email,
      date_init:dateStart,
      date_finish: dateEnd,
      capacity: refCapacity.current.value,
      points: refPoints.current.value,
      price: refPoints.current.value,
      password,
      service_id: serviceId,
      in_day: 1
    };

    Api.post("/account-service", data)
    .then((res) => console.log("Success:", res))
    .catch((error) => console.log(error));
    console.log(data);
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
        <div className={styles.form_group_heading}>
          <div>
            <h2>Adicionar conta de serviço</h2>
            <span>Adicionar nova conta de serviços</span>
          </div>
          <button onClick={closeModal}>X</button>
        </div>

        <div className={styles.form_group_email}>
          <input
            type="email"
            placeholder="Digite o email da conta de  serviço:"
            required
            autoComplete="false"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.form_group_date}>
          <input
            type="date"
            placeholder="Digite a data do iniçio:"
            value={dateStart}
            onChange={(e) => setDateStart(e.target.value)}
          />
          <input
            type="date"
            placeholder="Digite a data final:"
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
                  placeholder="Preço:"
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
            name=""
            id=""
            placeholder="Palavra-passe:"
            value={password}
            autoComplete="false"
            onChange={(e) => setPassword(e.target.value)}
          />
          <select
            name=""
            id=""
            value={serviceId}
            onChange={(e) => setServiceId(e.target.value)}
          >
            <option value="">Escolha um serviço</option>
            {service.map((data, key) => (
              <option value={data._id} key={key}>
                {data.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <button type="submit" onClick={handlerSubmit}>
            Adicionar
          </button>
        </div>
      </form>
    </Modal>
  );
}
