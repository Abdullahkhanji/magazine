import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'
import { faCaretDown, faChevronDown, faGears, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTranslation } from 'react-i18next'
import midadLogo from '../img/لوغو المركز الجديد.png'

const AboutMidad = () => {
    const [t, i18n] = useTranslation('global')

    return (
        <>
            <Navbar />
            <div className="Header">
                <h1>{t('AboutMidad.header')}</h1>
            </div>
            <div className="max-w-[60%] font-semibold mr-auto ml-auto ">
                <div className="flex justify-center mt-24">
                    {' '}
                    <img src={midadLogo} className="flex justify-center w-200" />{' '}
                </div>

                <h1 className="flex justify-center text-32 pt-11 pb-10 text-pigment font-semibold">
                    {t('AboutMidad.header')}
                </h1>
                <div className="min-h-[2px]  max-h-[2px] bg-forest min-w-570 mt-2 pointer-events-none select-none"></div>
                <div>
                    <p className="max-w-[35%] mr-auto ml-auto text-justify text-wrap mt-16 ">
                        {t('AboutMidad.introduction')}
                    </p>

                    <div className="flex justify-around mt-44">
                        <section className="max-w-[35%] ">
                            <h1 className="text-32 pb-10 text-pigment font-semibold">{t('AboutMidad.vision')}</h1>
                            <p className="max-w-[70%] text-justify text-wrap mt-10 ">{t('AboutMidad.visiont')} </p>
                        </section>
                        <section className="max-w-[35%] ">
                            <h1 className="text-32  pb-10 text-pigment font-semibold">{t('AboutMidad.mission')}</h1>
                            <p className="max-w-[70%] text-justify text-wrap mt-10 ">{t('AboutMidad.missiont')}</p>
                        </section>
                        <section className="max-w-[35%] ">
                            <h1 className="   text-32 pb-10 text-pigment font-semibold">{t('AboutMidad.values')}</h1>
                            <p className=" max-w-[70%] text-justify text-wrap mt-10">{t('AboutMidad.valuest')}</p>
                        </section>
                    </div>
                    <h1 className="flex justify-center text-32 pt-11 pb-10 text-pigment font-semibold">
                        {t('AboutMidad.areasOfWork')}
                    </h1>
                    <FontAwesomeIcon
                        icon={faChevronDown}
                        className="text-pigment size-24 flex justify-center  pb-10 mr-[46%] text-center "
                    />

                    <div>
                        <section>
                            <h1 className="text-32 pt-11 pb-10 text-pigment font-semibold flex justify-center max-w-[48%]">
                                {t('AboutMidad.first')}
                            </h1>
                            <p className="max-w-[48%] text-justify text-wrap mt-10 ">{t('AboutMidad.firstt')}</p>
                            <div className="min-h-[2px]  max-h-[2px] bg-forest w-[48%] mt-16 pointer-events-none select-none"></div>
                        </section>

                        <section className="mr-[50%]">
                            <div className="">
                                <h1 className="text-32 pt-11 pb-10 text-pigment font-semibold flex justify-center ">
                                    {t('AboutMidad.second')}
                                </h1>
                                <p className="ml-auto text-justify text-wrap mt-10 ">{t('AboutMidad.secondt')}</p>
                                <div className="min-h-[2px]  max-h-[2px] bg-forest  mt-16 pointer-events-none select-none"></div>
                            </div>
                        </section>
                        <section>
                            <h1 className="text-32 pt-11 pb-10 text-pigment font-semibold flex justify-center max-w-[48%]">
                                {t('AboutMidad.third')}
                            </h1>
                            <p className="max-w-[48%] text-justify text-wrap mt-10 ">{t('AboutMidad.thirdt')}</p>
                        </section>
                        <section>
                            <ul className="max-w-[48%] pb-24 list-disc pt-10 ">
                                <FontAwesomeIcon icon={faCaretDown} className="text-pigment size-24 mr-[35%] pb-10  " />
                                <li className="text-justify">{t('AboutMidad.third1')}</li>
                                <li className="text-justify">{t('AboutMidad.third2')}</li>
                                <li className="text-justify">{t('AboutMidad.third3')}</li>
                                <li className="text-justify">{t('AboutMidad.third4')}</li>
                                <li className="text-justify">{t('AboutMidad.third5')}</li>
                                <li className="text-justify">{t('AboutMidad.third6')}</li>
                            </ul>
                        </section>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
export default AboutMidad
