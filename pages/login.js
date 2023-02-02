import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

// chamando a api
import axios from '../api/axios.js';

//icons
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { HiOutlineMail } from 'react-icons/hi'
import { TbLock } from 'react-icons/tb'

// imgs
import logo from '../assets/logo.png';
import ManLogin from '../assets/man_login.png';
import WomanLogin from '../assets/woman_login.png';

//styles
import styles from '../styles/signin.module.css';

const Login = () => {
    const navigate = useRouter();

    // states
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        if (email == '' || password == '') {
            setError(true);
        }
        axios.post('/auth', { email: email, password: password })
            .then((res) => {
                console.log('data res signin login : ', res.data.user);
                const id = res.data.user.id;
                localStorage.setItem('userId', id);

                console.log('usersss id : ', id);
                const token = res.data.token;
                const permission = res.data.user.permission;
                localStorage.setItem('token', token);
                localStorage.setItem('permission', permission);
//                localStorage.setItem('admin', permission);
                localStorage.setItem('modalSuggestion', true);
                axios.defaults.headers.Authorization = `Bearer ${token}`;
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                navigate.push('/client/home');
                setError(false)

            })
            .catch((err) => { console.log('erro na promise signin login : ', err); setError(true) })
            .finally();

    }

    // Mudar o estado da palavra-passe
    const [toggle, setToggle] = useState(false)



    return (
      <div className={styles.container_login}>
        <header className={styles.header_login}>
          <div className={styles.container_header}>
            <Image
              className={styles.Image_logo_login}
              src={logo}
              alt="logo pn clique streaming"
            />
            <nav>
              <a onClick={() => navigate.push("/")}>
                <span>
                  <HiOutlineArrowNarrowLeft />
                </span>
                <span>Voltar para a página inicial</span>
              </a>
            </nav>
          </div>
        </header>

        <div className={styles.body_login}>
          <Image
            className={styles.Image_man_login}
            src={ManLogin}
            alt="clique man login"
          />
          <form className={styles.form_login} onSubmit={handleLogin}>
          <div style={{ display: "flex", flexDirection: "column" }}>
          {error ? (
            <div className={styles.error_login}>
              <p>Email ou palavra-passe incorreta!</p>
            </div>
          ) : (
            ""
          )}
        </div>
            <div className={styles.form_title}>
                <h4>Faça Login</h4>
                <p>Bem vindo de volta. Por favor, insira seus dados.</p>
            </div>
            <div className={styles.form_input}>
                <div className={styles.input_icon}>
                  <HiOutlineMail />
                  <input 
                    type="email" 
                    placeholder="Email:" 
                    value={email}
                    onChange={(e) => [setEmail(e.target.value), setError("")]}
                    />
                </div>
                <div className={styles.input_icons}>
                  <TbLock />
                  <input 
                    type={toggle ? 'text' : 'password'} 
                    placeholder="Palavra-passe:" 
                    value={password}
                    onChange={(e) => [setPassword(e.target.value), setError("")]}
                    />
                    <button
                      onClick={() => setToggle(!toggle)}
                    >
                      {toggle ? (<AiOutlineEye />) : (<AiOutlineEyeInvisible />)} 
                    </button>
                </div>
            </div>
            <span
              className={styles.link_forgot_password}
            >
              Esqueceu a sua palavra-passe? <Link href={"/forgot_password"}>Clique aqui.</Link>
            </span>
            <button type="submit" className={styles.button_login}>
              Login
            </button>
            <p className={styles.create_new_account}>
                Ainda não possui uma conta? <Link className={styles.link_register} href="/register">Registre-se aqui!</Link>
            </p>
          </form>

          <Image
            className={styles.Image_woman_login}
            src={WomanLogin}
            alt="clique man login"
          />
        </div>
      </div>
    );

}

export default Login;