import React from "react";
import logo from "D:/magazine-website/magazine/src/img/logo.png";
import "../../index.css"

type Props = {};

const Navbar = (props: Props) => {
  return (
    <div className="Navbar">
      <div>
        <img className="logo" src={logo} />
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
