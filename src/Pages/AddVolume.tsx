import React, { useId, useState } from 'react'
import Footer from '../Components/Footer/Footer'
import Navbar from '../Components/Navbar/Navbar'
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore'
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

    const [searchData, setSearchData] = useState<Research[]>([])
    const [title, setTitle] = useState('')
    const [cover, setCover] = useState('')
    const [file, setFile] = useState('')

    const addResearch = () => {
        const id = new Date().getTime()
        const newResearch = { ...initialResearch, Id: id }
        setSearchData([...searchData, newResearch])
    }
    const removeResearch = (index: number) => {
        const researches = [...searchData]
        researches.splice(index, 1)
        setSearchData(researches)
    }

    const addVolume = async () => {
        await addDoc(collection(db, 'volumes'), {
            title,
            cover,
            file,
            researches: searchData,
        })
    }

    const handleAuthorChange = (
        researchIndex: number,
        authorIndex: number,
        field: 'name' | 'job' | 'email',
        value: any
    ) => {
        const updatedSearchData = [...searchData]
        updatedSearchData[researchIndex].authors[authorIndex][field] = value
        setSearchData(updatedSearchData)
    }

    const addAuthorField = (researchIndex: number) => {
        const updatedSearchData = [...searchData]
        updatedSearchData[researchIndex].authors.push({
            name: '',
            job: '',
            email: '',
        })
        setSearchData(updatedSearchData)
    }

    const removeAuthorField = (researchIndex: number, authorIndex: number) => {
        const updatedSearchData = [...searchData]
        updatedSearchData[researchIndex].authors.splice(authorIndex, 1)
        setSearchData(updatedSearchData)
    }

    const setSearchImage = async (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
        const file = e.target.files?.[0]
        if (file) {
            const sCoverRef = ref(storage, `researchCover/${searchData[i].Id}.${file.name.split('.').pop()}`)
            try {
                await uploadBytes(sCoverRef, file)
                setSearchData(
                    searchData.map((research, index) =>
                        index === i ? { ...research, rImage: sCoverRef.fullPath } : research
                    )
                )
            } catch (error) {
                console.error('Error uploading image:', error)
            }
        }
    }

    const setSearchFile = async (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
        const file = e.target.files?.[0]
        if (file) {
            const sFileRef = ref(storage, `researchFile/${searchData[i].Id}.pdf`)
            try {
                await uploadBytes(sFileRef, file)
                setSearchData(
                    searchData.map((research, index) =>
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
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
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
                            {searchData.map((research, i) => (
                                <div key={research.Id} className="ResearchInfo">
                                    <div className="w-full">
                                        <FontAwesomeIcon
                                            onClick={() => removeResearch(i)}
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
                                                setSearchData(
                                                    searchData.map((res, index) =>
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
                                                    onClick={() => removeAuthorField(i, authorIndex)}
                                                />
                                                <FontAwesomeIcon
                                                    icon={faPlus}
                                                    className="pr-3 cursor-pointer"
                                                    onClick={() => addAuthorField(i)}
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
                                                        handleAuthorChange(i, authorIndex, 'name', e.target.value)
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
                                                        handleAuthorChange(i, authorIndex, 'job', e.target.value)
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
                                                        handleAuthorChange(i, authorIndex, 'email', e.target.value)
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
                                                setSearchData(
                                                    searchData.map((res, index) =>
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
                                                onChange={(e) => setSearchImage(e, i)}
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
                                                onChange={(e) => setSearchFile(e, i)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <button className="Button" onClick={addResearch}>
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
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
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
                            {searchData.map((research, i) => (
                                <div key={research.Id} className="ResearchInfo">
                                    <div className="flex justify-items-end ml-auto">
                                        <FontAwesomeIcon
                                            onClick={() => removeResearch(i)}
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
                                                setSearchData(
                                                    searchData.map((res, index) =>
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
                                                    onClick={() => removeAuthorField(i, authorIndex)}
                                                />
                                                <FontAwesomeIcon
                                                    icon={faPlus}
                                                    className="pr-3 cursor-pointer"
                                                    onClick={() => addAuthorField(i)}
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
                                                        handleAuthorChange(i, authorIndex, 'name', e.target.value)
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
                                                        handleAuthorChange(i, authorIndex, 'job', e.target.value)
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
                                                        handleAuthorChange(i, authorIndex, 'email', e.target.value)
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
                                                setSearchData(
                                                    searchData.map((res, index) =>
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
                                                onChange={(e) => setSearchImage(e, i)}
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
                                                onChange={(e) => setSearchFile(e, i)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <button className="Button" onClick={addResearch}>
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
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
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
                            {searchData.map((research, i) => (
                                <div key={research.Id} className="ResearchInfo">
                                    <div className="flex justify-items-end ml-auto">
                                        <FontAwesomeIcon
                                            onClick={() => removeResearch(i)}
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
                                                setSearchData(
                                                    searchData.map((res, index) =>
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
                                                    onClick={() => removeAuthorField(i, authorIndex)}
                                                />
                                                <FontAwesomeIcon
                                                    icon={faPlus}
                                                    className="pr-3 cursor-pointer"
                                                    onClick={() => addAuthorField(i)}
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
                                                        handleAuthorChange(i, authorIndex, 'name', e.target.value)
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
                                                        handleAuthorChange(i, authorIndex, 'job', e.target.value)
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
                                                        handleAuthorChange(i, authorIndex, 'email', e.target.value)
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
                                                setSearchData(
                                                    searchData.map((res, index) =>
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
                                                onChange={(e) => setSearchImage(e, i)}
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
                                                onChange={(e) => setSearchFile(e, i)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <button className="Button" onClick={addResearch}>
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
