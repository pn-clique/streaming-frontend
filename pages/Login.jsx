

import axios from "axios";
import Image from "next/image";
import Link from "next/link";

import { useState, useEffect } from "react";

//icons
import { 
  AiOutlineEye,
  AiOutlineEyeInvisible
 } from 'react-icons/ai';
import { HiOutlineMail } from 'react-icons/hi';
import { TbLock } from 'react-icons/tb';

import { motion } from 'framer-motion'

import { logo } from "../assets/";

import styles from '../styles/login.module.scss';
import { Loader } from "../components/Loader";
import { Api } from "../api/axios";

export default function Login() {

  const [isLoader, setIsLoader] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoader(false)
    }, 2000)
  }, [])

    // Mudar o estado da palavra-passe
const [toggle, setToggle] = useState(true);

const [smsError, setSmsError] = useState(false)

const [email, setEmail] = useState('');
const [password, setPassword] = useState('')

// function handleSubmit(e) {
//   e.preventDefault();

//   if(email == '' && password == '') {
//     setSmsError(true)
//   }else {
//     setSmsError(false)
      
//   }

//   setToggle(!toggle);


// }

const handlerSubmit = (e) => {
  e.preventDefault();
  if (email == '' || password == '') {
    setSmsError(true);
  }
  Api.post('/auth', { email: email, password: password })
    .then((res) => {
      console.log('data res signin login : ', res.data.user);
      const id = res.data.user.id;
      localStorage.setItem('userId', id);

      console.log('usersss id : ', id);
      const token = res.data.token;
      const permission = res.data.user.permission;
      localStorage.setItem('token', token);
      localStorage.setItem('permission', permission);
      Api.defaults.headers.Authorization = `Bearer ${token}`;
      Api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      navigate.push('/client/home');

    })
    .catch((err) => { console.log('erro na promise signin login : ', err); setSmsError(true) })
    .finally();

}

  return (
    <>
    {isLoader ? (<Loader />):(
      <div>
      <header className={styles.header_nav}>
        <div>
          <motion.div
          initial={{x: -100, opacity: 0, scale: 0}}
          animate={{x: 0, opacity: 1, scale: 1}}
          transition={{duration: .5}}
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
            initial={{x: 100, opacity: 0, scale: 0}}
            animate={{x: 0, opacity: 1, scale: 1}}
            transition={{duration: .5}}
          >
            <Link className="btn_default" href={'/'}>Pagina inicial</Link>
          </motion.nav>
        </div>
      </header>

      <section className={styles.login}>
        <motion.div
          initial={{y: 200, opacity: 0, scale: 0}}
          animate={{y: 0, opacity: 1, scale: 1}}
          transition={{duration: .5, delay: 0.5}}
        >
          <form action="" onSubmit={handlerSubmit}>
            <header>
            {
                  smsError ? (
                  <div className={styles.message_error}>
                    <p>Preencha todos os campos!</p>
                  </div>
                  ) : ('')
                }
              <h2>Faça login</h2>
              <span>Bem vindo de volta. Por favor, insira seus dados.</span>
            </header>

            <div>
            <div className={'input_icon'}>
                  <HiOutlineMail />
                  <input 
                    type="email" 
                    placeholder="Email:" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
                </div>
            </div>
            <div>
            <div className={'input_icons'}>
                  <TbLock />
                  <input 
                    type={toggle ? 'text' : 'password'} 
                    placeholder="Palavra-passe:" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />
                    <button
                      onClick={handlerSubmit}
                    >
                      {toggle ? (<AiOutlineEye />) : (<AiOutlineEyeInvisible />)} 
                    </button>
                </div>
            </div>
            <div>
              <button type="submit" onClick={handlerSubmit} >Entrar</button>
            </div>
            <div className={styles.footer_login}>
              <span>Ainda não possui uma conta? <Link href={'/Register'} >Registre-se aqui</Link></span>
            </div>
          </form>
        </motion.div>
      </section>
    </div>
    )}
    </>
  )
}