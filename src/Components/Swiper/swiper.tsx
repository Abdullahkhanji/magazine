import React, { useEffect, useRef, useState } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// import required modules
import { Autoplay, Pagination, Scrollbar } from 'swiper/modules'
import { getDocs, collection, QueryDocumentSnapshot } from 'firebase/firestore'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'
import { db } from '../../App'
import { Volume, Research } from '../Volumes/Volumes'
import 'swiper/css/pagination'
import { To, useNavigate } from 'react-router'

export default function Swipers() {
    const [loading, setLoading] = useState(true)
    const [volumes, setVolumes] = useState<Volume[]>([])
    const [researches, setResearches] = useState<Research[]>([])
    const navigate = useNavigate()
    const handleClick = (path: To) => {
        navigate(path)
    }

    useEffect(() => {
        const getVolumes = async () => {
            try {
                const storage = getStorage()
                const getData = await getDocs(collection(db, 'volumes'))
                let allResearches: Research[] = []

                const volumeTemp = await Promise.all(
                    getData.docs.map(async (doc: QueryDocumentSnapshot) => {
                        const docData = doc.data() as Volume
                        const index: Volume = {
                            id: doc.id,
                            title: docData.title,
                            researches: docData.researches,
                        }

                        const researchTemp = await Promise.all(
                            docData.researches.map(async (research: Research) => {
                                const resData: Research = {
                                    volumeID: doc.id,
                                    Id: research.Id,
                                    No: research.No,
                                    rTitle: research.rTitle,
                                    publisherName: research.publisherName,
                                    publisherJob: research.publisherJob,
                                    publisherEmail: research.publisherEmail,
                                    summary: research.summary,
                                }

                                const covRef = ref(storage, research.rImage)
                                const covURL = await getDownloadURL(covRef)
                                resData.rImage = covURL

                                allResearches.push(resData)

                                return resData
                            })
                        )

                        const coverRef = ref(storage, docData.cover)
                        const coverURL = await getDownloadURL(coverRef)
                        index.cover = coverURL

                        return index
                    })
                )

                allResearches = allResearches.sort((a, b) => b.Id - a.Id)
                allResearches = allResearches.slice(0, 6)

                setVolumes(volumeTemp)
                setResearches(allResearches)
            } catch (error) {
                console.error('Error fetching volumes:', error)
            } finally {
                setLoading(false)
            }
        }

        getVolumes()
    }, [])

    if (loading) {
        return <h1>Loading...</h1>
    }

    return (
        <>
            <Swiper
                slidesPerView={3}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    dynamicBullets: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Scrollbar]}
                className="mySwiper select-none w-1280 mt-20"
            >
                {researches.map((research) => (
                    <SwiperSlide>
                        <div onClick={() => handleClick(`/research-page/${research.volumeID}/${research.Id}`)} className="flex self-start  max-w-360 min-w-360 mr-auto ml-auto flex-col border-[0.5px] max-h-[520px] min-h-[520px] rounded-tr-lg rounded-lg border-forest group cursor-pointer">
                            <div className="overflow-hidden group-hover:rounded-lg  shadow-lg">
                                <img
                                    className="max-w-[355x] min-w-[355px] rounded-tr-lg rounded-tl-lg max-h-360 min-h-360 group-hover:scale-110 transform transition-transform duration-500 "
                                    src={research.rImage}
                                    alt={research.publisherName}
                                />
                            </div>
                            <div className="min-h-8"></div>
                            <div className="self-start flex flex-col mr-2 gap-4">
                                <p>{research.rTitle}</p>
                                <div className="flex flex-col">
                                    <p className="font-bold text-[18px]">{research.publisherName}</p>
                                    <div className="min-h-[1px] max-w-360 min-w-360 bg-forest mr-[-8px] text-16"></div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    )
}
