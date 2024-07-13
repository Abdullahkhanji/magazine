import { doc, getDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { db } from "../App";
import { Volume } from "./Home";
import Footer from "../Components/Footer/Footer";
import Navbar from "../Components/Navbar/Navbar";
import { NavLink } from "react-router-dom"

const VolumePage = () => {
  const [volume, setVolume] = useState<Volume>();
  const param = useParams();
  const id = param.id;
  const getVolumeData = async () => {
    if (id != undefined) {
      const storage = getStorage();
      let docRef = doc(db, "volumes", id);
      let docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const docData = docSnap.data();

        const index: Volume = {
          id: docData.id,
          title: docData.title,
          researches: docData.researches,
        };

        if (docData.file) {
          const fileRef = ref(storage, docData.file);
          index.file = await getDownloadURL(fileRef);
        }

        if (docData.cover) {
          const coverRef = ref(storage, docData.cover);
          index.cover = await getDownloadURL(coverRef);
        }

        setVolume(index);
      } else {
        console.log("No such document!");
      }
    }
  };
  useEffect(() => {
    getVolumeData();
    console.log(volume);
  }, [id]);
  return (
    <>
      <Navbar />
      <div>
        <div>{volume?.title}</div>

        <img src={volume?.cover} alt="" />
      </div>
      <Footer />
    </>
  );
};

export default VolumePage;
