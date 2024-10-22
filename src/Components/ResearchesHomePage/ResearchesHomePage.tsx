import React, { useEffect, useState } from 'react'

import { db } from '../../App'
import { QueryDocumentSnapshot, collection, getDocs } from 'firebase/firestore'
import { getDownloadURL, getStorage, ref } from 'firebase/storage'
import { Volume, Research } from '../Volumes/Volumes'
import { To, useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'

const ResearchesHomePage = () => {
    const [t, i18n] = useTranslation('global')
    const [loading, setLoading] = useState(true)
    const [volumes, setVolumes] = useState<Volume[]>([])
    const [researches, setResearches] = useState<Research[]>([])
    const lang = window.localStorage.getItem('lang')
    const navigate = useNavigate()
    const handleClick = (path: To) => {
        navigate(path)
    }

    useEffect(() => {
        const getVolumes = async () => {
            try {
                const storage = getStorage()
                const getData = await getDocs(collection(db, 'volumes' + lang))
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
                                    authors: research.authors,
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

                // Sort allResearches by uploadDate in descending order
                allResearches = allResearches.sort((a, b) => b.Id - a.Id)
                allResearches = allResearches.slice(0, 8)
                console.log(allResearches)
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
        <div className="flex flex-col">
            <div className="min-h-7"></div>
            <div className="flex gap-2 items-center justify-center">
                <div className="min-h-[2px] max-h-[2px] bg-forest min-w-1140 mt-2 pointer-events-none select-none max-w-1140 "></div>
            </div>
            <div className="min-h-7"></div>
            <div className="flex max-w-1140">
                <p className="text-forest font-bold text-[25px] text-center mr-auto ml-auto">
                {t('Other.readTibyan')}
                </p>
            </div>
            <div className="min-h-7"></div>
            <div className="flex flex-wrap max-w-1140 gap-10  mr-auto ml-auto">
                {researches.map((research, index) => (
                    <div
                        key={index}
                        className="flex gap-10 min-w-[565px] max-w-[565px] border-forest border-[1px] rounded-md group cursor-pointer"
                        onClick={() => handleClick(`/research-page/${research.volumeID}/${research.No}`)}
                    >
                        <div className="overflow-hidden shadow-lg">
                            <img
                                className="max-w-[190px] min-w-[190px] rounded-r-md rounded-br-md pointer-events-none select-none group-hover:scale-110 transform transition-transform duration-500 "
                                src={research.rImage}
                                alt={research.rTitle}
                            />
                        </div>
                        <div className="flex items-start flex-col gap-8 max-w-[200px] mt-5 relative">
                            <p className="text-[12px]">{research.rTitle}</p>
                            <p className="font-bold text-16">{research.rTitle}</p>
                            <div className="max-w-[259px] max-h-[1px] min-w-[259px] min-h-[1px] bg-background absolute start-[-10px] bottom-[30px]"></div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="min-h-7"></div>
        </div>
    )
}

export default ResearchesHomePage
