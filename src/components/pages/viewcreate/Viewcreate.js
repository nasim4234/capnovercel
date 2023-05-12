import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import Header from '../../component/Header';
import Sidebar from '../../component/Sidebar';
import Header2 from "../../component/Header2";

const Viewcreate = () => {
    const { t } = useTranslation();
    const userType = localStorage.getItem('userType');

    const Viewcreatelist = [
        {
            links: "/addclient", displayViewcreatelist: t('New-Client')
        },
        {
            links: "/list/client", displayViewcreatelist: t('Edit-Client')
        },
        {
            links: "/add/trainer", displayViewcreatelist: t('New-Trainer')
        },
        {
            links: "/edit/trainer", displayViewcreatelist: t('Edit-Trainer')
        },
        {
            links: "/group/information", displayViewcreatelist: t('New-Group')
        },
        {
            links: "/edit/group", displayViewcreatelist: t('Edit-Group')
        },
        {
            links: "/edit/profile", displayViewcreatelist: t('Edit-My-Profile')
        },
        {
            links: "/hardware/profile", displayViewcreatelist: t('View/Edit-Hardware-Profile')
        }

    ]

    const Viewcreatelist2 = [

        {
            links: "/edit/client/profile", displayViewcreatelist: t('Edit-My-Profile')
        },

    ]

    const Viewcreatelist3 = [
        {
            links: "/addclient", displayViewcreatelist: t('New-Client')
        },
        {
            links: "/list/client", displayViewcreatelist: t('Edit-Client')
        },
        {
            links: "/group/information", displayViewcreatelist: t('New-Group')
        },
        {
            links: "/edit/group", displayViewcreatelist: t('Edit-Group')
        },

        {
            links: "/edit/profile", displayViewcreatelist: t('Edit-My-Profile')
        },
       
    ]


    return (
        <div>
            <Header />
          
            <div className="wrp-dashbord">
                <div className="sidebar-section">
                    <Sidebar />
                </div>
                <div className="right-section">

                    <div className="create-section">
                        <ul className="create-list">
                            
                            {
                            
                            userType == 3 || userType == 4 ?
                            
                            Viewcreatelist2.map(function (Vlist) {
                                return (

                                    <li>
                                        <div className="create-list-box"><Link to={Vlist.links}>{Vlist.displayViewcreatelist}</Link></div>
                                    </li>
                                )
                            }

                            )

                            : 
                            userType == 2 ?
                            Viewcreatelist3.map(function (Vlist) {
                                        return (

                                            <li>
                                                <div className="create-list-box"><Link to={Vlist.links}>{Vlist.displayViewcreatelist}</Link></div>
                                            </li>
                                        )
                                    }

                                    )
                                    :
                                    userType == 1 || userType == 7?
                                    Viewcreatelist.map(function (Vlist) {
                                        return (

                                            <li>
                                                <div className="create-list-box"><Link to={Vlist.links}>{Vlist.displayViewcreatelist}</Link></div>
                                            </li>
                                        )
                                    }

                                    )
                                    :
                                    ""

                               
                           }
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Viewcreate;