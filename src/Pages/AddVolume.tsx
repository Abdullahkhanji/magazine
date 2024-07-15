import React, { useId, useState } from "react";
import Footer from "../Components/Footer/Footer";
import Navbar from "../Components/Navbar/Navbar";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../App";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { Research, Volume } from "./../Components/Volumes/Volumes";

type Props = {};
const AddVolume = (props: Props) => {
  const storage = getStorage();
  const initialResearch: Research = {
    Id: 0,
    No: 0,
    rTitle: "",
    publisherName: "",
    publisherJob: "",
    publisherEmail: "",
    summary: "",
    rImage: "",
    rFile: "",
  };

  const [searchData, setSearchData] = useState<Research[]>([]);
  const [title, setTitle] = useState("");
  const [cover, setCover] = useState("");
  const [file, setFile] = useState("");

  const addResearch = () => {
    const id = new Date().getTime();
    const newResearch = { ...initialResearch, Id: id };
    setSearchData([...searchData, newResearch]);
  };

  const addVolume = async () => {
    await addDoc(collection(db, "volumes"), {
      title,
      cover,
      file,
      researches: searchData,
    });
  };

  const setSearchImage = async (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const file = e.target.files?.[0];
    if (file) {
      const sCoverRef = ref(storage, `researchCover/${searchData[i].Id}.${file.name.split('.').pop()}`);
      try {
        await uploadBytes(sCoverRef, file);
        setSearchData(
          searchData.map((research, index) => 
            index === i
              ? { ...research, rImage: sCoverRef.fullPath }
              : research
          )
        );
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const setSearchFile = async (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const file = e.target.files?.[0];
    if (file) {
      const sFileRef = ref(storage, `researchFile/${searchData[i].Id}.pdf`);
      try {
        await uploadBytes(sFileRef, file);
        setSearchData(
          searchData.map((research, index) => 
            index === i
              ? { ...research, rFile: sFileRef.fullPath }
              : research
          )
        );
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const vCoverRef = ref(storage, `volumeCover/${file.name}`);
      try {
        const snapshot = await uploadBytes(vCoverRef, file);
        setCover(snapshot.ref.fullPath);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const vFileRef = ref(storage, `volumeFile/${file.name}`);
      try {
        const snapshot = await uploadBytes(vFileRef, file);
        setFile(snapshot.ref.fullPath);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="Header">
        <h1>اضافة مجلة</h1>
      </div>
      <div className="AltHeader">
        <h2>اضافة مجلة</h2>
      </div>
      <div className="AddResearch">
        <div className="VolumeInfo">
          <label htmlFor="">عدد المجلة</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label htmlFor="">غلاف المجلة</label>
          <input
            className="AddImage"
            type="file"
            accept="image/jpeg, image/png"
            onChange={handleImageChange}
          />

          <label htmlFor="">ملف المجلة</label>
          <input
            className="AddImage"
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
          />
        </div>
        <div className="Research" id="Research">
          {searchData.map((research, i) => (
            <div key={research.No} className="ResearchInfo">
              <h2>البحث {i + 1}</h2>
              <div>
                <label htmlFor="">عنوان البحث</label>
                <input
                  type="text"
                  name="rTitle"
                  placeholder="Part Name"
                  className="input-field"
                  value={research.rTitle}
                  onChange={(e) =>
                    setSearchData(
                      searchData.map((res, index) =>
                        index === i
                          ? { ...res, rTitle: e.target.value }
                          : res
                      )
                    )
                  }
                />
              </div>
              <div>
                <label htmlFor="">اسم الناشر</label>
                <input
                  type="text"
                  name="publisherName"
                  placeholder="Publisher Name"
                  className="input-field"
                  value={research.publisherName}
                  onChange={(e) =>
                    setSearchData(
                      searchData.map((res, index) =>
                        index === i
                          ? { ...res, publisherName: e.target.value }
                          : res
                      )
                    )
                  }
                />
              </div>
              <div>
                <label htmlFor="">عمل الناشر</label>
                <input
                  type="text"
                  name="publisherJob"
                  placeholder="Publisher job"
                  className="input-field"
                  value={research.publisherJob}
                  onChange={(e) =>
                    setSearchData(
                      searchData.map((res, index) =>
                        index === i
                          ? { ...res, publisherJob: e.target.value }
                          : res
                      )
                    )
                  }
                />
              </div>
              <div>
                <label htmlFor="">بريد الناشر</label>
                <input
                  type="text"
                  name="publisherEmail"
                  placeholder="Publisher email"
                  className="input-field"
                  value={research.publisherEmail}
                  onChange={(e) =>
                    setSearchData(
                      searchData.map((res, index) =>
                        index === i
                          ? { ...res, publisherEmail: e.target.value }
                          : res
                      )
                    )
                  }
                />
              </div>
              <div>
                <label>ملخص البحث</label>
                <textarea
                  placeholder="summary"
                  name="summary"
                  value={research.summary}
                  onChange={(e) =>
                    setSearchData(
                      searchData.map((res, index) =>
                        index === i
                          ? { ...res, summary: e.target.value }
                          : res
                      )
                    )
                  }
                ></textarea>
              </div>
              <div>
                <label htmlFor="">صورة البحث</label>
                <input
                  className="AddImage"
                  name="rImage"
                  type="file"
                  accept="image/jpeg, image/png"
                  onChange={(e) => setSearchImage(e, i)}
                />
              </div>
              <div>
                <label htmlFor="">ملف البحث</label>
                <input
                  className="AddImage"
                  name="rFile"
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setSearchFile(e, i)}
                />
              </div>
            </div>
          ))}
          <button className="Button" onClick={addResearch}>
            Add Input Fields
          </button>
          <button className="Button" onClick={addVolume}>
            Add Volume
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default AddVolume;
