import React from 'react'

import Layout from '../components/Layout';

export default function Error404() {
    return (
        <Layout>
            <main className="notfound-main">
                <div className="notfound-main__wrapper">
                    <section className="heading-container">
                        <h1 className="heading1 title heading-title">Error 404: Page Not Found</h1>
                    </section>

                    {/* <section className="notfound-img">
                        <div className="img-container">
                            <img src={NotFoundImg} alt="NotFound img"></img>
                        </div>
                    </section> */}
                </div>
            </main>
        </Layout>
        
    )
}
