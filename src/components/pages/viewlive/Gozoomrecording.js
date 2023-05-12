import React, { useEffect, useState, useRef } from "react";
import { Link, useParams, Router } from 'react-router-dom';
import { Row, Col, Container, Button, ModalHeader, ModalFooter, Modal, ModalBody } from "reactstrap";
import i18n from "i18next";
import { jsPDF } from "jspdf";
import download from 'downloadjs';
import { useTranslation, initReactI18next } from "react-i18next";
import { API_URL, DATA_URL } from "../../../config";
import Header from '../../component/Header';
import Filter from '../../component/Filter';
import right from '../../images/right.png';
import videoicon from '../../images/videoicon.png'
import Audiocomponent from "./Audiocomponent";
import Header2 from "../../component/Header2";


const Gozoomrecording = () => {



    const { t } = useTranslation();
    const accessToken = localStorage.getItem('accessToken');
    const sessionid = localStorage.getItem('session_id');
    const userType = localStorage.getItem('userType');
    const [sessionsNotes, setsessionsNotes] = useState([]);
    const [sessionsImages, setsessionsImages] = useState([]);
    const [sessionsAudio, setsessionsAudio] = useState([]);
    const [session, setsession] = useState([]);
    const [selectedSession, setSelectedSession] = useState();
    const [downloaderModal, setDownloaderModal] = useState(false);
    const DownloaderToggleModal = () => setDownloaderModal(!downloaderModal);
    const [openModal, setOpenModal] = useState(false);
    const openToggleModal = () => setOpenModal(!openModal);
    const [fillallfieldmodal, setFillallfieldModal] = useState(false);
    const fillallfieldtoggleModal = () => setFillallfieldModal(!fillallfieldmodal);
    const zoomlink = useRef();
    const zoomlinkupdate = useRef();

    const [zoomlinkcontentmodal, setZoomlinkcontentmodal] = useState(false);
    const zoomlinkcontenttoggleModal = () => setZoomlinkcontentmodal(!zoomlinkcontentmodal);

    const [audiomodal, setAudiomodal] = useState(false);
    const audiomodaltoggleModal = () => setAudiomodal(!audiomodal);

    const [zoomlinkupdatecontentmodal, setZoomlinkupdatecontentmodal] = useState(false);
    const zoomlinkupdatecontenttoggleModal = () => setZoomlinkupdatecontentmodal(!zoomlinkupdatecontentmodal);

    const [addzoomlinkmodal, setAddzoomlinkmodal] = useState(false);
    const addzoomlinktoggleModal = () => setAddzoomlinkmodal(!addzoomlinkmodal);

    const [updatezoomlinkmodal, setUpdatezoomlinkmodal] = useState(false);
    const updatezoomlinktoggleModal = () => setUpdatezoomlinkmodal(!updatezoomlinkmodal);

    const [zoomdata, setZoomdata] = useState([])
    const [zoomlinks, setZoomlinks] = useState([])

    const [audiadata, setAudiodata] = useState([])



    useEffect(() => {

        setInterval(() => {
            setSelectedSession(localStorage.getItem('selectedSession'));

        }, 100);

    }, []);

    useEffect(() => {
        if(selectedSession ){
           
            getZoomLinkbyid();
        }
   

    }, [selectedSession])


    const zoomRecording = () => {


        fetch(API_URL + "/session/info?session_id=" + selectedSession,
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
                    if (resp.session.length > 0) {
                        setsession(resp.session[0].link);

                    }
                    // let len = session.length;
                    //   console.warn(len);


                });
            }
            else if (response.status == 401) {
                logout()
            }
            else {
                alert("network error")
            }


        })
    }




    function saveZoomLink() {
        // setLoader(true)
        let data = {};

        data['zoom_link'] = zoomlink.current.value;


        if (zoomlink.current.value == "") {
            fillallfieldtoggleModal();

            return false;
        }
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
                    addzoomlinktoggleModal()
                    zoomlinkcontenttoggleModal()
                    getZoomLinkbyid()
                    setOpenModal(false);
                    

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


    function updatezoomlink() {
        // setLoader(true)
        let data = {};

        data['zoom_link'] = zoomlinkupdate.current.value;


        if (zoomlinkupdate.current.value == "") {
            fillallfieldtoggleModal();

            return false;
        }
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
                    // // console.log("result", resp);
                    // successToggleModal();
                    updatezoomlinktoggleModal();
                    zoomlinkupdatecontenttoggleModal();
                    updatezoomlinktoggleModal();
                    getZoomLinkbyid();
                    setOpenModal(false);

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

                    setZoomdata(resp.data)
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

            
                    <div className="create-section">
                        <ul className="create-list groupreport-list">
                          
                            <li>
                                <div className="create-list-box create-list-boxzoomlink" >
                                    <a href="javascript:void" className={(selectedSession === "" ||selectedSession === "null") ? "deactivate" : ""}>
                                        {/* {session} */}
                                        {
                                            (zoomdata.length > 0) ?
                                                <a href="javascript:void" data-toggle="modal" onClick={zoomlinkupdatecontenttoggleModal}  >{t('View/Link-Zoom-Recordings')}</a>
                                                :
                                                <a href="javascript:void" data-toggle="modal" onClick={zoomlinkcontenttoggleModal}  >{t('View/Link-Zoom-Recordings')}</a>


                                        }
                                    </a>
                                </div>
                            </li>
                        </ul>
                        <Modal isOpen={zoomlinkupdatecontentmodal} toggle={zoomlinkupdatecontenttoggleModal} className="connect-box" centered={true}>

                           
                                
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">{t("Session-Zoom-Recording")}</h5>
                                        {/* {session} */}
                                        <button type="button" class="close" onClick={zoomlinkupdatecontenttoggleModal} aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="addlink-input">
                                        <a href={zoomlinks ? zoomlinks.zoom_link : ""} target="_blank" className="openvideo">
                                            <img src={videoicon} />
                                            <a href={zoomlinks ? zoomlinks.zoom_link : ""} target="_blank">Open Video</a>
                                        </a>
                                        <input placeholder="Update link here" defaultValue={zoomlinks ? zoomlinks.zoom_link : ""} ref={zoomlinkupdate} />
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="close-btn" onClick={zoomlinkupdatecontenttoggleModal}>{t("Close")}</button>
                                        <button type="button" class="close-btn" onClick={ ()=>{updatezoomlink(); openToggleModal()}} >Update Link</button>
                                    </div>
                                
                          

                        </Modal>

                        <Modal isOpen={zoomlinkcontentmodal} toggle={zoomlinkcontenttoggleModal} className="connect-box" centered={true}>

                           
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">{t("Session-Zoom-Recording")}</h5>
                                        <button type="button" class="close" onClick={zoomlinkcontenttoggleModal} aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="addlink-input">
                                        <input placeholder="Add link here" ref={zoomlink} />
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="close-btn" onClick={zoomlinkcontenttoggleModal}>{t("Close")}</button>
                                        <button type="button" class="close-btn" onClick={ ()=>{saveZoomLink(); openToggleModal()}}>{t("Add-link")}</button>
                                    </div>
                                

                        </Modal>
                    </div>
                
           

            <Modal isOpen={downloaderModal} toggle={DownloaderToggleModal} className="connect-box" centered={true}>
                <ModalHeader toggle={DownloaderToggleModal}><span className="ml-1 roititle modal-head">Request processing...</span></ModalHeader>
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

            <Modal isOpen={fillallfieldmodal} toggle={fillallfieldtoggleModal} className="connect-box" centered={true}>
                <ModalHeader toggle={fillallfieldtoggleModal}><span className="ml-1 roititle font-weight-bold">Error</span></ModalHeader>
                <ModalBody>
                    <div className="modal-error-p">
                        <p>Please fill field</p>
                    </div>
                </ModalBody>

            </Modal>

            <Modal isOpen={addzoomlinkmodal} toggle={addzoomlinktoggleModal} className="connect-box" centered={true}>
                <ModalHeader toggle={addzoomlinktoggleModal}><span className="ml-1 roititle font-weight-bold">Successfull</span></ModalHeader>
                <ModalBody>
                    <div className="modal-p">
                        <div className="right-circle"><img src={right} /></div>
                        <h4>Saved!</h4>
                        <p>Zoom Link has been added successfully</p>
                    </div>
                </ModalBody>

            </Modal>
            <Modal isOpen={updatezoomlinkmodal} toggle={updatezoomlinktoggleModal} className="connect-box" centered={true}>
                <ModalHeader toggle={updatezoomlinktoggleModal}><span className="ml-1 roititle font-weight-bold">Successfull</span></ModalHeader>
                <ModalBody>
                    <div className="modal-p">
                        <div className="right-circle"><img src={right} /></div>
                        <h4>Saved!</h4>
                        <p>Zoom Link has been updated successfully</p>
                    </div>
                </ModalBody>

            </Modal>

            <Modal isOpen={audiomodal} toggle={audiomodaltoggleModal} className="connect-box" centered={true}>
                <ModalHeader toggle={audiomodaltoggleModal}><span className="ml-1 roititle font-weight-bold">Audio Notes</span></ModalHeader>
                <ModalBody>
                    <div><Audiocomponent audiadata={audiadata} /></div>
                </ModalBody>

            </Modal>


            
        </div>
    )
}

export default Gozoomrecording;