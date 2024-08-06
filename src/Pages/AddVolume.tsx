import React, { useId, useState } from "react";
import Footer from "../Components/Footer/Footer";
import Navbar from "../Components/Navbar/Navbar";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../App";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { Research, Volume } from "./../Components/Volumes/Volumes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faX } from "@fortawesome/free-solid-svg-icons";

type Props = {};
const AddVolume = (props: Props) => {
  const storage = getStorage();
  const initialResearch: Research = {
    volumeID: "",
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
    })
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

  const [ARisVisible, setARIsVisible] = useState(false);

  const toggleContentAR = () => {
    console.log("Button clicked");
    setARIsVisible(true);
    setENGIsVisible(false);
    setTRIsVisible(false);
  };

  const [ENGisVisible, setENGIsVisible] = useState(false);

  const toggleContentENG = () => {
    console.log("Button clicked");
    setENGIsVisible(true);
    setTRIsVisible(false);
    setARIsVisible(false);
  };
  const [TRisVisible, setTRIsVisible] = useState(false);

  const toggleContentTR = () => {
    console.log("Button clicked");
    setTRIsVisible(true);
    setENGIsVisible(false);
    setARIsVisible(false);
  };





  return (
    <>
      <Navbar />
      <div className="Header">
        <h1>اضافة مجلة</h1>
      </div>




      <div className="AddVolume">
        <div className="m-32">
          <button onClick={toggleContentAR} className="Button">
            اظهار فورم اللغة العربية
          </button>
          <button onClick={toggleContentENG} className="Button">
            Show The Form In English
          </button>
          <button onClick={toggleContentTR} className="Button">
            Formu Turkçede Görüntüle
          </button>
        </div>

        {ARisVisible && (
          <div className="AddResearch" id="hiddenContent">

            <div className="VolumeInfo">
              <label htmlFor="">عدد المجلة</label>
              <input
                type="text"
                placeholder="عدد المجلة"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="AddVoulumeInput"
              />
              <div className="flex gap-4 pt-12">
                <div className="flex flex-col items-center mb-4 w-1/2">
                  <label className="text-center mb-2" htmlFor="">غلاف المجلة</label>
                  <input
                    className="AddImage"
                    type="file"
                    accept="image/jpeg, image/png"
                    onChange={handleImageChange}
                  />
                </div>
                <div className="flex flex-col items-center mb-4 w-1/2">
                  <label className="text-center mb-2" htmlFor="">ملف المجلة</label>
                  <input
                    className="AddImage"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            </div>
            <div className="Research" id="Research">
              {searchData.map((research, i) => (

                <div key={research.No} className="ResearchInfo">
                  <div className="flex justify-items-end ml-auto">
                    <FontAwesomeIcon icon={faX} className=" cursor-pointer   " />
                  </div>
                  <div className="flex flex-col ml-auto ">

                    <h2 className="font-semibold" >البحث {i + 1}</h2>

                    <label htmlFor=""  className="font-semibold">عنوان البحث</label>

                    <input

                      type="text"
                      name="rTitle"
                      placeholder="عنوان البحث"
                      className="AddVoulumeInput"
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
                    <div>
                      <FontAwesomeIcon icon={faMinus} className="cursor-pointer " />  <FontAwesomeIcon icon={faPlus} className="pr-3 cursor-pointer" />
                      <div className="flex flex-col mb-4  ">

                        <label htmlFor="">اسم الناشر</label>
                        <input
                          type="text"
                          name="publisherName"
                          placeholder="اسم الناشر"
                          className="AddVoulumeInput"
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

                      <div className="flex flex-col mb-4  ">
                        <label htmlFor="">عمل الناشر</label>
                        <input
                          type="text"
                          name="publisherJob"
                          placeholder="عمل الناشر"
                          className="AddVoulumeInput"
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
                    </div>

                    <div className="flex flex-col mb-4  ">
                      <label htmlFor=""  >بريد الناشر</label>
                      <input
                        type="text"
                        name="publisherEmail"
                        placeholder="إيميل الناشر"
                        className="AddVoulumeInput"
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
                  </div>
                  <div className="flex flex-col">
                    <label className="">ملخص البحث</label>
                    <textarea
                      placeholder="ملخص البحث"
                      name="summary"
                      className="SummaryInput "
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
                    <div className="flex flex-col">
                      <label htmlFor="" >صورة البحث</label>
                      <input
                        className="AddImage"
                        name="rImage"
                        type="file"
                        accept="image/jpeg, image/png"
                        onChange={(e) => setSearchImage(e, i)}
                      />
                    </div>
                    <div className="flex flex-col">
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
        )}















        {ENGisVisible && (
          <div className="AddResearch" id="hiddenContent">

            <div className="VolumeInfo">
              <label htmlFor="">Magazine Number</label>
              <input
                type="text"
                placeholder="Magazine Number"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="AddVoulumeInput"
              />
              <div className="flex gap-4 pt-12">
                <div className="flex flex-col items-center mb-4 w-1/2">
                  <label className="text-center mb-2" htmlFor="">Magazine Cover</label>
                  <input
                    className="AddImage"
                    type="file"
                    accept="image/jpeg, image/png"
                    onChange={handleImageChange}
                  />
                </div>
                <div className="flex flex-col items-center mb-4 w-1/2">
                  <label className="text-center mb-2" htmlFor="">Magazine File</label>
                  <input
                    className="AddImage"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            </div>
            <div className="Research" id="Research">
              {searchData.map((research, i) => (
                <div key={research.No} className="ResearchInfo">
                  <div className="flex justify-items-end ml-auto">
                    <FontAwesomeIcon icon={faX} className=" cursor-pointer   " />
                  </div>
                  <div className="flex flex-col ml-auto">
                    <h2 className="font-semibold">Research {i + 1}</h2>
                    <label htmlFor="" className="font-semibold">Research Title</label>
                    <input
                      type="text"
                      name="rTitle"
                      placeholder="Research Title"
                      className="AddVoulumeInput"
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
                    <div>
                    <FontAwesomeIcon icon={faMinus} className="cursor-pointer " />  <FontAwesomeIcon icon={faPlus} className="pr-3 cursor-pointer" />
                      <div className="flex flex-col mb-4">
                        <label htmlFor="">Publisher Name</label>
                        <input
                          type="text"
                          name="publisherName"
                          placeholder="Publisher Name"
                          className="AddVoulumeInput"
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
                      <div className="flex flex-col mb-4">
                        <label htmlFor="">Publisher Job</label>
                        <input
                          type="text"
                          name="publisherJob"
                          placeholder="Publisher Job"
                          className="AddVoulumeInput"
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
                    </div>

                    <div className="flex flex-col mb-4">
                      <label htmlFor="">Publisher Email</label>
                      <input
                        type="text"
                        name="publisherEmail"
                        placeholder="Publisher Email"
                        className="AddVoulumeInput"
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
                  </div>
                  <div className="flex flex-col">
                    <label className="">Research Summary</label>
                    <textarea
                      placeholder="Summary"
                      name="summary"
                      className="SummaryInput"
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
                    <div className="flex flex-col">
                      <label htmlFor="">Research Image</label>
                      <input
                        className="AddImage"
                        name="rImage"
                        type="file"
                        accept="image/jpeg, image/png"
                        onChange={(e) => setSearchImage(e, i)}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="">Research File</label>
                      <input
                        className="AddImage"
                        name="rFile"
                        type="file"
                        accept=".pdf"
                        onChange={(e) => setSearchFile(e, i)}
                      />
                    </div>
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
        )}















        {TRisVisible && (
          <div className="AddResearch" id="hiddenContent">

            <div className="VolumeInfo">
              <label htmlFor="">Dergi Numarası</label>
              <input
                type="text"
                placeholder="Dergi Numarası"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="AddVoulumeInput"
              />
              <div className="flex gap-4 pt-12">
                <div className="flex flex-col items-center mb-4 w-1/2">
                  <label className="text-center mb-2" htmlFor="">Dergi Kapağı</label>
                  <input
                    className="AddImage"
                    type="file"
                    accept="image/jpeg, image/png"
                    onChange={handleImageChange}
                  />
                </div>
                <div className="flex flex-col items-center mb-4 w-1/2">
                  <label className="text-center mb-2" htmlFor=""> Dergi Dosyası</label>
                  <input
                    className="AddImage"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            </div>
            <div className="Research" id="Research">
              {searchData.map((research, i) => (
                <div key={research.No} className="ResearchInfo">
                  <div className="flex justify-items-end ml-auto">
                    <FontAwesomeIcon icon={faX} className=" cursor-pointer   " />
                  </div>

                  <div className="flex flex-col ml-auto">
                    <h2 className="font-semibold">Araştırma {i + 1}</h2>
                    <label htmlFor="" className="font-semibold">Araştırma Başlığı</label>
                    <input
                      type="text"
                      name="rTitle"
                      placeholder="Araştırma Başlığı"
                      className="AddVoulumeInput"
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
                    <div>
                    <FontAwesomeIcon icon={faMinus} className="cursor-pointer " />  <FontAwesomeIcon icon={faPlus} className="pr-3 cursor-pointer" />
                      <div className="flex flex-col mb-4">
                        <label htmlFor="">Yayıncı Adı</label>
                        <input
                          type="text"
                          name="publisherName"
                          placeholder="Yayıncı Adı"
                          className="AddVoulumeInput"
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
                      <div className="flex flex-col mb-4">
                        <label htmlFor="">Yayıncı Görevi</label>
                        <input
                          type="text"
                          name="publisherJob"
                          placeholder="Yayıncı Görevi"
                          className="AddVoulumeInput"
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
                    </div>

                    <div className="flex flex-col mb-4">
                      <label htmlFor="">Yayıncı E-posta</label>
                      <input
                        type="text"
                        name="publisherEmail"
                        placeholder="Yayıncı E-posta"
                        className="AddVoulumeInput"
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
                  </div>
                  <div className="flex flex-col">
                    <label className="">Araştırma Özeti</label>
                    <textarea
                      placeholder="Özet"
                      name="summary"
                      className="SummaryInput"
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
                    <div className="flex flex-col">
                      <label htmlFor="">Araştırma Resmi</label>
                      <input
                        className="AddImage"
                        name="rImage"
                        type="file"
                        accept="image/jpeg, image/png"
                        onChange={(e) => setSearchImage(e, i)}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="">Araştırma Dosyası</label>
                      <input
                        className="AddImage"
                        name="rFile"
                        type="file"
                        accept=".pdf"
                        onChange={(e) => setSearchFile(e, i)}
                      />
                    </div>
                  </div>
                </div>

              ))}
              <button className="Button" onClick={addResearch}>
                Girdi Alanları Ekle
              </button>
              <button className="Button" onClick={addVolume}>
                Cilt Ekle
              </button>
            </div>

          </div>
        )}
      </div>
      <Footer />
    </>
  );
};
export default AddVolume;
