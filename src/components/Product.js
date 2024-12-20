import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Product.css";

function Product() {
  const premiumUser = false;

  return (
    <>
      <div className="grid-container">
        <div className="product-grid">
          <Link to={"/video/APPROPRIATE-CULTURE-SEASON-2"}>
            <div className="product-card">
              <video autoPlay loop playsInline muted>
                <source src="sorted-video/02 Wom 4K.mp4" />
              </video>
            </div>
          </Link>
          <Link to={"/video/ALIEN-N-KICK"}>
            <div className="product-card">
              <video autoPlay loop playsInline muted>
                <source src="Sorted Videos/Aliennkick Nomoving.mp4" />
              </video>
            </div>
          </Link>
          <Link to={"/video/APPROPRIATE-CULTURE-SEASON-ONE"}>
            <div className="product-card">
              <video autoPlay loop playsInline muted>
                <source src="Sorted Videos/Appropriateculture1 No Moving.mp4" />
              </video>
            </div>
          </Link>
          <Link to={"/video/BUGGING-GILBERT"}>
            <div className="product-card">
              <video autoPlay loop playsInline muted>
                <source src="Sorted Videos/Bugginggilbert Nomovement.mp4" />
              </video>
            </div>
          </Link>

          <Link to={"/video/DETECTIVE-BLK"}>
            <div className="product-card">
              <video autoPlay loop playsInline muted>
                <source src="Sorted Videos/Detectiveblk.mp4" />
              </video>
            </div>
          </Link>
          {premiumUser && (
            <Link to={"/video/Playa-PLaya-Sophisticated-Thoughts"}>
              <div className="product-card">
                <video autoPlay loop playsInline muted>
                  <source src="Sorted Videos/Musicvideocollection.mp4" />
                </video>
              </div>
            </Link>
          )}
          <Link to={"/video/YOUR-FRIEND-JIGGY"}>
            <div className="product-card">
              <video autoPlay loop playsInline muted>
                <source src="Sorted Videos/Yourfriendjiggy Moving.mp4" />
              </video>
            </div>
          </Link>
          <Link to={"/video/APPROPRIATE-CHRISTMAS-SPECIAL"}>
            <div className="product-card">
              <video autoPlay loop playsInline muted>
                <source src="Sorted Videos/Holiday Special Wom.mp4" />
              </video>
            </div>
          </Link>
          <Link to={"/video/AUTONOMY-:-Attack-of-the-Robots"}>
            <div className="product-card">
              <video autoPlay loop playsInline muted>
                <source src="Sorted Videos/Autonomy Aor Cover.mp4" />
              </video>
            </div>
          </Link>
          <Link to="/video/CHRONICLES-OF-COFFY">
            <div className="product-card">
              <video autoPlay loop playsInline muted>
                <source src="sorted-video/Chroniclesofcoffy.mp4" />
              </video>
            </div>
          </Link>
          <Link to={"/video/MY-EX-BILLIONAIRE-FIANCEE"}>
            <div className="product-card">
              <video autoPlay loop playsInline muted>
                <source src="sorted-video/Mybillionaireexfiancee.mp4" />
              </video>
            </div>
          </Link>
        </div>

        <div className="product-grid">
          <Link to={"/video/APPROPRIATE-CULTURE-SEASON-1.5"}>
            <div className="product-card">
              <video autoPlay loop playsInline muted>
                <source src="Sorted Videos/Ac3 Black Bg.mp4" />
              </video>
            </div>
          </Link>
          <Link to={"/audio/TO-BE-A-KID-AGAIN-DELUXE"}>
            <div className="product-card">
              <video autoPlay loop playsInline muted>
                <source src="sorted-video/Tobeakidagain Cover.mp4" />
              </video>
            </div>
          </Link>
          <Link to={"#"}>
            <div className="product-card">
              <Link to={"/audio/APPROPRIATE-CULTURE-SNOWSTORM"}>
                <video playsInline muted autoPlay loop>
                  <source src="Sorted Videos/Appropriate Audio.mp4" />
                </video>
              </Link>
            </div>
          </Link>

          {/* <div className="product-card">
              <video autoPlay loop playsInline muted>
                <source src="sorted-video/Tobeakidagain Cover.mp4" />
              </video>
            </div> */}

          {premiumUser && (
            <div className="product-card">
              <video autoPlay loop playsInline muted>
                <source src="sorted-video/Swipe.mp4" />
              </video>
            </div>
          )}
          {premiumUser && (
            <Link to={"/video/01"}>
              <div className="product-card">
                <video autoPlay loop playsInline muted>
                  <source src="sorted-video/Realityshow.mp4" />
                </video>
              </div>
            </Link>
          )}
          {premiumUser && (
            <div className="product-card">
              <video autoPlay loop playsInline muted>
                <source src="sorted-video/Mybitchassconfessions.mp4" />
              </video>
            </div>
          )}

          {/* <Link to={"/audio/MY-EX-BILLIONAIRE-TRAILER-2"}>
              <div className="product-card">
                <video autoPlay loop playsInline muted>
                  <source src="sorted-video/Mybillionaireexfiancee.mp4" />
                </video>
              </div>
            </Link> */}

          {premiumUser && (
            <Link to={"/audio/HEIST-MOVIE-TRAILER"}>
              <div className="product-card">
                <video autoPlay loop playsInline muted>
                  <source src="sorted-video/Heistmovie.mp4" />
                </video>
              </div>
            </Link>
          )}
          {premiumUser && (
            <div className="product-card">
              <video autoPlay loop playsInline muted>
                <source src="sorted-video/Gameshow Wm.mp4" />
              </video>
            </div>
          )}
          {premiumUser && (
            <Link to={"/audio/DAD-TRAILER"}>
              <div className="product-card">
                <video autoPlay loop playsInline muted>
                  <source src="sorted-video/Dad.mp4" />
                </video>
              </div>
            </Link>
          )}

          {premiumUser && (
            <Link to={"/audio/ADVENTURE-ISLAND-TRAILER"}>
              <div className="product-card">
                <video autoPlay loop playsInline muted>
                  <source src="sorted-video/Adventureislandmovie.mp4" />
                </video>
              </div>
            </Link>
          )}
          <Link to={"/audio/AUTONOMY-AUDIO"}>
            <div className="product-card">
              <video autoPlay loop playsInline muted>
                <source src="Sorted Videos/Autonomy Audio.mp4" />
              </video>
            </div>
          </Link>
          <Link to={"/audio/EVERY-BODIES-WATCHING"}>
            <div className="product-card">
              <video autoPlay loop playsInline muted>
                <source src="Sorted Videos/Everybodieswatching Copy.mp4" />
              </video>
            </div>
          </Link>
          {premiumUser && (
            <Link to={"/audio/RESTART-CONTINUE"}>
              <div className="product-card">
                <video autoPlay loop playsInline muted>
                  <source src="Sorted Videos/Restart Continue Cover.mp4" />
                </video>
              </div>
            </Link>
          )}
          {premiumUser && (
            <div className="product-card">
              <video autoPlay loop playsInline muted>
                <source src="Sorted Videos/Cd No Movement 1.mp4" />
              </video>
            </div>
          )}
          {premiumUser && (
            <Link to={"/audio/PRINCE-CHARMING-COVER"}>
              <div className="product-card">
                <video autoPlay loop playsInline muted>
                  <source src="Sorted Videos/Prince Charming.mp4" />
                </video>
              </div>
            </Link>
          )}
          {/* <div className="product-card">
            <video autoPlay loop playsInline muted>
              <source src="Sorted Videos/Autonomy Aor Cover.mp4" />
            </video>
          </div> */}
          {premiumUser && (
            <div className="product-card">
              <video autoPlay loop playsInline muted>
                <source src="Sorted Videos/Villain Origin Album.mp4" />
              </video>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Product;
