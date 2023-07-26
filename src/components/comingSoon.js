import React from 'react'
import './ComingSoon.css'
import { toast } from 'react-toastify';

function ComingSoon() {

    const formHandler = async (e) => {
        e.preventDefault()
        console.log(e.target.email.value);

        try {
            const response = await fetch('https://appropriate-world-backend.onrender.com/api/email/', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: e.target.email.value })
            })
            const data = await response.json()
            console.log(data);
            if (data.message === "Success") {
                toast.success("Successfully added to waitlist")
            } else if (data.message === "Internal Server Error" || data.message === 'Invald Email') {
                throw new Error()
            }
        } catch (err) {
            toast.error("Invalid email or Already exist.")
            console.log(err);
        }
    }

    return (
        <div className='coming-container' >
            <div>
                <div className="logos">
                    {/* <video src="./logo-squre.mp4" muted loop ></video> */}
                    <video src="./logo3.mp4" autoPlay
                        loop
                        playsInline muted ></video>
                </div>
                <form onSubmit={formHandler} >
                    <input type="email" name="email" id="" placeholder='Email' required />
                    <button type='submit' >Join the Waitlist</button>
                </form>
            </div>
        </div>
    )
}

export default ComingSoon
