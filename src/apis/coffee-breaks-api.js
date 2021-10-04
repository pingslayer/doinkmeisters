import { database } from "../firebase";

async function getAllActive() {
  const snapshot = await database.coffeeBreaks.where("status", "==", 1).get();
  return snapshot.docs.map((doc) => doc.data());
}

export const CoffeeBreaksAPIs = {
  getAllActive: getAllActive,
};
