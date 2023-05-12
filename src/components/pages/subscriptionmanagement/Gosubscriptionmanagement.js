
import { update } from "plotly.js";
import React, { Component, useEffect, useRef, useState } from "react";
import { Row, Col, Container, Button, ModalHeader, ModalFooter, Modal, ModalBody } from "reactstrap";
import { Link } from 'react-router-dom'

import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";

import Header from '../../component/Header';
import { API_URL } from "../../../config";
import backIcon from "../../images/back.png"

const Gosubscriptionmanagement = () => {

    const { t } = useTranslation();
    const userType = localStorage.getItem('userType');
    const accessToken = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('user_id');
    // const [owner, setOwner] = useState([]);
    const [autoupdate, setAutoUpdate] = useState(0);
    const [autorenew, setAutoRenew] = useState(0);
    const [successModal, setsuccessModal] = useState(false);
    const successToggleModal = () => setsuccessModal(!successModal);
    const [owner, setOwner] = useState([]);

    const [ownerseven, setOwnerseven] = useState([]);
    const associatedOwner = localStorage.getItem('associated_owner');



    useEffect(() => {
        getOwnerProfile();
        getassociatedserialkey();
    }, [])


    const getassociatedserialkey = () => {
        fetch(API_URL + "/get/device/by/owner/" + associatedOwner,
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
                    setOwnerseven(resp.data.seven.list[0])

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
    const subscriptionSave = (_autorenew, _autoupdate) => {
        let data = {};

        data['autoupdate'] = _autoupdate;
        data['autorenew'] = _autorenew;


        fetch(API_URL + "/owner/subscription/update/" + userId, {
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

                });
            }
            else if (response.status == 401) {
                logout()
            }
            else {
                console.log("network error")
            }
            // alert("Updated")

        })

    }
    const logout = () => {
        localStorage.clear();
        window.location.reload();
    }

    const handleAutoUpdate = (v) => {
        setAutoUpdate(v);

        subscriptionSave(autorenew, v);


    }

    const handleAutorenew = (v) => {
        setAutoRenew(v);

        subscriptionSave(v, autoupdate);


    }


    return (
        <div>
            <Header />

            <div className="container">
                <div className="wrp-dashbord">
                    <div className="sidebar-section">

                    </div>
                    <div className="right-section2">
                        <div className="back-managementbtn">
                            <Link to="/go/dashboard" className="backbtn-icon">
                                <img src={backIcon} alt="backicon" />
                                <span>Back</span>
                            </Link>
                        </div>
                        <div className="subscription-content">
                            <h3>SUBSCRIPTION MANAGEMENT</h3>
                            <div className="software-updated-wrp">
                                <div className="software-updt-child1">
                                    <h3>Auto update computer software:</h3>

                                </div>
                                <div className="software-updt-child1">
                                    {
                                        owner.autoupdate >= 0 ?
                                            <div className="checkbox-wrp">
                                                <div className="radio-input"> <input class="form-check-input" name="autoaupdate" type="radio" defaultChecked={owner.autoupdate == 1 ? true : false} value="1" onChange={() => handleAutoUpdate(1)} /><span>Yes</span></div>

                                                <div className="radio-input"><input class="form-check-input" onChange={() => handleAutoUpdate(0)} type="radio" defaultChecked={owner.autoupdate == 0 ? true : false} value="0" name="autoaupdate" /><span>No</span></div>



                                            </div>
                                            :
                                            null
                                    }


                                </div>
                            </div>




                            <div className="software-updated-wrp">
                                <div className="software-updt-child1">
                                    <h3>Auto subscription renewal with credit card:</h3>
                                </div>
                                <div className="software-updt-child1">
                                    {
                                        owner.autorenew >= 0 ?
                                            <div className="checkbox-wrp">
                                                <div className="radio-input"> <input class="form-check-input" name="autorenew" type="radio" defaultChecked={owner.autorenew == 1 ? true : false} value="1" onChange={() => handleAutorenew(1)} /><span>Yes</span></div>
                                                <div className="radio-input"><input class="form-check-input" onChange={() => handleAutorenew(0)} type="radio" defaultChecked={owner.autorenew == 0 ? true : false} value="0" name="autorenew" /><span>No</span></div>


                                                {/* <div className="radio-input"><input class="form-check-input" onChange={() => handleAutorenew(0)} type="radio" defaultChecked={owner.autorenew == 0? true : false} value="0" name="autorenew" /><span>{t('no')}</span></div>
                           <div className="radio-input"> <input class="form-check-input" name="autorenew" type="radio" defaultChecked={owner.autorenew == 1? true : false} value="1" onChange={() => handleAutorenew(1)} /><span>{t('yes')}</span></div> */}

                                                {/* <div className="radio-input"><input class="form-check-input" onChange={() => handleAutorenew(0)} type="radio" defaultChecked={owner.autorenew == 0? true : false} value="0" name="autorenew" /><span>{t('no')}</span></div>
                           <div className="radio-input"> <input class="form-check-input" name="autorenew" type="radio" defaultChecked={owner.autorenew == 1? true : false} value="1" onChange={() => handleAutorenew(1)} /><span>{t('yes')}</span></div> */}

                                            </div>
                                            :
                                            null
                                    }

                                </div>
                            </div>

                            <div className="renew-wrp">
                                <div className="paragraphgo">
                                    <p>If yes, click here to enter <b><u><a href={"/subscription/renew/"}>credit card information</a></u></b>.</p>
                                    <p>Auto-charging is on the due date.</p>
                                </div>
                                <div className="receive-paragraph">
                                    <p>You will receive a renewal subscription notice 30 days and 10 days in advance of the due date.</p>
                                    {
                                        !ownerseven?.serial_key &&
                                        <div className="mb-2 mt-3 nodevice"><b>No Device Registered</b></div>

                                    }
                                    {
                                        ownerseven?.serial_key &&
                                        <p>Your renewal date for your instrument, serial number {ownerseven?.serial_key}, is {ownerseven?.expires_at ? new Date(ownerseven?.expires_at * 1e3).toLocaleDateString('en-IN', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric'

                                        }) : "NA"}</p>
                                    }
                                </div>
                            </div>

                            <ul className="anual-renew-list">
                                <li><h3>Annual SUBSCRIPTION RATE: <span>$75.00</span></h3></li>
                                <li><p>You may <b><u><a href={"/subscription/renew/"}>renew your subscription</a></u></b> at any time by clicking here.</p></li>
                                <li><p className="upgradeparagraph"><b>UPGRADE</b> your instrument.</p></li>
                                <li><p className="goanual-renew-list">Click here to <b><u><a href="/subscription/update/4">UPGRADE</a></u></b> to the Professional System, $1,450.00.</p></li>

                            </ul>


                        </div>
                    </div>
                </div>
            </div>

            <Modal isOpen={successModal} toggle={successToggleModal} className="connect-box" centered={true}>
                <ModalHeader toggle={successToggleModal}><span className="ml-1 roititle font-weight-bold">Successfull</span></ModalHeader>
                <ModalBody>
                    <div className="modal-p">

                        <p>Updated Successfully</p>
                    </div>
                </ModalBody>

            </Modal>
        </div>
    )
}

export default Gosubscriptionmanagement;