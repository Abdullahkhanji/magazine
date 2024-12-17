import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'
import logo from '../img/newLogo.png'
import midadLogo from '../img/لوغو المركز الجديد.png'
import { useTranslation } from 'react-i18next'

const AboutTibyan = () => {
    const [t, i18n] = useTranslation('global')
    return (
        <>
            <Navbar />
            <div className="Header">
                <h1>{t('AboutTibyan.header')}</h1>
            </div>
            <div>
                <h2 className="ms-[25%] text-3xl py-16 font-bold">{t('AboutTibyan.header')}</h2>
            </div>
            <div className="w-2/5 ms-[29%]">
                <p className="text-xl">{t('AboutTibyan.introduction')}</p>
            </div>
            <h2 className="text-3xl py-12 font-medium ms-[25%]">{t('AboutTibyan.objectives')}</h2>
            <div className="List">
                <ul>
                    <li>{t('AboutTibyan.o1')}</li>
                    <li>{t('AboutTibyan.o2')}</li>
                    <li>{t('AboutTibyan.o3')}</li>
                    <li>{t('AboutTibyan.o4')}</li>
                    <li>{t('AboutTibyan.o5')}</li>
                    <li>{t('AboutTibyan.o6')}</li>
                    <li>{t('AboutTibyan.o7')}</li>
                    <li>{t('AboutTibyan.o8')}</li>
                    <li>{t('AboutTibyan.o9')}</li>
                </ul>
                <div className="flex">
                    <img className="w-2/5 h-2/5 m-14" src={logo} alt="" />
                    <img className="w-2/5 h-2/5 m-14" src={midadLogo} alt="" />
                </div>
            </div>

            <Footer />
        </>
    )
}

export default AboutTibyan
