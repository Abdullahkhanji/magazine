import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'

import Volumes from '../Components/Volumes/Volumes'
import ResearchesHomePage from '../Components/ResearchesHomePage/ResearchesHomePage'
import Swipers from '../Components/Swiper/swiper'
import { useEffect } from 'react'

const Home = () => {

    return (
        <>
            <Navbar />
            <Swipers />
            <Volumes />
            <ResearchesHomePage />
            <Footer />
        </>
    )
}

export default Home
