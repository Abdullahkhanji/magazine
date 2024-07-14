import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";

const MembersOfTheProgram = () => {
    return (
        <>
            <Navbar />
            <div className="Header">
                <h1>أعضاء هيئة التحرير</h1>
            </div>
            <div className="content">

                <ul className="team">
                    <li className="member co-funder">
                        <div className="thumb"></div>
                        <div className="description">
                            <h3 className="memberName">د. فواز العواد</h3>
                            <p>Chris is a front-end developer and designer. He writes a bunch of HTML, CSS, and JavaScript and shakes the pom-poms for CodePen.<a href="https://codepen.io/chriscoyier/">@chriscoyier</a></p>
                        </div>
                    </li>
                    <li className="member co-funder">
                        <div className="thumb"></div>
                        <div className="description">
                        <h3 className="memberName">د. فواز العواد</h3>
                            <p>Alex is a full stack developer. Alex does JavaScript development for CodePen, both front end and back, and just about everything else.<a href="https://codepen.io/quezo/">@quezo</a></p>
                        </div>
                    </li>
                    <li className="member">
                        <div className="thumb"></div>
                        <div className="description">
                        <h3 className="memberName">د. فواز العواد</h3>
                            <p>Marie wears a lot of hats. She is our documentation lead, customer support maestra, editor, and community manager.<a href="https://codepen.io/mariemosley/">@mariemosley</a></p>
                        </div>
                    </li>
                    <li className="member">
                        <div className="thumb"></div>
                        <div className="description">
                        <h3 className="memberName">د. فواز العواد</h3>
                            <p>Stephen is a designer/developer residing in Houston. He likes to build animations with CSS & JavaScript.<a href="https://codepen.io/shshaw/">@shshaw</a></p>
                        </div>
                    </li>
                    <li className="member">
                        <div className="thumb"></div>
                        <div className="description">
                        <h3 className="memberName">د. فواز العواد</h3>
                            <p>Rachel is a full stack'er in Australia. Not only a creative and talented designer and developer, but a great technical writer.<a href="https://codepen.io/rachsmith/">@rachsmith</a></p>
                        </div>
                    </li>
                    <li className="member">
                        <div className="thumb"></div>
                        <div className="description">
                        <h3 className="memberName">د. فواز العواد</h3>
                            <p>Robert is a full-stack dev with a penchant for open-source work. He dwells in the murky depthsmurky depths of JS.<a href="https://codepen.io/broofa/">@broofa</a></p>
                        </div>
                    </li>
                    <li className="member">
                        <div className="thumb"></div>
                        <div className="description">
                        <h3 className="memberName">د. فواز العواد</h3>
                            <p>Dee is a full stack developer who started her career in finance. She can jump from Rails to React to Go, and also manage our finances.<a href="https://codepen.io/deequez/">@deequez</a></p>
                        </div>
                    </li>
                </ul>

            </div>
            <Footer />
        </>
    );

};
export default MembersOfTheProgram;