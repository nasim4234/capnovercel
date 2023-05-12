import React, { useEffect, useState, useRef } from "react";
import { Row, Col, Container, Button, ModalHeader, ModalFooter, Modal, ModalBody } from "reactstrap";
import { DATA_URL } from "../../../config/index";


import ReactTooltip from 'react-tooltip';

import moment from 'moment';


const Audiocomponent = ({ audiadata }) => {

    const [audioRef ,setAudioRef] = useState(0);

    useEffect(() => {
        // if(audiadata.length > 0 ){
        //     setAudioRef(0)
        // }
        

    }, [audiadata,audioRef]);




const handleRefChange = (e) => {
    console.log(e.target.value)
    setAudioRef(e.target.value)
}



    return (
        <div>
            {
                audiadata.length == 0 &&
                <div className="text-center" >No Audio Notes Available</div>
            }
            <ul className="audiolist">
            { 
            audiadata.length > 0 &&
                <select onChange={(e) => handleRefChange(e)} className="form-control mb-3">
                {
                     audiadata.map((val, i) => {
                        return(
                            <option value={i}>Audio Note {i+1} -- {moment(val.ref / 1000).format('HH:mm:ss')}</option>                            
                        )
                    })
                
                }
                </select>
}
                {   
                    audiadata.length > 0 && audiadata.map((val, i) => {
                        if(audioRef == i){
                                
                        return (
                           
                            <li  >
                              <ReactTooltip />
                                  
                                    <audio controls controlsList="nodownload noplaybackrate">
                                    <source src={DATA_URL + val.sessiondata} type="audio/wav" />
                                </audio>
                                
                               
                                <a href={DATA_URL + val.sessiondata} download data-tip="Download"><i class="fa fa-download" aria-hidden="true"></i></a>
                            </li>
                         )
                     } 

                     }) 
                 } 

            </ul>
        </div>
    )
}

export default Audiocomponent;