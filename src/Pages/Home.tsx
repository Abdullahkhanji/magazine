import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";

import Volumes from "../Components/Volumes/Volumes";
import ResearchesHomePage from "../Components/ResearchesHomePage/ResearchesHomePage";

const Home = () => {
  return (
    <>
      <Navbar />

      <Volumes />
      <ResearchesHomePage />
      <Footer />
    </>
  );
};

export default Home;
