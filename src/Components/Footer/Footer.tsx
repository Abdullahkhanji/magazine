import React from 'react'
import logo from '../../img/newLogo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'

import '../../index.css'
import { useTranslation } from 'react-i18next'

type Props = {}

const Footer = (props: Props) => {
    const [t, i18n] = useTranslation('global')
    return (
        <div className="Footer">
            <ul className="FooterList">
                <li className="About">
                    <img className="logo cursor-pointer select-none" src={logo} alt="" />
                    <p>{t('Footer.about')}</p>
                    <button className="Button rounded-lg select-none">{t('Footer.readMore')}</button>
                </li>
                <li className="Contact">
                    <ul className="ContactList">
                        <li>
                            <h2> {t('Footer.contact')}</h2>
                        </li>
                        <li>
                            MÜCAHITLER MH. 52009 NOLU CD. N:18 SELÇUK KARSLIOĞLU İŞ MERKEZİ KAT:6 DAIRE:40
                            Ş.KAMIL/G.ANTEP
                        </li>
                        <li>00905541822114</li>
                        <li>s.research@edumidad.org</li>
                        <li className="IconList">
                            <div>
                                <FontAwesomeIcon icon={faTwitter}></FontAwesomeIcon>
                            </div>
                            <div>
                                <FontAwesomeIcon icon={faInstagram}></FontAwesomeIcon>
                            </div>
                            <div>
                                <FontAwesomeIcon icon={faFacebook}></FontAwesomeIcon>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
            <p className="Copyright">Copyright Midad Center</p>
        </div>
    )
}

export default Footer
