import React from 'react'
import Layout from '../components/Layout'
import { useGetContactQuery } from '../features/blogApi'
import './community.css'
import { useDispatch, useSelector } from 'react-redux'
import { useAddFriendMutation, useLazyGetProfileQuery, useRemoveFriendMutation } from '../features/profileApi'
import { useEffect } from 'react'
import { setProfileId } from '../features/localSlice'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

function CommunityPage() {

    const dispatch = useDispatch()
    const { data } = useGetContactQuery()
    const { profile } = useSelector(state => state.local.user)

    const [addFriendFn, addFriendData] = useAddFriendMutation()
    const [removeFriendFn, removeFriendData] = useRemoveFriendMutation()
    const [profileFn, profileData] = useLazyGetProfileQuery()
    console.log(profileData);

    // setProfileId

    const addFriendHandler = async (id) => {
        const popup = toast.loading("Please wait...")

        console.log(profile._id);
        addFriendFn({ id: profile._id, friendId: id })

        const data = await profileFn().unwrap()
        console.log(data.data[0]);
        dispatch(setProfileId(data.data[0]))

        toast.update(popup, { render: "Added to Friend List", type: "success", isLoading: false });
        toast.dismiss()
    }

    const removeFriendHandler = async (id) => {

        const popup = toast.loading("Please wait...")

        removeFriendFn({ id: profile._id, friendId: id })

        const data = await profileFn().unwrap()
        console.log(data.data[0]);
        dispatch(setProfileId(data.data[0]))

        toast.update(popup, { render: "Removed from Friend List", type: "success", isLoading: false });
        toast.dismiss()

    }

    useEffect(() => {

    }, [])

    return (
        <Layout>

            <div className="container community-container">

                {
                    data?.data.map((item, index) => {
                        return (
                            <div className="community-member" key={index}>
                                <Link to={`/profile/${item._id}`} >
                                    <img className='avatar' src={item.profile_image || "/user.png"} alt="" />
                                </Link>
                                <div>
                                    <h1>{item.name}</h1>
                                    <h6>{item.profession} &nbsp;</h6>
                                    <p>{item.bio}&nbsp;</p>
                                    {profile?.friendList.length ?

                                        profile.friendList.map(i => i._id).includes(item._id) ?
                                            <button onClick={() => removeFriendHandler(item._id)} >Unfollow</button>
                                            :
                                            <button onClick={() => addFriendHandler(item._id)}>  Follow</button>
                                        :
                                        <button onClick={() => addFriendHandler(item._id)}>Follow</button>
                                    }
                                </div>


                            </div>
                        )
                    })
                }

                {/* <div className="community-member">
                    <img className='avatar' src="/user.png" alt="" />
                    <div>
                        <h1>Ruckshan</h1>
                        <h6>profession</h6>
                    </div>
                    <button>Follow</button>
                </div> */}

            </div>

        </Layout>
    )
}

export default CommunityPage
