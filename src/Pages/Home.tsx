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

interface Research {
  No: number;
  rTitle: string;
  publisherName: string;
  publisherJob: string;
  publisherEmail: string;
  summary: string;
  rImage?: string;
  rFile?: string;
}

interface Volume {
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
        const volumesTemp: Volume[] = [];
        const researchesTemp: Research[] = []; 

        const volumePromises = getData.docs.map(async (doc: QueryDocumentSnapshot) => {
          const docData = doc.data() as Volume;
          const index: Volume = {
            title: docData.title,
            researches: docData.researches,
          };

          const researchPromises = docData.researches.map(async (research: Research) => {
            if (!researchesTemp.some((e) => e.rTitle === research.rTitle)) {
              const resData: Research = {
                No: research.No,
                rTitle: research.rTitle,
                publisherName: research.publisherName,
                publisherJob: research.publisherJob,
                publisherEmail: research.publisherEmail,
                summary: research.summary,
              };
              if (research.rFile != null && research.rImage != null) {
                const covRef = ref(storage, research.rImage);
                const covURL = await getDownloadURL(covRef);
                resData.rImage = covURL;

                const fRef = ref(storage, research.rFile);
                const fURL = await getDownloadURL(fRef);
                resData.rFile = fURL;
                researchesTemp.push(resData);
              }
            }
          });

          await Promise.all(researchPromises);

          const coverRef = ref(storage, docData.cover);
          const coverURL = await getDownloadURL(coverRef);
          index.cover = coverURL;

          const fileRef = ref(storage, docData.file);
          const fileURL = await getDownloadURL(fileRef);
          index.file = fileURL;

          volumesTemp.push(index);
        });

        await Promise.all(volumePromises);

        setVolumes(volumesTemp);
        setResearches(researchesTemp);
      } catch (error) {
        console.error("Error fetching volumes:", error);
      } finally {
        setLoading(false);
      }
    };

    getVolumes();
  }, []);

  if (loading) {
    return <h1>loading</h1>;
  }
  console.log(volumes);
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
