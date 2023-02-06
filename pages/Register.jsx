import Image from "next/image";
import Link from "next/link";

//icons
import { 
  AiOutlineEye,
  AiOutlineEyeInvisible
 } from 'react-icons/ai';
import { HiOutlineMail } from 'react-icons/hi';
import { TbLock } from 'react-icons/tb';

import Modal from "react-modal";

import { motion } from "framer-motion";

import { FaUserAlt } from "react-icons/fa";

import { useState, useEffect } from "react";

import { logo, UserCircle } from "../assets/";

import styles from "../styles/register.module.scss";
import axios from "axios";
import { Loader } from "../components/Loader";

export default function Register() {

  const [isLoader, setIsLoader] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoader(false)
    }, 2000)
  }, [])


  const [modalIsOpen, setModalIsOpen] = useState(false);

  function openModal() {
    setModalIsOpen(true);
  }
  function closeModal() {
    setModalIsOpen(false);
  }

  const [name, setName] = useState("");
  const [sex, setSex] = useState("H");
  const [whatsapp, setWhatsapp] = useState("");
  const [dateBirth, setDateBirth] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [codePin, setCodePin] = useState("");
  const [password, setPassword] = useState("");
  const [photoProfile, setPhotoProfile] = useState('')

      // Mudar o estado da palavra-passe
const [toggle, setToggle] = useState(true);

const [smsError, setSmsError] = useState(false);


function handleSubmit(e) {
  e.preventDefault();
  setModalIsOpen(false);
  setToggle(!toggle);

  if(name == '' && whatsapp == '' && dateBirth == '' && codePin == '' && confirmPassword == '' && password == '') {
    setSmsError(true)
  }else {
    setSmsError(false)
  }

    
    const data = {
      name,
      sex,
      whatsapp,
      dateBirth,
      codePin,
      confirmPassword,
      password,
      photoProfile,
      permission: 3,
    };
    
    const postData = axios.post("https://api-streaming.onrender.com/register", data)
    .then(() => console.log('Enviados com sucesso', postData))
    .catch(error => console.log('Erro ao enviar dados', error))

  }
  return (
    <>
      {isLoader ? (<Loader />) : (
        <div>
        <header className={styles.header_nav}>
          <div>
          <motion.div
              initial={{x: -100, opacity: 0}}
              animate={{x: 0, opacity: 1}}
              transition={{duration: 0.5}}
            >
            <Link href="/">
              <Image src={logo} alt="PN Clique logo" className={styles.logo} />
            </Link>
            </motion.div>
            <motion.nav
            initial={{x: 100, opacity: 0, scale: 0}}
            animate={{x: 0, opacity: 1, scale: 1}}
            transition={{duration: .5}}
            >
              <Link className="btn_default" href={"/"}>Pagina inicial</Link>
            </motion.nav>
          </div>
        </header>
  
        <section className={styles.register}>
          <motion.div
          initial={{y: 200, opacity: 0, scale: 0}}
          animate={{y: 0, opacity: 1, scale: 1}}
          transition={{duration: .5, delay: 0.5}}
          >
            <form encType="multipart/form-data"  action="POST" onSubmit={handleSubmit}>
              <div className={styles.person_datas}>
                <header>
                  {
                    smsError ? (
                    <div className={styles.message_error}>
                      <p>Preencha todos os campos!</p>
                    </div>
                    ) : ('')
                  }
                  
                  <h2>Dados pessoais</h2>
                  <span>Registre-se para usufruir dos nossos serviços.</span>
                </header>
  
                <div className={styles.form_group}>
                  
                  <div className={'input_icon'}>
                    <HiOutlineMail />
                    <input 
                    type="text"
                      placeholder="Digite seu nome:"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      />
                  </div>
                  <select 
                    value={sex}
                    onChange={(e) => setSex(e.target.value)}
                    >
                    <option value="Masculino">Homem</option>
                    <option value="Femenino">Mulher</option>
                  </select>
                </div>
                <div className={styles.form_group}>
                  
                    <div className={'input_icon'}>
                    <HiOutlineMail />
                    <input 
                    type="text" 
                    placeholder="Whatsapp:" 
                    value={whatsapp} 
                    onChange={(e) => setWhatsapp(e.target.value)}
                    required
                      />
                  </div>
  
                  <div className={'input_icon'}>
                    <input 
                    type="date" 
                    placeholder="Data de nascimento:" 
                    value={dateBirth} 
                    onChange={(e) => setDateBirth(e.target.value)}
                    required
                      />
                  </div>
  
                </div>
              </div>
              <div className={styles.security_datas}>
                <header>
                  <h2>Dados de segurança</h2>
                  <span>Torne a sua conta mais segura.</span>
                </header>
  
                <div className={styles.form_group}>
                  
                <div className={'input_icon'}>
                    <HiOutlineMail />
                    <input 
                    type="text" 
                    placeholder="Digite seu PIN:" 
                    value={codePin} 
                    onChange={(e) => setCodePin(e.target.value)}
                    required
                      />
                  </div>
                </div>
  
  
                <div className={styles.form_group}>
                  
                  <div className={'input_icons'}>
                    <TbLock />
                    <input 
                    placeholder="Palavra-passe:"
                    autoComplete="false"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                      type={toggle ? 'text' : 'password'} 
                      />
                      <button
                        onClick={handleSubmit}
                      >
                        {toggle ? (<AiOutlineEye />) : (<AiOutlineEyeInvisible />)} 
                      </button>
                  </div>
  
                  <div className={'input_icons'}>
                    <TbLock />
                    <input 
                    
                    autoComplete="false"
                    placeholder="Confirmar:"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                      type={toggle ? 'text' : 'password'} 
                      />
                      <button
                        onClick={handleSubmit}
                      >
                        {toggle ? (<AiOutlineEye />) : (<AiOutlineEyeInvisible />)} 
                      </button>
                  </div>
                  
                </div>
              </div>
              <motion.div
              initial={{y: 100, opacity: 0, scale: 0}}
              animate={{y: 0, opacity: 1, scale: 1}}
              transition={{duration: .5}}
              >
              <Modal
                  isOpen={modalIsOpen}
                  onRequestClose={closeModal}
                  overlayClassName={styles.modal_overlay}
                  ariaHideApp={false}
                  className={styles.Modal_new_service}
                >
                  <div className={styles.Modal_image}>
                    <div>
                      <h2>Foto de perfil</h2>
                      <span>Selecione uma foto de perfil.</span>
                    </div>
  
                    <div>
                      <label htmlFor="imgService">
                        {/* <Image src={UserCircle} alt="Foto de perfil" /> */}
                        <FaUserAlt />
                        <input type="file" id="imgService"
                          value={photoProfile}
                          onChange={(e) => setPhotoProfile(e.target.value)}
                        />
                      </label>
                      <label htmlFor="imgService">
                        Adicione uma imagem para o serviço
                      </label>
                    </div>
  
                    <div>
                      <button onClick={handleSubmit} type="submit">
                        Adicionar
                      </button>
                    </div>
                  </div>
                </Modal>
              </motion.div>
              <div>
                
  
                <button onClick={openModal} className={'btn_default'} type="button">
                  Proximo
                </button>
              </div>
            </form>
          </motion.div>
        </section>
      </div>
      )}
    </>
  );
}
