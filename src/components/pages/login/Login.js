import { removeData } from 'jquery';
import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { ModalHeader, Modal, ModalBody } from "reactstrap";
import i18n from "i18next";
import validator from 'validator';
import { API_URL } from '../../../config';
import { useTranslation, initReactI18next } from "react-i18next";
import user from '../../images/user.png'

const Login = () => {
    const { t } = useTranslation();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alerts, setalerts] = useState(false)
    const [Loader, setLoader] = useState(false)
    const navigate = useNavigate();
    const [passwordShown, setPasswordShown] = useState(false);
    const [requiredemail, setRequiredemail] = useState(false)

    const forgootEmail = useRef();
    const [forgotModal, setforgotModal] = useState(false);
    const forgotModalToggle = () => setforgotModal(!forgotModal);
    const [SuccessModal, setSuccessModal] = useState(false);
    const SuccessModalToggle = () => setSuccessModal(!SuccessModal);
    const [unsuccessModal, setUnsuccessModal] = useState(false);
    const unsuccessModalToggle = () => setUnsuccessModal(!unsuccessModal);
    const [Loader2, setLoader2] = useState(false)
    const [emailerror, setEmailerror] = useState('')

    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    async function loginUser(event) {
        event.preventDefault()
        setalerts(false)
        setLoader(true)

        const response = await fetch(API_URL + '/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        })


        const data = await response.json()
        setLoader(false)
        // console.log( "sddssdddsf",data)

        if (data.status) {
            localStorage.setItem('user_id', data.user_id);
            localStorage.setItem('associated_practioner', data.associated_practioner);
            localStorage.setItem('associated_owner', data.associated_owner);
            localStorage.setItem('session_id', data.user_id);
            localStorage.setItem('client_id', data.user_id);
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('selectedGroup', false);
            localStorage.setItem('selectedtrainerActive', true);
            localStorage.setItem('selectedStandard', true);
            localStorage.setItem('selectedtrainerInactive', false);
            localStorage.setItem('selectedclientActive', true);
            localStorage.setItem('selectedclientInactive', false);
            localStorage.setItem('selectedHomework', false);
            localStorage.setItem('c_module', data.c_module);
            localStorage.setItem('m_module', data.m_module);    

            localStorage.setItem('selectedTrainer', null);
            localStorage.setItem('selectedTrainerGroup', null);
            localStorage.setItem('selectedClient', data.user_id);
            localStorage.setItem('selectLanguage', null);
            // localStorage.setItem('selectedGroup', false);
            localStorage.setItem('userType', data.user_type);
            if (data.user_type == 1 || data.user_type == 2 || data.user_type == 5 || data.user_type == 6 || data.user_type == 7 ) {
                localStorage.setItem('selectedTrainer', data.user_id);
            }
            localStorage.setItem('selectedClient', null);
            localStorage.setItem('selectedSession', null);
            if (data.user_type == 3 || data.user_type == 5 || data.user_type == 6) {
                localStorage.setItem('selectedClient', data.user_id);
            }

            if(data.user_type == 5 || data.user_type == 6){
                navigate("/go/dashboard");
            }else if(data.user_type == 3){
                navigate("/view/pdf/report");
            }else{
                navigate("/dashboard");
            }
            
           
               
            

        } else {
            setalerts(true)


        }

        // alert('Logined')
    }

    

    const ForgotPassword = () => {

        setLoader2(true)
        let data = {};
        console.log("forgootEmail",forgootEmail.current.value)

        data['email'] = forgootEmail.current.value;

        if (forgootEmail.current.value == "") {
            setRequiredemail(true);
            setLoader2(false)
            return false;
        }
        if(validator.isEmail(forgootEmail.current.value)){
            setEmailerror(false)
        }else{
            setEmailerror('Email does not exist')
            setLoader2(false)
            return false;
        }


        fetch(API_URL + "/forgot/password", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(data)
        }).then((response) => {
            if (response.status == 200) {
                response.json().then((resp) => {
                    console.log("results", resp);
                    SuccessModalToggle();
                    forgotModalToggle();
                    setLoader2(false)

                });
            } else if (response.status == 400) {
                unsuccessModalToggle();
            }
            else {
                console.log("network error")
            }

        })



    }

    const handleemailInput = (e)=>{
        let email = e.target.value;
        if(email.length > 0){
            setRequiredemail(false)
        }
    }

    console.warn('user');
    return (
        <div className='login-bg'>
            <div className="wrp-login">
                <form onSubmit={loginUser}>
                    <div className="login-content">
                        <div className="login-database">
                            <p>{t('Login-to-CapnoTrainer-Cloud-Database')}</p>
                        </div>
                        <div className="user-img">
                            <img src={user} alt="user-img" />
                        </div>
                        <div className="wrp-label">
                            <label>{t('Email-Address')}</label>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                placeholder="Email"
                            />
                        </div>
                        <div className="wrp-label mrt-input password-input">
                            <label>Password</label>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type={passwordShown ? "text" : "password"}
                                placeholder="Password"

                                
                            />
                            <p className="forgot-password"><a href="#" onClick={forgotModalToggle}>Forgot Password? </a></p>

                            {
                                passwordShown ? <i class="fa fa-eye-slash pass-eye" aria-hidden="true" onClick={togglePasswordVisiblity}></i> : <i className="fa fa-eye pass-eye" aria-hidden="true" onClick={togglePasswordVisiblity}></i>
                            }



                        </div>
                        {
                            alerts &&
                            <p className="invalid-p">Invalid Login</p>
                        }

                        <button className="login-btn" type="submit" >Login
                            {
                                Loader &&
                                <div id="loader"></div>
                            }
                        </button>
                        {/* <div className='pravicy-btn'><a href='/privacy-policy' target="_blank">Pravicy Policy</a></div> */}

                    </div>
                </form>
            </div>


            <Modal isOpen={forgotModal} toggle={forgotModalToggle} centered={true}>
                <ModalHeader toggle={forgotModalToggle}><span className="ml-1 roititle ">Forgot Password? Enter email to receive reset link.</span></ModalHeader>
                <ModalBody>
                    <div className="modal-p">
                        <div>
                            <div className="wrp-label">
                                <label>Email Addresses</label>
                                <input
                                    ref={forgootEmail}
                                    type="email"
                                    placeholder="Email Address"
                                    onChange={handleemailInput}
                                />
                                <span style={{
                                fontSize: '15px',
                                color: 'red',
                               
                            }}>{emailerror}</span>

                                {
                                    requiredemail && <p className='require-email'>Email is Required</p>
                                }

                            </div>
                            <button className="login-btn" type="submit" onClick={ForgotPassword} >Submit {
                                Loader2 &&
                                <div id="loader"></div>
                            }
                            </button>
                        </div>
                    </div>
                </ModalBody>

            </Modal>
            <Modal isOpen={SuccessModal} toggle={SuccessModalToggle} centered={true}>
                <ModalHeader toggle={SuccessModalToggle}><span className="ml-1 roititle">Request Submitted Successfully</span></ModalHeader>
                <ModalBody>
                    <div className="modal-p">
                        <p>Please check your email and click on reset password link</p>
                    </div>
                </ModalBody>

            </Modal>
            <Modal isOpen={unsuccessModal} toggle={unsuccessModalToggle} centered={true}>
                <ModalHeader toggle={unsuccessModalToggle}><span className="ml-1 roititle">Error</span></ModalHeader>
                <ModalBody>
                    <div className="modal-p">
                        <p>No Account found with this email.</p>
                    </div>
                </ModalBody>

            </Modal>
        </div>
    );
}


export default Login;