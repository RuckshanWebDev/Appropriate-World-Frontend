import React, { useEffect, useState, useRef } from 'react'
import { AiOutlineSend } from 'react-icons/ai'
import Layout from '../components/Layout'
import './ChatPage.css'
import { useGetContactQuery } from '../features/blogApi'
import { useGetCoupleChatQuery, useGetotificationQuery, useLazyGetCoupleChatQuery, useSendMessageMutation } from '../features/chatApi'
import { toast } from 'react-toastify'
import io from "socket.io-client";
import { useDispatch, useSelector } from 'react-redux'
import { addNotify } from '../features/localSlice'
import ScrollableFeed from 'react-scrollable-feed'
import { Link } from 'react-router-dom'
import { RiCloseCircleFill } from 'react-icons/ri'
import { FaAngleRight } from 'react-icons/fa'

function ChatPage() {

    const dispatch = useDispatch()
    const messageContainerRef = useRef()
    const { profileId } = useSelector(state => state.local.user)
    const { data } = useGetContactQuery()
    const [getChat, chatData] = useLazyGetCoupleChatQuery()
    const [sendMessageApi, sendMessageData] = useSendMessageMutation()
    const [contactId, setContactId] = useState(null)
    const [user, setUser] = useState(null)
    const [chat, setChat] = useState([])
    const [socket, setSocket] = useState(null)
    const [roomId, setRoomId] = useState(null)
    const [allContact, setAllContact] = useState(null)
    const [sideOpen, setSideOpen] = useState(false)

    if (chatData.isError) {
        toast.error("Something went wrong, Please try again later!")
    }
    const getNotification = useGetotificationQuery()
    if (getNotification.isSuccess && getNotification.data.data?.length) {
        console.log("noti");
        dispatch(addNotify(getNotification.data.data))
    }
    const sendMessage = (e) => {

        e.preventDefault()
        // sendMessageApi({
        //     reciever: contactId,
        //     message: e.target.message.value
        // })

        socket.emit('sendMessage',
            {
                sender: profileId,
                reciever: contactId,
                message: e.target.message.value
            }, roomId)

        // Send to backend
        socket.emit('addNotification', contactId, profileId)


        e.target.message.value = ''
    }

    const contactToggle = async (e) => {

        setSideOpen(!sideOpen)


        if (e.target.dataset.id) {
            setContactId(e.target.dataset.id)

            const chatHistory = await getChat({ id: e.target.dataset.id }).unwrap()
            setChat(chatHistory?.data)

            const filteredUser = data?.data.filter(i => i._id === e.target.dataset.id)
            setUser(filteredUser[0])

            // if (chatData.isSuccess) {
            //     setChat(chatData.data?.data)
            // }

            // Read Message send to Backend
            socket.emit('removeNotification', profileId, contactId)
            socket?.once(`removeNotification${profileId}`, (data) => {
                console.log("removedata", data);
                dispatch(addNotify([data]))
            })

        }
    }

    socket?.on(`    ${contactId}`, (data) => {
        console.log(data);
        dispatch(addNotify([data]))
    })

    socket?.once(`removeNotification${profileId}`, (data) => {
        console.log("removedata", data);
        dispatch(addNotify([data]))
    })

    var newMessage
    socket?.once('message', (data) => {
        newMessage = data._id
        console.log(data._id === newMessage);
        const lastMessage = data

        if (lastMessage.sender === profileId) {
            // It is our message
            console.log('It is our message');
            setChat(oldState => [...oldState, data])
        } else if (lastMessage.sender === contactId && lastMessage.reciever === profileId) {
            // This message to us
            console.log('This message to us');
            setChat(oldState => [...oldState, data])

        } else if (lastMessage._id && lastMessage.sender !== contactId) {
            // Notify
            console.log('notify');
        }
    })

    useEffect(() => {
        console.log('........');

        // Set all contact
        setAllContact(data?.data)
        const newSocket = socket || io(process.env.NODE_ENV === "production" ? 'https://appropriate-world-backend.onrender.com' : 'http://localhost:5000', { transports: ['websocket'] })
        setSocket(newSocket)

    }, [data?.data, chatData.data?.data])

    return (
        <Layout>
            <div className="container chat-container">

                <div className="contact-container">

                    <h4 className='contact-title' >Community</h4>
                    {
                        allContact?.map((contact, index) => {
                            if (contact._id === profileId) return
                            return (
                                <div key={index} data-id={contact._id} className="contact-item" onClick={contactToggle} >
                                    <img data-id={contact._id} src={contact?.profile_image || "./user.png"} alt="" className="avatar" />
                                    <div>
                                        <Link to={`/profile/${contact?._id}`} style={{ textDecoration: 'none' }} >
                                            <h3 data-id={contact._id} className="text-color">{contact?.name}</h3>
                                        </Link>
                                        <span>{contact.profession || '-- : --'}</span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

                <div className="contact-container-mobile" style={{ transform: sideOpen ? 'translateX(-100%)' : 'translateX(0)' }}>

                    <div className='side-clip-icon' >
                        <FaAngleRight onClick={() => setSideOpen(!sideOpen)} />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between' }} >
                        <h4 className='contact-title' >Community</h4>
                        <RiCloseCircleFill onClick={() => setSideOpen(!sideOpen)} style={{ width: '30px', height: '30px', margin: '15px 15px 0 0' }} />
                    </div>
                    {
                        allContact?.map((contact, index) => {
                            if (contact._id === profileId) return
                            return (
                                <div key={index} data-id={contact._id} className="contact-item" onClick={contactToggle} >
                                    <img data-id={contact._id} src={contact?.profile_image || "./user.png"} alt="" className="avatar" />
                                    <div>
                                        <Link to={`/profile/${contact?._id}`} style={{ textDecoration: 'none' }} >
                                            <h3 data-id={contact._id} className="text-color">{contact?.name}</h3>
                                        </Link>
                                        <span>{contact.profession || '-- : --'}</span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

                <div className="chatbox-container">
                    {
                        contactId &&
                        <>
                            <div className="details-container">
                                <div className="contact-item-head">
                                    <img src={user?.profile_image || "./user.png"} alt="" className="avatar" />
                                    <div>
                                        <h3 className="text-color">{user?.name}</h3>
                                        {/* <span>12/06/2023</span> */}
                                    </div>
                                </div>
                            </div>

                            <div className="message-container" ref={messageContainerRef}>
                                <ScrollableFeed>
                                    {
                                        chatData.isSuccess &&
                                        chat.length &&
                                        chat.map(((mes, index) => {
                                            return <div key={index} className={mes.sender !== contactId ? "message-box left-flex-align" : "message-box"}>
                                                <p>{mes.message}</p>
                                                <span>{mes.createdAt.slice(0, 10)}</span>
                                            </div>
                                        }))

                                    }
                                    {/* {
                                        chat.length &&
                                        chat.map((mes, index) => {
                                            return <div key={index} className={mes.sender !== contactId ? "message-box left-flex-align" : "message-box"}>
                                                <p>{mes.message}</p>
                                                <span>{mes.createdAt.slice(0, 10)}</span>
                                            </div>
                                        })
                                    } */}
                                </ScrollableFeed>
                            </div>

                            <div className="form-container">
                                <form onSubmit={sendMessage} >
                                    <input type="text" required placeholder='Your message...' name='message' />
                                    <button type='submit' ><AiOutlineSend /></button>
                                </form>
                            </div>
                        </>
                    }
                </div>
            </div>
        </Layout>
    )
}

export default ChatPage
