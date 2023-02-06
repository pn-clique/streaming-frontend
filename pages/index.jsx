import { banner, logo, services } from "../assets/";
import Framer from "../components/Carousel";
import { motion } from 'framer-motion' 

import { useState, useEffect } from "react";



import Image from "next/image";
import Link from "next/link";

import styles from '../styles/index.module.scss';



//icons
import { 
  AiOutlineEye,
  AiOutlineEyeInvisible
 } from 'react-icons/ai';
import { HiOutlineMail } from 'react-icons/hi';
import { TbLock } from 'react-icons/tb';
import { Loader } from "../components/Loader";



export default function HomePage() {

  const [isLoader, setIsLoader] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoader(false)
    }, 2000)
  }, [])

  // Mudar o estado da palavra-passe
const [toggle, setToggle] = useState(true);

function handleSubmit(e) {
  e.preventDefault();

  setToggle(!toggle);
}



  return (
    <div className="home_page">
      

      {/* HERO */}
      {
        isLoader ? (<Loader />) : (
          <>
          <motion.header 
          initial={{y: 200, opacity: 0, scale: 0}}
          animate={{y: 0, opacity: 1, scale: 1}}
          transition={{duration: 1, delay: 0.5}}
          className={styles.header_nav}>
        <div>
          <motion.div
            initial={{x: -100, opacity: 0}}
            animate={{x: 0, opacity: 1}}
            transition={{duration: 0.5}}
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
          initial={{x: 100, opacity: 0}}
          animate={{x: 0, opacity: 1}}
          transition={{duration: 0.5}}
          >
            <div className="buttons_auth">
              <Link className={'btn_default'} href={"./Login"}>Entrar</Link>
              <Link className={'btn_default'} href={"/Register"}>Registrar</Link>
            </div>
          </motion.nav>
        </div>
      </motion.header>
          <motion.section 
          initial={{y: 200, opacity: 0, scale: 0}}
          animate={{y: 0, opacity: 1, scale: 1}}
          transition={{duration: 1,}}
          className={styles.hero}
          >
        <div>
          <main>
            <motion.div
              initial={{y: 200, opacity: 0, scale: 0}}
              animate={{y: 0, opacity: 1, scale: 1}}
              transition={{duration: 1, delay: 0.5}}
            >
            <Image src={banner} alt="Banner Streaming" className={styles.banner} />
            </motion.div>
            <motion.form 
            className={styles.form_login} 
            onSubmit={handleSubmit}
            initial={{y: 300, opacity: 0, scale: 0}}
              animate={{y: 0, opacity: 1, scale: 1}}
              transition={{duration: 1, delay: 1}}
            >
              <header>
                <h2>Fazer login</h2>
                <span>Faça login e desfrute dos nossos serviços</span>
              </header>
              <div className={styles.form_group}>
                <div className={'input_icon'}>
                  <HiOutlineMail />
                  <input 
                    type="email" 
                    placeholder="Email:" 
                    required
                    />
                </div>
                <div className={'input_icons'}>
                  <TbLock />
                  <input 
                    type={toggle ? 'text' : 'password'} 
                    placeholder="Palavra-passe:" 
                    required
                    />
                    <button
                      onClick={handleSubmit}
                    >
                      {toggle ? (<AiOutlineEye />) : (<AiOutlineEyeInvisible />)} 
                    </button>
                </div>
              </div>
              <div className={styles.form_group}>
                <button className={'btn_default'} type="submit">Entrar</button>
              </div>
            </motion.form>

            {/* <button className={styles.btn_login_now}>Entrar agora</button> */}
          </main>
        </div>
      </motion.section>

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

      
      <section className="new_releases">
        <h1>New releases</h1>
      </section>

      
      <section className={styles.carousel_infinity}>
        <Framer />
      </section>

      
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
      </>
        )
      }

   
      
    </div>
  )
}