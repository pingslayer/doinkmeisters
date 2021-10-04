import { database } from "../firebase";

async function getAllActive() {
  const snapshot = await database.fashionAndHealth
    .where("status", "==", 1)
    .get();
  return snapshot.docs.map((doc) => doc.data());
}

export const FashionAndHealthAPIs = {
  getAllActive: getAllActive,
};
