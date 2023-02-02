

import Image from "next/image";
import Link from "next/link";

import { logo } from "../assets/";

import styles from '../styles/login.module.scss';

export default function Login() {

  return (
    <div>
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
            <Link href={'/'}>Pagina inicial</Link>
          </nav>
        </div>
      </header>

      <section className={styles.login}>
        <div>
          <form action="">
            <header>
              <h2>Faça login</h2>
              <span>Bem vindo de volta. Por favor, insira seus dados.</span>
            </header>

            <div>
              <input type="email" placeholder="Digite seu email:" />
            </div>
            <div>
              <input type="password" placeholder="Digite seu Palavra-passe:" />
            </div>
            <div>
              <button type="submit">Entrar</button>
            </div>
            <div className={styles.footer_login}>
              <span>Ainda não possui uma conta? <Link href={'/Register'} >Registre-se aqui</Link></span>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}