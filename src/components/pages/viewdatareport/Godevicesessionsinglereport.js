import React, { useEffect, useState } from "react";
import { Link, useParams, Router } from 'react-router-dom';
import { useTranslation, initReactI18next } from "react-i18next";
import { Row, Col, Container, Button, ModalHeader, ModalFooter, Modal, ModalBody } from "reactstrap";
import { makeStyles } from "@material-ui/core/styles";
import { Tooltip } from '@material-ui/core';
import Header from '../../component/Header';
import MaterialTable from 'material-table';
import download from '../../images/download.png'
import preveiw from '../../images/preveiw.png'
import { API_URL } from "../../../config";
import backIcon from "../../../components/images/back.png";
import { DateRangePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

const useStyles = makeStyles(() => ({
    customTooltip: {
        backgroundColor: "black",
        fontSize: "15px"
    }
}));

const Godevicesessionsinglereport = () => {
    const accessToken = localStorage.getItem('accessToken');
    const [reports, setviewreports] = useState([]);
    const [data, setData] = useState([]);
    const sessionid = localStorage.getItem('selectedSession');
    const client_id = localStorage.getItem('client_id');

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [focusedInput, setFocusedInput] = useState(null);


    const { t } = useTranslation();
    const classes = useStyles();

    useEffect(() => {

        Singlesession();

    }, [sessionid]);



    function handleDatesChange({ startDate, endDate }) {
        setStartDate(startDate);
        setEndDate(endDate);
    }

    function handleFocusChange(focusedInput) {
        setFocusedInput(focusedInput);
    }


    const Singlesession = () => {
        fetch(API_URL + "/get/client/session/" + client_id,
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
                            report: v.name,
                            Createdate: new Date(v.added_on).toLocaleString(),
                            actions: <p> <Tooltip classes={{
                                tooltip: classes.customTooltip,

                            }} title="View" placement="top"><a href={"/view/report/0/" + sessionid + "/" + v.id + '/all'} className="downloadimg"><img src={preveiw} /></a></Tooltip> </p>
                        })



                        setData(_temp);

                    })

                    // let len = reports.length;
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
            title: <span className="">{t("Created-Date-Time")}</span>, field: "Createdate", align: "left"
        },
        {
            title: <span className="text-right">{t("Actions")}</span>, field: "actions", align: "right"
        }
    ]




    return (
        <div className="">
            <Header />
            <div className="wrp-dashbord">
                <div className="sidebar-section">
                   
                </div>
                <div className="right-section">
                    <div className="wrp-daterangepicker">
                        <div className="back-icon-wrp">
                            <Link to="/view/data/report" className="backbtn-icon">
                                <img src={backIcon} alt="backicon" />
                                <span>{t("Back")}</span>
                            </Link>
                        </div>
                        <div className="head-rangedate">
                            <DateRangePicker
                                startDate={startDate}
                                startDateId="start_date_id"
                                endDate={endDate}
                                endDateId="end_date_id"
                                onDatesChange={handleDatesChange}
                                focusedInput={focusedInput}
                                onFocusChange={handleFocusChange}
                            />
                        </div>
                    </div>
                    <div className="wrp-bankform">
                        <div style={{ maxWidth: '100%' }}>
                            <MaterialTable
                                columns={columns}
                                data={data}
                                title=""
                                options={{
                                    pageSize: 15,

                                    pageSizeOptions: [5, 10, 15, 20]
                                }}


                            />

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Godevicesessionsinglereport;