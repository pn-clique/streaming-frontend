

import Image from 'next/image';
import Link from 'next/link';
import { logo, movie05, netflix } from '../../assets';
import styles from './styles.module.scss';

import ReactModal from 'react-modal'

export default function Dashboard() {
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

    {/* HERO */}
      <section className={styles.hero}>
        <div>
          <div className={styles.welcome}>
            <h4>Olá, Osvaldo Cariege</h4>
            <h1>Bem-vindo de volta! </h1>
          </div>
          <div className={styles.hero_info}>
            <div>
              <header>
                <h4>O que deseja ver hoje?</h4>
                <div className={styles.divisor}></div>
              </header>

              <Link href={'#'}>Veja as sugestões de hoje</Link>
              <div className={styles.divisor_barra}>
                <hr /> <span>Ou</span> <hr />
              </div>
              <p>Ajude-nos a encontrar o que voçê quer assistir.</p>
              <button type='button'>Jogo de sugestões</button>
            </div>

            <div>
              <div className={styles.card}>
                <Image src={movie05} alt="Movie Card" />
                <header>
                  <h4>Lucas</h4>
                  <span>Aventura</span>
                </header>
              </div>
              <div className={styles.card}>
                <Image src={movie05} alt="Movie Card" />
                <header>
                  <h4>Lucas</h4>
                  <span>Aventura</span>
                </header>
              </div>
              <div className={styles.card}>
                <Image src={movie05} alt="Movie Card" />
                <header>
                  <h4>Lucas</h4>
                  <span>Aventura</span>
                </header>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OURS SERVICES */}
      <section className={styles.ours_services}>
        <div>
          <header>
            <h2>Outros serviços</h2>
            <div></div>
          </header>
          <div>
            <div className={styles.card}>
              <div>
                <Image src={netflix} alt="Netflix" />
                <span>Netflix</span>
              </div>
              <button type='button'>Comprar</button>
            </div>
            <div className={styles.card}>
              <div>
                <Image src={netflix} alt="Netflix" />
                <span>Netflix</span>
              </div>
              <button type='button'>Comprar</button>
            </div>
            <div className={styles.card}>
              <div>
                <Image src={netflix} alt="Netflix" />
                <span>Netflix</span>
              </div>
              <button type='button'>Comprar</button>
            </div>
            <div className={styles.card}>
              <div>
                <Image src={netflix} alt="Netflix" />
                <span>Netflix</span>
              </div>
              <button type='button'>Comprar</button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}