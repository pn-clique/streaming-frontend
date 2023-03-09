// NEXT
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

// REACT
import { useState, useEffect, useRef } from "react";

// MOTION
import { motion } from "framer-motion";

// Skeleton
// import { Skeleton } from '../../../components/Skeleton';

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

  const [ourClients, setOurClients] = useState([]);
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

  const [filterService, setFilterService] = useState("");
  const [accountService, setAccountService] = useState([]);

  // Mudar o estado da palavra-passe
  const [toggle, setToggle] = useState(true);
  const [smsError, setSmsError] = useState(false);

  const [inputFile, setInputFile] = useState("");

  const [modalAddServiceClient, setModalAddClientService] = useState(false);

  function openModalAddServiceClient() {
    setModalAddClientService(true);
  }

  function closeModalAddServiceClient() {
    setModalAddClientService(false);
  }

  function callAccountService() {
    Api.get("account-service")
      .then((res) => {
        setAccountService(res.data.accountServices);
        console.log(res.data.accountServices);
      })
      .catch((error) => console.log("Erro: ", error));
  }

  useEffect(() => {
    callAccountService();

    let token = localStorage.getItem("token");
    if (
      token == "Token inválido" ||
      token == "token não informado" ||
      token == "Token malformatado" ||
      token == "Erro no token"
    ) {
      navigate.push("/login");
    }

    Api.get("/clients")
      .then((res) => {
        res.data.user;
        setOurClients(res.data.user);
      })
      .catch((error) => console.log("Erro: ", error));

    Api.get(`my-account-services/${ourClientId}`)
      .then((res) => {
        res.data.accountServicesOfTheUser;
        setMyAccountServices(res.data.accountServicesOfTheUser);
        console.log(res.data.accountServicesOfTheUser);
      })
      .catch((error) => console.log("Erro: ", error));

    Api.get("/services")
      .then((res) => {
        res.data.services;
        setServices(res.data.services);
      })
      .catch((error) => console.log("Erro: ", error));
  }, [ourClientId]);

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
  const [searchEmail, setSearchEmail] = useState("");
  const [myResult, setMyResult] = useState(false);

  const data = Object.values(ourClients);
  function search_account_services(account) {
    return account.filter((item) => {
      if (item.name == search || item.email == searchEmail) {
        return item;
      }
    });
  }

  const dataFilter = Object.values(accountService);
  function filter(account) {
    return account.filter((item) => {
      if (item.service_id.name == filterService) {
        return item;
      }
    });
  }

  function handlerAddUserAccountService(e) {
    e.preventDefault();

    const data = {
      account_service_id: accountServiceId,
      user_id: ourClientId,
    };

    Api.post("/add-user-the-one-account-services", data)
      .then((res) => {
        // closeModalClient();
        res.data;
        window.location.reload();
      })
      .catch((error) => {
        console.log("Ola, erro: ", error);
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
            <Link href={"./dashboard"} className="btn_default">
              Dashboards
            </Link>
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
            <input
              type="text"
              placeholder="Pesquisar pelo email do cliente"
              value={searchEmail}
              requerid="true"
              onChange={(e) => {
                setSearchEmail(e.target.value);
                e.target.value == "" ? setMyResult(false) : setMyResult(true);
              }}
              onKeyPress={(e) => {
                setSearchEmail(e.target.value);
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
                              onClick={() => {
                                openModalInfoClient();
                                setOurClientId(account._id);
                              }}
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
              {ourClients.map((data) => {
                if (data._id == ourClientId) {
                  return (
                    <div key={data._id} className={styles.modal_clients}>
                      <img
                        src={
                          `https://api-streaming.onrender.com/uploads/${data.photo_profile}` ||
                          sza
                        }
                        alt={data.name}
                      />

                      <div className={styles.name_clients}>
                        <h4>Nome:</h4>
                        <span>{data.name}</span>
                      </div>
                      <div className={styles.email_clients}>
                        <h4>Email:</h4>
                        <span>{data.email}</span>
                      </div>
                      <h4>Serviços:</h4>
                      <hr />
                      <div className={styles.container_our_service}>
                        {myAccountServices == "" ? (
                          <div className={styles.container_skeleton_services}>
                            <Skeleton
                              width={120}
                              height={120}
                              borderRadius={"0.25rem"}
                            />
                            <Skeleton
                              width={120}
                              height={120}
                              borderRadius={"0.25rem"}
                            />
                            <Skeleton
                              width={120}
                              height={120}
                              borderRadius={"0.25rem"}
                            />
                            <Skeleton
                              width={120}
                              height={120}
                              borderRadius={"0.25rem"}
                            />
                          </div>
                        ) : (
                          <>
                            {myAccountServices.map((account) => {
                              if (account.user_id._id == data._id) {
                                return accountService.map((i) => {
                                  if (
                                    account.account_service_id?._id == i._id
                                  ) {
                                    return (
                                      <div className={styles.services_clients}>
                                        <div>
                                          <img
                                            src={`https://api-streaming.onrender.com/uploads/${i.service_id.image}`}
                                            alt="Serviços"
                                            width={160}
                                            height={160}
                                          />
                                        </div>
                                      </div>
                                    );
                                  }
                                });
                              }
                            })}
                          </>
                        )}
                      </div>
                      <button
                        onClick={() => {
                          openModalAddServiceClient();
                        }}
                        className={`${styles.btn_renovar} btn_default`}
                      >
                        Adcionar serviço
                      </button>
                      <div className={styles.btn_clients}></div>
                    </div>
                  );
                }
              })}
            </Modal>

            <Modal
              isOpen={modalAddServiceClient}
              onRequestClose={closeModalAddServiceClient}
              ariaHideApp={false}
              className={styles.modal_Add_service_client}
              overlayClassName={styles.modal_Add_service_client_overlay}
            >
              <header>
                <h2>Filtrar conta de serviço</h2>
                <p>Filtre a conta de serviço para adicionar ao cliente.</p>
              </header>

              <div className={styles.form_group}>
                <input
                  type="text"
                  placeholder="Pesquisar por serviço"
                  value={filterService}
                  onChange={(e) => setFilterService(e.target.value)}
                  onKeyPress={(e) => {
                    setFilterService(e.target.value);
                  }}
                />
              </div>
              {filter(dataFilter).map((filter) => {
                if (filter.in_day != 0) {
                  return (
                    <div>
                      <img
                        src={`https://api-streaming.onrender.com/uploads/${filter.service_id.image}`}
                      />
                      <span>{filter.count_service_email} </span>

                      <button
                        onClick={(e) => {
                          setAccountServiceId(filter._id);
                          handlerAddUserAccountService(e);
                        }}
                      >
                        Adicionar
                      </button>
                    </div>
                  );
                }
              })}
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
