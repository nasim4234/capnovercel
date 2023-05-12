import React, { Component, useEffect, useRef, useState } from "react";
import { Link, useParams, Router } from 'react-router-dom';
import { Row, Col, Container, Button, ModalHeader, ModalFooter, Modal, ModalBody } from "reactstrap";

import right from '../../images/right.png';
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import Header from '../../component/Header';

import Multilanguage from '../../component/Multilanguage'
import { API_URL } from "../../../config";
import backIcon from "../../images/back.png";
import crosss from '../../images/crosss.png';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';


const Goeditprofile = () => {
    const { t } = useTranslation();

    const M_module = localStorage.getItem('m_module');
    const accessToken = localStorage.getItem('accessToken');
    const userType = localStorage.getItem('userType');
    const [successModal, setsuccessModal] = useState(false);
    const successToggleModal = () => setsuccessModal(!successModal);
    const [owner, setOwner] = useState([]);
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [qfirst, setqfirst] = useState([]);
    const [qsecond, setqsecond] = useState([]);
    const [qthird, setqthird] = useState([]);
    const [qfourth, setqfourth] = useState([]);
    const [qfifth, setqfifth] = useState([]);
    const firstname = useRef()
    const lastname = useRef()
    const businessname = useRef()
    const email = useRef()
    const telephone = useRef()
    const city = useRef()
    const address = useRef()
    const postalcode = useRef()
    const state = useRef()
    const country = useRef()
    const password = useRef()
    const userId = localStorage.getItem('user_id');
    const [emailalreadyExitmodal, setEmailalreadyExitmodal] = useState(false);
    const EmailalreadyExittoggleModal = () => setEmailalreadyExitmodal(!emailalreadyExitmodal);
    const [loaderModal, setLoaderModal] = useState(false);
    const loaderToggleModal = () => setLoaderModal(!loaderModal);
    const [passwordShown, setPasswordShown] = useState(false);
    const [fillallfieldmodal, setFillallfieldModal] = useState(false);
    const fillallfieldtoggleModal = () => setFillallfieldModal(!fillallfieldmodal);
    const [error, setError] = useState(false);


    const [dataid, setdataid] = useState(7);

    const [isOpen, setIsopen] = useState(false);

    const ToggleSidebar = () => {
        isOpen === true ? setIsopen(false) : setIsopen(true);
    }


    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    const { tab } = useParams();
    const QuestionArray = [
        {
            questionbold: "Question 1:", questiondisplay: t('I-will-be-working-with-clients'), id: "qfirst"
        },
        {
            questionbold: "Question 2:", questiondisplay: t('There-will-be-other-trainers-seeing-clients-besides-me'), id: "qsecond"
        },
        {
            questionbold: "Question 3:", questiondisplay: t('I-will-be-doing-groupwork-with-multiple-CapnoTrainers'), id: "qthird"
        },
        {
            questionbold: "Question 4:", questiondisplay: t('I-purchased-the-CapnoTrainer-HRV-P6.0-option'), id: "qfourth"
        },
        {
            questionbold: "Question 5:", questiondisplay: t('Auto-update-Computer-Software'), id: "qfifth"

        }
    ]

    useEffect(() => {
        getOwnerProfile();
        getCountry();
    }, [])



    const profileSave = () => {

        setLoaderModal(true)
        let data = {};

        data['firstname'] = firstname.current.value;
        data['lastname'] = lastname.current.value;
        data['telephone'] = telephone.current.value;
        data['email'] = email.current.value;
        data['address'] = address.current.value;
        data['city'] = city.current.value;
        data['zipcode'] = postalcode.current.value;
        data['state'] = state.current.value;
        data['country'] = country.current.value;
        data['password'] = password.current.value;
        data['business'] = businessname.current.value;
        data['qfirst'] = qfirst == "0" ? 0 : 1 || qfirst == "1" ? 1 : 0;
        data['qsecond'] = qsecond == "0" ? 0 : 1 || qsecond == "1" ? 1 : 0;
        data['qthird'] = qthird == "0" ? 0 : 1 || qthird == "1" ? 1 : 0;
        data['qfourth'] = qfourth == "0" ? 0 : 1 || qfourth == "1" ? 1 : 0;
        data['qfifth'] = qfifth == "0" ? 0 : 1 || qfifth == "1" ? 1 : 0;


        if (firstname.current?.value == "" || lastname.current?.value == "" || email.current?.value == "") {
            fillallfieldtoggleModal();
            setLoaderModal(false)
            return false;
        }

      

        fetch(API_URL + "/owner/update/" + userId, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': accessToken
            },
            body: JSON.stringify(data)
        }).then((response) => {
            if (response.status == 200) {
                response.json().then((resp) => {
                    // console.log("results", resp);
                    successToggleModal();
                    setLoaderModal(false);
                   
                });
            }
            else if (response.status == 400) {

                EmailalreadyExittoggleModal();
            }
            else if (response.status == 401) {
                logout()
            }
            else {
                console.log("network error")
            }


        })

    }

    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }

    const handleEmail = () => {
        if (!isValidEmail(email.current?.value)) {
            setError(true);
        } else {
            setError(false);
        }
    }

    const getOwnerProfile = () => {
        fetch(API_URL + "/owner/profile/" + userId,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': accessToken,
                },
            }
        ).then((response) => {
            if (response.status == 200) {
                response.json().then((resp) => {
                    // console.log("result", resp);
                    setOwner(resp.owner[0]);
                    getState(resp.owner[0].country)

                });
            }
            else if (response.status == 401) {
                logout()
            }
            else {
                console.log("network error")
            }


        })
    }
    const getCountry = () => {
        fetch(API_URL + "/countries",
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': accessToken,
                },
            }
        ).then((response) => {
            if (response.status == 200) {
                response.json().then((resp) => {
                    // console.log("result", resp);
                    setCountries(resp.countries);

                });
            }
            else if (response.status == 401) {
                logout()
            }
            else {
                console.log("network error")
            }


        })
    }
    const getState = (countryid) => {
        fetch(API_URL + "/states?country_id=" + countryid,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': accessToken,
                },
            }
        ).then((response) => {
            if (response.status == 200) {
                response.json().then((resp) => {
                    // console.log("result", resp);
                    setStates(resp.states);


                });
            }
            else if (response.status == 401) {
                logout()
            }
            else {
                console.log("network error")
            }

        })
    }

    const handleCountryUpdate = () => {
        getState(country.current.value)
    }
    const logout = () => {
        localStorage.clear();
        window.location.reload();
    }
    const handleradio = (qid, v) => {

        if (qid == "qfirst") {
            setqfirst(v)
        }
        if (qid == "qsecond") {
            setqsecond(v)
        }
        if (qid == "qthird") {
            setqthird(v)
        }
        if (qid == "qfourth") {
            setqfourth(v)
        }
        if (qid == "qfifth") {
            setqfifth(v)
        }


    }

    return (
        <div className="demodata-bg">
            <Header />

            <div className="wrp-dashbord">
                <div className="sidebar-section">

                </div>
                <div className="container">
                    <div className="right-section2">

                        <div className="head-demoreportgo">

                        <div className="back-managementbtn">
                                <Link to={(userType == 5 && M_module == 0)? "/go/dashboard" : "#"} onClick={(userType == 6 || (userType == 5 && M_module == 1)) ? ToggleSidebar : ""} className="backbtn-icon">
                                    <img src={backIcon} alt="backicon" />
                                    <span>Back</span>
                                </Link>
                            </div>
                            <div className="wrp-head-profile2">
                                <div className="head-demoreport goprofileedit">
                                    <h3>{t('edit-profile')}</h3>

                                </div>
                            </div>
                           
                        </div>
                        <div className="wrp-editprofile gowrp-editprofile">

                          
                            <div className="wrp-edit-form">
                                <div className="edit-input-wrp">
                                    <div className="edit-input">
                                        <p>*First Name:</p>
                                        <input placeholder="First Name" defaultValue={owner.firstname} ref={firstname} />
                                    </div>
                                    <div className="edit-input">
                                        <p>*Last Name:</p>
                                        <input placeholder="Last Name" defaultValue={owner.lastname} ref={lastname} />
                                    </div>
                                    <div className="edit-input">
                                        <p>Name of Business:</p>
                                        <input placeholder="Business" defaultValue={owner.business} ref={businessname} />
                                    </div>


                                </div>
                                <div className="edit-input-wrp">
                                    
                                    <div className="edit-input">
                                        <p>*Email:</p>
                                        <input placeholder="Email" defaultValue={owner.email} onChange={handleEmail} ref={email} />

                                        {
                                            error && <p className='validemail'>Invalid Email</p>
                                        }
                                    </div>
                                    <div className="edit-input">
                                        <p>*Password:</p>
                                        <input type={passwordShown ? "text" : "password"} placeholder="Password" defaultValue={owner.password} ref={password} />
                                        {
                                            passwordShown ? <i class="fa fa-eye-slash pass-eye3" aria-hidden="true" onClick={togglePasswordVisiblity}></i> : <i className="fa fa-eye pass-eye3" aria-hidden="true" onClick={togglePasswordVisiblity}></i>
                                        }
                                    </div>

                                    <div className="edit-input">
                                        <p>Telephone:</p>

                                        <input type="number" placeholder="Telephone" defaultValue={owner.telephone} ref={telephone} />
                                    </div>
                                </div>
                                <div className="edit-input-wrp">
                                    <div className="edit-input address-input">

                                        <p>Address</p>

                                        <input placeholder="Address " defaultValue={owner.address} ref={address} />
                                    </div>
                                </div>
                                <div className="edit-input-wrp wrp-city-input">
                                <div className="edit-input">
                                        <p>Country</p>

                                        <div className="select-client5">
                                            <select name="country" onChange={handleCountryUpdate} ref={country}>
                                                <option value="">Choose Country</option>
                                                {
                                                    countries.map((countries, i) => {
                                                        return (
                                                            <option selected={owner.country == countries.id ? true : false} value={countries.id}>{countries.name}</option>
                                                        )
                                                    })
                                                }


                                            </select>
                                        </div>
                                    </div>
                                    <div className="edit-input">
                                        <p>{t('State/Province')}</p>
                                        <div className="select-client5">
                                            <select name="state" id="state" ref={state}>
                                                <option >Choose States/Province</option>

                                                {
                                                    states.map((states, i) => {
                                                        return (
                                                            <option selected={states.id == owner.state ? true : false} value={states.id} >{states.name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="edit-input">
                                        <p>City</p>
                                        <input placeholder="City" defaultValue={owner.city} ref={city} />
                                    </div>

                                    <div className="edit-input">
                                        <p>Postal Code</p>
                                        <input placeholder="Postal Code" defaultValue={owner.zipcode} ref={postalcode} />
                                    </div>
                                    
                                    
                                </div>
                                <Modal isOpen={successModal} toggle={successToggleModal} className="connect-box" centered={true}>
                                    <ModalHeader toggle={successToggleModal}><span className="ml-1 roititle font-weight-bold">Successfull</span></ModalHeader>
                                    <ModalBody>
                                        <div className="modal-p">
                                            <div className="right-circle"><img src={right} /></div>
                                            <h4>Saved!</h4>
                                            <p>Your profile has been updated successfully</p>
                                        </div>
                                    </ModalBody>

                                </Modal>
                                <div className="save-btn">
                                    <button type="submit" onClick={profileSave}>Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal isOpen={emailalreadyExitmodal} toggle={EmailalreadyExittoggleModal} className="connect-box" centered={true}>
                    <ModalHeader toggle={EmailalreadyExittoggleModal}><span className="ml-1 roititle font-weight-bold">Error</span></ModalHeader>
                    <ModalBody>
                        <div className="modal-error-p">
                            <p>Account already exist with this email</p>
                        </div>
                    </ModalBody>

                </Modal>

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
                <Modal isOpen={fillallfieldmodal} toggle={fillallfieldtoggleModal} className="connect-box" centered={true}>
                    <ModalHeader toggle={fillallfieldtoggleModal}><span className="ml-1 roititle font-weight-bold">Error</span></ModalHeader>
                    <ModalBody>
                        <div className="modal-error-p">
                            <p>Please fill Required field</p>
                        </div>
                    </ModalBody>

                </Modal>
            </div>

            <div className="container-fluid mt-3">

                <div className={`sidebar2 ${isOpen == true ? 'active' : ''}`}>
                    <div className="sd-header">
                        <button className='closebutton' onClick={ToggleSidebar}><img src={crosss} className="img-close" /></button>
                    </div>

                    {
                        dataid == 7 ?

                            <>

                                <div className='profilelist p-5'>
                                    <div className='profilelist p-5'>

                                        <a href='/go/add/client'>New Client</a>
                                        <a href='/go/list/client'>Edit Client</a>
                                        <a href='/go/edit/profile'>Edit Profile</a>
                                    </div>
                                    <div className="BackGouser2">
                                        <Link to="/go/dashboard" onClick={ToggleSidebar}><KeyboardBackspaceIcon />Go to Dashboard</Link>
                                    </div>
                                </div>

                            </>
                            :
                            ""

                    }

                </div>
                <div className={`sidebar-overlay ${isOpen == true ? 'active' : ''}`} onClick={ToggleSidebar}></div>
            </div>
        </div>
    )
}

export default Goeditprofile;