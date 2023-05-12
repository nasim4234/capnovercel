import React, { Component, useState, useEffect,useRef } from 'react';
import { Link, useParams, Router } from 'react-router-dom';
import { DateRangePicker, Radio } from 'rsuite';
import md5 from 'md5';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import Gocreategroupsessetionreportgodevice from '../pages/viewdatareport/Gocreategroupsessetionreportgodevice';
import { API_URL } from "../../config/index";
import Gosessionnote from '../pages/viewlive/Gosessionnote';
import Gosessionimage from '../pages/viewlive/Gosessionimage';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';


const MakereportSession = ({ updateSelectClient, sessiondata, dataid, setsesstion, getSession,ToggleSidebar }) => {

    const [disabled, setDisabled] = useState(0);
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

    const userType = localStorage.getItem('userType');
    const M_module = localStorage.getItem('m_module');

    const [hidereportbox, setHidereports] = useState(false)
 



    useEffect(() => {
        setIsActive(0)
        setHidereports(false)
       
    }, [updateSelectClient])
    


    const handleClick = id => {
        setIsActive(id);

        localStorage.setItem('selectedSession', id);

        setHidereports(true)

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
       
        
        setValues(e)
        let startDates = convertDate(e?.[0]);
        let endDates = convertDate(e?.[1]);
        setStartDate(startDates);
        setEndDate(endDates);

        setLoader(true)
        let url = API_URL + "/get/session/by/date?cid=" + md5(_cid) + "&startDate=" + startDates + "&endDate=" + endDates;
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

                    setsesstion(result.sessions)
                    setLoader(false)

                    // if (Values?.length == undefined) {
                    //     getSession()
                    // }


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


    };


    function scrollWin() {
        // window.scrollBy(0, 100);
        const element = document.getElementById('scrolllist');
        
        element.scrollBy(0, 100);
      }



    return (
        <div className='wrpSectioncontent'>

       
            <DateRangePicker placeholder="Choose Date to Filter Sessions" value={Values} onChange={handleDatepicker} />
            <div className='session-heading'>
                <p>Sessions</p>
            </div>
            <div className={sessiondata.length > 10?"fixed-box2": "fixed-box"}>
            <ul className={sessiondata.length > 10?"sectionlist2 sectionlist": 'sectionlist'} id="scrolllist" >
                
                {
                    sessiondata.length > 0 && sessiondata.map((val, i) => {
                        return (
                            <>
                                <li className={isActive == val.id ? 'activelist' : ''} onClick={() => { handleClick(val.id) }}><input type="radio" /> {val.name}</li>
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
                    (sessiondata.length == 0 && Values?.length > 0 && (userType == 6 || userType == 5 && M_module == 1)) ? <p>No sessions found for the selected date, please choose a different date.</p> : sessiondata.length == 0 && (userType == 6 || userType == 5 && M_module == 1) ? <p>Please Choose a Client</p> : ""
                }

                {
                    (sessiondata.length == 0 && Values?.length > 0 && userType == 5) ? <p>No sessions found for the selected date, please choose a different date.</p> : sessiondata.length == 0 && userType == 5 ? <p>No Session Found</p> : ""
                }
               <div id="section-1"></div>
            </ul>
            
            </div>
            {
                sessiondata.length > 10? <button className='viewbtnscroll' onClick={scrollWin}><ArrowDownwardIcon /></button> : ""
            }
            


            {
                (dataid == 1 && hidereportbox)? <> 
                 <div className='session-heading'>
                <p>Reports</p>
            </div>
                <ul className="groupreport-list reportlist" >
                    {
                        configsessions.length > 0 && configsessions.map((sessions) => {
                            return (
                                <li><input type="radio" /><a href="#" className={isActiveconfig == sessions.id ? 'activelist' : ''} dangerouslySetInnerHTML={{ __html: sessions.name }} onClick={() => { handleClickconfig(sessions.id) }} ></a></li>
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
                        <a href="#" onClick={ToggleSidebar}><KeyboardBackspaceIcon />Go Back</a>
                    </div>
                </div></> : dataid == 2 ? <> <div className="wrp_backbtn">
                    <div className={isActive == 0 ? "diactivatedcontinue view-session" : "view-session"}>
                        <a href={isActive == 0 ? "#" : "/go/pdf/session/report"}>Continue</a>
                    </div>
                    <div className="BackGouser">
                        <a href="#" onClick={ToggleSidebar}><KeyboardBackspaceIcon />Go Back</a>
                    </div>
                </div></> : dataid == 3 && hidereportbox ? <> 
                <Gosessionnote />
                </> : dataid == 4 && hidereportbox ? <> 
                    <Gosessionimage />
                </> : dataid == 5 ? <> <div className="wrp_backbtn">
                    <div className={isActive == 0 ? "diactivatedcontinue view-session" : "view-session"}>
                        <a href={isActive == 0 ? "#" : "/go/pdf/session/report/notes"}>Continue</a>
                    </div>
                    <div className="BackGouser">
                        <a href="#" onClick={ToggleSidebar}><KeyboardBackspaceIcon />Go Back</a>
                    </div>
                </div></> : ""
            }

        </div>
    );


}
export default MakereportSession;