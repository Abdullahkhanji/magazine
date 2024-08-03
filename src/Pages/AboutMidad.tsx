        import Navbar from "../Components/Navbar/Navbar";
        import Footer from "../Components/Footer/Footer";
        import { faCaretDown, faChevronDown, faGears, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
        import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


        const AboutMidad = () => {
            return (
                <>
                    <Navbar />
                    <div className="Header">
                        <h1>مركز مداد للدراسات والبحوث التربوية </h1>
                    </div>
                    <div className="max-w-[60%] font-semibold mr-auto ml-auto ">
                        <div className="flex justify-center mt-24"> <img src="https://tibyanjournal.com/wp-content/uploads/2021/03/%D9%84%D9%88%D8%BA%D9%88-%D8%A7%D9%84%D9%85%D8%B1%D9%83%D8%B2-2020.jpg" className="flex justify-center" /> </div>

                        <h1 className="flex justify-center text-32 pt-11 pb-10 text-pigment font-semibold" >مركز مداد للدراسات والبحوث التربوية</h1>
                        <div className="min-h-[2px]  max-h-[2px] bg-forest min-w-570 mt-2 pointer-events-none select-none"></div>
                        <div>
                            <p className="max-w-[35%] mr-auto ml-auto text-justify text-wrap mt-16 ">مركز مداد للدراسات والبحوث التربوية مؤسسة بحثية مستقلة، تختص بالدراسات والاستشارات التربوية والنفسية والتنموية، وقضايا التعافي المجتمعي المرتبطة بالتربية والتعليم، وتعمل على رفد الحكومات والمنظمات والجهات الفاعلة بالدراسات والاستشارات والمشاريع التي يمكن الاعتماد عليها لوضع خطط مستقبلية بناءة، وتعد مؤسسة تعليم بلا حدود/ مداد هي المؤسسة الأم للمركز.</p>

                            <h1 className="flex justify-center text-32 pt-11 pb-10 text-pigment font-medium" >المؤسسة الأم</h1>
                            <p className="max-w-[35%] mr-auto ml-auto text-justify text-wrap mt-10"  >مؤسسة تعليم بلا حدود/مداد هي مؤسسة تعليمية تهتم بشؤون الطلاب في الداخل السوري لكافة المراحل و تعمل على إيجاد فرص تعليمية و منح للطلاب السوريين لتأمين مستقبل أكاديمي افضل لهم و لإبعاد شبح الحرمان من التعليم لأبنائنا الطلبة.</p>
                            <div className="flex justify-center mt-16 mb-16" >
                                <img src="https://tibyanjournal.com/wp-content/uploads/2021/03/%D9%84%D9%88%D8%BA%D9%88-%D9%85%D8%AF%D8%A7%D8%AF-150x150.jpg" />
                            </div>
                            <div className="flex justify-around">
                                <section className="max-w-[35%] ">
                                    <h1 className="text-32 pb-10 text-pigment font-semibold" >رؤيتنا</h1>
                                    <p className="max-w-[70%] text-justify text-wrap mt-10 ">تضييق الفجوة بين المعرفة وصناعة القرار في المؤسسات التربوية في المجتمع السوري؛ وتقديم تحليلات ودراسات استراتيجية تتميز بالعمق والمهنية، ومناسبة من حيث واقعيتها وإمكانية تطبيقها، وزمن تقديمها. </p>
                                </section>
                                <section className="max-w-[35%] ">
                                    <h1 className="text-32  pb-10 text-pigment font-semibold" >رسالتنا</h1>
                                    <p className="max-w-[70%] text-justify text-wrap mt-10 ">العمل على التطوير المعرفي، وابتكار حلول علمية وعملية حول قضايا التعافي لقطاع التربية والتعليم، والسعي لتعزيز الصحة النفسية في المجتمعات المعاصرة، وبناء شراكات محلية وإقليمية، لإحداث تنمية قائمة على الاستفادة من الخبرات الدولية، والدراسات الأكاديمية، وتكنولوجيا المعلومات الحديثة.</p>
                                </section>
                                <section className="max-w-[35%] ">
                                    <h1 className="   text-32 pb-10 text-pigment font-semibold" >قيمنا</h1>
                                    <p className=" max-w-[70%] text-justify text-wrap mt-10">الجودة والتميز، الحرية الأكاديمية، المنهجية العلمية، التحسين المستمر ، احترام القيم المجتمعية والخصوصية الثقافية.</p>
                                </section>
                            </div>
                            <h1 className="text-32 pb-10 pt-20 text-pigment font-semibold" >أهدافنا</h1>
                            <div className="flex">
                                <ul className="list-disc max-w-[65%]  ">
                                    <li className="text-justify">تشجيع المداخل الإبداعية للنهوض بالقطاع التربوي وتنمية قدرات الباحثين والعاملين في قطاعات التعليم العالي وقبل الجامعي وفق معايير الجودة المعتمدة عالميا، لرفع كفاءتهم وفعاليتهم الإنتاجية.</li>
                                    <li className="text-justify">الإسهام في دراسة الاحتياجات التربوية والنفسية في سياق الأزمات والحروب وسبل التعافي، ورصد التطورات العلمية والعملية في مجال العلوم التربوية والنفسية العالمية ومحاولة الاستفادة منها في تطوير المجتمعات المحلية.</li>
                                    <li className="text-justify">رفد الحكومات والقطاعات التربوية والنفسية بدراسات واستشارات يمكن الاعتماد عليها في وضع خطط مستقبلية لبناء المجتمع وتنميته.</li>
                                    <li className="text-justify">وضع حلول علمية لمعالجة أصحاب الأوضاع الهشة اجتماعياً، مثل اليتامى وذوي الإعاقة واللاجئين والنازحين ليكونوا طاقات إيجابية تسهم في إعادة إعمار مجتمعاتهم.</li>
                                    <li className="text-justify">إجراء الدراسات في مجال الصحة النفسية، وإنجاز المقاييس والاختبارات النفسية اللازمة لاحتياجات المجتمعات، وتصميم البرامج الإرشادية والعلاجية المناسبة، وتدريب الأشخاص المؤهلين للعمل في هذا القطاع.</li>
                                </ul>
                                <div>
                                    <FontAwesomeIcon icon={faGears} className="text-pigment size-24 mr-[150%] mt-[50%] " />
                                </div>
                            </div>

                            <h1 className="flex justify-center text-32 pt-11 pb-10 text-pigment font-semibold" >مجالات عمل المركز</h1>
                            <FontAwesomeIcon icon={faChevronDown} className="text-pigment size-24 flex justify-center  pb-10 mr-[46%] text-center " />

                            <div >
                                <section>
                                    <h1 className="text-32 pt-11 pb-10 text-pigment font-semibold flex justify-center max-w-[48%]" >أولاً: وحدة البحوث والدراسات</h1>
                                    <p className="max-w-[48%] text-justify text-wrap mt-10 ">تُصدر المجلات العلمية المحكمة، والدراسات التخصصية الموسعة، وتقيم ورش العمل النوعية، والمؤتمرات العلمية البحثية، كما تقدم الاستشارات العلمية لأصحاب القرار، بهدف إحداث التأثير المجتمعي المطلوب في صنع السياسات والقرارات، بما يحقق أهداف التنمية المجتمعية. ومحاولة استشراف المستقبل من خلال تقديم دراسات ومبادرات تربوية ونفسية، وإقامة علاقات شراكة مع المراكز الدولية والإقليمية ذات الصلة.</p>
                                    <div className="min-h-[2px]  max-h-[2px] bg-forest w-[48%] mt-16 pointer-events-none select-none"></div>
                                </section>

                                <section className="mr-[50%]">
                                    <div className="">
                                        <h1 className="text-32 pt-11 pb-10 text-pigment font-semibold flex justify-center " >ثانياً: وحدة التطوير المجتمعي</h1>
                                        <p className="ml-auto text-justify text-wrap mt-10 " >تهدف إلى زيادة فاعلية وكفاءة الباحثين والأكاديميين المختصين، ومؤسسات المجتمع في المجالات التربوية والتعليمية والنفسية، وتزويدهم بالمعلومات الموثوقة وتصحيح المفاهيم الخاطئة واستثمار الموارد البشرية وتنميتها، وحل مشكلاته، من خلال إكسابهم المهارات اللازمة، واستثمار وسائل التواصل الاجتماعي المختلفة، والأقنية الإعلامية المسموعة والمرئية.</p>
                                        <div className="min-h-[2px]  max-h-[2px] bg-forest  mt-16 pointer-events-none select-none"></div>
                                    </div>
                                </section>
                                <section >
                                    <h1 className="text-32 pt-11 pb-10 text-pigment font-semibold flex justify-center max-w-[48%]" >ثالثاً: وحدة الخدمات الخاصة</h1>
                                    <p className="max-w-[48%] text-justify text-wrap mt-10 ">يقدم المركز عدداً من الخدمات المأجورة بناء على معايير واشتراطات من قبل العملاء وبما يتوافق مع قيم المجتمعات المحلية، وذلك ضمن عقود خاصة، أهمها:</p>

                                </section>
                                <section>
                                    <ul className="max-w-[48%] pb-24 list-disc pt-10 ">
                                        <FontAwesomeIcon
                                            icon={faCaretDown}
                                            className="text-pigment size-24 mr-[35%] pb-10  " />
                                        <li className="text-justify">دراسات بحثية وميدانية في مجال العلوم التربوية والنفسية، بالتعاون مع خبراء وباحثين ميدانيين من ذوي الخبرة.</li>
                                        <li className="text-justify">أدلة تربوية ونفسية ترشد المعلمين ومقدمي الرعاية إلى الإجراءات والخطوات السليمة في التعامل مع المواقف التربوية والنفسية داخل المدرسة أو في السياق الاجتماعي.</li>
                                        <li className="text-justify">حلول تطويرية لاحتياجات المؤسسات التربوية المختلفة، لرفع كفاية العاملين في مجال التربية والتعليم، في مختلف الهيئات والمنظمات الحكومية والخاصة، وإعدادهم علمياً وعملياً.</li>
                                        <li className="text-justify">تقديم المشورة في المجالات التربوية والتعليمية والتدريبية وفق الأسس ومعايير الجودة العالمية المعتمدة.</li>
                                        <li className="text-justify">تصميم المناهج التخصصية للمراحل المتعددة بناء على مواصفات محددة لمؤسسات تربوية وتعليمية أو مدارس خاصة.</li>
                                        <li className="text-justify">تصميم مقاييس واستبانات تربوية ونفسية وفق متطلبات محددة لاستخدامها في أغراض بحثية أو أكاديمية.</li>
                                        <li className="text-justify">تصميم حقائب تدريبية في نطاق التخصصات التربوية والنفسية، وبناء البرامج التدريبية التخصصية.</li>
                                        <li className="text-justify">تنفيذ برامج تدريبية تخصصية وفق المعايير الدولية، ويقوم بها مدربون معتمدون.</li>
                                        <li className="text-justify">تطبيقات تكنولوجية تعليمية للتعليم عن بعد أو لخدمة أغراض تربوية أو نفسية خاصة.</li>
                                    </ul>

                                </section>

                            </div>
                        </div>

                    </div>
                    <Footer />
                </>
            );

        };
        export default AboutMidad;