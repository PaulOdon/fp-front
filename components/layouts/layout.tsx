import React, { FunctionComponent, useState } from 'react'
import Navbar from './navbar/navbar'
import Sidebar from './sidebar/sidebar'
import Footer from './footer/footer'
import styles from './Layout.module.scss'
import RequireAuth from '../../context/auth/RequireAuth'

const AppLayout: FunctionComponent = ({children}) => {
        return (
          <RequireAuth>
            <Navbar />
            <Sidebar />
            <main id="main" className="main" style={{padding: "20px 50px 25px"}}>
              {children}
            </main>
            <Footer />
          </RequireAuth>
        );
    }

export default AppLayout
