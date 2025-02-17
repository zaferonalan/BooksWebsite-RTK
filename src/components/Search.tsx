import React from 'react'
import '../styles/search.css';
import { FaSearch } from 'react-icons/fa';

const Search:React.FC = () => {
  return (
    <div className='search-section'>
        <div className='search-container'>
            <form>
                <div className='form-container'>
                    <input type="text" placeholder='Search for books...'/>
                    <button type='submit'>
                        <FaSearch/>
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Search