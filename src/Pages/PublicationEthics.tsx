import React from 'react'
import Footer from '../Components/Footer/Footer'
import Navbar from '../Components/Navbar/Navbar'
import { useTranslation } from 'react-i18next'

type Props = {}

const PublicationEthics = (props: Props) => {
    const [t, i18n] = useTranslation('global')
    return (
        <>
            <Navbar />
            <div className="Header">
                <h1>{t('PublicationEthics.header')}</h1>
            </div>
            <div className="AltHeader">
                <h2>{t('PublicationEthics.header')}</h2>
            </div>
            <div className="ListEthics">
                <h2>{t('PublicationEthics.first')}</h2>
                <ul>
                    <li>{t('PublicationEthics.f1')}</li>
                    <li>{t('PublicationEthics.f2')}</li>
                    <li>{t('PublicationEthics.f3')}</li>
                    <li>{t('PublicationEthics.f4')}</li>
                    <li>{t('PublicationEthics.f5')}</li>
                    <li>{t('PublicationEthics.f6')}</li>
                    <li>{t('PublicationEthics.f7')}</li>
                </ul>
                <h2>{t('PublicationEthics.originality')}</h2>
                <p>{t('PublicationEthics.o1')}</p>
                <h2>{t('PublicationEthics.second')}</h2>
                <ul>
                    <li>{t('PublicationEthics.s1')}</li>
                    <li>{t('PublicationEthics.s2')}</li>
                    <li>{t('PublicationEthics.s3')}</li>
                    <li>{t('PublicationEthics.s4')}</li>
                    <li>{t('PublicationEthics.s5')}</li>
                    <li>{t('PublicationEthics.s6')}</li>
                    <li>{t('PublicationEthics.s7')}</li>
                </ul>
                <h2>{t('PublicationEthics.third')}</h2>
                <ul>
                    <li>{t('PublicationEthics.t1')}</li>
                    <li>{t('PublicationEthics.t2')}</li>
                    <li>{t('PublicationEthics.t3')}</li>
                    <li>{t('PublicationEthics.t4')}</li>
                    <li>{t('PublicationEthics.t5')}</li>
                    <li>{t('PublicationEthics.t6')}</li>
                    <li>{t('PublicationEthics.t7')}</li>
                </ul>
            </div>
            <Footer />
        </>
    )
}

export default PublicationEthics
