import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"


const BASE_URL = "https://openlibrary.org"

interface BooksResponse {
    works: {
        authors: {name: string}[],
        key: "string",
        title: string,
        cover_id?: number
    }[]
}

interface SearchResult {
    title: string,
    author_name: string[],
    key: string,
    cover_i?: number
}

interface BooksDetailsResponse {
    title: string,
    subjects: string[],
    description: string | {value:string},
    key: string,
    covers?: number
}

interface BookState {
    booksByCategory: { [category: string]: BooksResponse["works"] },
    searchResult: SearchResult[],
    bookDetails: BooksDetailsResponse | null,
    loading: boolean,
    error: string | null
}

export const fetchBooksByCategory = createAsyncThunk<{category: string, books: BooksResponse["works"]}, string>(
    "books/fetchBooksByCategory",
    async(category:string) => {
        const response = await axios.get<BooksResponse>(`${BASE_URL}/subjects/${category.toLowerCase()}.json?limit=4`)
        return {category, books: response.data.works}
    }
)

export const fetchSearchResult = createAsyncThunk<SearchResult[], string>(
    "books/fetchSearchResult",
    async(query:string) => {
        const response = await axios.get(`${BASE_URL}/search.json?q=${query}`)
        return response.data.docs.map((doc:{
            title:string,
            author_name: string[],
            key: string,
            cover_i?: number
        }) => ({
            title: doc.title,
            author_name: doc.author_name || [],
            key: doc.key,
            cover_i: doc.cover_i
        }))
    }
)

export const fetchBookDetails = createAsyncThunk<BooksDetailsResponse, string>(
    "books/fetchBookDetails",
    async (bookId:string) => {
        const response = await axios.get<BooksDetailsResponse>(`${BASE_URL}/works/${bookId}.json`)
        return response.data
    }
)

const initialState:BookState = {
    booksByCategory: {},
    searchResult: [],
    bookDetails: null,
    loading: false,
    error: null
}

const booksSlice = createSlice({
    name:"books",
    initialState,
    reducers:{},
    extraReducers(builder) {
        builder
        .addCase(fetchBooksByCategory.pending,(state) => {
            state.loading = true
            state.error = null
        })
        .addCase(fetchBooksByCategory.fulfilled, (state, action: PayloadAction<{category: string, books: BooksResponse["works"]}>) => {
            state.loading = false
            state.booksByCategory[action.payload.category] = action.payload.books
        })
        .addCase(fetchBooksByCategory.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || "Failed to fetch books"
        })
        .addCase(fetchSearchResult.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(fetchSearchResult.fulfilled, (state, action:PayloadAction<SearchResult[]>) => {
            state.loading = false
            state.searchResult = action.payload
        })
        .addCase(fetchSearchResult.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || "Failed to fetch data"
        })
        .addCase(fetchBookDetails.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(fetchBookDetails.fulfilled, (state, action: PayloadAction<BooksDetailsResponse>) => {
            state.loading = false
            state.bookDetails = action.payload
        })
        .addCase(fetchBookDetails.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || "Faild to fetch data"
        })
    },
})


export default booksSlice.reducer

