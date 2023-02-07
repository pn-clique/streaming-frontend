import Modal from "react-modal";

import Image from "next/image";

import { MdOutlineAddToPhotos } from 'react-icons/md'

import styles from "./styles.module.scss";
import { movie05, netflix } from "../../../assets";
import { useState } from "react";
import { Api } from "../../../api/axios";

export default function ModalBuyService({ ModalIsOpen, closeModal, service_id, account_id }) {

  const [boleto, setBoleto] = useState('');

  const [isOpen, setIsOpen] = useState(false);

  function handlerFileChange(e){
    setBoleto(e.target.files[0]);
  }

  function handlerSubmit(e) {
    e.preventDefault();

    if(boleto === ''){
      console.log('boleto vazio')
    }
    
      console.log(boleto);

      const user_id = localStorage.getItem('userId');
    
      const purchaseAccount = {
        user_id: user_id,
        account_service_id: account_id,
        pdf_purchasing: boleto,
      }

    Api.post(`purchase-account-services/${account_id}/${service_id}`, purchaseAccount)
    .then(res => console.log('purchase', res.data))

    console.log(`purchase-account-services/${account_id}/${service_id}`)
  }


  return (
    <Modal
      isOpen={ModalIsOpen}
      onRequestClose={closeModal}
      ariaHideApp={false}
      overlayClassName={styles.modal_overlay}
      className={styles.Modal_new_service}
    >
      <form className={styles.form} encType="multipart/form-data" onSubmit={handlerSubmit}>
            <button onClick={closeModal}>X</button>
        

        <div className={styles.movie_info}>
        <div>
          <label htmlFor="imgService">
            <input type="file" name="" id="imgService"  
            onChange={(e) => setBoleto(e.target.value)} />
            <span>{boleto == '' ? 'Adicione um comprovativo' : (boleto)}</span>
          </label>
        </div>

        <div>
          <button type="submit" onClick={handlerSubmit}>Enviar</button>
        </div>
          
        </div>
      </form>
    </Modal>
  );
}
