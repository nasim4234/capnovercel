import React, { useEffect, useState, useRef } from "react";
import { Link, useParams, Router } from 'react-router-dom';
import { Row, Col, Container, Button, ModalHeader, ModalFooter, Modal, ModalBody } from "reactstrap";
import i18n from "i18next";
import { jsPDF } from "jspdf";
import download from 'downloadjs';
import { useTranslation, initReactI18next } from "react-i18next";
import { API_URL } from "../../config";

import videoicon from '../images/videoicon.png'
import right from '../images/right.png';


const Zoomlinklist = ({ zoomlinkupdatecontenttoggleModal,selectedSession,setUpdatezoomlinkmodal }) => {



    const { t } = useTranslation();
    const accessToken = localStorage.getItem('accessToken');
    const sessionid = localStorage.getItem('session_id');

    const zoomlinkupdate = useRef();
    const [zoomlinks, setZoomlinks] = useState([])
   

    const [openModal, setOpenModal] = useState(false);
    const openToggleModal = () => setOpenModal(!openModal);
    const [fillallfieldmodal, setFillallfieldModal] = useState(false);
    const fillallfieldtoggleModal = () => setFillallfieldModal(!fillallfieldmodal);
   

    useEffect(()=>{
        getZoomLinkbyid()
    },[])



    function updatezoomlink() {
        // setLoader(true)
        let data = {};

        data['zoom_link'] = zoomlinkupdate.current.value;


        if (zoomlinkupdate.current.value == "") {
            fillallfieldtoggleModal();
            return false;
        }

        openToggleModal(true)
        // console.log(data);
        fetch(API_URL + "/session/zoom/link/" + selectedSession, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': accessToken
            },
            body: JSON.stringify(data)
        }).then((response) => {


            if (response.status == 200) {
                response.json().then((resp) => {
                    openToggleModal(false)
                    setUpdatezoomlinkmodal(true);
                    
                    getZoomLinkbyid();
                    setOpenModal(false);
                    zoomlinkupdatecontenttoggleModal()

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


    const getZoomLinkbyid = () => {
        fetch(API_URL + "/get/zoom/link/by/" + selectedSession,
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

                    setZoomlinks(resp.data[0])
                   

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


    const logout = () => {
        localStorage.clear();
        // alert("You Logout successful")
    }

    return (
        <div>




           
            <div class="addlink-input">
                <a href={zoomlinks ? zoomlinks.zoom_link : ""} target="_blank" className="openvideo">
                    <img src={videoicon} />
                    <a href={zoomlinks ? zoomlinks.zoom_link : ""} target="_blank">Open Video</a>
                </a>
                <input placeholder="Update link here" defaultValue={zoomlinks ? zoomlinks.zoom_link : ""} ref={zoomlinkupdate} />
            </div>
            <div class="modal-footer">
                <button type="button" class="close-btn" onClick={zoomlinkupdatecontenttoggleModal}>{t("Close")}</button>
                <button type="button" class="close-btn" onClick={updatezoomlink} >Update Link</button>
            </div>




            <Modal isOpen={fillallfieldmodal} toggle={fillallfieldtoggleModal} className="connect-box" centered={true}>
                <ModalHeader toggle={fillallfieldtoggleModal}><span className="ml-1 roititle font-weight-bold">Error</span></ModalHeader>
                <ModalBody>
                    <div className="modal-error-p">
                        <p>Please fill field</p>
                    </div>
                </ModalBody>

            </Modal>
            <Modal isOpen={openModal} toggle={openToggleModal} className="connect-box" centered={true}>
                <ModalHeader toggle={openToggleModal}><span className="ml-1 roititle modal-head">Request processing...</span></ModalHeader>
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

export default Zoomlinklist;