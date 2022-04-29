import { collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc } from 'firebase/firestore/lite'
import {fireBaseModule} from './firebase'


export const fireStoreModule = (() => {

    const database = getFirestore(fireBaseModule.app);
    const libraryCollectionRef = collection(database, "library");
    
    const getBooksFromDb = async () => {
      const data = await getDocs(libraryCollectionRef);
      data.docs.map(doc => ({...doc.data(), id: doc.id}))
    }
    const createBookFromDb = async () => {
        await addDoc(libraryCollectionRef, { name: newName, age: Number(newAge) });
      };
    
      const updateBookFromDb = async (id, age) => {
        const libraryDoc = doc(database, "library", id);
        const newFields = { age: age + 1 };
        await updateDoc(libraryDoc, newFields);
      };
    
      const deleteBookFromDb = async (id) => {
        const libraryDoc = doc(database, "library", id);
        await deleteDoc(libraryDoc);
      };

      return {getBooksFromDb, createBookFromDb,updateBookFromDb, deleteBookFromDb };

})();  