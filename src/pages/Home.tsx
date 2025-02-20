import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {RootState, AppDispatch} from '../redux/store';
import { fetchBooksByCategory } from '../redux/bookSlice';
import BookList from '../components/BookList';

const Home: React.FC = () => {
    const dispatch:AppDispatch = useDispatch()
    const booksByCategory = useSelector((state:RootState) => state.books.booksByCategory )

    useEffect(() => {
      const categories = ["Fiction", "Romance", "Fantasy", "Mystery"]
      categories.forEach((category) => {
        if (!booksByCategory[category]) {
          dispatch(fetchBooksByCategory(category))
        }
      }, [dispatch, booksByCategory])
    })


  return (
    <div className="home-section">
        <div className="home-container">
          {Object.keys(booksByCategory).map((category, categoryIndex) => {
            const books = booksByCategory[category]
            return(
              <div className='books' key={categoryIndex}>
                <div className='home-title'>
                  <h3>{category}</h3>
                </div>
                <BookList books={books.slice(0,4).map(book => ({
                  ...book,
                  author_name: book.authors?.map(a => a.name) || []
                }))}/>
              </div>
            )
          })}
        </div>
    </div>
  )
}

export default Home