import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Link from 'next/link';
import Image from 'next/image';
import Modal from 'react-modal';

// hooks personalizados
import useLongPress from "../../hooks/useLongPress";

// chamando a api
import axios from "../../api/axios";

// components
import Layout from '../../components/layout';

// icons
import { BsSearch } from 'react-icons/bs';
import { AiOutlineSend, AiOutlineDelete } from 'react-icons/ai';
import { CgInfo, CgClose } from 'react-icons/cg';
import { MdOutlineArchive } from 'react-icons/md';
import { FaAngleUp } from 'react-icons/fa';

// imgs
import InfoImage from '../../assets/Info.png';

// styles
import stylesHome from '../../styles/home.module.css';
import stylesAccountServices from '../../styles/accountServices.module.css';
import styles from '../../styles/profile.module.css';


const Users = () => {
    const { action: otherAction, handlers: otherHandlers, } = useLongPress();
    const navigate = useRouter();
    const [users, setUsers] = useState([]);
    const [clientId, setClientId] = useState('');
    const [userName, setUserName] = useState('');
    const [accountName, setAccountName] = useState('');
    const [querySelector, setQuerySelector] = useState('');
    const [querySelector2, setQuerySelector2] = useState('');
    const [accountServices, setAccountServices] = useState([]);
    const [accountServicePoints, setAccountServicePoints] = useState('');
    const [accountServiceId, setAccountServiceId] = useState('');
    const [findServicebyId, setFindServiceById] = useState('');
    const [accountBalance, setAccountBalance] = useState([]);
    const [navButtonsShow, setNavButtonsShow] = useState(false);
    const [navButtonsShow1, setNavButtonsShow1] = useState(false);
    const [active, setActive] = useState(1);
    const [showUser, setShowUser] = useState([]);
    const [showMyResultServices, setShowMyResultServices] = useState(false);
    const [obsUser, setObsUser] = useState('');
    const [amountToBeDiscounted, setAmountToBeDiscounted] = useState('');
    const [remainingAmount, setRemainingAmount] = useState('');
    const [valuePayment, setValuePayment] = useState('');
    const [paymentType, setPaymentType] = useState('');
    const [findAccountBalance, setFindAccountBalance] = useState('');
    const [userIdService, setUserIdService] = useState('');
    const [filterParam, setFilterParam] = useState(["All"]);
    const [searchParams, setSearchParams] = useState("");
    const [visibleEditAccountStatus, setVisibleEditAccountStatus] = useState(false);
    const [visibleEditObsTextArea, setVisibleEditObsTextArea] = useState(false);
    const [modalIsOpenUser, setIsOpenUser] = useState(false);
    const [modalIsOpenUser3, setIsOpenUser3] = useState(false);
    const [alertSuccess, setAlertSuccess] = useState(false);
    const [alertSuccess1, setAlertSuccess1] = useState(false);
    const [alertSuccess3, setAlertSuccess3] = useState(false);
    const [alertSuccess4, setAlertSuccess4] = useState(false);
    const [alertSuccess5, setAlertSuccess5] = useState(false);
    const [showButtonGoToTop, setShowButtonGoToTop] = useState(false);
    const [modalDeleteUser, setModalDeleteUser] = useState(false);
    const [screenMobile, setScreenMobile] = useState(false);

    let userId = '';
    let permission = '';
    if (typeof window !== 'undefined') {
        // Perform localStorage action
        userId = localStorage.getItem('userId');
        permission = localStorage.getItem('permission');
    }
    function openModal() {
        setModalDeleteUser(true);
    }

    function closeModal() {
        setModalDeleteUser(false);
    }


    // Função que apaga um usuario
    const handleClickButtonDeleteUser = async (service_id) => {
        const res = await axios.delete(`user/${service_id}`);
        if (res) {
            setAlertSuccess4(true);
            setTimeout(() => { window.location.reload(); }, 1500)
        }
        console.log('res handle button click delete user : ', res.data);

    };

    // funcção que altera ou actualiza o estado da conta do usuario
    const handleEditAccountStatusUser = async (id, user_id) => {
        const res = await axios.put(`/account-status/${id}`,
            {
                active: active,
                user_id: user_id
            });
        if (res) {
            setAlertSuccess(true);
            setTimeout(() => { window.location.reload(); }, 1500)
        }
        console.log('res handle  edit account status user : ', res.data);

    };

    // função que arquiva um usuario, na verdade faz a mesma coisa que a função anterior
    // só que o active já tem valor padrão 0
    const handleArchiveUser = async (id, user_id) => {
        const res = await axios.put(`/account-status/${id}`,
            {
                active: 0,
                user_id: user_id
            });
        if (res) {
            setAlertSuccess3(true);
            setTimeout(() => { window.location.reload(); }, 1500)
        }
        console.log('res handle  edit account status user : ', res.data);

    };

    // função que edita a observação do usuario
    const handleEditUser = async (id) => {
        const res = await axios.put(`/user/update/${id}`,
            {
                obs: obsUser,
            });
        if (res) {
            setAlertSuccess1(true);
            setTimeout(() => { window.location.reload(); }, 1500)
        }
        console.log('res handle  edit obs user : ', res.data);

    };

    // função que adiciona um pagamento e uma conta de serviço ao usuario
    const handleAddPayments = (e) => {

        e.preventDefault();
        axios.post(`/user/${userIdService}/service/${accountServiceId}`)
            .then((res) => {
                console.log(' service purchased with successfully :  ', res.data.data);
                setIsOpenUser3(false);
                setAlertSuccess5(true);
            })
            .catch((err) => console.log('err res service purchased : ', err))
            .finally();

    };

    // função que actualiza o valor actual do cliente
    const updateAccountBalance = (e) => {
        e.preventDefault();

        if (remainingAmount <= 0) {
            console.log('O valor restante é menor que zero (0) : ', remainingAmount);
        } else if (remainingAmount > 0) {
            axios.put(`/account-balance/${findAccountBalance}`,
                {
                    current_balance: remainingAmount,
                    points_accumulated: accountServicePoints,
                    user_id: userIdService
                })
                .then((res) => {
                    console.log('res account balance update current balance : ', res.data.data);
                })
                .catch((err) => {
                    console.log('error in account balance update current balance : ', err);
                })
                .finally();
        }

    }

    // função que cria o historico de pagamento
    const createHistoryOfPayments = (e) => {
        e.preventDefault();

        const date = new Date();
        const day = date.getDate();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const fullDate = year + '/' + month + '/' + day;
        console.log('data de hoje : ', fullDate);

        axios.post('/history-payments',
            {
                value: valuePayment,
                payment_type: paymentType,
                service_purchase_id: findServicebyId,
                month_creation: month,
                creation_date: fullDate,
                user_id: userIdService
            })
            .then((responsePayment) => {
                console.log('res create history payment of user : ', responsePayment.data.data);

                setTimeout(() => {
                    window.location.reload();
                }, 1500)
            })
            .catch((err) => console.log('err res create history of payment : ', err))
            .finally();
    }

    // função que me retorna todas os estados da conta dos usuarios
    const loadingAccountStatusUsers = async () => {
        const res = await axios.get('/account-status');
        console.log('res account status : ', res.data.data);
        setUsers(res.data.data);
    }

    // função que me retorna todas as conta de serviço
    const loadingAccountServices = async () => {
        const res = await axios.get('/account-service');
        console.log('res account services : ', res.data.data);
        setAccountServices(res.data.data);
    }

    // função que me retorna os pagamentos
    const loadingAccountBalanceOfUsers = async () => {
        const res = await axios.get('/account-balance');
        console.log('res account balance : ', res.data.data);
        setAccountBalance(res.data.data);
    }

    const showOneUSer = async (id) => {
        const res = await axios.get(`/user/${id}`);
        console.log('res show a user : ', res.data.data);
        setShowUser(res.data.data);
        //setIsOpenUser(true);
    }

    // função que filtra e pesquisa os usuarios
    const data = Object.values(users);
    function filterUsers(items) {
        return items.filter((item) => {
            if (item.users.name == filterParam && item.users.permission == 3) {
                return (
                    item
                );
            }
        });
    }

    const QSelector = () => {
        setQuerySelector('open')
    }

    const QSelectorClose = () => {
        setQuerySelector('close');
        console.log('query selector close : ', querySelector);
    }

    const QSelector2 = () => {
        setQuerySelector2('open')
    }

    const QSelectorClose2 = () => {
        setQuerySelector2('close');
        console.log('query selector2 close : ', querySelector);
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

    const ButtonGoToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const functionTheChecksIfTheWidthScreen = () => {
        if (window.screen.width < 420) {
            setScreenMobile(true);
        } else {
            setScreenMobile(false);
        }
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
        functionTheChecksIfTheScrollIsActive();
        functionTheChecksIfTheWidthScreen();
        loadingAccountBalanceOfUsers();
        loadingAccountStatusUsers();
        loadingAccountServices();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Layout>
            <div className={stylesHome.container_home}>
                <div className={styles.section_home_users}>
                    <h2 className={styles.title_users}>Clientes</h2>
                    <div className={styles.container_search_my_service}>
                        <nav className={styles.nav_block_search_my_service}>
                            <input
                                type="search"
                                name="search"
                                placeholder="    Deseja pesquisar um cliente ?"
                                className={styles.search_my_service}
                                value={searchParams}
                                onChange={
                                    (e) => [
                                        setSearchParams(e.target.value),
                                        e.target.value == ''
                                            ? setShowMyResultServices(false)
                                            : setShowMyResultServices(true)
                                    ]
                                }
                                onKeyPress={
                                    (e) =>
                                        [
                                            setFilterParam(e.target.value),
                                            setShowMyResultServices(true)
                                        ]
                                } />
                            <button className={styles.button_search_my_service} onClick={() => [setFilterParam(searchParams), setShowMyResultServices(true)]}><BsSearch /></button>
                        </nav>
                    </div>

                    {
                        showMyResultServices ? <h2>Resultados da pesquisa :</h2>
                            :
                            <nav className={styles.nav_add_payments_users}>
                                <h2 className={styles.title_add_payments_users}>Deseja efetuar um pagamento ?</h2>
                                <button className={styles.button_add_payments_users} onClick={() => setIsOpenUser3(true)}>Sim</button>
                            </nav>
                    }


                    {
                        showMyResultServices
                        &&
                        <>
                            <div className={styles.div_clients_actions}>
                                <strong>Clientes</strong>
                                <strong>Ações</strong>
                            </div>
                            {
                                filterUsers(data).map((item, key) => {
                                    return (
                                        <>
                                            <div key={key} className={styles.container_my_users}>
                                                <nav className={styles.nav_data_users}  onClick={() => navigate.push({ pathname: '/admin/view-user', query: { user_id : data.users.id}})}>
                                                    <strong className={styles.title_data_users}>{item.users.name}</strong>
                                                </nav>
                                                <nav className={styles.nav_buttons_users}>
                                                    <button className={styles.button_delete_users} onClick={() => { setClientId(item.id); openModal() }}><AiOutlineDelete /></button>
                                                    <button className={styles.button_delete_users} onClick={() => handleArchiveUser(item.id, data.users.id)} ><MdOutlineArchive /></button>
                                                    <button
                                                        className={styles.button_state_account_users}
                                                    >Desactivar</button>
                                                </nav>

                                            </div>

                                        </>
                                    )
                                })
                            }
                        </>
                    }

                    {
                        alertSuccess &&
                        <nav className={stylesHome.alert_sucess}>
                            <p>Estado da conta do usuario alterada com sucesso!</p>
                        </nav>
                    }

                    {
                        alertSuccess1 &&
                        <nav className={stylesHome.alert_sucess}>
                            <p>Observação do usuario alterada com sucesso!</p>
                        </nav>
                    }

                    {
                        alertSuccess3 &&
                        <nav className={stylesHome.alert_sucess}>
                            <p>Usuario arquivado com sucesso!</p>
                        </nav>
                    }

                    {
                        alertSuccess4 &&
                        <nav className={stylesHome.alert_sucess}>
                            <p>Usuario apagado com sucesso!</p>
                        </nav>
                    }

                    {
                        alertSuccess5 &&
                        <nav className={stylesHome.alert_sucess}>
                            <p>Pagamento efectuado com sucesso!</p>
                        </nav>
                    }

                    {
                        !showMyResultServices
                        &&
                        <>
                            <div className={styles.div_clients_actions}>
                                <strong>Clientes</strong>
                                <strong>Ações</strong>
                            </div>
                            {
                                users.map((data, key) => {
                                    if (userId != data.users.id && data.users.permission == 3)
                                        return (
                                            <div key={key} className={styles.container_my_users}>
                                                <nav className={styles.nav_data_users} onClick={() => navigate.push({ pathname: '/admin/view-user', query: { user_id : data.users.id}})}>
                                                    <strong className={styles.title_data_users}>{data.users.name}</strong>
                                                </nav>
                                                <nav className={styles.nav_buttons_users}>
                                                    <button className={styles.button_delete_users} onClick={() => { setClientId(data.id); openModal() }}><AiOutlineDelete /></button>
                                                    <button className={styles.button_delete_users} onClick={() => handleArchiveUser(data.id, data.users.id)} ><MdOutlineArchive /></button>
                                                    <button
                                                        className={styles.button_state_account_users}
                                                    >Desactivar</button>
                                                </nav>

                                            </div>
                                        )
                                })
                            }

                            <button className={styles.button_show_all_clients}>Mostrar todos clientes</button>

                        </>
                    }

                    <Modal
                        isOpen={modalIsOpenUser3}
                        onRequestClose={closeModal}
                        style={screenMobile ? customStyles2 : customStyles}
                        ariaHideApp={false}
                        contentLabel="Modal adicionar pagamentos"
                    >
                        <button
                            className={styles.button_close_modal}
                            onClick={
                                () => {
                                    setIsOpenUser3(false);
                                    QSelectorClose();
                                    QSelectorClose2();
                                    setUserName('');
                                    setAccountName('');
                                    setValuePayment('');
                                    setAmountToBeDiscounted('');
                                    setRemainingAmount('')
                                }}><CgClose /></button><br />
                        <div className={styles.container_add_payments}>
                            <h2>Novo pagamento</h2>
                            <div className={screenMobile ? '' : styles.div_add_payment_user}>

                                <div className={stylesHome.select_of_user}>
                                    <select value={userIdService} onChange={(e) => setUserIdService(e.target.value)} className="custom-select">
                                        <option>Seleciona um cliente</option>
                                        {
                                            accountBalance.map((item, keyValue) => {
                                                if (item.user_id.id != userId && item.user_id.permission != 1 && item.user_id.permission != 2)
                                                    return (
                                                        <option value={item.user_id.id} >{item.user_id.name}</option>
                                                    )
                                            })

                                        }
                                    </select>

                                </div><br />
                                <div className={stylesHome.select_of_user}>
                                    <select value={paymentType} onChange={(e) => setPaymentType(e.target.value)} className="custom-select">
                                        <option value="0">Tipo de pagamentos</option>
                                        <option value="Tpa">Tpa</option>
                                        <option value="Númerario">Númerario</option>
                                    </select>
                                </div><br />
                                <div className={stylesHome.select_wrapper}>
                                    <div className={querySelector2 == 'close' ? stylesHome.select_of_user_2_close : stylesHome.select_of_user_2_open}>
                                        <div className={stylesHome.select__trigger} onClick={() => querySelector2 == 'close' ? QSelector2() : QSelectorClose2()}>
                                            <span>{accountName == '' ? 'Seleciona uma conta de serviço' : accountName}</span>
                                            <div className={stylesHome.arrow}></div>
                                        </div>

                                        {
                                            accountServices.map((item, keyValue) => {
                                                return (
                                                    <>
                                                        <div
                                                            className={stylesHome.custom_options_2}
                                                            key={keyValue}
                                                            onClick={
                                                                () => {
                                                                    setAccountServiceId(item.id)
                                                                    setFindServiceById(item.service_id.id)
                                                                    setAccountServicePoints(item.service_id.pontos);
                                                                    setAccountName(item.service_id.name)
                                                                    setAmountToBeDiscounted(item.service_id.preco)
                                                                    QSelectorClose2()
                                                                }} >
                                                            <span>{item.service_id.name}</span>
                                                        </div>
                                                    </>
                                                )

                                            })

                                        }
                                    </div>
                                </div><br />
                                <div className={styles.container_prices}>
                                    <input
                                        type="text"
                                        id="value"
                                        value={valuePayment}
                                        placeholder=" Valor do pagamento"
                                        onChange={
                                            (e) => [
                                                setValuePayment(e.target.value),
                                                setRemainingAmount(e.target.value - amountToBeDiscounted)
                                            ]}
                                    />
                                    <input
                                        type="text"
                                        disabled
                                        value={amountToBeDiscounted}
                                        placeholder=" Valor a ser descontado"
                                        onChange={
                                            (e) => setAmountToBeDiscounted(e.target.value)
                                        }
                                    />
                                    <input
                                        type="text"
                                        disabled
                                        value={remainingAmount}
                                        placeholder=" Valor restante"
                                        onChange={
                                            (e) => setRemainingAmount(e.target.value)
                                        }
                                    />
                                </div>
                                <button className={styles.button_add_payments}
                                    onClick={
                                        (e) => {
                                            handleAddPayments(e);
                                            updateAccountBalance(e);
                                            createHistoryOfPayments(e)
                                        }
                                    }
                                >Concluir</button>

                            </div>

                        </div>

                    </Modal>

                    {/* modal delete user */}
                    <Modal
                        isOpen={modalDeleteUser}
                        onRequestClose={closeModal}
                        style={screenMobile ? customStyles2 : customStyles}
                        ariaHideApp={false}
                        contentLabel="Apagar user"
                    >
                        <div className={stylesAccountServices.modal_delete_account}>
                            <Image src={InfoImage} alt="icon info delete user" />
                            <strong>Tem a certeza ?</strong>
                            <span>Se eliminar este cliente não voltara a vê-lo outra vez.</span>
                            <nav>
                                <button className={stylesAccountServices.button_delete_account_canceled} onClick={() => closeModal()}>Cancelar</button>
                                <button className={stylesAccountServices.button_delete_account_confirmation} onClick={() => handleClickButtonDeleteUser(clientId)}>Confirmar</button>
                            </nav>
                        </div>
                    </Modal>

                    <div className={stylesHome.top_to_btm}>
                        {
                            showButtonGoToTop
                            &&
                            <FaAngleUp onClick={ButtonGoToTop} className={stylesHome.icon_style} />
                        }
                    </div>

                </div>
            </div >
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
        transition: 'ease-in-out 0.5s',
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


export default Users;