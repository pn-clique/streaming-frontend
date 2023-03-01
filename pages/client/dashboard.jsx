import Image from "next/image";
import Link from "next/link";

import { logo, netflix } from "../../assets";
import styles from "./styles.module.scss";

import { motion } from "framer-motion";
import { Api } from "../../api/axios";

import { useRouter } from "next/router";

import SuggestGame from "../../components/suggestGame";
import { useState, useEffect } from "react";

// Modal
import Modal from "react-modal";

// ICONS
import { IoMdNotifications, IoIosNotifications } from "react-icons/io";

// Skeleton
import Skeleton from "../../components/Skeleton";

import { Loader } from "../../components/Loader";
import ModalBuyService from "./ModalBuyService";
import { CarouselMyServices } from "../../components/CarouselMyServices";

export default function Dashboard() {
  const [isLoader, setIsLoader] = useState(true);

  // console.log(isLoader)

  const [isOpen, setIsOpen] = useState(false);
  const [suggestionIsOpen, setSuggestionIsOpen] = useState(false);
  const [modalBuyServiceIsOpen, setModalBuyServiceIsOpen] = useState(false);
  const [suggestion, setSuggestion] = useState([]);
  const [suggestionMovieId, setSuggestionMovieId] = useState("");
  const [accountService, setAccountService] = useState([]);
  const [myAccounts, setMyAccounts] = useState([]);
  const [services, setServices] = useState([]);


  // PROPS MODAL BUY SERVICE
  const [serviceImage, setServiceImage] = useState('')
  const [serviceName, setServiceName] = useState('')
  const [servicePrice, setServicePrice] = useState('31')
  const [serviceDuraction, setServiceDuraction] = useState('')

  const modalServiceBuy = {
    serviceImage,
    serviceName,
    servicePrice,
    serviceDuraction
  }


  const navigate = useRouter();

  function modalIsOpen() {
    setIsOpen(true);
  }

  async function closeModal() {
    window.location.reload(false);
    await setSuggestionMovieId("");
    setIsOpen(false);
  }

  function suggestionModalIsOpen() {
    setSuggestionIsOpen(true);
  }

  function suggestionCloseModal() {
    setSuggestionIsOpen(false);
  }

  function modalBuyServicesOpen() {
    setModalBuyServiceIsOpen(true);
  }

  function modalBuyServicesClose() {
    setModalBuyServiceIsOpen(false);
  }

  function handlerLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("permission");

    navigate.push("/login");
  }

  const loadingAccountServices = async () => {
    const res = await Api.get("/account-service");
    setAccountService(res.data.accountServices);
    console.log(res.data.accountServices);
  };
  function getMyAccountServices() {
    Api.get("/my-account-services")
      .then((res) => {
        res.data.accountServicesOfTheUser;
        setMyAccounts(res.data.accountServicesOfTheUser);
      })
      .catch((error) => console.log("Erro: ", error));
  }

  function getServices() {
    Api.get("/services")
      .then((res) => {
        res.data.services;
        setServices(res.data.services);
      })
      .catch((error) => console.log("Erro: ", error));
  }

  const loadMovieFromApi = () => {
    setTimeout(() => {
      setIsLoader(false);

      fetch(
        "https://api.themoviedb.org/3/trending/all/day?api_key=8c55f9e819a9e2f5b48651b3b39ca6f1"
      )
        .then((res) => res.json())
        .then((data) => {
          const arr = [];
          for (let content of data.results) {
            arr.push(content);
          }
          setSuggestion(arr);
          console.log("suggestion: ", arr);
        });
    }, 2000);
  };

  let name = "";

  if (typeof window !== "undefined") {
    name = localStorage.getItem("name");
  }

  useEffect(() => {
    let permission = localStorage.getItem("permission");
    if (
      permission == 0 ||
      permission == null ||
      permission == "undefined" ||
      permission == ""
    ) {
      navigate.push("/login");
      //window.location.reload()
    }

    if (permission == 1) {
      navigate.push("/admin/dashboard");
    }

    loadingAccountServices();
    getMyAccountServices();
    loadMovieFromApi();
    getServices();
  }, []);

  console.log("Account", myAccounts);
  console.log("Account", services);

  if (isLoader) {
    return <Loader />;
  }

  return (
    <>
      <header className={styles.header_nav}>
        <div>
          <motion.div
            initial={{ x: -100, opacity: 0, scale: 0 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/">
              <Image src={logo} alt="PN Clique logo" className={styles.logo} />
            </Link>
          </motion.div>
          <motion.nav
            initial={{ x: 100, opacity: 0, scale: 0 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href={"./notification"}
              className={`btn_default ${styles.notification}`}
            >
              <IoMdNotifications />
              <span>4</span>
            </Link>
            <button
              type="button"
              onClick={handlerLogout}
              className={"btn_default"}
            >
              Terminar sessão
            </button>
          </motion.nav>
        </div>
      </header>

      {/* HERO */}

      <section className={styles.hero}>
        <div>
          <motion.div
            className={styles.welcome}
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h4>Olá, {name}</h4>
            <h1>Bem-vindo(a) de volta! </h1>
          </motion.div>
          <div className={styles.hero_info}>
            <div>
              <motion.header
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h4>O que deseja ver hoje?</h4>
              </motion.header>

              <motion.span
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Veja as nossas sugestões diarias
              </motion.span>

              <div className={styles.divisor_barra}>
                <motion.hr
                  initial={{ x: "-100%", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                />

                <motion.span
                  initial={{ x: "-100%", opacity: 0, rotate: "360deg" }}
                  animate={{ x: 0, opacity: 1, rotate: "0deg" }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  Ou
                </motion.span>

                <motion.hr
                  initial={{ x: "-100%", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1 }}
                />
              </div>
              <motion.p
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
              >
                Ajude-nos a encontrar o que desejas assistir.
              </motion.p>
              <SuggestGame
                movie={suggestion}
                isOpen={isOpen}
                closeModal={closeModal}
              />
              <motion.button
                className={"btn_default"}
                type="button"
                onClick={modalIsOpen}
                initial={{ x: "-100%", opacity: 0, scaleX: 0 }}
                animate={{ x: 0, opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.5, delay: 1.4 }}
              >
                Jogo de sugestões
              </motion.button>
            </div>
            <div>
              {suggestion == "" ? (
                <>
                  <div className={styles.container_skeleton}>
                    <Skeleton
                      width={"141px"}
                      height={200}
                      borderRadius={"0.25rem"}
                    />
                    <Skeleton
                      width={"141px"}
                      height={200}
                      borderRadius={"0.25rem"}
                    />
                    <Skeleton
                      width={"141px"}
                      height={200}
                      borderRadius={"0.25rem"}
                    />
                  </div>
                </>
              ) : (
                <>
                  <Modal
                    isOpen={suggestionIsOpen}
                    onRequestClose={suggestionCloseModal}
                    ariaHideApp={false}
                    overlayClassName={styles.modal_overlay}
                    className={styles.Modal_new_service}
                  >
                    <form className={styles.form}>
                      <button onClick={suggestionCloseModal}>X</button>

                      {suggestion.map((data, key) => {
                        if (data.id == suggestionMovieId)
                          return (
                            <div className={styles.movie_info} key={key}>
                              <div>
                                <img
                                  src={`https://image.tmdb.org/t/p/w500/${data.backdrop_path}`}
                                  alt="Image"
                                />
                              </div>
                              <div>
                                <h4>Título:</h4>
                                <span>{data.original_title}</span>
                              </div>
                              <div>
                                <h4>Gênero:</h4>
                                <span>Desenho animado</span>
                              </div>
                              <div>
                                <h4>Ano de lançamento:</h4>
                                <span>{data.release_date}</span>
                              </div>
                              <div>
                                <p>{data.overview}</p>
                              </div>
                            </div>
                          );
                      })}
                    </form>
                  </Modal>
                  {suggestion
                    .map((movie) => (
                      <motion.div
                        onClick={() => {
                          setSuggestionMovieId(movie.id);
                          suggestionModalIsOpen();
                        }}
                        className={styles.card}
                        initial={{ y: 200, opacity: 0, scaleY: 0 }}
                        animate={{ y: 0, opacity: 1, scaleY: 1 }}
                        transition={{ duration: 0.5, delay: 1.6 }}
                        key={movie.id}
                      >
                        <img
                          src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
                          alt="Image"
                        />
                        <header>
                          <span>{movie.title}</span>
                        </header>
                      </motion.div>
                    ))
                    .splice(-3)}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* NEW RELEASES */}
      <section className={styles.new_releases}>
        <div className={styles.heading}>
          <h1>Meus serviços</h1>
          <p>Selecione um serviço para mais informações</p>
        </div>
        <CarouselMyServices myAccounts={myAccounts} services={services} />
      </section>

      {/* OURS SERVICES */}
      <section className={styles.ours_services}>
        <div>
          <motion.header
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 5 }}
          >
            <h2>Outros serviços</h2>
            <div></div>
          </motion.header>

          <div>
            {accountService == "" ? (
              <div className={styles.container_skeleton_others_services}>
                <Skeleton width={"100%"} height={50} borderRadius={"0.25rem"} />
                <Skeleton width={"100%"} height={50} borderRadius={"0.25rem"} />
                <Skeleton width={"100%"} height={50} borderRadius={"0.25rem"} />
              </div>
            ) : accountService.length === 0 ? (
              <div className={styles.no_services}>
                <h2>Sem nenhuma conta de serviço!</h2>
                <span>
                  Compre os nossos serviços para poder usufruir mais do que
                  temos a lhe oferecer
                </span>
              </div>
            ) : (
              <>
                {accountService.map((data, key) => (
                  <motion.div
                    className={styles.card}
                    initial={{ y: 200, opacity: 0, scale: 0 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 5.5 }}
                    key={key}
                  >
                    <div>
                      <ModalBuyService
                        service_id={data.service_id?._id}
                        account_id={data._id}
                        ModalIsOpen={modalBuyServiceIsOpen}
                        closeModal={modalBuyServicesClose}
                        data={modalServiceBuy}
                      />
                      <img
                        src={`https://api-streaming.onrender.com/uploads/${
                          data.service_id?.image || data.image
                        }`}
                        alt={data.service_id?.name || "Serviço"}
                      />
                      <span>{data.service_id?.name || "Nome invalido"}</span>
                      <span className={styles.preco_service}>{data.service_id?.preco || "preço invalido"}</span>
                    </div>
                    <button
                      type="button"
                      className={"btn_default"}
                      onClick={() => {
                        setServiceImage(data.service_id.image);
                        setServiceName(data.service_id.name);
                        setServicePrice(data.service_id.preco);
                        setServiceDuraction(data.service_id.duracao);
                        modalBuyServicesOpen()
                      }}
                    >
                      Comprar
                    </button>
                  </motion.div>
                ))}
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
