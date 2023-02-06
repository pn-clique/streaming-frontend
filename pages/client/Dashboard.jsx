

import Image from 'next/image';
import Link from 'next/link';

import { logo, netflix } from '../../assets';
import styles from './styles.module.scss';

import { motion } from 'framer-motion'

import SuggestGame from '../../components/suggestGame';
import { useState, useEffect } from 'react';

import { suggestion, services } from '../../dataAPI/DataClient/Datas';


import ModalInfo from './ModalInfo';
import { Loader } from '../../components/Loader';

export default function Dashboard() {

  const [isLoader, setIsLoader] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoader(false)
    }, 2000)
  }, [])

  console.log(isLoader)

  const [isOpen, setIsOpen] = useState(false);
  const [suggestionIsOpen, setSuggestionIsOpen] = useState(false);


  function modalIsOpen() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function suggestionModalIsOpen() {
    setSuggestionIsOpen(true);
  }

  function suggestionCloseModal() {
    setSuggestionIsOpen(false);
  }

  return (
    <>
    <header className={styles.header_nav}>
        <div>
          <motion.div
          initial={{x: -100, opacity: 0, scale: 0}}
          animate={{x: 0, opacity: 1, scale: 1}}
          transition={{duration: .5}}
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
          initial={{x: 100, opacity: 0, scale: 0}}
          animate={{x: 0, opacity: 1, scale: 1}}
          transition={{duration: .5}}
          >
            <button type='button' className={'btn_default'}>Terminar sessão</button>
          </motion.nav>
        </div>
      </header>

    {/* HERO */}
      {isLoader ? (<Loader />): (
        <section className={styles.hero}>
    
        <div>
          <motion.div 
          className={styles.welcome}
            initial={{x: '-100%', opacity: 0, }}
            animate={{x: 0, opacity: 1, }}
            transition={{duration: .5}}
          >
            <h4>Olá, Osvaldo Cariege</h4>
            <h1>Bem-vindo de volta! </h1>
          </motion.div>
          <div className={styles.hero_info}>
            <div>
              <motion.header
              initial={{x: '-100%', opacity: 0}}
              animate={{x: 0, opacity: 1}}
              transition={{duration: .5, delay: 0.2}}
              >
                <h4>O que deseja ver hoje?</h4>
              </motion.header>

              <motion.span
              initial={{x: '-100%', opacity: 0}}
              animate={{x: 0, opacity: 1}}
              transition={{duration: .5, delay: 0.4}}
              >Veja as sugestões de hoje</motion.span>

              <div className={styles.divisor_barra}>
                <motion.hr 
                initial={{x: '-100%', opacity: 0}}
                animate={{x: 0, opacity: 1}}
                transition={{duration: .5, delay: 0.6}}
                /> 

                <motion.span
                initial={{x: '-100%', opacity: 0, rotate: '360deg'}}
                animate={{x: 0, opacity: 1, rotate: '0deg'}}
                transition={{duration: .5, delay: 0.8}}
                >Ou</motion.span> 
                
                <motion.hr 
                initial={{x: '-100%', opacity: 0}}
                animate={{x: 0, opacity: 1}}
                transition={{duration: .5, delay: 1}}
                />
              </div>
              <motion.p
              initial={{x: '-100%', opacity: 0}}
              animate={{x: 0, opacity: 1}}
              transition={{duration: .5, delay: 1.2}}
              >Ajude-nos a encontrar o que voçê quer assistir.</motion.p>
              <SuggestGame isOpen={isOpen} closeModal={closeModal} />
              <motion.button
              className={'btn_default'} 
              type='button' 
              onClick={modalIsOpen}
              initial={{x: '-100%', opacity: 0, scaleX: 0}}
                animate={{x: 0, opacity: 1, scaleX: 1}}
                transition={{duration: .5, delay: 1.4}}
              >Jogo de sugestões</motion.button>
            </div>
            <ModalInfo ModalIsOpen={suggestionIsOpen} closeModal={suggestionCloseModal} />
            <div>
            {suggestion.map((movie) => (
              <motion.div 
                onClick={suggestionModalIsOpen}
                className={styles.card}
                initial={{y: 200, opacity: 0, scaleY: 0}}
                animate={{y: 0, opacity: 1, scaleY: 1}}
                transition={{duration: .5, delay: 1.6}}
                key={movie.id}
              >
                <Image src={movie.image} alt={movie.title} />
              </motion.div>
            ))}
            </div>
          </div>
        </div>
      
      </section>
      )}

      

      {/* OURS SERVICES */}
      <section className={styles.ours_services}>
        <div>
          <motion.header
          initial={{x: -200, opacity: 0, }}
          animate={{x: 0, opacity: 1, }}
          transition={{duration: .5, delay: 5}}
          >
            <h2>Outros serviços</h2>
            <div></div>
          </motion.header>


          <div>
            {services.map((service) => (
              <motion.div 
              className={styles.card}
              initial={{y: 200, opacity: 0, scale: 0}}
              animate={{y: 0, opacity: 1, scale: 1}}
              transition={{duration: .5, delay: 5.5}}
              key={service.id}
              >
                <div>
                  <Image src={service.image} alt={service.title} />
                  <span>{service.title}</span>
                </div>
                <button type='button' className={'btn_default'}>Comprar</button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}