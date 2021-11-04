import React from 'react'
import './Footer.scss'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer className="main-footer">
            <div className="footer-wrapper">
                <section className="social-media">
                    <Link to={"/"}>
                        <p className="body1 bussiness-name">CMS Crypto</p>
                    </Link>
                </section>
            </div>
        </footer>
    )
}
