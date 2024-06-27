import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import "./index.css";

const firebaseConfig = {
  apiKey: "AIzaSyCNMWXYGPY6N1UM987mhjxhPw3-cjhpKKs",
  authDomain: "tibyan-6e366.firebaseapp.com",
  projectId: "tibyan-6e366",
  storageBucket: "tibyan-6e366.appspot.com",
  messagingSenderId: "969147801187",
  appId: "1:969147801187:web:3c69463171b6e09df86256",
  measurementId: "G-0F5GXY7F78",
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
function App() {
  return (
    <>
      <div className="App">sadfasf</div>
    </>
  );
}

export default App;
