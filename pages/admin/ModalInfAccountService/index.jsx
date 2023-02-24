import { useRouter } from "next/router";
import { useRef } from "react";

import Modal from "react-modal";

// AXIOS API
import { Api } from "../../../api/axios";

import { MdOutlineAddToPhotos } from "react-icons/md";

import styles from "./styles.module.scss";
import { useState } from "react";
import { useEffect } from "react";

export default function ModalInfAccountService({
  isOpen,
  closeModal,
  accountId,
  setAccountId,
}) {
  const [accountService, setAccountService] = useState([]);

  function callAccountServices() {
    Api.get("account-service")
      .then((res) => {
        res.data.accountServices;
        setAccountService(res.data.accountServices);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    callAccountServices();
  }, []);

  console.log("Contas de serviços: ", accountService);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      overlayClassName={styles.modal_overlay}
      ariaHideApp={false}
      className={styles.Modal_new_service}
    >
      {accountService.map((account, index) => {
        {
          if (account._id == accountId) {
            return (
              <section className={styles.form} key={index}>
                <div className={styles.form_group_heading}>
                  <div>
                    <h2>{account.service_id.name}</h2>
                  </div>
                  <button onClick={closeModal}>X</button>
                </div>

                <div className={styles.form_group_email}>
                  <label htmlFor="">E-mail</label>
                  <span>{account.count_service_email}</span>
                </div>

                <div className={styles.form_group_date}>
                  <div>
                    <label htmlFor="">Data de iniçio</label>
                    <span>{account.date_init}</span>
                  </div>
                  <div>
                    <label htmlFor="">Data do fim</label>
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
        }
      })}
    </Modal>
  );
}
