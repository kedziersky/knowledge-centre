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
export const videoLikesDoc = (videoId: string) =>
  doc(firestore, "likes", videoId);

export const getVideoDoc = (videoId: string) =>
  doc(firestore, "video", videoId);

export const getUsersVideoDoc = (userId: string, videoId: string) =>
  doc(firestore, "users", userId, "video", videoId);

export const getVideoChatCollection = (videoId: string) =>
  collection(firestore, "video", videoId, "chat");

export const getUsersVideoBookmarksCollection = (userId: string) =>
  collection(firestore, "users", userId, "videoBookmarks");

export const getApptensionNews = () => collection(firestore, "apptensionFeed");

export const getUsersNewsBookmarkDoc = (userId: string, url: string) =>
  doc(firestore, "users", userId, "newsBookmarks", url);

export const getusersNewsBookmarkCollection = (userId: string) =>
  collection(firestore, "users", userId, "newsBookmarks");

export const getUsersMemeBookmarkDoc = (userId: string, url: string) =>
  doc(firestore, "users", userId, "memeBookmarks", url);

export const getUsersMemeBookmarkCollection = (userId: string) =>
  collection(firestore, "users", userId, "memeBookmarks");

export const getUsersApptensionBookmarkDoc = (userId: string, url: string) =>
  doc(firestore, "users", userId, "apptensionBookmarks", url);
export const getUsersApptensionBookmarkCollection = (userId: string) =>
  collection(firestore, "users", userId, "apptensionBookmarks");
