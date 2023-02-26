


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

import { useRouter } from "next/router";

import { logo } from "../assets";

import { Loader } from "../components/Loader";
import HeaderAuth from "../components/HeaderAuth";


import styles from '../styles/login.module.scss';
import { Api } from "../api/axios";


export default function Login() {
  
  const [isLoader, setIsLoader] = useState(true)
  const navigate = useRouter(); 

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


const handlerSubmit = (e) => {
  e.preventDefault();
  
  if (email == '' || password == '') {
    setSmsError(true);
  }
  Api.post('/auth', { email: email, password: password })
    .then((res) => {
      console.log('data res signin login : ', res.data.user);
      const id = res.data.user._id;
      localStorage.setItem('userId', id);
      const token = res.data.token;
      const permission = res.data.user.permission;
      const name = res.data.user.name;
      localStorage.setItem('name', name);
      localStorage.setItem('token', token);
      localStorage.setItem('permission', permission);
      Api.defaults.headers.Authorization = `Bearer ${token}`;
      Api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      navigate.push('/client/dashboard');

    })
    .catch((err) => { 
      console.log('erro na promise signin login : ', err);
      setSmsError(true);
    })
    .finally();

}

  return (
    <>
    {isLoader ? (<Loader />):(
      <div>

        <HeaderAuth />

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
                    <p>Preencha todos os campos correctamente!</p>
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
                    placeholder="E-mail" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required={true}
                    autoComplete="false"
                    />
                </div>
            </div>
            <div>
            <div className={'input_icons'}>
                  <TbLock />
                  <input 
                    type={toggle ? 'text' : 'password'}
                    placeholder="Palavra-passe" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required={true}
                    autoComplete="false"
                    />
                    <button
                      onClick={handlerSubmit}
                    >
                      {toggle ? (<AiOutlineEye />) : (<AiOutlineEyeInvisible />)} 
                    </button>
                </div>
            </div>
            <div>
              <button 
                type="submit" 
                className="btn_default"
                onClick={handlerSubmit} >Entrar</button>
            </div>
            <div className={styles.footer_login}>
              <span>Ainda não possui uma conta? <Link href={'/register'} >Registre-se aqui</Link></span>
            </div>
          </form>
        </motion.div>
      </section>
    </div>
    )}
    </>
  )
}