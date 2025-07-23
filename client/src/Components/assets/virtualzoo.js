import React from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import data from "./data.json";
import "./index.css";

export const VirtualZoo = () => {
  const navigate = useNavigate();
  const hasSlideshowStarted = useRef(false);
  const [isSpeaking, setisSpeaking] = useState(!true);
  const synth = window.speechSynthesis;

  const [animal, setanimal] = useState(null);

  const { animalId } = useParams();

  useEffect(() => {
    const animalInfo = async () => {
      const response = await axios.post(
        `https://virtual-zoo-78lt.onrender.com/api/virtualzoo/${animalId}`
      );

      setanimal(response.data);
      window.onbeforeunload = () => {
        synth.cancel();
      };
    };

    animalInfo();
  }, [animalId]);

  const slideshowForward = () => {
    synth.cancel();
    setisSpeaking(!true);

    const values = Object.values(data);
    const ids = values.map((item) => String(item.id));
    const currentId = String(animalId);

    const index = ids.findIndex((id) => id === currentId);
    if (index !== -1) {
      const nextIndex = (index + 1) % ids.length;
      navigate(`/api/virtualzoo/${ids[nextIndex]}`);
      hasSlideshowStarted.current = true;
    }
  };

  const slideshowBack = () => {
    synth.cancel();
    setisSpeaking(!true);

    const values = Object.values(data);
    const ids = values.map((item) => String(item.id));
    const currentId = String(animalId);

    const index = ids.findIndex((id) => id === currentId);

    if (index !== -1) {
      const prevIndex = (index - 1 + ids.length) % ids.length;
      navigate(`/api/virtualzoo/${ids[prevIndex]}`);
      hasSlideshowStarted.current = true;
    }
  };
  const speakButtonHandler = () => {
    try {
      const speakThis =
        "name: " +
        animal.name +
        ", " +
        "type: " +
        animal.types +
        ", " +
        "description: " +
        animal.description;
      console.log(speakThis);

      const utterThis = new SpeechSynthesisUtterance(speakThis);
      synth.speak(utterThis);
      setisSpeaking(true);
    } catch (error) {}
    if (isSpeaking === true) {
      synth.cancel();
      setisSpeaking(!true);
    }
  };

  return (
    <div>
      {animal ? (
        <div>
          <h1 id="title">VIRTUAL ZOO</h1>
          <h2 id="animalName">{animal.name}</h2>
          <div id="animalImgDiv">
            
              <video
                id="animalImg"
                src={`/${animalId}.mp4`}
                autoPlay
                loop
                muted
                playsInline
                controlsList="nodownload nofullscreen noremoteplayback"
                controls
              />;
          
          </div>

          <div id="animalInfoDiv">
            <div id="animalInfo">
              <h2>Type:{animal.types}</h2>
              <h2>Description:{animal.description}</h2>
            </div>
          </div>
          <div id="forwardSlideShowButton">
            <button onClick={slideshowForward}>forward</button>
          </div>
          <div id="backSlideShowButton">
            <button onClick={slideshowBack}>back</button>
          </div>
          <div id="speakButton">
            <button onClick={speakButtonHandler}> Speak</button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default VirtualZoo;
