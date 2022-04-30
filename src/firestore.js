import { collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    getFirestore,
    doc } from 'firebase/firestore/lite'
import {fireBaseModule} from './firebase'


export const fireStoreModule = (() => {

    const database = getFirestore(fireBaseModule.app);
    const libraryCollectionRef = collection(database, "library");
    
    const getBooksFromDb = async () => {
      const data = await getDocs(libraryCollectionRef);
      return data.docs.map(doc => ({...doc.data(), dbId: doc.id}))
    }
    const createBookInDb = async (title, author, totalPages, readPages, read, id) => {
        await addDoc(libraryCollectionRef, { title: title, author: author, totalPages:Number(totalPages), readPages:Number(readPages), read:Boolean(read), id:id });
      };
    //TODO
    //   const updateBookInDb = async (id, age) => {
    //     const libraryDoc = doc(database, "library", id);
    //     const newFields = { age: age + 1 };
    //     await updateDoc(libraryDoc, newFields);
    //   };
    
      const deleteBookFromDb = async (id) => {
        const libraryDoc = doc(database, "library", id);
        await deleteDoc(libraryDoc);
      };

      return {getBooksFromDb, createBookInDb,deleteBookFromDb };

})();  