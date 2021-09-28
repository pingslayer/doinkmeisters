import db from "../config/firebase.config";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
  setDoc,
  doc,
  updateDoc,
} from "firebase/firestore/lite";
// import { onSnapshot, collection } from "firebase/firestore";
// import { collection, getDocs } from "firebase/firestore";

// export async function getAllQuotes() {
//   const response = await fetch(`${FIREBASE_DOMAIN}/quotes.json`);
//   const data = await response.json();

//   if (!response.ok) {
//     throw new Error(data.message || "Could not fetch quotes.");
//   }

//   const transformedQuotes = [];

//   for (const key in data) {
//     const quoteObj = {
//       id: key,
//       ...data[key],
//     };

//     transformedQuotes.push(quoteObj);
//   }

//   return transformedQuotes;
// }

export async function getAllVideoGamesActive() {
  const q = query(collection(db, "video_games"), where("status", "==", 1));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => doc.data());
}

export async function addVideoGame(gameData) {
  const docRef = await setDoc(doc(db, "video_games"), {
    name: gameData.name,
    nick_name: gameData.nickName,
    logo_url: gameData.logoURL,
    description: gameData.description,
    status: gameData.status,
    created_at: +new Date(),
  });
  console.log(docRef);
  return;
}
