import React, { Component, useEffect, useRef, useState } from "react";
import { Link } from 'react-router-dom'
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import { Row, Col, Container, Button, ModalHeader, ModalFooter, Modal, ModalBody } from "reactstrap";
import { DateRangePicker, Radio } from 'rsuite';
import { API_URL } from "../../config";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import Gosessionnote from '../pages/viewlive/Gosessionnote';
import Gosessionimage from '../pages/viewlive/Gosessionimage';
import right from '../images/right.png';
import videoicon from '../images/videoicon.png'
import Zoomlinklist from "./Zoomlinklist";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';



const Gofilter = ({ dataid, ToggleSidebar }) => {


    useEffect(() => {
        if (dataid) {
            getSession()
            getClients()
            setIsActive(0)
            setHidereports(false)
            setValues(null)
        }
    }, [dataid])


    const { t } = useTranslation();
    const [clients, setinclients] = useState([]);
    const [trainers, settrainers] = useState([]);
    const [session, setsession] = useState([]);
    const [Idupdate, setIdupdate] = useState(null)
    const trainerActive = useRef()
    const trainerInactive = useRef()
    const clientActive = useRef()
    const clientInactive = useRef()
    const trainerSelected = useRef()
    const groupSelected = useRef()
    const clientSelected = useRef()
    const cid = useRef()
    const cid2 = useRef()
    const sessionSelected = useRef()

    const userId = localStorage.getItem('user_id');
    const selectedTrainer = localStorage.getItem('selectedTrainer');
    const selectedClient = localStorage.getItem('selectedClient');
    const selectedSession = localStorage.getItem('selectedSession');
    const selectedGroup = localStorage.getItem('selectedGroup');

    const selectedtrainerActive = localStorage.getItem('selectedtrainerActive');
    const selectedtrainerInactive = localStorage.getItem('selectedtrainerInactive');
    const selectedclientActive = localStorage.getItem('selectedclientActive');
    const selectedclientInactive = localStorage.getItem('selectedclientInactive');
    const [selectedHomework, setselectedHomework] = useState(localStorage.getItem('selectedHomework'));
    const [selectedStandard, setselectedStandard] = useState(localStorage.getItem('selectedStandard'));
    const Selectsessionid = localStorage.getItem('selectedSession');
    const accessToken = localStorage.getItem('accessToken');
    const [Loader, setLoader] = useState(false)
    const [configsessions, setconfigsessions] = useState([]);
    



    const [isActive, setIsActive] = useState(0);
    const [isActiveconfig, setIsActiveconfig] = useState(0)
    const _cid = localStorage.getItem('selectedClient');

    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [Values, setValues] = useState()
    // const [selectedClient, setSelectedClient] = useState()

    const [hidereportbox, setHidereports] = useState(false)

    const userType = localStorage.getItem('userType');
    const M_module = localStorage.getItem('m_module');


    const [downloaderModal, setDownloaderModal] = useState(false);
    const DownloaderToggleModal = () => setDownloaderModal(!downloaderModal);
    const [openModal, setOpenModal] = useState(false);
    const openToggleModal = () => setOpenModal(!openModal);
    const [fillallfieldmodal, setFillallfieldModal] = useState(false);
    const fillallfieldtoggleModal = () => setFillallfieldModal(!fillallfieldmodal);
    const zoomlink = useRef();


    const [zoomlinkcontentmodal, setZoomlinkcontentmodal] = useState(false);
    const zoomlinkcontenttoggleModal = () => setZoomlinkcontentmodal(!zoomlinkcontentmodal);

    const [updatezoomlinkmodal, setUpdatezoomlinkmodal] = useState(false);
    const updatezoomlinktoggleModal = () => setUpdatezoomlinkmodal(!updatezoomlinkmodal);

    const [zoomlinkupdatecontentmodal, setZoomlinkupdatecontentmodal] = useState(false);
    const zoomlinkupdatecontenttoggleModal = () => setZoomlinkupdatecontentmodal(!zoomlinkupdatecontentmodal);

    const [addzoomlinkmodal, setAddzoomlinkmodal] = useState(false);
    const addzoomlinktoggleModal = () => setAddzoomlinkmodal(!addzoomlinkmodal);



    const [zoomdata, setZoomdata] = useState([])
    const [zoomlinks, setZoomlinks] = useState([])


    useEffect(() => {
        setInterval(() => {

            setselectedHomework(localStorage.getItem('selectedHomework'));
            setselectedStandard(localStorage.getItem('selectedStandard'));

        }, 1000);



    }, []);

    useEffect(() => {
        if (userId && (userType == 1 || userType == 7)) {
            getTrainers();
        }
        if (selectedTrainer && (userType == 1 || userType == 2 || (M_module == 1 && userType == 5) || userType == 6 || userType == 7)) {
            getClients();
        }
        if (selectedClient) {
            getSession()

        }

        // getSession();


    }, [])

    

    const getTrainers = () => {
        setinclients([])

        let url = API_URL + "/trainers?user_id=" + userId + "&status=2";
        // // console.log(trainerActive);
        let _trainerActive = trainerActive.current.checked;
        let _trainerInactive = trainerInactive.current.checked;

        if (trainerActive.current.checked) {
            localStorage.setItem('selectedtrainerActive', true);
        }
        else {
            localStorage.setItem('selectedtrainerActive', false);

        }
        if (trainerInactive.current.checked) {
            localStorage.setItem('selectedtrainerInactive', true);
        }
        else {
            localStorage.setItem('selectedtrainerInactive', false);

        }

        if (_trainerActive && !_trainerInactive) {
            url = API_URL + "/trainers?user_id=" + userId + "&status=1";;
        }
        else if (!_trainerActive && _trainerInactive) {
            url = API_URL + "/trainers?user_id=" + userId + "&status=0";
        }
        else if (_trainerActive && _trainerInactive) {
            url = API_URL + "/trainers?user_id=" + userId;
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
                response.json().then((result) => {
                    // console.log(result.trainers)
                    if (result.status) {
                        settrainers(result.trainers)
                        // getClients();
                    }

                    else {
                        alert("no data error")
                    }

                })
            }
            else if (response.status == 401) {
                logout()
            }
            else {
                console.log("network error")
            }


        }).catch(err => {
            // // console.log(err)

        })
    }


    const getClients = () => {
        const _cid = localStorage.getItem('user_id');
        setsession([]);

        if (dataid == 1 || dataid == 6) {

            let url = API_URL + "/get/go/client/" + _cid;

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
                    response.json().then((result) => {
                        // console.log(result.clients)

                        setinclients(result.clients)

                    })
                }
                else if (response.status == 401) {
                    logout()
                }
                else {
                    console.log("network error")
                }


            }).catch(err => {
                // // console.log(err)

            })


        }


        if (dataid == 2) {

            let url = API_URL + "/get/go/client/viewreport/" + _cid;

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
                    response.json().then((result) => {
                        // console.log(result.clients)

                        setinclients(result.clients)

                    })
                }
                else if (response.status == 401) {
                    logout()
                }
                else {
                    console.log("network error")
                }


            }).catch(err => {
                // // console.log(err)

            })


        }

        if (dataid == 3) {

            let url = API_URL + "/get/go/client/sessionnotes/" + _cid;

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
                    response.json().then((result) => {
                        // console.log(result.clients)

                        setinclients(result.clients)

                    })
                }
                else if (response.status == 401) {
                    logout()
                }
                else {
                    console.log("network error")
                }


            }).catch(err => {
                // // console.log(err)

            })


        }

        if (dataid == 4) {

            let url = API_URL + "/get/go/client/session/images/" + _cid;

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
                    response.json().then((result) => {
                        // console.log(result.clients)

                        setinclients(result.clients)

                    })
                }
                else if (response.status == 401) {
                    logout()
                }
                else {
                    console.log("network error")
                }


            }).catch(err => {
                // // console.log(err)

            })


        }

        if (dataid == 5) {

            let url = API_URL + "/get/go/client/report/notes/" + _cid;

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
                    response.json().then((result) => {
                        // console.log(result.clients)

                        setinclients(result.clients)

                    })
                }
                else if (response.status == 401) {
                    logout()
                }
                else {
                    console.log("network error")
                }


            }).catch(err => {
                // // console.log(err)

            })


        }

    }

    const getSession = () => {
        const _cid = localStorage.getItem('selectedClient');
        setsession([])



        let _homework = (userType == 5 || userType == 6) ? "" : cid?.current?.checked;
        let _standard = cid2?.current?.checked;

        let _hw;
        if (userType == 5 || userType == 6) {
            _standard = true;
        }
        if (_standard) {
            _hw = 0;
        }


        if (!_homework && !_standard) {
            _hw = 5;
        }


        if (_homework) {
            _hw = 1;
        }
        if ((userType == 5 || userType == 6 || userType == 7) ? "" : cid.current.checked) {
            setselectedHomework(true);
            localStorage.setItem('selectedHomework', true);
        }
        else {
            setselectedHomework(false);

            localStorage.setItem('selectedHomework', false);

        }


        if (cid2?.current?.checked) {
            setselectedStandard(true);
            localStorage.setItem('selectedStandard', true);
        }
        else {
            setselectedStandard(false);

            localStorage.setItem('selectedStandard', false);

        }




        if (dataid == 1 || dataid == 6) {
            let url = API_URL + "/sessions?cid=" + _cid + "&hw=" + _hw;
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
                    response.json().then((result) => {
                        // // console.log(result.sesstion)

                        setsession(result.sessions)
                        // // console.log(setsesstion)


                    })
                }
                else if (response.status == 401) {
                    logout()
                }
                else {
                    console.log("network error")
                }


            }).catch(err => {
                // // console.log(err)

            })



        }

        if (dataid == 2) {

            let url = API_URL + "/get/pdf/session/" + _cid;
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
                    response.json().then((result) => {
                        // // console.log(result.sessions)

                        setsession(result.sessions)


                    })
                } else if (response.status == 404) {
                    console.log("no session found")
                }
                else if (response.status == 401) {
                    logout()
                }
                else {
                    console.log("network error")
                }


            }).catch(err => {
                // // console.log(err)

            })
        }
        if (dataid == 3) {
            let url = API_URL + "/get/session/note/" + _cid;
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
                    response.json().then((result) => {
                        // // console.log(result.sessions)

                        setsession(result.sessions)


                    })
                }
                else if (response.status == 401) {
                    logout()
                }
                else {
                    console.log("network error")
                }


            }).catch(err => {
                // // console.log(err)

            })
        }

        if (dataid == 4) {

            let url = API_URL + "/get/session/images/" + _cid + "/" + 3;
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
                    response.json().then((result) => {
                        // // console.log(result.sessions)

                        setsession(result.sessions)


                    })
                }
                else if (response.status == 401) {
                    logout()
                }
                else {
                    console.log("network error")
                }


            }).catch(err => {
                // // console.log(err)

            })
        }


        if (dataid == 5) {
            let url = API_URL + "/get/go/session/report/notes/" + _cid;
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
                    response.json().then((result) => {
                        // // console.log(result.sessions)

                        setsession(result.sessions)


                    })
                }
                else if (response.status == 401) {
                    logout()
                }
                else {
                    console.log("network error")
                }


            }).catch(err => {
                // // console.log(err)

            })
        }


    }


    //    trainer check react
    const logout = () => {
        localStorage.clear();
        window.location.reload();
    }
    const updateSelectClient = () => {
        localStorage.setItem('selectedClient', clientSelected.current.value);
        localStorage.setItem('selectedSession', null);
        setIsActive(0)
        setHidereports(false)
        getSession()
        setValues(null)
    }
    const updateSelectTrainer = () => {
        localStorage.setItem('selectedTrainer', trainerSelected.current.value);
        localStorage.setItem('selectedClient', null);

        getClients()
    }
    const updateselectedSecssion = () => {

        localStorage.setItem('selectedSession', sessionSelected.current.value);


    }
 
    const handleGroup = () => {
        localStorage.setItem('selectedSession', null);
        localStorage.setItem('selectedClient', null);
        if (groupSelected.current.checked) {
            localStorage.setItem('selectedGroup', true);
        }
        else {
            localStorage.setItem('selectedGroup', false);

        }
        getClients();
    }






    const handleClick = id => {
        setIsActive(id);
        
        setIdupdate(id)

        localStorage.setItem('selectedSession', id);

        // setHidereports(true);
        
        
    };



    useEffect(() => {
     
        if (Values?.length == undefined) {
            getSession()
        }
    }, [Values])




    const handleClickconfig = id => {
        setIsActiveconfig(id);

    };

    useEffect(() => {

        Report()

    }, [])


    const Report = () => {
        fetch(API_URL + "/configured/report?type=3",
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
                    setconfigsessions(resp.sessions)

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

    function convertDate(format) {
        function pad(s) {
            return s < 10 ? "0" + s : s;
        }
        var d = new Date(format);
        return [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join("-");
    }

    const handleDatepicker = (e) => {

        setLoader(true)
        setValues(e)
        let startDates = convertDate(e?.[0]);
        let endDates = convertDate(e?.[1]);
        setStartDate(startDates);
        setEndDate(endDates);

        if(startDates == "NaN-NaN-NaN" && endDates == "NaN-NaN-NaN"){
            setLoader(false)
        }else{

        let url = API_URL + "/get/session/by/date?cid=" + _cid + "&startDate=" + startDates + "&endDate=" + endDates;

        if (dataid == 2) {
            url = API_URL + "/get/pdf/session/" + _cid + "?startDate=" + startDates + "&endDate=" + endDates;
        } else if (dataid == 3) {
            url = API_URL + "/get/session/note/" + _cid + "?startDate=" + startDates + "&endDate=" + endDates;
        } else if (dataid == 4) {
            url = API_URL + "/get/session/images/" + _cid + "/" + 3 + "?startDate=" + startDates + "&endDate=" + endDates;
        } else if (dataid == 5) {
            url = API_URL + "/get/go/session/report/notes/" + _cid + "?startDate=" + startDates + "&endDate=" + endDates;
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
                response.json().then((result) => {
                    // // console.log(result.sesstion)

                    setsession(result.sessions)
                    setLoader(false)

                    // if (Values?.length == undefined) {
                    //     getSession()
                    // }


                })
            }
            else if (response.status == 404) {
                setsession([])

                setLoader(false)
            }
            else if (response.status == 401) {
                logout()
            }
            else {
                console.log("network error")
            }


        }).catch(err => {
            // // console.log(err)

        })

        }


    };


    function scrollWin() {
        // window.scrollBy(0, 100);
        const element = document.getElementById('scrolllist');

        element.scrollBy({
            top: 100,behavior: "smooth"
        });
    }


    useEffect(() => {
        if (selectedSession) {

            getZoomLinkbyid();
        }


    }, [selectedSession,Idupdate])


    function saveZoomLink() {
        // setLoader(true)
        let data = {};
       
        data['zoom_link'] = zoomlink.current.value;


        if (zoomlink.current.value == "") {
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





    const getZoomLinkbyid = () => {

        setHidereports(false)
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
                    setHidereports(true)


                });
            }else if (response.status == 202) {
                setZoomdata([])
                setZoomlinks([])
                setHidereports(true)
            }
            else if (response.status == 401) {
                logout()
            }
            else {
                console.log("network error")
            }


        })
    }

    console.log("sessionlength",session.length);



    return (
        <div className="wrpgofiltter">

            <div className="wrp-step-box wrp-step-box6">

            <div className={userType ==5 && M_module == 0?"gopopuphead2": "gopopuphead"}>
                    <h3>{dataid == 1?"Make Reports": dataid == 2?"View Reports": dataid == 3?"Session Notes": dataid == 4?"Session Images": dataid == 5?"Data Report Notes": dataid == 6?"Zoom Recordings":""}</h3>
                </div>
                {
                    userType == 1 || userType == 7 ? <> <div className="step-box">
                        <div className="step-trainers-box">
                            <p>{t('Trainer-box')}</p>
                        </div>
                        <div className="main-checkbox">

                            <div className="checkbox-wrp">
                                <div class="custom-radios">
                                    <input type="checkbox" id="active" onChange={getTrainers} ref={trainerActive} defaultChecked={(selectedtrainerActive === "true" ? true : false)}
                                    />
                                    <label for="active">
                                        <span className="redious">
                                        </span>
                                        <b className="lactive">{t('Active')}</b>
                                    </label>
                                </div>


                            </div>

                            <div className="checkbox-wrp">
                                <div class="custom-radios">
                                    <input type="checkbox" id="inactive" onChange={getTrainers} ref={trainerInactive} defaultChecked={(selectedtrainerInactive === "true" ? true : false)} />
                                    <label for="inactive">
                                        <span className="redious">
                                        </span>
                                        <b className="lactive">{t('Inactive')}</b>
                                    </label>
                                </div>

                            </div>
                        </div>
                        <div className="select-client">
                            <select ref={trainerSelected} onChange={updateSelectTrainer}  >
                                <option className="selected-bold">{t('Choose-a-trainer')}</option>
                                <option value={"all"} className="selected-bold">All trainers</option>
                                {
                                    trainers.map((items) =>
                                        <option className="selected-bold" selected={items.id == selectedTrainer ? true : false} value={items.id}>
                                            {items.firstname} {items.lastname}
                                        </option>)
                                }

                            </select>
                        </div>

                    </div></> : ""


                }

                {
                    (userType == 2 || userType == 1 || userType == 7 || userType == 6 || (M_module == 1 && userType == 5)) ?

                        <div className="step-box">
                            <div className="step-trainers-box">
                                <p>{t("CLIENTS")}</p>
                            </div>
                            <div className="main-checkbox">

                                <div className="checkbox-wrp">

                                    {
                                        ((M_module == 1 && userType == 5) || userType == 6) ?
                                            "" : <>

                                                <div class="custom-radios">
                                                    <input type="checkbox" id="color-9" value="color-9" onChange={getClients} ref={clientActive} defaultChecked={(selectedclientActive === "true" ? true : false)} />
                                                    <label for="color-9">
                                                        <span className="redious">
                                                        </span>
                                                    </label>
                                                </div>
                                                <div className="caption-cheeckbox">
                                                    <p>Active</p>
                                                </div>
                                            </>
                                    }

                                </div>
                                <div className="checkbox-wrp">
                                    {
                                        (userType == 6 || (M_module == 1 && userType == 5)) ? "" : <><div class="custom-radios">
                                            <input type="checkbox" id="color-10" value="color-10" onChange={getClients} ref={clientInactive} defaultChecked={(selectedclientInactive === "true" ? true : false)} />
                                            <label for="color-10">
                                                <span className="redious">
                                                </span>
                                            </label>
                                        </div>
                                            <div className="caption-cheeckbox">
                                                <p>Inactive</p>
                                            </div></>
                                    }

                                </div>
                                <div className="checkbox-wrp">
                                    {
                                        (userType == 6 || (M_module == 1 && userType == 5)) ? "" : <><div class="custom-radios">
                                            <input type="checkbox" id="color-8" value="color-8" onChange={handleGroup} ref={groupSelected} defaultChecked={(selectedGroup === "true" ? true : false)} />
                                            <label for="color-8">
                                                <span className="redious">
                                                </span>
                                            </label>
                                        </div>
                                            <div className="caption-cheeckbox">
                                                <p>{t('Group')}</p>
                                            </div></>
                                    }

                                </div>
                            </div>
                            <div className={((M_module == 1 && userType == 5) || userType == 6) ? `smallboxgodevice select-client` : "select-client"}>
                                <select ref={clientSelected} onChange={updateSelectClient}>

                                    {
                                        selectedGroup == "true" ? <option className="selected-bold">Choose a Group</option> : <option className="selected-bold">{t('Choose-a-client')}</option>
                                    }


                                    {
                                        clients.length > 0 && clients.map((client, i) =>
                                            <option className="selected-bold" selected={client.id == selectedClient ? true : false} value={client.id}>
                                                {client.firstname} {client.lastname}
                                            </option>)
                                    }
                                </select>
                            </div>

                        </div> : ""

                }
            </div>


            <div className='wrpSectioncontent'>


                <DateRangePicker placeholder="Choose Date to Filter Sessions" value={Values} onChange={handleDatepicker} />
                <div className='session-heading'>
                    <p>Sessions</p>
                </div>
                <div className={session.length > 6 ? "fixed-box2" : "fixed-box"}>
                    <ul className={session.length > 6 ? "sectionlist2 sectionlist" : 'sectionlist'} id="scrolllist" >

                        {
                            session.length > 0 && session.map((val, i) => {
                                return (
                                    <>
                                        <li className={isActive == val.id ? 'activelist' : ''} onClick={() => { handleClick(val.id) }}><span className="inputcircle"></span>{val.name}</li>
                                    </>
                                )
                            })

                        }
                        {
                            Loader &&
                            <div className='wrp-loader'>
                                <div id="loader2"></div>
                                <p>Fetching data</p>
                            </div>
                        }


                        {
                            (session.length == 0 && Values?.length > 0 && (userType == 6 || userType == 5 && M_module == 1)) ? <p>No sessions found for the selected date, please choose a different date.</p> : session.length == 0 && (userType == 6 || userType == 5 && M_module == 1) ? <p>Please Choose a Client</p> : ""
                        }

                        {
                            (session.length == 0 && Values?.length > 0 && userType == 5) ? <p>No sessions found for the selected date, please choose a different date.</p> : clients.length > 0 && session.length == 0 && userType == 5 ? <p>No Session Found</p> : ""
                        }

                    </ul>

                </div>
                {
                    session.length > 6 ? <button className='viewbtnscroll' onClick={scrollWin}><ExpandMoreIcon /></button> : ""
                }

                {
                    (dataid == 1 && hidereportbox &&  selectedSession !== "" && selectedSession !== "null") ? <>
                        <div className='session-heading'>
                            <p>Reports</p>
                        </div>
                        <ul className="gogroupreport-list reportlist reportlistmobile" >
                            {
                                configsessions.length > 0 && configsessions.map((sessions) => {
                                    return (
                                        <li className={isActiveconfig == sessions.id ? 'activelist' : ''} onClick={() => { handleClickconfig(sessions.id) }} > <span className="inputcircle"></span> <a href="#"  dangerouslySetInnerHTML={{ __html: sessions.name }}  ></a></li>
                                    )
                                }
                                )
                            }
                        </ul>  </> : ""
                }

                {
                    dataid == 1 ? <> <div className="wrp_backbtn">
                        <div className={(isActive > 0 && isActiveconfig > 0) ? "view-session" : "diactivatedcontinue view-session"}>
                            <a href={(isActive > 0 && isActiveconfig > 0) ? "/create/report/0/" + isActiveconfig + "/" + Selectsessionid + "/all/" + isActiveconfig : "#"}>Continue</a>
                        </div>
                        <div className="BackGouser">
                            <a href="#" onClick={ToggleSidebar}><KeyboardBackspaceIcon />Go to Dashboard</a>
                        </div>
                    </div></> : dataid == 2 ? <> <div className="wrp_backbtn">
                        <div className={isActive == 0 ? "diactivatedcontinue view-session" : "view-session"}>
                            <a href={isActive == 0 ? "#" : "/go/pdf/session/report"}>Continue</a>
                        </div>
                        <div className="BackGouser">
                            <Link to="/go/dashboard" onClick={ToggleSidebar}><KeyboardBackspaceIcon />Go to Dashboard</Link>
                        </div>
                    </div></> :(dataid == 3 && hidereportbox && selectedSession !== "" && selectedSession !== "null") ? <>
                        <Gosessionnote />
                        
                    </> : (dataid == 4 && hidereportbox && selectedSession !== "" && selectedSession !== "null")? <>
                        <Gosessionimage />
                    </> : dataid == 5 ? <> <div className="wrp_backbtn">
                        <div className={isActive == 0 ? "diactivatedcontinue view-session" : "view-session"}>
                            <a href={isActive == 0 ? "#" : "/go/pdf/session/report/notes"}>Continue</a>
                        </div>
                        <div className="BackGouser">
                            <Link to="/go/dashboard" onClick={ToggleSidebar}><KeyboardBackspaceIcon />Go to Dashboard</Link>
                        </div>
                    </div></> : (dataid == 6 && hidereportbox &&  selectedSession !== "" && selectedSession !== "null")? <div>


                        <div className="create-section">
                            <ul className="create-list groupreport-list">

                                <li>
                                    <div className="create-list-box create-list-boxzoomlink" >
                                        <a href="javascript:void" className={(selectedSession === "" || selectedSession === "null") ? "deactivate" : ""}>
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

                                <Zoomlinklist zoomlinkupdatecontenttoggleModal={zoomlinkupdatecontenttoggleModal}  selectedSession={selectedSession} setUpdatezoomlinkmodal={setUpdatezoomlinkmodal} />


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
                                    <button type="button" class="close-btn" onClick={() => { saveZoomLink(); }}>{t("Add-link")}</button>
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




                    </div> : ""
                }


{
                                    dataid == 3 ? <div className="wrp-gotodashboardbtn">
                                        <Link to="/go/dashboard" onClick={ToggleSidebar} ><KeyboardBackspaceIcon />Go to Dashboard</Link>
                                    </div> : ""
                                }
                                {
                                    dataid == 4 ? <div className="wrp-gotodashboardbtn">
                                        <Link to="/go/dashboard" onClick={ToggleSidebar} ><KeyboardBackspaceIcon />Go to Dashboard</Link>
                                    </div> : ""
                                }

                                {
                                    dataid == 6 ? <div className="wrp-gotodashboardbtn">
                                        <Link to="/go/dashboard" onClick={ToggleSidebar} ><KeyboardBackspaceIcon />Go to Dashboard</Link>
                                    </div> : ""
                                }

            </div>


        </div>
    );
}

export default Gofilter;