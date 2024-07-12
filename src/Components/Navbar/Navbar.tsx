import React, { useEffect, useState } from "react";

import logo from "../../img/logo.png";

import "../../index.css";
import { getAuth, signOut } from "firebase/auth";
import { db } from "../../App";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { Volume } from "../../Pages/Home";
import { QueryDocumentSnapshot, collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useParams } from "react-router";

type Props = {};

const Navbar = (props: Props) => {

  const auth = getAuth();
  const logout = () => {
    signOut(auth);
  };


  const [volumes, setVolumes] = useState<Volume[]>([]);

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
      <div className="LogoBar">
        <img className="logo" src={logo} />
        <div className="logout" onClick={logout}>
          logout
        </div>
      </div>
      <nav>
        <ul className="NavbarList">
          <li>
            <a href="/">الرئيسية</a>
          </li>
          <li>
            <a href="#">عن المجلة </a>
            <ul className="NavbarDropdown">
              <li>
                <a href="#">عن مجلة تبيان</a>
              </li>
              <li>
                <a href="#">عن مركز مداد</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="/all-volumes">أعداد المجلة </a>
            <ul className="NavbarDropdown">
              {volumes.map((volume) => (
                <li key={volume.title}>
                  <a href={`/volume-page/${volume.id}`}>{volume.title}</a>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <a href="#">تعليمات النشر </a>
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
            <a href="#">تقديم الأبحاث</a>
          </li>
          <li>
            <a href="#">أعضاء هيئة التحرير</a>
          </li>
          <li>
            <a href="#">تواصل معنا</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
