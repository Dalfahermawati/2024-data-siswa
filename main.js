import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

const firebaseConfig = {
 apiKey: "AIzaSyAjxjGgc1_HHBUGoXM1kFq4aXiV--plwZE",
   authDomain: "pasarcemerlang-11fa3.firebaseapp.com",
   projectId: "pasarcemerlang-11fa3",
   storageBucket: "pasarcemerlang-11fa3.appspot.com",
   messagingSenderId: "390685080124",
   appId: "1:390685080124:web:6a69ed5fd39c3fc21da139",
   measurementId: "G-W8CDLLBLLC"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function ambilDaftarSiswa() {
  const siswaRef = collection(db, "siswa");
  const q = query(siswaRef, orderBy("nama"));
  const querySnapshot = await getDocs(q);
  
  let retval = [];
  querySnapshot.forEach((doc) => {
    retval.push({ id: doc.id, nama: doc.data().nama});
  });
  
  return retval;
}

export async function tambahSiswa(val) {
 try {
    const docRef = await addDoc(collection(db, "siswa"), {
      nama: val
    });
    console.log('Berhasil menyimpan dokumen dengan ID: ' + docRef.id);
 } catch (e) {
   console.log('Error menambah dokumen: ' + e);
 }
}

export async function hapusSiswa(docId) {
  await deleteDoc(doc(db, "siswa", docId));
}