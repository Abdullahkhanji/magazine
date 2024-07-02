import React from "react";

import logo from "../../img/logo.png";

import "../../index.css";
import { getAuth, signOut } from "firebase/auth";

type Props = {};

const Navbar = (props: Props) => {
  const auth = getAuth();
  const logout = () => {
    signOut(auth);
  };
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
            <a href="#">أعداد المجلة </a>
            <ul className="NavbarDropdown">
              <li>
                <a href="#">العدد الأول</a>
              </li>
              <li>
                <a href="#">العدد الثاني</a>
              </li>
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
