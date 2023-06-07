import React from 'react'
import Snake from 'snake-game-react';
import Layout from '../../components/Layout';

const SnakeGamePage = () => {
    return (
        <Layout>
            <div style={{ margin: '100px auto 100px' }} >
                <Snake
                    color1="#248ec2"
                    color2="#450074"
                    backgroundColor="#ff9900 "
                />
            </div>
        </Layout>
    )
}

export default SnakeGamePage
