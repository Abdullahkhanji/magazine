import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import { db } from "../App";
import { collection, doc, getDocs } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

const Home = () => {
  const volumes: any[] = [];
  const researches: any[] = [];
  const getVolumes = async () => {
    const index:any = {};
    const storage = getStorage();
    const getData = await getDocs(collection(db, "volumes"));
    getData.forEach(async (doc: any) => {
      index.title = doc.data().title;
      index.researches = doc.data().researches;

      const coverRef = ref(storage, `${doc.data()["cover"]}`);
      await getDownloadURL(coverRef).then((url) => {
        index.cover = url;

      });
      const fileRef = ref(storage, `${doc.data()["file"]}`);
      await getDownloadURL(fileRef).then((url) => {
        index.file = url;
      });
      researches.push(doc.data().researches);
      volumes.push(index);
      console.log({...researches})

    });
    // console.log(volumes)
  };
  useEffect(() => {
    getVolumes();
  }, []);
  return (
    <>
      <Navbar />
      {volumes.map((volume) => (
        <>
          <img src={volume.cover} alt="" />
        </>
      ))}
      <div className="logo">
        <i className="fa-solid fa-bars"></i>
      </div>
      <Footer />
    </>
  );
};

export default Home;
