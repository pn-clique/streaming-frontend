import Image from "next/image";
import Link from "next/link";

import { logo } from "../assets/";

import styles from "../styles/register.module.scss";

export default function Register() {
  return (
    <div>
      <header className={styles.header_nav}>
        <div>
          <Link href="#">
            <Image src={logo} alt="PN Clique logo" className={styles.logo} />
          </Link>
          <nav>
            <Link href={"/"}>Pagina inicial</Link>
          </nav>
        </div>
      </header>

      <section className={styles.register}>
        <div>
          <form action="">
            <div className={styles.person_datas}>
              <header>
                <h2>Dados pessoais</h2>
                <span>Registre-se para usufruir dos nossos serviços.</span>
              </header>

              <div className={styles.form_group}>
                <input type="text" placeholder="Digite seu nome:"/>
                <select name="" id="">
                  <option value="">Homem</option>
                  <option value="">Mulher</option>
                </select>
              </div>
              <div className={styles.form_group}>
                <input type="text" placeholder="Digite seu whatsapp:"/>
                <input type="date" placeholder="Data de nascimento:"/>
              </div>
            </div>
            <div className={styles.security_datas}>
              <header>
                <h2>Dados de segurança</h2>
                <span>Torne a sua conta mais segura.</span>
              </header>

              <div className={styles.form_group}>
                <input type="text" placeholder="Digite seu PIN:" />
              </div>

              <div className={styles.form_group}>
                <input type="password" placeholder="Digite sua palavra-passe:" />
                <input type="password" placeholder="Confirmar palavra-passe:" />
              </div>

            </div>
            <div>
              <button type="submit">Proximo</button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
