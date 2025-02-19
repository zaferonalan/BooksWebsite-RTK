import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import SearchResult from './pages/SearchResult';
import Book from './pages/Book';

const App = () => {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/search' element={<SearchResult/>}/>
        <Route path='/works/:id' element={<Book/>}/>
      </Routes>  
    </Router>
  )
}

export default App