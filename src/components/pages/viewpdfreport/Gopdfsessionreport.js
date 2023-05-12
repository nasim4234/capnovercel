import React, { useEffect, useState } from "react";
import { Link, useParams, Router } from 'react-router-dom';
import { Row, Col, Container, Button, ModalHeader, ModalFooter, Modal, ModalBody } from "reactstrap";

import { useTranslation, initReactI18next } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { Tooltip } from '@material-ui/core';
import Header from '../../component/Header';
import MaterialTable from 'material-table';
import download from '../../images/download.png'
import preveiw from '../../images/preveiw.png'
import { API_URL } from "../../../config";
import backIcon from "../../../components/images/back.png";
import { jsPDF } from "jspdf";
import crosss from '../../images/crosss.png';
import Gofilter from "../../component/Gofilter";


const useStyles = makeStyles(() => ({
    customTooltip: {
        backgroundColor: "black",
        fontSize: "15px"
    }
}));

const Gopdfsessionreport = () => {
    const { t } = useTranslation();
    const userType = localStorage.getItem('userType');
    const accessToken = localStorage.getItem('accessToken');
    const [pdfs, setpdfs] = useState([]);
    const [data, setData] = useState([]);
    const sessionid = localStorage.getItem('selectedSession');

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [focusedInput, setFocusedInput] = useState(null);
    const [loaderModal, setLoaderModal] = useState(false);
    const loaderToggleModal = () => setLoaderModal(!loaderModal);

    const [dataid, setdataid] = useState(2);

    const client_id = localStorage.getItem('client_id');

    const { pdftype } = useParams();
    const classes = useStyles();

    const [isOpen, setIsopen] = useState(false);

    const ToggleSidebar = () => {
        isOpen === true ? setIsopen(false) : setIsopen(true);
    }




    useEffect(() => {


        if (pdftype == "multi") {
            Multisession()
        }
        else {
            Singlesession();
        }


    }, []);





    const pdfdata = (sid) => {



        fetch(API_URL + "/pdf/list/" + sid,
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

                    let _clientName = resp.firstname + " " + resp.lastname;
                    let _trainerName = resp.data[0].firstname + " " + resp.data[0].lastname;
                    let _pdfname = resp.pdfname;
                    let _sessionDate = resp.sessionDate;
                    let _reportName = resp.reportName;
                    downloadpdf(_clientName, _trainerName, resp.result, _pdfname, _sessionDate, _reportName)
                    setLoaderModal(false);
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


    const downloadpdf = (_clientName, _trainerName, _image, _pdfname, _sessionDate, _reportName) => {

        const doc = new jsPDF({
            orientation: 'l', 
            // unit: 'mm', 
            // format: [400, 400]
    });

        doc.setTextColor(0, 0, 0);
        doc.text('CapnoLearning Report', 10, 10,
            { styles: { fontSize: 20, fontWeight: 'bold' } })
        doc.setDrawColor(0, 0, 0);
        doc.line(10, 15, 600, 15);
        doc.setFontSize(10)
        if (_sessionDate) {

            doc.text(_sessionDate, 35, 25)
        }
        doc.text(_clientName, 23, 30);
        doc.text(_trainerName, 25, 35);
        if (_reportName) {
            doc.text(_reportName.replace(/<\/?[^>]+(>|$)/g, ""), 25, 40);
        }
        else {
            doc.text(_pdfname.replace(".pdf", ""), 25, 40);

        }
        doc.setFont(undefined, 'bold');
        if (_sessionDate) {
            doc.text("Session Date:", 10, 25)
        }
        doc.text("Client:", 10, 30);
        doc.text("Trainer:", 10, 35);
        doc.text("Report:", 10, 40);
        // doc.setFont(undefined, 'bold')
        doc.addImage(_image, 5, 45, 290, 150);
        doc.save(_pdfname + ".pdf");
    }


    const Viewpdfdata = (sid) => {



        fetch(API_URL + "/pdf/list/" + sid,
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
                    setLoaderModal(false)
                    let _clientName = resp.firstname + " " + resp.lastname;
                    let _trainerName = resp.data[0].firstname + " " + resp.data[0].lastname;
                    let _pdfname = resp.pdfname;
                    let _reportName = resp.reportName;
                    let _sessionDate = resp.sessionDate;
                    Viewpdf(_clientName, _trainerName, resp.result, _pdfname, _sessionDate, _reportName)

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



    const Viewpdf = (_clientName, _trainerName, _image, _pdfname, _sessionDate, _reportName) => {

        const doc = new jsPDF({
            orientation: 'l', 
            // unit: 'mm', 
            // format: [400, 400]
    });

        doc.setTextColor(0, 0, 0);
        doc.text('CapnoLearning Report', 10, 10,
            { styles: { fontSize: 20, fontWeight: 'bold' } })
        doc.setDrawColor(0, 0, 0);
        doc.line(10, 15, 600, 15);
        doc.setFontSize(10)
        if (_sessionDate) {

            doc.text(_sessionDate, 35, 25)
        }
        doc.text(_clientName, 23, 30);
        doc.text(_trainerName, 25, 35);
        if (_reportName) {
            doc.text(_reportName.replace(/<\/?[^>]+(>|$)/g, ""), 25, 40);
        }
        else {
            doc.text(_pdfname.replace(".pdf", ""), 25, 40);


        }
        doc.setFont(undefined, 'bold');
        if (_sessionDate) {
            doc.text("Session Date:", 10, 25)
        }
        doc.text("Client:", 10, 30);
        doc.text("Trainer:", 10, 35);
        doc.text("Report:", 10, 40);

        // doc.setFont(undefined, 'bold')
        doc.addImage(_image, 5, 45, 290, 150);
        // doc.output('dataurlnewwindow');
        window.open(doc.output('bloburl'))

    }


    const Singlesession = () => {


        fetch(API_URL + "/get/single/pdf/session/" + sessionid,
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
                    // console.warn("result", resp);
                    let _temp = [];
                    resp.result.map((v, i) => {

                        _temp.push({
                            report:   v.pdf_name.replace(".pdf","" ),
                            Createdate: new Date(v.added_on).toLocaleString(),
                            actions: <p><Tooltip classes={{
                                tooltip: classes.customTooltip,

                            }} title="View" placement="top"><a href="javascript:void" onClick={() => { Viewpdfdata(v.id); loaderToggleModal() }} className="downloadimg tooltip2" ><img src={preveiw} /></a></Tooltip> <Tooltip classes={{
                                tooltip: classes.customTooltip,

                            }} title="Download" placement="top"><a href='javascript:void' onClick={() => { pdfdata(v.id); loaderToggleModal() }} className="downloadimg"><img src={download} /></a></Tooltip></p>
                        })
                    })
                    setData(_temp);

                    // let len = pdfs.length;
                    //   console.warn(len);


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
        window.location.reload();
    }



    const columns = [
        {
            title: t("Report-Name"), field: "report"
        },
        {
            title: <span className="text-right">{t("Created-Date-Time")}</span>, field: "Createdate", align: "center"
        },
        {
            title: <span className="text-right">{t("Actions")}</span>, field: "actions", align: "right"
        }
    ]



    return (
        <div className="">
            <Header />

            <div className="wrp-dashbord">

                <div className="container">
                <div className="right-section2 paddingmobile">
               
                   <div className="gobpdfsessionheading">
                    <div className="back-icon-wrp">
                            <Link to="#" className="backbtn-icon" onClick={ToggleSidebar}>
                                <img src={backIcon} alt="backicon" />
                                <span>Back</span>
                            </Link>
                        </div>
                        <div className="gopdfsettion-head">
                        <h3 className="heading-mobile">Session Data Reports</h3>
                        </div>
                 
                    </div>
                    <div className="wrp-bankform">
                        <div style={{ maxWidth: '100%' }}>

                          
                                 <MaterialTable
                                columns={columns}
                                data={data}

                                options={{
                                    pageSize: data.length <=  5 ? 5: data.length > 5 && data.length <= 10 ? 10: data.length > 10 && data.length <= 20? 20 : data.length > 20 && data.length <=50?50 : data.length > 50 && data.length <= 100?100: 150,

                                    pageSizeOptions: [5, 10, 20,50,100]
                                }}
                                title="Session Data Reports"
                            />
                          
                            

                        </div>
                    </div>
                </div>
                </div>
            </div>

            <Modal isOpen={loaderModal} toggle={loaderToggleModal} className="connect-box" centered={true}>
                <ModalHeader toggle={loaderToggleModal}><span className="ml-1 roititle modal-head">Request processing...</span></ModalHeader>
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


            <div className="container-fluid mt-3">

                <div className={`sidebar2 ${isOpen == true ? 'active' : ''}`}>
                    <div className="sd-header">
                        <button className='closebutton' onClick={ToggleSidebar}><img src={crosss} className="img-close" /></button>
                    </div>

                    {
                        dataid == 2 ?
                           
                        <>

                                <Gofilter dataid={dataid} ToggleSidebar={ToggleSidebar} />

                            </>
                            :
                            ""

                    }

                </div>
                <div className={`sidebar-overlay ${isOpen == true ? 'active' : ''}`} onClick={ToggleSidebar}></div>
            </div>

        </div>
    )
}

export default Gopdfsessionreport;