import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchBookDetails } from '../redux/bookSlice'
import '../styles/book.css';
import { FaArrowLeftLong } from 'react-icons/fa6'

const Book:React.FC = () => {

    const navigate = useNavigate()
    const {id} = useParams<{id:string}>()
    const bookDetails = useSelector((state:RootState) => state.books.bookDetails)
    const dispatch:AppDispatch = useDispatch()

    useEffect(() => {
        if (id) {
            dispatch(fetchBookDetails(id))
        }
    },[id,dispatch])

  return (
    <div className='details-container'>
        <button className='go-back-btn' onClick={() => navigate("/")}>
            <FaArrowLeftLong/> <span>Go Back</span>
        </button>

        <div className='book-details'>
            <div className='book-img'>
                {
                    bookDetails?.covers && bookDetails.covers.length > 0 && (
                        <img src={`https://covers.openlibrary.org/b/id/${bookDetails.covers[0]}-M.jpg`} alt={bookDetails.title} />
                    )
                }
            </div>
            <div className='book-info'>
                <h2>{bookDetails?.title}</h2>
                <h4>{bookDetails?.subjects[0]}</h4>
                <p>
                    {typeof bookDetails?.description === "object" && bookDetails?.description !== null ? bookDetails.description.value : bookDetails?.description || "No Description found"}
                </p>
            </div>
        </div>
    </div>
  )
}

export default Book