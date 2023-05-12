import React, { Component, useState, useEffect, useRef } from 'react';
import { Link, useParams, Router } from 'react-router-dom';
import { Row, Col, Container, Button, ModalHeader, ModalFooter, Modal, ModalBody } from "reactstrap";
import { makeStyles } from "@material-ui/core/styles";
import { Tooltip } from '@material-ui/core';
import Sidebar from '../../component/Sidebar';
import Header from '../../component/Header';
import MaterialTable from 'material-table';
import edit from '../../images/edit.png'
import checks from '../../images/checks.png'
import Cross from '../../images/cross.png';
import Delete from '../../images/delete.png';
import closeicon from '../../images/closeicon.png';
import view from '../../images/eye.png';
import { API_URL } from '../../../config';
import backIcon from "../../images/back.png";

const useStyles = makeStyles(() => ({
    customTooltip: {
      backgroundColor: "black",
      fontSize: "15px"
    }
  }));

const Editgroup = () => {

    const accessToken = localStorage.getItem('accessToken');
    const selectedTrainer = localStorage.getItem('selectedTrainer');
    const [clients, setinclients] = useState([]);
    const [data, setData] = useState([]);
    const [groupName, setGroupName] = useState();
    const [status, setStatus] = useState(0);
    const [statssuccessModal, setstatssuccessModal] = useState(false);
    const statussuccessToggleModal = () => setstatssuccessModal(!statssuccessModal);
    
    const [statusModal, setStatusModal] = useState(false);
    const statusToggleModal = () => setStatusModal(!statusModal);
    const [itemId, setItemId] = useState(null);
    const userId = localStorage.getItem('user_id');
    let _userId = localStorage.getItem('user_id');
    let _trainer = false;
    const [deleteModal, setdeleteModal] = useState(false);
    const deleteToggleModal = () => setdeleteModal(!deleteModal);
    const classes = useStyles();

    useEffect(() => {
        getGroups();

        const interval = setInterval(()=>{
            getGroups();
        },3000);
        return()=> clearInterval(interval);

    }, []);


    const deleteGroup = () => {
        let id = itemId ; 
        fetch(API_URL+"/group/delete/" + id,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': accessToken,
                },
            }
        ).then((response) => {
            if (response.status == 200) {
                getGroups();
                setdeleteModal(!deleteModal)
                
            }
            else if (response.status == 401) {
                logout()
            }
            else {
                console.log("network error")
            }



        })

    }

    const getGroups = () => {



        fetch(API_URL+"/clients?user_id=" + selectedTrainer + "&trainer=" + _trainer + "&user_type=4",

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
                    let _temp = [];
                    resp.clients.map((v, i) => {
                        _temp.push({
                            name: v.firstname,
                            status: v.status == 1 ? "Active" : "Inactive",
                            action: <p> 
                              
                                <Tooltip classes={{
                                tooltip: classes.customTooltip,
                                
                              }} title="Edit" placement="top"><a href={"/edit/group/information/" + v.id} className="downloadimg" ><img src={edit} /></a></Tooltip> <Tooltip classes={{
                                tooltip: classes.customTooltip,
                            }} title={(v.status == 1 ? "Deactivate" : "Activate")}  placement="top"><a  onClick={() => openStatusPopUp(v.id,v.status)} className="downloadimg"><img src={(v.status == 1 ? Cross : checks)}  /></a></Tooltip> <Tooltip classes={{
                                tooltip: classes.customTooltip,
                            
                              }} title="Delete" placement="top"><a  onClick={() => openItemPopUp(v.id, v.firstname)}  className="downloadimg"><img src={Delete} /></a></Tooltip>
                                <Tooltip classes={{
                                tooltip: classes.customTooltip,

                                
                                
                              }} title="View" placement="top"><a href={"/view/group/information/" + v.id} className="downloadimg" ><img src={view} /></a></Tooltip>
                              </p>
                        })
                    })
                    setData(_temp);


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


    const updateGroup = () => {

        let id = itemId;
        let url = API_URL+"/group/activate/" + id ;

        if(status == 1){
            url = API_URL+"/group/deactivateGroup/" + id ;
        }
        fetch(url,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': accessToken,
                },
            }
        ).then((response) => {
            if (response.status == 200) {
                getGroups();
                setStatusModal(!statusModal)
                setstatssuccessModal(true)
            }
            else if (response.status == 401) {
                logout()
            }
            else {
                console.log("network error")
            }



        })
    }

    const openItemPopUp = (id,firstname) => {
        setItemId(id);
        setGroupName(firstname)
        setdeleteModal(!deleteModal)
      
    }

    const openStatusPopUp = (id,status)=>{
        setItemId(id);
        setStatus(status)
        setStatusModal(true)
    }

    const logout = () => {
        localStorage.clear();
        window.location.reload();
    }



    const columns = [
        {
            title: "Name", field: "name"
        },
        {
            title: "Status", field: "status"
        },
        {
            title: <span className="text-right">Actions</span>, field: "action",align: "right"
        }
    ]


    return (
        <div className="">
            <Header />
            <div className="wrp-dashbord">
                <div className="sidebar-section">
                    <Sidebar />
                </div>
                <div className="right-section">
                    <div className="wrp-edittrainerheading">
                       
                        <div className="back-icon-wrp">
                            <Link to="/viewcreate" className="backbtn-icon">
                                <img src={backIcon} alt="backicon" />
                                <span>Back</span>
                            </Link>
                        </div>

                        <div className='edittrainerheadingmobile'><h3>Groups</h3></div>
                        
                    </div>

                    <div className="wrp-bankform">
                        <div style={{ maxWidth: '100%' }}>
                            <MaterialTable
                             
                            options={{
                                search: true,
                                showTitle: true,
                                toolbar: true,
                                pageSize: (data.length > 10  ? 15 : 5),

                                pageSizeOptions:[5,10,20,50,150,200]
                            }}
                                columns={columns}
                                data={data}
                                title="Groups"
                               
                            />

                        </div>
                    </div>
                </div>


                <Modal isOpen={deleteModal} toggle={deleteToggleModal} className="connect-box" centered={true}>
                    <ModalHeader toggle={deleteToggleModal}><span className="ml-1 roititle font-weight-bold">Delete</span></ModalHeader>
                    <ModalBody>
                        <div className="modal-p">
                            <div className="right-circle cancel-circle"><img src={closeicon} /></div>
                            <h4>Are You Sure?</h4>
                            <p>Do you really want to delete <b>“{groupName}”</b> record?</p>
                            <div className="wrp-delete-btn">
                                <div className="cancel-btn1" ><a onClick={deleteToggleModal}>Cancel</a></div>
                                <div className="delete-btn1"><a onClick={deleteGroup}>Delete</a></div>
                            </div>
                        </div>
                    </ModalBody>

                </Modal>

                <Modal isOpen={statusModal} toggle={statusToggleModal} className="connect-box" centered={true}>
                    <ModalHeader toggle={statusToggleModal}><span className="ml-1 roititle font-weight-bold">{(status == 1 ? "Deactivate" : "Activate")}</span></ModalHeader>
                    <ModalBody>
                        <div className="modal-p">
                            {/* <div className="right-circle cancel-circle"><img src={(status == 1 ? Cross : checks)} /></div> */}
                            <h4>Are you sure?</h4>
                            <p>Do you really wish to {(status == 1 ? "deactivate" : "activate")} this Group?</p>
                            <div className="wrp-delete-btn">
                                <div className="cancel-btn1" ><a onClick={statusToggleModal}>Cancel</a></div>
                                <div className="delete-btn1"><a onClick={updateGroup}>{(status == 1 ? "Deactivate" : "Activate")}</a></div>
                            </div>
                        </div>
                    </ModalBody>

                </Modal>
                <Modal isOpen={statssuccessModal} toggle={statussuccessToggleModal} className="connect-box" centered={true}>
                            <ModalHeader toggle={statussuccessToggleModal}><span className="ml-1 roititle font-weight-bold">Successfull</span></ModalHeader>
                            <ModalBody>
                                <div className="modal-p">
                                    <p>Group status updated successfully.</p>
                                </div>
                            </ModalBody>

                        </Modal>
            </div>

        </div>
    )
}

export default Editgroup;