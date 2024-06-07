import React, { useState } from 'react'
import Layout from '../components/Layout'
import { useGetContactQuery } from '../features/blogApi'
import './community.css'
import { useDispatch, useSelector } from 'react-redux'
import { useAddFriendMutation, useLazyGetProfileQuery, useRemoveFriendMutation } from '../features/profileApi'
import { useEffect } from 'react'
import { setProfileId } from '../features/localSlice'
import { toast } from 'react-toastify'
import { Link, useLocation } from 'react-router-dom'
import { Box, TextField } from '@radix-ui/themes'

function CommunityPage() {

    // const { search } = useLocation()
    const dispatch = useDispatch()
    const { data } = useGetContactQuery()
    const { profile } = useSelector(state => state.local.user)

    const [addFriendFn, addFriendData] = useAddFriendMutation()
    const [removeFriendFn, removeFriendData] = useRemoveFriendMutation()
    const [profileFn, profileData] = useLazyGetProfileQuery()
    // console.log(profileData);

    const [list, setList] = useState([])

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

    const clearSearch = () => {
        if (list.length !== data.data.length) {
            console.log('clear', data.data);
            setList([...data.data]);
        }
    }

    const formHandler = (e) => {

        e.preventDefault()

        let str = e.type === 'submit' ? e.target.form.value : e.target.value

        if (!str) {
            clearSearch()
        } else {
            const result = [...list]
            console.log(result);
            let filteredResult = result.filter(i => {
                return i.name.toLowerCase().includes(str.toLowerCase())
            })
            setList([...filteredResult])
        }
    }

    useEffect(() => {

        if (data?.message === 'Success') {
            // if(search){
            //     foo.slice(1).split(';').filter(i => i.includes('page'))[0].split('=')[1] * 1
            // }
            setList(data.data);
        }



    }, [data])

    return (
        <Layout>
            <form className="search-container" onSubmit={formHandler}>
                <input type="text" name='form' onChange={formHandler} placeholder='Search...' />
                <input type="submit" name="" id="" value='Search' />
            </form>
            <div className="container community-container">
                {
                    list.map((item, index) => {
                        return (
                            <div className="community-member" key={index}>
                                <Link to={`/profile/${item._id}`} >
                                    <img className='avatar' src={item.profile_image || "/user.png"} alt="" />
                                </Link>
                                <div>
                                    <Link to={`/profile/${item._id}`} >
                                        <h1>{item.name}</h1>
                                    </Link>
                                    <h6>{item.profession} &nbsp;</h6>
                                    <p>{item.bio}&nbsp;</p>
                                    {profile?.friendList.length ?

                                        profile.friendList.map(i => i._id).includes(item._id) ?
                                            <button onClick={() => removeFriendHandler(item._id)} >Disconnect</button>
                                            :
                                            <button onClick={() => addFriendHandler(item._id)}>  Connect</button>
                                        :
                                        <button onClick={() => addFriendHandler(item._id)}>Connect</button>
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
