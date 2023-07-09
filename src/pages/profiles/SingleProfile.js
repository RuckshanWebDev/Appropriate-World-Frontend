import React, { useState, useEffect } from 'react'
import { useGetSingleProfileQuery } from '../../features/profileApi'
import Layout from '../../components/Layout'
import { useParams } from 'react-router-dom'

function SingleProfile() {

    const [profile, setProfile] = useState()
    const { id } = useParams()
    const getData = useGetSingleProfileQuery({ id })
    console.log(getData);


    useEffect(() => {
        if (getData.isSuccess) {
            setProfile(getData.data?.data)
        }
    }, [getData?.data])

    return (
        <Layout>
            <div className="container profile-pagep-container">
                <div className="top">
                    <img src={profile?.profile_image === '' ? "/user.png" : profile?.profile_image} alt="" id="profile-img" />
                    <div>
                        <h2>{profile?.name || '-- : --'}</h2>
                        <h3 >Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis error nisi aliquid vero modi asperiores libero dignissimos cum veritatis provident perferendis eum aspernatur, aut delectus atque corporis ex, temporibus consequatur!z</h3>
                        <br />
                        <br />
                    </div>
                </div>
                <div className="middle">

                    <div style={{ flex: '0 0 100%' }} >
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
                </div>
            </div>
        </Layout>
    )
}

export default SingleProfile
