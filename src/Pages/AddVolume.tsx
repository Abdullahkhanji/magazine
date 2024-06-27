import React, { useState } from "react";
import Footer from "../Components/Footer/Footer";
import Navbar from "../Components/Navbar/Navbar";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../App";
import { getStorage, ref, uploadBytes } from "firebase/storage";

type Props = {};

const AddVolume = (props: Props) => {
  const storage = getStorage();
  const Research = {
    No: 0,
    rTitle: "",
    publisherName: "",
    publisherJob: "",
    publisherEmail: "",
    summary: "",
    rImage: "",
    rFile: "",
  };

  const [searchData, setSearchData] = useState([Research]);
  const [title, setTitle] = useState("");
  const [cover, setCover] = useState("");
  const [file, setFile] = useState("");

  const addReseach = () => {
    setSearchData([...searchData, Research]);
    console.log(searchData);
  };

  const addVolume = async (e: any) => {


    const volume = {
      title,
      cover,
      file,
      searchData,
    };
    await addDoc(collection(db, "volumes"), {
      title: title,
      cover: cover,
      file: file,
      researches: searchData,
    });
    console.log(volume);
  };

  const setSearchImage = (e: any, research: typeof Research, i: number) => {
    setSearchData(
      searchData.map(() => {
        if (research.No === i + 1) {
          const sCoverRef = ref(storage, `researchCover/${research.No}`);
          uploadBytes(sCoverRef, e);
          console.log(research)
          return {
            ...research,
            rImage: sCoverRef.fullPath,
          };
        } else {
          return research;
        }
      })
    );
  };
  const setSearchFile = (e: any, research: typeof Research, i: number) => {
    setSearchData(
      searchData.map(() => {
        if (research.No === i + 1) {
          const sFileRef = ref(storage, `researchFile/${i}`);
          uploadBytes(sFileRef, e);
          return {
            ...research,
            rFile: sFileRef.fullPath,
          };
        } else {
          return research;
        }
      })
    );
  };


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Access the uploaded file from input

    if (file) {
      const vCoverRef = ref(storage, `volumeCover/${file.name}`);
      uploadBytes(vCoverRef, file).then((snapshot) => {
        setCover(snapshot.ref.fullPath); // Update state with the full path in Storage
      }).catch((error) => {
        console.error('Error uploading file:', error);
      });
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Access the uploaded file from input

    if (file) {
      const vFileRef = ref(storage, `volumeFile/${file.name}`);
      uploadBytes(vFileRef, file).then((snapshot) => {
        setFile(snapshot.ref.fullPath); // Update state with the full path in Storage
      }).catch((error) => {
        console.error('Error uploading file:', error);
      });
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
            onChange={handleImageChange}

            
          />

          <label htmlFor="">ملف المجلة</label>
          <input
            className="AddImage"
            type="file"
            onChange={handleFileChange}
          />
        </div>
        <div className="Research" id="Research">
          {searchData.map(
            (research, i) => (
              (research.No = i + 1),
              (
                <>
                  <h2>البحث {research.No}</h2>
                  <div key={research.No} className="ResearchInfo">
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
                            searchData.map((research) =>
                              research.No === i + 1
                                ? {
                                    ...research,
                                    rTitle: e.target.value,
                                  }
                                : research
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
                            searchData.map((research) =>
                              research.No === i + 1
                                ? {
                                    ...research,
                                    publisherName: e.target.value,
                                  }
                                : research
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
                            searchData.map((research) =>
                              research.No === i + 1
                                ? {
                                    ...research,
                                    publisherJob: e.target.value,
                                  }
                                : research
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
                            searchData.map((research) =>
                              research.No === i + 1
                                ? {
                                    ...research,
                                    publisherEmail: e.target.value,
                                  }
                                : research
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
                        id=""
                        value={research.summary}
                        onChange={(e) =>
                          setSearchData(
                            searchData.map((research) =>
                              research.No === i + 1
                                ? {
                                    ...research,
                                    summary: e.target.value,
                                  }
                                : research
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
                        onChange={(e) => setSearchImage(e, research, i)}
                      />
                    </div>
                    <div>
                      <label htmlFor="">ملف البحث</label>
                      <input
                        className="AddImage"
                        name="rFile"
                        type="file"
                        onChange={(e) => setSearchFile(e, research, i)}
                      />
                    </div>
                  </div>
                </>
              )
            )
          )}
          <button className="Button" onClick={addReseach}>
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
