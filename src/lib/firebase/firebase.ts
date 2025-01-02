import { initializeApp } from "firebase/app";
import { deleteObject, getStorage, listAll, ref, uploadBytes  } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export const getRefFromStorage = async (path: string) => ref(storage, path);

export const uploadToStorage = async (path: string, file: File) => {
  const storageRef = ref(storage, path);
  uploadBytes(storageRef, file);
}

export const deleteFromStorage = async (path: string) => {
  const storageRef = ref(storage, path);
  deleteObject(storageRef);
}

export const deleteFolderFromStorage = async (path: string) => {
  const storage = getStorage();
  const folderRef = ref(storage, path);

  const folderContents = await listAll(folderRef);
  const deletePromises = folderContents.items.map((fileRef) => deleteObject(fileRef));

  Promise.all(deletePromises);
};
