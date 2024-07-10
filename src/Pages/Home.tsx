import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import { db } from "../App";
import {
  QueryDocumentSnapshot,
  collection,
  doc,
  getDocs,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

export interface Research {
  No: number;
  rTitle: string;
  publisherName: string;
  publisherJob: string;
  publisherEmail: string;
  summary: string;
  rImage?: string;
  rFile?: string;
}

export interface Volume {
  title: string;
  researches: Research[];
  cover?: string;
  file?: string;
}

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [volumes, setVolumes] = useState<Volume[]>([]);
  const [researches, setResearches] = useState<Research[]>([]);

  useEffect(() => {
    const getVolumes = async () => {
      try {
        const storage = getStorage();
        const getData = await getDocs(collection(db, "volumes"));

        const volumeTemp = await Promise.all(
          getData.docs.map(async (doc: QueryDocumentSnapshot) => {
            const docData = doc.data() as Volume;
            const index: Volume = {
              title: docData.title,
              researches: docData.researches,
            };

            const researchTemp = await Promise.all(
              docData.researches.map(async (research: Research) => {
                const resData: Research = {
                  No: research.No,
                  rTitle: research.rTitle,
                  publisherName: research.publisherName,
                  publisherJob: research.publisherJob,
                  publisherEmail: research.publisherEmail,
                  summary: research.summary,
                };

                const covRef = ref(storage, research.rImage);
                const covURL = await getDownloadURL(covRef);
                resData.rImage = covURL;

                return resData;
              })
            );
            setResearches(researchTemp);

            const coverRef = ref(storage, docData.cover);
            const coverURL = await getDownloadURL(coverRef);
            index.cover = coverURL;

            return index;
          })
        );

        setVolumes(volumeTemp);
      } catch (error) {
        console.error("Error fetching volumes:", error);
      } finally {
        setLoading(false);
      }
    };

    getVolumes();
  }, []);
  useEffect(() => {
    console.log(volumes);
  }, [volumes]);
  if (loading) {
    return <h1>loading</h1>;
  }

  return (
    <>
      <Navbar />
      {volumes.map((volume) => (
        <>
          <p>{volume.title}</p>
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
