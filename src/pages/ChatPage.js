import React, { useEffect, useState, useRef } from 'react'
import { AiOutlineSend } from 'react-icons/ai'
import Layout from '../components/Layout'
import './ChatPage.css'
import { useGetContactQuery } from '../features/blogApi'
import { useGetCoupleChatQuery, useLazyGetCoupleChatQuery, useSendMessageMutation } from '../features/chatApi'
import { toast } from 'react-toastify'
import io from "socket.io-client";
import { useDispatch, useSelector } from 'react-redux'
import { addNotify } from '../features/localSlice'
import ScrollableFeed from 'react-scrollable-feed'
import { Link } from 'react-router-dom'

function ChatPage() {

    const dispatch = useDispatch()
    const messageContainerRef = useRef()
    const { profileId } = useSelector(state => state.local.user)
    const { data } = useGetContactQuery()
    const [getChat, chatData] = useLazyGetCoupleChatQuery()
    const [sendMessageApi, sendMessageData] = useSendMessageMutation()
    const [contactId, setContactId] = useState(null)
    const [user, setUser] = useState(null)
    const [chat, setChat] = useState(null)
    const [socket, setSocket] = useState(null)
    const [roomId, setRoomId] = useState(null)
    const [allContact, setAllContact] = useState(null)

    if (chatData.isError) {
        toast.error("Something went wrong, Please try again later!")
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


    const contactToggle = (e) => {

        if (e.target.dataset.id) {
            setContactId(e.target.dataset.id)
            getChat({ id: e.target.dataset.id })

            const filteredUser = data?.data.filter(i => i._id === e.target.dataset.id)
            setUser(filteredUser[0])
            setChat(null)

            // Read Message send to Backend
            socket.emit('removeNotification', profileId, contactId)
        }
    }

    socket?.on(`addNotification${profileId}`, (data) => {
        console.log(data);
        dispatch(addNotify(data?.from))
    })

    socket?.on('message', (data) => {

        const lastMessage = data[data.length - 1]

        if (lastMessage.sender === profileId) {
            // It is our message
            console.log('It is our message');
            setChat(data)
        } else if (lastMessage.sender === contactId && lastMessage.reciever === profileId) {
            // This message to us
            console.log('This message to us');
            setChat(data)

        } else if (lastMessage.sender !== contactId) {



            // Notify
            setChat(null)
            console.log('notify');
            const filteredUser = allContact?.filter(i => i._id === lastMessage.sender)
            console.log(filteredUser);


        }
    })


    useEffect(() => {

        // Set all contact
        setAllContact(data?.data)
        console.log(allContact);
        const newSocket = io(process.env.NODE_ENV === "production" ? 'https://appropriate-world-backend.onrender.com' : 'http://localhost:5000', { transports: ['websocket'] })
        setSocket(newSocket)
    }, [allContact, data?.data])

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
                                            chat ?
                                            chat.map(((mes, index) => {
                                                return <div key={index} className={mes.sender !== contactId ? "message-box left-flex-align" : "message-box"}>
                                                    <p>{mes.message}</p>
                                                    <span>{mes.createdAt.slice(0, 10)}</span>
                                                </div>
                                            }))

                                            : chatData.data?.data.map(((mes, index) => {
                                                return <div key={index} className={mes.sender !== contactId ? "message-box left-flex-align" : "message-box"}>
                                                    <p>{mes.message}</p>
                                                    <span>{mes.createdAt.slice(0, 10)}</span>
                                                </div>
                                            }))
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
