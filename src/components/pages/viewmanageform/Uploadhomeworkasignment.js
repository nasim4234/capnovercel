import React, { Component, useEffect, useRef, useState } from "react";
import { Row, Col, Container, Button, ModalHeader, ModalFooter, Modal, ModalBody } from "reactstrap";

import { Link, useParams } from 'react-router-dom';
import Header from '../../component/Header';
import Sidebar from '../../component/Sidebar';
import { API_URL } from "../../../config";
import backIcon from "../../images/back.png";
import { useTranslation } from "react-i18next";

const Uploadhomeworkasignment = () => {
   
    const [clients, setinclients] = useState([]);
    const [trainers, settrainers] = useState([]);
    const [sesstion, setsesstion] = useState([]);
    const [blankform, setblankform] = useState([]);
    const trainerActive = useRef()
    const formFile = useRef()
    const clientSelected = useRef()
    const trainerInactive = useRef()
    const clientActive = useRef()
    const clientInactive = useRef()
    const trainerSelected = useRef()
    const groupSelected = useRef()
    const cid = useRef()
    const sessionSelected = useRef()
    const userId = localStorage.getItem('user_id');
    const selectedTrainer = localStorage.getItem('selectedTrainer');
    const selectedClient = localStorage.getItem('selectedClient');
    const selectedGroup = localStorage.getItem('selectedGroup');
    const selectedtrainerActive = localStorage.getItem('selectedtrainerActive');
    const selectedtrainerInactive = localStorage.getItem('selectedtrainerInactive');
    const selectedclientActive = localStorage.getItem('selectedclientActive');
    const selectedclientInactive = localStorage.getItem('selectedclientInactive');
    const selectedHomework = localStorage.getItem('selectedHomework');
    const userType = localStorage.getItem('userType');
    const selectedSession = localStorage.getItem('selectedSession');
    const accessToken = localStorage.getItem('accessToken');
    const [modal, setModal] = useState(false);
    const toggleModal = () => setModal(!modal);
    const [successModal, setsuccessModal] = useState(false);
    const successToggleModal = () => setsuccessModal(!successModal);
    const [loaderModal, setLoaderModal] = useState(false);
    const loaderToggleModal = () => setLoaderModal(!loaderModal);
    const { t } = useTranslation();
    


    useEffect(() => {
       
        if(userType != 3){
            getTrainers()
            getClients();
        }

        getSession();


    }, [])


    const submithomeworkform = () => {
        
        let formData = new FormData();
        let client_id = localStorage.getItem('selectedClient');
        let session_id = localStorage.getItem('selectedSession');
       
        formData.append('client_id', client_id);
        formData.append('form', formFile.current.files[0]);
        formData.append('session_id', session_id);
        if (client_id == "" || !formFile.current.files[0] || session_id == "" || clientSelected.current.value == "" || clientSelected.current.value == "Choose a client" || trainerSelected.current.value == "" || trainerSelected.current.value == "Choose a trainer" || sessionSelected.current.value == "Choose a session" || sessionSelected.current.value == "") {

            toggleModal();
            return false;

        }else{
            setLoaderModal(true)
        }
        formFile.current.value = "";

        fetch(API_URL+"/homework/client/upload", {
            method: 'POST',
            headers: {
                'x-access-token': accessToken,
            },
            body: formData
        }).then((result) => {
            // console.warn("result",result);
            result.json().then((resp) => {
                setLoaderModal(false)
                successToggleModal();

            })
        })

        

    }
   

    const getClients = () => {

        let _userId = localStorage.getItem('selectedTrainer');
        let _selectedGroup = localStorage.getItem('selectedGroup');
        let _userType = 3
        let _groupSelected = _selectedGroup === "true" ? true : false;
        let _trainer = true;
        if (_userId == "all") {
            _trainer = false;
        }


        localStorage.setItem('selectedGroup', false);
        if (_groupSelected) {
            localStorage.setItem('selectedGroup', true);
            _userType = 4;
        }

        if (clientActive.current.checked) {
            localStorage.setItem('selectedclientActive', true);
        }
        else {
            localStorage.setItem('selectedclientActive', false);

        }
        if (clientInactive.current.checked) {
            localStorage.setItem('selectedclientInactive', true);
        }
        else {
            localStorage.setItem('selectedclientInactive', false);

        }
        let url = API_URL+"/clients?user_id=" + _userId + "&status=2&trainer=" + _trainer + "&user_type=" + _userType;
        let _clientActive = clientActive.current.checked;
        let _clientInactive = clientInactive.current.checked;


        if (_clientActive && !_clientInactive) {
            url = API_URL+"/clients?user_id=" + _userId + "&status=1&trainer=" + _trainer + "&user_type=" + _userType;
        }
        else if (!_clientActive && _clientInactive) {
            url = API_URL+"/clients?user_id=" + _userId + "&status=0&trainer=" + _trainer + "&user_type=" + _userType;
        }
        else if (_clientActive && _clientInactive) {
            url = API_URL+"/clients?user_id=" + _userId + "&trainer=" + _trainer + "&user_type=" + _userType;
        }


        fetch(url,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': accessToken,
                },
            }

        ).then((response) => {
            if (response.status == 200) {
                response.json().then((result) => {
                    // console.log(result.clients)
                    if (result.status) {
                        setinclients(result.clients)
                    }

                    else {
                        alert("no data error")
                    }

                })
            }
            else if (response.status == 401) {
                logout()
            }
            else {
                console.log("network error")
            }


        }).catch(err => {
            // // console.log(err)

        })
    }
    const getSession = () => {
        let _cid = localStorage.getItem('selectedClient');

        let _hw = 0;

        

        let url = API_URL+"/sessions?cid=" + _cid + "&hw=" + _hw;


        fetch(url,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': accessToken,
                },
            }

        ).then((response) => {
            if (response.status == 200) {
                response.json().then((result) => {
                    // // console.log(result.sesstion)
                    if (result.status) {
                        setsesstion(result.sessions)
                        // // console.log(setsesstion)
                    }


                    else {
                        alert("no data error")
                    }

                })
            }
            else if (response.status == 401) {
                logout()
            }
            else {
                console.log("network error")
            }


        }).catch(err => {
            // // console.log(err)

        })
    }

    
    const getTrainers = () => {

        let url = API_URL+"/trainers?user_id=" + userId + "&status=2";
        // // console.log(trainerActive);
        let _trainerActive = trainerActive.current.checked;
        let _trainerInactive = trainerInactive.current.checked;

        if (trainerActive.current.checked) {
            localStorage.setItem('selectedtrainerActive', true);
        }
        else {
            localStorage.setItem('selectedtrainerActive', false);

        }
        if (trainerInactive.current.checked) {
            localStorage.setItem('selectedtrainerInactive', true);
        }
        else {
            localStorage.setItem('selectedtrainerInactive', false);

        }

        if (_trainerActive && !_trainerInactive) {
            url = API_URL+"/trainers?user_id=" + userId + "&status=1";;
        }
        else if (!_trainerActive && _trainerInactive) {
            url = API_URL+"/trainers?user_id=" + userId + "&status=0";
        }
        else if (_trainerActive && _trainerInactive) {
            url = API_URL+"/trainers?user_id=" + userId;
        }
        fetch(url,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': accessToken,
                },
            }

        ).then((response) => {
            if (response.status == 200) {
                response.json().then((result) => {
                    // console.log(result.trainers)
                    if (result.status) {
                        settrainers(result.trainers)
                        // getClients();
                    }

                    else {
                        alert("no data error")
                    }

                })
            }
            else if (response.status == 401) {
                logout()
            }
            else {
                console.log("network error")
            }


        }).catch(err => {
            // // console.log(err)

        })
    }

    const updateSelectClient = () => {
        localStorage.setItem('selectedClient', clientSelected.current.value);
        getSession()
    }
 
    const updateSelectTrainer = () => {
        localStorage.setItem('selectedTrainer', trainerSelected.current.value);
        localStorage.setItem('selectedClient', null);

        getClients()
    }
    const updateselectedSecssion = () => {
        localStorage.setItem('selectedSession', sessionSelected.current.value);
    }


    const logout = () => {
        localStorage.clear();
        window.location.reload();
    }


    return (
        <div>
            <Header />
            <div className="wrp-dashbord">
                <div className="sidebar-section">
                    <Sidebar />
                </div>
                <div className="right-section">

                    <div className="container-fluid">
                        <div className="configer-head">
                            
                            <div className="back-icon-wrp">
                            <Link to="/view/manageform" className="backbtn-icon">
                                <img src={backIcon} alt="backicon" />
                                <span>Back</span>
                            </Link>
                        </div>
                        <div className="configer-child1">
                                <h3>Upload Homework Assignment</h3>
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid">
                        <div className="row">
                        {
                            userType == 3?"": <>
                            <div className="col-lg-3">
                                <div className="trainerbox">
                                    <div className="trainer-c"><p>{t("trainer")}:</p></div>
                                    <div className="padding-box">
                                        <div className="main-checkbox">

                                            <div className="checkbox-wrp">
                                                <div class="custom-radios">
                                                    <input type="checkbox" id="6" onChange={getTrainers} ref={trainerActive} defaultChecked={(selectedtrainerActive === "true" ? true : false)} />
                                                    <label for="6">
                                                        <span className="redious">
                                                        </span>
                                                    </label>
                                                </div>
                                                <div className="caption-cheeckbox">
                                                <p>{t("Active")}</p>
                                                </div>
                                            </div>
                                            <div className="checkbox-wrp">
                                                <div class="custom-radios">
                                                    <input type="checkbox" id="7" onChange={getTrainers} ref={trainerInactive} defaultChecked={(selectedtrainerInactive === "true" ? true : false)} />
                                                    <label for="7">
                                                        <span className="redious">
                                                        </span>
                                                    </label>
                                                </div>
                                                <div className="caption-cheeckbox">
                                                    <p>{t("Inactive")}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="select-client">
                                            <select ref={trainerSelected} onChange={updateSelectTrainer}  >
                                                <option className="selected-bold">Choose a trainer</option>
                                                <option className="selected-bold" value={"all"}>All trainers</option>
                                                {
                                                    trainers.map((items) =>
                                                        <option className="selected-bold" selected={items.id == selectedTrainer ? true : false} value={items.id}>
                                                            {items.firstname} {items.lastname}
                                                        </option>)
                                                }



                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className="trainerbox">
                                    <div className="trainer-c"><p>Client:</p></div>
                                    <div className="padding-box">
                                        <div className="main-checkbox">

                                            <div className="checkbox-wrp">
                                                <div class="custom-radios">
                                                    <input type="checkbox" id="color-8" onChange={getClients} ref={clientActive} defaultChecked={(selectedclientActive === "true" ? true : false)} />
                                                    <label for="color-8">
                                                        <span className="redious">
                                                        </span>
                                                    </label>
                                                </div>
                                                <div className="caption-cheeckbox">
                                                    <p>Active</p>
                                                </div>
                                            </div>

                                            <div className="checkbox-wrp">
                                                <div class="custom-radios">
                                                    <input type="checkbox" id="color-10" onChange={getClients} ref={clientInactive} defaultChecked={(selectedclientInactive === "true" ? true : false)} />
                                                    <label for="color-10">
                                                        <span className="redious">
                                                        </span>
                                                    </label>
                                                </div>
                                                <div className="caption-cheeckbox">
                                                    <p>Inactive</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="select-client">
                                            <select ref={clientSelected} onChange={updateSelectClient}>
                                                <option>Choose a client</option>

                                                {
                                                    clients.length > 0 && clients.map((client, i) =>
                                                        <option selected={client.id == selectedClient ? true : false} value={client.id}>
                                                            {client.firstname} {client.lastname}
                                                        </option>)
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </>
                        }
                            <div className="col-lg-3">
                                <div className="trainerbox">
                                    <div className="trainer-c"><p>Session:</p></div>
                                    <div className="padding-box">

                                        <div className="select-client mrt-select">
                                            <select ref={sessionSelected} onChange={updateselectedSecssion}>
                                                <option>Choose a session</option>
                                                {
                                                    sesstion.map((sesstion, i) =>
                                                        <option selected={sesstion.id == selectedSession ? true : false} value={sesstion.id}>
                                                            {sesstion.name}
                                                        </option>)
                                                }

                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className="trainerbox">
                                    <div className="trainer-c"><p>Assignment</p></div>
                                    <div className="padding-box mrt-select">
                                        <input type="file" name="file" accept=".pdf" ref={formFile} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Modal isOpen={successModal} toggle={successToggleModal} className="connect-box" centered={true}>
                            <ModalHeader toggle={successToggleModal}><span className="ml-1 roititle font-weight-bold">Successfull</span></ModalHeader>
                            <ModalBody>
                                <div className="modal-p">
                                    <p>Assignment Submitted Successfully</p>
                                </div>
                            </ModalBody>

                        </Modal>


                        <Modal isOpen={modal} toggle={toggleModal} className="connect-box" centered={true}>
                            <ModalHeader toggle={toggleModal}><span className="ml-1 roititle font-weight-bold">Error</span></ModalHeader>
                            <ModalBody>
                                <div className="modal-error-p">
                                    <p>Please Fill all field</p>
                                </div>
                            </ModalBody>

                        </Modal>
                        <div className="client-submit-btn">
                            <button type="submit" onClick={submithomeworkform}>Submit
                           
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            <Modal isOpen={loaderModal} toggle={loaderToggleModal} className="connect-box" centered={true}>
                <ModalHeader toggle={loaderToggleModal}><span className="ml-1 roititle modal-head">Request processing...</span></ModalHeader>
                <ModalBody>
                    <p className='text-center'>Please wait...</p>
                    <div className="wrp-chart-loader">
                        <div class="loading">
                            <div class="loading-1"></div>
                            <div class="loading-2"></div>
                            <div class="loading-3"></div>
                            <div class="loading-4"></div>
                        </div>
                    </div>
                </ModalBody>

            </Modal>

           
        </div>
    )
}

export default Uploadhomeworkasignment;