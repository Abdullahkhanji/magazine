import { doc, getDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../App";
import Volumes, { Research, Volume } from "../Components/Volumes/Volumes";
import Footer from "../Components/Footer/Footer";
import Navbar from "../Components/Navbar/Navbar";

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
      <Navbar />

      <div className="Header">
        <h1>{research?.rTitle}</h1>
      </div>
      <div className="max-w-[75%] mr-auto ml-auto mt-14 mb-14 flex justify-center relative">
        <section className="">
          {research?.rImage ? (
            <img className="w-100%] h-[100%] rounded-xl shadow-2xl blur-sm backdrop-brightness-0 brightness-50 pointer-events-none select-none" src={research.rImage} alt={research.rTitle} />
          ) : (
            <div>No Image Available</div>
          )}
        </section>

        <section className="absolute pt-24 text-logoColor max-w-[60%] ">
          <h1 className="text-48 flex justify-center pb-24 ">{research?.rTitle}</h1>

          <div className="text-24">
          يسر هيئة تحرير مجلة تبيان للعلوم التربوية والاجتماعية، التي تصدر عن مركز مداد للدراسات والبحوث التربوية، أن تُقدّم للقراء الكرام العدد السابع من المجلة، وهو العدد الأول من المجلد الرابع للعام 2024. وقد احتوى هذا العدد على سبعة أبحاث متميزة، تناولت مواضيع مهمة وحديثة في مجالات العلوم التربوية والنفسية والاجتماعية، وتم نشرها بعد مرورها بعملية التحكيم العلمي الدقيقة والموضوعية، والتعديل اللغوي والفني، وفقاً للمعايير الأكاديمية المتبعة في المجلة.
          {research?.summary}
          </div>
        </section>

      </div>
      <Footer />
    </>
  );
};
export default ResearchesPage;
