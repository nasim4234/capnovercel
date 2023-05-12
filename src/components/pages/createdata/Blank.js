import React, { useEffect, useRef, useState } from "react";





const Blank = () => {

    const user_type = localStorage.getItem('userType');

    if(user_type == 5 || user_type == 6){
        window.location.href = "/go/dashboard" ;
    }else{
        
        window.location.href = "/dashboard";
    }


    return (
        <div>
            
        </div>
    )
}

export default Blank;