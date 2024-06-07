import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage.js'
import ErrorPage from './pages/ErrorPage.js'
import Login from './pages/Login.js'
import Register from './pages/Register.js'
import ProductPageVideo from './pages/ProductVideoPage.js';
import ProductPage from './pages/ProductAudioPage.js';
import BlogPage from './pages/BlogPage.js';
import ProfilePage from './pages/ProfilePage.js';
import Popup from './components/Popup.js';
import 'react-toastify/dist/ReactToastify.css';
import ProtectRoute from './components/ProtectRoute.js';
import ComingSoon from './components/comingSoon.js';
import SingleBlog from './pages/SingleBlog.js';
import AddBlog from './pages/AddBlog.js';
import ChatPage from './pages/ChatPage.js';
import SingleProfile from './pages/profiles/SingleProfile.js';

import { useLazyGetotificationQuery } from './features/chatApi.js';
import { addNotify } from './features/localSlice.js';
import { useDispatch } from 'react-redux';
import CommunityPage from './pages/CommunityPage.js';
import ResetPassword from './pages/ResetPassword.js';
import ForgotPassword from './pages/ForgotPassword.js';
import Package from './pages/Package.js';
import PaymentConfirm from './pages/PaymentConfirm.js';
import Settings from './pages/Settings.js';
import TestPage from './pages/TestPage.js';
import EditBlog from './pages/EditBlog.js';


export default function App() {

  const dispatch = useDispatch()
  const [getNotificationFn, getNotification] = useLazyGetotificationQuery()


  if (getNotification.isSuccess && getNotification?.data?.data[0].from.length) {
    console.log(getNotification.data);
    getNotification.data.data && dispatch(addNotify(getNotification.data?.data))
  }


  useEffect(() => {

    localStorage.getItem('user') && getNotificationFn()
    localStorage.setItem('mute', true)
    console.log("site enter");

  }, [])

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path='/admin' element={<HomePage />} exact /> */}
        <Route path='/' element={<ComingSoon />} exact />
        <Route path='/blogs' element={<BlogPage />} exact />
        <Route path='/blog/:id' element={<SingleBlog />} exact />
        <Route path='/blog/add' element={<ProtectRoute> <AddBlog /> </ProtectRoute>} exact />
        <Route path='/blog/edit/:id' element={<ProtectRoute> <EditBlog /> </ProtectRoute>} exact />
        <Route path='/chat' element={<ProtectRoute>  <ChatPage /> </ProtectRoute>} exact />
        <Route path='/profile' element={<ProtectRoute> <ProfilePage /></ProtectRoute>} exact />
        <Route path='/profile/:id' element={<SingleProfile />} exact />
        <Route path='/community' element={<ProtectRoute> <CommunityPage /> </ProtectRoute>} exact />
        <Route path='/login' element={<Login />} exact />
        <Route path='/earlyaccess' element={<Register />} exact />
        <Route path='/register' element={<Register />} exact />
        <Route path='/forgot-password' element={<ForgotPassword />} exact />
        <Route path='/reset-password/:token' element={<ResetPassword />} exact />
        <Route path='/audio/:id' element={<ProductPage />} exact />
        <Route path='/video/:id' element={<ProductPageVideo />} exact />
        {/* <Route path='/checkout' element={<ProtectRoute> <Checkout /> </ProtectRoute>} exact /> */}
        <Route path='/packages' element={<ProtectRoute><Package /> </ProtectRoute>} exact />
        <Route path='/payment-confirm' element={<ProtectRoute><PaymentConfirm /> </ProtectRoute>} exact />
        <Route path='/settings' element={<ProtectRoute><Settings /> </ProtectRoute>} exact />
        <Route path='/test' element={<ProtectRoute><TestPage /> </ProtectRoute>} exact />
        <Route path='*' element={<ProtectRoute><ErrorPage /> </ProtectRoute>} />
      </Routes>
    </BrowserRouter>
  )
}
