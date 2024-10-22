import React from 'react'
import Footer from '../Components/Footer/Footer'
import Navbar from '../Components/Navbar/Navbar'
import { useTranslation } from 'react-i18next'

const ResearchPledge = () => {
    const [t, i18n] = useTranslation('global')
    return (
        <>
            <Navbar />
            <div className="Header">
                <h1>{t('ResearchPledge.header')}</h1>
            </div>
            <div className="ListEthics mt-48">
                <p>{t('ResearchPledge.about')}</p>
                <p>00905541822114</p>
                <p>s.research@edumidad.org</p>
            </div>
            <Footer />
        </>
    )
}

export default ResearchPledge
