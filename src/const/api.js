export const API_KEY="6a3a57fcf0fbf91cf2ad62011f1e14ba";
// apı keyler sabit kalaceksa burada saklandı
const requests={
    fetchTopRated:`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchSearch:`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&include_adult=false&?query=`
}

export default requests;