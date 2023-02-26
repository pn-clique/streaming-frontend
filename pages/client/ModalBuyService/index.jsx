import Modal from "react-modal";

import Image from "next/image";

import FormData from "form-data";



// iCONS
import { MdOutlineAddToPhotos } from 'react-icons/md'

import styles from "./styles.module.scss";
import { movie05, netflix } from "../../../assets";
import { useState, useRef } from "react";
import { Api } from "../../../api/axios";
import axios from "axios";


export default function ModalBuyService({ ModalIsOpen, closeModal, service_id, account_id }) {

  const [inputFile, setInputFile] = useState('')

  const [boleto, setBoleto] = useState('');

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

  const url = `https://api-streaming.onrender.com/purchase-account-services/${account_id}`

  await axios.post(url, form, {
    headers: {//...form.getHeaders,
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`
    }
    
  }).then(response => {console.log('response buy service : ', response); closeModal()})
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

<label className={styles.label_image}>
      <MdOutlineAddToPhotos />
        <input
          style={{ display: "none" }}
          type="file"
          onChange={e => {
            setInputFile(e.target.files[0].name);
          }}
          ref={ref}
        />
        
        <span>{inputFile === ''? 'Adicione uma imagem para o serviço' : (inputFile) }</span>
      </label>

        <div className={styles.btn_send}>
          <button type="submit">Enviar</button>
        </div>
          
        </div>
      </form>
    </Modal>
  );
}
