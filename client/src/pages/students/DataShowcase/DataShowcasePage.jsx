import React from 'react'
import SideBar from '../../../components/landing/sideBar/SideBar'
import Navbar from '../../../components/landing/navbar/Navbar'
import DataShowcase from '../../../components/students/DataShowcase/DataShowcase'

const DataShowcasePage = (page) => {
  const currentPage = page.page
  return (
    <div>
      < SideBar />
      < Navbar />
      < DataShowcase page={currentPage}/>
    </div>
  )
}

export default DataShowcasePage
