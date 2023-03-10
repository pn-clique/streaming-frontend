import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

// REACT JS
import { useState, useEffect } from "react";

import { AiFillHeart } from 'react-icons/ai'

// MOTION
import { motion } from "framer-motion";

// CAROUSEL INFINITY
import Framer from "../components/LoopInfinity";

// STYLES
import styles from "../styles/index.module.scss";

// ASSETS
import {
  banner,
  logo,
  allIconesMusic,
  heartEmoji,
  loadingIcon,
} from "../assets/";

//icons
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import { TbLock } from "react-icons/tb";
import { Loader } from "../components/Loader";
import { Carousel } from "../components/Carousel";

// AXIOS API
import { Api, ApiMovies } from "../api/axios";
import axios from "axios";

import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

export default function HomePage() {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const navigate = useRouter();

  const [isLoader, setIsLoader] = useState(true);

  const [dataMovie, setDataMovie] = useState([]);

  useEffect(() => {
    axios.get(ApiMovies).then((res) => setDataMovie(res.data));

    setTimeout(() => {
      setIsLoader(false);
    }, 2000);
  }, []);

  // Mudar o estado da palavra-passe
  const [toggle, setToggle] = useState(true);

  // STATE LOADER
  const [loader, setLoader] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    if (email == "" || password == "") {
      setAlert(true);
    }

    Api.post("/auth", { email: email, password: password })
      .then((res) => {
        const id = res.data.user._id;
        localStorage.setItem("userId", id);

        const token = res.data.token;
        const permission = res.data.user.permission;
        localStorage.setItem("token", token);
        localStorage.setItem("permission", permission);
        Api.defaults.headers.Authorization = `Bearer ${token}`;
        Api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        navigate.push("/client/dashboard");
        setAlert(false);
      })
      .catch((err) => {
        setAlert(true);
      })
      .finally(() => {
        setLoader(false);
      });
  }

  return (
    <div className="home_page">
      {/* HERO */}

      <>
        <motion.header
          initial={{ y: 200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className={styles.header_nav}
        >
          <div>
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Link href="#">
                <Image
                  src={logo}
                  alt="PN Clique logo"
                  className={styles.logo}
                />
              </Link>
            </motion.div>
            <motion.nav
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="buttons_auth">
                <Link className={"btn_default"} href={"./login"}>
                  Entrar
                </Link>
                <Link className={"btn_default"} href={"/register"}>
                  Registrar
                </Link>
              </div>
            </motion.nav>
          </div>
        </motion.header>

        <motion.section
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className={styles.hero}
        >
          <div>
            <main>
              <motion.div
                initial={{ y: 200, opacity: 0, scale: 0 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <Image
                  src={banner}
                  alt="Banner Streaming"
                  width={"100%"}
                  className={styles.banner}
                />
              </motion.div>
              <motion.form
                className={styles.form_login}
                onSubmit={handleSubmit}
                initial={{ y: 300, opacity: 0, scale: 0 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 1 }}
              >
                <header>
                  {alert ? (
                    <div className={styles.message_error}>
                      <h4>
                        Alerta!
                      </h4>
                      <p>Email ou palavra-passe invalida  </p>
                    </div>
                  ) : (
                    <>
                      <h2>Fa??a login</h2>
                      <span>E experimente a aventura</span>
                    </>
                  )}
                </header>
                <div className={styles.form_group}>
                  <div className={"input_icon"}>
                    <HiOutlineMail />
                    <input
                      type="email"
                      placeholder="E-mail"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input_default"
                    />
                  </div>
                  <div className={"input_icons"}>
                    <TbLock />
                    <input
                      type={toggle == false ? "text" : "password"}
                      placeholder="Palavra-passe"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="input_default"
                    />
                    <button>
                      {toggle == false ? (
                        <AiOutlineEye />
                      ) : (
                        <AiOutlineEyeInvisible />
                      )}
                    </button>
                  </div>
                </div>
                <div className={styles.form_group}>
                  <button
                    className={"btn_default"}
                    type="submit"
                    onClick={() => {
                      setLoader(true);
                    }}
                  >
                    Entrar
                    {loader ? (
                      <Image src={loadingIcon} alt={loadingIcon} />
                    ) : (
                      ""
                    )}
                  </button>
                </div>
              </motion.form>
            </main>
          </div>
        </motion.section>

        <section className={styles.ours_services}>
          <div>
            <div className={styles.ours_services_info}>
              <div className={styles.title}>
                <h2>Nossos servi??os</h2>
                <div></div>
              </div>
              <p>
                N??s estamos aqui para ajudar voc?? a acessar todos os servi??os de
                streaming que v??o entreter voc?? e os seus. Os nossos servi??os de
                streaming s??o o lugar onde voc?? pode assistir, ouvir e brincar,
                aqui voc?? estar?? sempre entretido. Agora voc?? pode assistir seus
                shows favoritos, ouvir suas m??sicas favoritas ou jogar os mais
                novos jogos com nossa ampla sele????o de aplicativos dispon??veis.
              </p>
            </div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Image src={allIconesMusic} alt="Nossos servi??os" />
            </motion.div>
          </div>
        </section>

        <section className={styles.new_releases}>
          <div className={styles.heading}>
            <h1>Novos lan??amentos</h1>
            <p>Selecione uma imagem abaixo para mais informa????es.</p>
          </div>

          <Carousel />
        </section>

        <section className={styles.carousel_infinity}>
          <Framer />
        </section>

        <footer className={styles.footer}>
          <Image src={logo} alt="PN Clique Logo" />
          <span>
            Feito com <AiFillHeart />
            pela PNClique
          </span>
          <div>
            {/* <Link href={"#"}>Sobre</Link>
            <span></span> */}
            <Link href={"./contacts"}>Contatos</Link>
            <span></span>
            <Link href={"#"}>Perguntas frequentes</Link>
            <span></span>
            <Link href={"#"}>Centro de ajuda</Link>
            {/* <span></span>
            <Link href={"#"}>Termos de servi??os</Link>
            <span></span>
            <Link href={"#"}>Politica de privacidade</Link> */}
          </div>
        </footer>
      </>
    </div>
  );
}
