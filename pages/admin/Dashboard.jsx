
import Image from 'next/image'
import Link from 'next/link'
import { logo, netflix } from '../../assets'
import styles from './styles.module.scss'

import { useState } from 'react'



export default function Dashboard() {

  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true)
  }
  function closeModal() {
    setIsOpen(false)
  }


  return (
    <>
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
            <button type='button'>Terminar sessão</button>
          </nav>
        </div>
      </header>

      {/* ESTATISTIC */}
      <section className={styles.statistics}>
        <div>
          <div>
            <h4>Serviços</h4>
            <span>38</span>
          </div>
          <div>
            <h4>Contas de serviços</h4>
            <span>25</span>
          </div>
          <div>
            <h4>Clientes</h4>
            <span>24.590</span>
          </div>
          <div>
            <h4>Parceiros</h4>
            <span>8.129</span>
          </div>
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
            <button onClick={openModal}>Adicionar serviço</button>
            
          </header>
          <div>
            <div className={styles.card}>
              <div>
                <Image src={netflix} alt="Netflix" />
                <span>Netflix</span>
              </div>
              <div className={styles.button_group}>
                <button type='button'>Editar</button>
                <button type='button'>Apagar</button>
              </div>
            </div>
            <div className={styles.card}>
              <div>
                <Image src={netflix} alt="Netflix" />
                <span>Netflix</span>
              </div>
              <div className={styles.button_group}>
                <button type='button'>Editar</button>
                <button type='button'>Apagar</button>
              </div>
            </div>
            <div className={styles.card}>
              <div>
                <Image src={netflix} alt="Netflix" />
                <span>Netflix</span>
              </div>
              <div className={styles.button_group}>
                <button type='button'>Editar</button>
                <button type='button'>Apagar</button>
              </div>
            </div>
            <div className={styles.card}>
              <div>
                <Image src={netflix} alt="Netflix" />
                <span>Netflix</span>
              </div>
              <div className={styles.button_group}>
                <button type='button'>Editar</button>
                <button type='button'>Apagar</button>
              </div>
            </div>
          </div>
          <button>Mostrar mais serviços</button>
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
            <button>Adicionar conta de serviço</button>
          </header>
          <div>
            <div className={styles.card}>
              <div>
                <Image src={netflix} alt="Netflix" />
                <span>Netflix</span>
              </div>
              <div className={styles.button_group}>
                <button type='button'>Editar</button>
                <button type='button'>Apagar</button>
              </div>
            </div>
            <div className={styles.card}>
              <div>
                <Image src={netflix} alt="Netflix" />
                <span>Netflix</span>
              </div>
              <div className={styles.button_group}>
                <button type='button'>Editar</button>
                <button type='button'>Apagar</button>
              </div>
            </div>
            <div className={styles.card}>
              <div>
                <Image src={netflix} alt="Netflix" />
                <span>Netflix</span>
              </div>
              <div className={styles.button_group}>
                <button type='button'>Editar</button>
                <button type='button'>Apagar</button>
              </div>
            </div>
            <div className={styles.card}>
              <div>
                <Image src={netflix} alt="Netflix" />
                <span>Netflix</span>
              </div>
              <div className={styles.button_group}>
                <button type='button'>Editar</button>
                <button type='button'>Apagar</button>
              </div>
            </div>
          </div>
          <button>Mostrar mais conta de serviços</button>
        </div>
      </section>



      
    </>
  )
}