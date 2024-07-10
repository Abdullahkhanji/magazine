import { getDocs, collection, QueryDocumentSnapshot } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { db } from "../App";
import Footer from "../Components/Footer/Footer";
import Navbar from "../Components/Navbar/Navbar";
import { Research, Volume } from "./Home";

const AllVolumes = () => {
  const [loading, setLoading] = useState(true);
  const [researches, setResearches] = useState<Research[]>([]);

  useEffect(() => {
    const getVolumes = async () => {
      try {
        const storage = getStorage();
        const getData = await getDocs(collection(db, "volumes"));

        getData.docs.map(async (doc: QueryDocumentSnapshot) => {
          const docData = doc.data() as Volume;

          const researchesTemp = await Promise.all(
            docData.researches.map((research: Research) => {
              const resData: Research = {
                No: research.No,
                rTitle: research.rTitle,
                publisherName: research.publisherName,
                publisherJob: research.publisherJob,
                publisherEmail: research.publisherEmail,
                summary: research.summary,
              };

              const getImages = async () => {
                const coverRef = ref(storage, `${doc.data()["cover"]}`);
                await getDownloadURL(coverRef).then((url) => {
                  resData.rImage = url;
                });
              };
              getImages();
              return resData;
            })
          );

          setResearches(researchesTemp);
        });
      } catch (error) {
        console.error("Error fetching volumes:", error);
      } finally {
        setLoading(false);
      }
    };

    getVolumes();
  }, []);
  useEffect(() => {
    console.log(researches);
  }, [researches]);
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
            <article key={research.No}>
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
          ))}
        </section>
      </div>
      <Footer />
    </>
  );
};

export default AllVolumes;
