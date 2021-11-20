import { FETCH_MOVIES, FETCH_MOVIES_ERROR, FETCH_SESSIONS, FETCH_SESSIONS_ERROR, SET_USER } from "./types";

export const fetchMovies = () => {
    return (dispatch) => {
        return fetch('https://trevadim.github.io/data/movies.json')
            .then(response => response.json())
            .then(json => dispatch({
                type: FETCH_MOVIES,
                payload: json
            }))
            .catch(err => dispatch({
                type: FETCH_MOVIES_ERROR,
                msg: "Unable to fetch data"
            }))
    }
}

export const fetchSessions = () => {
    return (dispatch) => {
        return fetch('https://trevadim.github.io/data/schedule.json')
            .then(response => response.json())
            .then(json => dispatch({
                type: FETCH_SESSIONS,
                payload: json
            }))
            .catch(err => dispatch({
                type: FETCH_SESSIONS_ERROR,
                msg: "Unable to fetch data"
            }))
    }
}

export const setUser = (data) => ({
    type: SET_USER, 
    payload: data
})