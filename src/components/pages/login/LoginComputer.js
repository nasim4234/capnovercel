import { removeData } from 'jquery';
import React, { useState, useRef, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { ModalHeader, Modal, ModalBody } from "reactstrap";
import i18n from "i18next";
import { API_URL } from '../../../config';
import { useTranslation, initReactI18next } from "react-i18next";
import user from '../../images/user.png'

const LoginComputer = () => {
    const { t } = useTranslation();
 
    const {access} = useParams() 
    const navigate = useNavigate();
   
    async function loginUser() {
       
       

        const response = await fetch(API_URL + '/setlogin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                access
            }),
        })





        const data = await response.json()
        // setLoader(false)
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

            localStorage.setItem('selectedTrainer', null);
            localStorage.setItem('selectedTrainerGroup', null);
            localStorage.setItem('selectedClient', data.user_id);
            localStorage.setItem('selectLanguage', null);
            // localStorage.setItem('selectedGroup', false);
            localStorage.setItem('userType', data.user_type);
            if (data.user_type == 1 || data.user_type == 2) {
                localStorage.setItem('selectedTrainer', data.user_id);
            }
            localStorage.setItem('selectedClient', null);
            localStorage.setItem('selectedSession', null);
            if (data.user_type == 3) {
                localStorage.setItem('selectedClient', data.user_id);
            }
            navigate("/");

        } else {
            alert("Invalid Path/Login")


        }

        // alert('Logined')
    }
    useEffect(() => {
        if(access != ""){
            loginUser()
        }
    },access)
    return (
      <>
      </>
    );
}


export default LoginComputer;