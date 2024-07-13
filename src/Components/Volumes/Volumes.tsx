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
export const Volumes = () => {
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
    console.log(volumes);
  }, [volumes]);
  if (loading) {
    return <h1>loading</h1>;
  }

  return (
    <div className="flex-col flex  justify-center items-center">
      <div className="min-h-7"></div>
      <div className="flex gap-2 items-center justify-center">
        <div className="min-h-[2px]  max-h-[2px] bg-forest min-w-570 mt-2 pointer-events-none select-none"></div>
        <p className="font-semibold mt-2 text-pigment pointer-events-none select-none">
          أعداد المجلة
        </p>
        <div className="min-h-[2px] max-h-[2px] bg-forest min-w-570 mt-2 pointer-events-none select-none"></div>
      </div>
      <div className="min-h-7"></div>
      <div className="flex gap-5 items-center justify-center flex-wrap max-w-1140  mr-auto ml-auto">
        {volumes.map((volume) => (
          <div className="max-w-[200px] min-w-[200px] text-center flex flex-col gap-5 cursor-pointer group items-center justify-center">
            <img
              src={volume.cover}
              className="max-h-[270] max-w-[170px]  select-none group-hover:scale-110 duration-300"
              alt=""
            />
            <p className="text-[27px] font-bold group-hover:text-darkpastal duration-300 text-darkspring">
              {volume.title}
            </p>
          </div>
        ))}
      </div>
      <div className="min-h-7"></div>
    </div>
  );
};

export default Volumes;
