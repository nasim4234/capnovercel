import React, { Component, useEffect, useState, useRef } from 'react';
import { Link, useParams, Router, useNavigate } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, Row } from 'reactstrap';
import { API_URL } from "../../../config";


const ResetPassword = (props) => {

    const { token } = useParams();
    const password = useRef();
    const [passwordError, setPasswordError] = useState("")
    const [pass, setPass] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const [successfulResetpassModel, setSuccessfulResetpassModel] = useState(false);
    const successfulResetpassModalToggle = () => setSuccessfulResetpassModel(!successfulResetpassModel);
    const [passwordShown, setPasswordShown] = useState(false);
    const [passwordShown2, setPasswordShown2] = useState(false);
    const [Loader, setLoader] = useState(false)
    const [requiredPassword, setRequiredPassword] = useState(false)





    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    const togglePasswordVisiblity2 = () => {
        setPasswordShown2(passwordShown2 ? false : true);
    };

    useEffect(() => {

    }, [])

    const Checkvalidate = (e) => {
        const confpass = e.target.value;
       
        setConfirmPass(confpass);
        if (pass != confpass) {
            setPasswordError("Password should be match");
        } else {
            setPasswordError("");
        }
    }
    const hanndaleOnchange =()=>{
        setRequiredPassword(false)
    }

    const ResttPass = () => {
        setLoader(true)
        let data = {};
        data['pass'] = password.current.value;
        data['resetpassword'] = token;

        if (password.current.value == "") {
            setRequiredPassword(true);
            setLoader(false)
            return false;
        }

        fetch(API_URL + "/update/password", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(data)
        }).then((response) => {
            if (response.status == 200) {
                successfulResetpassModalToggle();
                response.json().then((resp) => {
                    console.log("results", resp);
                    setLoader(false)

                });
            }
            else {
                // alert("invalid login")
            }

        })



    }

    return (
        <div>
            <div className="reset-password-bg">
                <div className="container">
                    <div className="login-content">
                        <ul className="reset-input-list">
                            <li><input placeholder="Enter New Password" type={passwordShown ? "text" : "password"} value={pass} name='pass' onChange={(e) => {setPass(e.target.value); hanndaleOnchange()}}  />
                                {
                                    passwordShown ? <i class="fa fa-eye-slash pass-eye4" aria-hidden="true" onClick={togglePasswordVisiblity}></i> : <i className="fa fa-eye pass-eye4" aria-hidden="true" onClick={togglePasswordVisiblity}></i>
                                }
                            </li>
                            <li><input placeholder="Confirm New Password" type={passwordShown2 ? "text" : "password"} value={confirmPass} onChange={(e) =>{ Checkvalidate(e);hanndaleOnchange()}} ref={password} />
                                {
                                    passwordShown2 ? <i class="fa fa-eye-slash pass-eye4" aria-hidden="true" onClick={togglePasswordVisiblity2}></i> : <i className="fa fa-eye pass-eye4" aria-hidden="true" onClick={togglePasswordVisiblity2}></i>
                                }
                                <p className='match-pass'>{passwordError}</p>
                                {
                                    requiredPassword && <p className='require-email'>Password is Required</p>
                                }
                            </li>
                            <li>
                                <div className="submit-btn-reset" onClick={() => { ResttPass(); }}><button>Submit
                                    {
                                        Loader &&
                                        <div id="loader"></div>
                                    }
                                </button></div>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
            <Modal isOpen={successfulResetpassModel} toggle={successfulResetpassModalToggle} centered={true}>
                <ModalHeader toggle={successfulResetpassModalToggle}><span className="ml-1 roititle">Successfully Reset your Password</span></ModalHeader>
                <ModalBody>
                    <div className="modal-p">
                        <p><a href="/">Click here to go to Cloud Login Page</a></p>
                    </div>
                </ModalBody>
            </Modal>
        </div>
    );

}


export default ResetPassword;

