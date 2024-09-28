import { deleteDoc, doc, getDoc } from 'firebase/firestore'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { db } from '../App'
import { Volume, Research } from './../Components/Volumes/Volumes'
import Footer from '../Components/Footer/Footer'
import Navbar from '../Components/Navbar/Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const VolumePage = () => {
    const [volume, setVolume] = useState<Volume>()
    const [loggedIn, setLoggedIn] = useState(false)
    const param = useParams()
    const auth = getAuth()
    const lang = window.localStorage.getItem('lang')


    const id = param.id
    const deleteVolume = async (id: any) => {
        await deleteDoc(doc(db, 'volumes', id))
        window.location.href = '/'
    }

    const getVolumeData = async () => {
        if (id != undefined) {
            const storage = getStorage()
            let docRef = doc(db, 'volumes'+lang, id)
            let docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
                const docData = docSnap.data()

                const index: Volume = {
                    id: id,
                    title: docData.title,
                    researches: docData.researches,
                }

                if (docData.file) {
                    const fileRef = ref(storage, docData.file)
                    index.file = await getDownloadURL(fileRef)
                }

                if (docData.cover) {
                    const coverRef = ref(storage, docData.cover)
                    index.cover = await getDownloadURL(coverRef)
                }

                setVolume(index)
            } else {
                console.log('No such document!')
            }
        }
    }
    useEffect(() => {
        getVolumeData()
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setLoggedIn(true)
            } else setLoggedIn(false)
        })
    }, [id])
    return (
        <>
            <Navbar />
            <div className="Header">
                <h1>{volume?.title}</h1>
            </div>
            <div className="shadow-lg m-20 rounded-lg max-w-[95%] mr-auto ml-auto p-10 pt-16 pb-16">
                {loggedIn && <FontAwesomeIcon onClick={() => deleteVolume(volume?.id)} icon={faX}></FontAwesomeIcon>}

                <div className="flex justify-center">
                    <div className="">
                        <section className="p-10 mr-640 pt-6 ">
                            <a href="/any">
                                <button className=" text-20 text-fff px-28 text-nowrap bg-[#15803d] duration-500 hover:bg-[#166534] focus:outline-none focus:ring-4 focus:ring-[#86efac] font-medium  rounded-md   py-5   dark:bg-[#26a345] dark:hover:bg-[#15803d] dark:focus:ring-[#166534] ">
                                    تصفح العدد الأول من المجلد
                                </button>
                            </a>
                        </section>
                        {volume?.researches.map((research: Research) => (
                            <section className="pr-8 mr-[20%] ">
                                <a href={`/research-page/${id}/${research.Id}`}>
                                    <button className=" p-10  text-28 pt-12 hover:text-background duration-500">
                                        {research.rTitle}
                                    </button>
                                </a>
                                <p className="text-20 pt-5 ">{research.rTitle}</p>
                            </section>
                        ))}
                    </div>
                    <div className="flex justify-end pl-14  m-10  ">
                        <img className=" w-[70%] p-10 shadow-sm " src={volume?.cover} alt="" />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default VolumePage
