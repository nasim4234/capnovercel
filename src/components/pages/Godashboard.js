import React, { Component, useState, useEffect } from 'react';
import { Link, useParams, Router, NavLink } from 'react-router-dom';
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import { Row, Col, Container, Button, ModalHeader, ModalFooter, Modal, ModalBody } from "reactstrap";

import Header from "../component/Header";

import BorderColorIcon from '@mui/icons-material/BorderColor';
import PageviewIcon from '@mui/icons-material/Pageview';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import StreamIcon from '@mui/icons-material/Stream';
import NoteIcon from '@material-ui/icons/Note';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ReportIcon from '@mui/icons-material/Report';
import VideocamIcon from '@mui/icons-material/Videocam';


import ImageIcon from '@material-ui/icons/Image';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import NotesIcon from '@material-ui/icons/Notes';
import crosss from '../images/crosss.png';
import $ from "jquery";
import Gofilter from '../component/Gofilter';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

import backIcon from "../images/back.png"



const Gridmenu = () => {

    const { t } = useTranslation();
    const userType = localStorage.getItem('userType');

    const M_module = localStorage.getItem('m_module');
    const [dataid, setIdData] = useState(null)

    const [editprofileModal, setEditprofileModal] = useState(false);
    const editprofileModalToggle = () => setEditprofileModal(!editprofileModal);

    const [isOpen, setIsopen] = useState(false);

    const ToggleSidebar = () => {
        isOpen === true ? setIsopen(false) : setIsopen(true);
        setIdData(null)

    }



    useEffect(() => {


    }, [])


    const menuArray = [

        {
            id: 1, links: "#", classNames: "toggle-slide-right2", tabDisplay: "Make Reports", "tabimg": <BorderColorIcon />
        },


        {
            id: 2, links: "#", classNames: "toggle-slide-right3", tabDisplay: "View Reports", "tabimg": <PictureAsPdfIcon />
        },

        {
            id: 3, links: "#", classNames: "toggle-slide-right4", tabDisplay: "Session Notes", "tabimg": <NoteIcon />
        },
        {
            id: 4, links: "#", classNames: "toggle-slide-right5", tabDisplay: "Session Images", "tabimg": <ImageIcon />
        },

        {
            id: 5, links: "#", classNames: "toggle-slide-right6", tabDisplay: "Data Report Notes", "tabimg": <NotesIcon />
        },
        {

            id: 6, links: "#", classNames: "toggle-slide-rightusertypefivendsix", tabDisplay: "Zoom Recordings", "tabimg": <VideocamIcon />
        },
        {
            id: 7, links: ((userType == 5 && M_module == 1) || userType == 6) ? "#0" : "/go/edit/profile", classNames: ((userType == 5 && M_module == 1) || userType == 6) ? "toggle-slide-right7" : "", tabDisplay: ((userType == 5 && M_module == 1) || userType == 6) ? "Profiles" : "Edit Profile", "tabimg": <PersonAddIcon />
        },

        {
            id: 8, links: ((userType == 5 && M_module == 1) || userType == 6) ? "/go/basic/subscription/management" : "/go/personal/subscription/management", classNames: "toggle-slide-rightusertypefivendsix", tabDisplay: "Subscription", "tabimg": <TouchAppIcon />
        }


    ];

    const handleOnClick = (id) => {
        setIdData(id)
        if ((userType == 5 && M_module == 1) || userType == 6) {
            localStorage.setItem('selectedSession', null)
            localStorage.setItem('selectedClient', null)

        }

        isOpen === true ? setIsopen(false) : setIsopen(true);


        // window.location.reload("menu/" + id)
    }

    return (
        <div>
            <Header />
            <div className="container-fluid">
                <div className="menu-container">
                    <div className="row smrow">
                        {
                            menuArray.map((val, index) => {
                                return (
                                    <div className="col-sm-6 col-md-6 col-lg-3">

                                        <NavLink to={val.links} className={val.classNames + " " + "grid-menu"} onClick={() => { handleOnClick(val.id); }}>
                                            <div>{val.tabimg}</div>
                                            <h3>{val.tabDisplay}</h3>

                                        </NavLink>

                                    </div>
                                )
                            })
                        }
                    </div>

                </div>
            </div>


            <div className="container-fluid mt-3">

                <div className={`sidebar2 ${isOpen == true ? 'active' : ''}`}>
                    <div className="sd-header">
                        <button className='closebutton' onClick={ToggleSidebar}><img src={crosss} className="img-close" /></button>
                    </div>



                    {
                        dataid == 7 ?
                            <>

                               
                                <div className='profilelist wrpprofilelistbox'>
                                <div className="gopopuphead2">
                                    <h3>{dataid == 7 ? "Profiles" : ""}</h3>
                                </div>
                                    <a href='/go/add/client'>New Client</a>
                                    <a href='/go/list/client'>Edit Client</a>
                                    <a href='/go/edit/profile'>Edit Profile</a>

                                </div>
                                <div className="wrp-gotodashboardbtn2">
                                    <Link to="/go/dashboard" onClick={ToggleSidebar} ><KeyboardBackspaceIcon />Go to Dashboard</Link>
                                </div>



                            </>

                            :
                            <>

                                <Gofilter dataid={dataid} ToggleSidebar={ToggleSidebar} />



                            </>

                    }

                </div>
                <div className={`sidebar-overlay ${isOpen == true ? 'active' : ''}`} onClick={ToggleSidebar}></div>
            </div>



        </div>
    )
}

export default Gridmenu;