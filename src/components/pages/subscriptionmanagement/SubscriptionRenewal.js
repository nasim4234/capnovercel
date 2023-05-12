
import { update } from "plotly.js";
import React, { Component, useEffect, useRef, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, Row } from 'reactstrap';

import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";

import { Link, useParams, Router } from 'react-router-dom';
import Header from '../../component/Header';
import Sidebar from '../../component/Sidebar';
import backIcon from "../../images/back.png";
import { API_URL } from "../../../config";
import md5 from "md5";

const SubscriptionRenewal = () => {

    const { t } = useTranslation();
    // const { userid } = useParams();
    const accessToken = localStorage.getItem('accessToken');
    const userid = localStorage.getItem('user_id');
    const [owner, setOwner] = useState([]);
    const [autoupdate, setAutoUpdate] = useState(0);
    const [autorenew, setAutoRenew] = useState(0);
    const [deviceLength, setDeviceLength] = useState(0);
    // const [deviceLength, setDeviceLength] = useState(0);
    const [ownerfive, setOwnerfive] = useState([]);
    const [ownersix, setOwnersix] = useState([]);
    const [ownerseven, setOwnerseven] = useState([]);
    const [messageModal, setmessageModal] = useState(false);
    const messageToggle = () => setmessageModal(!messageModal);

    const [message, setmessage] = useState(false);
    const [messageHead, setmessageHead] = useState(false);

    const [perDevice , setPerDevice ] = useState(175);
    const [perGoDevice , setPerGoDevice ] = useState(75);
    const [deviceToRenew , setDevcieToRenew ] = useState([]);


    const [payPalModal, setPayPalModal] = useState(false);
    const payPalToggle = () => setPayPalModal(!payPalModal);

  
    useEffect(() => {
        getOwnerProfile();
        getassociatedserialkey();
    }, [])

    useEffect(() => {

        if(deviceToRenew.length > 0 && owner.user_type)
        {
        payNow(deviceToRenew.length, (owner.user_type == 5 || owner.user_type == 6) ? perGoDevice : perDevice  )

        }
    },[deviceToRenew,owner,perDevice])
 
    const handleCheckbox = (e) => {
        let _devices = deviceToRenew.slice() ; 

        if(e.target.checked){
            _devices.push(e.target.value)
        }
        else if(!e.target.checked){
            _devices.splice(_devices.indexOf(e.target.value), 1);
             

        }
        // alert(_devices.length)
        setDevcieToRenew(_devices);
    }


    const getassociatedserialkey = () => {
        fetch(API_URL + "/get/device/by/owner/" + md5(userid.toString()),
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
                    setOwnerfive(resp.data.five.list)
                    let _devices = deviceToRenew.slice() ; 

                    resp.data.five.list.map((v,i)=>{
                        if(new Date().getTime()/1e3 > v.expires_at){
                            _devices.push(v.serial_key);
                        }
                    })
                    setOwnersix(resp.data.six.list)
                    resp.data.six.list.map((v,i)=>{
                        if(new Date().getTime()/1e3 > v.expires_at){
                            _devices.push(v.serial_key);
                        }
                    })
                    setOwnerseven(resp.data.seven.list)
                    resp.data.seven.list.map((v,i)=>{
                        if(new Date().getTime()/1e3 > v.expires_at){
                            _devices.push(v.serial_key);
                        }
                    })
                    setDevcieToRenew(_devices)
                   
                    setDeviceLength(resp.data.total);
                    let _deviceLength = resp.data.total ; 
                    setPerDevice(_deviceLength == 1   ? 175 : _deviceLength == 2 ? 150  : _deviceLength == 3 ? 125 : _deviceLength >= 4 ? 100 :  175)

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
        

        fetch(API_URL + "/user/profile/" + userid,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        ).then((response) => {
            if (response.status == 200) {
                response.json().then((resp) => {

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



    const payNow = (_deviceLength,_perPrice) => {
        $("#paypal-button-container").html('')
        // _perPrice = 0.01
        let _price = _deviceLength * _perPrice ;
        _price = parseFloat(_price);
        // _price = 0.01;
        if (_price > 0) {
            paypal.Buttons({
                createOrder: function (data, actions) {
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                currency_code: "USD",
                                value: _price,
                                breakdown: {
                                    item_total : {  /* Required when including the `items` array */
                                      currency_code: "USD",
                                      value: _price
                                    }
                                  }
                            },
                            items: [
                                {
                                  name: "CapnoTrainer Device Renewal", /* Shows within upper-right dropdown during payment approval */
                                  description: "Annual Renewal of CapnoTrainer Devices for "+ owner.firstname + owner.lastname +". Device(s) Serial:"+deviceToRenew.join(', '), /* Item details will also be in the completed paypal.com transaction view */
                                  unit_amount: {
                                    currency_code: "USD",
                                    value: _perPrice
                                  },
                                  quantity: _deviceLength
                                },
                              ]
                        }]
                    });
                },
                onApprove: function (data, actions) {
                    return actions.order.capture().then(function (details) {
                        //   // console.log(details)

                        completeRenewal(deviceToRenew, details);

                    })
                },
                onCancel: function (data) {
                    // window.location.replace("<?php echo $site_url;?>sales/CeRegister_new_back.php")
                }
            }).render('#paypal-button-container');
        }


    }


    const completeRenewal = async (id, details) => {



        const response = await fetch(API_URL + '/complete/device/renewal/' + userid, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
                details: JSON.stringify(details)
            }),
        })

        const data = await response.json()

        if (data.success) {
            setmessageHead("Thank you!")
            setmessage("Your payment for renewal was successful. <br /> <br /> You will now be redirected to your cloud dashboard.");
            messageToggle();

            setTimeout(() => {
                window.location.replace('https://www.capnolearning.com')
            }, 10000)

        }
        else {
            setmessageHead("Error!!")
            setmessage("Some Error Occured")
            messageToggle();


        }
    }

    return (
        <div>
            <Header />
            <div className="wrp-dashbord pt-5">
                {/* <div className="sidebar-section"> */}
                {/* <Sidebar /> */}
                {/* </div> */}
                <div className="container-fluid" >

                    <div className="row mt-5">
                        <div className="col-lg-3 mt-5">
                        </div>
                        <div className="col-lg-6">
                            <div className="back-renew">
                                <Link to={owner.user_type == 5 ? "/go/personal/subscription/management" : owner.user_type == 6 ? "/go/basic/subscription/management" :  "/subscription/management" } className="backbtn-icon">
                                    <img src={backIcon} alt="backicon" />
                                    <span>Back</span>
                                </Link>
                            </div>
                            <div className="subscription-content">

                                <div className="notification-c">
                                    <h5 className="text-center">Renew Subscription</h5>
                                    <p><b>{"Account Name"}</b>: {owner.firstname} {owner.lastname}.</p>
                                    <p><b>{"Device(s) Registered"}</b>: {deviceLength}</p>
                                    <p><b>{t('Membership-Status')}</b> {owner.status == 1 ? "Active" : "Inactive"} 
                                    {/* (<b>{t('Expiry-Date')}</b>: {owner.expire_account ? new Date(owner.expire_account * 1e3).toDateString() : "NA"}) */}
                                    </p>
                                </div>
                                <div className="notification-c">
                                <p><b>{"Choose devices to renew"} <i className="fa fa-arrow-down"></i> </b></p>
                                </div>
                                <ul className="nostyle">
                                    {
                                        ownerfive.length > 0 && ownerfive.map((val, i) => {
                                            return (
                                                <li><input type="checkbox" onChange={(e) => handleCheckbox(e)} value={val.serial_key} defaultChecked={parseInt(new Date().getTime()/1e3) > val.expires_at} disabled={parseInt(new Date().getTime()/1e3) > val.expires_at} className="renewCheckbox" /> Serial number <b>{val.serial_key}: <span className={new Date().getTime()/1e3 > val.expires_at ? "red" :""}>{parseInt(new Date().getTime()/1e3) > val.expires_at ? "Expired on" :"Expires on"} {val.expires_at ? new Date(val.expires_at * 1e3).toLocaleDateString('en-IN', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric'

                                                }) : "NA"}</span></b></li>
                                            )
                                        })
                                    }

                                    {
                                        ownersix.length > 0 && ownersix.map((val, i) => {
                                            return (
                                                <li><input type="checkbox" onChange={(e) => handleCheckbox(e)} value={val.serial_key} defaultChecked={parseInt(new Date().getTime()/1e3) > val.expires_at} disabled={parseInt(new Date().getTime()/1e3) > val.expires_at} className="renewCheckbox" /> Serial number <b>{val.serial_key}: <span className={new Date().getTime()/1e3 > val.expires_at ? "red" :""}>{parseInt(new Date().getTime()/1e3) > val.expires_at ? "Expired on" :"Expires on"}  {val.expires_at ? new Date(val.expires_at * 1e3).toLocaleDateString('en-IN', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric',

                                                }) : "NA"}</span></b></li>
                                            )
                                        })
                                    }
                                    {
                                        ownerseven.length > 0 && ownerseven.map((val, i) => {
                                            return (
                                                <li><input type="checkbox" onChange={(e) => handleCheckbox(e)} value={val.serial_key} defaultChecked={parseInt(new Date().getTime()/1e3) > val.expires_at} disabled={parseInt(new Date().getTime()/1e3) > val.expires_at} className="renewCheckbox" /> Serial number <b>{val.serial_key}: <span className={new Date().getTime()/1e3 > val.expires_at ? "red" :""}>{parseInt(new Date().getTime()/1e3) > val.expires_at ? "Expired on" :"Expires on"}  {val.expires_at ? new Date(val.expires_at * 1e3).toLocaleDateString('en-IN', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric'

                                                }) : "NA"}</span></b></li>
                                            )
                                        })
                                    }
                                </ul>
                                <ul className="anual-renew-list">
                                    <li><h3 className="mb-0">{t('Annual renewal fee per device')}</h3></li>
                                    <li><p>{owner.user_type == 5 || owner.user_type == 6 ?  "$75" : deviceLength == 1 ? "$175" : deviceLength == 2 ? "$150"  : deviceLength == 3 ? "$125" : deviceLength >= 4 ? "$100" :  "No Device Found"}</p></li>
                                </ul>
                               
                                {
                                    deviceToRenew.length > 0 &&
                                    <h3 className="mb-0">{t('Total Cost')}: ${parseFloat(deviceToRenew.length * (owner.user_type == 5 || owner.user_type == 6 ? perGoDevice :  perDevice))} </h3>
                                }
                                {/* <button onClick={() => completeRenewal(userid,"ttryt")} >NI</button> */}

                                <div id="paypal-button-container" className="mt-4">

                                </div>
                            </div>

                        </div>
                        <div className="col-lg-3 mt-5">
                        </div>

                    </div>

                </div>
            </div>


            <Modal isOpen={messageModal} toggle={messageToggle} className="connect-box" centered={true}>
                <ModalHeader toggle={messageToggle}><span className="ml-1 roititle font-weight-bold">{messageHead}</span></ModalHeader>
                <ModalBody>
                    <div dangerouslySetInnerHTML={{ __html: message }}>

                    </div>
                </ModalBody>

            </Modal>

        </div>
    )
}

export default SubscriptionRenewal;