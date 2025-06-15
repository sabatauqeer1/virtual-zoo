import { Animal } from "../model/animal.js"
  export const dataRetriver= async(req, res)=>{
    const {id}=req.params 


     const animal= await Animal.findOne({id:id})

  console.log("resposne sent");
  
    res.send(animal)


  }
    
 
    
