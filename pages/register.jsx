import Image from "next/image";
import Link from "next/link";

//icons
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import { TbLock } from "react-icons/tb";

import Modal from "react-modal";

import { motion } from "framer-motion";

import FormData from "form-data";

import { FaUserAlt } from "react-icons/fa";

import { useState, useEffect, useRef } from "react";

import { useRouter } from 'next/router';

import { logo, UserCircle } from "../assets";

import styles from "../styles/register.module.scss";
import axios from "axios";
import { Loader } from "../components/Loader";
import { Api } from "../api/axios";

export default  function Register() {
  const [isLoader, setIsLoader] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoader(false);
    }, 2000);
  }, []);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  function openModal() {
    setModalIsOpen(true);
  }
  function closeModal() {
    setModalIsOpen(false);
  }

  const [name, setName] = useState("");
  const [sex, setSex] = useState("Homem");
  const [whatsApp, setWhatsApp] = useState("");
  const [email, setEmail] = useState("");
  const [date_birth, setDateBirth] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [code_pin, setCodePin] = useState("");
  const [password, setPassword] = useState("");
  const [photo_profile, setPhotoProfile] = useState("");

  // Mudar o estado da palavra-passe
  const [toggle, setToggle] = useState(true);

  const [smsError, setSmsError] = useState(false);



  const ref = useRef(null);
  const navigate = useRouter()

  
  
  const handlerSubmit = async (e) => {
    e.preventDefault();
    
    const file = ref.current.files[0];


    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    if (photo_profile == "") {
      setSmsError(true);
    }
    if (password <= 7) {
      setSmsError(true);
    }
    if (password != confirmPassword) {
      setSmsError(true);
    }
    
    var bForm = new FormData();
    bForm.append("name", name);
    bForm.append("email", email);
    bForm.append("password", password);
    bForm.append("sex", sex);
    bForm.append("whatsApp", whatsApp);
    bForm.append("date_birth", date_birth);
    bForm.append("code_pin", code_pin);
    bForm.append("photo_profile", file);

    const url = 'https://api-streaming.onrender.com/register'
     axios.post(url, bForm, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
      
    })
      .then((res) => {
        console.log("data res signup register : ", res.data);
        const id = res.data.user._id;
        localStorage.setItem("userId", id);
        const token = res.data.token;
        const permission = res.data.user.permission;
        localStorage.setItem("token", token);
        localStorage.setItem("permission", permission);
        localStorage.setItem("modalSuggestion", false);
        Api.defaults.headers.Authorization = `Bearer ${token}`;
        Api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        navigate.push("/client/dashboard");
      })
      .catch((err) => console.log("erro na promise signup register : ", err))
      .finally();

  };
  return (
    <>
      {isLoader ? (
        <Loader />
      ) : (
        <div>
          <header className={styles.header_nav}>
            <div>
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Link href="/">
                  <Image
                    src={logo}
                    alt="PN Clique logo"
                    className={styles.logo}
                  />
                </Link>
              </motion.div>
              <motion.nav
                initial={{ x: 100, opacity: 0, scale: 0 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Link className="btn_default" href={"/"}>
                  Pagina inicial
                </Link>
              </motion.nav>
            </div>
          </header>

          <section className={styles.register}>
            <motion.div
              initial={{ y: 200, opacity: 0, scale: 0 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <form
                encType="multipart/form-data"
                action="POST"
                onSubmit={handlerSubmit}
              >
                <div className={styles.person_datas}>
                  <header>
                    {smsError ? (
                      <div className={styles.message_error}>
                        <p>Preencha todos os campos!</p>
                      </div>
                    ) : (
                      ""
                    )}

                    <h2>Dados pessoais</h2>
                    <span>Registre-se para usufruir dos nossos serviços.</span>
                  </header>

                  <div className={styles.form_group}>
                    <div className={"input_icon"}>
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
                    <div className={"input_icon"}>
                      <HiOutlineMail />
                      <input
                        type="text"
                        placeholder="WhatsApp:"
                        value={whatsApp}
                        onChange={(e) => setWhatsApp(e.target.value)}
                        required
                      />
                    </div>

                    <div className={"input_icon"}>
                      <input
                        type="date"
                        placeholder="Data de nascimento:"
                        value={date_birth}
                        onChange={(e) => setDateBirth(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className={styles.form_group}>
                    <div className={"input_icon"}>
                      <HiOutlineMail />
                      <input
                        type="email"
                        placeholder="Digite seu email:"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                    <div className={"input_icon"}>
                      <HiOutlineMail />
                      <input
                        type="text"
                        placeholder="Digite seu PIN:"
                        value={code_pin}
                        onChange={(e) => setCodePin(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className={styles.form_group}>
                    <div className={"input_icons"}>
                      <TbLock />
                      <input
                        placeholder="Palavra-passe:"
                        autoComplete="false"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        type={toggle ? "text" : "password"}
                      />
                      <button onClick={handlerSubmit}>
                        {toggle ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                      </button>
                    </div>

                    <div className={"input_icons"}>
                      <TbLock />
                      <input
                        autoComplete="false"
                        placeholder="Confirmar:"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        type={toggle ? "text" : "password"}
                      />
                      <button onClick={handlerSubmit}>
                        {toggle ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                      </button>
                    </div>
                  </div>
                </div>
                <motion.div
                  initial={{ y: 100, opacity: 0, scale: 0 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
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
                          <input type="file" id="imgService" ref={ref} />
                        </label>
                        <label htmlFor="imgService">
                          Adicione uma imagem para o serviço
                        </label>
                      </div>

                      <div>
                        <button onClick={handlerSubmit} type="submit">
                          Adicionar
                        </button>
                      </div>
                    </div>
                  </Modal>
                </motion.div>
                <div>
                  <button
                    onClick={openModal}
                    className={"btn_default"}
                    type="button"
                  >
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
