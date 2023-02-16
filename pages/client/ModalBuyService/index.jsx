import Modal from "react-modal";

import Image from "next/image";

import FormData from "form-data";

import { MdOutlineAddToPhotos } from 'react-icons/md'

import styles from "./styles.module.scss";
import { movie05, netflix } from "../../../assets";
import { useState, useRef } from "react";
import { Api } from "../../../api/axios";
import axios from "axios";

export default function ModalBuyService({ ModalIsOpen, closeModal, service_id, account_id }) {

  const [boleto, setBoleto] = useState('');

  const [isOpen, setIsOpen] = useState(false);

  const ref = useRef(null);


  async function handlerSubmit(e) {
    e.preventDefault();

   
      const user_id = localStorage.getItem('userId');

      const file = ref.current.files[0];

    const form = new FormData();
    form.append('pdf_purchasing', file);
    form.append('user_id', user_id);
    form.append('account_service_id', account_id);

   



  let token = ''
  if(typeof window !== 'undefined') {
    token = localStorage.getItem('token');
  }

  const url = `https://api-streaming.onrender.com/purchase-account-services/${account_id}/${service_id}`

  await axios.post(url, form, {
    headers: {//...form.getHeaders,
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`
    }
    
  }).then(response => response)
  .catch(error => console.log('Error: ', error))

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

    {/* <label htmlFor="fileSend">
      <input type="file" name="" id="fileSend" />
      <span>Adic</span>
    </label> */}

        <div>
          <label htmlFor="imgService">
            <MdOutlineAddToPhotos />
          <span>
          {boleto === ''? 'Adicione uma imagem para o serviço' : (boleto) }
          </span>
          </label>
            <input
              type="file"
              id="imgService"
              ref={ref}
            />
        </div>

        <div className={styles.btn_send}>
          <button type="submit">Enviar</button>
        </div>
          
        </div>
      </form>
    </Modal>
  );
}
