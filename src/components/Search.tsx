import React, { useState } from 'react'
import '../styles/search.css';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../redux/store';
import { useDispatch } from 'react-redux';
import { fetchSearchResult } from '../redux/bookSlice';

const Search:React.FC = () => {

    const [query, setQuery] = useState("")
    const navigate = useNavigate()
    const dispatch:AppDispatch = useDispatch()

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (query.trim()) {
            dispatch(fetchSearchResult(query))
            navigate("/search")
            setQuery("")
        }
    }

  return (
    <div className='search-section'>
        <div className='search-container'>
            <form onSubmit={handleSearch}>
                <div className='form-container'>
                    <input type="text" placeholder='Search for books...' value={query} onChange={(e) => setQuery(e.target.value)}/>
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