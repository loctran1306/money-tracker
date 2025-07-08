import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { child, get, getDatabase, push, ref, remove } from "firebase/database";

export interface IFirebaseTransaction {
    id: string;
    transactionData: {
        amount: number;
        category: string;
        date: string;
        description: string;
        transactionType: string;
    };
}

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
};

export function writeTransaction(userId: string, newTransaction: IFirebaseTransaction) {
    const db = getDatabase();
    push(ref(db, "User/" + userId + "/transactions/"), {
        newTransaction,
    });
}

export function removeTransaction(userId: string, transactionId: string) {
    const db = getDatabase();
    remove(ref(db, "User/" + userId + "/transactions/" + transactionId));
}

export function getAllTransactions(userId: string): Promise<IFirebaseTransaction> {
    return new Promise((resolve, reject) => {
        const dbRef = ref(getDatabase());

        get(child(dbRef, "User/" + userId))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    resolve(snapshot.val());
                } else {
                    reject(new Error("No data available"));
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

