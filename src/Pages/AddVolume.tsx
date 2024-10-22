import React, { useId, useState } from 'react'
import Footer from '../Components/Footer/Footer'
import Navbar from '../Components/Navbar/Navbar'
import { addDoc, collection, doc, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '../App'
import { getStorage, ref, uploadBytes } from 'firebase/storage'
import { Author, Research, Volume } from './../Components/Volumes/Volumes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus, faX } from '@fortawesome/free-solid-svg-icons'

const AddVolume = () => {
    const storage = getStorage()
    const initialResearch: Research = {
        volumeID: '',
        Id: 0,
        No: 0,
        rTitle: '',
        authors: [
            {
                name: '',
                job: '',
                email: '',
            },
        ],
        summary: '',
        rImage: '',
        rFile: '',
    }
    const [cover, setCover] = useState('')
    const [file, setFile] = useState('')
    const addVolume = async () => {
        const ID = new Date().getTime().toString()
        if (cover !== '' && file !== '') {
            await setDoc(doc(db, 'volumesENG', ID), {
                title: titleENG,
                cover,
                file,
                researches: searchDataENG,
                id: new Date().getTime(),
            })
            await setDoc(doc(db, 'volumesAR', ID), {
                title: titleAR,
                cover,
                file,
                researches: searchDataAR,
                id: new Date().getTime(),
            })
            await setDoc(doc(db, 'volumesTR', ID), {
                title: titleTR,
                cover,
                file,
                researches: searchDataTR,
                id: new Date().getTime(),
            })
        }
    }
    //ENG

    const [titleENG, setTitleENG] = useState('')
    const [searchDataENG, setSearchDataENG] = useState<Research[]>([])

    const addResearchENG = () => {
        const id = new Date().getTime()
        const no = searchDataENG.length
        const newResearch = { ...initialResearch, Id: id, No: no }
        setSearchDataENG([...searchDataENG, newResearch])
    }
    const removeResearchENG = (index: number) => {
        const researches = [...searchDataENG]
        researches.splice(index, 1)
        setSearchDataENG(researches)
    }

    const handleAuthorChangeENG = (
        researchIndex: number,
        authorIndex: number,
        field: 'name' | 'job' | 'email',
        value: any
    ) => {
        const updatedSearchData = [...searchDataENG]
        updatedSearchData[researchIndex].authors[authorIndex][field] = value
        setSearchDataENG(updatedSearchData)
    }

    const addAuthorFieldENG = (researchIndex: number) => {
        const updatedSearchData = [...searchDataENG]
        updatedSearchData[researchIndex].authors.push({
            name: '',
            job: '',
            email: '',
        })
        setSearchDataENG(updatedSearchData)
    }

    const removeAuthorFieldENG = (researchIndex: number, authorIndex: number) => {
        const updatedSearchData = [...searchDataENG]
        updatedSearchData[researchIndex].authors.splice(authorIndex, 1)
        setSearchDataENG(updatedSearchData)
    }

    const setSearchImageENG = async (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
        const file = e.target.files?.[0]
        if (file) {
            const sCoverRef = ref(storage, `researchCover/${searchDataENG[i].Id}.${file.name.split('.').pop()}`)
            try {
                await uploadBytes(sCoverRef, file)
                setSearchDataENG(
                    searchDataENG.map((research, index) =>
                        index === i ? { ...research, rImage: sCoverRef.fullPath } : research
                    )
                )
            } catch (error) {
                console.error('Error uploading image:', error)
            }
        }
    }

    const setSearchFileENG = async (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
        const file = e.target.files?.[0]
        if (file) {
            const sFileRef = ref(storage, `researchFile/${searchDataENG[i].Id}.pdf`)
            try {
                await uploadBytes(sFileRef, file)
                setSearchDataENG(
                    searchDataENG.map((research, index) =>
                        index === i ? { ...research, rFile: sFileRef.fullPath } : research
                    )
                )
            } catch (error) {
                console.error('Error uploading file:', error)
            }
        }
    }

    //   AR

    const [titleAR, setTitleAR] = useState('')
    const [searchDataAR, setSearchDataAR] = useState<Research[]>([])

    const addResearchAR = () => {
        const id = new Date().getTime()
        const newResearch = { ...initialResearch, Id: id }
        setSearchDataAR([...searchDataAR, newResearch])
    }
    const removeResearchAR = (index: number) => {
        const researches = [...searchDataAR]
        researches.splice(index, 1)
        setSearchDataAR(researches)
    }

    const handleAuthorChangeAR = (
        researchIndex: number,
        authorIndex: number,
        field: 'name' | 'job' | 'email',
        value: any
    ) => {
        const updatedSearchData = [...searchDataAR]
        updatedSearchData[researchIndex].authors[authorIndex][field] = value
        setSearchDataAR(updatedSearchData)
    }

    const addAuthorFieldAR = (researchIndex: number) => {
        const updatedSearchData = [...searchDataAR]
        updatedSearchData[researchIndex].authors.push({
            name: '',
            job: '',
            email: '',
        })
        setSearchDataAR(updatedSearchData)
    }

    const removeAuthorFieldAR = (researchIndex: number, authorIndex: number) => {
        const updatedSearchData = [...searchDataAR]
        updatedSearchData[researchIndex].authors.splice(authorIndex, 1)
        setSearchDataAR(updatedSearchData)
    }

    const setSearchImageAR = async (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
        const file = e.target.files?.[0]
        if (file) {
            const sCoverRef = ref(storage, `researchCover/${searchDataAR[i].Id}.${file.name.split('.').pop()}`)
            try {
                await uploadBytes(sCoverRef, file)
                setSearchDataAR(
                    searchDataAR.map((research, index) =>
                        index === i ? { ...research, rImage: sCoverRef.fullPath } : research
                    )
                )
            } catch (error) {
                console.error('Error uploading image:', error)
            }
        }
    }

    const setSearchFileAR = async (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
        const file = e.target.files?.[0]
        if (file) {
            const sFileRef = ref(storage, `researchFile/${searchDataAR[i].Id}.pdf`)
            try {
                await uploadBytes(sFileRef, file)
                setSearchDataAR(
                    searchDataAR.map((research, index) =>
                        index === i ? { ...research, rFile: sFileRef.fullPath } : research
                    )
                )
            } catch (error) {
                console.error('Error uploading file:', error)
            }
        }
    }

    //   TR

    const [titleTR, setTitleTR] = useState('')
    const [searchDataTR, setSearchDataTR] = useState<Research[]>([])

    const addResearchTR = () => {
        const id = new Date().getTime()
        const newResearch = { ...initialResearch, Id: id }
        setSearchDataTR([...searchDataTR, newResearch])
    }
    const removeResearchTR = (index: number) => {
        const researches = [...searchDataTR]
        researches.splice(index, 1)
        setSearchDataTR(researches)
    }

    const handleAuthorChangeTR = (
        researchIndex: number,
        authorIndex: number,
        field: 'name' | 'job' | 'email',
        value: any
    ) => {
        const updatedSearchData = [...searchDataTR]
        updatedSearchData[researchIndex].authors[authorIndex][field] = value
        setSearchDataTR(updatedSearchData)
    }

    const addAuthorFieldTR = (researchIndex: number) => {
        const updatedSearchData = [...searchDataTR]
        updatedSearchData[researchIndex].authors.push({
            name: '',
            job: '',
            email: '',
        })
        setSearchDataTR(updatedSearchData)
    }

    const removeAuthorFieldTR = (researchIndex: number, authorIndex: number) => {
        const updatedSearchData = [...searchDataTR]
        updatedSearchData[researchIndex].authors.splice(authorIndex, 1)
        setSearchDataTR(updatedSearchData)
    }

    const setSearchImageTR = async (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
        const file = e.target.files?.[0]
        if (file) {
            const sCoverRef = ref(storage, `researchCover/${searchDataTR[i].Id}.${file.name.split('.').pop()}`)
            try {
                await uploadBytes(sCoverRef, file)
                setSearchDataTR(
                    searchDataTR.map((research, index) =>
                        index === i ? { ...research, rImage: sCoverRef.fullPath } : research
                    )
                )
            } catch (error) {
                console.error('Error uploading image:', error)
            }
        }
    }

    const setSearchFileTR = async (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
        const file = e.target.files?.[0]
        if (file) {
            const sFileRef = ref(storage, `researchFile/${searchDataTR[i].Id}.pdf`)
            try {
                await uploadBytes(sFileRef, file)
                setSearchDataTR(
                    searchDataTR.map((research, index) =>
                        index === i ? { ...research, rFile: sFileRef.fullPath } : research
                    )
                )
            } catch (error) {
                console.error('Error uploading file:', error)
            }
        }
    }

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const vCoverRef = ref(storage, `volumeCover/${file.name}`)
            try {
                const snapshot = await uploadBytes(vCoverRef, file)
                setCover(snapshot.ref.fullPath)
            } catch (error) {
                console.error('Error uploading file:', error)
            }
        }
    }

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const vFileRef = ref(storage, `volumeFile/${file.name}`)
            try {
                const snapshot = await uploadBytes(vFileRef, file)
                setFile(snapshot.ref.fullPath)
            } catch (error) {
                console.error('Error uploading file:', error)
            }
        }
    }

    const [ARisVisible, setARIsVisible] = useState(true)

    const toggleContentAR = () => {
        console.log('Button clicked')
        setARIsVisible(true)
        setENGIsVisible(false)
        setTRIsVisible(false)
    }

    const [ENGisVisible, setENGIsVisible] = useState(false)

    const toggleContentENG = () => {
        console.log('Button clicked')
        setENGIsVisible(true)
        setTRIsVisible(false)
        setARIsVisible(false)
    }
    const [TRisVisible, setTRIsVisible] = useState(false)

    const toggleContentTR = () => {
        console.log('Button clicked')
        setTRIsVisible(true)
        setENGIsVisible(false)
        setARIsVisible(false)
    }

    return (
        <>
            <Navbar />
            <div className="Header">
                <h1>اضافة مجلة</h1>
            </div>

            <div className="AddVolume">
                <div className="m-32">
                    <button onClick={toggleContentAR} className="Button">
                        اظهار فورم اللغة العربية
                    </button>
                    <button onClick={toggleContentENG} className="Button">
                        Show The Form In English
                    </button>
                    <button onClick={toggleContentTR} className="Button">
                        Formu Turkçede Görüntüle
                    </button>
                </div>

                {ARisVisible && (
                    <div className="AddResearch" id="hiddenContent">
                        <div className="VolumeInfo">
                            <label htmlFor="">عدد المجلة</label>
                            <input
                                type="text"
                                placeholder="عدد المجلة"
                                value={titleAR}
                                onChange={(e) => setTitleAR(e.target.value)}
                                className="AddVoulumeInput"
                            />
                            <div className="flex gap-4 pt-12">
                                <div className="flex flex-col items-center mb-4 w-1/2">
                                    <label className="text-center mb-2" htmlFor="">
                                        غلاف المجلة
                                    </label>
                                    <input
                                        className="AddImage"
                                        type="file"
                                        accept="image/jpeg, image/png"
                                        onChange={handleImageChange}
                                    />
                                </div>
                                <div className="flex flex-col items-center mb-4 w-1/2">
                                    <label className="text-center mb-2" htmlFor="">
                                        ملف المجلة
                                    </label>
                                    <input className="AddImage" type="file" accept=".pdf" onChange={handleFileChange} />
                                </div>
                            </div>
                        </div>
                        <div className="Research" id="Research">
                            {searchDataAR.map((research, i) => (
                                <div key={research.Id} className="ResearchInfo">
                                    <div className="w-full">
                                        <FontAwesomeIcon
                                            onClick={() => removeResearchAR(i)}
                                            icon={faX}
                                            className="cursor-pointer"
                                        />
                                    </div>
                                    <div className="flex flex-col ml-auto">
                                        <h2 className="font-semibold">Research {i + 1}</h2>
                                        <label htmlFor="" className="font-semibold">
                                            Research Title
                                        </label>
                                        <input
                                            type="text"
                                            name="rTitle"
                                            placeholder="Research Title"
                                            className="AddVoulumeInput"
                                            value={research.rTitle}
                                            onChange={(e) =>
                                                setSearchDataAR(
                                                    searchDataAR.map((res, index) =>
                                                        index === i ? { ...res, rTitle: e.target.value } : res
                                                    )
                                                )
                                            }
                                        />
                                    </div>

                                    {research.authors?.map((author, authorIndex) => (
                                        <div key={authorIndex} className="author-fields">
                                            <div>
                                                <FontAwesomeIcon
                                                    icon={faMinus}
                                                    className="cursor-pointer"
                                                    onClick={() => removeAuthorFieldAR(i, authorIndex)}
                                                />
                                                <FontAwesomeIcon
                                                    icon={faPlus}
                                                    className="pr-3 cursor-pointer"
                                                    onClick={() => addAuthorFieldAR(i)}
                                                />
                                            </div>
                                            <div className="flex flex-col mb-4">
                                                <label htmlFor="">Author Name</label>
                                                <input
                                                    type="text"
                                                    name="publisherName"
                                                    placeholder="Author Name"
                                                    className="AddVoulumeInput"
                                                    value={author.name}
                                                    onChange={(e) =>
                                                        handleAuthorChangeAR(i, authorIndex, 'name', e.target.value)
                                                    }
                                                />
                                            </div>
                                            <div className="flex flex-col mb-4">
                                                <label htmlFor="">Author Job</label>
                                                <input
                                                    type="text"
                                                    name="publisherJob"
                                                    placeholder="Author Job"
                                                    className="AddVoulumeInput"
                                                    value={author.job}
                                                    onChange={(e) =>
                                                        handleAuthorChangeAR(i, authorIndex, 'job', e.target.value)
                                                    }
                                                />
                                            </div>
                                            <div className="flex flex-col mb-4">
                                                <label htmlFor="">Author Email</label>
                                                <input
                                                    type="text"
                                                    name="publisherEmail"
                                                    placeholder="Author Email"
                                                    className="AddVoulumeInput"
                                                    value={author.email}
                                                    onChange={(e) =>
                                                        handleAuthorChangeAR(i, authorIndex, 'email', e.target.value)
                                                    }
                                                />
                                            </div>
                                        </div>
                                    ))}
                                    <div className="flex flex-col mb-4">
                                        <label htmlFor="">Research Summary</label>
                                        <textarea
                                            name="summary"
                                            placeholder="Research Summary"
                                            className="SummaryInput"
                                            value={research.summary}
                                            onChange={(e) =>
                                                setSearchDataAR(
                                                    searchDataAR.map((res, index) =>
                                                        index === i ? { ...res, summary: e.target.value } : res
                                                    )
                                                )
                                            }
                                        ></textarea>
                                    </div>
                                    <div className="flex gap-4 pt-4">
                                        <div className="flex flex-col items-center mb-4 w-1/2">
                                            <label className="text-center mb-2" htmlFor="">
                                                Research Cover
                                            </label>
                                            <input
                                                className="AddImage"
                                                type="file"
                                                accept="image/jpeg, image/png"
                                                onChange={(e) => setSearchImageAR(e, i)}
                                            />
                                        </div>
                                        <div className="flex flex-col items-center mb-4 w-1/2">
                                            <label className="text-center mb-2" htmlFor="">
                                                Research File
                                            </label>
                                            <input
                                                className="AddImage"
                                                type="file"
                                                accept=".pdf"
                                                onChange={(e) => setSearchFileAR(e, i)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <button className="Button" onClick={addResearchAR}>
                                Add Input Fields
                            </button>
                            <button className="Button" onClick={addVolume}>
                                Add Volume
                            </button>
                        </div>
                    </div>
                )}

                {ENGisVisible && (
                    <div className="AddResearch" id="hiddenContent">
                        <div className="VolumeInfo">
                            <label htmlFor="">Magazine Number</label>
                            <input
                                type="text"
                                placeholder="Magazine Number"
                                value={titleENG}
                                onChange={(e) => setTitleENG(e.target.value)}
                                className="AddVoulumeInput"
                            />
                            <div className="flex gap-4 pt-12">
                                <div className="flex flex-col items-center mb-4 w-1/2">
                                    <label className="text-center mb-2" htmlFor="">
                                        Magazine Cover
                                    </label>
                                    <input
                                        className="AddImage"
                                        type="file"
                                        accept="image/jpeg, image/png"
                                        onChange={handleImageChange}
                                    />
                                </div>
                                <div className="flex flex-col items-center mb-4 w-1/2">
                                    <label className="text-center mb-2" htmlFor="">
                                        Magazine File
                                    </label>
                                    <input className="AddImage" type="file" accept=".pdf" onChange={handleFileChange} />
                                </div>
                            </div>
                        </div>
                        <div className="Research" id="Research">
                            {searchDataENG.map((research, i) => (
                                <div key={research.Id} className="ResearchInfo">
                                    <div className="flex justify-items-end ml-auto">
                                        <FontAwesomeIcon
                                            onClick={() => removeResearchENG(i)}
                                            icon={faX}
                                            className="cursor-pointer"
                                        />
                                    </div>
                                    <div className="flex flex-col ml-auto">
                                        <h2 className="font-semibold">Research {i + 1}</h2>
                                        <label htmlFor="" className="font-semibold">
                                            Research Title
                                        </label>
                                        <input
                                            type="text"
                                            name="rTitle"
                                            placeholder="Research Title"
                                            className="AddVoulumeInput"
                                            value={research.rTitle}
                                            onChange={(e) =>
                                                setSearchDataENG(
                                                    searchDataENG.map((res, index) =>
                                                        index === i ? { ...res, rTitle: e.target.value } : res
                                                    )
                                                )
                                            }
                                        />
                                    </div>

                                    {research.authors?.map((author, authorIndex) => (
                                        <div key={authorIndex} className="author-fields">
                                            <div>
                                                <FontAwesomeIcon
                                                    icon={faMinus}
                                                    className="cursor-pointer"
                                                    onClick={() => removeAuthorFieldENG(i, authorIndex)}
                                                />
                                                <FontAwesomeIcon
                                                    icon={faPlus}
                                                    className="pr-3 cursor-pointer"
                                                    onClick={() => addAuthorFieldENG(i)}
                                                />
                                            </div>
                                            <div className="flex flex-col mb-4">
                                                <label htmlFor="">Author Name</label>
                                                <input
                                                    type="text"
                                                    name="publisherName"
                                                    placeholder="Author Name"
                                                    className="AddVoulumeInput"
                                                    value={author.name}
                                                    onChange={(e) =>
                                                        handleAuthorChangeENG(i, authorIndex, 'name', e.target.value)
                                                    }
                                                />
                                            </div>
                                            <div className="flex flex-col mb-4">
                                                <label htmlFor="">Author Job</label>
                                                <input
                                                    type="text"
                                                    name="publisherJob"
                                                    placeholder="Author Job"
                                                    className="AddVoulumeInput"
                                                    value={author.job}
                                                    onChange={(e) =>
                                                        handleAuthorChangeENG(i, authorIndex, 'job', e.target.value)
                                                    }
                                                />
                                            </div>
                                            <div className="flex flex-col mb-4">
                                                <label htmlFor="">Author Email</label>
                                                <input
                                                    type="text"
                                                    name="publisherEmail"
                                                    placeholder="Author Email"
                                                    className="AddVoulumeInput"
                                                    value={author.email}
                                                    onChange={(e) =>
                                                        handleAuthorChangeENG(i, authorIndex, 'email', e.target.value)
                                                    }
                                                />
                                            </div>
                                        </div>
                                    ))}
                                    <div className="flex flex-col mb-4">
                                        <label htmlFor="">Research Summary</label>
                                        <textarea
                                            name="summary"
                                            placeholder="Research Summary"
                                            className="SummaryInput"
                                            value={research.summary}
                                            onChange={(e) =>
                                                setSearchDataENG(
                                                    searchDataENG.map((res, index) =>
                                                        index === i ? { ...res, summary: e.target.value } : res
                                                    )
                                                )
                                            }
                                        ></textarea>
                                    </div>
                                    <div className="flex gap-4 pt-4">
                                        <div className="flex flex-col items-center mb-4 w-1/2">
                                            <label className="text-center mb-2" htmlFor="">
                                                Research Cover
                                            </label>
                                            <input
                                                className="AddImage"
                                                type="file"
                                                accept="image/jpeg, image/png"
                                                onChange={(e) => setSearchImageENG(e, i)}
                                            />
                                        </div>
                                        <div className="flex flex-col items-center mb-4 w-1/2">
                                            <label className="text-center mb-2" htmlFor="">
                                                Research File
                                            </label>
                                            <input
                                                className="AddImage"
                                                type="file"
                                                accept=".pdf"
                                                onChange={(e) => setSearchFileENG(e, i)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <button className="Button" onClick={addResearchENG}>
                                Add Input Fields
                            </button>
                            <button className="Button" onClick={addVolume}>
                                Add Volume
                            </button>
                        </div>
                    </div>
                )}

                {TRisVisible && (
                    <div className="AddResearch" id="hiddenContent">
                        <div className="VolumeInfo">
                            <label htmlFor="">Dergi Numarası</label>
                            <input
                                type="text"
                                placeholder="Dergi Numarası"
                                value={titleTR}
                                onChange={(e) => setTitleTR(e.target.value)}
                                className="AddVoulumeInput"
                            />
                            <div className="flex gap-4 pt-12">
                                <div className="flex flex-col items-center mb-4 w-1/2">
                                    <label className="text-center mb-2" htmlFor="">
                                        Dergi Kapağı
                                    </label>
                                    <input
                                        className="AddImage"
                                        type="file"
                                        accept="image/jpeg, image/png"
                                        onChange={handleImageChange}
                                    />
                                </div>
                                <div className="flex flex-col items-center mb-4 w-1/2">
                                    <label className="text-center mb-2" htmlFor="">
                                        {' '}
                                        Dergi Dosyası
                                    </label>
                                    <input className="AddImage" type="file" accept=".pdf" onChange={handleFileChange} />
                                </div>
                            </div>
                        </div>
                        <div className="Research" id="Research">
                            {searchDataTR.map((research, i) => (
                                <div key={research.Id} className="ResearchInfo">
                                    <div className="flex justify-items-end ml-auto">
                                        <FontAwesomeIcon
                                            onClick={() => removeResearchTR(i)}
                                            icon={faX}
                                            className="cursor-pointer"
                                        />
                                    </div>
                                    <div className="flex flex-col ml-auto">
                                        <h2 className="font-semibold">Research {i + 1}</h2>
                                        <label htmlFor="" className="font-semibold">
                                            Research Title
                                        </label>
                                        <input
                                            type="text"
                                            name="rTitle"
                                            placeholder="Research Title"
                                            className="AddVoulumeInput"
                                            value={research.rTitle}
                                            onChange={(e) =>
                                                setSearchDataTR(
                                                    searchDataTR.map((res, index) =>
                                                        index === i ? { ...res, rTitle: e.target.value } : res
                                                    )
                                                )
                                            }
                                        />
                                    </div>

                                    {research.authors?.map((author, authorIndex) => (
                                        <div key={authorIndex} className="author-fields">
                                            <div>
                                                <FontAwesomeIcon
                                                    icon={faMinus}
                                                    className="cursor-pointer"
                                                    onClick={() => removeAuthorFieldTR(i, authorIndex)}
                                                />
                                                <FontAwesomeIcon
                                                    icon={faPlus}
                                                    className="pr-3 cursor-pointer"
                                                    onClick={() => addAuthorFieldTR(i)}
                                                />
                                            </div>
                                            <div className="flex flex-col mb-4">
                                                <label htmlFor="">Author Name</label>
                                                <input
                                                    type="text"
                                                    name="publisherName"
                                                    placeholder="Author Name"
                                                    className="AddVoulumeInput"
                                                    value={author.name}
                                                    onChange={(e) =>
                                                        handleAuthorChangeTR(i, authorIndex, 'name', e.target.value)
                                                    }
                                                />
                                            </div>
                                            <div className="flex flex-col mb-4">
                                                <label htmlFor="">Author Job</label>
                                                <input
                                                    type="text"
                                                    name="publisherJob"
                                                    placeholder="Author Job"
                                                    className="AddVoulumeInput"
                                                    value={author.job}
                                                    onChange={(e) =>
                                                        handleAuthorChangeTR(i, authorIndex, 'job', e.target.value)
                                                    }
                                                />
                                            </div>
                                            <div className="flex flex-col mb-4">
                                                <label htmlFor="">Author Email</label>
                                                <input
                                                    type="text"
                                                    name="publisherEmail"
                                                    placeholder="Author Email"
                                                    className="AddVoulumeInput"
                                                    value={author.email}
                                                    onChange={(e) =>
                                                        handleAuthorChangeTR(i, authorIndex, 'email', e.target.value)
                                                    }
                                                />
                                            </div>
                                        </div>
                                    ))}
                                    <div className="flex flex-col mb-4">
                                        <label htmlFor="">Research Summary</label>
                                        <textarea
                                            name="summary"
                                            placeholder="Research Summary"
                                            className="SummaryInput"
                                            value={research.summary}
                                            onChange={(e) =>
                                                setSearchDataTR(
                                                    searchDataTR.map((res, index) =>
                                                        index === i ? { ...res, summary: e.target.value } : res
                                                    )
                                                )
                                            }
                                        ></textarea>
                                    </div>
                                    <div className="flex gap-4 pt-4">
                                        <div className="flex flex-col items-center mb-4 w-1/2">
                                            <label className="text-center mb-2" htmlFor="">
                                                Research Cover
                                            </label>
                                            <input
                                                className="AddImage"
                                                type="file"
                                                accept="image/jpeg, image/png"
                                                onChange={(e) => setSearchImageTR(e, i)}
                                            />
                                        </div>
                                        <div className="flex flex-col items-center mb-4 w-1/2">
                                            <label className="text-center mb-2" htmlFor="">
                                                Research File
                                            </label>
                                            <input
                                                className="AddImage"
                                                type="file"
                                                accept=".pdf"
                                                onChange={(e) => setSearchFileTR(e, i)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <button className="Button" onClick={addResearchTR}>
                                Girdi Alanları Ekle
                            </button>
                            <button className="Button" onClick={addVolume}>
                                Cilt Ekle
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </>
    )
}
export default AddVolume
