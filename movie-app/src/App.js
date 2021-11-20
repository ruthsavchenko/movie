import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Header from './components/Header';
import MovieDetails from './components/Movies/MovieDetails';
import Movies from './components/Movies/Movies';
import Schedule from './components/Schedule/Schedule';
import ModalUser from './components/Modals/ModalUser';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <ModalUser />
          <Header />
        </div>
        <Routes>
          <Route exact path='/' element={<Movies />}></Route>
          <Route path='/schedule' element={<Schedule />}></Route>
          <Route path='/:id' element={<MovieDetails />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
