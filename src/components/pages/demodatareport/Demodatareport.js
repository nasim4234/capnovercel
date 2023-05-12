import React from 'react';
import { Link, useParams, Router } from 'react-router-dom';
import { useTranslation, initReactI18next } from "react-i18next";
import Sidebar from '../../component/Sidebar';
import Header from '../../component/Header';
import backIcon from "../../../components/images/back.png";

const Demodatareport = () => {
    const { tab } = useParams();
    const { t } = useTranslation();

    const Demodata = [
        {
            displayDemodata: t("Single-Session"),
            link: "/create/report/0/12/54322/all/12"
        },
        // {
        //     displayDemodata: t("Multi-Session"),
        //     link: "#"
        // },
        {
            displayDemodata: t("Group-Session"),
            link: "/create/group/report/0/37/54455/all/37"
        },

    ]


    return (
        <div className="demodata-bg">
            <Header />
            <div className="wrp-dashbord">
                <div className="sidebar-section">
                    <Sidebar />
                </div>
                <div className="right-section">
                    <div className="wrp-demodatareport">
                        <div className='back-icon-wrp'>
                            <Link to="/" className="backbtn-icon">
                                <img src={backIcon} alt="backicon" />
                                <span>{t("Back")}</span>
                            </Link>
                        </div>
                        <div className='headwrpdemodatareport-head'><h3>{t("Demo-Data-Reports")}</h3></div>

                    </div>
                    <div className="wrp-r-listbox">
                        {
                            Demodata.map(function (demodata) {
                                return (
                                    <a href={demodata.link} className='report-list-box'>

                                        <div className="report-child1 report-child1demo">
                                            <span className='reportcircle'></span>
                                        </div>
                                        <div className="report-child2">
                                            <span>{demodata.displayDemodata}</span>
                                        </div>

                                    </a>
                                )
                            }

                            )
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Demodatareport;