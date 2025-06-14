import axios from "axios"
import {useNavigate, useParams} from "react-router-dom"
import { useState,useEffect } from 'react';
import data from "./data.json"
import "./index.css"
import { useRef } from 'react';







 export const VirtualZoo = () => {
  const navigate = useNavigate()
  const hasSlideshowStarted = useRef(false);
 

const [animal, setanimal] = useState(null)
 
   const {animalId}=useParams()
 
  
  

      
   
   
 useEffect(() => {

    const animalInfo= async ()=>{
  const response = await axios.post(`https://virtualzoo-backend.up.railway.app/api/virtualzoo/${animalId}`);


 setanimal( response.data)

 
      
 }
      
 

     animalInfo()


 }, [animalId])
 
 


const slideshowForward = () => {
  const values = Object.values(data);
  const ids = values.map(item => String(item.id));
  const currentId = String(animalId);

  const index = ids.findIndex(id => id === currentId);
  if (index !== -1) {
    const nextIndex = (index + 1) % ids.length;
    navigate(`/api/virtualzoo/${ids[nextIndex]}`);
    hasSlideshowStarted.current = true;
  }
};




const slideshowBack = () => {
  const values = Object.values(data);
  const ids = values.map(item => String(item.id));
  const currentId = String(animalId);

  const index = ids.findIndex(id => id === currentId);

  if (index !== -1) {
    const prevIndex = (index - 1 + ids.length) % ids.length;
    navigate(`/api/virtualzoo/${ids[prevIndex]}`);
    hasSlideshowStarted.current = true;
  }
};

  



    
     return(

  
 <div>
      {animal ? (
        <div>
          <h1 id="title">VIRTUAL ZOO</h1>
          <div id="animalImgDiv">
           <img src={`/${animalId}.jpg`} alt={animal.name} id="animalImg" />

         </div>
         <div id="animalInfoDiv">
         <div id="animalInfo">
        <h2>Name:{animal[0].name }</h2>
          <h2>Types:{animal[0].types }</h2>
          <h2>Description:{animal[0].description  }</h2>
          </div>
          </div>
          <div id="forwardSlideShowButton">

           <button  onClick={slideshowForward}>forward
 </button>
 </div>
 <div id="backSlideShowButton">
 <button  onClick={slideshowBack}>back
 </button>
           </div>

        </div>
      ) : (
        <p>Loading...</p>
      )}
  
     
    </div>
     )}

    

    export default VirtualZoo
