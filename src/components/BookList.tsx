import React from 'react'
import '../styles/booklist.css';

interface Book{
    title: string,
    author_name: string[],
    authors?: {name: string} []
    key: string
    cover_id?: number
    cover_i?: number
}

interface BookListProps {
    books: Book[]
}

const BookList:React.FC<BookListProps> = ({books}) => {
  return (
    <div className='book-list'>
        {
            books.length > 0 ? (
                books.map((book, bookIndex) => (
                    <div className='book-item' key={bookIndex}>
                        <div className='book-image'>
                            {
                                book.cover_id ? (
                                    <img src={`https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`} alt={book.title} />
                                ): book.cover_i ? (
                                    <img src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`} alt={book.title} />
                                ): (
                                    <div className='no-cover'>No Cover Available</div>
                                )
                            }
                        </div>
                        <div className='book-info'>
                            <div className='book-title'>
                                <h3 title={book.title}>{book.title}</h3>
                            </div>
                            <div className='book-author'>
                                <span>
                                    {book.authors ? book.authors[0]?.name : book.author_name?.[0] || "Unknown Author"}
                                </span>
                            </div>
                        </div>
                        <div className='details'>
                            <span>View Details</span>
                        </div>
                    </div>
                ))
            ):(
                <div>No Books Found</div>
            )
        }
    </div>
  )
}

export default BookList