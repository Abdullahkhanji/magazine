import { doc, getDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { db } from "../App";
import { Volume, Research } from "./../Components/Volumes/Volumes";
import Footer from "../Components/Footer/Footer";
import Navbar from "../Components/Navbar/Navbar";
import { NavLink } from "react-router-dom";


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
      <div className="bg-lightceladon m-6 rounded-lg  ">
        <div className="">
          <h2 className="text-32 text-fff  p-10 pr-24 pt-12 ">
            {volume?.title}
          </h2>
        </div>
        <div className="flex justify-center">
          <div className="">
            <section className="p-10 mr-640 ">
              <a href="/any">
                <button className=" text-20 text-white bg-[#15803d] duration-300 hover:bg-[#166534] focus:outline-none focus:ring-4 focus:ring-[#86efac] font-medium rounded-sm  px-24 py-2.5 text-center me-2 mb-2 dark:bg-[#86efac]dark:hover:bg-[#15803d] dark:focus:ring-[#166534] ">
                  تصفح العد الأول من المجلد
                </button>
              </a>
            </section>
            {volume?.researches.map((research: Research) => (
              <section className="pr-8 mr-[20%]">
                <a href="/any">
                  <button className=" p-10  text-28  hover:text-background duration-300">
                  {research.rTitle}
                  </button>
                </a>
                <p className="text-20 pt-5 ">{research.publisherName}</p>
              </section>
            ))}
          </div>
          <div className="flex justify-end pl-10  m-10 ">
            <img className=" w-1/2 p-10  " src={volume?.cover} alt="" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default VolumePage;
