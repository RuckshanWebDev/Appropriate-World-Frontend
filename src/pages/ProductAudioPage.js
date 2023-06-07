import React, { useEffect, useRef, useState } from 'react'
import Layout from '../components/Layout'
import './ProductAudioPage.css'
import AudioPlayer from "react-modern-audio-player";
import AudioDataSet from '../components/AudioDataSet'
import { useNavigate, useParams } from 'react-router-dom';

function ProductPage() {

  let isMobile = false
  let templateAreaObject = {}

  const navigate = useNavigate()
  const param = useParams()

  const [audioData, setAudioData] = useState({})
  const [audioLoaded, setAudioLoaded] = useState(false)

  // const playList = [
  //   {
  //     name: 'APPROPRIATE AUDIO SNOWSTORM',
  //     writer: 'Ruckshan',
  //     img: '/images/header.jpg',
  //     src: 'https://res.cloudinary.com/dts5uxlug/video/upload/q_34/v1675462599/APPROPRIATE_AUDIO_SNOWSTORM_copy_nutt3p.mp3',
  //     id: 1,
  //   },
  // ]

  useEffect(() => {

    let url = param.id
    url = url.replace(/-/g, " ")

    console.log(url);

    if (AudioDataSet[url]) {
      setAudioData(AudioDataSet[url])
    } else {
      navigate('/404')
      console.log('redirect');
    }
    if (Object.keys(audioData).length) {
      setAudioLoaded(true)
    }

  }, [audioData])

  if (window.innerWidth < 768) {
    isMobile = true
    templateAreaObject = {
      artwork: "row1-1",
      trackInfo: "row1-4",
      trackTimeCurrent: "row1-5",
      trackTimeDuration: "row1-6",
      progress: "row2-4",
      repeatType: "row3-1",
      volume: "row3-8",
      playButton: "row3-3",
      playList: "row3-9",
    }
  } else {
    templateAreaObject = {
      trackTimeDuration: "row1-5",
      progress: "row1-4",
      playButton: "row1-6",
      repeatType: "row1-7",
      volume: "row1-8",
    }
  }

  console.log(templateAreaObject);
  return (
    <Layout>
      <div className='container' >
        <div className="player">
          <div className="head">
            {audioLoaded && <div className="back" style={{ backgroundImage: `url(${audioData.coverLink})` }} ></div>}
            <div className="front">
              <div className="avatar">
                {audioLoaded && <video muted autoPlay loop style={{ width: "100%" }} src={audioData.videoLink} >
                </video>}
              </div>
              <div className="infos">
                <h1 className="titulo_song">
                  {audioData.title}</h1>
                <div className="duracao_song"><i className="fa fa-clock-o">
                  Author : </i></div>
                {/* <div className="tags"><span>Music</span><span>Audio</span><span>SNOWSTORM</span></div> */}
              </div>
            </div>
          </div>
          <div className="timeline">
            <div>
              {Object.keys(audioData).length &&
                <AudioPlayer
                  playList={audioData.links}
                  audioInitialState={{
                    muted: false,
                    volume: 0.2,
                    curPlayId: 1,
                  }}
                  // placement={{
                  //   interface: {
                  //     templateArea: {
                  //       artwork: "row1-1",
                  //       trackInfo: "row1-4",
                  //       trackTimeCurrent: "row1-5",
                  //       trackTimeDuration: "row1-6",
                  //       progress: "row2-4",
                  //       repeatType: "row3-1",
                  //       volume: "row3-8",
                  //       playButton: "row3-3",
                  //       playList: "row3-9",
                  //     },
                  //   },
                  // }}
                  placement={{
                    interface: {
                      templateArea: templateAreaObject
                    },
                  }}
                  activeUI={{
                    all: true,
                    progress: "auto",
                  }}
                />}
            </div>
          </div>
        </div>
        <div className="rotation"></div>
      </div>

    </Layout>
  )
}

export default ProductPage
