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
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { RiCloseCircleFill } from 'react-icons/ri'
import { FaAngleRight } from 'react-icons/fa'

function ChatPage() {

    const newQueryParameters = new URLSearchParams();

    const { search } = useLocation()
    const [currentQueryParameters, setSearchParams] = useSearchParams()
    const dispatch = useDispatch()
    const messageContainerRef = useRef()
    const { profileId, profile } = useSelector(state => state.local.user)
    const { notifications } = useSelector(state => state.local)
    const { data } = useGetContactQuery()
    const [getChat, chatData] = useLazyGetCoupleChatQuery()
    const [sendMessageApi, sendMessageData] = useSendMessageMutation()
    const [contactId, setContactId] = useState(null)
    const [user, setUser] = useState(null)
    const [chat, setChat] = useState([])
    const [socket, setSocket] = useState(null)
    const [roomId, setRoomId] = useState(null)
    const [recentChat, setRecentChat] = useState([])
    const [allContact, setAllContact] = useState(null)
    const [sideOpen, setSideOpen] = useState(false)

    const notificationSound = new Audio('./music/MESSAGE_NOTIFICATION_SEND.wav')

    // Chat Error
    if (chatData.isError) {
        toast.error("Something went wrong, Please try again later!")
    }

    // Send Message
    const sendMessage = (e) => {

        e.preventDefault()

        socket.emit('sendMessage',
            {
                sender: profileId,
                reciever: contactId,
                message: e.target.message.value
            }, roomId)

        // Send to backend
        // socket.emit('addNotification', contactId, profileId)


        e.target.message.value = ''
    }

    // Switch Chat
    const switchChat = async (id) => {

        newQueryParameters.set('userId', id)
        setSearchParams(newQueryParameters);

        setRecentChat([])
        setContactId(id)
        localStorage.setItem('contactId', id)

        try {

            const chatHistory = await getChat({ id: id }).unwrap()
            if (!chatHistory) return
            setChat(chatHistory?.data)

            const filteredUser = data?.data.filter(i => i._id === id)
            filteredUser && setUser(filteredUser[0])

            if (notifications.length) {

                const filteredUserNotification = notifications.filter(i => i === id)
                console.log(filteredUserNotification);
                socket.emit('removeNotification', profileId, filteredUserNotification[0])

                socket?.once(`removeNotification${profileId}`, (data) => {
                    console.log(data);
                    if (data?.from) {
                        dispatch(addNotify([data]))
                    }
                })

            }
        } catch (err) {
            console.log(err);
        }
    }
    // Changing the cotact
    const contactToggle = (e) => {

        setSideOpen(!sideOpen)


        let contactArray = [...document.querySelectorAll('.contact-item')]
        contactArray = contactArray.slice(0, contactArray.length / 2)

        contactArray.map(i => {
            if (i.dataset.id === e.target.dataset.id) {
                i.classList.add('active-contact')
                console.log('add');
            } else {
                console.log('remove');
                i.classList.remove('active-contact')
            }
        })


        if (e.target.dataset.id) {
            switchChat(e.target.dataset.id)
        }
    }

    // Add Notification Socket
    socket?.once(`addNotification${profileId}`, (data) => {

        console.log("Socket :=> Add Notification");

        if (data?.from) {
            // notificationSound.play()
            dispatch(addNotify([data]))
        }
    })
    socket?.once(`removeNotification${profileId}`, (data) => {

        console.log("Socket :=> remove Notification");

        if (data?.from) {
            dispatch(addNotify([data]))
        }
    })

    // Recieve Message Socket
    socket?.once(`message${profileId}`, function (data) {


        const lastMessage = data
        console.log("Socket :=> Message");


        if (lastMessage.sender === profileId) {

            //     // Message Sent by us
            setRecentChat([...recentChat, data])
            socket.emit('removeNotification', profileId, lastMessage.sender)
            socket?.emit('addNotification', lastMessage.reciever, lastMessage.sender)



        } else if (lastMessage.sender === localStorage.getItem('contactId') && lastMessage.reciever === profileId) {

            // Message to us
            setRecentChat([...recentChat, data])
            socket.emit('removeNotification', profileId, lastMessage.sender)


        } else {

            // Notify
            console.log('Notify');
            socket?.emit('addNotification', lastMessage.reciever, lastMessage.sender)

        }
    })


    useEffect(() => {
        // Set all contact
        setAllContact(data?.data)
        if (!socket) {
            localStorage.setItem('contactId', '')
            const newSocket = io(process.env.NODE_ENV === "production" ? 'https://appropriate-world-backend.onrender.com' : 'http://localhost:5001', { transports: ['websocket'] })
            setSocket(newSocket)
        }

    }, [data?.data, chatData.data?.data])

    useEffect(() => {


        if (search) {
            const userId = search.slice(1).split(';').filter(i => i.includes('userId'))[0].split('=')[1]
            if (data?.message === 'Success') switchChat(userId)
            // console.log(search.slice(1).split(';').filter(i => i.includes('userId'))[0].split('=')[1]);
        }
    }, [data])

    return (
        <Layout>
            <div className="container chat-container">

                <div className="contact-container">

                    <Link to={'/community'} >
                        <h4 className='contact-title' >Community</h4>
                    </Link>
                    {
                        !profile.friendList.length ?
                        <div style={{ margin : '0 15px' }}>
                            <p>Find your community members</p>
                        </div>
                        :
                        profile.friendList?.map((contact, index) => {
                            if (contact._id === profileId) return

                            var notify = notifications.includes(contact._id)

                            return (
                                <div key={index} data-id={contact._id} className="contact-item" onClick={contactToggle} >
                                    <img data-id={contact._id} src={contact?.profile_image || "./user.png"} alt="" className="avatar" />
                                    <div >
                                        <Link to={`/profile/${contact?._id}`} style={{ textDecoration: 'none' }} >
                                            <h3 data-id={contact._id} className="text-color">{contact?.name}</h3>
                                        </Link>
                                        <span>{contact.profession || '-- : --'}</span>

                                    </div>
                                    {notify && <div className="notify-icon">1</div>}
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
                    <div style={{ overflowY: "scroll", height: '85%' }} >
                        {
                            allContact?.map((contact, index) => {
                                if (contact._id === profileId) return

                                var notify = notifications.includes(contact._id)

                                return (
                                    <div key={index} data-id={contact._id} className="contact-item" onClick={contactToggle} >
                                        <img data-id={contact._id} src={contact?.profile_image || "./user.png"} alt="" className="avatar" />
                                        <div>
                                            <Link to={`/profile/${contact?._id}`} style={{ textDecoration: 'none' }} >
                                                <h3 data-id={contact._id} className="text-color">{contact?.name}</h3>
                                            </Link>
                                            <span>{contact.profession || '-- : --'}</span>
                                        </div>
                                        {notify && <div className="notify-icon">1</div>}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <div className="chatbox-container">
                    {
                        !contactId ?
                        <div style={{ width : '100%', height : '100%', display : 'flex', justifyContent : 'center', alignItems : 'center' }}>
                            <p>Please select a Chatbox</p>
                        </div>
                        :
                        <>
                            <div className="details-container">
                                <div className="contact-item-head">
                                    <Link to={`/profile/${user?._id}`}>
                                        <img src={user?.profile_image || "./user.png"} alt="" className="avatar" />
                                    </Link>
                                    <Link to={`/profile/${user?._id}`}>
                                        <div>
                                            <h3 className="text-color">{user?.name}</h3>
                                            {/* <span>12/06/2023</span> */}
                                        </div>
                                    </Link>
                                </div>
                            </div>

                            <div className="message-container" ref={messageContainerRef}>
                                <ScrollableFeed>
                                    {
                                        chatData.isSuccess &&
                                            chat.length ?
                                            chat.map(((mes, index) => {
                                                return <div key={index} className={mes.sender !== contactId ? "message-box left-flex-align" : "message-box"}>
                                                    <p>{mes.message}</p>
                                                    <span>{mes.createdAt?.slice(0, 10)}</span>
                                                </div>
                                            }))
                                            : ''
                                    }
                                    {
                                        recentChat.length ?
                                            recentChat.map((mes, index) => {
                                                return <div key={index} className={mes.sender !== contactId ? "message-box left-flex-align" : "message-box"}>
                                                    <p>{mes.message}</p>
                                                    <span>{mes.createdAt.slice(0, 10)}</span>
                                                </div>
                                            }) : ''
                                    }
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
