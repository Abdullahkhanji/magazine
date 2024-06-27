import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import { db } from "../App";
import { collection, doc, getDocs } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

const Home = () => {


  const volumes: any[] = [];
  const getVolumes = async () => {
    const storage = getStorage();
    const getData = await getDocs(collection(db, "volumes"));
    getData.forEach(async (doc: any) => {
      console.log(doc.id, " => ", doc.data());
      const coverRef = ref(storage, `${doc.data()['volumeCover']}`);
      await getDownloadURL(coverRef).then((url) => {
        doc.cover = url;
      });
      const fileRef = ref(storage, `${doc.data()['volumeFile']}`);
      await getDownloadURL(fileRef).then((url) => {
        doc.File = url;
      });
      volumes.push(doc)
    });
    console.log(volumes)

  }
  useEffect(() => {
    getVolumes();
  }, []);
  return (
    <>
      <Navbar />
      <div className="logo">
        <i className="fa-solid fa-bars"></i>
        
      </div>
      <Footer />
    </>
  );
};

export default Home;

