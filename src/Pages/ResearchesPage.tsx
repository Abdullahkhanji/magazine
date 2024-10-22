import { doc, getDoc } from 'firebase/firestore'
import { getDownloadURL, getStorage, ref } from 'firebase/storage'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../App'
import Volumes, { Author, Research, Volume } from '../Components/Volumes/Volumes'
import Footer from '../Components/Footer/Footer'
import Navbar from '../Components/Navbar/Navbar'

const ResearchesPage = () => {
    const [research, setResearch] = useState<Research | null>(null)
    const { no, vid } = useParams()
    const storage = getStorage()
    const lang = window.localStorage.getItem('lang')

    const getResearchData = async () => {
        if (vid !== undefined) {
            const docRef = doc(db, 'volumes' + lang, vid)
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                const docData = docSnap.data() as Volume
                console.log(docData)

                for (const research of docData.researches) {
                    if (research.No === Number(no)) {
                        const index: Research = {
                            volumeID: research.volumeID,
                            Id: research.Id,
                            No: research.No,
                            rTitle: research.rTitle,
                            authors: research.authors,
                            summary: research.summary,
                        }

                        if (research.rFile) {
                            try {
                                const fileRef = ref(storage, research.rFile)
                                index.rFile = await getDownloadURL(fileRef)
                                console.log('File URL:', index.rFile)
                            } catch (error) {
                                console.error('Error fetching file URL:', error)
                            }
                        }

                        if (research.rImage) {
                            try {
                                const coverRef = ref(storage, research.rImage)
                                index.rImage = await getDownloadURL(coverRef)
                                console.log('Image URL:', index.rImage)
                            } catch (error) {
                                console.error('Error fetching image URL:', error)
                            }
                        }

                        setResearch(index)
                        break
                    } else {
                        console.log('No such Research!')
                    }
                }
            } else {
                console.log('No such document!')
            }
        }
    }

    useEffect(() => {
        getResearchData()
    }, [no, vid])

    return (
        <>
            <Navbar />

            <div className="Header">
                <h1>{research?.rTitle}</h1>
            </div>
            <div className="mr-auto ml-auto mb-28">
                <section className="relative">
                    {research?.rImage ? (
                        <div className="relative max-w-[70%] mr-auto ml-auto pt-10 max-h-640 ">
                            <img
                                className="w-[100%] max-w-[%25]  max-h-640  h-auto object-cover shadow-lg rounded-lg backdrop-brightness-0 brightness-50  pointer-events-none object-center select-none"
                                src={research.rImage}
                                alt={research.rTitle}
                            />
                            <h1 className="absolute inset-0 flex items-end pr-[22%]  pb-20 justify-start   text-72  text-fff">
                                {research.rTitle}
                            </h1>
                        </div>
                    ) : (
                        <div>No Image Available</div>
                    )}
                </section>
                {research?.authors.map((author: Author) => (
                    <section className="flex justify-around mt-14 shadow-lg rounded-lg max-w-[70%] p-10 mr-auto ml-auto">
                        <p className="text-24">{author?.name}</p>
                        <p className="text-24">{author?.job}</p>
                        <p className="text-24">{author?.email}</p>
                    </section>
                ))}

                <section className="max-w-[70%] text-wrap  mt-20 mr-auto ml-auto shadow-lg rounded-lg p-24 ">
                    <div className="text-24">{research?.summary}</div>
                </section>
            </div>
            <Footer />
        </>
    )
}

export default ResearchesPage
