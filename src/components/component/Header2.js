import React, { Component, useState, useEffect } from 'react';
import { Link, useParams, Router, NavLink } from 'react-router-dom';
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";


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
import LogoutIcon from '@mui/icons-material/Logout';



import Multilanguage from '../component/Multilanguage'


const Header2 = () => {
    const { t } = useTranslation();
    const userType = localStorage.getItem('userType');

    const [activeIndex, setActiveIndex] = useState()

    const M_module = localStorage.getItem('m_module');

    const tabArray = [
        {
            links: "/", tabDisplay: t('Create-Data-Report'), "tabimg": <BorderColorIcon />
        },
        {
            links: "/view/data/report", tabDisplay: t('View-&-Edit-Data-Report'), "tabimg": <PageviewIcon />
        },
        {
            links: "/view/pdf/report", tabDisplay: t('View-PDF-Report'), "tabimg": <PictureAsPdfIcon />
        },
        {
            links: "/view/live", tabDisplay: t('View-Live-Session-Info'), "tabimg": <StreamIcon />
        },
        {
            links: "/view/manageform", tabDisplay: t('View/Manage-Forms'), "tabimg": <ManageAccountsIcon />
        },

        {
            links: "/viewcreate", tabDisplay: (userType == 5) ? "Edit Profile" : t('View-Create-Edit-Profile'), "tabimg": <PersonAddIcon />
        },

        {
            links: "/case/report/assembly", tabDisplay: t('Session-Report-Assembly'), "tabimg": <ReportIcon />
        },
        {
            links: "/recording", tabDisplay: t('Recording-by-Distributors'), "tabimg": <VideocamIcon />
        },
        {
            links: "/subscription/management", tabDisplay: t('Subscription-Management'), "tabimg": <TouchAppIcon />
        },
        // {
        //   links: "/subscribe/user", tabDisplay: t('Subscribed Users'), "tabimg": sidebarmenu8
        // },

        // {
        //     links: "/", tabDisplay: t('Group-Subscription-Management'), "tabimg": <PictureAsPdfIcon />
        //   },

    ];

    const tabArray2 = [
        {
            links: "/", tabDisplay: t('Create-Data-Report'), "tabimg": <BorderColorIcon />
        },
        {
            links: "/view/data/report", tabDisplay: t('View-&-Edit-Data-Report'), "tabimg": <PageviewIcon />
        },
        {
            links: "/view/pdf/report", tabDisplay: t('View-PDF-Report'), "tabimg": <PictureAsPdfIcon />
        },
        {
            links: "/view/live", tabDisplay: t('View-Live-Session-Info'), "tabimg": <StreamIcon />
        },

        {
            links: "/viewcreate", tabDisplay: "View, create, Edit Profile", "tabimg": <PersonAddIcon />
        },

        {
            links: "/subscription/management", tabDisplay: t('Subscription-Management'), "tabimg": <TouchAppIcon />
        },
        // {
        //   links: "/subscribe/user", tabDisplay: t('Subscribed Users'), "tabimg": sidebarmenu8
        // },

        // {
        //     links: "/", tabDisplay: t('Group-Subscription-Management'), "tabimg": <PictureAsPdfIcon />
        //   },

    ];
    const tabArrayusertype5 = [

        {
            links: "/", tabDisplay: t('Create-Data-Report'), "tabimg": <BorderColorIcon />
        },

        // {
        //   links: ((userType == 5 && M_module == 0))?"/go/device/session/single/report": "/view/data/report", tabDisplay: t('View-&-Edit-Data-Report'), "tabimg":<PageviewIcon />
        // },
        {
            links: ((userType == 5 && M_module == 0)) ? "/go/pdf/session/report" : "/view/pdf/report", tabDisplay: t('View-PDF-Report'), "tabimg": <PictureAsPdfIcon />
        },
        // {
        //   links: "/view/live", tabDisplay: t('View-Live-Session-Info'), "tabimg": <StreamIcon />
        // },
        {
            links: "/go/session/note", tabDisplay: "Session Notes", "tabimg": <NoteIcon />
        },
        {
            links: "/go/session/image", tabDisplay: "Session Images", "tabimg": <ImageIcon />
        },
        {
            links: "/go/data/reports/notes", tabDisplay: "Data Reports Notes", "tabimg": <NotesIcon />
        },
        {
            links: "/go/zoom/recording", tabDisplay: "View/Link Zoom Recordings", "tabimg": <VideocamIcon />
        },
        {
            links: ((userType == 5 ||  userType == 6)) ? "/go/edit/profile" : "/viewcreate", tabDisplay: "Edit Profile", "tabimg": <PersonAddIcon />
        },

        {
            links: "/subscription/management", tabDisplay: t('Subscription-Management'), "tabimg": <TouchAppIcon />
        }


    ];


    const usertypeseventabArray = [
        {
            links: "/", tabDisplay: t('Create-Data-Report'), "tabimg": <BorderColorIcon />
        },
        {
            links: "/view/data/report", tabDisplay: t('View-&-Edit-Data-Report'), "tabimg": <PageviewIcon />
        },
        {
            links: "/view/pdf/report", tabDisplay: t('View-PDF-Report'), "tabimg": <PictureAsPdfIcon />
        },
        {
            links: "/view/live", tabDisplay: t('View-Live-Session-Info'), "tabimg": <StreamIcon />
        },
        {
            links: "/view/manageform", tabDisplay: t('View/Manage-Forms'), "tabimg": <ManageAccountsIcon />
        },

        {
            links: "/viewcreate", tabDisplay: (userType == 5) ? "Edit Profile" : t('View-Create-Edit-Profile'), "tabimg": <PersonAddIcon />
        },

        {
            links: "/case/report/assembly", tabDisplay: t('Session-Report-Assembly'), "tabimg": <ReportIcon />
        },
        {
            links: "/subscription/management", tabDisplay: t('Subscription-Management'), "tabimg": <TouchAppIcon />
        },


    ];




    const handleActive = (index) => {
        setActiveIndex(index)
    }

    const auth = localStorage.getItem('user_id');
    const logout = () => {
        localStorage.clear();
        window.location.reload();
    }

    return (
        <div className="containerfixed">

            <div className="container-fluid">
                <div className="header2wrp">


                    <ul className="header2list">
                        {/* "hi" {activeIndex} */}

                        {
                            (M_module == 1 && userType == 5) ?
                                tabArray2.map(function (v, index) {
                                    return (
                                        <li><NavLink to={v.links} onClick={() => handleActive(index)}><div className="sidebar-icon-img">{v.tabimg} </div> <p>{v.tabDisplay}</p></NavLink></li>
                                    )
                                }

                                )
                                : (userType == 5 || userType == 6) ? tabArrayusertype5.map(function (v, i) {
                                    return (
                                        <li><NavLink to={v.links} className="close-menu" ><div className="sidebar-icon-img">{v.tabimg}</div><p>{v.tabDisplay}</p></NavLink></li>
                                    )
                                }

                                ) :
                                    userType == 7 ? usertypeseventabArray.map(function (v, i) {
                                        return (
                                            <li><NavLink to={v.links} className="close-menu" ><div className="sidebar-icon-img">{v.tabimg}</div><p>{v.tabDisplay}</p></NavLink></li>
                                        )
                                    }

                                    )
                                        :
                                        tabArray.map(function (v, index) {
                                            return (
                                                <li><NavLink to={v.links} onClick={() => handleActive(index)}><div className="sidebar-icon-img">{v.tabimg} </div> <p>{v.tabDisplay}</p></NavLink></li>
                                            )
                                        }

                                        )

                        }


                        <li>{
                            auth ? <Link to="/login" onClick={logout} className="tabs"><div className="sidebar-icon-img"><LogoutIcon /></div><p>{t('Logout')}</p></Link> : null
                        }</li>




                    </ul>
                </div>
            </div>

        </div>
    )
}

export default Header2;