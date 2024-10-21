import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import { useTranslation } from "react-i18next";

type Props = {};

const PublicationStandards = (props: Props) => {
  const [t, i18n] = useTranslation('global')
  return (
    <>
      <Navbar />
      <div className="Header">
        <h1>{t('PublicationStandards.header')}</h1>
      </div>
      <div className="AltHeader">
        <h2>{t('PublicationStandards.header')}</h2>
      </div>
      <div className="List">
        <ul>
          <li>
          {t('PublicationStandards.p1')}
          </li>
          <li>
          {t('PublicationStandards.p2')}
          </li>
          <li>
          {t('PublicationStandards.p3')}
          </li>
          <li>
          {t('PublicationStandards.p4')}
          </li>
          <li>
          {t('PublicationStandards.p5')}
          </li>
          <li>
          {t('PublicationStandards.p6')}
          </li>
        </ul>
      </div>
      <Footer />
    </>
  );
};

export default PublicationStandards;
