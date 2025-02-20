import { RootState } from '../redux/store';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Loading from '../components/Loading'
import BookList from '../components/BookList'

const SearchResult: React.FC = () => {
    const { searchResult, loading, error } = useSelector((state:RootState) => state.books)

    useEffect(() => {
        window.scrollTo({top: 650, behavior: "smooth"})
    })

  return (
    <div className='home-section'>
        <div className='home-container'>
            <div className='books'>
                <div className='home-title'>
                    <h3>Search Results</h3>
                </div>
                { loading ? (
                    <Loading/>
                ): error ? (
                    <div className='error-message'>{error}</div>
                ): (
                    <BookList books={searchResult.slice(0, 16)}/>
                )}
            </div>
        </div>
    </div>
  )
}

export default SearchResult