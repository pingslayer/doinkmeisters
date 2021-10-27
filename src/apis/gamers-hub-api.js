import { database, storage } from "../firebase";

const STORAGE_FOLDER = "gamers_hub";

async function getAll() {
  const snapshot = await database.gamersHub.get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

async function getAllOrderByCreatedAt() {
  const snapshot = await database.gamersHub.orderBy("created_at", "desc").get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

async function getAllActive() {
  const snapshot = await database.gamersHub.where("status", "==", 1).get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

async function getAllByUserId(userId) {
  const snapshot = await database.gamersHub
    .where("created_by", "==", userId)
    .get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

async function getAllByUserIdOrderByCreatedAt(userId) {
  const snapshot = await database.gamersHub
    .where("created_by", "==", userId)
    .orderBy("created_at", "desc")
    .get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

async function add(data) {
  const response = await database.gamersHub.add({
    name: data.name,
    summary: data.summary,
    citation: data.citation,
    link: data.link,
    description: data.description,
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
    summary: data.summary,
    photo_name: data.photo.name,
    photo_url: data.photo.url,
    citation: data.citation,
    link: data.link,
    description: data.description,
    status: data.status,
  });
  return response;
}

async function remove(id) {
  await database.gamersHub.doc(id).delete();
}

export const GamersHubPublicAPIs = {
  getAllActive: getAllActive,
};

export const GamersHubAPIs = {
  getAllActive: getAllActive,
  getAllOrderByCreatedAt: getAllOrderByCreatedAt,
  getAllByUserIdOrderByCreatedAt: getAllByUserIdOrderByCreatedAt,
  add: add,
  update: update,
  remove: remove,
};
