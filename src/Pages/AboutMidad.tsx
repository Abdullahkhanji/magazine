import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'
import { faCaretDown, faChevronDown, faGears, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTranslation } from 'react-i18next'

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
                    <img
                        src="https://tibyanjournal.com/wp-content/uploads/2021/03/%D9%84%D9%88%D8%BA%D9%88-%D8%A7%D9%84%D9%85%D8%B1%D9%83%D8%B2-2020.jpg"
                        className="flex justify-center"
                    />{' '}
                </div>

                <h1 className="flex justify-center text-32 pt-11 pb-10 text-pigment font-semibold">
                    {t('AboutMidad.header')}
                </h1>
                <div className="min-h-[2px]  max-h-[2px] bg-forest min-w-570 mt-2 pointer-events-none select-none"></div>
                <div>
                    <p className="max-w-[35%] mr-auto ml-auto text-justify text-wrap mt-16 ">
                        {t('AboutMidad.introduction')}
                    </p>

                    {/* <h1 className="flex justify-center text-32 pt-11 pb-10 text-pigment font-medium" >المؤسسة الأم</h1>
                            <p className="max-w-[35%] mr-auto ml-auto text-justify text-wrap mt-10"  >مؤسسة تعليم بلا حدود/مداد هي مؤسسة تعليمية تهتم بشؤون الطلاب في الداخل السوري لكافة المراحل و تعمل على إيجاد فرص تعليمية و منح للطلاب السوريين لتأمين مستقبل أكاديمي افضل لهم و لإبعاد شبح الحرمان من التعليم لأبنائنا الطلبة.</p>
                            <div className="flex justify-center mt-16 mb-16" >
                                <img src="https://tibyanjournal.com/wp-content/uploads/2021/03/%D9%84%D9%88%D8%BA%D9%88-%D9%85%D8%AF%D8%A7%D8%AF-150x150.jpg" />
                            </div> */}
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
                    {/* <h1 className="text-32 pb-10 pt-20 text-pigment font-semibold">أهدافنا</h1>
                    <div className="flex">
                        <ul className="list-disc max-w-[65%]  ">
                            <li className="text-justify">
                                تشجيع المداخل الإبداعية للنهوض بالقطاع التربوي وتنمية قدرات الباحثين والعاملين في قطاعات
                                التعليم العالي وقبل الجامعي وفق معايير الجودة المعتمدة عالميا، لرفع كفاءتهم وفعاليتهم
                                الإنتاجية.
                            </li>
                            <li className="text-justify">
                                الإسهام في دراسة الاحتياجات التربوية والنفسية في سياق الأزمات والحروب وسبل التعافي، ورصد
                                التطورات العلمية والعملية في مجال العلوم التربوية والنفسية العالمية ومحاولة الاستفادة
                                منها في تطوير المجتمعات المحلية.
                            </li>
                            <li className="text-justify">
                                رفد الحكومات والقطاعات التربوية والنفسية بدراسات واستشارات يمكن الاعتماد عليها في وضع
                                خطط مستقبلية لبناء المجتمع وتنميته.
                            </li>
                            <li className="text-justify">
                                وضع حلول علمية لمعالجة أصحاب الأوضاع الهشة اجتماعياً، مثل اليتامى وذوي الإعاقة واللاجئين
                                والنازحين ليكونوا طاقات إيجابية تسهم في إعادة إعمار مجتمعاتهم.
                            </li>
                            <li className="text-justify">
                                إجراء الدراسات في مجال الصحة النفسية، وإنجاز المقاييس والاختبارات النفسية اللازمة
                                لاحتياجات المجتمعات، وتصميم البرامج الإرشادية والعلاجية المناسبة، وتدريب الأشخاص
                                المؤهلين للعمل في هذا القطاع.
                            </li>
                        </ul>
                        <div>
                            <FontAwesomeIcon icon={faGears} className="text-pigment size-24 mr-[150%] mt-[50%] " />
                        </div>
                    </div> */}

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
