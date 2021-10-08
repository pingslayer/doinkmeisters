import { database, storage } from "../firebase";

const STORAGE_FOLDER = "gamers_hub";

async function getAllActive() {
  const snapshot = await database.gamersHub.where("status", "==", 1).get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

async function add(data) {
  const response = await database.gamersHub.add({
    name: data.name,
    nick_name: data.nickName,
    link: data.link,
    description: data.description,
    best_review: data.bestReview,
    photo_name: data.photo.name,
    photo_url: data.photo.url,
    status: +1,
    created_at: database.getCurrentTimestamp(),
    created_by: data.userId,
  });
  return response;
}

async function update(data) {
  const response = await database.gamersHub.doc(data.id).update({
    name: data.name,
    nick_name: data.nickName,
    link: data.link,
    description: data.description,
    best_review: data.bestReview,
    photo_name: data.photo.name,
    photo_url: data.photo.url,
    status: data.status,
  });
  return response;
}

async function remove(id) {
  console.log("removing..." + id);
  await database.gamersHub.doc(id).delete();
}

async function uploadPhoto(photo) {}

export const GamersHubPublicAPIs = {
  getAllActive: getAllActive,
};

export const GamersHubAPIs = {
  getAllActive: getAllActive,
  add: add,
  update: update,
  remove: remove,
  uploadPhoto: uploadPhoto,
};
