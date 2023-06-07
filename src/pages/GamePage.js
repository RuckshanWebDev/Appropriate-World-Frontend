import React from 'react'
import Layout from '../components/Layout'
import { Link } from 'react-router-dom'
import './gamePage.css'

const GamePage = () => {
    return (
        <Layout>

            <div className="gamepage-container">
                <div className="gamepage-item">
                    <Link to={'/games/chess'} >
                        <img src="/game/chessboard.png" alt="" />
                    </Link>
                </div>
                <div className="gamepage-item">
                    <Link to={'/games/snake'} >
                        <img src="/game/snake.png" alt="" />
                    </Link>
                </div>
            </div>

        </Layout>
    )
}

export default GamePage
