
import Image from 'next/image'
import Link from 'next/link'

import { motion } from 'framer-motion'

import { logo, netflix } from '../../assets'
import styles from './styles.module.scss'

import { useState } from 'react'

import ModalNewService from './ModalNewService'
import ModalAddAccountService from './ModalAddAccountService'



export default function Dashboard() {

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

      {/* ESTATISTIC */}
      <section className={styles.statistics}>
        <div>
          <motion.div
            initial={{x: -100, opacity: 0, scale: 0, rotate: '160deg'}}
            animate={{x: 0, opacity: 1, scale: 1, rotate: '0deg'}}
            transition={{duration: 1, delay: 0.5}}
          >
            <h4>Serviços</h4>
            <span>38</span>
          </motion.div>
          <motion.div
            initial={{x: -100, opacity: 0, scale: 0, rotate: '160deg'}}
            animate={{x: 0, opacity: 1, scale: 1, rotate: '0deg'}}
            transition={{duration: 1, delay: 1}}
          >
            <h4>Contas de serviços</h4>
            <span>25</span>
          </motion.div>
          <motion.div
            initial={{x: -100, opacity: 0, scale: 0, rotate: '160deg'}}
            animate={{x: 0, opacity: 1, scale: 1, rotate: '0deg'}}
            transition={{duration: 1, delay: 1.5}}
          >
            <h4>Clientes</h4>
            <span>24.590</span>
          </motion.div>
          <motion.div
            initial={{x: -100, opacity: 0, scale: 0, rotate: '160deg'}}
            animate={{x: 0, opacity: 1, scale: 1, rotate: '0deg'}}
            transition={{duration: 1, delay: 2}}
          >
            <h4>Parceiros</h4>
            <span>8.129</span>
          </motion.div>
        </div>
      </section>


      
      {/* SERVICES */}
      <section className={styles.services}>
        <div>
          <header>
            <div>
              <h2>Nossos serviços</h2>
              <div></div>
            </div>
            <ModalNewService ModalIsOpen={ModalIsOpen} closeModal={closeModal} />
            <button onClick={openModal} className="btn_default">Adicionar serviço</button>
            
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
          <button className="btn_default">Mostrar mais serviços</button>
        </div>
      </section>

      {/* SERVICES ACCOUNT */}
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
  )
}