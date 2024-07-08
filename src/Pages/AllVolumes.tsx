import { getDocs, collection, QueryDocumentSnapshot } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { db } from "../App";
import Footer from "../Components/Footer/Footer";
import Navbar from "../Components/Navbar/Navbar";

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

const AllVolumes = () => {
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

              const [covURL, fURL] = await Promise.all([
                research.rImage ? getDownloadURL(ref(storage, research.rImage)) : null,
                research.rFile ? getDownloadURL(ref(storage, research.rFile)) : null,
              ]);

              if (covURL) resData.rImage = covURL;
              if (fURL) resData.rFile = fURL;

              researchesTemp.push(resData);
            }
          });

          await Promise.all(researchPromises);

          // const [coverURL, fileURL] = await Promise.all([
          //   docData.cover ? getDownloadURL(ref(storage, docData.cover)) : null,
          //   docData.file ? getDownloadURL(ref(storage, docData.file)) : null,
          // ]);

          // if (coverURL) index.cover = coverURL;
          // if (fileURL) index.file = fileURL;

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
  console.log(researches);
  return (
    <>
      <Navbar />

      <div className="allVolumes">
        <section className="articles">
          {researches.map((research) => (
            <React.Fragment key={research.rTitle}>

              <article>
                <div className="article-wrapper">
                  <figure>
                    <img src={research.rImage} alt="" />
                  </figure>
                  <div className="article-body">
                    <h2>{research.rTitle}</h2>
                    <a href="#" className="read-more">
                      <span className="sr-only">about this is some title</span>

                        <path
                          fillRule="evenodd"
                          d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />

                    </a>
                  </div>
                </div>
              </article>
            </React.Fragment>
          ))}
        </section>
      </div>
      <Footer />
    </>
  );
};

export default AllVolumes;
