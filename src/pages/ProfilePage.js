import React, { useEffect } from 'react'
import Layout from '../components/Layout'

import './ProfilePage.css'
import { useDispatch } from 'react-redux'
import { clearUser, togglePopup } from '../features/localSlice'
import { useLogoutUserMutation } from '../features/userApi'
import { toast } from 'react-toastify'
import { useGetProfileQuery } from '../features/profileApi'

function ProfilePage() {

    const dispatch = useDispatch()
    const [logout, dataLogout] = useLogoutUserMutation()
    const getProfileData = useGetProfileQuery()
    console.log(getProfileData);

    const logoutHandler = () => {
        logout()
    }

    useEffect(() => {
        if (dataLogout.isSuccess) {
            dispatch(clearUser())
            toast.success("Logged out")
        }
        if (dataLogout.isError) {
            toast.error("Something went wrong!")
        }

        // getProfile()


    }, [dataLogout])


    return (
        <Layout >
            <div className="container profile-pagep-container">
                <div className="top">
                    <img src="./user.png" alt="" id="profile-img" />
                    <div>
                        <h2>Name</h2>
                        <button onClick={() => dispatch(togglePopup())} >Edit Profile</button>
                        <button onClick={logoutHandler} >Logout</button>
                    </div>
                </div>
                <div className="middle">
                    <h4> Information</h4>
                    <div className="line"></div>
                    <div className='info-container' >
                        <div>
                            <h6>Name</h6>
                            <h5>Your name</h5>
                        </div>
                        <div>
                            <h6>Date of Birth</h6>
                            <h5>03 .03. 2000</h5>
                        </div>
                        <div>
                            <h6>Address</h6>
                            <h5>Your address</h5>
                        </div>
                        <div>
                            <h6>Profession</h6>
                            <h5>Your Profession</h5>
                        </div>
                        <div>
                            <h6>Hobby</h6>
                            <h5>Cricket, FootBall</h5>
                        </div>
                        <div>
                            <h6>Joined at</h6>
                            <h5>03. 06. 2023</h5>
                        </div>
                    </div>

                    <h4>Activities</h4>
                    <div className="line"></div>

                </div>
            </div>
        </Layout>
    )
}

export default ProfilePage
