import React, { useState, useEffect, useRef } from "react";
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Modal from 'react-modal';

// chamando a api
import axios from "../../api/axios";

// components
import Layout from "../../components/layout";

// icons
import { CgClose } from 'react-icons/cg';
import { MdOutlineContentPaste } from 'react-icons/md';


// styles
import stylesHome from '../../styles/home.module.css';
import styles from '../../styles/paymentsClients.module.css';
import stylesModal from '../../styles/modal.module.css';

// logo e imgs
import LogoPnCliqueStreaming from '../../assets/logostreaming.png';
import LogoMcx from '../../assets/mcxLogo.png';
import LogoMcxExpress from '../../assets/mcxExpress.png';

const UserNewPayments = ({ theme }) => {
    const navigate = useRouter();
    const Ref = useRef(null);
    const [user, setUser] = useState([]);
    const [code_reference, setCodeReference] = useState('');
    const [lastPaymentMade, setLastPaymentMade] = useState([]);
    const [accountService, setAccountService] = useState([]);
    const [accountBalance, setAccountBalance] = useState([]);
    const [screenMobile, setScreenMobile] = useState(false);
    const [viewAccountService, setViewAccountService] = useState("");
    const [alertSuccess, setAlertSuccess] = useState(false);
    const [alertSuccess2, setAlertSuccess2] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalIsOpen2, setIsOpen2] = useState(false);
    const [paymentByMcxExpress, setPaymentByMcxExpress] = useState(false);
    const [isHideArrow, setIsHideArrow] = useState(false);


    let userId = '';
    if (typeof window !== 'undefined') {
        // Perform localStorage action
        userId = localStorage.getItem('userId');
    }

    const loadLastPaymentMade = async (id) => {
        const res = await axios.get(`/payment-last/${id}`)
        console.log('res load last payment made by user : ', res.data.data);
        setLastPaymentMade(res.data.data);
    };

    const loadingAccountServices = async () => {
        const res = await axios.get('/account-service')
        console.log('res account services : ', res.data.data);
        setAccountService(res.data.data)
    }

    const loadAccountBalance = async (id) => {
        const res = await axios.get(`/balance-current/${id}`)
        console.log('res load Account Balance of user by id : ', res.data.data);
        setAccountBalance(res.data.data);
    };

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

    const loadUser = async (id) => {
        const res = await axios.get(`/user/${id}`)
        console.log('res load user find my data : ', res.data.data);
        setUser(res.data.data);
        setCodeReference(res.data.data.reference_code);
    };

    const executeScroll = () => {
        setPaymentByMcxExpress(true);
        setTimeout(() => {
            Ref.current?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
        }, 100);
    }

    function closeModal() {
        setIsOpen(false);
        setIsHideArrow(false);
    }

    function closeModal2() {
        setIsOpen2(false);
        setIsHideArrow(false);
    }

    const functionTheChecksIfTheWidthScreen = () => {
        if (window.screen.width < 500) {
            setScreenMobile(true);
        } else {
            setScreenMobile(false);
        }
    }

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const permission = localStorage.getItem('permission');
        if (permission == 0 || permission == null || permission == "undefined" || permission == "") {
            navigate.push('/login');
            //window.location.reload()
        }
        if (permission == 1) {
            navigate('/dashboard');
        }

        loadUser(userId);
        loadingAccountServices();
        loadAccountBalance(userId);
        loadLastPaymentMade(userId);
        functionTheChecksIfTheWidthScreen();

    }, []);
    return (
        <Layout>
            <div className={stylesHome.container_home} id={theme}>
                <div className={stylesHome.section_home}>
                    {/* <div className={stylesHome.container_nav_blocks}>
                        <Carousel
                            cols={3}
                            rows={1}
                            gap={1}
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
                                <nav className={stylesHome.nav_block_new_payments_first}>
                                    <b className={stylesHome.title_nav_block_payments}>Montante </b>
                                    <strong className={stylesHome.slogan_nav_block_payments}>{lastPaymentMade.value},00 kz</strong>
                                </nav>
                            </Carousel.Item >
                            <Carousel.Item>
                                <nav className={stylesHome.nav_block_new_payments}>
                                    <b>Tipo de pagamento </b>
                                    <strong className={stylesHome.slogan_nav_block_payments}> {lastPaymentMade.payment_type}</strong>
                                </nav>
                            </Carousel.Item>
                            <Carousel.Item>
                                <nav className={stylesHome.nav_block_new_payments}>
                                    <b>Estado</b>
                                    <strong className={stylesHome.slogan_nav_block_payments}>Sucesso</strong>
                                </nav>
                            </Carousel.Item>
                            <Carousel.Item>
                                <nav className={stylesHome.nav_block_new_payments}>
                                    <b>Gerado em</b>
                                    <strong className={stylesHome.slogan_nav_block_payments}>{lastPaymentMade.creation_date}</strong>
                                </nav>
                            </Carousel.Item>
                        </Carousel >
                    </div> */}
                    <strong className={stylesHome.title_new_payments}>Fazer novo depósito</strong>
                    <div className={styles.container_new_payments}>
                        <div className={styles.new_payment}>
                            <div class={styles.div_loader}>
                                <div id={styles.circulo}></div>
                                <div class={styles.c_loader}></div>
                                <div id={styles.circulo_2}></div>
                            </div>
                            <div className={styles.status_payment}>
                                <span>Novo pagamento</span>
                                <span>Detalhes do pagamento</span>
                                <span>Confirmado</span>
                            </div>
                            <div className={styles.Choose_method_payment}>
                                <h3>Escolhe o método de pagamento</h3>
                                <nav className={styles.choose_payment_service}>
                                    <nav onClick={() => [setIsOpen(true), setIsHideArrow(true), setPaymentByMcxExpress(false)]}>
                                        <Image src={LogoMcx} className={styles.LogoMcx} alt="logo mcx pn clique streaming" />
                                    </nav>
                                    <nav onClick={() => executeScroll()}>
                                        <Image src={LogoMcxExpress} className={styles.LogoMcx} alt="logo mcx express pn clique streaming" />
                                    </nav>
                                </nav>
                            </div>

                            {
                                paymentByMcxExpress
                                    ?
                                    <div ref={Ref} id="refs" className={styles.payments_mcxExpress}>
                                        <div className={styles.container_payments_mcxExpress}>
                                            <nav className={styles.header_payment_mcxExpress}>
                                                <p>
                                                    Digite seu número de telefone associado ao Multicaixa Express abaixo, clique em Proximo passo e aprove o pagamento pelo aplicativo Express
                                                </p>
                                            </nav>
                                            <nav className={styles.data_payment_mcxExpress}>
                                                <label htmlFor="value">Montante</label>
                                                <input type="text" id="value" className="" placeholder=" Introduzir montante em AOA (min 3,000,00 - max 500,000,00)" />
                                            </nav>
                                            <nav className={styles.data_payment_mcxExpress}>
                                                <label htmlFor="number_phone">Número de Telefone</label>
                                                <input type="text" id="number_phone" className="" placeholder=" Introduzir número de telefone (244928473839)" />
                                            </nav>
                                        </div>
                                    </div>
                                    : ''
                            }

                            <div className={styles.buttons_new_payments}>
                                <button className={styles.button_next_step_new_payments}>Próximo passo</button>
                            </div>

                            <Modal
                                isOpen={modalIsOpen}
                                onRequestClose={closeModal}
                                style={screenMobile ? customStyles2 : customStyles}
                                ariaHideApp={false}
                                contentLabel="Modal of info payment mcx"
                            >
                                <nav className={styles.header_payments_steps} style={{ color: '#fff', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h3>Multicaixa</h3>
                                    <button style={{ backgroundColor: 'transparent', color: '#D81E5B', border: 'none', fontSize: '20px' }} onClick={closeModal}><CgClose /></button>
                                </nav>
                                <hr />
                                <div className={styles.container_payments_steps} style={{ color: '#fff' }}>
                                    <nav className={styles.payment_steps}>
                                        <h3>Passo 1</h3>
                                        <nav className={styles.step_1}>
                                            <span>Teu ID de referência:</span>
                                            <b style={{ color: '#D81E5B' }} value={code_reference}>{user.reference_code}</b>
                                            <span className={styles.icon_copy} onClick={(e) => navigator.clipboard.writeText(code_reference)}><MdOutlineContentPaste /></span>
                                        </nav>
                                    </nav>
                                    <nav className={styles.payment_steps}>
                                        <h3>Passo 2</h3>
                                        <nav className={styles.step_2}>
                                            <span>
                                                Vá até a um multicaixa ou Serviço Bancário na internet
                                            </span>
                                            <span>
                                                Escolha pagamentos por referência
                                            </span>
                                            <span>
                                                Introduza o código da entidade <b>00392</b>
                                            </span>
                                            <span>
                                                Introduza o número da referência gerada em cima
                                            </span>
                                            <span>
                                                Introduza o valor que quer enviar para a sua conta
                                            </span>
                                            <span>
                                                PN Clique Streaming
                                            </span>
                                            <span>Confirmar Pagamneto</span>
                                        </nav>
                                    </nav>
                                </div>
                                <hr />
                                <button
                                    onClick={() => navigate.push('/client/home')}
                                    style={{
                                        backgroundColor: '#D81E5B', border: 'none',
                                        borderRadius: '5px', width: '200px', color: '#fff',
                                        height: '30px'
                                    }}>Voltar ao site</button>
                            </Modal>
                        </div>
                        <div className={styles.show_my_services_payments}>
                            <h3>Outros serviços :</h3>
                            {
                                alertSuccess &&
                                <nav className={stylesHome.alert_sucess}>
                                    <p>Serviço adquirido com sucesso!</p>
                                </nav>
                            }
                            {
                                alertSuccess2 &&
                                <nav className={stylesHome.alert_sucess_service_purchased_error}>
                                    <p>Faça um deposito para adquirir um serviço!</p>
                                </nav>
                            }
                            {
                                accountService.map((data, key) => {
                                    return accountBalance.map((item) => {
                                        return (
                                            <div key={key} className={styles.container_my_services_payments}>
                                                <div className={styles.div_others_services_payments}>
                                                    <nav onClick={() => { setIsOpen2(true); setIsHideArrow(true); setViewAccountService(data.id) }} className={styles.data_of_the_services_payments}>
                                                        <strong className={styles.title_count_service_payments} onClick={() => setIsOpen2(true)}>{data.service_id.name}</strong>
                                                        <b className={styles.value_count_service_payments} onClick={() => setIsOpen2(true)}>{data.service_id.preco},00 kz</b>
                                                    </nav>
                                                    <button
                                                        className={styles.button_buy_account_service_payments}
                                                        onClick={
                                                            () => handleClickButtonPurchaseService(item.id, data.id, data.service_id.id)
                                                        }>Comprar</button>
                                                </div>
                                            </div>
                                        )


                                    })
                                })
                            }
                        </div>
                    </div>

                    <Modal
                        isOpen={modalIsOpen2}
                        onRequestClose={closeModal2}
                        style={screenMobile ? customStyles2 : customStyles}
                        ariaHideApp={false}
                        contentLabel="Modal of info service"
                    >
                        <button className={stylesModal.button_close_modal_info_service} onClick={closeModal2}><CgClose className={stylesModal.CgClose} /></button>
                        {
                            accountService.map((data, key) => {
                                if (data.id == viewAccountService)
                                    return accountBalance.map((item) => {
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

                </div>
            </div>
        </Layout >
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

export default UserNewPayments;