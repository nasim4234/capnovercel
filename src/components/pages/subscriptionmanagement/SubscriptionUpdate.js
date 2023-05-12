
import { update } from "plotly.js";
import React, { Component, useEffect, useRef, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, Row } from 'reactstrap';

import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";

import { Link, useParams, Router, useNavigate } from 'react-router-dom';
import Header from '../../component/Header';
import Sidebar from '../../component/Sidebar';
import backIcon from "../../images/back.png";
import { API_URL } from "../../../config";
import md5 from "md5";

const SubscriptionUpdate = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { type } = useParams();
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
    // const [deviceToRenew , setDevcieToRenew ] = useState([]);
    const [upgradeOption , setUpgradeOption ] = useState(type);
    const [upgradeCost , setUpgradCost ] = useState(0);


    const [payPalModal, setPayPalModal] = useState(false);
    const payPalToggle = () => setPayPalModal(!payPalModal);

  
    useEffect(() => {
        getOwnerProfile(); 

       
    }, [])

    useEffect(() => {
        let _upgradeOption = upgradeOption ; 

        setUpgradCost(_upgradeOption == 0 ?  300 : _upgradeOption == 1 ? 450 : _upgradeOption == 2 ? 750  : _upgradeOption == 3 ? 2250 : _upgradeOption == 4 ? 1450 :  0)
        if(owner.firstname){

        payNow(upgradeOption == 0 ?  300 : upgradeOption == 1 ? 450 : upgradeOption == 2 ? 750  : upgradeOption == 3 ? 2250 : upgradeOption == 4 ? 1450 :  0)

        if(owner.c_module == 1 && type == 0){
            navigate(-1);
        }
    }

    
 
    },[upgradeOption,owner])
 
    const handleRadio = (e) => {
        setUpgradeOption(e.target.value);
        
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



    const payNow = (_perPrice) => {
        $("#paypal-button-container").html('')
        // _perPrice = 0.01
        let _price = _perPrice ;
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
                                  name: "CapnoTrainer Account Upgrade", /* Shows within upper-right dropdown during payment approval */
                                  description: "Account Upgrade for"+ owner.firstname + owner.lastname +".", /* Item details will also be in the completed paypal.com transaction view */
                                  unit_amount: {
                                    currency_code: "USD",
                                    value: _perPrice
                                  },
                                  quantity: 1
                                },
                              ]
                        }]
                    });
                },
                onApprove: function (data, actions) {
                    return actions.order.capture().then(function (details) {
                        //   // console.log(details)

                        completeRenewal(details);

                    })
                },
                onCancel: function (data) {
                    // window.location.replace("<?php echo $site_url;?>sales/CeRegister_new_back.php")
                }
            }).render('#paypal-button-container');
        }


    }


    const completeRenewal = async (details) => {

        let _userType = 5 ;
        let c_module = owner.c_module ;
        let m_module = owner.m_module ;

        if(upgradeOption == 0){
             if(owner.m_module == 1){
                _userType = 6 ; 
             }else{
                _userType = 5 ; 
             }
             c_module = 1
        }
        else if(upgradeOption == 1){
            if(owner.c_module == 1){
               _userType = 6 ; 
            }else{
               _userType = 5 ; 
            }
            m_module = 1
       }
       else if(upgradeOption == 2){
        _userType = 6 ; 
        m_module = 1
        c_module = 1
   }
   else if(upgradeOption == 3 || upgradeOption == 4){
    _userType = 7 ; 
    m_module = 1
    c_module = 1
}

        const response = await fetch(API_URL + '/app/update/subscription/' + userid, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_type: _userType,
                m_module : m_module,
                c_module : c_module,
                details: JSON.stringify(details)
            }),
        })

        const data = await response.json()

        if (data.success) {
            setmessageHead("Thank you!")
            setmessage("Your payment for upgrade was successful. <br /> <br /> You will now be redirected to your cloud dashboard.<br /> <br /> Please log out and log in again.");
            // setmessage("P");
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
                                    <h5 className="text-center">Update Subscription</h5>
                                    <p><b>{"Account Name"}</b>: {owner.firstname} {owner.lastname}.</p>
                                    {/* <p><b>{"Device(s) Registered"}</b>: {deviceLength}</p> */}
                                    <p><b>{t('Membership-Status')}</b> {owner.status == 1 ? "Active" : "Inactive"} 
                                    {/* (<b>{t('Expiry-Date')}</b>: {owner.expire_account ? new Date(owner.expire_account * 1e3).toDateString() : "NA"}) */}
                                    </p>
                                </div>
                                <div className="notification-c">
                                <p><b>{"Choose upgrade option below"} <i className="fa fa-arrow-down"></i> </b></p>
                                </div>
                                <ul className="nostyle">
                                {
                                    owner.c_module == 0 && owner.user_type == 5 &&
                                    <li><input type="radio"  name="upgradeoption" onChange={(e) => handleRadio(e)} value={0} defaultChecked={type == 0}   className="renewCheckbox" />  C-Option (PC and Apple computers), <b>$300.00.</b> </li>
                                }
                                {
                                    owner.m_module == 0 && owner.user_type == 5 &&
                                <li><input type="radio" name="upgradeoption" onChange={(e) => handleRadio(e)} value={1} defaultChecked={type == 1}   className="renewCheckbox" />  M-Option (Multiuser), <b>$450.00.</b> </li>
                                }
                                {
                                    owner.user_type == 5 &&
                                <li><input type="radio" name="upgradeoption" onChange={(e) => handleRadio(e)} value={2} defaultChecked={type == 2}   className="renewCheckbox" />  Basic System (includes c and M features), <b>$750.00.</b> </li>
                                }
                                {
                                    (owner.user_type == 6 ) &&
                                <li><input type="radio" name="upgradeoption" onChange={(e) => handleRadio(e)} value={4} defaultChecked={type == 4}   className="renewCheckbox" />  Professional System (includes c and M features), <b>$1,450.00.</b> </li>
                             }
                              {
                                    (owner.user_type == 5) &&
                                <li><input type="radio" name="upgradeoption" onChange={(e) => handleRadio(e)} value={3} defaultChecked={type == 3}   className="renewCheckbox" />  Professional System (includes c and M features), <b>$2,250.00.</b> </li>
                             }

                                    {/* {
                                        ownerfive.length > 0 && ownerfive.map((val, i) => {
                                            return (
                                                <li><input type="checkbox" onChange={(e) => handleRadio(e)} value={val.serial_key} defaultChecked={parseInt(new Date().getTime()/1e3) > val.expires_at} disabled={parseInt(new Date().getTime()/1e3) > val.expires_at} className="renewCheckbox" /> Serial number <b>{val.serial_key}: <span className={new Date().getTime()/1e3 > val.expires_at ? "red" :""}>{parseInt(new Date().getTime()/1e3) > val.expires_at ? "Expired on" :"Expires on"} {val.expires_at ? new Date(val.expires_at * 1e3).toLocaleDateString('en-IN', {
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
                                                <li><input type="checkbox" onChange={(e) => handleRadio(e)} value={val.serial_key} defaultChecked={parseInt(new Date().getTime()/1e3) > val.expires_at} disabled={parseInt(new Date().getTime()/1e3) > val.expires_at} className="renewCheckbox" /> Serial number <b>{val.serial_key}: <span className={new Date().getTime()/1e3 > val.expires_at ? "red" :""}>{parseInt(new Date().getTime()/1e3) > val.expires_at ? "Expired on" :"Expires on"}  {val.expires_at ? new Date(val.expires_at * 1e3).toLocaleDateString('en-IN', {
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
                                                <li><input type="checkbox" onChange={(e) => handleRadio(e)} value={val.serial_key} defaultChecked={parseInt(new Date().getTime()/1e3) > val.expires_at} disabled={parseInt(new Date().getTime()/1e3) > val.expires_at} className="renewCheckbox" /> Serial number <b>{val.serial_key}: <span className={new Date().getTime()/1e3 > val.expires_at ? "red" :""}>{parseInt(new Date().getTime()/1e3) > val.expires_at ? "Expired on" :"Expires on"}  {val.expires_at ? new Date(val.expires_at * 1e3).toLocaleDateString('en-IN', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric'

                                                }) : "NA"}</span></b></li>
                                            )
                                        })
                                    } */}
                                </ul>
                                
                                {
                                    type >= 0 &&
                                    <h3 className="mb-0">{t('Total Cost')}: ${parseFloat(upgradeCost)} </h3>
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

export default SubscriptionUpdate;