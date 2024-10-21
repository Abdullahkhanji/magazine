import React from 'react'
import Footer from '../Components/Footer/Footer'
import Navbar from '../Components/Navbar/Navbar'
import { useTranslation } from 'react-i18next'

type Props = {}

const PublicationSteps = (props: Props) => {
    const [t, i18n] = useTranslation('global')
    return (
        <>
            <Navbar />
            <div className="Header">
                <h1>{t('PublicationSteps.header')}</h1>
            </div>
            <div className="AltHeader">
                <h2>{t('PublicationSteps.header')}</h2>
            </div>
            <div className="List ">
                <ol>
                    <li>{t('PublicationSteps.p1')}</li>
                    <li>{t('PublicationSteps.p2')}</li>
                    <li>{t('PublicationSteps.p3')}</li>
                    <li>{t('PublicationSteps.p4')}</li>
                    <li>{t('PublicationSteps.p5')}</li>
                    <li>{t('PublicationSteps.p6')}</li>
                    <li>{t('PublicationSteps.p7')}</li>
                    <li>{t('PublicationSteps.p8')}</li>
                </ol>
            </div>
            <Footer />
        </>
    )
}

export default PublicationSteps
