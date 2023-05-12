import React, { Component, useEffect, useRef, useState } from 'react';
import { Link, useParams, Router } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
import { API_URL } from '../../config';
import ReactTooltip from 'react-tooltip';
import { Row, Col, Container, Button, ModalHeader, ModalFooter, Modal, ModalBody } from "reactstrap";
import ReactExport from "react-export-excel";
import { csv } from 'd3';
import exportdata from '../../components/images/exportdata.png';
import viewaction from '../../components/images/viewaction.png';
import Audiocomponent from '../../components/pages/viewlive/Audiocomponent';
import { Tooltip } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import Draggable from 'react-draggable';
import validator from 'validator';

import mouseseting from '../../components/images/mouseseting.png'


const useStyles = makeStyles(() => ({
    customTooltip: {
        backgroundColor: "black",
        fontSize: "13px",

    }
}));


const ChartHeader = (props) => {
    const accessToken = localStorage.getItem('accessToken');
    const userType = localStorage.getItem('userType');

    const classes = useStyles();

    const zoomEnabled = props.zoomEnabled;
    const setZoomEnabled = props.setZoomEnabled;
    const [pdfnameerror, setPdfnameerror] = useState(false)

    const dragMode = props.dragMode;
    const setDragMode = props.setDragMode;


    const [mousesetingModal, setMousesetingModal] = useState(false);
    const mousesetingtoggleModal = () => setMousesetingModal(!mousesetingModal);



    const [mouseSetingModal, setMouseSetingModal] = useState(false);
    const toggleMouseSetingModal = () => setMouseSetingModal(!mouseSetingModal);


    const M_module = localStorage.getItem('m_module');
    const [sessions, setsessions] = useState([]);
    const [pdfNote, setPdfNote] = useState(true);

    const sessionid = localStorage.getItem('selectedSession');
    const clientId = localStorage.getItem('selectedClient');
    const user_type = localStorage.getItem('userType');
    const [action, setAction] = useState();
    const [linkingGraphModal, setLinkingGraphModal] = useState(false)
    const linkGraphs = props.linkGraphs
    const setLinkGraphs = props.setLinkGraphs
    const setIsOpen = props.setIsOpen
    const linkingGraphModalToggle = () => setLinkingGraphModal(!linkingGraphModal);
    const [records, setrecords] = useState([]);
    const [sessionDate, setsessionDate] = useState([]);
    const [clientName, setClientName] = useState([]);
    const [trainerName, setTrainerName] = useState([]);
    const [sessioninfo, setsessioninfo] = useState([]);
    const setSessionDate = props.setSessionDate;
    const [alternate, setAlternate] = useState([]);
    const [pdfReportName, setPdfReportName] = useState(null);
    const [reportName, setReportName] = useState(null);
    const [audiodata, setAudiodata] = useState([])


    const [emgAvg, setEmgAvg] = useState(false);
    const [emgRaw, setEmgRaw] = useState(false);

    const group = props.group;
    const reportconfig = useRef();
    const alternateconfig = useRef();
    const reportRecord = useRef();


    const { config, session, record, currentConfig, showclock } = useParams();
    const [notesModal, setNotesModal] = useState(false);
    const notesModalToggle = () => setNotesModal(!notesModal);

    const [liveNotes, setLiveNotes] = useState(null);

    const [zoomModal, setZoomModal] = useState(false);
    const zoomModalToggle = () => setZoomModal(!zoomModal);


    const [savePdfModal, setSavePdfModal] = useState(false);
    const savePdfModalToggle = () => setSavePdfModal(!savePdfModal);


    const [nofoundliveimgModal, setNofoundliveimg] = useState(false);
    const nofoundliveimgToggleModal = () => setNofoundliveimg(!nofoundliveimgModal);

    const [pressdatafileModal, setPressdatafileModal] = useState(false);
    const pressdatafileModalToggle = () => setPressdatafileModal(!pressdatafileModal);

    const [viewactionModal, setViewactionModal] = useState(false);
    const viewactionModalToggle = () => setViewactionModal(!viewactionModal);
    const [audiomodal, setAudiomodal] = useState(false);
    const audiomodaltoggleModal = () => setAudiomodal(!audiomodal);


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

    const [zoomRecording, setZoomRecording] = useState(null);
    const [fileFormat, setFileFormat] = useState("csv");


    const [takeNotesModal, setTakeNotesModal] = useState(false);
    const takeNotesToggle = () => setTakeNotesModal(!takeNotesModal);


    const [datafileModal, setDatafileModal] = useState(false);
    const datafileModalToggle = () => setDatafileModal(!datafileModal);

    const showActualTime = props.showActualTime;

    const setShowSignalStat = props.setShowSignalStat;
    const showSignalStat = props.showSignalStat;
    // const ExcelFile = ReactExport.ExcelFile;
    // const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
    // const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

    const userId = localStorage.getItem('user_id');

    const setSavingReportConfirmation = props.setSavingReportConfirmation;


    const [signalName, setSignalName] = useState([
        ["pco2wave", "Raw PCO<sub>2</sub>"],
        ["petco2", "PetCO<sub>2</sub> History"],
        ["bpmhistory", "Breaths/min History"],
        ["pco2b2b", "PCO<sub>2</sub> breath to breath"],
        ["capin", "Capnia Index"],
        ["capnia", "Capnia Index History"],
        ["gpmhistory", "Gasps/min History"],
        ["aborted_expmhistory", "Aborted exhales/min History"],
        ["bholdpmhistory", "Breath-holds/min History"],
        ["relativevpm", "Relative Volume/per min History"],
        ["aborted_expm", "Aborted exhales/min History"],
        ["bhpm", "Breath-holds/min"],
        ["b2b2hr", "Beat to Beat heart rate"],
        ["hrhistory", "Heart rate History"],
        ["rsahistory", "RSA History"],
        ["b2brsa", "Beat to Beat RSA"],
        ["bpm", "Breaths/min"],
        ["hf_avg", "HF Band"],
        ["b2brr_wave", "Tachograph of RR"],
        ["arousal_avg", "Activation"],
        ["tone_avg", "Parasympathetic Tone"],
        ["reserve_avg", "Parasympathetic Reserve"],
        ["vlf_avg", "VLF Band"],
        ["lf_avg", "LF Band"],
        ["emg1_avg", "EMG 1"],
        ["emg2_avg", "EMG 2"],
        ["emg3_avg", "EMG 3"],
        ["emg4_avg", "EMG 4"],
        ["emg1_wave", "EMG 1 Raw Wave"],
        ["emg2_wave", "EMG 2 Raw Wave"],
        ["emg3_wave", "EMG 3 Raw Wave"],
        ["emg4_wave", "EMG 4 Raw Wave"]
    ])


    const setNotes = props.setNotes;
    const notes = props.notes;
    // const exportExcel = props.exportExcel;
    const graphs = props.graphs;
    const showHeader = props.showHeader;

    const signalStat = props.signalStat;
    const saveReportConfig = props.saveReportConfig;
    const setrequestProcessingModal = props.setrequestProcessingModal;
    const setrequestProcesedModal = props.setrequestProcesedModal;
    useEffect(() => {
        // // console.log("mydata" , signalStat);
    }, signalStat)
    useEffect(() => {
        Report();
        getRcord();
        clientnameUpdate();
        getLiveNotes();
        getAlternate();



        // getZoomRecording() ; 
        // getScreenshort();

    }, []);

    useEffect(() => {
        // getAlternate() ;

    })



    const handleSelection = () => {
        if (dragMode == 'pan') {
            setDragMode('zoom')
        }
        else {
            setDragMode('pan')
        }
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


    const viewManual = () => {
        window.open('/manualpdf/OperatingManualP6.0-November25-2022.pdf', 'Manual', 'height=768,width=500');
    }


    const getCsv = () => {
        fetch(API_URL + "/session/data?session_id=" + sessionid + "&signal_name=emg3_wave",
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
                    if (resp.sessions[0]) {
                        // setCsvFile(resp.sessions[0].sessiondata)
                        getData(resp.sessions[0].sessiondata, "raw")
                    }


                });
            }
            else if (response.status == 401) {
                logout()
            }
            else {
                alert("network error")
            }
        })


        fetch(API_URL + "/session/data?session_id=" + sessionid + "&signal_name=emg1_avg",
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
                    if (resp.sessions[0]) {
                        // setCsvFile(resp.sessions[0].sessiondata)
                        getData(resp.sessions[0].sessiondata, "avg")
                    }


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


    async function getData(_csvFile, _stat) {


        //   // console.log(userTimeOffset);
        csv('//capno-data.s3.amazonaws.com/' + _csvFile).then(data => {
            if (data.length > 2) {
                if (_stat == 'avg') {
                    setEmgAvg(true);
                }
                else if (_stat == 'raw') {
                    setEmgRaw(true)
                }
            }
        })
    }

  const handlepdfname = (e)=>{
  
    
    setPdfReportName(validator.trim(e.target.value))

    let valpdfinput = validator.trim(e.target.value)

    if(valpdfinput == null){
        setPdfnameerror(true)
    }else{
        setPdfnameerror(false)
    }

  }

    const saveScreenshotPDF = () => {

        if (pdfReportName == null || pdfReportName.length == 0 ) {
            setPdfnameerror(true)
           
            return false;
        }
       
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
            let pdf_name = sessioninfo[0].name + "-" + pdfReportName + ".pdf";
            setTimeout(() => {

                let formData = {
                    'data': dataimg,
                    'session_id': session_id,
                    'pdf_name': pdf_name,
                    'reportName': reportName,
                    'status': status,
                    'type': type,
                    'notes': pdfNote ? notes : null
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
                        performAction()
                    })
                })


            }, 5000);



        });

    }
    const saveScreenshot = () => {
        // // console.log(sessioninfo);
        if (pdfReportName == null || pdfReportName.length == 0) {
            setPdfnameerror(true)
           
            return false;
        }
        setrequestProcessingModal(true);
        html2canvas(document.getElementById("chart-table")).then(function (canvas) {

            let session_id = session;
            let type = 0;
            let status = 1;

            let dataimg = canvas.toDataURL('image/png')
            const doc = new jsPDF({
            orientation: 'l', 
            // unit: 'mm', 
            // format: [400, 400]
    });

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
                doc.text(reportName.replace(/<\/?[^>]+(>|$)/g, ""), 25, 40);
                // doc.text(trainerName, 25, 35);
                doc.setFont(undefined, 'bold');
                doc.text("Session Date:", 10, 25)
                doc.text("Client:", 10, 30);
                doc.text("Trainer:", 10, 35);
                doc.text("Report:", 10, 40);
                // doc.setFont(undefined, 'bold')
                doc.addImage(dataimg, 5, 45, 290, 150);
    
            }

            setTimeout(() => {
                doc.save(sessioninfo[0].name + "-" + pdfReportName + ".pdf");
                setrequestProcessingModal(false);
                // () ;
                setrequestProcesedModal(true);
                performAction()

            }, 5000);



        });

    }

    const saveReport = () => {

        if (userType == 5 || userType == 6) {
            savePdfModalToggle()
        }
        else {
            setSavingReportConfirmation(true);
        }

        // // console.log("report data",props.signalConfig)

    }



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
                alert("network error")
            }


        })
    }



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
                alert("network error")
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
                alert("network error")
            }


        })
    }

    const Report = () => {


        let _type = (userType == 5 || userType == 6 || userType == 7) ? 3 : 1;
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
                    getCsv()
                    resp.sessions.map((v, i) => {
                        if (v.id == config) {
                            setReportName(v.name);
                        }
                    })
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

    const clientnameUpdate = () => {
        fetch(API_URL + "/session/info?session_id=" + sessionid,
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
                    setsessioninfo(resp.session)
                    setSessionDate(resp.session[0].name)
                    setZoomRecording(resp.session[0].zoom_link)

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


    const moveClock = () => {
        let moveClock = (showclock == 0 ? 1 : 0);
        let config = reportconfig.current.value;

        window.location.href = "/create/report/" + moveClock + "/" + config + "/" + session + "/" + record + "/" + config;
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
            if (userType == 5 || userType == 6) {
                window.location.href = "/go/dashboard";

            }
            else {
                window.location.href = "/dashboard";
            }
        }

    }

    const reportconfigupdate = () => {

        let _configId = reportconfig.current.value;
        if (group) {
            window.location.href = "/create/group/report/" + showclock + "/" + _configId + "/" + session + "/all/" + _configId;

        }
        else {
            window.location.href = "/create/report/" + showclock + "/" + _configId + "/" + session + "/all/" + _configId;

        }
    }

    const reportconfigalternateupdate = () => {
        let _configId = alternateconfig.current.value;
        if (group) {
            window.location.href = "/create/group/report/" + showclock + "/" + config + "/" + session + "/" + record + "/" + _configId;
        }
        else {
            window.location.href = "/create/report/" + showclock + "/" + config + "/" + session + "/" + record + "/" + _configId;

        }

    }
    const reportrecordupdate = () => {
        let _configId = reportconfig.current.value;
        let _reportRecord = reportRecord.current.value;
        if (group) {
            window.location.href = "/create/group/report/" + showclock + "/" + _configId + "/" + session + "/" + _reportRecord + "/" + _configId;
        }
        else {
            window.location.href = "/create/report/" + showclock + "/" + _configId + "/" + session + "/" + _reportRecord + "/" + currentConfig;

        }

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

    const viewNotesPDF = () => {
        setrequestProcessingModal(true);


        let dataType = 4;

        fetch(API_URL + "/get/live/session/notes/" + sessionid + "/" + dataType,
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

                const file = new Blob([response], {
                    type: "application/pdf"
                });
                //Build a URL from the file
                const fileURL = URL.createObjectURL(file);
                // Open the URL on new Window
                window.open(fileURL);
                setrequestProcessingModal(false);

                // download(fileURL);

            })

    }

    const showLinkingConfirm = () => {
        linkingGraphModalToggle()
    }

    const viewNotesPDFOld = () => {
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

        window.open(doc.output('bloburl'))

        // doc.output("Live Session Notes - "+sessioninfo[0].name + "-" + sessioninfo[0].client_firstname+ " " + sessioninfo[0].client_lastname + ".pdf");
        setrequestProcessingModal(false);
        setrequestProcesedModal(true);

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
            if (response.success) {
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

            else {
                setrequestProcessingModal(false);
                alert("No PDF found for previous session")

            }


        })


    }


    const linkAllGrpahs = () => {
        setLinkGraphs(!linkGraphs)
        linkingGraphModalToggle()
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

                        let dataType = 3;

                        fetch(API_URL + "/get/live/sessionimage/download/" + sessionid + "/" + dataType,
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

                                const file = new Blob([response], {
                                    type: "application/pdf"
                                });
                                //Build a URL from the file
                                const fileURL = URL.createObjectURL(file);
                                // Open the URL on new Window
                                window.open(fileURL);
                                setrequestProcessingModal(false);

                                // download(fileURL);

                            })
                    }



                });
            }
            else if (response.status == 401) {
                logout()
            }
            else {
                setrequestProcessingModal(false);


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
            _image.map((v, i) => {
                doc.addImage(v.sessiondata, 5, 45, 200, 110);
                doc.addPage();
            })

        }

        window.open(doc.output('bloburl'))
        setrequestProcessingModal(false);
        setrequestProcesedModal(true);
    }

    // // console.log("excel data",signalStat)
    // signalStat.map((v,i)=>{
    // // console.log("excel data",v)

    // })

    const pressdatafileformat = (event) => {
        setIsOpen(false);
        if (event.ctrlKey || event.metaKey) {
            pressdatafileModalToggle()
        } else {
            datafileModalToggle()
        }
    }

    const takereportNote = (event) => {

        if (event.ctrlKey || event.metaKey) {
            pressdatafileModalToggle()
        } else {
            takeNotesToggle()
        }
    }

    const makepdfcopy = (event) => {
        setIsOpen(false);

        if (event.ctrlKey || event.metaKey) {
            pressdatafileModalToggle()
        } else {
            savePdfModalToggle()
        }
    }

    const savealtconfig = (event) => {


        if (event.ctrlKey || event.metaKey) {
            pressdatafileModalToggle()
        } else {
            saveReportConfig()
        }
    }

    const savereportaction = (event) => {


        if (event.ctrlKey || event.metaKey) {
            pressdatafileModalToggle()
        } else {
            saveReport()
        }
    }

    const viewlivesessionNote = (event) => {


        if (event.ctrlKey || event.metaKey) {
            viewactionModalToggle()
        } else {
            notesModalToggle()
        }
    }

    const viewlivesessionImg = (event) => {


        if (event.ctrlKey || event.metaKey) {
            viewactionModalToggle()
        } else {
            ViewlivesessionImage()
        }
    }

    const zoomviewaction = (event) => {


        if (event.ctrlKey || event.metaKey) {
            viewactionModalToggle()
        } else {
            zoomModalToggle()
        }
    }

    const previewpdfsession = (event) => {

        if (event.ctrlKey || event.metaKey) {
            viewactionModalToggle()
        } else {
            getPreviousSessionPDF()
        }
    }

    const togglereports = (event) => {


        if (event.ctrlKey || event.metaKey) {
            viewactionModalToggle()
        } else {
            setShowSignalStat(!showSignalStat)
        }
    }

    const switchfileformat = (event) => {


        if (event.ctrlKey || event.metaKey) {
            viewactionModalToggle()
        } else {
            moveClock()
        }
    }

    const usermanul = (event) => {


        if (event.ctrlKey || event.metaKey) {
            viewactionModalToggle()
        } else {
            viewManual()
        }
    }


    const unlinkHandle = (event) => {


        if (event.ctrlKey || event.metaKey) {
            pressdatafileModalToggle()
        } else {
            linkingGraphModalToggle()
        }
    }

    const mousesettingHandle = (event) => {

        if (event.ctrlKey || event.metaKey) {
            mousesetingtoggleModal()
        } else {
            toggleMouseSetingModal()
        }
    }


    const DownloadlivesessionAudionote = () => {

        audiomodaltoggleModal()

        let dataType = 5;

        fetch(API_URL + "/get/live/session/audio/download/" + sessionid + "/" + dataType,
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
                    setAudiodata(resp.data);

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



    return (
        <div className="bg-c-header">

            <div className="wrp-chart-header">
                <div className="chart-header-c1" style={{ width: "25%" }}>
                    <div className="wrp-action">
                        <div className="action-opt" style={{ width: "40%" }}>
                            <p>Action Options</p>
                            <ul className={(userType == 5 || userType == 6) ? "action-list minsapce" : "action-list"} >

                                {



                                    session != "54322" &&
                                        (userType == 5 || userType == 6) ? "" : <Tooltip arrow classes={{
                                            tooltip: classes.customTooltip,

                                        }} title={"Save Report."}><li><a href="javascript:void" onClick={savereportaction} data-tip="Save Report."><i class="fa fa-bookmark" aria-hidden="true"></i></a></li></Tooltip>


                                }
                                <Tooltip arrow classes={{
                                    tooltip: classes.customTooltip,

                                }} title={(userType == 5 || userType == 6) ? "Save PDF Report" : "Make PDF Copy."}><li><a href="javascript:void" id="pdfbutton" data-tip={(userType == 5 || userType == 6) ? "Save Report" : "Make PDF Copy."} onClick={makepdfcopy}><i class="fa fa-file-pdf-o" aria-hidden="true"></i></a></li>
                                </Tooltip>

                                <Tooltip arrow classes={{
                                    tooltip: classes.customTooltip,

                                }} title={"Take Report Notes."}><li><a href="javascript:void" onClick={takereportNote} data-tip="Take Report Notes."><i class="fa fa-sticky-note" aria-hidden="true"></i></a></li>
                                </Tooltip>
                                <Tooltip arrow classes={{
                                    tooltip: classes.customTooltip,

                                }} title="Mouse Settings" ><li data-tip="Mouse Settings"  ><a href="javascript:void" onClick={mousesettingHandle}><i class="fa fa-mouse-pointer" aria-hidden="true"></i></a></li></Tooltip>
                                {
                                    group &&
                                    <Tooltip arrow classes={{
                                        tooltip: classes.customTooltip,

                                    }} title={linkGraphs ? "Unlink All Graphs" : "Link All Graphs"}><li><a href="javascript:void" onClick={unlinkHandle} data-tip={linkGraphs ? "Unlink All Graphs" : "Link All Graphs"}><i className={linkGraphs ? "fa fa-link" : "fa fa-unlink"} aria-hidden="true"></i></a></li>
                                    </Tooltip>

                                }
                                {
                                    !group && session != "54322" && userType != 5 && userType != 6 &&
                                    <Tooltip arrow classes={{
                                        tooltip: classes.customTooltip,

                                    }} title={"Save Alt Config."}><li><a href="javascript:void" onClick={savealtconfig} data-tip="Save Alt Config."><i class="fa fa-sliders" aria-hidden="true"></i></a></li>
                                    </Tooltip>

                                }

                                {
                                    sessioninfo.length > 0 &&
                                    <Tooltip arrow classes={{
                                        tooltip: classes.customTooltip,

                                    }} title="Export Data." ><li>

                                            <a href="javascript:void" onClick={pressdatafileformat} data-tip="Export Data."   ><i class="fa fa-upload" aria-hidden="true"></i></a>

                                        </li>
                                    </Tooltip>

                                }
                            </ul>
                        </div>
                        <div className="view-opt" style={{ width: "65%" }}>
                            <p>Viewing Options</p>
                            <ul className='action-list'>
                                <Tooltip arrow classes={{
                                    tooltip: classes.customTooltip,

                                }} title={"View Live Session Notes"}><li><a href="javascript:void" onClick={viewlivesessionNote} data-tip="View Live Session Notes"><i class="fa fa-file-text" aria-hidden="true"></i></a>
                                    </li></Tooltip>

                                <Tooltip arrow classes={{
                                    tooltip: classes.customTooltip,

                                }} title={"View Live Session Images"}><li><a href="javascript:void" onClick={viewlivesessionImg} data-tip="View Live Session Images"><i class="fa fa-image" aria-hidden="true"></i></a></li></Tooltip>

                                <Tooltip arrow classes={{
                                    tooltip: classes.customTooltip,

                                }} title={"View Zoom Session Recording"}><li><a href="javascript:void" onClick={zoomviewaction} data-tip="View Zoom Session Recording"><i class="fa fa-video-camera" aria-hidden="true"></i></a></li></Tooltip>

                                {/* <li><a href="javascript:void" onClick={previewpdfsession} data-tip="View PDF of previous session"><i class="fa fa-step-backward" aria-hidden="true"></i></a></li> */}
                                <Tooltip arrow classes={{
                                    tooltip: classes.customTooltip,

                                }} title={"Audio Notes"}><li data-tip="Audio Notes"><a href="javascript:void" onClick={DownloadlivesessionAudionote}><i class="fa fa-music"></i></a></li></Tooltip>

                                {
                                    !group &&
                                    <Tooltip arrow classes={{
                                        tooltip: classes.customTooltip,

                                    }} title={"Toggle all signal statistics"}><li><a href="javascript:void" onClick={togglereports} data-tip="Toggle all signal statistics"><i class="fa fa-table"></i></a></li></Tooltip>

                                }
                                <Tooltip arrow classes={{
                                    tooltip: classes.customTooltip,

                                }} title={"Switch time format."}><li data-tip="Switch time format">

                                        <a href="javascript:void">  <i class="fa fa-clock-o" aria-hidden="true" onClick={switchfileformat} data-tip='Switch time format'></i>
                                        </a>


                                    </li></Tooltip>

                                <Tooltip arrow classes={{
                                    tooltip: classes.customTooltip,

                                }} title={"User Manual"}><li><a href="javascript:void" onClick={usermanul} data-tip="User Manual"><i class="fa fa-question-circle" aria-hidden="true"></i></a></li></Tooltip>

                            </ul>
                        </div>
                    </div>
                </div>
                <div className="chart-header-c2">
                    <div className="wrp-select-row">
                        <div className="select-row">
                            <select className="selected-raw-c" onChange={() => { confirmLeave('reportConfig'); return false }} ref={reportconfig}>

                                {
                                    sessions.map((sessions) => {
                                        if ((sessions.id == 46 && emgAvg) || (sessions.id == 47 && emgRaw) || (sessions.id != 46 && sessions.id != 47)) {
                                            return (
                                                <option selected={sessions.id == config ? true : false} value={sessions.id} dangerouslySetInnerHTML={{ __html: sessions.name }} ></option>
                                            )
                                        }

                                    })
                                }

                            </select>
                        </div>
                        {
                            !group && userType == 5 && userType == 6 &&

                            <div className="select-row ">
                                <select onChange={() => { confirmLeave('altConfig'); return false }} ref={alternateconfig}>
                                    <option value={config} selected={config == currentConfig ? "selected" : ""} >Default</option>
                                    {
                                        alternate.length > 0 && alternate.map((v, i) => {
                                            return (
                                                <option value={v.id} selected={v.id == currentConfig ? "selected" : ""}>{v.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>

                        }
                        <div className="select-row select-row selectroedesktop">
                            <select onChange={() => { confirmLeave('record') }} ref={reportRecord}>
                                <option value={'all'} selected={records.number == 'all' ? "selected" : ""}   >All Records</option>

                                {
                                    records.map((records) => {
                                        return (
                                            <option selected={records.number == record ? "selected" : ""} value={records.number}>{records.name}</option>
                                        )
                                    })
                                }

                            </select>
                        </div>
                        <div className='wrpselect-rowgo'> 
                            <div className="select-row select-rowgo">
                                <select onChange={() => { confirmLeave('record') }} ref={reportRecord}>
                                    <option value={'all'} selected={records.number == 'all' ? "selected" : ""}   >All Records</option>

                                    {
                                        records.map((records) => {
                                            return (
                                                <option selected={records.number == record ? "selected" : ""} value={records.number}>{records.name}</option>
                                            )
                                        })
                                    }

                                </select>
                            </div>

                            <div className='dashboard-back-mobile'>
                                
                                    <div className="dashboard-back">
                                        <a onClick={() => confirmLeave("dashboard")} href="javascript:void"><i class="fa fa-arrow-circle-right" aria-hidden="true"></i> Dashboard</a>
                                    </div>
                                
                            </div>
                        </div>

                    </div>
                </div>
                <div className="chart-header-c3">
                    <ul className="username-list">
                        <Tooltip arrow classes={{
                            tooltip: classes.customTooltip,

                        }} title={"Name of client"}><li data-tip="Name of client">
                                {sessioninfo.map((clientName) => {
                                    return (
                                        <a href="javascript:void"><i class="fa fa-user" aria-hidden="true"></i>{clientName.client_firstname} {clientName.client_lastname}</a>
                                    )
                                }
                                )}
                            </li></Tooltip>


                        {
                            (user_type != 5 && user_type != 6) ?
                                <Tooltip arrow classes={{
                                    tooltip: classes.customTooltip,

                                }} title={"Name of trainer"}><li data-tip="Name of trainer">
                                        {sessioninfo.map((trainerName) => {
                                            return (
                                                <a href="javascript:void"><i class="fa fa-user-md" aria-hidden="true"></i> {trainerName.trainer_firstname} {trainerName.trainer_lastname}</a>
                                            )
                                        }
                                        )}
                                    </li></Tooltip>

                                :
                                <></>
                        }
                        <Tooltip arrow classes={{
                            tooltip: classes.customTooltip,

                        }} title={"Session date"}><li data-tip="Session date">
                                {sessioninfo.map((sessionName) => {
                                    return (
                                        <a href="javascript:void"><i class="fa fa-calendar" aria-hidden="true"></i> {sessionName.name}
                                        </a>
                                    )
                                }
                                )}
                            </li></Tooltip>


                    </ul>
                </div>
                <div className='dashboard-back-desktop'>
                    <div className="chart-header-c4">
                        <div className="dashboard-back">
                            <a onClick={() => confirmLeave("dashboard")} href="javascript:void"><i class="fa fa-arrow-circle-right" aria-hidden="true"></i> Dashboard</a>
                        </div>
                    </div>
                </div>
            </div>



            <Modal isOpen={takeNotesModal} toggle={takeNotesToggle} className="modal-box-wrp" centered={true}>
                <ModalHeader toggle={takeNotesToggle}><span className="ml-1 roititle modal-head">Take Report Notes</span></ModalHeader>
                <ModalBody>
                    <textarea rows="8" style={{ width: "100%" }} value={notes} onChange={(e) => setNotes(e.target.value)} ></textarea>

                </ModalBody>

            </Modal>

            <Modal isOpen={notesModal} toggle={notesModalToggle} className="modal-box-wrp" centered={true}>
                <ModalHeader toggle={notesModalToggle}><span className="ml-1 roititle modal-head"> Live Session Notes</span></ModalHeader>
                <ModalBody>
                    <p id="liveNotes">{liveNotes && liveNotes.length > 0 ?

                        <p dangerouslySetInnerHTML={{ __html: liveNotes[0].sessiondata }}></p>

                        : <p className='text-center'>No live notes available.</p>}</p>

                    <div className='d-flex justify-content-around mt-3'>
                        <button className='lightbtn w-100' onClick={notesModalToggle} >Cancel</button>
                        {
                            liveNotes && liveNotes.length > 0 &&
                            <button className='darktbtn w-100 ml-1' onClick={viewNotesPDF} >View PDF</button>
                        }
                    </div>
                </ModalBody>

            </Modal>
            <Modal isOpen={zoomModal} toggle={zoomModalToggle} className="modal-box-wrp" centered={true}>
                <ModalHeader toggle={zoomModalToggle}><span className="ml-1 roititle modal-head">Zoom Recording</span></ModalHeader>
                <ModalBody>
                    <p>{zoomRecording ?
                        <a href={zoomRecording} target="_blank" >Open zoom recording in new tab.</a>
                        : <p className='text-center'>No zoom recording available.</p>}</p>
                </ModalBody>

            </Modal>
            <Modal isOpen={savePdfModal} toggle={savePdfModalToggle} className="modal-box-wrp" centered={true}>
                <ModalHeader toggle={savePdfModalToggle}><span className="ml-1 roititle modal-head"> PDF Report</span></ModalHeader>
                <ModalBody>
                    <p className=''>Please enter the name of PDF you want to save.</p>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1">{sessioninfo[0] ? sessioninfo[0].name : ""}</span>
                        </div>
                        <input type="text" class="form-control"  onChange={handlepdfname} placeholder="Report Name" aria-label="Report Name" aria-describedby="basic-addon1" />
                      
                    </div>
                    {
                        pdfnameerror && <p className='requiredpdfname'>PDF name is required.</p>
                       } 
                    <div className='d-flex justify-space-between mt-3'>
                        <div className='alignitem'>

                            {/* <input className='mr-1' type="checkbox" onChange={() => setPdfNote(!pdfNote)}  checked={pdfNote}/>
  <label for="vehicle1"><b> Save a PDF copy of Notes as well. </b></label> */}
                        </div>

                    </div>

                    <div className='d-flex justify-content-around mt-3'>
                        {
                            session != "54322" &&
                            <button className='lightbtn w-100' onClick={saveScreenshotPDF} >Save PDF Report</button>

                        }

                        <button className='darktbtn w-100 ml-1' onClick={saveScreenshot} >Download PDF</button>

                    </div>
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

            <Modal isOpen={nofoundliveimgModal} toggle={nofoundliveimgToggleModal} className="connect-box" centered={true}>
                <ModalHeader toggle={nofoundliveimgToggleModal}><span className="ml-1 roititle modal-head"> View Live Session images</span></ModalHeader>
                <ModalBody>
                    <p className='text-center'>No live session images available.</p>

                </ModalBody>

            </Modal>

            <Modal isOpen={confirmLeaveModal} toggle={confirmLeaveModalToggle} centered={true}>
                <ModalHeader toggle={confirmLeaveModalToggle}><span className="ml-1 roititle modal-head">Please Confirm </span></ModalHeader>
                <ModalBody>
                    {/* <p className=''>Are you sure you want to leave this screen, please save your changes before leaving ?</p> */}


                    <div className='d-flex justify-content-around mt-3'>
                        <button className='lightbtn w-100' onClick={confirmLeaveModalToggle} >Cancel</button>
                        <button className='lightbtn w-100 ml-1' onClick={performAction} >Discard & Exit</button>

                        <button className='darktbtn w-100 ml-1' onClick={() => { saveReport(); confirmLeaveModalToggle(); }} >Save & Exit</button>

                    </div>
                </ModalBody>

            </Modal>

            {/* press ctrl modal */}

            <Modal isOpen={pressdatafileModal} toggle={pressdatafileModalToggle} className="modal-box-wrpaction" centered={true}>
                <ModalHeader toggle={pressdatafileModalToggle}><span className="ml-1 roititle modal-head">Actions Options</span></ModalHeader>
                <ModalBody>
                    <div className='imgexportdata'><img src={exportdata} /></div>
                </ModalBody>

            </Modal>

            <Modal isOpen={viewactionModal} toggle={viewactionModalToggle} className="modal-box-wrpaction" centered={true}>
                <ModalHeader toggle={viewactionModalToggle}><span className="ml-1 roititle modal-head">Viewing Options</span></ModalHeader>
                <ModalBody>
                    <div className='imgexportdata'><img src={viewaction} /></div>
                </ModalBody>

            </Modal>

            <Modal isOpen={audiomodal} toggle={audiomodaltoggleModal} className="connect-box" centered={true}>
                <ModalHeader toggle={audiomodaltoggleModal}><span className="ml-1 roititle font-weight-bold">Audio Notes</span></ModalHeader>
                <ModalBody>
                    <div><Audiocomponent audiadata={audiodata} /></div>

                </ModalBody>

            </Modal>


            <Modal isOpen={mousesetingModal} toggle={mousesetingtoggleModal} className="modal-box-wrpaction" centered={true}>
                <ModalHeader toggle={mousesetingtoggleModal}><span className="ml-1 roititle modal-head">Mouse Settings</span></ModalHeader>
                <ModalBody>
                    <div className='imgexportdata'><img src={mouseseting} /></div>
                </ModalBody>

            </Modal>


            <Draggable handle=".handle">

                <Modal isOpen={mouseSetingModal} toggle={toggleMouseSetingModal} centered={true}>
                    <ModalHeader className='handle' toggle={toggleMouseSetingModal}><span className="ml-1 roititle modal-head">Mouse Settings</span></ModalHeader>
                    <ModalBody>
                        <div>
                            <ul className='configure-list'>
                                <li>
                                    <div className='configure-wrp'>
                                        <div className='configure-child1'>
                                            <p>Mouse Wheel Scroll:</p>
                                        </div>
                                        <div className='configure-child2'>
                                            <input type="radio" onClick={() => setZoomEnabled(true)} checked={zoomEnabled ? true : false} name="zoom" />
                                            <span>Zoom In/Out</span>
                                            <input type="radio" onClick={() => setZoomEnabled(false)} checked={zoomEnabled ? false : true} className='radio-mrl' name="zoom" />
                                            <span>Scroll Page</span>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className='configure-wrp'>
                                        <div className='configure-child1'>
                                            <p>Mouse Left Click Drag:</p>
                                        </div>
                                        <div className='configure-child2'>
                                            <input type="radio" onClick={() => handleSelection()} checked={dragMode == 'zoom' ? false : true} name="Pan" />
                                            <span>X-Axis Pan</span>
                                            <input type="radio" onClick={() => handleSelection()} checked={dragMode == 'zoom' ? true : false} className='radio-mrl' name="Pan" />
                                            <span>X-Axis Range</span>
                                        </div>
                                    </div>
                                </li>




                            </ul>
                        </div>
                    </ModalBody>

                </Modal>

            </Draggable>

        </div>


    )
}

export default ChartHeader

