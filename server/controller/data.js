import { Animal } from "../model/animal.js";
export const dataMaker = async (req, res) => {
  const { name, type, description } = req.body;

  const animalId = Date.now();
  console.log(animalId);

  const animal = await Animal.create({
    name: name,
    type: type,
    description: description,
    id: animalId,
  });
  res.json(animal);
};
