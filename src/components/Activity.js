import React, { useEffect, useRef, useState } from 'react'
import './activity.css'
import { BsImage } from 'react-icons/bs'
import { AiOutlineGif } from 'react-icons/ai'
import { FaVideo } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { TbMessageCircle2 } from 'react-icons/tb'
import { FaRetweet } from 'react-icons/fa'
import { AiOutlineHeart } from 'react-icons/ai'
import { ImBin2 } from 'react-icons/im'
import { useCommentTweetMutation, useCreateTweetMutation, useDeleteTweetMutation, useGetAllTweetsQuery, useLikeTweetMutation } from '../features/forumApi'
import Loader from './Loader'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'


function Activity() {

    // React
    const { user } = useSelector(state => state.local)

    const imagePreviewRef = useRef()
    const videoPreviewRef = useRef()
    const submitRef = useRef()
    const [fileData, setFileData] = useState({ type: '', file: '' })
    const [tweets, setTweets] = useState([])
    const [feed, setFeed] = useState([])

    // API
    const [createFn, createData] = useCreateTweetMutation()
    const [likeFn, likeData] = useLikeTweetMutation()
    const [deleteFn, deleteData] = useDeleteTweetMutation()
    const [commentFn, commentData] = useCommentTweetMutation()
    const allTweet = useGetAllTweetsQuery()

    // Fetch
    const fetchData = () => {

        if (createData.isSuccess) {
            const newList = [...feed]
            newList.splice(0, 0, createData.data.data,)
            setFeed([])
        }

        if (allTweet.isSuccess) {
            setFeed(allTweet.data.data)
        }

    }

    // Media
    const mediaHandler = (e, type) => {

        if (type === 'image' || type === 'gif') {

            // CSS
            imagePreviewRef.current.style.display = 'block'
            videoPreviewRef.current.style.display = 'none'

            // DOM
            imagePreviewRef.current.src = window.URL.createObjectURL(e.target.files[0])

            // Set State
            setFileData({ type: type, file: e.target?.files[0] })

            // Clear Value
            e.target.value = ''

        } else if (type === 'video') {

            // CSS
            imagePreviewRef.current.style.display = 'none'
            videoPreviewRef.current.style.display = 'block'

            // DOM
            videoPreviewRef.current.src = window.URL.createObjectURL(e.target.files[0])

            // Set State
            setFileData({ type: type, file: e.target?.files[0] })

            // Clear Value
            e.target.value = ''


        }

    }

    // Form
    const activityFormHandler = async (e) => {

        e.preventDefault()

        if (fileData.file) {
            const data = new FormData()
            data.append('file', fileData.file)
            data.append('upload_preset', 'profile_images')

            var cloudinaryUrl = fileData.type === 'video' ? 'https://api.cloudinary.com/v1_1/dts5uxlug/video/upload' : 'https://api.cloudinary.com/v1_1/dts5uxlug/image/upload'

            const responce = await fetch(cloudinaryUrl, {
                method: "POST",
                body: data
            })
            const result = await responce.json()

            const res = await createFn({
                text: e.target.text.value,
                mediaType: fileData.type,
                mediaLink: result.secure_url
            }).unwrap()
            e.target.reset()

        } else {

            const res = await createFn({
                text: e.target.text.value
            }).unwrap()

            var newObj = { ...res.data }
            console.log(newObj);
            newObj.author = user.profile
            setFeed([newObj, ...feed])
        }

        setFileData({ type: '', file: '' })
        e.target.reset()
        imagePreviewRef.current.style.display = 'none'
        videoPreviewRef.current.style.display = 'none'


    }

    // Likes
    const likeHandler = (e) => {

        const node = e.target.parentNode.localName === 'svg' ? e.target.parentNode.dataset : e.target.dataset

        likeFn({ id: node.id, liked: node.liked })

        // UI Changes
        const likedArray = feed.map(i => {

            if (i._id === node.id) {

                const newObj = { ...i }
                newObj.likes = [...newObj.likes]
                node.liked === 'true' ?
                    newObj.likes.indexOf(user?.profileId) > -1 && newObj.likes.splice(newObj.likes.indexOf(user?.profileId, 1))
                    :
                    newObj.likes.push(user?.profileId)
                return newObj
            }
            return i
        })

        console.log(likedArray);
        setFeed(likedArray)
    }

    // comment
    const commentHandler = (e) => {

        const node = e.target.parentNode.localName !== 'svg' ? e.target : e.target.parentNode

        if (node.parentNode.parentNode.nextSibling.style.height === '' || node.parentNode.parentNode.nextSibling.style.height === '0px') {
            node.parentNode.parentNode.nextSibling.style.height = 'max-content'
        } else {
            node.parentNode.parentNode.nextSibling.style.height = '0px'
        }

    }
    const commentHandlerReq = (e) => {
        e.preventDefault()

        commentFn({ id: e.target.dataset.id, data: { comment: e.target.name.value, commetedUser: user.profileId } })

        e.target.reset()
    }

    console.log(commentData);

    // Delete
    const deleteTweet = async (e) => {
        const popup = toast.loading("Please wait...")

        const id = e.target.parentNode.localName === 'svg' ? e.target.parentNode.dataset.id : e.target.dataset.id

        await deleteFn({ id }).unwrap()

        toast.update(popup, { render: "Successfully Deleted", type: "success", isLoading: false });
        toast.dismiss()

        fetchData()

        const filteredArray = feed.filter(i => i._id !== id)
        setFeed(filteredArray)
    }

    // useEffect
    useEffect(() => {
        fetchData()
    }, [createData.data, allTweet.data])

    return (
        <>
            <div className='activity-container' >
                <img className='avatar' src="/user.png" alt="" />

                <form className='activity-form' onSubmit={activityFormHandler} >
                    <textarea name="text" id="" cols="30" rows="4" placeholder="What's happening?" minLength={5} ></textarea>
                    <img src="" alt="" className="image-preview" ref={imagePreviewRef} />
                    <video controls src="" alt="" className="video-preview" ref={videoPreviewRef} ></video>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }} >
                        <div className='activity-icons' >
                            <label htmlFor="image">
                                <input onChange={(e) => mediaHandler(e, 'image')} type="file" src="" alt="" id='image' accept="image/png, image/jpeg" style={{ display: 'none' }} />
                                <BsImage />
                            </label>
                            <label htmlFor="gif">
                                <input onChange={(e) => mediaHandler(e, 'gif')} type="file" src="" alt="" id='gif' accept="image/gif" style={{ display: 'none' }} />
                                <AiOutlineGif />
                            </label>
                            <label htmlFor="video">
                                <input onChange={(e) => mediaHandler(e, 'video')} type="file" src="" alt="" id='video' accept="video/mp4,video/x-m4v,video/*" style={{ display: 'none' }} />
                                <FaVideo />
                            </label>
                        </div>
                        <button ref={submitRef} type='submit'> {createData.isLoading ? 'Posting...' : "Post"} </button>
                    </div>
                </form>

            </div>
            <div style={{ maxHeight: '1000px', overflowY: 'scroll' }} >

                {
                    !feed.length ?
                        <Loader custom={{ width: '100%', textAlign: 'center', marginTop: '30px' }} />
                        :

                        feed.map((item, index) => {


                            return (<div className="tweetbox" key={index} >
                                <Link to={`/profile/${item.author._id}`}>
                                    <img className='avatar' src={item.author.profile_image || "/user.png"} alt="" />
                                </Link>
                                <div className='tweet-content'>
                                    {item.author._id === user?.profileId && <ImBin2 data-id={item._id} onClick={deleteTweet} style={{ position: 'absolute', top: '10px', right: '10px' }} />}
                                    <Link to={`/profile/${item.author._id}`}>
                                        <h6>{item.author.name} <span>@{item.author.name}</span> </h6>
                                    </Link>
                                    <p>{item.text} </p>
                                    {item.mediaLink &&
                                        item.mediaType === 'video' ?
                                        <video controls autoPlay muted src={item.mediaLink} alt="" className="video-preview-tweet" ></video>
                                        :
                                        <img className='tweet-image' src={item.mediaLink} alt="" />
                                    }
                                    <div   >
                                        <div className=' tweet-utils'>
                                            <AiOutlineHeart style={item.likes.includes(user?.profileId) ? { color: '#e53939' } : { color: "#fff" }} data-liked={item.likes.includes(user?.profileId)} data-id={item._id} onClick={likeHandler} />
                                            <span className='tweet-span'> {item.likes.length} </span>
                                        </div>
                                        <div className=' tweet-utils'>
                                            <TbMessageCircle2 onClick={commentHandler} />
                                            <span className='tweet-span'>{item.comments.length}</span>
                                        </div>

                                    </div>
                                    <div className="comment-box">
                                        <form data-id={item._id} onSubmit={commentHandlerReq} >
                                            <input type="text" name="name" id="" />
                                            <input type="submit" value='Comment' id="" />
                                        </form>
                                        {
                                            item.comments.map(com => {
                                                return <div className='comment-list'>
                                                    <img className='avatar' src={com.commetedUser.profile_image || "/user.png"} alt="" />
                                                    <p>{com.comment}</p>
                                                </div>
                                            })

                                        }

                                    </div>
                                </div>


                            </div>
                            )

                        })

                    // <>
                    //     <div className="tweetbox">
                    //         <img className='avatar' src="/user.png" alt="" />
                    //         <div className='tweet-content'>
                    //             <h1>Ruckshan <span>@ruckshan</span> </h1>
                    //             <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae rerum ullam quos. Quibusdam neque non fuga quaerat? Beatae accusantium esse, nisi blanditiis facere illo! Non labore minima quis eos dolores.</p>

                    //             <div   >
                    //                 <div className=' tweet-utils'>
                    //                     <AiOutlineHeart />
                    //                     <span className='tweet-span'>57</span>
                    //                 </div>
                    //                 <div className=' tweet-utils'>
                    //                     <FaRetweet />
                    //                     <span className='tweet-span'>120</span>
                    //                 </div>
                    //                 <div className=' tweet-utils'>
                    //                     <TbMessageCircle2 />
                    //                     <span className='tweet-span'>80</span>
                    //                 </div>
                    //                 <div className='  tweet-utils'>

                    //                 </div>
                    //             </div>
                    //         </div>
                    //     </div>

                    //     <div className="tweetbox">
                    //         <img className='avatar' src="/user.png" alt="" />
                    //         <div className='tweet-content'>
                    //             <h1>Ruckshan <span>@ruckshan</span> </h1>
                    //             <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae rerum ullam quos. Quibusdam neque non fuga quaerat? Beatae accusantium esse, nisi blanditiis facere illo! Non labore minima quis eos dolores.</p>
                    //             <img className='tweet-image' src="/image.png" alt="" />
                    //             <div   >
                    //                 <div className=' tweet-utils'>
                    //                     <AiOutlineHeart />
                    //                     <span className='tweet-span'>57</span>
                    //                 </div>
                    //                 <div className=' tweet-utils'>
                    //                     <FaRetweet />
                    //                     <span className='tweet-span'>120</span>
                    //                 </div>
                    //                 <div className=' tweet-utils'>
                    //                     <TbMessageCircle2 />
                    //                     <span className='tweet-span'>80</span>
                    //                 </div>
                    //                 <div className='  tweet-utils'>

                    //                 </div>
                    //             </div>
                    //         </div>
                    //     </div>
                    // </>

                }


                {/* {
                    tweets.length ?
                        tweets.map((item, index) => {

                            return (<div className="tweetbox" key={index} >
                                <img className='avatar' src={user.profile.profile_image || "/user.png"} alt="" />
                                <div className='tweet-content'>
                                    {item.author === user.profileId && <ImBin2 data-id={item._id} onClick={deleteTweet} style={{ position: 'absolute', top: '10px', right: '10px' }} />}
                                    <h6>{user.profile.name} <span>@{user.profile.name}</span> </h6>
                                    <p>{item.text} </p>
                                    {item.mediaLink &&
                                        item.mediaType === 'video' ?
                                        <video controls src={item.mediaLink} alt="" className="video-preview-tweet" ></video>
                                        :
                                        <img className='tweet-image' src={item.mediaLink} alt="" />
                                    }
                                    <div   >
                                        <div className=' tweet-utils'>
                                            <AiOutlineHeart style={item.likes.includes(user.profileId) ? { color: '#e53939' } : { color: "#fff" }} data-liked={item.likes.includes(user.profileId)} data-id={item._id} onClick={likeHandler} />
                                            <span className='tweet-span'> {item.likes.length} </span>
                                        </div>
                                        <div className=' tweet-utils'>
                                            <TbMessageCircle2 onClick={commentHandler} />
                                            <span className='tweet-span'>{item.comments.length}</span>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            )

                        })
                        :

                        ''
                } */}

            </div>

        </>
    )
}


export default Activity
