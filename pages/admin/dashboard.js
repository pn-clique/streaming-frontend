import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { Image } from 'next/image';
import Modal from 'react-modal';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { Chart } from "react-google-charts";
// import { Pie } from 'react-chartjs-2';

// chamando a api
import axios from "../../api/axios";

// icons
import { AiOutlineSend } from 'react-icons/ai';
import { CgInfo, CgClose, FaUsers } from 'react-icons/cg';

// styles
import styles from '../../styles/home.module.css';

// components
import Layout from '../../components/layout';

/*
export const datalinechart = [
    ["Year", "Nextflix", "HBO", "Disney Plus", "Amazon Video"],
    ["2004", 1000, 400, 200, 100],
    ["2005", 1170, 460, 50, 180],
    ["2006", 660, 1120, 500, 125],
    ["2007", 1030, 540, 585, 470],
];
*/

export const optionslinechart = {
    curveType: 'function',
    colors: ["#A33CF5", "#E8BC49", "#D01D58", "#0C8CE9", "#00FF35", "#C81C54"],
    backgroundColor: "#292828",
    legend: { position: "bottom", textStyle: { fontSize: 12, color: "#998879" } },
};

export const data = [
    ["services", "Popularity"],
    ["Netflix", 33],
    ["Disney Plus", 26],
    ["HBO", 22],
    ["Amazon Video", 10], // Below limit.
    ["Prime Video", 9], // Below limit.
];

export const options = {
    pieHole: 0.4,
    //    title: "Top 5 serviços",
    textStyle: { color: "#fff" },
    curveType: "function",
    colors: ["#A33CF5", "#D81E5B", "#075692", "#E50914", "#050729"],
    backgroundColor: "#292828",
    legend: { position: "bottom", textStyle: { fontSize: 12, color: "#998879" } },
};
export const options2 = {
    legend: "none",
    pieSliceText: "none",
    pieStartAngle: 135,
    tooltip: { trigger: "none" },
    slices: {
        0: { color: "yellow" },
        1: { color: "transparent" },
    },
};
const dashboard = ({ switchTheme, theme }) => {
    const navigate = useRouter();
    const [modallIsOpen, setModalIsOpen] = useState(false);
    const [accountServicesLength, setAccountServicesLength] = useState('');
    const [accountServicesExhaustedLength, setAccountServicesExhaustedLength] = useState(0);
    const [servicesLength, setServicesLength] = useState(0);
    const [clientsLength, setClientsLength] = useState(0);
    const [clients, setClients] = useState([]);
    const [mostPurchasedServices, setMostPurchasedServices] = useState([]);
    const [partners, setPartners] = useState([]);
    const [paymentsTodayLength, setPaymentsTodayLength] = useState(0);
    const [showService, setShowService] = useState([]);
    const [services, setServices] = useState([]);
    const [showMyServices, setShowMyServices] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [accountServices, setAccountServices] = useState([]);
    const [isHideArrow, setIsHideArrow] = useState(false);

    const [datalinechart, setDataLineChart] = useState([]);
    const [datalinechartname, setDataLineChartName] = useState([]);
    const [datapiechart, setDataPieChart] = useState([]);

/*
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
    */

    const close = () => {
        console.log("hidden");
        setDropdown("");
        document.body.addEventListener("click", close);
    };


    function openModal() {
        setIsOpen(true);
        setIsHideArrow(true);
    }

    function closeModal() {
        setIsOpen(false);
        setModalIsOpen(false);
        setIsHideArrow(false);
    }

    // função que retorna todos os serviços cadastrados
    const loadingServices = () => {
        axios.get('/services')
            .then((res) => {
                console.log('res services : ', res.data.services);
                setServices(res.data.services);
                setDataLineChart(res.data.services)
                setServicesLength(res.data.services.length)
            })
            .catch((err) => console.log('err service : ', err))
            .finally();
    }

    // função que retorna o top 5 dos serviços mais adquiridos
    const loadingTopFiveServices = () => {
        axios.get('/top-five-services')
            .then((res) => {
                console.log('res top five most purchased services : ', res.data.services);
                setMostPurchasedServices(res.data.services);
                setDataPieChart();
            })
            .catch((err) => console.log('err service : ', err))
            .finally();
    }

    // função que retorna todas contas de serviço cadastradas
    const loadingAccountServices = () => {
        axios.get('/account-service', { delayed: true })
            .then((res) => {
                console.log('res account services : ', res.data.accountServices);
                setAccountServicesLength(res.data.accountServices.length)
            })
            .catch((err) => console.log('err account service : ', err))
            .finally();
    }

    // função que retorna as ultimas 5 contas de serviço cadastradas
    const loadsTheLastFiveServiceAccounts = () => {
        axios.get('/top-five-account-services', { delayed: true })
            .then((res) => {
                console.log('res the last five service accounts : ', res.data.accountServices);
                setAccountServices(res.data.accountServices)
            })
            .catch((err) => console.log('err the last five service accounts : ', err))
            .finally();
    }

    /*
        // função que retorna o total de pagamentos feitos hoje
        const loadingAllPaymentsOftheToday = () => {
            axios.get('/payments-today')
                .then((res) => {
                    setPaymentsTodayLength(res.data.data.length)
                    console.log('res all payments of the today : ', res.data.data);
                })
                .catch((err) => console.log('err all payments of the today : ', err))
                .finally();
        }
        */

    // função que retorna todos os clientes cadastrados
    const loadingClientsLength = () => {
        axios.get('/user')
            .then((res) => {
                setClientsLength(res.data.user);
                console.log('res client cadastrados : ', res.data.user);
            })
            .catch((err) => console.log('err client cadastrados : ', err))
            .finally();
    }

    // função que retorna apenas 5 clientes
    const loadingClients = () => {
        axios.get('/clients')
            .then((res) => {
                setClients(res.data.user);
                console.log('res five client cadastrados : ', res.data.user);
            })
            .catch((err) => console.log('err five client cadastrados : ', err))
            .finally();
    }

    // função que retorna todos os parceiros cadastrados
    const loadingPartners = () => {
        axios.get('/partners')
            .then((res) => {
                setPartners(res.data.user);
                console.log('res partners cadastrados : ', res.data.user);
            })
            .catch((err) => console.log('err partners cadastrados : ', err))
            .finally();
    }

    /*
        //função que retorna todas as contas de serviço esgotada
        const loadingAccountServicesExhaustedLength = () => {
            axios.get('/accounts')
                .then((res) => {
                    setAccountServicesExhaustedLength(res.data.data.length);
                    console.log('res account services exhausted : ', res.data.data);
                })
                .catch((err) => console.log('err account services exhausted : ', err))
                .finally();
        }
    
        // função que seta as contas de serviços como esgotada de acordo a data de fim da conta de serviço
        const FunctionThatSetAnAccountAsExhausted = () => {
            axios.get('/accounts/exhausted')
                .then((res) => {
                    console.log('res set an account as exhausted : ', res.data.data);
                })
                .catch((err) => console.log('err set an account as exhausted : ', err))
                .finally();
        }
    */
    const hasServices = () => {
        if (servicesLength === 0) {
            setShowMyServices(false);
        } else {
            setShowMyServices(true);
        }
        console.log('show my services : ', showMyServices)
    }

    // função que retorna a informação de um determinado serviço ou que me retorna um serviço
    const handleClickButtonInfo = async (id) => {
        const res = await axios.get(`/services/${id}`);
        console.log('res show a services : ', res.data.services);
        setShowService(res.data.services);
        setModalIsOpen(true);
        setIsHideArrow(true);
    }

    useEffect(() => {

        const permission = localStorage.getItem('permission');
        if (permission == 0 || permission == null || permission == "undefined" || permission == "") {
            navigate.push('/login');
            //window.location.reload()
        }
        if (permission == 3) {
            navigate.push('/client/home');
        }

        hasServices();
        loadingClients();
        loadingPartners();
        loadingServices();
        loadingClientsLength();
        loadingTopFiveServices();
        loadingAccountServices();
        //loadingAllPaymentsOftheToday();
        loadsTheLastFiveServiceAccounts();
        /*
        const interval = setInterval(() => {
            FunctionThatSetAnAccountAsExhausted();
            loadingAccountServicesExhaustedLength();
        }, 5000);
        return () => clearInterval(interval); */
    }, []);

    return (
        <Layout>
            <div className={styles.container_home} id={theme}>
                <div className={styles.section_dashboard}>
                    <div className={styles.section_home_texts}>
                        


                        {/*
                            <div>
                            
                                <Slider {...settingsSliderCarousel}>
                                    <Slide className={styles.slogan_nav_block} >
                                        <div style={{ width: 225 }} onClick={() => navigate.push('/admin/services')}>
                                            <b className={styles.slogan_nav_block}>Serviços cadastrados.</b>
                                            <strong>{servicesLength}</strong>
                                        </div>
                                    </Slide>
                                    <Slide className={styles.slogan_nav_block} >
                                        <div style={{ width: 225 }} onClick={() => navigate.push('/admin/account-services')}>
                                            <b className={styles.slogan_nav_block}>Contas de serviços cadastradas.</b>
                                            <strong>{accountServicesLength}</strong>
                                        </div>
                                    </Slide>
                                    <Slide className={styles.slogan_nav_block} >
                                        <div style={{ width: 225 }} onClick={() => navigate.push('/admin/users')}>
                                            <b className={styles.slogan_nav_block}>Clientes cadastrados.</b>
                                            <strong >{clientsLength.length}</strong>
                                        </div>
                                    </Slide>
                                    <Slide className={styles.slogan_nav_block} >
                                        <div style={{ width: 225 }} onClick={() => navigate.push('/admin/account-services-exhausted')}>
                                            <b className={styles.slogan_nav_block}>Contas de serviços esgotadas.</b>
                                            <strong> {accountServicesExhaustedLength} </strong>
                                        </div>
                                    </Slide>
                                    <Slide className={styles.slogan_nav_block} >
                                        <div style={{ width: 225 }} onClick={() => navigate.push('/admin/history-payments')}>
                                            <b className={styles.slogan_nav_block}>Pagamentos feitos hoje.</b>
                                            <strong className={styles.data_nav_block}> {paymentsTodayLength} </strong>
                                        </div>
                                    </Slide>
                                </Slider>
                        </div>

                         <div>
                                <Carousel
                                    cols={3}
                                    rows={1}
                                    gap={6}
                                    hideArrow={isHideArrow}
                                    responsiveLayout={
                                        [
                                            {
                                                breakpoint: 1200,
                                                cols: 3
                                            },
                                            {
                                                breakpoint: 990,
                                                cols: 2
                                            }
                                        ]
                                    }
                                    mobileBreakpoint={670}
                                    loop>

                                    < Carousel.Item >
                                    </Carousel.Item >
                                    <Carousel.Item>
                                        <nav className={styles.nav_block_dashboard} onClick={() => navigate.push('/admin/account-services')}>

                                        </nav>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <nav style={{ marginRight: '250px' }} className={styles.nav_block_dashboard} onClick={() => navigate.push('/admin/users')}>

                                        </nav>
                                    </Carousel.Item>
                                </Carousel>

                                <div className={styles.nav_block_dashboard} onClick={() => navigate.push('/admin/account-services-exhausted')}>
                                    >
                                </div>
                                <div className={styles.nav_block_dashboard} onClick={() => navigate.push('/admin/history-payments')}>

                                </div>
                            </div> */}

                        <div className={styles.container_charts_dashboard}>
                            <div className={styles.container_first_charts}>
                                <h3>Serviços mais adquiridos</h3>
                                <p>Adicionar novo serviço</p>
                                <Chart
                                    chartType="LineChart"
                                    width="100%"
                                    height="400px"
                                    data={[
                                        datalinechart.map(i => i.name),
                                        datalinechart.map(d => d.id),
                                        datalinechart.map(d => d.purchase_number)
                                    ]}
                                    options={optionslinechart}
                                />

                            </div>
                            {/**
                             * <div className={styles.container_second_charts}>
                                <nav>
                                    <h3>Top 5 dos serviços mais adquiridos</h3>

                                    <Chart
                                        chartType="PieChart"
                                        width="100%"
                                        height="400px"
                                        data={[
                                            [mostPurchasedServices.map(i => [i.id, i.name, i.pontos, i.preco, i.obs])],
                                            mostPurchasedServices.map(d => d.purchase_number)
                                        ]}
                                        options={options}
                                    />

                                </nav>
                                <nav>
                                    <h3>Serviços mais rentaveis</h3>
                                    <Chart
                                        chartType="PieChart"
                                        width="100%"
                                        height="400px"
                                        data={data}
                                        options={options}
                                    />
                                </nav>
                            </div>
                             */}
                        </div>

                        <div>

                            <div className={styles.container_account_services}>
                                <h3>Contas de serviços</h3>
                                <span>Estas são as últimas contas de serviços cadastradas.</span>
                                {
                                    accountServices.map((data, key) => {
                                        return (
                                            <div key={key} className={styles.container_account_services_items}>
                                                <img src={`http://127.0.0.1:8000${data.service_id.image}`} alt="img account service" />
                                                <strong>{data.id}</strong>
                                                <strong>{data.count_service_email}</strong>
                                                <strong>{data.password}</strong>
                                                <strong>{data.n_remaining_customers}</strong>
                                                <strong className={data.in_day ? styles.account_service_item_activo : styles.account_service_item_esgotado}>{data.in_day ? 'Activo' : 'Esgotado'}</strong>
                                            </div>
                                        )
                                    })
                                }
                                <button onClick={() => navigate.push('/admin/account-services')} className={styles.account_service_button}>Mostrar todas contas de serviços</button>
                            </div>

                            <div className={styles.container_account_services}>
                                <h3>Clientes</h3>
                                <span>Estes são os últimos clientes</span>
                                {/* <Carousel
                                        cols={4}
                                        rows={1}
                                        gap={6}
                                        hideArrow={isHideArrow}
                                        responsiveLayout={
                                            [
                                                {
                                                    breakpoint: 1200,
                                                    cols: 3
                                                },
                                                {
                                                    breakpoint: 990,
                                                    cols: 2
                                                }
                                            ]
                                        }>
                                        {
                                            clients.map((data, key) => {
                                                return (
                                                    < Carousel.Item key={key} >
                                                        <div className={styles.container_clients_items}>
                                                            <img src={`http://127.0.0.1:8000${data.photo_profile}`} alt="img account service" />
                                                            <strong>{data.name}</strong>
                                                        </div>
                                                    </Carousel.Item>
                                                )
                                            })
                                        }
                                    </Carousel> */}
                                <button onClick={() => navigate.push('/admin/users')} className={styles.account_service_button}>Mostrar todos clientes</button>
                            </div>

                            <div className={styles.container_account_services}>
                                <h3>Parceiros</h3>
                                <span>Estes são os últimos parceiros</span>
                                {/* <Carousel
                                        cols={4}
                                        rows={1}
                                        gap={6}
                                        hideArrow={isHideArrow}
                                        responsiveLayout={
                                            [
                                                {
                                                    breakpoint: 1200,
                                                    cols: 3
                                                },
                                                {
                                                    breakpoint: 990,
                                                    cols: 2
                                                }
                                            ]
                                        }>
                                        {
                                            partners.map((data, key) => {
                                                return (
                                                    < Carousel.Item key={key} >
                                                        <div className={styles.container_clients_items}>
                                                            <img src={`http://127.0.0.1:8000${data.photo_profile}`} alt="img account service" />
                                                            <strong>{data.name}</strong>
                                                        </div>
                                                    </Carousel.Item>
                                                )
                                            })
                                        }
                                    </Carousel> */}
                                <button onClick={() => navigate.push('/admin/partners')} className={styles.account_service_button}>Mostrar todos parceiros</button>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#fffdfc',
    },
};


export default Dashboard;


