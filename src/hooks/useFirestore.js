import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";

const useFirestore = (collectionName, condition) => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    let collectionRef = collection(db, collectionName);

    /**
     * condition
     * {
     *  fieldName
     *  operator
     *  compareValue
     * }
     */
    if (
      condition &&
      !(!condition.compareValue || !condition.compareValue.length === 0)
    ) {
      collectionRef = query(
        collectionRef,
        where(condition.fieldName, condition.operator, condition.compareValue)
      );
    }

    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const documents = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setDocuments(documents);
    });

    return unsubscribe;
  }, [collectionName, condition]);

  return documents;
};

export default useFirestore;
