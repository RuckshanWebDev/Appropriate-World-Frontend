import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import './ProfilePage.css'
import { useDispatch, useSelector } from 'react-redux'
import { addNotify, clearUser, setProfileId, togglePopup } from '../features/localSlice'
import { useLogoutUserMutation } from '../features/userApi'
import { toast } from 'react-toastify'
import { useGetProfileQuery, useLazyGetProfileQuery } from '../features/profileApi'
import ProfileUpdate from '../components/ProfileUpdate'
import { useGetotificationQuery } from '../features/chatApi'

function ProfilePage() {

    const { popup } = useSelector(state => state.local)
    const [profile, setProfile] = useState(null)
    const dispatch = useDispatch()
    const [logout, dataLogout] = useLogoutUserMutation()
    const [getProfileData, data] = useLazyGetProfileQuery()

    const getNotification = useGetotificationQuery()
    if (getNotification.isSuccess) {
        dispatch(addNotify(getNotification.data.data))
    }
    console.log(getNotification);

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
    if (data.isError) {
        toast.error("Something went wrong!")
    }
    const logoutHandler = () => {
        logout()
    }


    useEffect(() => {
        data.isFetching || getProfileData()
        if (data.data?.data.length) {
            setProfile(data.data.data[0])
            console.log(data);
            dispatch(setProfileId(data.data.data[0]._id))
        } else {
            setProfile(null)
            console.log("empty");
        }

    }, [popup, data.isSuccess])


    return (
        <>
            <ProfileUpdate data={data.data?.data[0]} />
            <Layout  >
                <div className="container profile-pagep-container">
                    <div className="top">
                        <img src={profile?.profile_image === '' ? "./user.png" : profile?.profile_image} alt="" id="profile-img" />
                        <div>
                            <h2>{profile?.name || '-- : --'}</h2>
                            <h3 >Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis error nisi aliquid vero modi asperiores libero dignissimos cum veritatis provident perferendis eum aspernatur, aut delectus atque corporis ex, temporibus consequatur!z</h3>
                            <br />
                            <br />
                            <button onClick={() => dispatch(togglePopup())} >Edit Profile</button>
                            <button onClick={logoutHandler} >Logout</button>
                        </div>
                    </div>
                    <div className="middle">

                        <div>
                            <h4> Information</h4>
                            <div className="line"></div>
                            <div className='info-container' >
                                <div>
                                    <h6>Name</h6>
                                    <h5>{profile?.name || '-- : --'}</h5>
                                </div>
                                <div>
                                    <h6>Sign</h6>
                                    <h5>{profile?.dob?.slice(0, 10) || '-- : --'}</h5>
                                </div>
                                <div>
                                    <h6>Location</h6>
                                    <h5>{profile?.address || '-- : --'}</h5>
                                </div>
                                <div>
                                    <h6>Creator Type</h6>
                                    <h5>{profile?.profession || '-- : --'}</h5>
                                </div>
                                <div>
                                    <h6>Interests</h6>
                                    <h5>{profile?.hobby || '-- : --'}</h5>
                                </div>
                                <div>
                                    <h6>Joined at</h6>
                                    <h5>{profile?.createdAt.slice(0, 10) || '-- : --'}</h5>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h4>Activities</h4>
                            <div className="line"></div>
                        </div>

                    </div>
                </div>
            </Layout>
        </>
    )
}

export default ProfilePage
