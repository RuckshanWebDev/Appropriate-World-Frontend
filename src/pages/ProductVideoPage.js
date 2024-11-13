import React, { useEffect, useRef, useState } from 'react'
import Layout from '../components/Layout'
import './ProductVideoPage.css'
import { useParams, useNavigate } from 'react-router-dom'
import VideoDataSet from '../components/VideoDataSet'


function ProductPageVideo() {

  const navigate = useNavigate()

  const videoRef = useRef()

  const [data, setData] = useState({})
  const [currentVideo, setCurrentVideo] = useState('')

  const param = useParams()

  const playlistHandler = (e) => {

    console.log(e.target.id - 1);
    console.log(data.links[e.target.id - 1].link);
    setCurrentVideo(data.links[e.target.id - 1].link)
    console.log(currentVideo);

    videoRef.current.src = currentVideo
    videoRef.current.load();
    console.log(videoRef.current);
  }

  useEffect(() => {

    let url = param.id
    url = url.replace(/-/g, " ")

    if (VideoDataSet[url]) {
      setData(VideoDataSet[url])
      console.log(VideoDataSet[url]);
    } else {
      navigate('/404')
      console.log('redirect');
    }
    if (Object.keys(data).length) {
      setCurrentVideo(data.links[0])
    }


  }, [data])

  return (
    <Layout>
      <div className='container' >
        <div className='video-container' >

          <div className='title-container' >
            <h2>{data.title}</h2>
          </div>

          {currentVideo && <video poster={currentVideo.img} id='video-player' controls ref={videoRef} src={currentVideo.link} ></video>}

          <p className='description'>{data?.description}</p>

          <div style={{ display : 'flex', flexDirection : 'column', margin : '30px 0', gap : '15px' }} >
            <div style={{ display : 'flex' , gap: '10px' }}>
              <p style={{ maxWidth : '100px', width : '100%' }} >Genre :</p>
              <p>{data?.genre}</p>
            </div>
            <div style={{ display : 'flex' , gap: '10px' }}>
              <p style={{ maxWidth : '100px', width : '100%' }} >Cast :</p>
              <p>{data?.cast}</p>
            </div>
          </div>

          {data.playlist &&
            <>
              <div className='title-container' >
                <h2>Related Videos</h2>
              </div>
              <div className='playlist-container' >
                {data.links.map((playlistItem) => {
                  return (<div className='playlist-item' style={{
                    backgroundImage
                      : `linear-gradient(7deg, #ffffffab, transparent),
        url(${playlistItem.img})`
                  }} onClick={playlistHandler} key={playlistItem["playlist-id"]} id={playlistItem["playlist-id"]} >
                    <p id={playlistItem["playlist-id"]} className='playlist-item-text'>{playlistItem.name}</p>
                  </div>)
                })}
              </div>
            </>}

        </div>
      </div>
    </Layout>
  )
}

export default ProductPageVideo
