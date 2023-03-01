import { useRouter } from "next/router";
import { useRef } from "react";

import Modal from "react-modal";

// AXIOS API
import { Api } from "../../../api/axios";

import { MdOutlineAddToPhotos } from "react-icons/md";

import styles from "./styles.module.scss";
import { useState } from "react";
import { useEffect } from "react";

export default function ModalAddUserInAccountService({ ModalIsOpenClient, closeModalClient, accountServiceId }) {
  const [clients, setClients] = useState([]);
  const [clientId, setClientId] = useState('');

  function callClients() {
    Api.get("clients")
      .then((res) => setClients(res.data.user))
      .catch((err) => console.log(err));

  }

  useEffect(() => {
    callClients();
  }, []);

  function handlerSubmit(e) {
    e.preventDefault();

    const data = {
      account_service_id: accountServiceId,
      user_id: clientId,
    };

    Api.post("/add-user-the-one-account-services", data)
    .then((res) => {
      closeModalClient();
      res
      window.location.reload();
    })
    .catch((error) => {
      console.log('Ola, erro: ',error);
    });

    
  }

  return (
    <Modal
      isOpen={ModalIsOpenClient}
      onRequestClose={closeModalClient}
      overlayClassName={styles.modal_overlay}
      ariaHideApp={false}
      className={styles.Modal_new_service}
    >
      <form className={styles.form} onSubmit={handlerSubmit}>
          <header>
            Adicione uma conta de serviço ao cliente

            <button className={styles.btn_close} onClick={closeModalClient}>X</button>
          </header>

        <div className={styles.form_group_password}>
          <select
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
          >
            <option value="">Escolha um cliente</option>
            {clients.map((data, key) => (
              <option value={data._id} key={key}>
                {data.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.btn_add_account}>
          <button type="submit" className="btn_default" onClick={handlerSubmit}>
            Adicionar
          </button>
        </div>
      </form>
    </Modal>
  );
}
