import * as CONSTANTS from '../../constants.js';
const { API_BASE, API_KEY } = CONSTANTS;


export function getMoviesFromApi()
{
    //const url = `${API_BASE}/movie/changes?api_key=${API_KEY}&language=en-US`
    const url = `${API_BASE}/movie/popular?api_key=${API_KEY}&language=en-US`
    return fetch(url).then((response) => response.json()).catch((error)=> console.error(error))
}

export function getActorsFromApi () {
   // const url = `${API_BASE}/person/changes?api_key=${API_KEY}&language=en-US`
   const url = `${API_BASE}/person/popular?api_key=${API_KEY}&language=en-US`
    return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export function getDetailActor (actor_id) {
    const url = `${API_BASE}/person/${actor_id}?api_key=${API_KEY}&language=en-US`
    return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export function getMoviesOfActor (actor_id) {
    const url = `${API_BASE}/person/${actor_id}/movie_credits?api_key=${API_KEY}&language=en-US`
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


export function getImagesofActor (actor_id) {
    const url = `${API_BASE}/person/${actor_id}/images?api_key=${API_KEY}&language=en-US`
    return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export function getImagesofMovie (movie_id) {
    const url = `${API_BASE}/movie/${movie_id}/images?api_key=${API_KEY}&language=en-US&include_image_language=fr`
    return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

