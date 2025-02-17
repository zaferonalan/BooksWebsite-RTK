import React from 'react'
import "../styles/header.css"
import Search from './Search'
import Categories from './Categories'

const Header: React.FC = () => {
  return (
    <div className='header-section'>
        <div className='header-container'>
            <h2>rise of coding</h2>
            <Search/>
            <Categories/>
        </div>
    </div>
  )
}

export default Header