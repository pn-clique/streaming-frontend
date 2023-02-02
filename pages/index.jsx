import { banner, logo, services } from "../assets/";
import Framer from "../components/Carousel";
import { motion } from 'framer-motion' 

import Image from "next/image";

import styles from '../styles/index.module.scss';
import Link from "next/link";


export default function HomePage() {

  return (
    <div className="home_page">
      <header className={styles.header_nav}>
        <div>
          <Link href="#">
            <Image 
              src={logo}
              alt="PN Clique logo"
              className={styles.logo}
            />
          </Link>
          <nav>
            <div className="buttons_auth">
              <Link href={"#"}>Entrar</Link>
              <Link href={"#"}>Registrar</Link>
            </div>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className={styles.hero}>
        <div>
          <main>
            <Image src={banner} alt="Banner Streaming" className={styles.banner} />
            <form className={styles.form_login}>
              <header>
                <h2>Fazer login</h2>
                <span>Faça login e desfrute dos nossos serviços</span>
              </header>
              <div className={styles.form_group}>
                <input type="email" placeholder="Digite seu email:" />
              </div>
              <div className={styles.form_group}>
                <input type="password" placeholder="Digite seu password:" />
              </div>
              <div className={styles.form_group}>
                <button type="submit">Entrar</button>
              </div>
            </form>
          </main>
        </div>
      </section>

      {/* OURS SERVICES */}
      <section className={styles.ours_services}>
        <div>
          <div className={styles.ours_services_info}>
            <div className={styles.title}>
              <h2>Nossos serviços</h2>
              <div></div>
            </div>
            <p>É um fato estabelecido há muito tempo que um leitor se distrairá com o conteúdo legível de uma página ao olhar para seu layout. O ponto de usar Lorem Ipsum é que ele tem uma distribuição mais ou menos normal de letras, ao contrário de usar 'Conteúdo aqui, conteúdo aqui', fazendo com que pareça inglês legível. </p>
          </div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            
          >
            <Image src={services} alt="Nossos serviços" />
          </motion.div>
        </div>
      </section>

      {/* NEW RELEASES */}
      <section className="new_releases">
        <h1>New releases</h1>
      </section>

      {/*  CAROUSEL INFINITY */}
      {/* <section className="carousel_infinity">
        <h1>CAROUSEL INFINITY</h1>
      </section> */}
      <Framer />

      {/*  FOOTER */}
      <footer className={styles.footer}>
        <Image src={logo} alt="PN Clique Logo" />
        <span>@PNCliqueStreaming2022.com</span>
        <div>
          <Link href={'#'}>Sobre</Link>
          <span></span>
          <Link href={'#'}>Contatos</Link>
          <span></span>
          <Link href={'#'}>Perguntas frequentes</Link>
          <span></span>
          <Link href={'#'}>Centro de ajuda</Link>
          <span></span>
          <Link href={'#'}>Termos de serviços</Link>
          <span></span>
          <Link href={'#'}>Politica de privacidade</Link>
        </div>
      </footer>
    </div>
  )
}