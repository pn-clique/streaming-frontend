import React, { useState, useEffect } from "react";
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Modal from 'react-modal';
import Slider from "react-slick/lib/slider";
//import HorizontalTimeline from 'react-horizontal-timeline';

// chamando a api
import axios from "../../api/axios";

// components
//import ModalShare from '../../components/modalShare';
import Layout from "../../components/layout";

// icons
import { CgInfo, CgClose } from 'react-icons/cg';
import { FaAngleUp } from 'react-icons/fa';
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineArrowDown } from 'react-icons/ai';

// imgs
import ImFine from '../../assets/sozinho.png';
import lovingly from '../../assets/acompanhado.png';
import withMy from '../../assets/Amigos4.gif';
import withFamily from '../../assets/Familia.png';
import ArrowRight from '../../assets/ArrowRight.png';



// styles
import styles from '../../styles/home.module.css';
import stylesClientHome from '../../styles/homeClient.module.css';
import stylesModal from '../../styles/modal.module.css';

const Home = ({ theme }) => {
    const navigate = useRouter();
    const { search } = navigate.query;
    const [accountServicesUser, setAccountServicesUser] = useState([]);
    const [accountServicesUserLength, setAccountServicesUserLength] = useState('');
    const [lastPaymentMade, setLastPaymentMade] = useState(0);
    const [movieSuggestion, setMovieSuggestion] = useState([]);
    const [accountService, setAccountService] = useState([]);
    const [viewAccountService, setViewAccountService] = useState("");
    const [accountBalance, setAccountBalance] = useState([]);
    const [services, setServices] = useState([]);
    const [serviceSuggested, setServiceSuggested] = useState([]);
    const [nameUser, setNameUser] = useState('');
    const [showResultsSearch, setShowResultsSearch] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalIsOpen2, setIsOpen2] = useState(false);
    const [modalIsOpen3, setIsOpen3] = useState(false);
    const [modalForSuggestionGame, setModalForSuggestionGame] = useState(false);
    const [modalSuggestion, setModalSuggestion] = useState(false);
    const [modalSuggestion1, setModalSuggestion1] = useState(false);
    const [modalSuggestion2, setModalSuggestion2] = useState(false);
    const [modalSuggestion3, setModalSuggestion3] = useState(false);
    const [modalSuggestion4, setModalSuggestion4] = useState(false);
    const [isHideArrow, setIsHideArrow] = useState(false);
    const [showButtonGoToTop, setShowButtonGoToTop] = useState(false);
    const [screenMobile, setScreenMobile] = useState(false);
    const [checkPersonalize, setCheckPersonalize] = useState(false);
    const [valueTimeline, setValueTimeline] = useState(0);
    const [previousTimeline, setPreviousTimeline] = useState(0);

    const [alertSuccess, setAlertSuccess] = useState(false);
    const [alertSuccess2, setAlertSuccess2] = useState(false);

    const [wantToWatch, setWantToWatch] = useState('');
    const [goingToWatch, setGoingToWatch] = useState('');
    const [chooseToWatch, setChooseToWatch] = useState('');
    const [releaseYear, setReleaseYear] = useState('');

    const VALUES = [
        "1950",
        "1960",
        "1970",
        "1980",
        "1990",
        "2000",
        "2005",
        "2010",
        "2015",
        "2020",
        "2022"
    ];

    const settingsSliderCarousel = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 834,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    initialSlide: 2,
                    dots: false
                }
            },
            {
                breakpoint: 420,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    dots: false
                }
            }
        ]
    };



    let userId = '';
    let permission = '';
    let showSidebar = '';
    if (typeof window !== 'undefined') {
        // Perform localStorage action
        userId = localStorage.getItem('userId');
        permission = localStorage.getItem('permission');
        showSidebar = localStorage.getItem('showSidebar');
    }

    const showNavButtons = () => {
        setNavButtonsShow(true);
    }
    const hiddenNavButtons = () => {
        setNavButtonsShow(false);
    }

    function openModal() {
        setIsOpen(true);
        setIsHideArrow(true);
    }

    function closeModal() {
        setIsOpen(false);
        setIsHideArrow(false);
        setDropdown(" ");
    }

    function closeModal2() {
        setIsOpen3(false);
        setIsHideArrow(false);
    }

    const closeModalSuggestion = () => {
        setModalSuggestion(false);
        localStorage.setItem('modalSuggestion', false);
    }
    const closeModalSuggestion1 = () => {
        setModalForSuggestionGame(false);
    }
    const changeToNextModalSuggestion2 = () => {
        setModalSuggestion1(false);
        setModalSuggestion2(true);
    }
    const changeToNextModalSuggestion3 = () => {
        setModalSuggestion1(false);
        setModalSuggestion2(false);
        setModalSuggestion3(true);
    }
    const changeToNextModalSuggestion4 = () => {
        setModalSuggestion1(false);
        setModalSuggestion2(false);
        setModalSuggestion3(false);
        setModalSuggestion4(true);
    }

    const nextModalSuggestion1 = () => {
        setModalSuggestion(false);
        setModalForSuggestionGame(true);
        setModalSuggestion1(true);
        setIsHideArrow(true);
        if (typeof window !== 'undefined') {
            localStorage.setItem('modalSuggestion', false);
        }
    }

    const handleClickButtonFinishSuggesttion = () => {
        console.log('!!! Form suggestion game !!!');
        console.log('O que deseja assitir : ', wantToWatch);
        console.log('Com quem vai assistir : ', goingToWatch);
        console.log('Qual é a categoria : ', chooseToWatch);
        console.log('Qual é o ano de lançamento : ', releaseYear);
        /*
                axios.post('/personalize', {
                    wantToWatch: wantToWatch,
                    withWhomToWatch: goingToWatch,
                    chooseToWatch: chooseToWatch,
                    movie_year: releaseYear,
                    user_id: userId
                })
                    .then((res) => {
                        console.log('res create personalize : ', res.data.data);
                        localStorage.setItem('modalSuggestion', false);
                    })
                    .catch((err) => {
                        console.log('error in create personalize : ', err);
                    })
            }
        */
    
            const loadingDataAccountServicesOfUser = (id) => {
                axios.get(`/user/${id}`)
                    .then((res) => {
                        console.log('home account services of user : ', res.data.user);
                        console.log('home account services of user id : ', res.data.data.services.account_service_id);
                      //  setAccountServicesUser(res.data.data.services);
                     //   setAccountServicesUserLength(res.data.data.services.length);
                        setNameUser(res.data.user.name)
                    })
                    .catch((error) => {
                        console.log('error in get services of user : ', error);
                    })
                    .finally();
            }
            

    }

    const loadingServices = async () => {
        const res = await axios.get('/services')
        console.log('res services : ', res.data);
        setServices(res.data.services)
    }

    const loadingAccountServices = async () => {
        const res = await axios.get('/account-service')
        console.log('res account services : ', res.data);
        setAccountService(res.data.accountServices)
    }

    /*
    const loadSuggestedService = (id) => {
        axios.get(`/suggestion/${id}`)
            .then((res) => {
                console.log('user account service suggested : ', res.data.data);
                setServiceSuggested([res.data.data]);
            })
            .catch((error) => {
                console.log('error user account service suggested : ', error);
            })
            .finally();
    };
    
    const loadLastPaymentMade = (id) => {
        axios.get(`/payment-last/${id}`)
            .then((res) => {
                console.log('res load last payment made by user : ', res.data.data);
                setLastPaymentMade(res.data.data);
            })
            .catch((err) => {
                console.log('error in load last payment made : ', err);
            })
            .finally();
    };
    
    
    const loadMovieFromApi = () => {
        fetch('https://api.themoviedb.org/3/trending/all/day?api_key=8c55f9e819a9e2f5b48651b3b39ca6f1')
            .then((response) => response.json())
            .then((data) => setMovieSuggestion([data]) )
    }
    
    const loadMovieGenresFromApi = () => {
        fetch('https://api.themoviedb.org/3/trending/all/day?api_key=8c55f9e819a9e2f5b48651b3b39ca6f1')
            .then((response) => response.json())
            .then((data) => console.log('generos dos filmes :', data) )
    }
    
    const loadMovieSuggested = async (id) => {
        axios.get(`/last-movie-suggestion/${id}`)
            .then((res) => {
                console.log('response last movie suggestion : ', res);
                //setMovieSuggestion(res.data.data.data);
            })
            .catch((error) => { console.log('error in last movie suggestion : ', error) });
    }
    
    
    const loadAccountBalance = async (id) => {
        const res = await axios.get(`/balance-current/${id}`)
        console.log('res load Account Balance of user by id : ', res.data.data);
        setAccountBalance(res.data.data);
    };
    */

    const handleClickButtonPurchaseService = (account_balance_id, account_service_id, service_id) => {
        //const res = await axios.post(`user/${user_id}/service/${account_service_id}`)
        axios.put(`/service-purchased/${account_balance_id}/${service_id}/${account_service_id}`)
            .then((res) => {
                console.log('res handle button click purchase service account_balance_id : ', res.data.data);

                axios.post(`user/${userId}/service/${account_service_id}`)
                    .then((response) => {
                        console.log('res handle button click purchase service successfully : ', response.data.data);
                        setAlertSuccess(true);
                        setTimeout(() => { window.location.reload(); }, 1500)
                    })
                    .catch((error) => {
                        console.log('error handle button click purchase service successfully : ', error)
                    })
                    .finally();

            })
            .catch((error) => {
                console.log('error handle button click purchase service account_balance_id : ', error);
                setAlertSuccess2(true);
                //setTimeout(() => { window.location.reload(); }, 1500)
            })
            .finally();

    };

    const data = Object.values(accountService);

    function search_services(services) {
        return services.filter((item) => {
            if (
                item.id == search ||
                item.service_id.name == search ||
                item.service_id.preco == search ||
                item.count_service_email == search
            ) {
                return (
                    item
                );
            }
        });
    }

    const functionTheChecksIfTheScrollIsActive = () => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                setShowButtonGoToTop(true);
            } else {
                setShowButtonGoToTop(false);
            }
        });
    }

    const functionTheChecksIfTheWidthScreen = () => {
        if (window.screen.width < 500) {
            setScreenMobile(true);
        } else {
            setScreenMobile(false);
        }
    }

    const ButtonGoToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };



    useEffect(() => {
        console.log('show sidebar is : ', showSidebar);
        const modal = localStorage.getItem('modalSuggestion');
        setModalSuggestion(modal === "true" ? true : false);

        if (permission == 0 || permission == null || permission == "undefined" || permission == "") {
            navigate.push('/login');
            //window.location.reload()
        }
        if (permission == 1) {
            navigate.push('/admin/dashboard');
        }
        // loadMovieFromApi();
        //loadMovieGenresFromApi();

        loadingServices();
        //loadMovieSuggested(5);
        //loadLastPaymentMade(5);
        loadingAccountServices();
        //loadAccountBalance(userId);
        //loadSuggestedService(userId)
        //loadingDataAccountServicesOfUser(userId);
        functionTheChecksIfTheScrollIsActive();
        functionTheChecksIfTheWidthScreen();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showSidebar
        //hasServices, permission
    ]);
    return (
        <Layout
            setShowResultsSearch={setShowResultsSearch}>
            <div className={styles.container_home} id={theme}>
                <div className={styles.section_home} >
                    <div className={stylesClientHome.div_block_suggestion}>
                        <div className={stylesClientHome.nav_block_suggestion_wellcome}>
                            <strong>Olá, {nameUser}</strong>
                            <h3>Bem-vindo de volta!</h3>
                        </div>
                        <div className={stylesClientHome.div_block_suggestion_body}>
                            <div className={stylesClientHome.nav_block_suggestion_body_1}>
                                <b>O que deseja ver hoje ?</b>
                                <p className={stylesClientHome.help_us_suggestion}>Ajude-nos a encontar o que você quer assistir.</p>
                                <p className={stylesClientHome.view_suggestion}>Veja as sugestões de hoje <Image className={stylesClientHome.ArrowRightViewSuggestion} src={ArrowRight} alt="logo pn clique streaming" /> </p>
                                <p className={stylesClientHome.AiOutlineArrowDown}><AiOutlineArrowDown /></p>
                                <nav className={stylesClientHome.container_buttons_div_block_suggestion}>
                                    <button onClick={() => setModalSuggestion(true)} className={stylesClientHome.btn_suggestion_game}>Jogo de sugestões</button>
                                    <button onClick={() => navigate.push('/client/new-payments')} className={stylesClientHome.btn_your_account}>Carrega a sua conta</button>
                                </nav>
                            </div>
                            <nav className={stylesClientHome.nav_block_suggestion_body_2}>
                                {
                                    movieSuggestion.map((data, key) => {
                                        return (
                                            <div className={stylesClientHome.div_block_movie_suggestion}>
                                                <img className={stylesClientHome.Image_movie_suggestion} src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`} alt='filmes capa' />
                                                <nav className={stylesClientHome.movie_suggestion_footer}>
                                                    <b>{data.original_title}</b>
                                                    <b>{data.categorie_1}</b>
                                                </nav>
                                            </div>
                                        )
                                    })
                                }
                            </nav>
                        </div>
                    </div>
                    <div className={stylesClientHome.section_home_items}>

                        {
                            showResultsSearch
                                ?
                                <div className={stylesClientHome.show_my_services}>
                                    <h2 className={stylesClientHome.title_result_search}>Resultados da pesquisa </h2>
                                    {
                                        search_services(data).map((data, key) => {
                                            return accountBalance.map((item) => {
                                                return (
                                                    <div key={key} className={stylesClientHome.div_others_services}>
                                                        <nav className={stylesClientHome.data_of_the_items_other_services}>
                                                            <img className={stylesClientHome.image_of_items_other_services} src={`http://127.0.0.1:8000${data.service_id.image}`} alt='service capa' />
                                                            <strong className={stylesClientHome.title_count_service_of_the_other_services} onClick={openModal}>{data.service_id.name}</strong>
                                                        </nav>
                                                        <button
                                                            className={stylesClientHome.button_buy_account_service}
                                                            onClick={
                                                                () => handleClickButtonPurchaseService(item.id, data.id, data.service_id.id)
                                                            }>Comprar</button>
                                                    </div>
                                                )
                                            })

                                        })
                                    }
                                </div>
                                :
                                <>
                                    <div className={stylesClientHome.show_my_services}>
                                        <h2 className={stylesClientHome.title_my_services} >Meus serviços </h2>
                                        {
                                            accountServicesUser.map((data, keyValue) => {
                                                return (
                                                    <div key={keyValue}>
                                                        {
                                                            services.map((item, key) => {
                                                                if (data.service_id == item.id)
                                                                    return (
                                                                        <Slider {...settingsSliderCarousel} key={key} className={stylesClientHome.container_div_blocks}>
                                                                            <div className={stylesClientHome.div_block} onClick={openModal}>
                                                                                <strong className={stylesClientHome.title_count_service}>{item.name}</strong>
                                                                            </div>

                                                                            <Modal
                                                                                isOpen={modalIsOpen}
                                                                                onRequestClose={closeModal}
                                                                                style={customStyles}
                                                                                ariaHideApp={false}
                                                                                contentLabel="Modal of info service"
                                                                            >
                                                                                <button className={stylesClientHome.button_close_modal} onClick={closeModal}><CgClose /></button>
                                                                                <div className={stylesClientHome.div_modal_info_service_customize}>
                                                                                    <h3> {item.name} </h3>
                                                                                    <b>Dados de acesso : </b>
                                                                                    <span className={stylesClientHome.options}>Email de acesso : <span>{data.count_service_email}</span></span>
                                                                                    <span className={stylesClientHome.options}>Password de acesso : <span>{data.password}</span></span>

                                                                                    <span className={stylesClientHome.options}><b>Condição do serviço :</b> {data.in_day === 1 ? 'Em dia' : 'Esgotado'}</span>
                                                                                    <nav className={stylesClientHome.nav_modal_info_service_customize}>
                                                                                        <button
                                                                                            onClick={() =>
                                                                                                [
                                                                                                    // showDropdown(),
                                                                                                    setEmailAccess(data.count_service_email),
                                                                                                    setPasswordAccess(data.password)
                                                                                                ]} >Partilhar</button>
                                                                                    </nav>
                                                                                </div>
                                                                            </Modal>
                                                                        </Slider>
                                                                    )
                                                            })
                                                        }
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>

                                    <div className={stylesClientHome.container_other_services}>
                                        <h2 className={stylesClientHome.title_other_services}>Outros serviços </h2>

                                        {
                                            alertSuccess &&
                                            <nav className={stylesClientHome.alert_sucess_2}>
                                                <p>Serviço adquirido com sucesso!</p>
                                            </nav>
                                        }
                                        {
                                            alertSuccess2 &&
                                            <nav className={stylesClientHome.alert_sucess_service_purchased_error_2}>
                                                <p>Faça um deposito para adquirir um serviço!</p>
                                            </nav>
                                        }
                                        {
                                            accountService.map((data, key) => {
                                                //   return accountBalance.map((item) => {
                                                return (
                                                    <div key={key} className={stylesClientHome.div_others_services}>
                                                        <nav className={stylesClientHome.data_of_the_items_other_services}>
                                                            <img className={stylesClientHome.image_of_items_other_services} src={`http://127.0.0.1:8000${data.service_id.image}`} alt='service capa' />
                                                            <strong className={stylesClientHome.title_count_service_of_the_other_services} onClick={() => { setIsOpen3(true); setViewAccountService(data.id) }}>{data.service_id.name}</strong>
                                                        </nav>
                                                        <button
                                                            className={stylesClientHome.button_buy_account_service}
                                                            onClick={
                                                                () => handleClickButtonPurchaseService(data.id, data.service_id.id)
                                                            }>Comprar</button>
                                                    </div>
                                                )


                                                //    })
                                            })
                                        }
                                    </div>


                                </>
                        }


                    </div>

                    {/** modal de info sobre contas de serviços */}
                    <Modal
                        isOpen={modalIsOpen3}
                        onRequestClose={closeModal2}
                        style={screenMobile ? customStyles2 : customStyles}
                        ariaHideApp={false}
                        contentLabel="Modal of info service"
                    >
                        <button className={stylesModal.button_close_modal_info_service} onClick={closeModal2}><CgClose className={stylesModal.CgClose} /></button>
                        {
                            accountService.map((data, key) => {
                                if (data.id == viewAccountService)
                                    return accountBalance.map((item, key) => {
                                        return (
                                            <div className={stylesModal.div_modal_info_service}>
                                                <h3>Dados da conta de serviços</h3>
                                                <label>Estas são as informações da conta de serviço</label>
                                                <img src={`http://127.0.0.1:8000${data.service_id.image}`} alt="icon of the service" className={stylesModal.img_info_service} />
                                                <nav>
                                                    <span className={stylesModal.modal_info_service_span_1}>Nª: {data.service_id.id}</span>
                                                    <span className={stylesModal.modal_info_service_span_2}>Nome: {data.service_id.name}</span>
                                                </nav>
                                                <nav>
                                                    <span className={stylesModal.modal_info_service_span_1}>Pontos: {data.service_id.pontos}</span>
                                                    <span className={stylesModal.modal_info_service_span_3}>Preço: {data.service_id.preco},00kz</span>
                                                    <span className={stylesModal.modal_info_service_span_3}>Duração: {data.service_id.duracao} dias</span>
                                                </nav>
                                                <span className={stylesModal.modal_info_service_span_4}>Estado: {data.in_day == 1 ? 'Em dia' : 'Esgotado'}</span>
                                                <button
                                                    className={stylesModal.modal_info_service_btn_purchase}
                                                    onClick={
                                                        () => {
                                                            handleClickButtonPurchaseService(item.id, data.id, data.service_id.id);
                                                            closeModal2()
                                                        }
                                                    }>Comprar</button>
                                            </div>
                                        )
                                    })
                            })
                        }
                    </Modal>

                    {/** modal de inicio do jogo de sugestões */}
                    <Modal
                        isOpen={modalSuggestion}
                        onRequestClose={closeModalSuggestion}
                        style={screenMobile ? customStyles2 : customStylesSuggestion}
                        ariaHideApp={false}
                        contentLabel="Modal of well come suggestion game"
                    >
                        <button className={stylesModal.button_close_modal} onClick={closeModalSuggestion}><CgClose className={stylesModal.CgClose} /></button>
                        <div className={stylesModal.container_modal_game_suggestion}>
                            <b>Olá, {nameUser} </b>
                            <h3> Seja bem-vindo(a) ao jogo de sugestões </h3>
                            <p className={stylesModal.text}>Ajuda-nos a encontrar o que desejas assistir, respondendo a 5 questões. </p>

                            <button className={stylesModal.btn_init} onClick={nextModalSuggestion1}>Começar</button>
                        </div>
                    </Modal>

                    {/** modal de jogo de sugestões */}
                    <Modal
                        isOpen={modalForSuggestionGame}
                        onRequestClose={closeModalSuggestion1}
                        style={screenMobile ? customStyles2 : customStylesSuggestion}
                        ariaHideApp={false}
                        contentLabel="Modal of the suggestion game"
                    >
                        <button className={stylesModal.button_close_modal} onClick={closeModalSuggestion1}><CgClose className={stylesModal.CgClose} /></button>
                        {
                            modalSuggestion1
                                ?
                                <div className={stylesModal.container_modal_game_suggestion}>
                                    <b>01. </b>
                                    <h3> O que deseja assistir ? </h3>
                                    <nav className={stylesModal.nav_options}>
                                        <span onClick={() => { setWantToWatch('Movie'); changeToNextModalSuggestion2() }} className={stylesModal.options}>Filmes </span>
                                        <span onClick={() => { setWantToWatch('series'); changeToNextModalSuggestion2() }} className={stylesModal.options}>Séries </span>
                                    </nav>

                                    <button onClick={changeToNextModalSuggestion2} className={stylesModal.btn_next_modal_1}>Próximo <AiOutlineArrowRight className={stylesModal.AiOutlineArrowRight} /></button>
                                </div>
                                :
                                modalSuggestion2
                                    ?
                                    <div className={stylesModal.container_modal_game_suggestion}>
                                        <b>02. </b>
                                        <h3> Com quem você vai assistir ? </h3>
                                        <p className={stylesModal.text_slug_modal}> Seleciona a opção que desejar. </p>
                                        <nav className={stylesModal.nav_options_2}>
                                            <nav onClick={() => { setGoingToWatch('alone'); changeToNextModalSuggestion3() }} className={stylesModal.options_2}>
                                                <Image className={stylesModal.image_suggestion} src={ImFine} alt="Estou de boa icon" />
                                                <label>Estou de boa</label>
                                            </nav>
                                            <nav onClick={() => { setGoingToWatch('lovingly'); changeToNextModalSuggestion3() }} className={stylesModal.options_2}>
                                                <Image className={stylesModal.image_suggestion} src={lovingly} alt="Estou com o amor icon" />
                                                <label>Com o amor</label>
                                            </nav>
                                            <nav onClick={() => { setGoingToWatch('withMy'); changeToNextModalSuggestion3() }} className={stylesModal.options_2}>
                                                <Image className={stylesModal.image_suggestion} src={withMy} alt="Com os meus icon" />
                                                <label>Com os meus</label>
                                            </nav>
                                            <nav onClick={() => { setGoingToWatch('withFamily'); changeToNextModalSuggestion3() }} className={stylesModal.options_2}>
                                                <Image className={stylesModal.image_suggestion} src={withFamily} alt="Com a familia icon" />
                                                <label>Com a familia</label>
                                            </nav>
                                        </nav>

                                        <button onClick={changeToNextModalSuggestion3} className={stylesModal.btn_next_modal_2}>Próximo <AiOutlineArrowRight className={stylesModal.AiOutlineArrowRight} /></button>
                                    </div>
                                    :
                                    modalSuggestion3
                                        ?
                                        <div className={stylesModal.container_modal_game_suggestion}>
                                            <b>03. </b>
                                            <h3> Seleciona o quê você quer hoje ? </h3>
                                            <p className={stylesModal.text_slug_modal}> Pode selecionar até 3 opções. </p>
                                            <nav className={stylesModal.nav_options_3}>
                                                <span onClick={() => { setChooseToWatch('Comedia'); changeToNextModalSuggestion4() }} className={stylesModal.options_3}>Quero rir </span>
                                                <span onClick={() => { setChooseToWatch('Suspence'); changeToNextModalSuggestion4() }} className={stylesModal.options_3}>Quero um bom susto </span>
                                                <span onClick={() => { setChooseToWatch('Drama'); changeToNextModalSuggestion4() }} className={stylesModal.options_3}>Quero chorar </span>
                                                <span onClick={() => { setChooseToWatch('Acção'); changeToNextModalSuggestion4() }} className={stylesModal.options_3}>Quero Ação </span>
                                                <span onClick={() => { setChooseToWatch('Infantil'); changeToNextModalSuggestion4() }} className={stylesModal.options_3}>Algo infantil </span>
                                                <span onClick={() => { setChooseToWatch('Mistério'); changeToNextModalSuggestion4() }} className={stylesModal.options_3}>Um mestério insano </span>
                                                <span onClick={() => { setChooseToWatch('Aprendizado'); changeToNextModalSuggestion4() }} className={stylesModal.options_3}>Aprender algo novo </span>
                                                <span onClick={() => { setChooseToWatch('Aventura'); changeToNextModalSuggestion4() }} className={stylesModal.options_3}>Uma boa aventura </span>
                                                <span onClick={() => { setChooseToWatch('Romance'); changeToNextModalSuggestion4() }} className={stylesModal.options_3}>Quero amor </span>
                                                <span onClick={() => { setChooseToWatch('Me supreenda'); changeToNextModalSuggestion4() }} className={stylesModal.options_3}>Não sei, me supreenda </span>
                                            </nav>

                                            <button onClick={changeToNextModalSuggestion4} className={stylesModal.btn_next_modal_1}>Próximo <AiOutlineArrowRight className={stylesModal.AiOutlineArrowRight} /></button>
                                        </div>
                                        :
                                        modalSuggestion4
                                            ?
                                            <div className={stylesModal.container_modal_game_suggestion}>
                                                <b>04. </b>
                                                <h3> Qual é o ano de lançamento ? </h3>
                                                <p className={stylesModal.text_slug_modal}> Seleciona a época entre 1900 até ao ano actual. </p>
                                                <nav className={stylesModal.nav_options_4}>
                                                    {/* <HorizontalTimeline
                                                    styles={{ outline: '#615f5f', foreground: '#D81E5B' }}
                                                    index={valueTimeline}
                                                    indexClick={(index) => {
                                                        setValueTimeline(index);
                                                        setPreviousTimeline(valueTimeline);
                                                    }}
                                                    values={VALUES}
                                                /> */}
                                                </nav>

                                                <button onClick={() => handleClickButtonFinishSuggesttion()} className={stylesModal.btn_next_modal_1}>Concluir <AiOutlineArrowRight className={stylesModal.AiOutlineArrowRight} /></button>
                                            </div>
                                            : ''
                        }
                    </Modal>

                </div>
                <div className={styles.top_to_btm}>
                    {
                        showButtonGoToTop
                        &&
                        <FaAngleUp onClick={ButtonGoToTop} className={styles.icon_style} />
                    }
                </div>
            </div>
        </Layout >
    )
}

const customStylesSuggestion = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#292828',
        width: '500px'
    },
};
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#292828',
    },
};

const customStyles2 = {
    content: {
        top: '10%',
        left: '15%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '0',
        transform: 'translate(50%, 50%)',
        backgroundColor: '#292828',
        width: '500px'
    },
};


export default Home;
