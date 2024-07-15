import React, { useEffect, useState } from "react";

import logo from "../../img/logo.png";

import "../../index.css";
import { getAuth, signOut } from "firebase/auth";
import { db } from "../../App";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { Volume } from "../Volumes/Volumes";
import {
  QueryDocumentSnapshot,
  collection,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { To, useNavigate, useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

type Props = {};

const Navbar = (props: Props) => {
  const auth = getAuth();
  const logout = () => {
    signOut(auth);
  };

  const [volumes, setVolumes] = useState<Volume[]>([]);

  const navigate = useNavigate();

  const handleClick = (path: To) => {
    navigate(path);
  };

  useEffect(() => {
    const getVolumes = async () => {
      const getData = await getDocs(collection(db, "volumes"));

      const volumesTemp = getData.docs.map((doc: QueryDocumentSnapshot) => {
        const index: Volume = {
          id: doc.id,
          title: doc.data().title,
          researches: doc.data().researches,
        };
        return index as Volume;
      });

      setVolumes(volumesTemp);
    };

    getVolumes();
  }, []);
  useEffect(() => {
    console.log(volumes);
  }, [volumes]);
  return (
    <div className="Navbar">
      <div
        onClick={logout}
        className="flex justify-center items-center  text-[#dc2626] cursor-pointer group bg-[#9a1a1a] hover:opacity-70 duration-300 mt-2 rounded-lg w-[50px]  absolute left-[10px] max-h-[50px] min-h-[50px]"
      >
        <div className="font-bold group-hover:opacity-70 duration-300  ">
          <FontAwesomeIcon icon={faRightFromBracket} />
        </div>
      </div>

      <div
        onClick={() => handleClick("/")}
        className="LogoBar select-none cursor-pointer"
      >
        <img className="logo select-none" src={logo} />
      </div>
      <nav>
        <ul className="NavbarList">
          <li>
            <div
              onClick={() => handleClick("/")}
              className="flex justify-center items-center gap-2 flex-row p-020 text-[#fff] cursor-pointer group "
            >
              <div className="font-bold group-hover:opacity-50 duration-300 ">
                الرئيسية
              </div>
            </div>
          </li>
          <li>
            <div className="flex justify-center items-center gap-2 flex-row p-020 text-[#fff] cursor-pointer group ">
              <div className="font-bold group-hover:opacity-50 duration-300">
                عن المجلة
              </div>
              <FontAwesomeIcon
                icon={faCaretDown}
                className="text-forest group-hover:text-darkpastal duration-300"
              />
            </div>{" "}
            <ul className="NavbarDropdown">
              <li>
                <a href="/about-tibyan">عن مجلة تبيان</a>
              </li>
              <li>
                <a href="#">عن مركز مداد</a>
              </li>
            </ul>
          </li>
          <li>
            <div
              onClick={() => handleClick("/all-volumes")}
              className="flex justify-center items-center gap-2 flex-row p-020 text-[#fff] cursor-pointer group "
            >
              <div className="font-bold group-hover:opacity-50 duration-300">
                اعداد المجلة
              </div>
              <FontAwesomeIcon
                icon={faCaretDown}
                className="text-forest group-hover:text-darkpastal duration-300"
              />
            </div>
            <ul className="NavbarDropdown">
              {volumes.map((volume) => (
                <li key={volume.title}>
                  <a href={`/volume-page/${volume.id}`}>{volume.title}</a>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <div className="flex justify-center items-center gap-2 flex-row p-020 text-[#fff] cursor-pointer group ">
              <div className="font-bold group-hover:opacity-50 duration-300">
                تعليمات النشر
              </div>
              <FontAwesomeIcon
                icon={faCaretDown}
                className="text-forest group-hover:text-darkpastal duration-300"
              />
            </div>

            <ul className="NavbarDropdown">
              <li>
                <a href="/publication-steps">خطوات النشر</a>
              </li>
              <li>
                <a href="/publication-standards">معايير النشر</a>
              </li>
              <li>
                <a href="/publication-ethics">أخلاقيات النشر</a>
              </li>
            </ul>
          </li>
          <li>
            <div className="flex justify-center items-center gap-2 flex-row p-020 text-[#fff] cursor-pointer group ">
              <div className="font-bold group-hover:opacity-50 duration-300">
                عن المجلة
              </div>
              <FontAwesomeIcon
                icon={faCaretDown}
                className="text-forest group-hover:text-darkpastal duration-300"
              />
            </div>
          </li>
          <li>
            <div
              onClick={() => handleClick("MembersOfTheProgram")}
              className="flex justify-center items-center gap-2 flex-row p-020 text-[#fff] cursor-pointer group "
            >
              <div className="font-bold group-hover:opacity-50 duration-300">
                أعضاء هيئة التحرير
              </div>
            </div>
          </li>
          <li>
            <div
              onClick={() => handleClick("/CommunicateWithUs")}
              className="flex justify-center items-center gap-2 flex-row p-020 text-[#fff] cursor-pointer group "
            >
              <div className="font-bold group-hover:opacity-50 duration-300">
                تواصل معنا
              </div>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
