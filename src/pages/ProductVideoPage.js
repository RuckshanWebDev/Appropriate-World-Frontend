import React, { useEffect, useRef, useState } from "react";
import Layout from "../components/Layout";
import "./ProductVideoPage.css";
import { useParams, useNavigate } from "react-router-dom";
import VideoDataSet from "../components/VideoDataSet";
import { useLazyViewMediaContentQuery } from "../features/mediaApi";

function ProductPageVideo() {
  const navigate = useNavigate();
  const param = useParams();
  const videoRef = useRef();
  const [outSource, setOutsource] = useState(false);
  const [data, setData] = useState({});
  const [currentVideo, setCurrentVideo] = useState("");
  const [getMediaFn, getMediaData] = useLazyViewMediaContentQuery();

  console.log(getMediaData);

  const playlistHandler = (e) => {
    const index = Number(e.target.id) - 1; // Ensure it's a number
    if (data.links?.[index]) {
      setCurrentVideo(data.links[index].link);
    }
  };

  useEffect(() => {
    let url = param.id.replace(/-/g, " ");

    if (VideoDataSet[url]) {
      setData(VideoDataSet[url]);
    } else if (window.location.pathname.includes("outsource")) {
      setOutsource(true);
      getMediaFn(param.id);
    } else {
      navigate("/404");
      console.log("redirect");
    }
  }, [param.id, navigate]);

  useEffect(() => {
    if (getMediaData.isSuccess && getMediaData.data) {
      setCurrentVideo(getMediaData.data.episodes[0].src);
      setData(getMediaData.data)
    }
  }, [getMediaData]);

  useEffect(() => {
    if (data.links?.length) {
      setCurrentVideo(data.links[0].link);
    }
  }, [data]);

  // Update video source when `currentVideo` changes
  useEffect(() => {
    if (videoRef.current && currentVideo) {
      videoRef.current.src = currentVideo ;
      videoRef.current.load();
    }
  }, [currentVideo]);

  return (
    <Layout>
      <div className="container">
        <div className="video-container">
          <div className="title-container">
            <h2>{data.title}</h2>
          </div>

          {currentVideo && <video poster={currentVideo.img || data.coverImage} id="video-player" controls ref={videoRef} src={currentVideo}></video>}

          <p className="description">{data?.description}</p>

          <div style={{ display: "flex", flexDirection: "column", margin: "30px 0", gap: "15px" }}>
            <div style={{ display: "flex", gap: "10px" }}>
              <p style={{ maxWidth: "100px", width: "100%" }}>Genre :</p>
              <p>{data?.genre}</p>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <p style={{ maxWidth: "100px", width: "100%" }}>Cast :</p>
              <p>{data?.cast || data?.artist}</p>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <p style={{ maxWidth: "100px", width: "100%" }}>Description :</p>
              <p>{data?.description}</p>
            </div>
          </div>

          {data.playlist && (
            <>
              <div className="title-container">
                <h2>Related Videos</h2>
              </div>
              <div className="playlist-container">
                {data.links.map((playlistItem) => {
                  return (
                    <div
                      className="playlist-item"
                      style={{
                        backgroundImage: `linear-gradient(7deg, #ffffffab, transparent),
        url(${playlistItem.img})`,
                      }}
                      onClick={playlistHandler}
                      key={playlistItem["playlist-id"]}
                      id={playlistItem["playlist-id"]}
                    >
                      <p id={playlistItem["playlist-id"]} className="playlist-item-text">
                        {playlistItem.name}
                      </p>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default ProductPageVideo;
