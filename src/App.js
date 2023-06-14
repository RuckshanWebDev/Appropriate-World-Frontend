import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage.js'
import ErrorPage from './pages/ErrorPage.js'
import Login from './pages/Login.js'
import Register from './pages/Register.js'
import ProductPageVideo from './pages/ProductVideoPage.js';
import ProductPage from './pages/ProductAudioPage.js';
import GamePage from './pages/GamePage.js';
import ChessGamePage from './pages/games/ChessGamePage.js';
import SnakeGamePage from './pages/games/SnakeGamePage.js';
import BlogPage from './pages/BlogPage.js';
import ProfilePage from './pages/ProfilePage.js';
import Popup from './components/Popup.js';
import 'react-toastify/dist/ReactToastify.css';
import ProtectRoute from './components/ProtectRoute.js';
import ComingSoon from './components/comingSoon.js';
import SingleBlog from './pages/SingleBlog.js';
import AddBlog from './pages/AddBlog.js';


export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/admin' element={<HomePage />} exact />
        <Route path='/' element={<ComingSoon />} exact />
        <Route path='/games' element={<GamePage />} exact />
        <Route path='/blogs' element={<BlogPage />} exact />
        <Route path='/blog/:id' element={<SingleBlog />} exact />
        <Route path='/blog/add' element={<AddBlog />} exact />
        <Route path='/profile' element={<ProtectRoute> <ProfilePage /></ProtectRoute>} exact />
        <Route path='/games/chess' element={<ChessGamePage />} exact />
        <Route path='/games/snake' element={<SnakeGamePage />} exact />
        <Route path='/login' element={<Login />} exact />
        <Route path='/register' element={<Register />} exact />
        <Route path='/audio/:id' element={<ProductPage />} exact />
        <Route path='/video/:id' element={<ProductPageVideo />} exact />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  )

}