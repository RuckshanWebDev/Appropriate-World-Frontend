import React, { useState, useEffect } from 'react'
import { useAddFriendMutation, useGetSingleProfileQuery, useLazyGetProfileQuery, useRemoveFriendMutation } from '../../features/profileApi'
import Layout from '../../components/Layout'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setProfileId } from '../../features/localSlice'
import { toast } from 'react-toastify'

function SingleProfile() {

    const dispatch = useDispatch()
    const [profile, setProfile] = useState()
    const { profile: myProfile } = useSelector(state => state.local.user)
    const { id } = useParams()
    const getData = useGetSingleProfileQuery({ id })
    const [addFriendFn, addFriendData] = useAddFriendMutation()
    const [removeFriendFn, removeFriendData] = useRemoveFriendMutation()
    const [profileFn, profileData] = useLazyGetProfileQuery()

    const addFriendHandler = async (id) => {
        const popup = toast.loading("Please wait...")

        console.log(profile._id);
        addFriendFn({ id: myProfile.id, friendId: id })

        const data = await profileFn().unwrap()
        console.log(data.data[0]);
        dispatch(setProfileId(data.data[0]))

        toast.update(popup, { render: "Added to Friend List", type: "success", isLoading: false });
        toast.dismiss()
    }

    const removeFriendHandler = async (id) => {

        const popup = toast.loading("Please wait...")

        removeFriendFn({ id: myProfile.id, friendId: id })

        const data = await profileFn().unwrap()
        console.log(data.data[0]);
        dispatch(setProfileId(data.data[0]))

        toast.update(popup, { render: "Removed from Friend List", type: "success", isLoading: false });
        toast.dismiss()

    }


    useEffect(() => {
        if (getData.isSuccess) {
            setProfile(getData.data?.data)
        }
        console.log(getData)
    }, [getData?.data])

    return (
        <Layout>
            <div className="container profile-page-container">
                {getData.isError ?

                    <h2 style={{ textAlign: 'center', alignSelf: 'center', margin: 'auto', padding: '50px' }}> This is a private profile. <br />You cannot access it</h2>
                    :
                    <>
                        <div className="top">
                            <img src={profile?.profile_image === '' ? "/user.png" : profile?.profile_image} alt="" id="profile-img" />
                            <div>
                                <h2>{profile?.name || '-- : --'}</h2>
                                <h3 >{profile?.bio || 'Add your bio'}</h3>
                                <br />
                                {myProfile?.friendList.length ?

                                    myProfile?.friendList.map(i => i._id).includes(id) ?
                                        <button onClick={() => removeFriendHandler(id)} >Disconnect</button>
                                        :
                                        <button onClick={() => addFriendHandler(id)}>  Connect</button>
                                    :
                                    <button onClick={() => addFriendHandler(id)}>Connect</button>
                                }
                                <Link to={`/chat?userId=${id}`} className='link-btn' >Message</Link>
                            </div>
                        </div>
                        <div className="middle">

                            <div style={{ flex: '0 0 100%' }} >
                                <h4> Information</h4>
                                <div className="line"></div>
                                <div className='info-container' >
                                    <div>
                                        <h6>Creator's Name</h6>
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
                                    {/* <div>
                                <h6>Joined at</h6>
                                <h5>{profile?.createdAt?.slice(0, 10) || '-- : --'}</h5>
                            </div> */}
                                </div>

                            </div>
                        </div>
                    </>
                }
            </div>
        </Layout>
    )
}

export default SingleProfile
