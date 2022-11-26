import { getAuth } from "@firebase/auth";
import { initializeApp } from "firebase/app";
import { collection, doc, getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const firestore = getFirestore(app);

export const videoCollection = collection(firestore, "video");
export const getThumbnailRef = (videoId: string) =>
  ref(storage, `/videoThumbnails/${videoId}/thumbnail.jpeg`);

export const getUsersLikesDoc = (userId: string, videoId: string) =>
  doc(firestore, "users", userId, "likes", videoId);

export const getUsersVideoBookmarksDoc = (userId: string, videoId: string) =>
  doc(firestore, "users", userId, "videoBookmarks", videoId);
