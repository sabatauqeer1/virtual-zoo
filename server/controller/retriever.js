import { Animal } from "../model/animal.js";
export const dataRetriver = async (req, res) => {
  try {
    const { id } = req.params;

    const animal = await Animal.findOne({ id: id });
    res.send(animal);
  } catch (error) {
    console.log(error.message);
  }

  console.log("resposne sent");
};
