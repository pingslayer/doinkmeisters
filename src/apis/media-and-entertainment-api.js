import { database } from "../firebase";

async function getAllActive() {
  const snapshot = await database.mediaAndEntertainment
    .where("status", "==", 1)
    .get();
  return snapshot.docs.map((doc) => doc.data());
}

export const MediaAndEntertainmentAPIs = {
  getAllActive: getAllActive,
};
