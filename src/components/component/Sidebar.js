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


const Sidebar = () => {
  const { t } = useTranslation();
  const userType = localStorage.getItem('userType');

  const [activeIndex, setActiveIndex] = useState()



  const tabArray = [
    {
      links: "/dashboard", tabDisplay: t('Create-Data-Report'), "tabimg": <BorderColorIcon />
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
      links: "/viewcreate", tabDisplay: (userType == 3) ? "Edit Profile" : t('View-Create-Edit-Profile'), "tabimg": <PersonAddIcon />
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


  const usertypeseventabArray = [
    {
      links: "/dashboard", tabDisplay: t('Create-Data-Report'), "tabimg": <BorderColorIcon />
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
      links: "/viewcreate", tabDisplay: (userType == 3) ? "Edit Profile" : t('View-Create-Edit-Profile'), "tabimg": <PersonAddIcon />
    },

    {
      links: "/case/report/assembly", tabDisplay: t('Session-Report-Assembly'), "tabimg": <ReportIcon />
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


  const usertype3tabArray = [
    // {
    //   links: "/dashboard", tabDisplay: t('Create-Data-Report'), "tabimg": <BorderColorIcon />
    // },
    // {
    //   links: "/view/data/report", tabDisplay: t('View-&-Edit-Data-Report'), "tabimg": <PageviewIcon />
    // },
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
      links: "/viewcreate", tabDisplay: (userType == 3) ? "Edit Profile" : t('View-Create-Edit-Profile'), "tabimg": <PersonAddIcon />
    },

    // {
    //   links: "/subscribe/user", tabDisplay: t('Subscribed Users'), "tabimg": sidebarmenu8
    // },

    // {
    //     links: "/", tabDisplay: t('Group-Subscription-Management'), "tabimg": <PictureAsPdfIcon />
    //   },

  ];


  const usertype2tabArray = [
    {
      links: "/dashboard", tabDisplay: t('Create-Data-Report'), "tabimg": <BorderColorIcon />
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
      links: "/viewcreate", tabDisplay: (userType == 3) ? "Edit Profile" : t('View-Create-Edit-Profile'), "tabimg": <PersonAddIcon />
    },

    {
      links: "/case/report/assembly", tabDisplay: t('Session-Report-Assembly'), "tabimg": <ReportIcon />
    },
    {
      links: "/recording", tabDisplay: t('Recording-by-Distributors'), "tabimg": <VideocamIcon />
    }
    // {
    //   links: "/subscribe/user", tabDisplay: t('Subscribed Users'), "tabimg": sidebarmenu8
    // },

    // {
    //     links: "/", tabDisplay: t('Group-Subscription-Management'), "tabimg": <PictureAsPdfIcon />
    //   },

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
    <div>

      <div className="sidebar">

        <div class="header-child1 mrb-header"><h3>{t("Database-Dashboard")}</h3></div>
        <ul className="sidebar-list">
          {
            userType == 7 ? usertypeseventabArray.map(function (v, i) {
              return (
                <li><NavLink to={v.links} className="close-menu" ><div className="sidebar-icon-img">{v.tabimg}</div><p>{v.tabDisplay}</p></NavLink></li>
              )
            }

            )
              : userType == 3?usertype3tabArray.map(function (v, i) {
                return (
                  <li><NavLink to={v.links} className="close-menu" ><div className="sidebar-icon-img">{v.tabimg}</div><p>{v.tabDisplay}</p></NavLink></li>
                )
              }
  
              ): userType == 2?usertype2tabArray.map(function (v, i) {
                return (
                  <li><NavLink to={v.links} className="close-menu" ><div className="sidebar-icon-img">{v.tabimg}</div><p>{v.tabDisplay}</p></NavLink></li>
                )
              }
  
              ):
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
  )
}

export default Sidebar;