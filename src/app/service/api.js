import * as CONSTANTS from '../../constants.js';
const { API_BASE, API_KEY } = CONSTANTS;


export function getMovieList()
{
    //const url = `${API_BASE}/movie/changes?api_key=${API_KEY}&language=en-US`
    const url = `${API_BASE}/movie/popular?api_key=${API_KEY}&language=en-US`
    return fetch(url).then((response) => response.json()).catch((error)=> console.error(error))
 
}

export function getPersonsFromApi () {
   // const url = `${API_BASE}/person/changes?api_key=${API_KEY}&language=en-US`
   const url = `${API_BASE}/person/popular?api_key=${API_KEY}&language=en-US`
    return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export function getDetailPerson (person_id) {
    const url = `${API_BASE}/person/${person_id}?api_key=${API_KEY}&language=en-US`
    return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export function getMoviesPerson (person_id) {
    const url = `${API_BASE}/person/${person_id}/movie_credits?api_key=${API_KEY}&language=en-US`
    return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export function getDetailMovie (movie_id) {
    const url = `${API_BASE}/movie/${movie_id}?api_key=${API_KEY}&language=en-US`
    return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}



