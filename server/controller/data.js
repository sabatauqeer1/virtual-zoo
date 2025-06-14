import { Animal } from "../model/animal.js"
  export const dataMaker= async(req, res)=>{
    const {name , types , description}=req.body 

     const animalId= Date.now()
     console.log(animalId);
     
    
  const animal=  Animal.create({
        name:name,
        types:types,
        description:description,
        id:animalId
     

    })
    res.json(animal)

    
}
