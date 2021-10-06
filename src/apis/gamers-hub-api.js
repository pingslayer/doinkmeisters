import { database, storage } from "../firebase";

const STORAGE_FOLDER = "gamers_hub";

async function getAllActive() {
  const snapshot = await database.gamersHub.where("status", "==", 1).get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

async function add(data) {
  return database.gamersHub.add({
    name: data.name,
    nick_name: data.nickName,
    description: data.description,
    best_review: data.bestReview,
    photo_name: data.photo.name,
    photo_url: data.photo.url,
    status: +1,
    created_at: database.getCurrentTimestamp(),
    created_by: data.userId,
  });
}

async function remove(id) {
  console.log("removing..." + id);
  await database.gamersHub.doc(id).delete();
}

async function uploadPhoto(photo) {}

export const GamersHubAPIs = {
  getAllActive: getAllActive,
  add: add,
  remove: remove,
  uploadPhoto: uploadPhoto,
};
