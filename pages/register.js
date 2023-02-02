import React, { useState, useContext } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import InputDate from '../components/InputDate'

// chamando a api
import axios from '../api/axios';

//icons
import {
  HiOutlineArrowNarrowLeft,
  HiOutlineMail,
  HiOutlineIdentification,
  HiOutlineUserCircle
} from "react-icons/hi";

import { MdOutlinePassword } from 'react-icons/md';
import { TbLock } from 'react-icons/tb';
import { Si1Password } from 'react-icons/si';
import {
  FiUsers,
  FiPhone
} from 'react-icons/fi';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

import { IoCalendarOutline } from 'react-icons/io'

import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineCalendar,
  AiOutlineUser,
  AiOutlineWhatsApp
} from "react-icons/ai";




// imgs
import logo from '../assets/logostreaming.png';
import ManLogin from '../assets/man_login.png';
import WomanLogin from '../assets/woman_login.png';
import UserCircle from '../assets/UserCircle.png';

//styles
import styles from '../styles/signup.module.css';

const Signup = () => {
  const navigate = useRouter();

  // states
  const [nif, setNif] = useState('');
  const [codPin, setCodPin] = useState('');
  const [photoProfile, setPhotoProfile] = useState('');
  const [sex, setSex] = useState('');
  const [nameUser, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsApp, setWhatsApp] = useState('');
  const [password, setPassword] = useState('');
  const [dateBirth, setDateBirth] = useState('');
  const [codPartners, setCodePartners] = useState(0);
  const [confirmationPassword, setConfirmationPassword] = useState('');
  const [checked, setChecked] = useState(false);
  const [querySelector, setQuerySelector] = useState('close');
  const [firstStep, setFirstStep] = useState(true);
  const [secondStep, setSecondStep] = useState(false);
  const [TreeStep, setTreeStep] = useState(false);
  const [error, setError] = useState(false);

  const handleFileChange = (e) => {
    setPhotoProfile(e.target.files[0]);
  }
  const handleRegister = (e) => {
    e.preventDefault();

    const config = {
      headers: { 'Content-Type': 'multipart/form-data' }
    }

    if (photoProfile == '') {
      setError(true);
    }
    if (password < 7) { setError(true)}
      if (password != c_password) { setError(true)}

    axios.post('/register',
      {
        email: email, password: password, phone: phone,
        nif: nif, whatsApp: whatsApp, date_birth: dateBirth,
        partners_code: codPartners, sex: sex, name: nameUser,
        code_pin: codPin, photo_profile: photoProfile, permission: checked ? 2 : 3,
         obs: 'null'
      }, config
    )
      .then((res) => {
        console.log('data res signup register : ', res.data);
        const id = res.data.user.id;
        localStorage.setItem('userId', id);
        const token = res.data.token;
        const permission = res.data.user.permission;
        localStorage.setItem('token', token);
        localStorage.setItem('permission', permission);
        localStorage.setItem('modalSuggestion', false);
        axios.defaults.headers.Authorization = `Bearer ${token}`;
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        navigate.push('/client/home');
      })
      .catch((err) => console.log('erro na promise signup register : ', err))
      .finally();

  }

  const QSelector = () => {
    setQuerySelector('open')
  }

  const QSelectorClose = () => {
    setQuerySelector('close');
    console.log('query selector close : ', querySelector);
  }

  const nextStep1 = () => {
    //e.preventDefault();
    if (nameUser == '' || sex == '' || whatsApp == '' || phone == '' || dateBirth == '') {
      setError(true);
    } else {
      setFirstStep(false);
      setSecondStep(true);
      setTreeStep(false);
    }
  }
  const backToStep1 = () => {
    //e.preventDefault();
    setFirstStep(true);
    setSecondStep(false);
    setTreeStep(false)

  }
  const nextStep2 = () => {
    //e.preventDefault();
    if (nif == '' || codPin == '' || password == '' || confirmationPassword == '' || email == '') {
      setError(true);
    } else {
      setFirstStep(false);
      setSecondStep(false);
      setTreeStep(true);

    }
  }

  const [startDate, setStartDate] = useState(new Date());


  // Mudar o estado da palavra-passe
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)



  return (
    <div className={styles.container_register}>
      <header className={styles.header_register}>
        <div className={styles.container_header}>
          <Image
            className={styles.Image_logo_register}
            src={logo}
            alt="logo pn clique streaming"
          />
          <a onClick={() => navigate.push("/")}>
            <span>
              <HiOutlineArrowNarrowLeft />
            </span>
            <span>Página inicial</span>
          </a>
        </div>
      </header>

      <form
        encType="multipart/form-data"
        onSubmit={handleRegister}
        className={styles.container_form}>
        {error ? (
          <div className={styles.error_form}>
            <p>Por favor! Preencha todos os campos para continuar.</p>
          </div>
        ) : (
          ""
        )}
        {firstStep ? (
          <div className={styles.personal_data}>
            <Image
              className={styles.Image_man_register}
              src={ManLogin}
              alt="clique man register"
            />
            <section
              className={styles.form_personal_data}
            >
              <div className={styles.form_title}>
                <h4>Dados pessoias</h4>
                <p>Registre-se para usufruir dos nossos serviços.</p>
              </div>
              <div className={styles.form_group}>
                <div>
                  <div className={styles.input_icon}>
                    <AiOutlineUser />
                    <input
                      type="text"
                      placeholder="Digite seu nome:"
                      value={nameUser}
                      onChange={(e) => [
                        setName(e.target.value),
                        setError(""),
                      ]}
                      required
                    />
                  </div>
                  <div className={styles.input_icon}>
                    <div className={styles.select_wrapper_register}>
                      <div
                        className={
                          querySelector == "close"
                            ? styles.select_sex
                            : styles.select_sex_open
                        }
                      >
                        <div
                          className={styles.select__trigger}
                          onClick={() =>
                            querySelector == "close"
                              ? QSelector()
                              : QSelectorClose()
                          }
                        >
                          <span>
                            {sex == "" ? "Selecione seu sexo?" : sex}
                          </span>
                          <div className={styles.arrow}></div>
                        </div>
                        <div
                          className={styles.custom_options}
                          onClick={() => QSelectorClose()}
                        >
                          <span onClick={() => setSex("Homem")}>Homem</span>
                          <span onClick={() => setSex("Mulher")}>Mulher</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className={styles.input_icon}>
                    <AiOutlineWhatsApp />
                    <input
                      type="text"
                      name="whatsApp"
                      placeholder="Digite seu whatsApp:"
                      value={whatsApp}
                      onChange={(e) => [
                        setWhatsApp(e.target.value),
                        setError(""),
                      ]}
                      required
                    />
                  </div>
                  <div className={styles.input_icon}>
                    <FiPhone />
                    <input
                      type="text"
                      name="phone"
                      placeholder="Digite um número alternativo:"
                      value={phone}
                      onChange={(e) => [setPhone(e.target.value), setError("")]}
                      required
                    />
                  </div>
                </div>

                <div>
                  <div className={styles.input_icon}>
                    <AiOutlineCalendar />
                    {/* <input
                            type="datetime"
                            name="date_birth"
                            placeholder="Data de nascimento (dd/mm/aa)"
                            value={dateBirth}
                            onChange={(e) => [
                            setDateBirth(e.target.value),
                            setError(""),
                            ]}
                        /> */}
                    {/* <InputDate /> */}
                    <input
                      type="date"
                      placeholder="Data de nascimento (dd/mm/aa)"
                      value={dateBirth}
                      onChange={(e) => [
                        setDateBirth(e.target.value),
                        setError(""),
                      ]}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.form_button}>
                <button
                  type="button"
                  onClick={nextStep1}
                >
                  Próximo{" "}
                  <AiOutlineArrowRight className={styles.AiOutlineArrowRight} />
                </button>

              </div>
            </section>
            <Image
              className={styles.Image_woman_register}
              src={WomanLogin}
              alt="clique man register"
            />
          </div>
        ) : secondStep ? (
          <div className={styles.personal_data}>
            <Image
              className={styles.Image_man_register}
              src={ManLogin}
              alt="clique man register"
            />
            {/*<div className={styles.container_first_form_div}>
              <strong className={styles.title_register}>
                Dados de segurança
              </strong>
              <p className={styles.slogan_2}>
                Torne a tua conta mais segura.
              </p>
              <nav>
                <input
                  type="text"
                  name="nif"
                  className={styles.input_register}
                  placeholder="Digite o seu nif"
                  value={nif}
                  onChange={(e) => [setNif(e.target.value), setError("")]}
                />
                <input
                  type="text"
                  name="cod_pin"
                  className={styles.input_register}
                  placeholder="Digite o seu codigo pin"
                  value={codPin}
                  onChange={(e) => [setCodPin(e.target.value), setError("")]}
                />
                <input
                  type="password"
                  name="password"
                  className={styles.input_register}
                  placeholder="Digite a sua senha"
                  value={password}
                  onChange={(e) => [
                    setPassword(e.target.value),
                    setError(""),
                  ]}
                />
                <input
                  type="password"
                  name="c_password"
                  className={styles.input_register_c_password}
                  placeholder="Confirma a sua senha"
                  value={confirmationPassword}
                  onChange={(e) => [
                    setConfirmationPassword(e.target.value),
                    setError(""),
                  ]}
                />
                <input
                  type="email"
                  name="email"
                  className={styles.input_register_date_birth}
                  placeholder="Digite o seu email"
                  value={email}
                  onChange={(e) => [setEmail(e.target.value), setError("")]}
                />
              </nav>
              <div className={styles.container_buttons_register}>
                <button
                  type="button"
                  className={styles.btn_next_step_register_2}
                  onClick={backToStep1}
                >
                  <AiOutlineArrowLeft
                    className={styles.AiOutlineArrowRight_2}
                  />
                  Voltar
                </button>
                <button
                  type="button"
                  className={styles.btn_next_step_register_2}
                  onClick={nextStep2}
                >
                  Próximo
                  <AiOutlineArrowRight
                    className={styles.AiOutlineArrowRight_3}
                  />
                </button>
              </div>
                </div>*/}
            <section
              className={styles.form_personal_data}
            >
              <div className={styles.form_title}>
                <h4>Dados segurança</h4>
                <p>Torne a tua conta mais segura.</p>
              </div>

              <div className={styles.form_group_2}>
                <div>
                  <div className={styles.input_icon}>
                    <HiOutlineIdentification />
                    <input
                      type="text"
                      name="nif"
                      placeholder="Digite o seu NIF:"
                      value={nif}
                      onChange={(e) => [setNif(e.target.value), setError("")]}
                      required
                    />
                  </div>
                  <div className={styles.input_icon}>
                    <MdOutlinePassword />
                    <input
                      type="password"
                      placeholder="Digite seu PIN:"
                      value={codPin}
                      onChange={(e) => [
                        setCodPin(e.target.value),
                        setError(""),
                      ]}
                      required
                    />
                  </div>
                </div>

                <div>
                  <div className={styles.input_icons}>
                    <TbLock />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Palavra-passe:"
                      value={password}
                      onChange={(e) => [setPassword(e.target.value), setError("")]}
                      required
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (<AiOutlineEye />) : (<AiOutlineEyeInvisible />)}
                    </button>
                  </div>
                  <div className={styles.input_icons}>
                    <TbLock />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Palavra-passe:"
                      value={confirmationPassword}
                      onChange={(e) => [setConfirmationPassword(e.target.value), setError("")]}
                      required
                    />
                    <button
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (<AiOutlineEye />) : (<AiOutlineEyeInvisible />)}
                    </button>
                  </div>
                </div>

                <div>
                  <div className={styles.input_icon}>
                    <HiOutlineMail />
                    <input
                      type="email"
                      name="email"
                      placeholder="Digite seu email:"
                      value={email}
                      onChange={(e) => [setEmail(e.target.value), setError("")]}
                      required
                    />
                  </div>
                </div>

              </div>

              <div className={styles.form_button}>
                <button
                  type="button"
                  onClick={backToStep1}
                >
                  <AiOutlineArrowLeft className={styles.AiOutlineArrowRight} />
                  Voltar
                </button>
                <button
                  type="button"
                  onClick={nextStep2}
                >
                  Próximo
                  <AiOutlineArrowRight className={styles.AiOutlineArrowRight} />
                </button>

              </div>
            </section>
          </div>
        ) : TreeStep ? (
          <div className={styles.personal_data}>
            <div className={styles.form_personal_data}>
              <div className={styles.form_title}>
                <h4>Foto de perfil</h4>
                <p>Adicione uma foto de perfil.</p>
              </div>
              {/* <div className={styles.container_first_form_div_2}>
                <label htmlFor="photo_profile">
                  <Image
                    className={styles.Image_user_circle_register}
                    src={UserCircle}
                    alt="clique man register"
                  />
                </label>
                <input
                  type="file"
                  id="photo_profile"
                  name="photo_profile"
                  className={styles.input_register_file}
                  placeholder="Photo"
                  onChange={(e) => [handleFileChange(e), setError("")]}
                />
                <label>Seleciona uma foto de perfil</label>
                <label className={styles.partners}>
                  Deseja se tornar um parceiro ?{" "}
                  <input
                    type="checkbox"
                    defaultChecked={checked}
                    onChange={() => setChecked(!checked)}
                    name="partners"
                  />
                </label>
                <button
                  className={styles.button_register}
                  type="submit"
                  onMouseOver={() =>
                    sex == "" ? setSex("Homem") : setSex(sex)
                  }
                >
                  Registrar
                </button>
              </div> */}
              <div className={styles.form_group}>
                <label 
                  htmlFor="photo_profile" 
                  className={styles.Image_user_circle_register}
                    >
                  <HiOutlineUserCircle />
                </label>
                <input
                  type="file"
                  id="photo_profile"
                  name="photo_profile"
                  className={styles.input_register_file}
                  placeholder="Photo"
                  onChange={(e) => [handleFileChange(e), setError("")]}
                />
                <label htmlFor="photo_profile">Seleciona uma foto de perfil</label>
              </div>
              <div className={styles.form_group}>
                <button
                  className={styles.btn_register}
                  type="submit"
                  onMouseOver={() =>
                    sex == "" ? setSex("Homem") : setSex(sex)
                  }
                >
                  Registrar
                </button>
              </div>
              <div className={styles.form_group}>
              <label className={styles.partners}>
                  Deseja se tornar um parceiro ?{" "}
                  <input
                    type="checkbox"
                    defaultChecked={checked}
                    onChange={() => setChecked(!checked)}
                    name="partners"
                  />
                </label>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </form>
    </div>
  );
}


export default Signup;
