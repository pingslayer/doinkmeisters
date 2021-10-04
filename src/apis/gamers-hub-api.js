import { database } from "../firebase";

async function getAllActive() {
  const snapshot = await database.gamersHub.where("status", "==", 1).get();
  return snapshot.docs.map((doc) => doc.data());
}

async function add(data) {
  await database.gamersHub.add({
    name: data.name,
    nick_name: data.nickName,
    description: data.description,
    best_review: data.bestReview,
    status: +1,
    created_at: database.getCurrentTimestamp(),
    created_by: data.userId,
  });
}

export const GamersHubAPIs = {
  getAllActive: getAllActive,
  add: add,
};
