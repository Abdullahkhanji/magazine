import { doc, getDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../App";
import { Research, Volume } from "../Components/Volumes/Volumes";

const ResearchesPage = () => {
  const [research, setResearch] = useState<Research | null>(null);
  const { id, vid } = useParams();
  const storage = getStorage();

  const getResearchData = async () => {
    if (vid !== undefined) {
      const docRef = doc(db, "volumes", vid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const docData = docSnap.data() as Volume;

        for (const research of docData.researches) {
          if (research.Id === Number(id)) {
            const index: Research = {
              Id: research.Id,
              No: research.No,
              rTitle: research.rTitle,
              publisherName: research.publisherName,
              publisherEmail: research.publisherEmail,
              publisherJob: research.publisherJob,
              summary: research.summary,
            };

            if (research.rFile) {
              try {
                const fileRef = ref(storage, research.rFile);
                index.rFile = await getDownloadURL(fileRef);
                console.log('File URL:', index.rFile);
              } catch (error) {
                console.error('Error fetching file URL:', error);
              }
            }

            if (research.rImage) {
              try {
                const coverRef = ref(storage, research.rImage);
                index.rImage = await getDownloadURL(coverRef);
                console.log('Image URL:', index.rImage);
              } catch (error) {
                console.error('Error fetching image URL:', error);
              }
            }

            setResearch(index);
            break;
          }
        }
      } else {
        console.log("No such document!");
      }
    }
  };

  useEffect(() => {
    getResearchData();
  }, [id, vid]);

  return (
    <>
      <div>{research?.rTitle}</div>
      {research?.rImage ? (
        <img src={research.rImage} alt={research.rTitle} />
      ) : (
        <div>No Image Available</div>
      )}
    </>
  );
};
export default ResearchesPage;
