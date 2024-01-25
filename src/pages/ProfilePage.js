import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import './ProfilePage.css'
import { useDispatch, useSelector } from 'react-redux'
import { addNotify, clearUser, setProfileId, togglePopup } from '../features/localSlice'
import { useLogoutUserMutation } from '../features/userApi'
import { toast } from 'react-toastify'
import { useGetProfileQuery, useLazyGetProfileQuery } from '../features/profileApi'
import ProfileUpdate from '../components/ProfileUpdate'
import { useLazyGetotificationQuery } from '../features/chatApi'
import Activity from '../components/Activity'
import { Link } from 'react-router-dom'
import { IoMdSettings } from "react-icons/io";


function ProfilePage() {

    const { popup, user } = useSelector(state => state.local)
    const [profile, setProfile] = useState(null)
    const dispatch = useDispatch()
    const [logout, dataLogout] = useLogoutUserMutation()
    const [getProfileData, data] = useLazyGetProfileQuery()

    // const [getNotificationFn, getNotification] = useLazyGetotificationQuery()


    // if (getNotification.isSuccess && getNotification?.data?.data[0].from.length) {
    //     console.log(getNotification.data);
    //     getNotification.data.data && dispatch(addNotify(getNotification.data?.data))
    // }
    // console.log(getNotification);

    // console.log(data);
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

    const colorChanger = (e) => {
        console.log(e.target.dataset.color);
        document.documentElement.style.setProperty('--color-purple', e.target.dataset.color);

    }


    useEffect(() => {

        getProfileData()
        if (data.isSuccess) {
            setProfile(data.data.data[0])
            dispatch(setProfileId(data.data.data[0]))
            console.log(data);
        } else {
            setProfile(null)
            console.log("empty");
        }

        // getNotificationFn()
    }, [popup, data.data])

    useEffect(() => {
        const params = window.location.search?.replace('?', '').split('=')
        if (params[0] === 'editProfile' && params[1] === 'true') {
            dispatch(togglePopup())
        }
    }, [])

    return (
        <>
            <ProfileUpdate data={data.data?.data[0]} />
            <Layout loader={data.isLoading}  >
                <div className="container profile-page-container">

                    <div className="color-container">
                        <div className="current-color"></div>
                        <div className="color-box">
                            <div className="color-option" id='color-1' data-color='#FBB924' onClick={colorChanger}></div>
                            <div className="color-option" id='color-2' data-color='#FF2E56' onClick={colorChanger}></div>
                            <div className="color-option" id='color-3' data-color='#F37F2C' onClick={colorChanger}></div>
                            <div className="color-option" id='color-4' data-color='#5E58EC' onClick={colorChanger}></div>
                            <div className="color-option" id='color-5' data-color='#05A2E9' onClick={colorChanger}></div>
                            <div className="color-option" id='color-6' data-color='#F3432C' onClick={colorChanger}></div>
                        </div>
                    </div>

                    <div className="top">
                        <div>
                            {
                                profile?.isPremium ?
                                    profile?.accountType === 'EMERALD' ?
                                        <Link to={'/packages'} id='account-type'>
                                            <img src="./card/emerald.gif" alt="" />
                                        </Link>
                                        :
                                        <Link to={'/packages'} id='account-type' >
                                            <img src="./card/ONYX.gif" alt="" />
                                        </Link>

                                    :
                                    <Link to={'/packages'} id='account-type'>
                                        <img src="./card/VIOLET.gif" alt="" />
                                    </Link>

                            }
                            {
                                profile?.profile_image ?
                                    <img src={profile?.profile_image} key={profile?.profile_image} alt="" id="profile-img" />
                                    :
                                    <img src="./user.png" alt="" id="profile-img" />
                            }
                        </div>
                        <div>
                            <h2>{profile?.name || '-- : --'}</h2>
                            <h3 >{profile?.bio || 'Add your bio'}</h3>
                            <br />
                            <br />
                            <button onClick={() => dispatch(togglePopup())} >Edit Profile</button>
                            <button onClick={logoutHandler} >Logout</button>
                        </div>

                        <div style={{ width: '100%' }}>
                            <h4> Information</h4>
                            <div className="line"></div>
                            <div className='info-container' >
                                <div>
                                    <h6>Creator's Name</h6>
                                    <h5>{profile?.name || '-- : --'}</h5>
                                </div>
                                <div>
                                    <h6>Sign</h6>
                                    <h5>{profile?.dob || '-- : --'}</h5>
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
                                    <h6>Interests/Credits</h6>
                                    <h5>{profile?.hobby || '-- : --'}</h5>
                                </div>
                                <div>
                                    <h6>Joined at</h6>
                                    <h5>{profile?.createdAt.slice(0, 10) || '-- : --'}</h5>
                                </div>
                            </div>
                        </div>
                        <Link to={'/settings'} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }} >
                            <IoMdSettings style={{ color: '#d8e6fe', fontSize: '32px' }} /> <span style={{ fontSize: '24px' }} >Account Settings</span>
                        </Link>


                    </div>

                    <div className="middle">


                        <div >
                            <h4>Activities</h4>
                            <div className="line"></div>
                            <Activity />
                        </div>

                    </div>

                </div>
            </Layout>
        </>
    )
}

export default ProfilePage
