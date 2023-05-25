import React from 'react'
import { useLocation } from 'react-router-dom'
import Otp from "../../../components/landing/otpVerification/Otp"


const OTPverification = () => {

    const location = useLocation() 
    const {user,id,email} = location.state
    const handleSubmit = (email,pass)=>{

    }

    return (
        <div>
        <Otp user={user} id={id}/>
        </div>
    )
}

export default OTPverification
