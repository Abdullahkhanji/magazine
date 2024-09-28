import React, { useEffect, useState } from 'react'

import { db } from '../../App'
import { QueryDocumentSnapshot, collection, getDocs } from 'firebase/firestore'
import { getDownloadURL, getStorage, ref } from 'firebase/storage'
import { To, useNavigate } from 'react-router'

export interface Volume {
    id: string
    title: string
    researches: Research[]
    cover?: string
    file?: string
}

export interface Research {
    volumeID: string
    Id: number
    No: number
    rTitle: string
    authors: Author[]
    summary: string
    rImage?: string
    rFile?: string
}

export interface Author {
    name: string
    job: string
    email: string
}

const Volumes = () => {
    const [loading, setLoading] = useState(true)
    const [volumes, setVolumes] = useState<Volume[]>([])
    const lang = window.localStorage.getItem('lang')
    const [researches, setResearches] = useState<Research[]>([])
    const navigate = useNavigate()
    const handleClick = (path: To) => {
        navigate(path)
    }
    useEffect(() => {
        const getVolumes = async () => {
            try {
                const storage = getStorage()
                const getData = await getDocs(collection(db, 'volumes'+lang))
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
                                if (!research.rImage) {
                                    // Skip researches without an image
                                    return null
                                }

                                const resData: Research = {
                                    volumeID: research.volumeID,
                                    Id: research.Id,
                                    No: research.No,
                                    rTitle: research.rTitle,
                                    authors: research.authors,
                                    summary: research.summary,
                                    rImage: research.rImage,
                                }

                                const covRef = ref(storage, research.rImage)
                                const covURL = await getDownloadURL(covRef)
                                resData.rImage = covURL

                                return resData
                            })
                        )

                        const coverRef = ref(storage, docData.cover)
                        const coverURL = await getDownloadURL(coverRef)
                        if (coverURL) {
                            index.cover = coverURL
                        }

                        // Filter out null values (researches without images) and add to allResearches
                        allResearches = allResearches.concat(
                            researchTemp.filter((res): res is Research => res !== null)
                        )

                        return index.cover ? index : null // Return the volume only if it has a cover image
                    })
                )

                // Filter out null values (volumes without cover images)
                const filteredVolumes = volumeTemp.filter((vol): vol is Volume => vol !== null)

                setVolumes(filteredVolumes)
                setResearches(allResearches)
            } catch (error) {
                console.error('Error fetching volumes:', error)
            } finally {
                setLoading(false)
            }
        }

        getVolumes()
    }, [])
    useEffect(() => {}, [volumes])
    if (loading) {
        return <h1>loading</h1>
    }

    return (
        <div className="flex-col flex  justify-center items-center">
            <div className="min-h-7"></div>
            <div className="flex gap-2 items-center justify-center">
                <div className="min-h-[2px]  max-h-[2px] bg-forest min-w-570 mt-2 pointer-events-none select-none"></div>
                <p className="font-semibold mt-2 text-pigment pointer-events-none select-none">أعداد المجلة</p>
                <div className="min-h-[2px] max-h-[2px] bg-forest min-w-570 mt-2 pointer-events-none select-none"></div>
            </div>
            <div className="min-h-7"></div>
            <div className="flex gap-5 items-center justify-center flex-wrap max-w-1140  mr-auto ml-auto">
                {volumes.map((volume) => (
                    <div
                        className="max-w-[190px] min-w-[190px] text-center flex flex-col gap-5 cursor-pointer group items-center justify-center"
                        onClick={() => handleClick(`/volume-page/${volume.id}`)}
                    >
                        <img
                            src={volume.cover}
                            className="max-h-[270] max-w-[170px]  select-none group-hover:scale-110 duration-300"
                            alt=""
                        />
                        <p className="text-[27px] font-bold group-hover:text-darkpastal duration-300 text-darkspring">
                            {volume.title}
                        </p>
                    </div>
                ))}
            </div>
            <div className="min-h-7"></div>
        </div>
    )
}

export default Volumes
