
import React, { useEffect, useState } from 'react';
import { Link, useParams, Router } from 'react-router-dom';
import { useTranslation, initReactI18next } from "react-i18next";
import backIcon from "../../../components/images/back.png";



import { API_URL } from "../../../config";
const Gocreategroupsessetionreportgodevice = () => {

    const accessToken = localStorage.getItem('accessToken');
    const session = localStorage.getItem('selectedSession');

    const [isActive, setIsActive] = useState(0);


    const [sessions, setsessions] = useState([]);
    const { t } = useTranslation();


    const handleClick = id => {
        setIsActive(id);

        // localStorage.setItem('selectedSession', id);

    };

    useEffect(() => {
        Report();


    }, []);


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
                    setsessions(resp.sessions)

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
    return (


        <div>
            <ul className="groupreport-list">
                {
                    sessions.map((sessions) => {
                        return (
                            <li><a href="#" className={isActive == sessions.id ? 'activelist' : ''} dangerouslySetInnerHTML={{ __html: sessions.name }} onClick={() => { handleClick(sessions.id) }} ></a></li>
                        )
                    }
                    )
                }
            </ul>
        </div>

    )
}

export default Gocreategroupsessetionreportgodevice;