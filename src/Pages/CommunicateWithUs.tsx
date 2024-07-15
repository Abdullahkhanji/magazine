import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";

const CommunicateWithUs = () => {
    return (
        <>
            <Navbar />
            <div className="Header ">
                <h1>اتصل بنا</h1>
            </div >
            <div className="flex p-16" >
                <div>

                    <div className="pr-80 ">
                        <div>
                            <div className="AltHeader">
                                <h2 >Communicate with us</h2>
                                <p className="text-20  pr-200 pt-6 ">For any suggestions or enquiries, feel free to contact us through Midad whatsapp or Tel. No. of the center</p>
                            </div>

                            <section className="text-20 pr-200 pt-16 ">
                                <p className="">00905541822114</p>
                                <p className="pt-5">s.research@edumidad.org</p>
                            </section>
                        </div>
                        <section className="AltHeader pl-10 pt-36 w-9/12">
                            <h2>Submission of researches</h2>
                            <h2>Presenting the research</h2>
                        </section>
                    </div>
                </div>
                <div className="mt-10 pr-24 ">
                    <section className="w-6/12">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d407365.9391877077!2d37.377578!3d37.092109!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1531e6b4f7f18c2f%3A0xc02e8b35116baad0!2sGaziantep%2C%20T%C3%BCrkiye!5e0!3m2!1sen!2sus!4v1720961210476!5m2!1sen!2sus" className="w-400 h-320"></iframe>
                        <h1 className="text-28 pt-6">العنوان</h1>
                        <p className="text-20 pt-3 ">MÜCAHITLER MH. 52009 NOLU CD. N:18 SELÇUK KARSLIOĞLU İŞ MERKEZİ KAT:6 DAIRE:40 Ş.KAMIL/G.ANTEP</p>
                    </section>
                </div>

            </div>
            <Footer />
        </>
    );

};
export default CommunicateWithUs;