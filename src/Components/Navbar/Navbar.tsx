import React, { createContext, useEffect, useState } from 'react'

import logo from '../../img/newLogo.png'

import '../../index.css'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { db } from '../../App'
import { getDownloadURL, getStorage, ref } from 'firebase/storage'
import { Volume } from '../Volumes/Volumes'
import { QueryDocumentSnapshot, collection, doc, getDoc, getDocs } from 'firebase/firestore'
import { To, useNavigate, useParams } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faBars } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'react-i18next'

type Props = {}

const Navbar = (props: Props) => {
    const [t, i18n] = useTranslation('global')
    const [lang, setLang] = useState(window.localStorage.getItem('lang'))

    const navigate = useNavigate()
    const [loggedIn, setLoggedIn] = useState(false)
    const handleClick = (path: To) => {
        navigate(path)
    }
    const auth = getAuth()
    const logout = () => {
        signOut(auth)
    }
    const handleChangeLang = (language: string) => {
        setLang(language)
    }

    const [volumes, setVolumes] = useState<Volume[]>([])
    useEffect(() => {
        if (window.localStorage.getItem('lang') == lang) {
            if (lang) {
                window.localStorage.setItem('lang', lang)

                console.log(lang)
            } else {
                setLang('AR')

                if (lang) {
                    window.localStorage.setItem('lang', lang)
                    console.log(lang)
                }
            }
        } else {
            if (lang) {
                window.localStorage.setItem('lang', lang)

                console.log(lang)
                window.location.reload()
            } else {
                setLang('AR')

                if (lang) {
                    window.localStorage.setItem('lang', lang)
                    console.log(lang)
                }
            }
        }
        if (lang == 'AR') {
            document.body.classList.toggle('rtl')
        } else {
            document.body.classList.toggle('ltr')
        }
    }, [lang])

    useEffect(() => {
        const getVolumes = async () => {
            const getData = await getDocs(collection(db, 'volumes' + lang))

            const volumesTemp = getData.docs.map((doc: QueryDocumentSnapshot) => {
                const index: Volume = {
                    id: doc.id,
                    title: doc.data().title,
                    researches: doc.data().researches,
                }
                return index as Volume
            })

            setVolumes(volumesTemp)
        }

        getVolumes()
    }, [])
    useEffect(() => {
        console.log(volumes)
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setLoggedIn(true)
            } else setLoggedIn(false)
        })
    }, [volumes])
    return (
        <div className="Navbar flex-[999] ">
            <div onClick={() => handleClick('/')} className="LogoBar select-none cursor-pointer">
                {loggedIn && (
                    <div
                        onClick={logout}
                        className="flex items-center cursor-pointer hover:opacity-70 duration-300 ms-[5%]"
                    >
                        logout
                    </div>
                )}

                <img className="logo select-none" src={logo} />
            </div>
            <nav>
                <ul className="NavbarList flex-[999]">
                    <li>
                        <div
                            onClick={() => handleClick('/')}
                            className="flex justify-center items-center gap-2 flex-row p-020 text-[#fff] cursor-pointer group "
                        >
                            <div className="font-bold group-hover:opacity-50 duration-300 ">{t('Navbar.home')}</div>
                        </div>
                    </li>
                    <li>
                        <div className="flex justify-center items-center gap-2 flex-row p-020 text-[#fff] cursor-pointer group ">
                            <div className="font-bold group-hover:opacity-50 duration-300">{t('Navbar.aboutUs')}</div>
                            <FontAwesomeIcon
                                icon={faCaretDown}
                                className="text-forest group-hover:text-darkpastal duration-300"
                            />
                        </div>{' '}
                        <ul className="NavbarDropdown z-30">
                            <li>
                                <a href="/about-tibyan">{t('Navbar.aboutTibyan')}</a>
                            </li>
                            <li>
                                <a href="/AboutMidad">{t('Navbar.aboutMidad')}</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <div
                            onClick={() => handleClick('/all-volumes')}
                            className="flex justify-center items-center gap-2 flex-row p-020 text-[#fff] cursor-pointer group "
                        >
                            <div className="font-bold group-hover:opacity-50 duration-300">{t('Navbar.magazines')}</div>
                            <FontAwesomeIcon
                                icon={faCaretDown}
                                className="text-forest group-hover:text-darkpastal duration-300"
                            />
                        </div>
                        <ul className="NavbarDropdown z-30">
                            {volumes.map((volume) => (
                                <li key={volume.title}>
                                    <a href={`/volume-page/${volume.id}`}>{volume.title}</a>
                                </li>
                            ))}
                        </ul>
                    </li>
                    <li>
                        <div className="flex justify-center items-center gap-2 flex-row p-020 text-[#fff] cursor-pointer group ">
                            <div className="font-bold group-hover:opacity-50 duration-300">
                                {t('Navbar.postingins')}
                            </div>
                            <FontAwesomeIcon
                                icon={faCaretDown}
                                className="text-forest group-hover:text-darkpastal duration-300"
                            />
                        </div>

                        <ul className="NavbarDropdown z-30">
                            <li>
                                <a href="/publication-steps">{t('Navbar.pubsteps')}</a>
                            </li>
                            <li>
                                <a href="/publication-standards">{t('Navbar.pubstand')}</a>
                            </li>
                            <li>
                                <a href="/publication-ethics">{t('Navbar.pubethics')}</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <div
                            onClick={() => handleClick('/ResearchPledge')}
                            className="flex justify-center items-center gap-2 flex-row p-020 text-[#fff] cursor-pointer group "
                        >
                            <div className="font-bold group-hover:opacity-50 duration-300">{t('Navbar.respledge')}</div>
                        </div>
                    </li>
                    <li>
                        <div
                            onClick={() => handleClick('/MembersOfTheProgram')}
                            className="flex justify-center items-center gap-2 flex-row p-020 text-[#fff] cursor-pointer group "
                        >
                            <div className="font-bold group-hover:opacity-50 duration-300">{t('Navbar.members')}</div>
                        </div>
                    </li>
                    <li>
                        <div
                            onClick={() => handleClick('/CommunicateWithUs')}
                            className="flex justify-center items-center gap-2 flex-row p-020 text-[#fff] cursor-pointer group "
                        >
                            <div className="font-bold group-hover:opacity-50 duration-300">{t('Navbar.callus')}</div>
                        </div>
                    </li>

                    {loggedIn && (
                        <li>
                            <div
                                onClick={() => handleClick('/add-volume')}
                                className="flex justify-center items-center gap-2 flex-row p-020 text-[#fff] cursor-pointer group "
                            >
                                <div className="font-bold group-hover:opacity-50 duration-300">{t('Navbar.addv')}</div>
                            </div>
                        </li>
                    )}

                    <li>
                        <div className="" data-trigger-class="btn btn--subtle">
                            {lang == 'AR' && (
                                <select
                                    name="language-picker-select"
                                    id="language-picker-select"
                                    defaultValue={'AR'}
                                    onChange={(e) => handleChangeLang(e.target.value)}
                                >
                                    <option value="AR">العربية</option>
                                    <option value="TR">Türkçe</option>
                                    <option value="ENG">English</option>
                                </select>
                            )}
                            {lang == 'ENG' && (
                                <select
                                    name="language-picker-select"
                                    id="language-picker-select"
                                    defaultValue={'ENG'}
                                    onChange={(e) => handleChangeLang(e.target.value)}
                                >
                                    <option value="AR">العربية</option>
                                    <option value="TR">Türkçe</option>
                                    <option value="ENG">English</option>
                                </select>
                            )}
                            {lang == 'TR' && (
                                <select
                                    name="language-picker-select"
                                    id="language-picker-select"
                                    defaultValue={'TR'}
                                    onChange={(e) => handleChangeLang(e.target.value)}
                                >
                                    <option value="AR">العربية</option>
                                    <option value="TR">Türkçe</option>
                                    <option value="ENG">English</option>
                                </select>
                            )}
                        </div>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar
