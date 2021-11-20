import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../../redux/actions';
import '../../style/Movies.css'
import Spinner from '../Spinner'

function Movies() {
    const [searchMovie, setSearchMovie] = useState('')
    let [select, setSelect] = useState('Все жанры');

    const dispatch = useDispatch();

    const movies = useSelector(state => state.movies);
    // const sessions = useSelector(state => state.sessions);
    const isLoading = useSelector(state => state.isLoading);

    useEffect(() => {
        dispatch(fetchMovies());
    }, [dispatch]);

    // Закомментировала код для фильтрации только тех фильмов, которые сейчас идут в кино. Оставила фильтрацию по всем фильмам

    // useEffect(() => {
    //     dispatch(fetchSessions());
    // }, [dispatch]);

    // let movieId = [];
    let currentMovies = [];

    // for (let item of sessions) {
    //     if (movieId.includes(item.movie.id)) {
    //         continue;
    //     }
    //     else {
    //         movieId.push(item.movie.id)
    //     }
    // }

    // for (let item of movies) {
    //     if (movieId.includes(item.id)) {
    //         currentMovies.push(item)
    //     }
    // }

    const onSearch = e => {
        setSearchMovie(e.target.value)
    }

    let genres = ["Все жанры"]
    for (let item of movies) {
        for (let genre of item.genre) {
            if (genres.includes(genre)) {
                continue;
            }
            else {
                genres.push(genre)
            }
        }
    }

    let options = genres.map((genre) => (
        <option value={genre}>{genre}</option>
    ))

    const handleSelect = (e) => {
        setSelect(e.target.value);
    }

    if (searchMovie) {
        currentMovies = movies.filter(movie => movie.title.toUpperCase().includes(searchMovie.toUpperCase()))
    } else if (searchMovie && select !== 'Все жанры') {
        currentMovies = movies.filter(movie => movie.title.toUpperCase().includes(searchMovie.toUpperCase()) && currentMovies.genre.includes(select))
    } else if (select !== 'Все жанры') {
        currentMovies = movies.filter(movie => movie.genre.includes(select))
    } else {
        currentMovies = movies
    }

    if(isLoading) {
        return <Spinner />
    }

    return (
        <div>
            <div className="search-movies">
                <input type="search" placeholder="Поиск..." value={searchMovie} onChange={onSearch} />
                <select onChange={handleSelect} className='movie-select'>
                    {options}
                </select>
            </div>
            <div className="movies-container">
                {currentMovies.map(movie => (
                    <div key={movie.id} className="movie-card">
                        <Link to={`/${movie.id}`}>
                            <img src={movie.poster} alt="poster" />
                        </Link>
                        <div>
                            <p>{movie.title}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Movies;