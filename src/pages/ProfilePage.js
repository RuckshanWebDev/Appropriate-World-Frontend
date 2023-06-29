import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import './ProfilePage.css'
import { useDispatch, useSelector } from 'react-redux'
import { clearUser, setProfileId, togglePopup } from '../features/localSlice'
import { useLogoutUserMutation } from '../features/userApi'
import { toast } from 'react-toastify'
import { useGetProfileQuery, useLazyGetProfileQuery } from '../features/profileApi'
import ProfileUpdate from '../components/ProfileUpdate'

function ProfilePage() {

    const { popup } = useSelector(state => state.local)
    const [profile, setProfile] = useState(null)
    const dispatch = useDispatch()
    const [logout, dataLogout] = useLogoutUserMutation()
    const [getProfileData, data] = useLazyGetProfileQuery()

    console.log(data);
    /**
     * Logout
     */
    if (dataLogout.isSuccess) {
        dispatch(clearUser())
        toast.success("Logged out")
    }
    if (dataLogout.isError) {
        toast.error("Something went wrong!")
    }
    const logoutHandler = () => {
        logout()
    }


    useEffect(() => {
        getProfileData()
        if (data.data?.data.length) {
            setProfile(data.data.data[0])
            console.log(data);
            dispatch(setProfileId(data.data.data[0]._id))
        } else {
            setProfile(null)
            console.log("empty");
        }

    }, [data.data, popup])


    return (
        <>
            <ProfileUpdate data={data.data?.data[0]} />
            <Layout  >
                <div className="container profile-pagep-container">
                    <div className="top">
                        <img src={profile?.profile_image === '' ? "./user.png" : profile?.profile_image} alt="" id="profile-img" />
                        <div>
                            <h2>{profile?.name || '-- : --'}</h2>
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
                                <h5>{profile?.name || '-- : --'}</h5>
                            </div>
                            <div>
                                <h6>Date of Birth</h6>
                                <h5>{profile?.dob?.slice(0, 10) || '-- : --'}</h5>
                            </div>
                            <div>
                                <h6>Location</h6>
                                <h5>{profile?.address || '-- : --'}</h5>
                            </div>
                            <div>
                                <h6>Profession</h6>
                                <h5>{profile?.profession || '-- : --'}</h5>
                            </div>
                            <div>
                                <h6>Hobby</h6>
                                <h5>{profile?.hobby || '-- : --'}</h5>
                            </div>
                            <div>
                                <h6>Joined at</h6>
                                <h5>{profile?.createdAt.slice(0, 10) || '-- : --'}</h5>
                            </div>
                        </div>

                        <h4>Activities</h4>
                        <div className="line"></div>

                    </div>
                </div>
            </Layout>
        </>
    )
}

export default ProfilePage
