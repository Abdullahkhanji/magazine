import React, { useEffect, useState } from "react";

import { db } from "../../App";
import { QueryDocumentSnapshot, collection, getDocs } from "firebase/firestore";
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
  id: string;
  title: string;
  researches: Research[];
  cover?: string;
  file?: string;
}
const ResearchesHomePage = () => {
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
              id: doc.id,
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
    
  }, [volumes]);
  if (loading) {
    return <h1>loading</h1>;
  }

  return (
    <div className="flex  flex-col ">
      <div className="min-h-7"></div>
      <div className="flex gap-2 items-center justify-center">
        <div className="min-h-[2px]  max-h-[2px] bg-forest min-w-1140 mt-2 pointer-events-none select-none max-w-1140 mr-auto ml-auto"></div>
      </div>
      <div className="min-h-7"></div>
      <div className="flex  max-w-1140">
        <p className="text-forest font-bold text-[25px] text-center  mr-auto ml-auto">
          تقرؤون في مجلة تبيان 2024
        </p>
      </div>
      <div className="min-h-7"></div>

      {researches.map((research) => (
        <div className="flex justify-center items-center flex-wrap gap-10">
          <img src={research.rImage} alt="" />
          <p>{research.rTitle}</p>
          <p>{research.publisherName}</p>
        </div>
      ))}
    </div>
  );
};

export default ResearchesHomePage;
