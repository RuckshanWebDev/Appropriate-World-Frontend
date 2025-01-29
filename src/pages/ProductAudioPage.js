import React, { useEffect, useRef, useState } from "react";
import Layout from "../components/Layout";
import "./ProductAudioPage.css";
import AudioPlayer from "react-modern-audio-player";
import AudioDataSet from "../components/AudioDataSet";
import { useNavigate, useParams } from "react-router-dom";
import { useLazyViewMediaContentQuery } from "../features/mediaApi.js";

function ProductPage() {
  let isMobile = false;
  let templateAreaObject = {};

  const [outSource, setOutsource] = useState(false);
  const [getMediaFn, getMediaData] = useLazyViewMediaContentQuery();
  const navigate = useNavigate();
  const param = useParams();

  const [audioData, setAudioData] = useState({});
  const [audioLoaded, setAudioLoaded] = useState(true);
  const [id, setId] = useState();

  const fetchLocalMusic = () => {
    let url = param.id;
    url = url.replace(/-/g, " ");

    console.log(url);

    if (AudioDataSet[url]) {
      setAudioData(AudioDataSet[url]);
    } else {
      navigate("/404");
      console.log("redirect");
    }
    if (Object.keys(audioData).length) {
      setAudioLoaded(true);
    }
  };

  const fetchOutsourceMusic = async (id) => {
    try {
      const responce = await getMediaFn(id).unwrap();
      setAudioData(responce);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (window.location.pathname.includes("outsource")) {
      setOutsource(true);
      setId(param.id);
      fetchOutsourceMusic(param.id);
    } else {
      setOutsource(false);
    }
  }, []);

  useEffect(() => {
    if (!window.location.pathname.includes("outsource")) {
      fetchLocalMusic();
    }
  }, [audioData]);

  if (window.innerWidth < 768) {
    isMobile = true;
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
    };
  } else {
    templateAreaObject = {
      trackTimeDuration: "row1-5",
      progress: "row1-4",
      playButton: "row1-6",
      repeatType: "row1-7",
      volume: "row1-8",
    };
  }

  console.log();


  return (
    <Layout>
      <div
        style={{ backgroundImage: `url(${audioData.coverImage})` }}
        className="relative flex flex-col items-center justify-center p-6 text-white 
             rounded-lg shadow-lg w-full max-h-[900px] max-w-[900px] mx-auto mt-12 mb-12
             bg-black/30 backdrop-blur-2xl bg-cover bg-center"
      >
        <div className="mt-4 flex flex-col items-center">
          {audioLoaded && (
            <>
              {/* <div className="absolute z-0  h-[100%] bg-cover bg-center rounded-lg" style={{ backgroundImage: `url(${audioData.coverImage})` }}></div> */}
              <video muted autoPlay loop className="max-h-[400px] w-[400px] rounded-lg shadow-md" src={audioData.videoLink || audioData.coverImage}></video>
            </>
          )}
          <h1 className="text-xl font-bold mt-4 text-center">{audioData.title}</h1>
        </div>
        <div className="w-full mt-4">
          {!outSource
            ? Object.keys(audioData).length && (
                <AudioPlayer
                  playList={audioData.episodes }
                  audioInitialState={{ muted: false, volume: 0.5, curPlayId: 1 }}
                  placement={{
                    interface: {
                      templateArea: {
                        artwork: "row1-1",
                        trackInfo: "row1-4",
                        trackTimeCurrent: "row1-5",
                        trackTimeDuration: "row1-6",
                        progress: "row2-4",
                        repeatType: "row3-1",
                        volume: "row3-8",
                        playButton: "row3-3",
                        playList: "row3-9",
                      },
                    },
                  }}
                  activeUI={{ all: true, progress: "auto" }}
                />
              )
            : getMediaData.isLoading || getMediaData.isSuccess && Object.keys(audioData).length && (
                <AudioPlayer
                  playList={audioData.episodes}
                  audioInitialState={{ muted: false, volume: 0.5, curPlayId: 1 }}
                  placement={{
                    interface: {
                      templateArea: {
                        artwork: "row1-1",
                        trackInfo: "row1-4",
                        trackTimeCurrent: "row1-5",
                        trackTimeDuration: "row1-6",
                        progress: "row2-4",
                        repeatType: "row3-1",
                        volume: "row3-8",
                        playButton: "row3-3",
                        playList: "row3-9",
                      },
                    },
                  }}
                  activeUI={{ all: true, progress: "auto" }}
                />
              )}
        </div>
      </div>
    </Layout>
  );
}

export default ProductPage;

// <div className="container">
//   <div className="player">
//     <div className="head">
//       {audioLoaded && <div className="back" style={{ backgroundImage: `url(${audioData.coverImage})` }}></div>}
//       <div className="front">
//         <div className="avatar">{audioLoaded && <video muted autoPlay loop style={{ width: "100%" }} src={audioData.videoLink || audioData.cover}></video>}</div>
//         <div className="infos">
//           <h1 className="titulo_song">{audioData.title}</h1>
//           <div className="duracao_song">
//             <i className="fa fa-clock-o">Author : </i>
//           </div>
//           {/* <div className="tags"><span>Music</span><span>Audio</span><span>SNOWSTORM</span></div> */}
//         </div>
//       </div>
//     </div>
//     <div className="timeline">
//       <div>
//         {Object.keys(audioData).length && (
//           <AudioPlayer
//             playList={audioData.links || [audioData.media]}
//             audioInitialState={{
//               muted: false,
//               volume: 0.2,
//               curPlayId: 1,
//             }}
//             // placement={{
//             //   interface: {
//             //     templateArea: {
//             //       artwork: "row1-1",
//             //       trackInfo: "row1-4",
//             //       trackTimeCurrent: "row1-5",
//             //       trackTimeDuration: "row1-6",
//             //       progress: "row2-4",
//             //       repeatType: "row3-1",
//             //       volume: "row3-8",
//             //       playButton: "row3-3",
//             //       playList: "row3-9",
//             //     },
//             //   },
//             // }}
//             placement={{
//               interface: {
//                 templateArea: templateAreaObject,
//               },
//             }}
//             activeUI={{
//               all: true,
//               progress: "auto",
//             }}
//           />
//         )}
//       </div>
//     </div>
//   </div>
//   {/* <div className="rotation"></div> */}
// </div>
