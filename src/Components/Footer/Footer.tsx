import React from "react";
import logo from "../../img/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";

import "../../index.css"




type Props = {};

const Footer = (props: Props) => {
  return (
    <div className="Footer">
      <ul className="FooterList">
        <li className="About">
          <img className="logo" src={logo} alt="" />
          <p>
            مجلّة علميّة دورية نصف سنوية محكّمة، تصدر عن مركز مداد للدراسات
            والبحوث التربوية، باللغة العربية والإنجليزية، وتُعنى بنشر الدراسات
            في العلوم التربوية والنفسية ودراسات علم الاجتماع، التي تتميّز
            بالأصالة، والمعاصرة، كما تُسهم في تطوير الحقل المعرفي موضوع الاختصاص
          </p>
          <button className="Button">قراءة المزيد</button>
          <p className="Copyright">Copyright Midad Center</p>
        </li>
        <li className="Contact">
          <ul className="ContactList">
            <li>
              <h2>معلومات التواصل</h2>
            </li>
            <li>
              MÜCAHITLER MH. 52009 NOLU CD. N:18 SELÇUK KARSLIOĞLU İŞ MERKEZİ
              KAT:6 DAIRE:40 Ş.KAMIL/G.ANTEP
            </li>
            <li>00905541822114</li>
            <li>s.research@edumidad.org</li>
            <li className="IconList">
              <div>
                <FontAwesomeIcon icon={faTwitter}></FontAwesomeIcon>
              </div>
              <div>
                <FontAwesomeIcon icon={faInstagram}></FontAwesomeIcon>
              </div>
              <div>
                <FontAwesomeIcon icon={faFacebook}></FontAwesomeIcon>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
