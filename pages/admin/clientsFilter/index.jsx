// NEXT
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

// REACT
import { useState, useEffect, useRef } from "react";

// MOTION
import { motion } from "framer-motion";

// OTHERS
import FormData from "form-data";

// MODAL
import Modal from "react-modal";

// STYLES
import styles from "./styles.module.scss";

// ASSETS
import {
  logo,
  netflix,
  movie01,
  movie02,
  movie03,
  movie04,
  movie05,
  sza,
} from "../../../assets/index";

//icons
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import { FaUserAlt } from "react-icons/fa";
import { TbLock } from "react-icons/tb";

// AXIOS
import { Api } from "../../../api/axios";
import axios from "axios";

import ModalNewService from "../ModalNewService";
import ModalEditionService from "../ModalEditionService";
import ModalAddAccountService from "../ModalAddAccountService";
import ModalEditAccountService from "../ModalEditAccountService";
import Skeleton from "../../../components/Skeleton";
export default function clientsFilter() {
  const [modalAddService, setModalAddService] = useState(false);
  const [accountServiceId, setAccountServiceId] = useState("");

  const [ourClients, setOurClients] = useState([
    {
      name: "Osvaldo Cariege",
      photo_profile: netflix,
      email: "osvaldocariege06@gmail.com",
      whatsapp: "933847576",
      sex: "H",
      password: "298384",
      confirmPassword: "298384",
      date_birth: new Date("06/01/2000"),
      code_pin: "12345",
    },
  ]);
  const [myAccountServices, setMyAccountServices] = useState([]);
  const [services, setServices] = useState([]);
  const [ourClientId, setOurClientId] = useState("");

  // MODAL
  const [isOpen, setIsOpen] = useState(false);

  // Function open modal
  function modalIsOpen() {
    setIsOpen(true);
  }
  // Function close modal
  function closeModal() {
    setIsOpen(false);
  }

  // FUNCTION SETTES MODAL INFO CLIENT
  const [modalInfoClient, setModalInfoClient] = useState(false);

  function openModalInfoClient() {
    setModalInfoClient(true);
  }

  function closeModalInfoClient() {
    setModalInfoClient(false);
  }

  // FUNCTIONS MODAL DELETE ACCOUNT SERVICES
  const [modalDeleteClient, setModalDeleteClient] = useState(false);

  function openModalDeleteClient() {
    setModalDeleteClient(true);
  }
  function closeModalDeleteClient() {
    setModalDeleteClient(false);
  }

  // FUNCTIONS MODAL EDIT CLIENT
  const [modalEditClient, setModalEditClient] = useState(false);

  function openModalEditClient() {
    setModalEditClient(true);
  }
  function closeModalEditClient() {
    setModalEditClient(false);
  }

  useEffect(() => {
    Api.get("/clients")
      .then((res) => {
        res.data.user;
        setOurClients(res.data.user);
      })
      .catch((error) => console.log("Erro: ", error));

    Api.get("/my-account-services")
      .then((res) => {
        res.data.accountServicesOfTheUser;
        setMyAccountServices(res.data.accountServicesOfTheUser);
      })
      .catch((error) => console.log("Erro: ", error));

    Api.get("/services")
      .then((res) => {
        res.data.services;
        setServices(res.data.services);
      })
      .catch((error) => console.log("Erro: ", error));
  }, []);

  // FUNCTION DELETE CLIENT
  const [deleteClient, setDeleteClient] = useState("");
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const refImage = useRef(null);
  const navigate = useRouter();

  function handlerDeleteAccountService(id) {
    Api.delete(`user/${deleteClient}`)
      .then((res) => {
        console.log("delete account services : ", res.data.message);
        closeModal();
        window.location.reload();
        console.log(name);
      })
      .catch((error) => console.log("Erro in delete account: ", error));
  }

  const [openModalEditPhoto, setOpenModalEditPhoto] = useState(false);

  function openModal() {
    setOpenModalEditPhoto(true);
  }
  function closeModal() {
    setOpenModalEditPhoto(false);
  }

  // FUNCTION EDIT CLIENT
  const [clientName, setClientName] = useState("");
  const [sex, setSex] = useState("Homem");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [date_birth, setDateBirth] = useState("");
  const [code_pin, setCodePin] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [photo_profile, setPhotoProfile] = useState("");

  // Mudar o estado da palavra-passe
  const [toggle, setToggle] = useState(true);
  const [smsError, setSmsError] = useState(false);

  const [inputFile, setInputFile] = useState("");

  function handlerSubmit(e, data) {
    e.preventDefault();

    const file = refImage.current.files[0];

    const form = new FormData();
    form.append("name", name == "" ? data.name : name);
    form.append("recarga", recarga == "" ? data.recarga : recarga);
    form.append("preco", preco == "" ? data.preco : preco);
    form.append("pontos", pontos == "" ? data.pontos : pontos);
    form.append("duracao", duracao == "" ? data.duracao : duracao);
    form.append("capacidade", capacidade == "" ? data.capacidade : capacidade);
    form.append("comissao", comissao == "" ? data.comissao : comissao);
    form.append("image", file == undefined ? data.image : file);

    console.log("files : ", file == undefined ? file : data.image);
    console.log("name : ", name == "" ? data.name : name);

    const token = localStorage.getItem("token");
    const url = `https://api-streaming.onrender.com/services/${serviceId}`;
    axios
      .put(url, form, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        window.location.reload();
        res;
      })
      .catch((error) => console.log("Error: ", error));
  }

  function handlerEditClient() {
    console.log({
      clientName,
      sex,
      whatsapp,
      email,
      date_birth,
      code_pin,
      password,
      photo_profile: refImage,
    });
  }

  const [search, setSearch] = useState("");
  const [myResult, setMyResult] = useState(false);

  const data = Object.values(ourClients);
  function search_account_services(account) {
    return account.filter((item) => {
      if (item.id == search || item.name == search || item.email == search) {
        return item;
      }
    });
  }

  return (
    <>
      <header className={styles.header_nav}>
        <div>
          <Link href={"/"}>
            <Image src={logo} alt="PN Clique logo" className={styles.logo} />
          </Link>
          <nav>
            <button className={"btn_default"} type="button">
              Dashboard
            </button>
          </nav>
        </div>
      </header>

      <section className={styles.filterServices}>
        <div className={styles.container}>
          <header>
            <div className={styles.title}>
              <h2>Todos clientes</h2>
              <span>Todos clientes disponiveis</span>
            </div>
          </header>

          <div className={styles.filter}>
            <input
              type="text"
              placeholder="Pesquisar pelo nome do cliente"
              value={search}
              requerid="true"
              onChange={(e) => {
                setSearch(e.target.value);
                e.target.value == "" ? setMyResult(false) : setMyResult(true);
              }}
              onKeyPress={(e) => {
                setSearch(e.target.value);
                setMyResult(true);
              }}
            />
          </div>

          <div className={styles.table_services}>
            {ourClients == "" ? (
              <div className={styles.container_skeleton}>
                <Skeleton width={"100%"} height={50} borderRadius={"0.25rem"} />
                <Skeleton width={"100%"} height={50} borderRadius={"0.25rem"} />
                <Skeleton width={"100%"} height={50} borderRadius={"0.25rem"} />
                <Skeleton width={"100%"} height={50} borderRadius={"0.25rem"} />
              </div>
            ) : (
              <>
                {ourClients.length != 0 ? (
                  <>
                    {myResult ? (
                      <>
                        {search_account_services(data).map((account, index) => (
                          <div key={index} className={styles.card}>
                            <div>
                              <img
                                src={`https://api-streaming.onrender.com/uploads/${account.photo_profile}`}
                                alt={account.name || ""}
                              />
                              <span>{account.name}</span>
                            </div>
                            <div className={styles.button_group}>
                              <button
                                type="button"
                                className="btn_default"
                                onClick={() => {
                                  openModalEditClient();
                                  setImage(account.photo_profile);
                                  setName(account.name);
                                  setDeleteClient(account._id);
                                }}
                              >
                                Editar
                              </button>
                              <button
                                type="button"
                                className="btn_default"
                                onClick={() => {
                                  // openModalDeleteClient()
                                  setImage(account.photo_profile);
                                  setName(account.name);
                                  setDeleteClient(account._id);
                                }}
                              >
                                Eliminar
                              </button>
                            </div>
                          </div>
                        ))}
                      </>
                    ) : (
                      <>
                        {ourClients.map((account, index) => (
                          <div key={index} className={styles.card}>
                            <div
                              onClick={openModalInfoClient}
                            >
                              <img
                                src={`https://api-streaming.onrender.com/uploads/${account.photo_profile}`}
                                alt={account.name || ""}
                              />
                              <span>{account.name}</span>
                            </div>
                            <div className={styles.button_group}>
                              <button
                                type="button"
                                className="btn_default"
                                onClick={() => {
                                  openModalEditClient();
                                  setImage(account.photo_profile);
                                  setName(account.name);
                                  setDeleteClient(account._id);
                                }}
                              >
                                Editar
                              </button>
                              <button
                                type="button"
                                className="btn_default"
                                onClick={() => {
                                  openModalDeleteClient();
                                  setImage(account.photo_profile);
                                  setName(account.name);
                                  setDeleteClient(account._id);
                                }}
                              >
                                Eliminar
                              </button>
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                  </>
                ) : (
                  <h2 className={styles.no_clients}>Sem nenhum cliente</h2>
                )}
              </>
            )}

            {/* MODAL INFO CLIENT */}
            <Modal
              isOpen={modalInfoClient}
              onRequestClose={closeModalInfoClient}
              ariaHideApp={false}
              overlayClassName={styles.modal_info_client_overlay}
              className={styles.modal_info_client}
            >
              <div className={styles.modal_clients}>
                <img
                  src={
                    `https://api-streaming.onrender.com/uploads/${data.photo_profile}` ||
                    sza
                  }
                  alt={"Client image" || data.name}
                />
                <div className={styles.name_clients}>
                  <h4>Nome:</h4>
                  <span>{"Client name" || data.name}</span>
                </div>
                <div className={styles.email_clients}>
                  <h4>Email:</h4>
                  <span>{"Client email" || data.email}</span>
                </div>
                <div className={styles.services_clients}>
                  <h4>Serviços:</h4>
                  <hr />
                  <div>
                    <Image
                      src={netflix}
                      alt="Serviços"
                      width={160}
                      height={160}
                    />
                    <Image
                      src={netflix}
                      alt="Serviços"
                      width={160}
                      height={160}
                    />
                    <Image
                      src={netflix}
                      alt="Serviços"
                      width={160}
                      height={160}
                    />
                    <Image
                      src={netflix}
                      alt="Serviços"
                      width={160}
                      height={160}
                    />
                  </div>
                </div>
                <div className={styles.btn_clients}>
                  <button className={`${styles.btn_renovar} btn_default`}>
                    Renovar
                  </button>
                  <button className={`${styles.btn_delete} btn_default`}>
                    Eliminar
                  </button>
                </div>
              </div>
            </Modal>

            <Modal
              isOpen={modalDeleteClient}
              onRequestClose={closeModalDeleteClient}
              ariaHideApp={false}
              className={styles.modal_delete}
              overlayClassName={styles.modal_delete_overlay}
            >
              <img
                src={`https://api-streaming.onrender.com/uploads/${image}`}
                alt={name}
              />
              <p>{name}</p>
              <span>Tem a certeza que deseja eliminar este cliente?</span>
              <div className={styles.button_group}>
                <button
                  className={`btn_default ${styles.btn_delete}`}
                  onClick={() => {
                    handlerDeleteAccountService();
                  }}
                >
                  Confirmar
                </button>
              </div>
            </Modal>

            <Modal
              isOpen={modalEditClient}
              onRequestClose={closeModalEditClient}
              ariaHideApp={false}
              className={styles.modal_edit}
              overlayClassName={styles.modal_delete_overlay}
            >
              <form
                encType="multipart/form-data"
                action="POST"
                onSubmit={handlerEditClient}
                className={styles.form_edit}
              >
                <div className={styles.person_datas}>
                  <header>
                    <h2>Dados pessoais</h2>
                    <span>Editar os dados do cliente.</span>
                  </header>

                  <div className={styles.form_group}>
                    <div className={"input_icon"}>
                      <HiOutlineMail />
                      <input
                        type="text"
                        placeholder={clientName}
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
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
                        placeholder="WhatsApp"
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        required
                      />
                    </div>

                    <div className={"input_icon"}>
                      <input
                        type="date"
                        placeholder="Data de nascimento"
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
                        placeholder="Digite seu e-mail"
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
                        placeholder="Digite seu PIN"
                        value={data.code_pin}
                        onChange={(e) => setCodePin(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className={styles.form_group}>
                    <div className={"input_icons"}>
                      <TbLock />
                      <input
                        placeholder="Palavra-passe"
                        autoComplete="false"
                        value={data.password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        type={toggle ? "text" : "password"}
                      />
                      <button onClick={handlerEditClient}>
                        {toggle ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                      </button>
                    </div>

                    <div className={"input_icons"}>
                      <TbLock />
                      <input
                        autoComplete="false"
                        placeholder="Confirmar"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        type={toggle ? "text" : "password"}
                      />
                      <button onClick={handlerEditClient}>
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
                    isOpen={openModalEditPhoto}
                    onRequestClose={closeModal}
                    overlayClassName={styles.modal_edit_image_overlay}
                    ariaHideApp={false}
                    className={styles.modal_edit_image}
                  >
                    <div className={styles.Modal_image}>
                      <div className={styles.alert}>
                        {smsError ? (
                          <div className={styles.message_error}>
                            <p>Preencha todos os campos correctamente!</p>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className={styles.heading}>
                        <h2>Foto de perfil</h2>
                        <span>Selecione uma foto de perfil.</span>
                      </div>

                      <div className={styles.photo}>
                        <label htmlFor="imgService">
                          <FaUserAlt />
                          <input
                            type="file"
                            id="imgService"
                            ref={refImage}
                            required
                            style={{ display: "none" }}
                            onChange={(e) => {
                              setInputFile(e.target.files[0].name);
                            }}
                          />
                        </label>
                        <label htmlFor="imgService">
                          {inputFile == ""
                            ? "Atualize uma imagem para o cliente"
                            : inputFile}
                        </label>
                      </div>

                      <div className={styles.button_register}>
                        <button onClick={handlerEditClient} type="submit">
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
            </Modal>
          </div>
        </div>
      </section>
    </>
  );
}
