
import Image from 'next/image'
import Link from 'next/link'

import { motion } from 'framer-motion'

import { logo, netflix } from '../../assets'
import styles from './styles.module.scss'

import { useState, useEffect } from 'react'

import ModalNewService from './ModalNewService'
import ModalAddAccountService from './ModalAddAccountService'
import { services, statistics } from '../../dataAPI/DataAdmin/Datas'
import { Loader } from '../../components/Loader'



export default function Dashboard() {

  const [isLoader, setIsLoader] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoader(false)
    }, 2000)
  }, [])

  const [ModalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpenAccount, setModalIsOpenAccount] = useState(false);

  function openModal() {
    setModalIsOpen(true)
  }
  function closeModal() {
    setModalIsOpen(false)
  }

  function openModalAccount() {
    setModalIsOpenAccount(true)
  }
  function closeModalAccount() {
    setModalIsOpenAccount(false)
  }


  return (
    <>
      {isLoader ? (<Loader />) : (
        <>
        <header className={styles.header_nav}>
            <div>
              <Link href={'/'}>
                <Image 
                  src={logo}
                  alt="PN Clique logo"
                  className={styles.logo}
                />
              </Link>
              <nav>
                <Link href={'/'} type='button'>Terminar sessão</Link>
              </nav>
            </div>
          </header>
    
          <section className={styles.statistics}>
            <div>
              {statistics.map((stat) => (
                <motion.div
                initial={{y2: -100, opacity: 0, scale: 0, skewY: 5}}
                animate={{x: 0, opacity: 1, scale: 1, skewY: 0}}
                transition={{duration: 1, delay: 0.5}}
                key={stat.id}
              >
                <h4>{stat.type}</h4>
                <span>{stat.value}</span>
              </motion.div>
              ))}
            </div>
          </section>
    
          <section className={styles.services}>
            <div>
              <header>
                <motion.div
                initial={{x: '-100%', opacity: 0}}
                animate={{x: 0, opacity: 1}}
                transition={{duration: 0.5,}}
                >
                  <motion.h2>Nossos serviços</motion.h2>
                  <div></div>
                </motion.div>
                <ModalNewService ModalIsOpen={ModalIsOpen} closeModal={closeModal} />
                <motion.button 
                  onClick={openModal} 
                  className="btn_default"
                  initial={{x: '100%', opacity: 0}}
                  animate={{x: 0, opacity: 1}}
                  transition={{duration: 0.5,}}
                  >Adicionar serviço</motion.button>
                
              </header>
              <div>
                {services.map((service) => (
                  <motion.div 
                  className={styles.card}
                  initial={{y: 200, opacity: 0}}
                  animate={{y: 0, opacity: 1}}
                  transition={{duration: 0.5, delay: 1}}
                  key={service.id}
                  >
                  <div>
                    <Image src={service.image} alt={service.name} />
                    <span>{service.name}</span>
                  </div>
                  <div className={styles.button_group}>
                    <button type='button' className="btn_default">Editar</button>
                    <button type='button' className="btn_default">Apagar</button>
                  </div>
                </motion.div>
                ))}
              </div>
              <button className="btn_default">Mostrar mais serviços</button>
            </div>
          </section>
    
          <section className={styles.services}>
            <div>
              <header>
                <div>
                  <h2>Conta de serviços</h2>
                  <div></div>
                </div>
                <ModalAddAccountService ModalIsOpen={modalIsOpenAccount} closeModal={closeModalAccount} />
                <button onClick={openModalAccount}>Adicionar conta de serviço</button>
              </header>
              <div>
                <div className={styles.card}>
                  <div>
                    <Image src={netflix} alt="Netflix" />
                    <span>Netflix</span>
                  </div>
                  <div className={styles.button_group}>
                    <button type='button' className="btn_default">Editar</button>
                    <button type='button' className="btn_default">Apagar</button>
                  </div>
                </div>
                <div className={styles.card}>
                  <div>
                    <Image src={netflix} alt="Netflix" />
                    <span>Netflix</span>
                  </div>
                  <div className={styles.button_group}>
                    <button type='button' className="btn_default">Editar</button>
                    <button type='button' className="btn_default">Apagar</button>
                  </div>
                </div>
                <div className={styles.card}>
                  <div>
                    <Image src={netflix} alt="Netflix" />
                    <span>Netflix</span>
                  </div>
                  <div className={styles.button_group}>
                    <button type='button' className="btn_default">Editar</button>
                    <button type='button' className="btn_default">Apagar</button>
                  </div>
                </div>
                <div className={styles.card}>
                  <div>
                    <Image src={netflix} alt="Netflix" />
                    <span>Netflix</span>
                  </div>
                  <div className={styles.button_group}>
                    <button type='button' className="btn_default">Editar</button>
                    <button type='button' className="btn_default">Apagar</button>
                  </div>
                </div>
              </div>
              <button className="btn_default">Mostrar mais conta de serviços</button>
            </div>
          </section> 
        </>
      )}
    </>
  )
}