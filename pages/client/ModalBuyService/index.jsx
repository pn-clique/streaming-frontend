import Modal from "react-modal";

import Image from "next/image";

import FormData from "form-data";



// iCONS
import { MdOutlineAddToPhotos } from 'react-icons/md'

import styles from "./styles.module.scss";
import { movie05, netflix } from "../../../assets";
import { useState, useRef, useEffect } from "react";
import { Api } from "../../../api/axios";
import axios from "axios";


export default function ModalBuyService({ ModalIsOpen, closeModal, service_id, account_id }) {
  
  const [inputFile, setInputFile] = useState('')
  const [modalNotification, setModalNotification] = useState(false)
  
  // MODAL NOTIFICATION SEND AFTER BUY SERVICE
  function openModalNotification() {
    setModalNotification(true);
  }
  function closeModalNotification() {
    setModalNotification(false);
  }

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
    
  }).then(response => {
    console.log('response buy service : ', response); 
    closeModal()
    
  })
  .catch(error => {
    setModalNotification(false)
    console.log('Error: ', error)})

  }

  useEffect(() => {
    setTimeout(() => {
      closeModalNotification()
      setModalNotification(false)
    }, 5000)
  }, [])

  console.log(modalNotification);




  return (
    <>
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
          <button type="submit" onClick={openModalNotification}>Enviar</button>
        </div>
          
        </div>
      </form>
    </Modal>

    <Modal
    isOpen={modalNotification}
    onRequestClose={closeModalNotification}
    ariaHideApp={false}
    overlayClassName={styles.overlay_modal_notification}
    className={styles.modal_notification}
    >
      <h2>A sua compra está pendente!</h2>
      <p>Lhe será enviado uma notificação, assim que o admin confirmar a sua compra</p>
    </Modal>
    </>
  );
}
