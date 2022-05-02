import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  getFirestore,
  doc,
} from "firebase/firestore/lite";
import { fireBaseModule } from "./firebase";

export const fireStoreModule = (() => {
  const database = getFirestore(fireBaseModule.app);
  const libraryCollectionRef = collection(database, "library");

  const getBooksFromDb = async () => {
    const data = await getDocs(libraryCollectionRef);
    const returnedData = data.docs.map((doc) => ({
      ...doc.data(),
      dbId: doc.id,
    }));
    return returnedData;
  };
  const createBookInDb = async (
    title,
    author,
    totalPages,
    readPages,
    read,
    id
  ) => {
    await addDoc(libraryCollectionRef, {
      title: title,
      author: author,
      totalPages: Number(totalPages),
      readPages: Number(readPages),
      read: Boolean(read),
      id: id,
    });
  };
  const updateBookInDb = async (
    bookToDUpdateId,
    title,
    author,
    totalPages,
    readPages,
    read,
  ) => {
    const libraryDoc = doc(database, "library", bookToDUpdateId);
    const newFields = {
      title: title,
      author: author,
      totalPages: Number(totalPages),
      readPages: Number(readPages),
      read: Boolean(read),
    };
    await updateDoc(libraryDoc, newFields);
  };
  const updateBookReadValueInDb = async (
    bookToDUpdateId,
   read,
  ) => {
    const libraryDoc = doc(database, "library", bookToDUpdateId);
    const newReadValue = {
        read: Boolean(read),
    };
    await updateDoc(libraryDoc, newReadValue);
  };

  const deleteBookFromDb = async (id) => {
    const libraryDoc = doc(database, "library", id);
    await deleteDoc(libraryDoc);
  };

  return { getBooksFromDb, createBookInDb, deleteBookFromDb, updateBookInDb, updateBookReadValueInDb };
})();
