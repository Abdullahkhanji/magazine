import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'

interface Member {
    name: string
    title: string
    expertise: string
}

const MembersOfTheProgram = () => {
    const [t, i18n] = useTranslation('global')
    const [facultyMembers, setFacultyMembers] = useState<Member[]>([])
    useEffect(() => {
        const members = t('MembersOfTheProgram.members', { returnObjects: true }) as Member[]
        setFacultyMembers(members)
    }, [t])
    return (
        <>
            <Navbar />
            <div className="Header">
                <h1>{t('MembersOfTheProgram.header')}</h1>
            </div>
            <div className="content">
                <div className="AltHeader font-semibold">
                    <h2>{t('MembersOfTheProgram.header1')}</h2>
                </div>

                <div className="ag-format-container">
                    <div className="ag-courses_box">
                        <div className="ag-courses_item">
                            <a href="#" className="ag-courses-item_link">
                                <div className="ag-courses-item_bg"></div>

                                <div className="ag-courses-item_title">{t('MembersOfTheProgram.name')}</div>

                                <div className="ag-courses-item_date-box">
                                    <span className="ag-courses-item_date">{t('MembersOfTheProgram.expertise')}</span>
                                    <br />
                                    {t('MembersOfTheProgram.title')}
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="AltHeader font-semibold">
                    <h2>{t('MembersOfTheProgram.header2')}</h2>
                </div>
                <div className="ag-format-container">
                        <div className="ag-courses_box">
                            {facultyMembers.map((member: Member, index) => (
                                <div className="ag-courses_item" key={index}>
                                    <a href="#" className="ag-courses-item_link">
                                        <div className="ag-courses-item_bg"></div>

                                        <div className="ag-courses-item_title">{member.name}</div>

                                        <div className="ag-courses-item_date-box">
                                            <span className="ag-courses-item_date">{member.expertise}</span> <br />
                                            {member.title}
                                        </div>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
            </div>
            <Footer />
        </>
    )
}
export default MembersOfTheProgram
