import React, { Component, useEffect, useRef, useState } from 'react';
import { Link, useParams, Router } from 'react-router-dom';

import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
import { API_URL } from '../../config';
import ReactTooltip from 'react-tooltip';
import {
    Row, Col, Container, Button, ModalHeader, ModalFooter, Modal, ModalBody, Accordion,
    AccordionBody,
    AccordionHeader,
    AccordionItem,
} from "reactstrap";

import ReactExport from "react-export-excel";
// import { group } from 'd3';

import multiexportdata from '../../components/images/multiexportdata.png'
import takeshort from '../../components/images/takeshort.png'
import configgraph from '../../components/images/configgraph.png'
import sessionnote from '../../components/images/sessionnote.png'
import viewliveimg from '../../components/images/viewliveimg.png'
import zoomimg from '../../components/images/zoom.png'
import exportdata from '../../components/images/exportdata.png';
import linking from '../../components/images/linking.png';
import viewaction from '../../components/images/viewaction.png';




const ViewChartHeader = (props) => {
    const accessToken = localStorage.getItem('accessToken');
    const userType = localStorage.getItem('userType');
    const [sessions, setsessions] = useState([]);
    const [savePdfModal, setSavePdfModal] = useState(false);
    const savePdfModalToggle = () => setSavePdfModal(!savePdfModal);

    const sessionid = localStorage.getItem('selectedSession');
    const clientId = localStorage.getItem('selectedClient');
    const [action, setAction] = useState();
    const user_type = localStorage.getItem('userType');

    const [reportDetails, setReportDetails] = useState([]);
    const [records, setrecords] = useState([]);
    const [sessionDate, setsessionDate] = useState([]);
    const [clientName, setClientName] = useState([]);
    const [trainerName, setTrainerName] = useState([]);
    const [sessioninfo, setsessioninfo] = useState([]);
    const setSessionDate = props.setSessionDate;
    const [alternate, setAlternate] = useState([]);
    const [multipleData, SetMultipleData] = useState([]);
    const [zoomlinks, setZoomlinks] = useState([])
    const [livesessionsnotes, setlivesessionsnotes] = useState([]);
    const [Notesid, setNotesid] = useState()
    const group = props.group;
    const reportconfig = useRef();
    const alternateconfig = useRef();
    const { session, reportId, record, showclock } = useParams();

    const [openModal, setOpenModal] = useState(false);
    const openToggleModal = () => setOpenModal(!openModal);


    const setLinkingType = props.setLinkingType;
    const [linkT, setLinkt] = useState('');

    const [settingModal, setSetting] = useState(false);
    const settingToggleModal = () => setSetting(!settingModal);
    const [reportName, setReportName] = useState(null);
    const [pdfReportName, setPdfReportName] = useState(null);

    const [livesessionmultidataModal, setLivesessionmultidataModal] = useState(false);
    const livesessionMultidataModalToggle = () => setLivesessionmultidataModal(!livesessionmultidataModal);

    const [zoomMultidataModal, setZoomMultidataModal] = useState(false);
    const zoomMultidataModalToggle = () => setZoomMultidataModal(!zoomMultidataModal);

    const [viewlivesessionMultidataModal, setViewlivesessionMultidataModal] = useState(false);
    const viewlivesessionMultidataModalToggle = () => setViewlivesessionMultidataModal(!viewlivesessionMultidataModal);


    const [livesessionnotesModal, setLivesessionnotesModal] = useState(false);
    const livesessionnotesToggleModal = () => setLivesessionnotesModal(!livesessionnotesModal);

    const [zoomlinkModal, setZoomlinkModal] = useState(false);
    const zoomlinkToggleModal = () => setZoomlinkModal(!zoomlinkModal);

    const [nofoundliveimgModal, setNofoundliveimg] = useState(false);
    const nofoundliveimgToggleModal = () => setNofoundliveimg(!nofoundliveimgModal);


    const [exportModal, setExportModal] = useState(false);
    const exportModalToggle = () => setExportModal(!exportModal);




    const [notesModal, setNotesModal] = useState(false);
    const notesModalToggle = () => setNotesModal(!notesModal);

    const [liveNotes, setLiveNotes] = useState([]);

    const [zoomModal, setZoomModal] = useState(false);
    const zoomModalToggle = () => setZoomModal(!zoomModal);

    const [zoomRecording, setZoomRecording] = useState(null);


    const [takeNotesModal, setTakeNotesModal] = useState(false);
    const takeNotesToggle = () => setTakeNotesModal(!takeNotesModal);

    const [exportdataModal, setExportdataModal] = useState(false);
    const exportdataToggle = () => setExportdataModal(!exportdataModal);

    const [takereportNoteModel, setTakereportNoteModel] = useState(false);
    const takereportNoteToggleModel = () => setTakereportNoteModel(!takereportNoteModel);

    const [configGraphModel, setConfigGraphModel] = useState(false);
    const configGraphToggleModel = () => setConfigGraphModel(!configGraphModel);

    const [sessionNotesModel, setSessionNotesModel] = useState(false);
    const sessionNotesToggleModel = () => setSessionNotesModel(!sessionNotesModel);

    const [viewliveimgModel, setViewliveimgModel] = useState(false);
    const viewliveToggleModel = () => setViewliveimgModel(!viewliveimgModel);

    const [zoomlistModel, setZoomlistModel] = useState(false);
    const zoomToggleModel = () => setZoomlistModel(!zoomlistModel);

    const [exportdataGroupModel, setExportdataGroupModel] = useState(false);
    const exportdataGroupToggleModel = () => setExportdataGroupModel(!exportdataGroupModel);


    const [unlinkgroupModel, setUnlinkgroupModelModel] = useState(false);
    const unlinkgroupToggleModel = () => setExportdataGroupModel(!unlinkgroupModel);

    const [viewpdfpreviewModel, setViewpdfpreviewModel] = useState(false);
    const viewpdfpreviewToggleModel = () => setExportdataGroupModel(!viewpdfpreviewModel);


    const setShowActualTime = props.setShowActualTime;
    const showActualTime = props.showActualTime;

    const setShowSignalStat = props.setShowSignalStat;
    const showSignalStat = props.showSignalStat;
    const ExcelFile = ReactExport.ExcelFile;
    const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
    const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

    const userId = localStorage.getItem('user_id');

    const setSavingReportConfirmation = props.setSavingReportConfirmation;



    const setNotes = props.setNotes;
    const notes = props.notes;
    const exportExcel = props.exportExcel;
    const graphs = props.graphs;

    const signalStat = props.signalStat;
    const saveReportConfig = props.saveReportConfig;
    const setrequestProcessingModal = props.setrequestProcessingModal;
    const setrequestProcesedModal = props.setrequestProcesedModal;


    const [open, setOpen] = useState('');


    const [linkingGraphModal, setLinkingGraphModal] = useState(false)
    const linkGraphs = props.linkGraphs
    const setLinkGraphs = props.setLinkGraphs
    const linkingGraphModalToggle = () => setLinkingGraphModal(!linkingGraphModal);
    const [fileFormat, setFileFormat] = useState("csv");
    const [multiDileFormat, setMultiDileFormat] = useState("");
    const [multiSessionid, setMultiSessionid] = useState("");

    const [datafileModal, setDatafileModal] = useState(false);
    const datafileModalToggle = () => setDatafileModal(!datafileModal);



    const exportFileMulti = () => {
        setrequestProcessingModal(true);

        let route = "/get/csvfile/" + multiSessionid;
        if (multiDileFormat == 'ascii') {
            route = "/get/textfile/" + multiSessionid;
        }
        else if (multiDileFormat == "excel") {
            route = "/get/excelfile/" + multiSessionid;

        }
        fetch(API_URL + route,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': accessToken,
                },
            }
        ).then(res => res.blob())
            .then(response => {
                //Create a Blob from the PDF Stream

                let file = new Blob([response], {
                    type: "application/csv"
                });


                if (multiDileFormat == 'ascii') {
                    file = new Blob([response], {
                        type: "application/text-plain"
                    });
                }
                else if (multiDileFormat == "excel") {
                    file = new Blob([response], {
                        type: "application/xlsx"
                    });

                }





                let tempUrl = URL.createObjectURL(file);
                const aTag = window.document.createElement("a");
                aTag.href = tempUrl;
                aTag.download = 'file.csv';

                if (multiDileFormat == 'ascii') {
                    aTag.download = 'file.txt';
                }
                else if (multiDileFormat == "excel") {
                    aTag.download = 'file.xlsx';

                }

                window.document.body.appendChild(aTag);
                aTag.click();
                URL.revokeObjectURL(tempUrl);
                aTag.remove();

                setrequestProcessingModal(false);

            })

    }
    const exportFile = () => {
        setrequestProcessingModal(true);

        let route = "/get/csvfile/" + sessionid;
        if (fileFormat == 'ascii') {
            route = "/get/textfile/" + sessionid;
        }
        else if (fileFormat == "excel") {
            route = "/get/excelfile/" + sessionid;

        }
        fetch(API_URL + route,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': accessToken,
                },
            }
        ).then(res => res.blob())
            .then(response => {
                //Create a Blob from the PDF Stream

                let file = new Blob([response], {
                    type: "application/csv"
                });


                if (fileFormat == 'ascii') {
                    file = new Blob([response], {
                        type: "application/text-plain"
                    });
                }
                else if (fileFormat == "excel") {
                    file = new Blob([response], {
                        type: "application/xlsx"
                    });

                }



                let tempUrl = URL.createObjectURL(file);
                const aTag = window.document.createElement("a");
                aTag.href = tempUrl;
                aTag.download = 'file.csv';

                if (fileFormat == 'ascii') {
                    aTag.download = 'file.txt';
                }
                else if (fileFormat == "excel") {
                    aTag.download = 'file.xlsx';

                }

                window.document.body.appendChild(aTag);
                aTag.click();
                URL.revokeObjectURL(tempUrl);
                aTag.remove();

                setrequestProcessingModal(false);

            })

    }

    const toggle = (id) => {
        setMultiSessionid(id)
        if (open === id) {
            setOpen();
        } else {
            setOpen(id);
        }
    };


    const linkAllGrpahs = () => {
        setLinkGraphs(!linkGraphs)
        linkingGraphModalToggle()
    }


    useEffect(() => {
        // console.log("mydata" , signalStat);
    }, signalStat)
    useEffect(() => {
        getRcord();
        clientnameUpdate();
        getLiveNotes();
        // getAlternate() ;
        getReportDetails();



        // getZoomRecording() ; 
        // getScreenshort();

    }, []);

    useEffect(() => {
        // getAlternate() ;
        getMultiData();



    }, [])







    // get createmultidata


    const getMultiData = () => {
        fetch(API_URL + "/get/create/multipledata/" + reportId,
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
                    console.warn("result", resp);
                    SetMultipleData(resp.data)

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

    const getZoomLinkbyid = (id) => {
        setOpenModal(true)
        fetch(API_URL + "/get/zoom/link/by/" + id,
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
                    setOpenModal(false)
                    if (resp.data[0].zoom_link.length > 0) {
                        window.open(resp.data[0].zoom_link);
                    }


                });
            }
            else if (response.status == 202) {
                zoomlinkToggleModal();
                setZoomMultidataModal(false)
                setOpenModal(false)
            }
            else if (response.status == 401) {
                logout()
            }
            else {
                console.log("network error")
            }


        })
    }

    // get live session notes


    const handleliveNotes = (id) => {



        setOpenModal(true)
        let dataType = 4;

        fetch(API_URL + "/get/live/sessionimage/" + id + "/" + dataType,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': accessToken,
                },
            }
        ).then((response) => {
            if (response.status == 200) {
                setOpenModal(false)
                response.json().then((resp) => {
                    setLivesessionmultidataModal(false)
                    let _clientName = resp.firstname + " " + resp.lastname;
                    let _trainerName = resp.data[0].firstname + " " + resp.data[0].lastname;
                    let _sessionDate = resp.sessionDate;
                    let _pdfname = resp.pdfname;
                    Viewlivenote(_clientName, _trainerName, resp.dataimg, _sessionDate)

                });
            }
            else if (response.status == 202) {
                livesessionnotesToggleModal();
                setLivesessionmultidataModal(false)
                setOpenModal(false)
            }
            else if (response.status == 401) {
                logout()
            }
            else {
                alert("network error")
            }


        })




        const Viewlivenote = (_clientName, _trainerName, _notes, _sessionDate) => {
            let _notesB = _notes.length > 0 ? _notes[_notes.length - 1].sessiondata : "No note found";

            const doc = new jsPDF();
            doc.setTextColor(0, 0, 0);
            doc.text('CapnoLearning Report', 10, 10,
                { styles: { fontSize: 20, fontWeight: 'bold' } })

            doc.setDrawColor(0, 0, 0);
            doc.line(10, 15, 600, 15);
            doc.setFontSize(10)
            doc.text(_sessionDate, 35, 25)
            doc.text(_clientName, 23, 30);
            doc.text(_trainerName, 25, 35);
            doc.setFont(undefined, 'bold');
            doc.text("Session Date:", 10, 25)
            doc.text("Client:", 10, 30);
            doc.text("Trainer:", 10, 35);
            doc.setFont(undefined, 'normal');
            if (_notes.length > 0) {
                _notesB = _notes[_notes.length - 1].sessiondata.split("<br>");
                _notesB.map((v, i) => {
                    doc.text(v, 10, 52 + (i * 1));

                })

            }
            else {
                doc.text("No note found", 10, 52);

            }
            doc.setFontSize(13)
            doc.text('Live Session Notes', 10, 45, { styles: { fontSize: 13, fontWeight: 'bold' } })
            doc.line(10, 47, 55, 47);
            window.open(doc.output('bloburl'))
        }

    }



    const handleliveimages = (id) => {

        setOpenModal(true)




        let dataType = 3;
        fetch(API_URL + "/get/live/sessionimage/download/" + id + "/" + dataType,
            {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"

                },
            }
        ).then((response) => {
            if (response.status == 200) {

                response.blob()

                    .then(response => {

                        //Create a Blob from the PDF Stream

                        const file = new Blob([response], {
                            type: "application/pdf"
                        });
                        //Build a URL from the file
                        const fileURL = URL.createObjectURL(file);
                        // Open the URL on new Window
                        window.open(fileURL);
                        // download(fileURL);

                        setOpenModal(false);



                    })

            }
            else if (response.status == 202) {
                nofoundliveimgToggleModal()
                setViewlivesessionMultidataModal(false)
                setOpenModal(false)
            }
            else if (response.status == 401) {
                logout()
            }
            else {
                alert("network error")
            }


        })
    }














    const viewManual = () => {
        window.open('/manualpdf/OperatingManualP6.0-November25-2022.pdf', 'Manual', 'height=768,width=500');
    }

    // const saveScreenshot = () => {
    //     // // console.log(sessioninfo);
    //     setrequestProcessingModal(true);
    //     html2canvas(document.getElementById("chart-table")).then(function (canvas) {

    //         let session_id = session;
    //         let type = 0;
    //         let status = 1;

    //         let dataimg = canvas.toDataURL('image/png')
    //         const doc = new jsPDF();

    //         for (let pageNumber = 1; pageNumber <= doc.getNumberOfPages(); pageNumber++) {
    //             doc.setPage(pageNumber)
    //             doc.setTextColor(0, 0, 0);
    //             doc.text('CapnoLearning Report', 10, 10,
    //                 { styles: { fontSize: 20, fontWeight: 'bold' } })
    //             doc.setDrawColor(0, 0, 0);
    //             doc.line(10, 15, 600, 15);
    //             doc.setFontSize(10)
    //             if (!props.multi) {
    //                 doc.text(sessioninfo[0].name, 35, 25)
    //             }
    //             doc.text(sessioninfo[0].client_firstname + " " + sessioninfo[0].client_firstname, 23, 30);
    //             doc.text(sessioninfo[0].trainer_firstname + " " + sessioninfo[0].trainer_lastname, 25, 35);
    //             // doc.text(trainerName, 25, 35);
    //             doc.setFont(undefined, 'bold');
    //             if (!props.multi) {
    //                 doc.text("Session Date:", 10, 25)
    //             }
    //             doc.text("Client:", 10, 30);
    //             doc.text("Trainer:", 10, 35);
    //             // doc.setFont(undefined, 'bold')
    //             doc.addImage(dataimg, 5, 45, 200, 110);
    //         }

    //         setTimeout(() => {
    //             if (!props.multi) {
    //                 doc.save("PDF Report - " + sessioninfo[0].name + "-" + sessioninfo[0].client_firstname + " " + sessioninfo[0].client_lastname + ".pdf");
    //             }
    //             else {
    //                 doc.save("PDF Report - " + sessioninfo[0].client_firstname + " " + sessioninfo[0].client_lastname + ".pdf");

    //             }
    //             setrequestProcessingModal(false);
    //             // () ;
    //             setrequestProcesedModal(true);

    //         }, 5000);



    //     });

    // }


    const saveScreenshotPDFMulti = () => {
        // // console.log(sessioninfo);
        setrequestProcessingModal(true);
        html2canvas(document.getElementById("chart-table")).then(function (canvas) {

            let session_id = session;
            let type = 0;
            let status = 1;

            let dataimg = canvas.toDataURL('image/png')
            // const doc = new jsPDF();

            // for (let pageNumber = 1; pageNumber <= doc.getNumberOfPages(); pageNumber++) {
            //     doc.setPage(pageNumber)
            //     doc.setTextColor(0, 0, 0);
            //     doc.text('CapnoLearning Report', 10, 10,
            //         { styles: { fontSize: 20, fontWeight: 'bold' } })
            //     doc.setDrawColor(0, 0, 0);
            //     doc.line(10, 15, 600, 15);
            //     doc.setFontSize(10)

            //     doc.text(sessioninfo[0].name, 35, 25)
            //     doc.text(sessioninfo[0].client_firstname + " " + sessioninfo[0].client_firstname, 23, 30);
            //     doc.text(sessioninfo[0].trainer_firstname + " " + sessioninfo[0].trainer_lastname, 25, 35);
            //     // doc.text(trainerName, 25, 35);
            //     doc.setFont(undefined, 'bold');
            //     doc.text("Session Date:", 10, 25)
            //     doc.text("Client:", 10, 30);
            //     doc.text("Trainer:", 10, 35);
            //     // doc.setFont(undefined, 'bold')
            //     doc.addImage(dataimg, 5, 45, 200, 110);
            // }
            let pdf_name;

            pdf_name = pdfReportName + ".pdf";


            setTimeout(() => {

                let formData = {
                    'data': dataimg,
                    'pdf_name': pdf_name,
                    'reportId': reportId,
                    'status': status,
                    'cid': clientId
                };

                fetch(API_URL + "/save/screenshot/multi", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': accessToken,
                    },
                    body: JSON.stringify(formData),
                }).then((result) => {
                    result.json().then((resp) => {
                        setrequestProcessingModal(false);
                        // () ;
                        setrequestProcesedModal(true);

                    })
                })


            }, 5000);



        });

    }


    const saveScreenshotPDF = () => {
        // // console.log(sessioninfo);
        setrequestProcessingModal(true);
        html2canvas(document.getElementById("chart-table")).then(function (canvas) {

            let session_id = session;
            let type = 0;
            let status = 1;

            let dataimg = canvas.toDataURL('image/png')
            // const doc = new jsPDF();

            // for (let pageNumber = 1; pageNumber <= doc.getNumberOfPages(); pageNumber++) {
            //     doc.setPage(pageNumber)
            //     doc.setTextColor(0, 0, 0);
            //     doc.text('CapnoLearning Report', 10, 10,
            //         { styles: { fontSize: 20, fontWeight: 'bold' } })
            //     doc.setDrawColor(0, 0, 0);
            //     doc.line(10, 15, 600, 15);
            //     doc.setFontSize(10)

            //     doc.text(sessioninfo[0].name, 35, 25)
            //     doc.text(sessioninfo[0].client_firstname + " " + sessioninfo[0].client_firstname, 23, 30);
            //     doc.text(sessioninfo[0].trainer_firstname + " " + sessioninfo[0].trainer_lastname, 25, 35);
            //     // doc.text(trainerName, 25, 35);
            //     doc.setFont(undefined, 'bold');
            //     doc.text("Session Date:", 10, 25)
            //     doc.text("Client:", 10, 30);
            //     doc.text("Trainer:", 10, 35);
            //     // doc.setFont(undefined, 'bold')
            //     doc.addImage(dataimg, 5, 45, 200, 110);
            // }
            let pdf_name;
            if (props.multi) {
                pdf_name = pdfReportName + ".pdf";
            }
            else {
                pdf_name = sessioninfo[0].name + "-" + pdfReportName + ".pdf";
            }
            setTimeout(() => {

                let formData = {
                    'data': dataimg,
                    'session_id': session_id,
                    'pdf_name': pdf_name,
                    'reportName': reportName,
                    'status': status,
                    'type': type
                };

                fetch(API_URL + "/save/screenshot", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': accessToken,
                    },
                    body: JSON.stringify(formData),
                }).then((result) => {
                    result.json().then((resp) => {
                        setrequestProcessingModal(false);
                        // () ;
                        setrequestProcesedModal(true);

                    })
                })


            }, 5000);



        });

    }
    const saveScreenshot = () => {
        // // console.log(sessioninfo);
        setrequestProcessingModal(true);
        html2canvas(document.getElementById("chart-table")).then(function (canvas) {

            let session_id = session;
            let type = 0;
            let status = 1;

            let dataimg = canvas.toDataURL('image/png')
            const doc = new jsPDF();

            for (let pageNumber = 1; pageNumber <= doc.getNumberOfPages(); pageNumber++) {
                doc.setPage(pageNumber)
                doc.setTextColor(0, 0, 0);
                doc.text('CapnoLearning Report', 10, 10,
                    { styles: { fontSize: 20, fontWeight: 'bold' } })
                doc.setDrawColor(0, 0, 0);
                doc.line(10, 15, 600, 15);
                doc.setFontSize(10)

                if (!props.multi) {
                    doc.text(sessioninfo[0].name, 35, 25)

                }

                doc.text(sessioninfo[0].client_firstname + " " + sessioninfo[0].client_firstname, 23, 30);
                doc.text(sessioninfo[0].trainer_firstname + " " + sessioninfo[0].trainer_lastname, 25, 35);
                if (!props.multi) {
                    doc.text(reportName.replace(/<\/?[^>]+(>|$)/g, ""), 25, 40);

                }
                // doc.text(trainerName, 25, 35);
                doc.setFont(undefined, 'bold');
                if (!props.multi) {
                    doc.text("Session Date:", 10, 25)


                }
                doc.text("Client:", 10, 30);
                doc.text("Trainer:", 10, 35);
                if (!props.multi) {

                    doc.text("Report:", 10, 40);
                }
                // doc.setFont(undefined, 'bold')
                doc.addImage(dataimg, 5, 45, 200, 110);
            }

            setTimeout(() => {
                if (props.multi) {
                    doc.save(pdfReportName + ".pdf");

                }
                else {
                    doc.save(sessioninfo[0].name + "-" + pdfReportName + ".pdf");

                }

                setrequestProcessingModal(false);
                // () ;
                setrequestProcesedModal(true);

            }, 5000);



        });

    }



    const saveReport = () => {

        setSavingReportConfirmation(true);

        // // console.log("report data",props.signalConfig)

    }

    // console.log("multi", props.multi)

    // const getScreenshort = () => {
    //     fetch(API_URL + "/get/screenshort/" + session,
    //         {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'x-access-token': accessToken,
    //             },
    //         }
    //     ).then((response) => {
    //         if (response.status == 200) {
    //             response.json().then((resp) => {
    //                 setsessionDate(resp.sessionDate)
    //                 setClientName(resp.firstname + " " + resp.lastname)
    //                 setTrainerName(resp.data[0].firstname + " " + resp.data[0].lastname)

    //             });
    //         }
    //         else if (response.status == 401) {
    //             logout()
    //         }
    //         else {
    //             alert("network error")
    //         }


    //     })


    // }

    const getLiveNotes = () => {
        fetch(API_URL + "/session/data/type?session_id=" + sessionid + "&type=4",
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
                    console.warn("result", resp);
                    setLiveNotes(resp.sessions)

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


    const [signalName, setSignalName] = useState({
        pco2wave: "PCO<sub>2</sub> Waveform",
        petco2: "PetCO<sub>2</sub> History",
        bpmhistory: "Breaths/min History",
        pco2b2b: "PCO<sub>2</sub> breath to breath",
        capin: "Capnia Index",
        capnia: "Capnia Index History",
        gpmhistory: "Gasps/min History",
        aborted_expmhistory: "Aborted exhales/min History",
        bholdpmhistory: "Breath-holds/min History",
        relativevpm: "Relative Volume/per min History",
        aborted_expm: "Aborted exhales/min History",
        bhpm: "Breath-holds/min",
        b2b2hr: "Beat to beat heart rate",
        hrhistory: "Heart rate History",
        rsahistory: "RSA History",
        b2brsa: "Beat to Beat RSA",
        bpm: "Breaths/min",
        hf_avg: "Tachograph of RR",
        b2brr_wave: "Arousal",
        arousal_avg: "Parasympathetic Tone",
        tone_avg: "Parasympathetic Reserve",
        reserve_avg: "VLF Band",
        vlf_avg: "LF Band",
        lf_avg: "HF Band",
        emg1_avg: "EMG 1 Average",
        emg2_avg: "EMG 2 Average",
        emg3_avg: "EMG 3 Average",
        emg4_avg: "EMG 4 Average",
        emg1_wave: "EMG 1 Raw Wave",
        emg2_wave: "EMG 2 Raw Wave",
        emg3_wave: "EMG 3 Raw Wave",
        emg4_wave: "EMG 4 Raw Wave"
    })

    const getRcord = () => {
        fetch(API_URL + "/session/record?session_id=" + sessionid,
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
                    console.warn("result", resp);
                    setrecords(resp.records)

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




    const getAlternate = () => {
        fetch(API_URL + "/get/single/alertnate/report/config/" + config + "/" + userId + "/1",
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
                    // // console.log("result", resp);
                    setAlternate(resp.reports)

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

    const Report = (_details) => {
        let _type = (userType == 5 || userType == 6 || userType == 7) ? 3: 1;
        let url = API_URL + "/configured/report?type=" + _type;
        if (group) {
            url = API_URL + "/configured/report?type=2";
        }
        fetch(url,
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
                    setsessions(resp.sessions) 
                    console.log("det", _details);
                    resp.sessions.map((v, i) => {
                        if (v.id == _details.pid) {
                            setReportName(v.name);
                        }
                    })
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

    const clientnameUpdate = () => {
        let url = API_URL + "/session/info?session_id=" + sessionid;
        if (props.multi) {
            url = API_URL + "/client/info?cid=" + clientId;
        }
        fetch(url,
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
                    console.warn("recording", resp);
                    if (resp.session[0]) {
                        setsessioninfo(resp.session)
                        if (!props.multi) {
                            setSessionDate(resp.session[0].name)
                            setZoomRecording(resp.session[0].zoom_link)
                        }

                    }


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

    const reportconfigupdate = () => {
        let _configId = reportconfig.current.value;
        window.location.href = "/create/report/" + _configId + "/" + session + "/" + record + "/" + _configId;
    }

    const reportconfigalternateupdate = () => {
        let _configId = alternateconfig.current.value;
        window.location.href = "/create/report/" + config + "/" + session + "/" + record + "/" + _configId;

    }

    const logout = () => {
        localStorage.clear();
        window.location.reload();
    }

    const downloadNotesPDF = () => {
        setrequestProcessingModal(true);
        const doc = new jsPDF();

        for (let pageNumber = 1; pageNumber <= doc.getNumberOfPages(); pageNumber++) {
            doc.setPage(pageNumber)
            doc.setTextColor(0, 0, 0);
            doc.text('CapnoLearning Report', 10, 10,
                { styles: { fontSize: 20, fontWeight: 'bold' } })
            doc.setDrawColor(0, 0, 0);
            doc.line(10, 15, 600, 15);
            doc.setFontSize(10)

            doc.text(sessioninfo[0].name, 35, 25)
            doc.text(sessioninfo[0].client_firstname + " " + sessioninfo[0].client_firstname, 23, 30);
            doc.text(sessioninfo[0].trainer_firstname + " " + sessioninfo[0].trainer_lastname, 25, 35);
            // doc.text(trainerName, 25, 35);
            doc.setFont(undefined, 'bold');
            doc.text("Session Date:", 10, 25)
            doc.text("Client:", 10, 30);
            doc.text("Trainer:", 10, 35);
            doc.text("Live Session Notes:", 10, 45);
            doc.setFont(undefined, 'normal');

            var splitTitle = doc.splitTextToSize(document.getElementById("liveNotes").innerHTML, 270);
            var pageHeight = doc.internal.pageSize.height;

            var y = 50;
            for (var i = 0; i < splitTitle.length; i++) {
                if (y > 280) {
                    y = 10;
                    doc.addPage();
                }
                // // console.log("line" , splitTitle[i])
                doc.text(splitTitle[i].replace(/(<([^>]+)>)/gi, ""), 10, y);
                y = y + 3;
            }
        }

        doc.save("Live Session Notes - " + sessioninfo[0].name + "-" + sessioninfo[0].client_firstname + " " + sessioninfo[0].client_lastname + ".pdf");
        setrequestProcessingModal(false);
        setrequestProcesedModal(true);

    }

    const getReportDetails = () => {
        let url = API_URL + "/view/report/details?id=" + reportId;
        if (props.multi) {
            url = API_URL + "/view/multi/report/details?id=" + reportId
        }
        fetch(url,
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
                    if (resp.details[0]) {
                        setReportDetails(resp.details);
                        Report(resp.details[0]);
                        setNotes(resp.details[0].notes);
                    }
                })
            }
        })
    }


    const [confirmLeaveModal, setConfirmLeaveModal] = useState(false);
    const confirmLeaveModalToggle = () => {
        setConfirmLeaveModal(!confirmLeaveModal);
        if (action == "reportConfig") {
            reportconfig.current.value = config
        }
        if (action == "altConfig") {
            alternateconfig.current.value = currentConfig
        }
        if (action == "record") {
            reportRecord.current.value = record
        }
    }

    const confirmLeave = (v) => {
        setAction(v)
        confirmLeaveModalToggle();

    }

    const performAction = () => {
        if (action == "reportConfig") {
            reportconfigupdate();
        }
        else if (action == "altConfig") {
            reportconfigalternateupdate();
        }
        else if (action == "record") {
            reportrecordupdate();
        }
        else if (action == "dashboard") {
            window.location.href = "/";
        }

    }

    const getPreviousSessionPDF = () => {
        setrequestProcessingModal(true);

        fetch(API_URL + "/get/previous/screenshot/" + session + "/" + clientId,
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

                    if (resp.data.length > 0) {

                        const doc = new jsPDF();

                        for (let pageNumber = 1; pageNumber <= doc.getNumberOfPages(); pageNumber++) {
                            doc.setPage(pageNumber)
                            doc.setTextColor(0, 0, 0);
                            doc.text('CapnoLearning Report', 10, 10,
                                { styles: { fontSize: 20, fontWeight: 'bold' } })
                            doc.setDrawColor(0, 0, 0);
                            doc.line(10, 15, 600, 15);
                            doc.setFontSize(10)

                            doc.text(sessioninfo[0].name, 35, 25)
                            doc.text(sessioninfo[0].client_firstname + " " + sessioninfo[0].client_firstname, 23, 30);
                            doc.text(sessioninfo[0].trainer_firstname + " " + sessioninfo[0].trainer_lastname, 25, 35);
                            // doc.text(trainerName, 25, 35);
                            doc.setFont(undefined, 'bold');
                            doc.text("Session Date:", 10, 25)
                            doc.text("Client:", 10, 30);
                            doc.text("Trainer:", 10, 35);
                            // doc.setFont(undefined, 'bold')
                            doc.addImage(resp.data[0].data, 5, 45, 200, 110);
                        }
                        setrequestProcessingModal(false);
                        setrequestProcesedModal(true);
                        window.open(doc.output('bloburl'))

                        // doc.save("PDF Report - "+resp.data[0].pdf_name + "-" + sessioninfo[0].client_firstname+ " " + sessioninfo[0].client_lastname + ".pdf");

                    }
                    else {
                        setrequestProcessingModal(false);


                        alert("No PDF found for previous session")
                    }

                });
            }
            else if (response.status == 401) {
                logout()
            }
            else {
                setrequestProcessingModal(false);

                console.log("network error")
            }


        })


    }



    const ViewlivesessionImage = () => {
        setrequestProcessingModal(true);


        let dataType = 3;

        fetch(API_URL + "/get/live/sessionimage/" + sessionid + "/" + dataType,
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
                    if (resp.message == 'No Found') {
                        setrequestProcessingModal(false)
                        nofoundliveimgToggleModal(true)
                    }
                    else {
                        let _clientName = resp.firstname + " " + resp.lastname;
                        let _trainerName = resp.data[0].firstname + " " + resp.data[0].lastname;
                        let _sessionDate = resp.sessionDate;
                        let _pdfname = resp.pdfname;
                        Viewliveimg(_clientName, _trainerName, resp.result, _sessionDate)
                    }



                });
            }
            else if (response.status == 401) {
                logout()
            }
            else {
                setrequestProcessingModal(false);

                console.log("network error")
            }


        })


    }

    const Viewliveimg = (_clientName, _trainerName, _image, _sessionDate, _pdfname) => {

        const doc = new jsPDF();
        for (let pageNumber = 1; pageNumber <= doc.getNumberOfPages(); pageNumber++) {
            doc.setPage(pageNumber)
            doc.setTextColor(0, 0, 0);
            doc.text('CapnoLearning Report', 10, 10,
                { styles: { fontSize: 20, fontWeight: 'bold' } })
            doc.setDrawColor(0, 0, 0);
            doc.line(10, 15, 600, 15);
            doc.setFontSize(10)

            doc.text(_sessionDate, 35, 25)
            doc.text(_clientName, 23, 30);
            doc.text(_trainerName, 25, 35);
            doc.setFont(undefined, 'bold');
            doc.text("Session Date:", 10, 25)
            doc.text("Client:", 10, 30);
            doc.text("Trainer:", 10, 35);
            // doc.setFont(undefined, 'bold')
            doc.addImage(_image, 5, 45, 200, 110);

        }

        window.open(doc.output('bloburl'))
        setrequestProcessingModal(false);
        setrequestProcesedModal(true);
    }

    const handleLinkinChange = (e) => {
        setLinkingType(e.target.value)
        setLinkt(e.target.value)
        if (e.target.value == "") {
            setLinkGraphs(false);
        }
        else {
            setLinkGraphs(true);

        }
    }


    const moveClock = () => {
        let moveClock = (showclock == 0 ? 1 : 0);


        window.location.href = "/view/multi/report/" + moveClock + "/" + reportId;
    }

    // // console.log("excel data",signalStat)
    // signalStat.map((v,i)=>{
    // // console.log("excel data",v)

    // })

    const exportdataHandle = (event) => {

        if (event.ctrlKey || event.metaKey) {
            exportdataToggle()
        } else {
            exportModalToggle()
        }
    }

    const takereportHandle = (event) => {

        if (event.ctrlKey || event.metaKey) {
            takereportNoteToggleModel()
        } else {
            takeNotesToggle()
        }
    }

    const makepdfHandle = (event) => {

        if (event.ctrlKey || event.metaKey) {
            takereportNoteToggleModel()
        } else {
            savePdfModalToggle()
        }
    }

    const saveReportHandle = (event) => {

        if (event.ctrlKey || event.metaKey) {
            takereportNoteToggleModel()
        } else {
            saveReport()
        }
    }

    const configgraphicHandle = (event) => {

        if (event.ctrlKey || event.metaKey) {
            configGraphToggleModel()

        } else {
            settingToggleModal()
        }
    }

    const livesessionNotesHandle = (event) => {

        if (event.ctrlKey || event.metaKey) {
            sessionNotesToggleModel()

        } else {
            livesessionMultidataModalToggle()
        }
    }

    const livesessionimgHandle = (event) => {

        if (event.ctrlKey || event.metaKey) {
            viewliveToggleModel()

        } else {
            viewlivesessionMultidataModalToggle()
        }
    }

    const zoomrecordingHandle = (event) => {

        if (event.ctrlKey || event.metaKey) {

            zoomToggleModel()

        } else {
            zoomMultidataModalToggle()
        }
    }

    const viewallsignalHandle = (event) => {

        if (event.ctrlKey || event.metaKey) {
            zoomToggleModel()

        } else {
            setShowSignalStat(!showSignalStat)
        }
    }


    const viewhelpHandle = (event) => {

        if (event.ctrlKey || event.metaKey) {
            zoomToggleModel()

        } else {
            viewManual()
        }
    }

    const exportdataGroupHandle = (event) => {

        if (event.ctrlKey || event.metaKey) {
            exportdataGroupToggleModel()

        } else {
            datafileModalToggle()
        }
    }

    const unlinkgroupHandle = (event) => {

        if (event.ctrlKey || event.metaKey) {
            unlinkgroupToggleModel()

        } else {
            linkingGraphModalToggle()
        }
    }


    const grouplivesessionnoteHandle = (event) => {

        if (event.ctrlKey || event.metaKey) {
            sessionNotesToggleModel()

        } else {
            notesModalToggle()
        }
    }


    const viewpdfpreviewHandle = (event) => {

        if (event.ctrlKey || event.metaKey) {
            viewpdfpreviewToggleModel()

        } else {
            getPreviousSessionPDF()
        }
    }

    //   const groupviewLivesessionimgHandle = (event)=> {

    //     if (event.ctrlKey) {
    //         viewpdfpreviewToggleModel()

    //     } else {
    //         ViewlivesessionImage()
    //     }
    //   }

    const zoomviewgroupHandle = (event) => {

        if (event.ctrlKey || event.metaKey) {
            viewpdfpreviewToggleModel()

        } else {
            zoomModalToggle()
        }
    }


    return (
        <div className="bg-c-header">
            <ReactTooltip />
            <div className="wrp-chart-header">
                <div className="multi-chart-header-c1" style={{ width: "20%" }}>
                    <div className="wrp-action">
                        <div className="action-opt" style={{ width: "38%" }}>
                            <p>Actions Options</p>

                            <ul className='action-list'>
                                {
                                    !props.multi &&
                                    <li>
                                        {/* {
                                            sessioninfo.length > 0 &&

                                            <ExcelFile filename={"Statistics - " + sessioninfo[0].name + "-" + sessioninfo[0].client_firstname + " " + sessioninfo[0].client_lastname} element={<a href="javascript:void" onClick={exportExcel} data-tip="Export session data as Excel Sheet."   ><i class="fa fa-upload whiteicon" aria-hidden="true"></i></a>}>

                                                {
                                                    graphs.map((v, i) => {
                                                        //   // console.log("excel data",v);

                                                        return (

                                                            <ExcelSheet data={signalStat[v.signal_name] ? signalStat[v.signal_name] : []} name={v.signal_name}>
                                                                <ExcelColumn label="X" value="x" />
                                                                <ExcelColumn label="Mean" value="mean" />
                                                                <ExcelColumn label="Median" value="median" />
                                                                <ExcelColumn label="Standard Deviation" value="sd" />
                                                            </ExcelSheet>)

                                                    })
                                                }


                                            </ExcelFile>

                                        } */}

                                        <a href="javascript:void" onClick={exportdataGroupHandle} data-tip="Export data."   ><i class="fa fa-upload whiteicon" aria-hidden="true"></i></a>
                                    </li>
                                }
                                {
                                    props.multi && !group &&

                                    <li><a href="javascript:void" onClick={exportdataHandle} data-tip="Export data."   ><i class="fa fa-upload whiteicon" aria-hidden="true"></i></a></li>
                                }
                                <li><a href="javascript:void" onClick={takereportHandle} data-tip="Take report notes."><i class="fa fa-sticky-note" aria-hidden="true"></i></a></li>
                                <li><a href="javascript:void" data-tip="Make PDF copy." onClick={makepdfHandle}><i class="fa fa-file-pdf-o" aria-hidden="true"></i></a></li>
                                {/* <li><a href="javascript:void" onClick={saveReportConfig} data-tip="Save as alternate configuration."><i class="fa fa-sliders" aria-hidden="true"></i></a></li> */}
                                <li><a href="javascript:void" onClick={saveReportHandle} data-tip="Save as report."><i class="fa fa-bookmark" aria-hidden="true"></i></a></li>

                                {
                                    group &&
                                    <li><a href="javascript:void" onClick={unlinkgroupHandle} data-tip={linkGraphs ? "Unlink All Graphs" : "Link All Graphs"}><i className={linkGraphs ? "fa fa-link" : "fa fa-unlink"} aria-hidden="true"></i></a></li>
                                }
                                {
                                    props.multi &&
                                    <li><a href="javascript:void" onClick={!props.multi ? "" : configgraphicHandle} data-tip="Configure Graph Linking"><i className={linkGraphs ? "fa fa-link" : "fa fa-unlink"} aria-hidden="true"></i></a></li>
                                }
                            </ul>
                        </div>
                        <div className="view-opt" style={{ width: "55%" }}>
                            <p>Viewing Options</p>
                            <ul className='action-list'>

                                <li><a href="javascript:void" onClick={!props.multi ? grouplivesessionnoteHandle : livesessionNotesHandle} data-tip="View live session notes"><i class="fa fa-file-text" aria-hidden="true"></i></a>
                                </li>


                                {
                                    !props.multi &&
                                    <li><a href="javascript:void" onClick={viewpdfpreviewHandle} data-tip="View PDF of previous session"><i class="fa fa-step-backward" aria-hidden="true"></i></a></li>
                                }
                                <li><a href="javascript:void" onClick={!props.multi ? ViewlivesessionImage : livesessionimgHandle} data-tip="View live session images"><i class="fa fa-image" aria-hidden="true"></i></a></li>

                                <li><a href="javascript:void" onClick={!props.multi ? zoomviewgroupHandle : zoomrecordingHandle} data-tip="View zoom recording"><i class="fa fa-video-camera" aria-hidden="true"></i></a></li>


                                {
                                    !group &&
                                    <li><a href="javascript:void" onClick={viewallsignalHandle} data-tip="View all signal statistics"><i class="fa fa-table"></i></a></li>
                                }

                                <li><a href="javascript:void" onClick={viewhelpHandle} data-tip="View help document"><i class="fa fa-question-circle" aria-hidden="true"></i></a></li>

                            </ul>
                        </div>
                    </div>
                </div>
                {
                    !props.multi &&
                    <div className="chart-header-c2">
                        <div className="wrp-select-row">


                            <div className="select-row">
                                <select value={record} onChange={(e) => window.location.href = e.target.value}>
                                    <option value={'all'}   >All Records</option>

                                    {
                                        records.map((records) => {
                                            return (
                                                <option value={records.number}>{records.name}</option>
                                            )
                                        })
                                    }

                                </select>
                            </div>

                        </div>
                    </div>
                }
                {
                    !props.multi &&
                    <div className="chart-header-c3">
                        <ul className="username-list">
                            <li data-tip="Name of report">
                                {reportDetails.map((repoprtName) => {
                                    return (
                                        <a href="javascript:void"><i class="fa fa-file" aria-hidden="true"></i>{repoprtName.name}</a>
                                    )
                                }
                                )}
                            </li>
                            {
                            (user_type != 5 && user_type != 6) ?
                            <li data-tip="Name of client">
                                {sessioninfo.map((clientName) => {
                                    return (
                                        <a href="javascript:void"><i class="fa fa-user" aria-hidden="true"></i>{clientName.client_firstname} {clientName.client_lastname}</a>
                                    )
                                }
                                )}
                            </li>
                            :
                            <></>
                            }
                             {
                            (user_type != 5 && user_type != 6) ?
                            <li data-tip="Name of trainer">
                                {sessioninfo.map((trainerName) => {
                                    return (
                                        <a href="javascript:void"><i class="fa fa-user-md" aria-hidden="true"></i> {trainerName.trainer_firstname} {trainerName.trainer_lastname}</a>
                                    )
                                }
                                )}
                            </li>
                             :
                             <></>
                             }
                            <li data-tip="Session date">
                                {!props.multi && sessioninfo.map((sessionName) => {
                                    return (
                                        <a href="javascript:void"><i class="fa fa-calendar" aria-hidden="true"></i> {sessionName.name}</a>
                                    )
                                }
                                )}
                            </li>

                        </ul>
                    </div>
                }
                <div className="multi-chart-header-c4">
                    {
                        props.multi &&
                        <div>
                            <ul className="username-list">
                                <li data-tip="Name of report">
                                    {reportDetails.map((repoprtName) => {
                                        return (
                                            <a href="javascript:void"><i class="fa fa-file" aria-hidden="true"></i>{repoprtName.name}</a>
                                        )
                                    }
                                    )}
                                </li>
                                <li data-tip="Name of client">
                                    {sessioninfo.map((clientName) => {
                                        return (
                                            <a href="javascript:void"><i class="fa fa-user" aria-hidden="true"></i>{clientName.client_firstname} {clientName.client_lastname}</a>
                                        )
                                    }
                                    )}
                                </li>
                                <li data-tip="Name of trainer">
                                    {sessioninfo.map((trainerName) => {
                                        return (
                                            <a href="javascript:void"><i class="fa fa-user-md" aria-hidden="true"></i> {trainerName.trainer_firstname} {trainerName.trainer_lastname}</a>
                                        )
                                    }
                                    )}
                                </li>
                                <li data-tip="Session date">
                                    {!props.multi && sessioninfo.map((sessionName) => {
                                        return (
                                            <a href="javascript:void"><i class="fa fa-calendar" aria-hidden="true"></i> {sessionName.name}</a>
                                        )
                                    }
                                    )}
                                </li>
                                <li data-tip="Session date">
                                    <div className="dashboard-back multi-dashboard-back">
                                        <a href="javascript:void" onClick={() => confirmLeave("dashboard")}><i class="fa fa-arrow-circle-right" aria-hidden="true"></i> Dashboard</a>
                                    </div>

                                </li>
                            </ul>
                        </div>
                    }
                    {
                        !props.multi &&
                        <div className="dashboard-back">
                            <a href="javascript:void" onClick={() => confirmLeave("dashboard")}><i class="fa fa-arrow-circle-right" aria-hidden="true"></i> Dashboard</a>
                        </div>
                    }

                </div>
            </div>



            <Modal isOpen={takeNotesModal} toggle={takeNotesToggle} className="modal-box-wrp" centered={true}>
                <ModalHeader toggle={takeNotesToggle}><span className="ml-1 roititle modal-head">Take Report Notes</span></ModalHeader>
                <ModalBody>
                    <textarea rows="8" style={{ width: "100%" }} value={notes} onChange={(e) => setNotes(e.target.value)} ></textarea>

                </ModalBody>

            </Modal>

            <Modal isOpen={notesModal} toggle={notesModalToggle} className="modal-box-wrp" centered={true}>
                <ModalHeader toggle={notesModalToggle}><span className="ml-1 roititle modal-head"> Live Session Notess</span></ModalHeader>
                <ModalBody>
                    {/* dd{liveNotes.length} */}
                    <p id="liveNotes">{liveNotes && liveNotes.length > 0 ?
                        liveNotes.map((v, i) => {
                            return (
                                <p dangerouslySetInnerHTML={{ __html: v.sessiondata }}></p>
                            )
                        })
                        : <p className='text-center'>No live notes available.</p>}</p>

                    <div className='d-flex justify-content-around mt-3'>

                        {
                            liveNotes && liveNotes.length > 0 &&
                            <>
                                <button className='lightbtn w-100' onClick={notesModalToggle} >Cancel</button>
                                <button className='darktbtn w-100 ml-1' onClick={downloadNotesPDF} >Download PDF</button>
                            </>
                        }
                    </div>
                </ModalBody>

            </Modal>
            <Modal isOpen={zoomModal} toggle={zoomModalToggle} className="modal-box-wrp" centered={true}>
                <ModalHeader toggle={zoomModalToggle}><span className="ml-1 roititle modal-head">Zoom Recording</span></ModalHeader>
                <ModalBody>
                    <p className='text-center'>{zoomRecording ?
                        <a href={zoomRecording} target="_blank" >Open zoom recording in new tab.</a>
                        : "No zoom recording available."}</p>
                </ModalBody>

            </Modal>

            <Modal isOpen={confirmLeaveModal} toggle={confirmLeaveModalToggle} className="modal-box-wrp" centered={true}>
                <ModalHeader toggle={confirmLeaveModalToggle}><span className="ml-1 roititle modal-head">Please Confirm </span></ModalHeader>
                <ModalBody>
                    {/* <p className=''>Are you sure you want to leave this screen, please save your changes before leaving ?</p> */}


                    <div className='d-flex justify-content-around mt-3'>
                        {/* <button className='lightbtn w-100' onClick={confirmLeaveModalToggle} >Cancel</button> */}
                        <button className='lightbtn w-100 ml-1' onClick={performAction} >Discard & Exit</button>

                        <button className='darktbtn w-100 ml-1' onClick={() => { saveReport(); confirmLeaveModalToggle(); }} >Save & Exit</button>

                    </div>
                </ModalBody>

            </Modal>


            <Modal isOpen={livesessionmultidataModal} toggle={livesessionMultidataModalToggle} className="modal-box-wrp" centered={true}>
                <ModalHeader toggle={livesessionMultidataModalToggle}><span className="ml-1 roititle modal-head"> Live Session Notes</span></ModalHeader>
                <ModalBody>
                    <div>
                        <ul className='multidatareport-list'>

                            {
                                multipleData.length > 0 && multipleData.map((v, i) => {
                                    return (
                                        <li><span>{i + 1}</span><a href='javascript:void(0)' onClick={() => { handleliveNotes(v.id); }}>{v.name}</a></li>
                                    )
                                })
                            }

                        </ul>
                    </div>


                </ModalBody>

            </Modal>

            <Modal isOpen={zoomMultidataModal} toggle={zoomMultidataModalToggle} className="modal-box-wrp" centered={true}>
                <ModalHeader toggle={zoomMultidataModalToggle}><span className="ml-1 roititle modal-head"> Zoom Recording</span></ModalHeader>
                <ModalBody>
                    <div>
                        <ul className='multidatareport-list'>

                            {
                                multipleData.length > 0 && multipleData.map((v, i) => {
                                    return (
                                        <li> <span>{i + 1}</span> <a href="javascript:void(0)" onClick={() => { getZoomLinkbyid(v.id); }}>{v.name}</a></li>
                                    )
                                })
                            }

                        </ul>
                    </div>


                </ModalBody>

            </Modal>



            <Modal isOpen={exportModal} toggle={exportModalToggle} className="modal-box-wrp" centered={true}>
                <ModalHeader toggle={exportModalToggle}><span className="ml-1 roititle modal-head"> Export Data</span></ModalHeader>
                <ModalBody>
                    <div>
                        <ol className='multidatareport-list'>

                            {/* {
                                multipleData.length > 0 && multipleData.map((v, i) => {
                                    return (
                                        <li ><span>{i + 1}</span> <a href='javascript:void(0)' >{v.name}</a></li>
                                    )
                                })
                            } */}


                            {
                                multipleData.length > 0 && multipleData.map((v, i) => {
                                    return (
                                        <li>

                                            <Accordion flush open={open} toggle={toggle}
                                            // defaultOpen={[
                                            //     '1',

                                            // ]}
                                            // stayOpen
                                            >
                                                <AccordionItem>
                                                    <AccordionHeader targetId={v.id} className='wrp-accourdian-head'>
                                                        <div className='list-exort-content'><span>{i + 1}</span> <a href='javascript:void(0)' >{v.name}</a></div>
                                                    </AccordionHeader>
                                                    <AccordionBody accordionId={v.id} className='accourdian-body-wrp'>
                                                        <div className='excel-wrp'>


                                                            <input type="radio" onClick={() => setMultiDileFormat('csv')} checked={multiDileFormat == "csv" && multiSessionid == v.id ? true : false} className='mrt-radiobtn' name="CSV" />
                                                            <label>CSV</label>

                                                            <input onClick={() => setMultiDileFormat('excel')} checked={multiDileFormat == "excel" && multiSessionid == v.id ? true : false} type="radio" name="CSV" />
                                                            <label>EXCEL</label>
                                                            {/* <input onClick={() => setMultiDileFormat('ascii')} checked={multiDileFormat  == "ascii" && multiSessionid == v.id ? true : false} type="radio"   name="CSV" />
                                            <label>ASCII</label> */}
                                                        </div>

                                                    </AccordionBody>
                                                </AccordionItem>

                                            </Accordion>






                                        </li>
                                    )
                                })
                            }




                        </ol>
                    </div>
                    <div className='d-flex justify-content-around mt-3'>
                        <button className='lightbtn w-100' onClick={exportModalToggle} >Cancel</button>


                        <button className='darktbtn w-100 ml-1' onClick={exportFileMulti} >Download</button>

                    </div>

                </ModalBody>

            </Modal>

            <Modal isOpen={viewlivesessionMultidataModal} toggle={viewlivesessionMultidataModalToggle} className="modal-box-wrp" centered={true}>
                <ModalHeader toggle={viewlivesessionMultidataModalToggle}><span className="ml-1 roititle modal-head"> View Live Session images</span></ModalHeader>
                <ModalBody>
                    <div>
                        <ul className='multidatareport-list'>

                            {
                                multipleData.length > 0 && multipleData.map((v, i) => {
                                    return (
                                        <li > <span>{i + 1}</span> <a href='javascript:void(0)' onClick={() => { handleliveimages(v.id); }}>{v.name}</a></li>
                                    )
                                })
                            }

                        </ul>
                    </div>


                </ModalBody>

            </Modal>
            <Modal isOpen={savePdfModal} toggle={savePdfModalToggle} className="modal-box-wrp" centered={true}>
                <ModalHeader toggle={savePdfModalToggle}><span className="ml-1 roititle modal-head"> PDF Report</span></ModalHeader>
                <ModalBody>
                    <p className=''>Please enter the name of PDF you want to save.</p>
                    <div class="input-group mb-3">
                        {
                            !props.multi &&
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1">{sessioninfo[0] ? sessioninfo[0].name : ""}</span>
                            </div>

                        }
                        <input type="text" class="form-control" value={pdfReportName} onChange={(e) => setPdfReportName(e.target.value)} placeholder="Report Name" aria-label="Report Name" aria-describedby="basic-addon1" />
                    </div>

                    <div className='d-flex justify-content-around mt-3'>
                        {
                            session != "54322" &&
                            <button className='lightbtn w-100' onClick={props.multi ? saveScreenshotPDFMulti : saveScreenshotPDF} >Save PDF</button>

                        }

                        <button className='darktbtn w-100 ml-1' onClick={saveScreenshot} >Download PDF</button>

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


            <Modal isOpen={livesessionnotesModal} toggle={livesessionnotesToggleModal} className="connect-box" centered={true}>
                <ModalHeader toggle={livesessionnotesToggleModal}><span className="ml-1 roititle modal-head">Live Session Notes</span></ModalHeader>
                <ModalBody>
                    <p className='text-center'>No live session notes available.</p>

                </ModalBody>

            </Modal>

            <Modal isOpen={zoomlinkModal} toggle={zoomlinkToggleModal} className="connect-box" centered={true}>
                <ModalHeader toggle={zoomlinkToggleModal}><span className="ml-1 roititle modal-head"> Zoom Recording</span></ModalHeader>
                <ModalBody>
                    <p className='text-center'>No zoom link available.</p>

                </ModalBody>

            </Modal>

            <Modal isOpen={nofoundliveimgModal} toggle={nofoundliveimgToggleModal} className="connect-box" centered={true}>
                <ModalHeader toggle={nofoundliveimgToggleModal}><span className="ml-1 roititle modal-head"> View Live Session images</span></ModalHeader>
                <ModalBody>
                    <p className='text-center'>No live session images available. </p>

                </ModalBody>

            </Modal>


            <Modal isOpen={linkingGraphModal} toggle={linkingGraphModalToggle} className="modal-box-wrp" centered={true}>
                <ModalHeader toggle={linkingGraphModalToggle}><span className="ml-1 roititle modal-head"> Confirm {linkGraphs ? "unlinking" : "linking"} of Graphs</span></ModalHeader>
                <ModalBody>
                    <p className=''>Do you really wish to {linkGraphs ? "unlink" : "link"} all the graphs ? </p>


                    <div className='d-flex justify-content-around mt-3'>
                        <button className='lightbtn w-100' onClick={linkAllGrpahs} >Yes</button>

                        <button className='darktbtn w-100 ml-1' onClick={linkingGraphModalToggle} >NO</button>

                    </div>
                </ModalBody>

            </Modal>

            <Modal isOpen={settingModal} toggle={settingToggleModal} className="connect-box" centered={true}>
                <ModalHeader toggle={settingToggleModal}><span className="ml-1 roititle modal-head">Configure Graph Linking</span></ModalHeader>
                <ModalBody>
                    <div className='wrp-select-setting'>
                        <div className='label-setting'>
                            <p>Choose Linking Type</p>
                        </div>
                        <div className='select-setting'>
                            <select value={linkT} onChange={handleLinkinChange}>
                                <option value="">No Linking</option>
                                <option value="1">Session by Session</option>
                                <option value="2">Signal by Signal</option>
                                <option value="3">Link All Signals & Sessions</option>
                            </select>
                        </div>
                    </div>

                </ModalBody>

            </Modal>


            <Modal isOpen={datafileModal} toggle={datafileModalToggle} className="modal-box-wrp" centered={true}>
                <ModalHeader toggle={datafileModalToggle}><span className="ml-1 roititle modal-head">Data File Format</span></ModalHeader>
                <ModalBody>
                    <ul className='configure-list'>

                        <li>
                            <div className='datafileformat-wrp'>
                                <div className='datafileformat-child1'>
                                    <p>Choose Data File Format:</p>
                                </div>
                                <div className='datafileformat-child2'>

                                    <input type="radio" onClick={() => setFileFormat('csv')} checked={fileFormat == "csv" ? true : false} className='radio-mrl' name="CSV" />
                                    <span>CSV</span>
                                    <input onClick={() => setFileFormat('excel')} checked={fileFormat == "excel" ? true : false} type="radio" className='radio-mrl' name="CSV" />
                                    <span>EXCEL</span>
                                    {/* <input onClick={() => setFileFormat('ascii')} checked={fileFormat == "ascii" ? true : false} type="radio" className='radio-mrl' name="CSV" />
                                            <span>ASCII</span> */}
                                </div>
                            </div>
                            {/* <div className='datafileformat-wrp'>

                                        <div className='datafileformat-child1'>
                                            <p>Choose Signals:</p>
                                        </div>
                                        <div className='datafileformat-child2'>
                                            {
                                                signalName.map((v,i) => {
                                                    return(
                                                        <p>                                                        
                                                        <input type="checkbox" value={i}  checked className='radio-mrl mr-2' name="CSV" />
                                                        <span dangerouslySetInnerHTML={{__html: " "+v[1]}}></span>
                                                        </p>
                                                    )
                                                })
                                            }
                                         
                                        </div>

                                    </div> */}
                        </li>



                    </ul>

                    <div className='d-flex justify-content-around mt-3'>
                        <button className='lightbtn w-100' onClick={datafileModalToggle} >Cancel</button>


                        <button className='darktbtn w-100 ml-1' onClick={exportFile} >Download</button>

                    </div>
                </ModalBody>

            </Modal>



            <Modal isOpen={exportdataModal} toggle={exportdataToggle} className="modal-box-wrpaction" centered={true}>
                <ModalHeader toggle={exportdataToggle}><span className="ml-1 roititle modal-head">Export Data</span></ModalHeader>
                <ModalBody>
                    <div className='imgexportdata'><img src={multiexportdata} /></div>
                </ModalBody>

            </Modal>

            <Modal isOpen={takereportNoteModel} toggle={takereportNoteToggleModel} className="modal-box-wrpaction" centered={true}>
                <ModalHeader toggle={takereportNoteToggleModel}><span className="ml-1 roititle modal-head">Actions Options</span></ModalHeader>
                <ModalBody>
                    <div className='imgexportdata'><img src={takeshort} /></div>
                </ModalBody>

            </Modal>

            <Modal isOpen={configGraphModel} toggle={configGraphToggleModel} className="modal-box-wrpaction" centered={true}>
                <ModalHeader toggle={configGraphToggleModel}><span className="ml-1 roititle modal-head">Configure Graph Linking</span></ModalHeader>
                <ModalBody>
                    <div className='imgexportdata'><img src={configgraph} /></div>
                </ModalBody>

            </Modal>

            <Modal isOpen={sessionNotesModel} toggle={sessionNotesToggleModel} className="modal-box-wrpaction" centered={true}>
                <ModalHeader toggle={sessionNotesToggleModel}><span className="ml-1 roititle modal-head">view Live Session Notes</span></ModalHeader>
                <ModalBody>
                    <div className='imgexportdata'><img src={sessionnote} /></div>
                </ModalBody>

            </Modal>

            <Modal isOpen={viewliveimgModel} toggle={viewliveToggleModel} className="modal-box-wrpaction" centered={true}>
                <ModalHeader toggle={viewliveToggleModel}><span className="ml-1 roititle modal-head">view Live Session Images</span></ModalHeader>
                <ModalBody>
                    <div className='imgexportdata'><img src={viewliveimg} /></div>
                </ModalBody>

            </Modal>

            <Modal isOpen={zoomlistModel} toggle={zoomToggleModel} className="modal-box-wrpaction" centered={true}>
                <ModalHeader toggle={zoomToggleModel}><span className="ml-1 roititle modal-head">Actions Options</span></ModalHeader>
                <ModalBody>
                    <div className='imgexportdata'><img src={zoomimg} /></div>
                </ModalBody>

            </Modal>


            <Modal isOpen={exportdataGroupModel} toggle={exportdataGroupToggleModel} className="modal-box-wrpaction" centered={true}>
                <ModalHeader toggle={exportdataGroupToggleModel}><span className="ml-1 roititle modal-head">Actions Options</span></ModalHeader>
                <ModalBody>
                    <div className='imgexportdata'><img src={exportdata} /></div>
                </ModalBody>

            </Modal>


            <Modal isOpen={unlinkgroupModel} toggle={unlinkgroupToggleModel} className="modal-box-wrpaction" centered={true}>
                <ModalHeader toggle={unlinkgroupToggleModel}><span className="ml-1 roititle modal-head">Unlink All Graphs</span></ModalHeader>
                <ModalBody>
                    <div className='imgexportdata'><img src={linking} /></div>
                </ModalBody>

            </Modal>

            <Modal isOpen={viewpdfpreviewModel} toggle={viewpdfpreviewToggleModel} className="modal-box-wrpaction" centered={true}>
                <ModalHeader toggle={viewpdfpreviewToggleModel}><span className="ml-1 roititle modal-head">Viewing Options</span></ModalHeader>
                <ModalBody>
                    <div className='imgexportdata'><img src={viewaction} /></div>
                </ModalBody>

            </Modal>






        </div>
    )
}

export default ViewChartHeader;

