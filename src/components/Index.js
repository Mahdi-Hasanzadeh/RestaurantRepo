import React from "react";
import video from "../videos/video-1.mp4";
import music from "../videos/04 - Tajdar-e-Haram - S08E01.mp3";
import "../myIndex.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
// ! C () ?
export default function Home() {
  const song = React.useRef(new Audio(music));
  const [isplaying, setIsPlaying] = React.useState(false);

  const handlePlay = async () => {
    if (isplaying === false) {
      song.current.play();
      setIsPlaying((prevData) => !prevData);
    }
  };

  const handlePause = (event) => {
    // console.log(isplaying);
    if (isplaying) {
      song.current.pause();
      setIsPlaying((prevData) => !prevData);
    }
  };
  return (
    <motion.div
      initial={{ width: "0" }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.5 } }}
    >
      <div className="container ">
        <div className="row">
          <div className="col-12 bg-secondary rounded-3 d-flex justify-content-center align-items-center gap-3 text-white pt-2 pb-2 mt-1 mb-1">
            {isplaying ? "Song is Playing" : "Song is Paused"}

            <button className="btn btn-primary" onClick={handlePlay}>
              <i className="fa fa-play-circle fa-lg">Play</i>
            </button>
            <button className="btn btn-warning" onClick={handlePause}>
              <i className="fa fa-pause-circle fa-lg">Puase</i>
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-12 d-flex flex-column justify-content-center align-items-center  ">
            <video
              className="video rounded-3"
              height="100%"
              width="100%"
              autoPlay
              muted
              loop
            >
              <source src={video} />
            </video>
            <div className="contentnew mt-sm-5">
              <h1>Start Your Adventure</h1>
              <div className="d-flex justify-content-center ">
                <Link to="/home">
                  <button className=" homeBtn">GET STARTED</button>
                </Link>

                {/* <button className=" homeBtn">Watch Trailer</button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
