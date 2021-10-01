import { database } from "../firebase";

export async function getAllVideoGamesActive() {
  const snapshot = await database.videoGames.where("status", "==", 1).get();
  return snapshot.docs.map((doc) => doc.data());
}

export async function addVideoGame(data) {
  // const createdAt = +new Date();
  // const id = createdAt + "-" + Math.random().toString(36).substr(2);
  await database.videoGames.add({
    name: data.name,
    nick_name: data.nickName,
    logo_url: data.logoURL,
    description: data.description,
    best_review: data.bestReview,
    status: data.status,
    created_at: database.getCurrentTimestamp(),
    created_by: data.userId,
  });
}
